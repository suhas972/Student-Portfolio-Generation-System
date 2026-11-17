"""
Django Management Command to Seed Initial Evaluation Data.
Usage: python manage.py seed_data
"""

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Student, Timetable, SubjectAssessment
from api.views import DEFAULT_TIMETABLE_MATRIX

class Command(BaseCommand):
    help = 'Seeds default student accounts, timetables, assessments, and admin superuser.'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE('Seeding SIP database...'))

        # 1. Create default Django Admin superuser
        admin_user, created = User.objects.get_or_create(username='admin')
        if created:
            admin_user.set_password('admin123')
            admin_user.is_superuser = True
            admin_user.is_staff = True
            admin_user.email = 'admin@college.edu'
            admin_user.save()
            self.stdout.write(self.style.SUCCESS('✓ Created admin superuser (Username: admin, Password: admin123)'))
        else:
            self.stdout.write(self.style.WARNING('• Admin superuser already exists.'))

        # 2. Seed Pre-configured Demo Students
        demo_students = [
            {
                'student_id': '1MS22CS095',
                'full_name': 'Sahana K.',
                'branch': 'Computer Science & Engineering',
                'semester': '5th Semester',
                'email': 'sahana@college.edu',
                'password': 'student123',
                'college': 'Department of Computer Science & Engineering',
                'academic_year': '2024–2025',
                'avatar': 'SK',
                'focus_area': 'C Programming (30%) & Web Dev (25%)'
            },
            {
                'student_id': '1MS22CS080',
                'full_name': 'Rahul Sharma',
                'branch': 'Artificial Intelligence & Machine Learning',
                'semester': '5th Semester',
                'email': 'rahul.s@college.edu',
                'password': 'student123',
                'college': 'Department of Artificial Intelligence & Machine Learning',
                'academic_year': '2024–2025',
                'avatar': 'RS',
                'focus_area': 'AI / Machine Learning (35%) & Python (25%)'
            },
            {
                'student_id': '1MS22CS102',
                'full_name': 'Priya Patel',
                'branch': 'Information Science & Engineering',
                'semester': '5th Semester',
                'email': 'priya.p@college.edu',
                'password': 'student123',
                'college': 'Department of Information Science & Engineering',
                'academic_year': '2024–2025',
                'avatar': 'PP',
                'focus_area': 'Cybersecurity (35%) & Python / C'
            }
        ]

        for s_data in demo_students:
            student, s_created = Student.objects.update_or_create(
                student_id=s_data['student_id'],
                defaults=s_data
            )
            verb = 'Created' if s_created else 'Updated'
            self.stdout.write(self.style.SUCCESS(f'✓ {verb} Student: {student.full_name} ({student.student_id})'))

            # Seed Timetable
            Timetable.objects.get_or_create(
                student=student,
                defaults={'schedule_matrix': DEFAULT_TIMETABLE_MATRIX}
            )

            # Seed demo assessments for Sahana K.
            if student.student_id == '1MS22CS095':
                self._seed_sahana_assessments(student)

        self.stdout.write(self.style.SUCCESS('\n🎉 SIP Database successfully seeded and ready for viva evaluation!'))

    def _seed_sahana_assessments(self, student):
        assessments_data = [
            ('C Programming', 'technical', 88.0, 'High', [10, 10, 7.5, 10, 10, 7.5, 7.5, 10, 7.5, 8.0]),
            ('Web Development', 'technical', 85.0, 'High', [10, 10, 7.5, 10, 7.5, 7.5, 7.5, 10, 7.5, 7.5]),
            ('Python', 'technical', 82.5, 'High', [10, 7.5, 10, 7.5, 7.5, 10, 7.5, 7.5, 7.5, 7.5]),
            ('Data Structures & Algorithms', 'technical', 80.0, 'High', [10, 10, 7.5, 7.5, 10, 7.5, 7.5, 7.5, 5.0, 7.5]),
            ('AI / Machine Learning', 'technical', 78.0, 'High', [10, 7.5, 7.5, 7.5, 7.5, 7.5, 10, 7.5, 8.0, 5.0]),
            ('Music', 'creative', 75.0, 'High', [10, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 5.0, 7.5]),
            ('Sports & Fitness', 'sports', 72.0, 'Medium', [7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 5.0, 7.0]),
            ('Cybersecurity', 'technical', 72.5, 'Medium', [7.5, 7.5, 7.5, 7.5, 5.0, 7.5, 10, 7.5, 5.0, 7.5]),
            ('Database Systems (DBMS)', 'technical', 70.0, 'Medium', [7.5, 7.5, 7.5, 7.5, 7.5, 5.0, 7.5, 7.5, 5.0, 7.5]),
            ('Computer Networks', 'technical', 67.5, 'Medium', [7.5, 7.5, 5.0, 7.5, 7.5, 5.0, 7.5, 7.5, 5.0, 7.5]),
            ('Operating Systems', 'technical', 65.0, 'Medium', [7.5, 7.5, 5.0, 7.5, 5.0, 7.5, 5.0, 7.5, 5.0, 7.5]),
            ('UI / UX Design', 'creative', 62.5, 'Medium', [7.5, 7.5, 5.0, 7.5, 5.0, 5.0, 5.0, 7.5, 7.5, 5.0]),
            ('Cloud Computing & DevOps', 'technical', 60.0, 'Medium', [7.5, 5.0, 7.5, 5.0, 5.0, 7.5, 5.0, 7.5, 5.0, 5.0]),
            ('Mobile App Development', 'technical', 58.0, 'Medium', [5.0, 7.5, 5.0, 5.0, 7.5, 5.0, 5.0, 5.0, 7.5, 5.5]),
        ]

        for sub, cat, pct, lvl, scores in assessments_data:
            SubjectAssessment.objects.update_or_create(
                student=student,
                subject_name=sub,
                defaults={
                    'category': cat,
                    'percentage': pct,
                    'level': lvl,
                    'mode': 'questions',
                    'scores': scores,
                    'dimensions': {
                        'curiosity': min(100, int(pct + 4)),
                        'coding': min(100, int(pct - 2)),
                        'debugging': min(100, int(pct - 6)),
                        'career': min(100, int(pct + 2))
                    },
                    'recommendations': f'Demonstrated robust performance in {sub}. Continue academic project portfolio development.'
                }
            )
