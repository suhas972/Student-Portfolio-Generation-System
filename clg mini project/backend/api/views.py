"""
REST API Views for Student Interest Portfolio Report Generator.
5th-Semester Computer Science & Engineering Mini Project
"""

import json
from datetime import datetime
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from .models import Student, Timetable, SubjectAssessment, PortfolioReport

# Standard Subjects Definition for CSE Mini Project
SUBJECT_METADATA = {
    'C Programming': {'category': 'technical', 'icon': '💻'},
    'Web Development': {'category': 'technical', 'icon': '🌐'},
    'Python': {'category': 'technical', 'icon': '🐍'},
    'AI / Machine Learning': {'category': 'technical', 'icon': '🤖'},
    'Cybersecurity': {'category': 'technical', 'icon': '🛡️'},
    'Data Structures & Algorithms': {'category': 'technical', 'icon': '⚡'},
    'Database Systems (DBMS)': {'category': 'technical', 'icon': '🗄️'},
    'Computer Networks': {'category': 'technical', 'icon': '📡'},
    'Operating Systems': {'category': 'technical', 'icon': '⚙️'},
    'UI / UX Design': {'category': 'creative', 'icon': '🎨'},
    'Cloud Computing & DevOps': {'category': 'technical', 'icon': '☁️'},
    'Mobile App Development': {'category': 'technical', 'icon': '📱'},
    'Music': {'category': 'creative', 'icon': '🎵'},
    'Sports & Fitness': {'category': 'sports', 'icon': '⚽'},
}

# Standard Demo Timetable
DEFAULT_TIMETABLE_MATRIX = {
    'Monday': {
        '9:00 AM - 10:00 AM': 'C Programming',
        '10:00 AM - 11:00 AM': 'Music',
        '11:00 AM - 12:00 PM': 'C Programming',
        '2:00 PM - 3:00 PM': 'Sports & Fitness',
        '4:00 PM - 5:00 PM': 'Web Development',
        '5:00 PM - 6:00 PM': 'Web Development'
    },
    'Tuesday': {
        '9:00 AM - 10:00 AM': 'C Programming',
        '10:00 AM - 11:00 AM': 'Music',
        '11:00 AM - 12:00 PM': 'Web Development',
        '2:00 PM - 3:00 PM': 'Sports & Fitness',
        '4:00 PM - 5:00 PM': 'Web Development',
        '6:00 PM - 7:00 PM': 'C Programming'
    },
    'Wednesday': {
        '8:00 AM - 9:00 AM': 'Data Structures & Algorithms',
        '10:00 AM - 11:00 AM': 'C Programming',
        '11:00 AM - 12:00 PM': 'C Programming',
        '3:00 PM - 4:00 PM': 'Music',
        '5:00 PM - 6:00 PM': 'Web Development'
    },
    'Thursday': {
        '9:00 AM - 10:00 AM': 'C Programming',
        '10:00 AM - 11:00 AM': 'Music',
        '2:00 PM - 3:00 PM': 'Sports & Fitness',
        '3:00 PM - 4:00 PM': 'Sports & Fitness',
        '4:00 PM - 5:00 PM': 'Web Development',
        '5:00 PM - 6:00 PM': 'Web Development'
    },
    'Friday': {
        '9:00 AM - 10:00 AM': 'C Programming',
        '10:00 AM - 11:00 AM': 'Music',
        '12:00 PM - 1:00 PM': 'Web Development',
        '2:00 PM - 3:00 PM': 'Sports & Fitness',
        '4:00 PM - 5:00 PM': 'Web Development',
        '6:00 PM - 7:00 PM': 'C Programming'
    },
    'Saturday': {
        '9:00 AM - 10:00 AM': 'C Programming',
        '10:00 AM - 11:00 AM': 'Music',
        '11:00 AM - 12:00 PM': 'C Programming',
        '2:00 PM - 3:00 PM': 'Sports & Fitness',
        '3:00 PM - 4:00 PM': 'Data Structures & Algorithms',
        '4:00 PM - 5:00 PM': 'Data Structures & Algorithms',
        '5:00 PM - 6:00 PM': 'Web Development'
    },
    'Sunday': {
        '10:00 AM - 11:00 AM': 'Music',
        '11:00 AM - 12:00 PM': 'Music',
        '3:00 PM - 4:00 PM': 'Data Structures & Algorithms',
        '5:00 PM - 6:00 PM': 'C Programming'
    }
}

def parse_json_body(request):
    try:
        return json.loads(request.body.decode('utf-8'))
    except Exception:
        return {}


# -------------------------------------------------------------
# 1. AUTHENTICATION & DEMO ACCOUNTS
# -------------------------------------------------------------

@csrf_exempt
@require_http_methods(["POST"])
def auth_login(request):
    """
    POST /api/auth/login/
    Body: { "studentId": "1MS22CS095", "password": "student123" }
    """
    data = parse_json_body(request)
    student_id = (data.get('studentId') or '').strip().upper()
    password = data.get('password') or ''

    if not student_id or not password:
        return JsonResponse({'success': False, 'message': 'Student ID / USN and password are required.'}, status=400)

    try:
        student = Student.objects.get(student_id=student_id)
        if student.password != password:
            return JsonResponse({'success': False, 'message': 'Invalid password. Please try again.'}, status=401)

        return JsonResponse({
            'success': True,
            'message': f'Welcome back, {student.full_name}!',
            'user': student.to_dict()
        })
    except Student.DoesNotExist:
        return JsonResponse({
            'success': False,
            'message': f'No student account found with USN "{student_id}". Please check or register.'
        }, status=404)


@csrf_exempt
@require_http_methods(["POST"])
def auth_register(request):
    """
    POST /api/auth/register/
    Body: { "studentId": "...", "fullName": "...", "branch": "...", "semester": "...", "password": "..." }
    """
    data = parse_json_body(request)
    student_id = (data.get('studentId') or '').strip().upper()
    full_name = (data.get('fullName') or data.get('name') or '').strip()
    branch = data.get('branch') or 'Computer Science & Engineering'
    semester = data.get('semester') or '5th Semester'
    email = (data.get('email') or '').strip()
    password = data.get('password') or ''
    college = data.get('college') or ('Department of ' + ('Computer Science & Engineering' if 'Computer' in branch else branch))

    if not student_id or not full_name or not password:
        return JsonResponse({'success': False, 'message': 'Full name, USN, and password are required.'}, status=400)

    if Student.objects.filter(student_id=student_id).exists():
        return JsonResponse({'success': False, 'message': f'USN "{student_id}" is already registered. Please sign in.'}, status=409)

    # Initials for avatar
    parts = [p for p in full_name.split() if p]
    avatar = (parts[0][0] + parts[-1][0]).upper() if len(parts) > 1 else full_name[:2].upper()

    student = Student.objects.create(
        student_id=student_id,
        full_name=full_name,
        branch=branch,
        semester=semester,
        email=email,
        password=password,
        college=college,
        avatar=avatar,
        focus_area=f"{branch} ({semester})"
    )

    # Automatically initialize default timetable
    Timetable.objects.create(
        student=student,
        schedule_matrix=DEFAULT_TIMETABLE_MATRIX
    )

    return JsonResponse({
        'success': True,
        'message': f'Account created successfully for {student.full_name}!',
        'user': student.to_dict()
    }, status=201)


@require_http_methods(["GET", "HEAD"])
def auth_demo_users(request):
    """
    GET /api/auth/demo-users/
    Returns quick demo accounts for evaluation
    """
    students = Student.objects.all()[:10]
    return JsonResponse({
        'success': True,
        'count': students.count(),
        'users': [s.to_dict() for s in students]
    })


# -------------------------------------------------------------
# 2. STUDENT PROFILE
# -------------------------------------------------------------

@csrf_exempt
@require_http_methods(["GET", "PUT"])
def student_detail(request, usn):
    """
    GET /api/students/<usn>/
    PUT /api/students/<usn>/
    """
    usn = usn.strip().upper()
    student = get_object_or_404(Student, student_id=usn)

    if request.method == 'GET':
        return JsonResponse({'success': True, 'student': student.to_dict()})

    # PUT update
    data = parse_json_body(request)
    if 'fullName' in data or 'name' in data:
        student.full_name = data.get('fullName') or data.get('name')
    if 'branch' in data:
        student.branch = data['branch']
    if 'semester' in data:
        student.semester = data['semester']
    if 'email' in data:
        student.email = data['email']
    if 'college' in data:
        student.college = data['college']
    if 'focusArea' in data:
        student.focus_area = data['focusArea']
    if 'academicYear' in data:
        student.academic_year = data['academicYear']

    student.save()
    return JsonResponse({'success': True, 'message': 'Student profile updated.', 'student': student.to_dict()})


# -------------------------------------------------------------
# 3. WEEKLY TIMETABLE
# -------------------------------------------------------------

@csrf_exempt
@require_http_methods(["GET", "PUT"])
def timetable_detail(request, usn):
    """
    GET /api/timetable/<usn>/
    PUT /api/timetable/<usn>/
    """
    usn = usn.strip().upper()
    student = get_object_or_404(Student, student_id=usn)
    timetable, _ = Timetable.objects.get_or_create(
        student=student,
        defaults={'schedule_matrix': DEFAULT_TIMETABLE_MATRIX}
    )

    if request.method == 'GET':
        return JsonResponse({
            'success': True,
            'studentId': usn,
            'timetable': timetable.schedule_matrix or {}
        })

    # PUT: Save complete timetable
    data = parse_json_body(request)
    matrix = data.get('timetable') if 'timetable' in data else data
    timetable.schedule_matrix = matrix
    timetable.save()

    return JsonResponse({
        'success': True,
        'message': 'Weekly timetable saved successfully.',
        'timetable': timetable.schedule_matrix
    })


@csrf_exempt
@require_http_methods(["POST"])
def timetable_reset(request, usn):
    """
    POST /api/timetable/<usn>/reset/
    Resets student timetable to default demonstration schedule
    """
    usn = usn.strip().upper()
    student = get_object_or_404(Student, student_id=usn)
    timetable, _ = Timetable.objects.get_or_create(student=student)
    timetable.schedule_matrix = DEFAULT_TIMETABLE_MATRIX
    timetable.save()

    return JsonResponse({
        'success': True,
        'message': 'Timetable reset to demo schedule.',
        'timetable': timetable.schedule_matrix
    })


# -------------------------------------------------------------
# 4. SUBJECT ASSESSMENTS & 10-Q DIAGNOSTICS
# -------------------------------------------------------------

@csrf_exempt
@require_http_methods(["GET", "POST"])
def assessments_collection(request, usn):
    """
    GET /api/assessments/<usn>/
    POST /api/assessments/<usn>/
    """
    usn = usn.strip().upper()
    student = get_object_or_404(Student, student_id=usn)

    if request.method == 'GET':
        assessments = SubjectAssessment.objects.filter(student=student)
        res_map = {a.subject_name: a.to_dict() for a in assessments}
        return JsonResponse({
            'success': True,
            'studentId': usn,
            'count': assessments.count(),
            'assessments': res_map
        })

    # POST: Save/update a single assessment or batch
    data = parse_json_body(request)
    subject_name = data.get('subject') or data.get('subjectName')
    if not subject_name:
        return JsonResponse({'success': False, 'message': 'Subject name is required.'}, status=400)

    percentage = float(data.get('percentage', 0.0))
    level = 'High' if percentage >= 75.0 else ('Medium' if percentage >= 50.0 else 'Low')
    category = data.get('category') or SUBJECT_METADATA.get(subject_name, {}).get('category', 'technical')

    assessment, _ = SubjectAssessment.objects.update_or_create(
        student=student,
        subject_name=subject_name,
        defaults={
            'category': category,
            'percentage': percentage,
            'mode': data.get('mode', 'questions'),
            'level': level,
            'scores': data.get('scores', []),
            'dimensions': data.get('dimensions', {}),
            'recommendations': data.get('recommendations', '')
        }
    )

    return JsonResponse({
        'success': True,
        'message': f'Assessment saved for {subject_name}.',
        'assessment': assessment.to_dict()
    })


@csrf_exempt
@require_http_methods(["POST"])
def assessments_auto_fill(request, usn):
    """
    POST /api/assessments/<usn>/auto-assess/
    Instantly populates realistic assessment scores across all 14 subjects.
    """
    usn = usn.strip().upper()
    student = get_object_or_404(Student, student_id=usn)

    demo_scores = {
        'C Programming': {'pct': 88.0, 'cat': 'technical', 'scores': [10, 10, 7.5, 10, 10, 7.5, 7.5, 10, 7.5, 8.0]},
        'Web Development': {'pct': 85.0, 'cat': 'technical', 'scores': [10, 10, 7.5, 10, 7.5, 7.5, 7.5, 10, 7.5, 7.5]},
        'Python': {'pct': 82.5, 'cat': 'technical', 'scores': [10, 7.5, 10, 7.5, 7.5, 10, 7.5, 7.5, 7.5, 7.5]},
        'AI / Machine Learning': {'pct': 78.0, 'cat': 'technical', 'scores': [10, 7.5, 7.5, 7.5, 7.5, 7.5, 10, 7.5, 8.0, 5.0]},
        'Data Structures & Algorithms': {'pct': 80.0, 'cat': 'technical', 'scores': [10, 10, 7.5, 7.5, 10, 7.5, 7.5, 7.5, 5.0, 7.5]},
        'Cybersecurity': {'pct': 72.5, 'cat': 'technical', 'scores': [7.5, 7.5, 7.5, 7.5, 5.0, 7.5, 10, 7.5, 5.0, 7.5]},
        'Database Systems (DBMS)': {'pct': 70.0, 'cat': 'technical', 'scores': [7.5, 7.5, 7.5, 7.5, 7.5, 5.0, 7.5, 7.5, 5.0, 7.5]},
        'Computer Networks': {'pct': 67.5, 'cat': 'technical', 'scores': [7.5, 7.5, 5.0, 7.5, 7.5, 5.0, 7.5, 7.5, 5.0, 7.5]},
        'Operating Systems': {'pct': 65.0, 'cat': 'technical', 'scores': [7.5, 7.5, 5.0, 7.5, 5.0, 7.5, 5.0, 7.5, 5.0, 7.5]},
        'UI / UX Design': {'pct': 62.5, 'cat': 'creative', 'scores': [7.5, 7.5, 5.0, 7.5, 5.0, 5.0, 5.0, 7.5, 7.5, 5.0]},
        'Cloud Computing & DevOps': {'pct': 60.0, 'cat': 'technical', 'scores': [7.5, 5.0, 7.5, 5.0, 5.0, 7.5, 5.0, 7.5, 5.0, 5.0]},
        'Mobile App Development': {'pct': 58.0, 'cat': 'technical', 'scores': [5.0, 7.5, 5.0, 5.0, 7.5, 5.0, 5.0, 5.0, 7.5, 5.5]},
        'Music': {'pct': 75.0, 'cat': 'creative', 'scores': [10, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 5.0, 7.5]},
        'Sports & Fitness': {'pct': 72.0, 'cat': 'sports', 'scores': [7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 5.0, 7.0]},
    }

    result = {}
    for sub, spec in demo_scores.items():
        pct = spec['pct']
        lvl = 'High' if pct >= 75.0 else ('Medium' if pct >= 50.0 else 'Low')
        rec, _ = SubjectAssessment.objects.update_or_create(
            student=student,
            subject_name=sub,
            defaults={
                'category': spec['cat'],
                'percentage': pct,
                'mode': 'questions',
                'level': lvl,
                'scores': spec['scores'],
                'dimensions': {
                    'curiosity': min(100, int(pct + 4)),
                    'coding': min(100, int(pct - 2)),
                    'debugging': min(100, int(pct - 6)),
                    'career': min(100, int(pct + 2))
                },
                'recommendations': f'Keep expanding advanced practical projects and GitHub repositories in {sub}.'
            }
        )
        result[sub] = rec.to_dict()

    return JsonResponse({
        'success': True,
        'message': f'Successfully auto-assessed all {len(result)} subjects for {student.full_name}.',
        'assessments': result
    })


# -------------------------------------------------------------
# 5. PORTFOLIO REPORT & ANALYTICS CALCULATION ENGINE
# -------------------------------------------------------------

@require_http_methods(["GET", "HEAD"])
def report_analytics(request, usn):
    """
    GET /api/reports/<usn>/
    Dynamically computes comprehensive weekly timetable analytics,
    percentage shares, top 3 skill priorities, and natural language narrative.
    """
    usn = usn.strip().upper()
    student = get_object_or_404(Student, student_id=usn)
    timetable_obj, _ = Timetable.objects.get_or_create(
        student=student,
        defaults={'schedule_matrix': DEFAULT_TIMETABLE_MATRIX}
    )
    matrix = timetable_obj.schedule_matrix or {}

    # Calculate hours per subject & active days
    subject_hours = {}
    day_stats = {}
    total_hours = 0
    active_days_count = 0

    days_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    for day in days_order:
        slots = matrix.get(day, {})
        day_active = 0
        day_subjects = {}
        for slot, subj in slots.items():
            if subj and subj.strip():
                s = subj.strip()
                subject_hours[s] = subject_hours.get(s, 0) + 1
                day_subjects[s] = day_subjects.get(s, 0) + 1
                day_active += 1
                total_hours += 1
        
        if day_active > 0:
            active_days_count += 1
        
        day_stats[day] = {
            'hours': day_active,
            'subjects': list(day_subjects.keys()),
            'share': 0.0
        }

    # Recalculate daily percentage shares
    if total_hours > 0:
        for day in day_stats:
            day_stats[day]['share'] = round((day_stats[day]['hours'] / total_hours) * 100, 1)

    # Calculate subject percentage distribution
    subject_ranked = []
    technical_hours = 0
    extracurricular_hours = 0

    for s_name, hours in subject_hours.items():
        pct = round((hours / total_hours) * 100, 1) if total_hours > 0 else 0.0
        cat = SUBJECT_METADATA.get(s_name, {}).get('category', 'technical')
        if cat == 'technical':
            technical_hours += hours
        else:
            extracurricular_hours += hours
            
        subject_ranked.append({
            'subject': s_name,
            'hours': hours,
            'percentage': pct,
            'category': cat,
            'level': 'High' if pct >= 20.0 else ('Medium' if pct >= 10.0 else 'Moderate')
        })

    subject_ranked.sort(key=lambda x: x['hours'], reverse=True)

    tech_share = round((technical_hours / total_hours) * 100, 1) if total_hours > 0 else 0.0
    extra_share = round((extracurricular_hours / total_hours) * 100, 1) if total_hours > 0 else 0.0

    # Top 3
    top3 = subject_ranked[:3]
    while len(top3) < 3:
        top3.append({'subject': 'General Studies', 'hours': 0, 'percentage': 0.0, 'category': 'other', 'level': 'Low'})

    # Algorithmic natural language narrative
    top_name = top3[0]['subject'] if top3 else 'Technical Subjects'
    top_pct = top3[0]['percentage'] if top3 else 0.0
    sec_name = top3[1]['subject'] if len(top3) > 1 else 'Extracurricular'
    sec_pct = top3[1]['percentage'] if len(top3) > 1 else 0.0

    insights = (
        f"Based on {student.full_name}'s analyzed weekly schedule ({total_hours} tracked hours across {active_days_count} active days), "
        f"{top_name} emerges as the primary core pursuit, representing {top_pct}% of total weekly expenditure. "
        f"{sec_name} constitutes the secondary focal area at {sec_pct}%. "
        f"The student maintains a healthy balance of {tech_share}% technical discipline dedication against {extra_share}% creative and sports development."
    )

    report_payload = {
        'student': student.to_dict(),
        'generatedAt': datetime.now().strftime('%Y-%m-%d %I:%M %p'),
        'totalWeeklyHours': total_hours,
        'activeDays': active_days_count,
        'consistency': f"{active_days_count}/7 Days Active",
        'technicalShare': tech_share,
        'extracurricularShare': extra_share,
        'dayStats': day_stats,
        'subjectDistribution': subject_ranked,
        'top3': top3,
        'insights': insights
    }

    return JsonResponse({'success': True, 'report': report_payload})


@csrf_exempt
@require_http_methods(["POST"])
def report_save(request, usn):
    """
    POST /api/reports/<usn>/save/
    Archives a generated report in the database.
    """
    usn = usn.strip().upper()
    student = get_object_or_404(Student, student_id=usn)
    data = parse_json_body(request)

    rep = PortfolioReport.objects.create(
        student=student,
        academic_year=data.get('academicYear', student.academic_year),
        total_weekly_hours=float(data.get('totalWeeklyHours', 0.0)),
        active_days=int(data.get('activeDays', 0)),
        technical_share=float(data.get('technicalShare', 0.0)),
        extracurricular_share=float(data.get('extracurricularShare', 0.0)),
        top_interests=data.get('top3', []),
        insights_summary=data.get('insights', ''),
        full_report_data=data
    )

    return JsonResponse({
        'success': True,
        'message': 'Portfolio report archived successfully.',
        'reportId': rep.id
    }, status=201)


@require_http_methods(["GET", "HEAD"])
def report_history(request, usn):
    """
    GET /api/reports/<usn>/history/
    Retrieves list of previously archived portfolio reports.
    """
    usn = usn.strip().upper()
    student = get_object_or_404(Student, student_id=usn)
    reports = PortfolioReport.objects.filter(student=student)[:20]

    return JsonResponse({
        'success': True,
        'studentId': usn,
        'count': reports.count(),
        'reports': [r.to_dict() for r in reports]
    })


# -------------------------------------------------------------
# 6. SYSTEM HEALTH & DEVELOPER PORTAL
# -------------------------------------------------------------

@require_http_methods(["GET", "HEAD"])
def system_health(request):
    """
    GET /api/health/
    Health check status endpoint.
    """
    return JsonResponse({
        'status': 'healthy',
        'service': 'Student Interest Portfolio Report Generator API',
        'framework': 'Python / Django 6.1',
        'timestamp': datetime.now().isoformat(),
        'database': 'SQLite3 (Active)',
        'metrics': {
            'studentsCount': Student.objects.count(),
            'timetablesCount': Timetable.objects.count(),
            'assessmentsCount': SubjectAssessment.objects.count(),
            'savedReportsCount': PortfolioReport.objects.count()
        }
    })


def api_dashboard(request):
    """
    GET / or /api/
    Interactive Visual Developer API Dashboard
    """
    total_students = Student.objects.count()
    total_assessments = SubjectAssessment.objects.count()
    total_reports = PortfolioReport.objects.count()

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SIP Report Generator • Django REST API Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {{
      --bg: #0b0f19;
      --card-bg: #111827;
      --card-border: #1f2937;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --primary: #4f46e5;
      --primary-hover: #4338ca;
      --success: #10b981;
      --code-bg: #030712;
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 40px 20px;
    }}
    .container {{
      max-width: 1000px;
      margin: 0 auto;
    }}
    .header {{
      background: linear-gradient(135deg, #1e1b4b, #312e81);
      border: 1px solid #4338ca;
      border-radius: 16px;
      padding: 32px;
      margin-bottom: 32px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);
    }}
    .badge {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid var(--success);
      color: var(--success);
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 12px;
    }}
    .badge::before {{
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--success);
      box-shadow: 0 0 10px var(--success);
    }}
    h1 {{ font-size: 2.2rem; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.02em; }}
    .subtitle {{ color: #c7d2fe; font-size: 1.05rem; }}
    .stats-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }}
    .stat-card {{
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
    }}
    .stat-num {{ font-size: 2.2rem; font-weight: 800; color: #818cf8; font-family: 'JetBrains Mono', monospace; }}
    .stat-lbl {{ color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px; }}
    .section-title {{ font-size: 1.4rem; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }}
    .endpoints-list {{ display: flex; flex-direction: column; gap: 12px; margin-bottom: 40px; }}
    .endpoint-item {{
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.2s;
    }}
    .endpoint-item:hover {{
      border-color: #6366f1;
      transform: translateX(4px);
    }}
    .method {{
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      font-size: 0.85rem;
      padding: 4px 10px;
      border-radius: 6px;
      min-width: 65px;
      text-align: center;
    }}
    .get {{ background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid #3b82f6; }}
    .post {{ background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid #10b981; }}
    .put {{ background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid #f59e0b; }}
    .path {{ font-family: 'JetBrains Mono', monospace; font-size: 0.95rem; margin-left: 12px; color: #e0e7ff; }}
    .desc {{ color: var(--text-muted); font-size: 0.88rem; margin-left: auto; margin-right: 16px; }}
    .action-btn {{
      background: #374151;
      color: #fff;
      padding: 6px 14px;
      border-radius: 6px;
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 600;
      transition: background 0.2s;
    }}
    .action-btn:hover {{ background: #4b5563; }}
    .quick-links {{
      display: flex;
      gap: 16px;
      margin-top: 24px;
      flex-wrap: wrap;
    }}
    .btn-main {{
      background: var(--primary);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 700;
      text-decoration: none;
      transition: background 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }}
    .btn-main:hover {{ background: var(--primary-hover); }}
    .btn-secondary {{
      background: #1f2937;
      color: #e5e7eb;
      border: 1px solid #374151;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.2s;
    }}
    .btn-secondary:hover {{ background: #374151; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">Django 6.1 Backend Active</div>
      <h1>Student Interest Portfolio • REST API</h1>
      <p class="subtitle">5th-Semester Computer Science &amp; Engineering Mini Project Backend Server</p>
      <div class="quick-links">
        <a href="/admin/" target="_blank" class="btn-main">🔐 Open Django Admin Panel</a>
        <a href="/api/health/" target="_blank" class="btn-secondary">🩺 Live Health Check</a>
        <a href="/api/reports/1MS22CS095/" target="_blank" class="btn-secondary">📊 Test Report API (Sahana K.)</a>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-num">{total_students}</div>
        <div class="stat-lbl">Registered Students</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">{total_assessments}</div>
        <div class="stat-lbl">Subject Assessments</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">{total_reports}</div>
        <div class="stat-lbl">Archived Reports</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">SQLite</div>
        <div class="stat-lbl">Database Engine</div>
      </div>
    </div>

    <h2 class="section-title">🚀 Available API Endpoints</h2>
    <div class="endpoints-list">
      
      <div class="endpoint-item">
        <span class="method get">GET</span>
        <span class="path">/api/health/</span>
        <span class="desc">System health, uptime, and database status</span>
        <a href="/api/health/" target="_blank" class="action-btn">Test &rarr;</a>
      </div>

      <div class="endpoint-item">
        <span class="method get">GET</span>
        <span class="path">/api/auth/demo-users/</span>
        <span class="desc">Pre-configured demo student accounts</span>
        <a href="/api/auth/demo-users/" target="_blank" class="action-btn">Test &rarr;</a>
      </div>

      <div class="endpoint-item">
        <span class="method post">POST</span>
        <span class="path">/api/auth/login/</span>
        <span class="desc">Authenticate student via USN &amp; password</span>
        <span class="action-btn" style="opacity: 0.6;">POST</span>
      </div>

      <div class="endpoint-item">
        <span class="method post">POST</span>
        <span class="path">/api/auth/register/</span>
        <span class="desc">Register new student and initialize timetable</span>
        <span class="action-btn" style="opacity: 0.6;">POST</span>
      </div>

      <div class="endpoint-item">
        <span class="method get">GET</span>
        <span class="path">/api/students/1MS22CS095/</span>
        <span class="desc">Fetch student profile particulars</span>
        <a href="/api/students/1MS22CS095/" target="_blank" class="action-btn">Test &rarr;</a>
      </div>

      <div class="endpoint-item">
        <span class="method get">GET</span>
        <span class="path">/api/timetable/1MS22CS095/</span>
        <span class="desc">Fetch weekly Monday-to-Sunday schedule matrix</span>
        <a href="/api/timetable/1MS22CS095/" target="_blank" class="action-btn">Test &rarr;</a>
      </div>

      <div class="endpoint-item">
        <span class="method get">GET</span>
        <span class="path">/api/assessments/1MS22CS095/</span>
        <span class="desc">Fetch student's 14 subject interest assessments</span>
        <a href="/api/assessments/1MS22CS095/" target="_blank" class="action-btn">Test &rarr;</a>
      </div>

      <div class="endpoint-item">
        <span class="method get">GET</span>
        <span class="path">/api/reports/1MS22CS095/</span>
        <span class="desc">Generate dynamic academic portfolio report</span>
        <a href="/api/reports/1MS22CS095/" target="_blank" class="action-btn">Test &rarr;</a>
      </div>

    </div>
  </div>
</body>
</html>
"""
    return HttpResponse(html)


# -------------------------------------------------------------
# 7. FRONTEND STATIC & PAGE SERVING (For Mobile & Remote Access)
# -------------------------------------------------------------

import mimetypes
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent

def serve_frontend_file(request, filename):
    """
    Serves frontend application files (HTML, CSS, JS) directly from project root,
    allowing mobile phones and remote network devices to access the full application.
    """
    safe_filename = Path(filename).name
    file_path = PROJECT_ROOT / safe_filename
    if file_path.exists() and file_path.is_file():
        mime_type, _ = mimetypes.guess_type(str(file_path))
        if safe_filename.endswith('.js'):
            mime_type = 'application/javascript'
        elif safe_filename.endswith('.css'):
            mime_type = 'text/css'
        elif safe_filename.endswith('.html'):
            mime_type = 'text/html'
            
        with open(file_path, 'rb') as f:
            return HttpResponse(f.read(), content_type=mime_type or 'application/octet-stream')
    return HttpResponse(f"File {filename} not found.", status=404)

def serve_home_page(request):
    """Serves the login page by default when accessing root /"""
    return serve_frontend_file(request, 'login.html')

