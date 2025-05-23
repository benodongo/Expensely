from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Group, Expense, PaymentMethod, Payment, Notification, ExpenseParticipant

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'age', 'national_id', 'gender', 'contact')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Group)
admin.site.register(Expense)
admin.site.register(PaymentMethod)
admin.site.register(Payment)
admin.site.register(Notification)
admin.site.register(ExpenseParticipant)