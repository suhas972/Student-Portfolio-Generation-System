"""
API URL Routing for SIP Backend
"""

from django.urls import path
from . import views

urlpatterns = [
    # Authentication & Accounts
    path('auth/login/', views.auth_login, name='api_auth_login'),
    path('auth/register/', views.auth_register, name='api_auth_register'),
    path('auth/demo-users/', views.auth_demo_users, name='api_auth_demo_users'),

    # Student Profile
    path('students/<str:usn>/', views.student_detail, name='api_student_detail'),

    # Weekly Timetable
    path('timetable/<str:usn>/', views.timetable_detail, name='api_timetable_detail'),
    path('timetable/<str:usn>/reset/', views.timetable_reset, name='api_timetable_reset'),

    # Subject Assessments & Diagnostics
    path('assessments/<str:usn>/', views.assessments_collection, name='api_assessments_collection'),
    path('assessments/<str:usn>/auto-assess/', views.assessments_auto_fill, name='api_assessments_auto_fill'),

    # Portfolio Reports & Analytics
    path('reports/<str:usn>/', views.report_analytics, name='api_report_analytics'),
    path('reports/<str:usn>/save/', views.report_save, name='api_report_save'),
    path('reports/<str:usn>/history/', views.report_history, name='api_report_history'),

    # Health & System
    path('health/', views.system_health, name='api_system_health'),
]
