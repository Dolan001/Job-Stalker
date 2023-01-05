from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()

router.register('jobs', JobViewSet, basename='job')
router.register('candidate-apply', CandidateApplyViewSet, basename='apply')

urlpatterns = [
    path('stats/<str:topic>', JobViewSet.as_view({'get': 'getTopicStats'}), name='job_stat'),
    path('filter/', JobViewSet.as_view({'get': 'jobFilter'}), name='job_filter')
] + router.urls
