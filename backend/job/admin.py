from django.contrib import admin

from .models import *


class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'email', 'user']

    class Meta:
        model = JobModel


admin.site.register(JobModel, JobAdmin)


class CandidateApplyAdmin(admin.ModelAdmin):
    list_display = ['job', 'user', 'resume', 'applied_at']

    class Meta:
        model = CandidateApplyModel


admin.site.register(CandidateApplyModel, CandidateApplyAdmin)
