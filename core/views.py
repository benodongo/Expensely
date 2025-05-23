
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login
from .forms import CustomUserCreationForm,  PaymentMethodForm, PaymentForm, GroupForm,ExpenseParticipantForm, ExpenseForm, ExpenseParticipantFormSet
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, CreateView, DetailView, UpdateView
from .models import Group, Expense, PaymentMethod, Payment, ExpenseParticipant
from django.urls import reverse_lazy
from django.views import View
from django.http import JsonResponse
from django.db import transaction
from django.db.models import Sum, Count, Q
from django.contrib.auth.decorators import login_required
from django.forms import inlineformset_factory,modelformset_factory
from django.core.exceptions import ObjectDoesNotExist
import uuid
from django.shortcuts import get_object_or_404
from django.utils import timezone
import time
import threading
from decimal import Decimal

def signup_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Automatically log in the user
            return redirect('home_page')  # Replace 'home' with your post-login URL name
    else:
        form = CustomUserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})

def landing_page(request):
    return render(request, 'core/landing.html')
def home_page(request):
    user = request.user
    
    # Active Groups Card
    active_groups = user.user_groups.all().order_by('-created_at')[:5]
    group_count = user.user_groups.count()
    
    # Total Group Expenses
    total_group_expenses = Expense.objects.filter(
        group__members=user
    ).aggregate(total=Sum('amount'))['total'] or 0
    
    # Settlement Progress
    settled_amount = ExpenseParticipant.objects.filter(
        expense__group__members=user,
        settled=True
    ).aggregate(total=Sum('share'))['total'] or 0
    settlement_percentage = (settled_amount / total_group_expenses * 100) if total_group_expenses else 0
    
    # User Balance Calculation
    owed_to_user = ExpenseParticipant.objects.filter(
        expense__paid_by=user,
        settled=False
    ).aggregate(total=Sum('share'))['total'] or 0
    
    user_owes = ExpenseParticipant.objects.filter(
        user=user,
        settled=False
    ).aggregate(total=Sum('share'))['total'] or 0
    
    net_balance = owed_to_user - user_owes
    
    # Recent Expenses
    recent_expenses = Expense.objects.filter(
        group__members=user
    ).order_by('-date')[:3]
    
    recent_payments = Payment.objects.filter(
    Q(payer=user) | Q(expense__paid_by=user)
    ).order_by('-timestamp')[:3]

    pending_payments = Payment.objects.filter(
        Q(payer=user) | Q(expense__paid_by=user),
        status='PENDING'
    )[:5]
    
    # Group Balances
    group_balances = []
    for group in user.user_groups.all():
        group_owed = ExpenseParticipant.objects.filter(
            expense__group=group,
            expense__paid_by=user,
            settled=False
        ).aggregate(total=Sum('share'))['total'] or 0
        
        group_owes = ExpenseParticipant.objects.filter(
            expense__group=group,
            user=user,
            settled=False
        ).aggregate(total=Sum('share'))['total'] or 0
        
        group_balances.append({
            'group': group,
            'owed': group_owed,
            'owes': group_owes,
            'net': group_owed - group_owes
        })
    
    context = {
        'active_groups': active_groups,
        'group_count': group_count,
        'total_group_expenses': total_group_expenses,
        'settlement_percentage': settlement_percentage,
        'owed_to_user': owed_to_user,
        'user_owes': user_owes,
        'net_balance': net_balance,
        'recent_expenses': recent_expenses,
        'pending_payments': pending_payments,
        'recent_payments':recent_payments, 
        'group_balances': group_balances,
    }
    
    return render(request, 'core/home.html', context)

class GroupListView(LoginRequiredMixin, ListView):
    model = Group
    template_name = 'core/group_list.html'
    context_object_name = 'groups'
    
    def get_queryset(self):
     return self.request.user.user_groups.all()
    

class GroupCreateView(LoginRequiredMixin, CreateView):
    model = Group
    form_class = GroupForm
    template_name = 'core/group_form.html'
    success_url = reverse_lazy('core:groups')

    def form_valid(self, form):
        form.instance.created_by = self.request.user
        return super().form_valid(form)
    
class GroupMemberListView(LoginRequiredMixin, DetailView):
    model = Group
    template_name = 'core/group_members.html'
    context_object_name = 'group'

    def dispatch(self, request, *args, **kwargs):
        obj = self.get_object()
        if request.user != obj.created_by and request.user not in obj.members.all():
            return self.handle_no_permission()
        return super().dispatch(request, *args, **kwargs)

class ExpenseListView(LoginRequiredMixin, ListView):
    model = Expense
    form_class = ExpenseForm
    template_name = 'core/expense_list.html'
    context_object_name = 'expenses'

    def get_queryset(self):
        return Expense.objects.filter(group__members=self.request.user).order_by('-date')
    
class ExpenseCreateView(CreateView):
    model = Expense
    form_class = ExpenseForm
    success_url = reverse_lazy('core:expense_list')
    template_name = 'core/expense_form.html'
    
    def get_formset(self, group, data=None):
        members = group.members.all()
        initial_data = [{'user': member, 'email': member.email} for member in members]
        
        ExpenseParticipantFormSet = modelformset_factory(
            ExpenseParticipant,
            form=ExpenseParticipantForm,
            extra=len(initial_data),
            can_delete=False
        )
        return ExpenseParticipantFormSet(
            data or None,
            queryset=ExpenseParticipant.objects.none(),
            form_kwargs={'group': group},
            initial=initial_data
        )

    def get(self, request, *args, **kwargs):
        self.object = None
        form = self.get_form()
        group = None
        if 'group' in request.GET:
            group = Group.objects.filter(id=request.GET['group']).first()
        elif form.initial.get('group'):
            group = form.initial['group']
        formset = self.get_formset(group) if group else None
        return self.render_to_response(self.get_context_data(form=form, formset=formset))

    def post(self, request, *args, **kwargs):
        self.object = None
        form = self.get_form()
        group = Group.objects.filter(id=request.POST.get('group')).first()
        formset = self.get_formset(group, data=request.POST)
        
        if form.is_valid() and formset.is_valid():
            expense = form.save(commit=False)
            expense.paid_by = request.user  # assign current user here
            expense.save()
            participants = []
            total_share = 0
            for participant_form in formset:
                participant = participant_form.save(commit=False)
                participant.expense = expense
                total_share += participant.share or 0
                participant.save()
                participants.append(participant.user) 

            expense.participants.set(participants) 

            if total_share != expense.amount:
                form.add_error(None, "Total shares must equal the expense amount.")
                expense.delete()  # Rollback
                return self.form_invalid(form)
            return self.form_valid(form)
        return self.form_invalid(form)


def load_participant_forms(request):
    group_id = request.GET.get('group')
    group = Group.objects.get(pk=group_id)
    members = group.members.all()

    initial_data = [{'user': member, 'email': member.email} for member in members]

    ExpenseParticipantFormSet = modelformset_factory(
        ExpenseParticipant,
        form=ExpenseParticipantForm,
        extra=len(initial_data),
        can_delete=False
    )
    formset = ExpenseParticipantFormSet(
        queryset=ExpenseParticipant.objects.none(),
        form_kwargs={'group': group},
        initial=initial_data
    )
    return render(request, 'core/participant_forms.html', {'formset': formset})

class ExpenseDetailView(DetailView):
    model = Expense
    template_name = 'core/expense_detail.html' 
    context_object_name = 'expense'

class PaymentMethodCreateView(LoginRequiredMixin, CreateView):
    model = PaymentMethod
    form_class = PaymentMethodForm
    template_name = 'core/payment_method_form.html'
    success_url = reverse_lazy('core:payment_method_list')

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)


class PaymentMethodListView(LoginRequiredMixin, ListView):
    model = PaymentMethod
    template_name = 'core/payment_method_list.html'
    context_object_name = 'methods'

    def get_queryset(self):
        return PaymentMethod.objects.filter(user=self.request.user)


class PaymentCreateView(LoginRequiredMixin, CreateView):
    model = Payment
    form_class = PaymentForm
    template_name = 'core/payment_form.html'
    success_url = reverse_lazy('core:payment_list')

    def form_valid(self, form):
        form.instance.payer = self.request.user
        return super().form_valid(form)


class PaymentListView(LoginRequiredMixin, ListView):
    model = Payment
    template_name = 'core/payment_list.html'
    context_object_name = 'payments'

    def get_queryset(self):
        return Payment.objects.filter(payer=self.request.user).order_by('-timestamp')
    
#view that returns JSON with the members of a given group
@login_required
def group_members_api(request):
    group_id = request.GET.get('group_id')
    if not group_id:
        return JsonResponse({'error': 'Missing group_id'}, status=400)

    try:
        group = Group.objects.get(id=group_id)
    except Group.DoesNotExist:
        return JsonResponse({'error': 'Group not found'}, status=404)

    members = group.members.values('id', 'email')  
    return JsonResponse(list(members), safe=False)


@csrf_exempt
def make_payment(request):
    if request.method != 'POST':
        return redirect('core:expense_list')  # fallback page

    user = request.user
    expense_id = request.POST.get('expense_id')
    provider = request.POST.get('provider')  # 'MPESA', 'PAYPAL', 'STRIPE'

    if not expense_id or not provider:
        # Redirect to a failure page or back to expense list with message
        return redirect('core:expense_list')

    expense = get_object_or_404(Expense, id=expense_id)

    try:
        participant = ExpenseParticipant.objects.get(expense=expense, user=user)
    except ExpenseParticipant.DoesNotExist:
        return redirect('core:expense_list')  # or show an error page

    if participant.settled:
        return redirect('core:expense-detail', pk=expense.id)

    try:
        payment_method = PaymentMethod.objects.get(user=user, provider=provider)
    except PaymentMethod.DoesNotExist:
        return redirect('core:add_payment_method')  # or show an error page

    payment = Payment.objects.create(
        expense=expense,
        payer=user,
        amount=participant.share,
        payment_method=payment_method,
        status='PENDING',
        transaction_id='TXN-' + str(uuid.uuid4())[:10]
    )

    def simulate_payment_success():
        time.sleep(2)
        payment.status = 'COMPLETED'
        payment.save()
        participant.settled = True
        participant.save()

    if provider == 'MPESA':
        threading.Thread(target=simulate_payment_success).start()
    else:
        payment.status = 'COMPLETED'
        payment.save()
        participant.settled = True
        participant.save()

    # ✅ Redirect after success
    return redirect('core:expense-detail', pk=expense.id)