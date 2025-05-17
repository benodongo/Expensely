from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.forms import ModelForm, inlineformset_factory,  BaseInlineFormSet

from .models import CustomUser, Expense, PaymentMethod, Payment, Group, ExpenseParticipant

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name','gender','national_id','contact')
        widgets = {
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Enter your email'}),
            'first_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'First Name'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Last Name'}),
            'national_id': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'National ID'}),
            'contact': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Phone Number'}),
            'gender': forms.Select(attrs={'class': 'form-control'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password1'].widget.attrs.update({'class': 'form-control border-end-0', 'placeholder': '8+ character required'})
        self.fields['password2'].widget.attrs.update({'class': 'form-control border-end-0', 'placeholder': 'Re-enter Password'})

class CustomAuthenticationForm(AuthenticationForm):
    username = forms.EmailField(label='Email')

class ExpenseForm(forms.ModelForm):
    class Meta:
        model = Expense
        fields = ['group', 'amount', 'currency', 'description', 'category']

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        if user:
            # Get groups where user is a member
            self.fields['group'].queryset = user.user_groups.all()
class BaseExpenseParticipantFormSet(BaseInlineFormSet):
    def __init__(self, *args, **kwargs):
        self.group = kwargs.pop('group', None)
        super().__init__(*args, **kwargs)

    def _construct_form(self, i, **kwargs):
        kwargs['group'] = self.group
        return super()._construct_form(i, **kwargs)
    
class ExpenseParticipantForm(forms.ModelForm):
    email = forms.CharField(required=False, widget=forms.TextInput(attrs={'readonly': True}))
    
    class Meta:
        model = ExpenseParticipant
        fields = ['user', 'share', 'email']

    def __init__(self, *args, **kwargs):
        self.group = kwargs.pop('group', None)
        super().__init__(*args, **kwargs)
        
        if self.group:
            self.fields['user'].queryset = self.group.members.all()
            self.fields['user'].widget = forms.HiddenInput()
            
            if self.instance and self.instance.user:
                self.fields['email'].initial = self.instance.user.email

ExpenseParticipantFormSet = inlineformset_factory(
    Expense,
    ExpenseParticipant,
    form=ExpenseParticipantForm,
    formset=BaseExpenseParticipantFormSet, 
    fields=['email', 'share'],
    extra=1,
    can_delete=False
)


class PaymentMethodForm(forms.ModelForm):
    class Meta:
        model = PaymentMethod
        fields = ['provider', 'details']
        widgets = {
            'details': forms.Textarea(attrs={'rows': 3, 'placeholder': '{"phone": "0712345678"}'}),
        }


class PaymentForm(forms.ModelForm):
    class Meta:
        model = Payment
        fields = ['expense', 'payment_method', 'amount']

class GroupForm(forms.ModelForm):
    class Meta:
        model = Group
        fields = ['name', 'description', 'members']
        widgets = {
            'members': forms.SelectMultiple(attrs={'class': 'form-control'}),
        }