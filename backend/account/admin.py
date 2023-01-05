from django.contrib import admin
from .models import *


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'image', 'resume']

    class Meta:
        model = UserProfileModel


admin.site.register(UserProfileModel, UserAdmin)
