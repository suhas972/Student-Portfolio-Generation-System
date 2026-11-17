"""
Django Admin Configuration for SIP Mini Project.
Enables faculty / evaluation admins to view and manage students, schedules, and reports.
"""

from django.contrib import admin
from .models import Student, Timetable, SubjectAssessment, PortfolioReport

admin.site.site_header = "SIP Report Generator Administration"
admin.site.site_title = "SIP Academic Admin Portal"
admin.site.index_title = "5th Sem CSE Mini Project - Student Interest Portfolio"

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'full_name', 'branch', 'semester', 'academic_year', 'created_at')
    list_filter = ('branch', 'semester', 'academic_year')
    search_fields = ('student_id', 'full_name', 'email')
    ordering = ('student_id',)
    fieldsets = (
        ('Academic Particulars', {
            'fields': ('student_id', 'full_name', 'branch', 'semester', 'college', 'academic_year')
        }),
        ('Authentication & Contact', {
            'fields': ('email', 'password')
        }),
        ('Portfolio Profile', {
            'fields': ('avatar', 'focus_area')
        }),
    )

@admin.register(Timetable)
class TimetableAdmin(admin.ModelAdmin):
    list_display = ('student', 'updated_at')
    search_fields = ('student__student_id', 'student__full_name')

@admin.register(SubjectAssessment)
class SubjectAssessmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'subject_name', 'category', 'percentage', 'level', 'mode', 'updated_at')
    list_filter = ('category', 'level', 'mode')
    search_fields = ('student__student_id', 'student__full_name', 'subject_name')
    ordering = ('student', '-percentage')

@admin.register(PortfolioReport)
class PortfolioReportAdmin(admin.ModelAdmin):
    list_display = ('student', 'generated_at', 'total_weekly_hours', 'active_days', 'technical_share', 'extracurricular_share')
    list_filter = ('academic_year', 'generated_at')
    search_fields = ('student__student_id', 'student__full_name')
    ordering = ('-generated_at',)
