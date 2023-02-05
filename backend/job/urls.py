from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()

router.register('jobs', JobViewSet, basename='job')
router.register('apply-job', CandidateApplyViewSet, basename='apply')

urlpatterns = [
    path('stats/<str:topic>', JobViewSet.as_view({'get': 'getTopicStats'}), name='job_stat'),
    # path('filter/', JobViewSet.as_view({'get': 'jobFilter'}), name='job_filter'),
    path('my-jobs/', JobViewSet.as_view({'get': 'my_jobs'}), name='my_jobs'),
    path('applied-my-job/<str:pk>/', JobViewSet.as_view({'get': 'applied_my_job'}), name='applied_my_job'),

    path('apply-job/<int:pk>/', CandidateApplyViewSet.as_view({'post': 'create'}), name='apply_job'),
    path('applied-jobs/', CandidateApplyViewSet.as_view({'get': 'my_applied_jobs'}), name='my_applied_jobs'),
    path('check/<str:pk>/', CandidateApplyViewSet.as_view({'get': 'is_applied'}), name='is_applied'),
] + router.urls
