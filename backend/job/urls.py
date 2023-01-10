from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()

router.register('jobs', JobViewSet, basename='job')
router.register('apply-job', CandidateApplyViewSet, basename='apply')

urlpatterns = [
    path('stats/<str:topic>', JobViewSet.as_view({'get': 'getTopicStats'}), name='job_stat'),
    path('filter/', JobViewSet.as_view({'get': 'jobFilter'}), name='job_filter'),
    path('my-applied-jobs/', CandidateApplyViewSet.as_view({'get': 'my_applied_jobs'}), name='my_applied_jobs')
] + router.urls
