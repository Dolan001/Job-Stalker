from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()

router.register('users', UserViewSet, basename='user')

urlpatterns = [
    path('register/', RegisterViewSet.as_view(), name='register'),
    path('my-profile/', UserViewSet.as_view({'get': 'current_user'}), name='current_user'),
    path('upload-resume/', UserViewSet.as_view({'put': 'upload_resume'}), name='upload_resume')
] + router.urls
