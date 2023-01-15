from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('job-api/', include('job.urls')),
    path('account-api/', include('account.urls')),

    path('token/', TokenObtainPairView.as_view()),
    path('token/verify', TokenVerifyView.as_view()),
]

handler404 = 'utils.error_views.handler404'
handler500 = 'utils.error_views.handler500'

