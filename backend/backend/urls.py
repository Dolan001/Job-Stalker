from django.contrib import admin
from django.urls import path, include, re_path

from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView, TokenRefreshView

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

schema_url = [
    # YOUR PATTERNS
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]


# schema_view = get_schema_view(
#    openapi.Info(
#       title="Job-Stalker API",
#       default_version='v1',
#       description="",
#       terms_of_service="https://www.google.com/policies/terms/",
#       contact=openapi.Contact(email="contact@snippets.local"),
#       license=openapi.License(name="BSD License"),
#    ),
#    public=True,
#    permission_classes=[permissions.AllowAny],
# )

# swagger_URL = [
#     re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
#     re_path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
#     re_path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
# ]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('job-api/', include('job.urls')),
    path('account-api/', include('account.urls')),

    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/verify/', TokenVerifyView.as_view()),
] + schema_url

handler404 = 'utils.error_views.handler404'
handler500 = 'utils.error_views.handler500'

