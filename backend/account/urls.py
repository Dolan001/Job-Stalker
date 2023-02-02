from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()

router.register('users', UserViewSet, basename='user')
router.register('user-profile', UserProfileViewSet, basename='user-profile')

urlpatterns = [
    path('register/', RegisterViewSet.as_view(), name='register'),
    path('my-profile/', UserViewSet.as_view({'get': 'my_profile'}), name='current_user'),
    path("update-profile/", UserViewSet.as_view({"patch": "update"}), name="partial-update"),
    path('upload/', UserViewSet.as_view({'put': 'update_profile'}), name='update_profile')
] + router.urls
