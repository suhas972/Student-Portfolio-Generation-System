"""
Django Models for Student Interest Portfolio Report Generator.
5th-Semester Computer Science & Engineering Mini Project
"""

from django.db import models

class Student(models.Model):
    """
    Represents an individual student account.
    Data is isolated per student USN.
    """
    student_id = models.CharField(
        max_length=30, 
        primary_key=True, 
        verbose_name='Student ID / USN',
        help_text='Unique University Seat Number (e.g., 1MS22CS095)'
    )
    full_name = models.CharField(max_length=150, verbose_name='Full Name')
    branch = models.CharField(
        max_length=150, 
        default='Computer Science & Engineering',
        verbose_name='Branch / Department'
    )
    semester = models.CharField(max_length=50, default='5th Semester', verbose_name='Semester')
    email = models.EmailField(blank=True, default='', verbose_name='College Email ID')
    password = models.CharField(max_length=128, verbose_name='Account Password')
    college = models.CharField(
        max_length=255, 
        default='Department of Computer Science & Engineering',
        verbose_name='Institution / College'
    )
    academic_year = models.CharField(max_length=50, default='2024–2025', verbose_name='Academic Year')
    avatar = models.CharField(max_length=10, blank=True, default='', verbose_name='Avatar Initials')
    focus_area = models.CharField(max_length=255, blank=True, default='', verbose_name='Focus Skill Areas')
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created At')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Last Updated')

    class Meta:
        ordering = ['student_id']
        verbose_name = 'Student'
        verbose_name_plural = 'Students'

    def __str__(self):
        return f"{self.full_name} ({self.student_id}) - {self.branch}"

    def to_dict(self):
        return {
            'studentId': self.student_id,
            'name': self.full_name,
            'fullName': self.full_name,
            'branch': self.branch,
            'semester': self.semester,
            'email': self.email,
            'college': self.college,
            'academicYear': self.academic_year,
            'avatar': self.avatar or (self.full_name[:2].upper() if self.full_name else 'ST'),
            'focusArea': self.focus_area,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'updatedAt': self.updated_at.isoformat() if self.updated_at else None
        }


class Timetable(models.Model):
    """
    Weekly Monday-to-Sunday routine schedule for an individual student.
    """
    student = models.OneToOneField(
        Student, 
        on_delete=models.CASCADE, 
        related_name='timetable',
        primary_key=True
    )
    # schedule_matrix stores:
    # { "Monday": { "9:00 AM - 10:00 AM": "C Programming", ... }, ... }
    schedule_matrix = models.JSONField(default=dict, verbose_name='Schedule Matrix')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Last Updated')

    class Meta:
        verbose_name = 'Student Timetable'
        verbose_name_plural = 'Student Timetables'

    def __str__(self):
        return f"Timetable for {self.student.full_name} ({self.student.student_id})"

    def to_dict(self):
        return self.schedule_matrix or {}


class SubjectAssessment(models.Model):
    """
    Diagnostic 10-question evaluation or manual percentage calibration for a subject.
    """
    student = models.ForeignKey(
        Student, 
        on_delete=models.CASCADE, 
        related_name='assessments'
    )
    subject_name = models.CharField(max_length=100, verbose_name='Subject / Domain Name')
    category = models.CharField(
        max_length=50, 
        default='technical', 
        choices=[
            ('technical', 'Technical Core'),
            ('creative', 'Creative Arts'),
            ('sports', 'Sports & Fitness'),
            ('other', 'Other Pursuits')
        ],
        verbose_name='Domain Category'
    )
    percentage = models.FloatField(default=0.0, verbose_name='Interest Percentage (%)')
    mode = models.CharField(max_length=20, default='questions', verbose_name='Assessment Mode')
    level = models.CharField(max_length=20, default='Medium', verbose_name='Interest Tier')
    scores = models.JSONField(default=list, verbose_name='10 Question Points')
    dimensions = models.JSONField(default=dict, verbose_name='Metric Dimensions')
    recommendations = models.TextField(blank=True, default='', verbose_name='Faculty Recommendations')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Last Evaluated')

    class Meta:
        ordering = ['-percentage']
        unique_together = ('student', 'subject_name')
        verbose_name = 'Subject Assessment'
        verbose_name_plural = 'Subject Assessments'

    def __str__(self):
        return f"{self.student.student_id} - {self.subject_name}: {self.percentage:.1f}% ({self.level})"

    def to_dict(self):
        return {
            'subject': self.subject_name,
            'category': self.category,
            'percentage': round(self.percentage, 1),
            'mode': self.mode,
            'level': self.level,
            'scores': self.scores,
            'dimensions': self.dimensions,
            'recommendations': self.recommendations,
            'updatedAt': self.updated_at.isoformat() if self.updated_at else None
        }


class PortfolioReport(models.Model):
    """
    Archived evaluation-ready academic report generated for a student.
    """
    student = models.ForeignKey(
        Student, 
        on_delete=models.CASCADE, 
        related_name='reports'
    )
    generated_at = models.DateTimeField(auto_now_add=True, verbose_name='Generated At')
    academic_year = models.CharField(max_length=50, default='2024–2025')
    total_weekly_hours = models.FloatField(default=0.0, verbose_name='Total Tracked Hours')
    active_days = models.IntegerField(default=0, verbose_name='Active Days / 7')
    technical_share = models.FloatField(default=0.0, verbose_name='Technical Share (%)')
    extracurricular_share = models.FloatField(default=0.0, verbose_name='Extracurricular Share (%)')
    top_interests = models.JSONField(default=list, verbose_name='Top 3 Priority Interests')
    insights_summary = models.TextField(blank=True, default='', verbose_name='Algorithmic Synthesis')
    full_report_data = models.JSONField(default=dict, verbose_name='Full Report Snapshot')

    class Meta:
        ordering = ['-generated_at']
        verbose_name = 'Portfolio Report'
        verbose_name_plural = 'Portfolio Reports'

    def __str__(self):
        return f"Report for {self.student.full_name} ({self.student.student_id}) - {self.generated_at.strftime('%Y-%m-%d %H:%M')}"

    def to_dict(self):
        return {
            'id': self.id,
            'studentId': self.student.student_id,
            'studentName': self.student.full_name,
            'generatedAt': self.generated_at.isoformat(),
            'academicYear': self.academic_year,
            'totalWeeklyHours': self.total_weekly_hours,
            'activeDays': self.active_days,
            'technicalShare': self.technical_share,
            'extracurricularShare': self.extracurricular_share,
            'topInterests': self.top_interests,
            'insightsSummary': self.insights_summary,
            'fullReportData': self.full_report_data
        }
