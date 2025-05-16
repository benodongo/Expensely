
from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import CustomUserCreationForm,  PaymentMethodForm, PaymentForm, GroupForm,ExpenseParticipantFormSet, ExpenseForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, CreateView, DetailView, UpdateView
from .models import Group, Expense, PaymentMethod, Payment, ExpenseParticipant
from django.urls import reverse_lazy
from django.views import View
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required


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
    return render(request, 'core/home.html')
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
    
class ExpenseCreateView(LoginRequiredMixin, View):
    template_name = 'core/expense_form.html'

    def get(self, request):
        form = ExpenseForm()
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = ExpenseForm(request.POST)
        if form.is_valid():
            expense = form.save(commit=False)
            expense.paid_by = request.user
            expense.save()

            participant_ids = request.POST.getlist('participants')
            # Create ExpenseParticipant for each participant with default share (you can improve this)
            share_per_person = expense.amount / len(participant_ids) if participant_ids else 0
            for user_id in participant_ids:
                expense.participants.add(user_id)
                # Also create ExpenseParticipant with share
                ExpenseParticipant.objects.create(
                    expense=expense,
                    user_id=user_id,
                    share=share_per_person
                )
            return redirect('core:expense_list')  # your success url
        return render(request, self.template_name, {'form': form})
class PaymentMethodCreateView(LoginRequiredMixin, CreateView):
    model = PaymentMethod
    form_class = PaymentMethodForm
    template_name = 'core/payment_method_form.html'
    success_url = reverse_lazy('payment_method_list')

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
    success_url = reverse_lazy('payment_list')

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

    members = group.members.values('id', 'email')  # You can add other fields if you want
    return JsonResponse(list(members), safe=False)