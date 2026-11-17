"""
URL configuration for sip_backend project.
Serves both the REST API, Developer Portal, Django Admin,
and Frontend files for Mobile / Wi-Fi network access.
"""

from django.contrib import admin
from django.urls import path, re_path, include
from api import views

urlpatterns = [
    # 1. Main Application Web Portal (Opens login page by default)
    path('', views.serve_home_page, name='home_app'),
    path('login.html', lambda req: views.serve_frontend_file(req, 'login.html'), name='login_page'),
    path('index.html', lambda req: views.serve_frontend_file(req, 'index.html'), name='dashboard_page'),
    path('standalone.html', lambda req: views.serve_frontend_file(req, 'standalone.html'), name='standalone_page'),

    # 2. Frontend Assets (CSS & JS)
    path('style.css', lambda req: views.serve_frontend_file(req, 'style.css'), name='static_css'),
    path('api.js', lambda req: views.serve_frontend_file(req, 'api.js'), name='static_api_js'),
    path('auth.js', lambda req: views.serve_frontend_file(req, 'auth.js'), name='static_auth_js'),
    path('app.js', lambda req: views.serve_frontend_file(req, 'app.js'), name='static_app_js'),

    # 3. Visual Interactive Developer API Dashboard
    path('dev/', views.api_dashboard, name='api_dashboard_dev'),
    path('api-docs/', views.api_dashboard, name='api_dashboard_docs'),

    # 4. Django Admin Portal
    path('admin/', admin.site.urls),

    # 5. REST API Endpoints
    path('api/', include('api.urls')),
]
