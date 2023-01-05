from django.contrib import admin

from .models import *


class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'email', 'user']

    class Meta:
        model = JobModel


admin.site.register(JobModel, JobAdmin)
