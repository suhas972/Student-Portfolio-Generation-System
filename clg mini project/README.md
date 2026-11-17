# Student Interest Portfolio Report Generator
**5th-Semester Computer Science & Engineering Mini Project**

---

## 📌 Project Overview
The **Student Interest Portfolio Report Generator** is a responsive, web-based analytical tool designed to map and evaluate a student's weekly routine across technical, creative, sports, and extracurricular pursuits. 

By taking an hourly **Monday-to-Sunday weekly timetable**, the system dynamically computes time expenditure, calculates interest percentages, identifies top preferences, generates natural-language analytical insights, and produces a printable, evaluation-ready **Academic Student Interest Portfolio Report**.

---

## 🚀 Key Features

1. **Individual Student Authentication & Isolated Data System (`login.html` & `auth.js`)**:
   - Dedicated authentication portal with split showcase and interactive card tabs.
   - **Student Login & Quick Account Switcher**: Sign in using registered Student ID / USN and password, or use 1-click quick sign-in cards for pre-configured student accounts:
     - **Sahana K.** (`1MS22CS095` / `student123`) &bull; CSE (Focus: C Programming & Web Development)
     - **Rahul Sharma** (`1MS22CS080` / `student123`) &bull; AIML (Focus: AI / Machine Learning & Python)
     - **Priya Patel** (`1MS22CS102` / `student123`) &bull; ISE (Focus: Cybersecurity & Systems)
   - **Student Registration**: Create a new account with Full Name, USN, Branch, Semester, College Email, and Password.
   - **Complete Data Isolation**: Each student has their own isolated timetable (`sip_timetable_<USN>`), interest calculations, and portfolio reports saved independently in `localStorage`. Modifications made by one student do not affect any other student!
   - **Intuitive Logout Experience**: Prominent logout buttons in the header, sidebar, and settings tab with confirmation dialog, active student badge in the top bar, and secure session clearing.

2. **Question-Based & Manual Subject Interest Analysis Studio**:
   - **Click Any Subject for 10-Question Diagnostic Analysis**: Simply click any of the 14 core subjects (C Programming, Web Dev, Python, AI/ML, Cybersecurity, DSA, DBMS, Computer Networks, Operating Systems, UI/UX Design, Cloud/DevOps, Mobile App, Music, Sports & Fitness) to immediately load **10 domain-specific diagnostic questions**.
   - **5-Point Weighted Response Scale**:
     - ⭐⭐⭐⭐⭐ **Passionate / Love this**: 10.0 pts (Extremely interested; spends extra time exploring beyond syllabus).
     - ⭐⭐⭐⭐ **High Interest**: 7.5 pts (Very interested; enjoys building hands-on projects).
     - ⭐⭐⭐ **Moderate Interest**: 5.0 pts (Comfortable working when required by coursework).
     - ⭐⭐ **Mild / Reluctant**: 2.5 pts (Minimal enthusiasm; basic requirements only).
     - ⭐ **Low / No Interest**: 0.0 pts (No interest; avoids in favor of other pursuits).
   - **Live Mathematical Percentage Calculation**:
     $$\text{Interest Percentage (\%)} = \sum_{i=1}^{10} \text{Points}_i \quad (\text{out of } 100\%)$$
   - **Manual Percentage Override / Slider Mode**: Direct slider and number input (0% to 100%) allowing manual percentage calibration for any subject.
   - **Calculated Results Hero Card**:
     - Exact percentage score badge (e.g., **88.0%**).
     - Interest Level Classification: **High** ($\ge 75\%$), **Medium** ($50\% - 74\%$), or **Low** ($< 50\%$).
     - 4-Dimension Metric Breakdown: **Conceptual Curiosity**, **Hands-on Coding**, **Debugging Drive**, and **Career Alignment**.
     - Academic significance, industry career pathways, and actionable faculty recommendations for 5th Sem CSE mini-projects.
   - **⚡ 1-Click Auto-Fill Demo**: Instantly populates realistic assessment scores for rapid demonstration and teacher viva evaluation.

3. **Academic Dashboard**:
   - Executive statistics: Subjects Assessed (out of 14), Mean Interest Score (%), Top Interest Subject, and Highest Interest Percentage.
   - Quick workflow action bar: 10-Q Interest Analysis, Generate Portfolio Report, Auto-Assess All Demo Subjects, Reset Data.
   - Subject Diagnostic Launcher Grid: 14 clickable subject cards showing evaluated percentage badges.
   - Top 3 Interests Podium (Gold, Silver, Bronze badges) linking directly to question diagnostics.
   - Dynamic natural-language summary preview.

4. **Interest Percentage Analysis Visualizations**:
   - Circular / Donut SVG chart with percentage inspection and subject highlighting.
   - Horizontal comparative bar chart with proportional width meters.
   - Subject Percentage Cards with 1-click test launcher.
   - Comprehensive matrix table classifying interest levels:
     - **High**: $\ge 75\%$
     - **Medium**: $50\% - 74\%$
     - **Low**: $< 50\%$

5. **Automated Algorithmic Insights Engine**:
   - Natural language generation based on calculated distribution:
     > *"Based on the student's weekly routine, C Programming is the strongest area of interest, accounting for 30% of the total tracked activity time. Web Development is the second-highest interest at 25%, followed by Music at 20%."*
   - Categorical leadership breakdown (Technical champion, Extracurricular champion, Sports champion).
   - Productivity, consistency, and active day analysis.

6. **Weekly-Based Student Interest Portfolio Report**:
   - Official institution-formatted academic document formatted for Monday-to-Sunday weekly analysis.
   - **Student Particulars**: Name, USN/ID, Branch, Semester, College, Academic Year.
   - **Weekly Summary & Percentage Metrics**: Total Weekly Hours, Consistency (Active Days / 7), Technical Weekly Share %, Extracurricular Weekly Share %.
   - **Day-Wise Weekly Routine Breakdown Table**: Mon-to-Sun breakdown listing daily active subjects, total daily hours, exact weekly contribution share (%), and visual percentage meter bars.
   - **Top 3 Priority Weekly Interests**: Gold/Silver/Bronze ranking displaying primary, secondary, and tertiary skills with exact percentage shares and dedicated weekly hours.
   - **Comprehensive Weekly Activity Percentage Matrix**: Ranked table of every tracked activity with weekly hours, percentage share ($\%$), category badge, and interest level indicator.
   - **Categorical Weekly Profile Breakdown**: Clustered lists across Technical, Creative, Sports, and Other pursuits.
   - **Algorithmic Weekly Assessment**: Automatically synthesized pedagogical narrative evaluating balance and focus.
   - **Signatures & Seals**: Student Declaration, Faculty Advisor Endorsement, and Head of Department (HOD) approval seals.
   - **1-Click Print & PDF Generation**: Dedicated `@media print` CSS rules generating a clean, margin-optimized academic PDF report.

7. **Student Settings & Multi-User Management**:
   - LocalStorage persistence (no database or backend required).
   - Profile editor (Name, USN, Branch, Semester).
   - JSON Backup and Restore capability.
   - Quick Logout and Student Switch button to return to the Login portal.
   - Dark Mode / Light Mode toggle.

---

## 🛠️ Technology Stack
- **Backend Framework**: Python 3.15 & Django 6.1 (RESTful API, ORM, Models, Views, Admin Portal)
- **Database**: SQLite3 (`db.sqlite3` with relational schema for Students, Timetables, Assessments, Reports)
- **Frontend Structure**: Semantic HTML5 (`index.html`, `login.html`)
- **Styling**: Vanilla CSS3 (`style.css` - Custom design system, CSS variables, Flexbox, CSS Grid, `@media print`)
- **Frontend Logic**: Vanilla ES6 JavaScript (`app.js`, `auth.js`, `api.js` - Dual online Django API sync + offline fallback)
- **Visualizations**: Native Vector SVG & CSS3 animations (Zero external heavy dependencies)

---

## 💻 How to Run

### 1. Launch the Python Django Backend Server:
- **1-Click**: Double-click [`run_backend.bat`](run_backend.bat) in the project root folder.
- Or run in terminal:
  ```bash
  cd backend
  python manage.py runserver 127.0.0.1:8000
  ```
- **Live Server URLs**:
  - Developer API Dashboard: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
  - Django Admin Panel: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/) (User: `admin` | Pass: `admin123`)
  - REST Health Status: [http://127.0.0.1:8000/api/health/](http://127.0.0.1:8000/api/health/)

### 2. Launch the Web Application:
- Double-click [`login.html`](login.html) or open it in any browser (Chrome, Edge, Firefox).
- The web app will automatically detect the Django server and display `🟢 Django Backend Connected (Port 8000)`!
- **Note**: The frontend also features an offline fallback—if the Django server is ever stopped, it seamlessly falls back to `localStorage` so your viva demonstration will **never fail**.
---

## 🎯 Demonstration Flow (For HOD & Project Review)

1. **Open Login Portal (`login.html`)**:
   - Demonstrate the dedicated Login and Registration interface.
   - Use the **Demo Credentials**: USN: `1MS22CS095` &bull; Password: `student123`.
   - Or click **"⚡ Instant One-Click Demo Login"** to navigate directly to the dashboard.
   - Alternatively, test **"Register New Student"** to demonstrate multi-student onboarding.

2. **Inspect Dashboard (`index.html`)**:
   - Review personalized student greeting and identity chips matching the signed-in user.
   - Review executive KPIs and Top 3 interest podium.

3. **Analyze Interests**:
   - View the interactive SVG Donut Chart, Horizontal Bar Chart, and Day-Wise Activity Chart.
   - Review the clean interest distribution matrix (percentages and priority classification).

4. **Generate Portfolio Report**:
   - Open the **Portfolio Report** tab.
   - View Section 3 (Top 3 Interests & Distribution Matrix) with Student, Faculty Advisor, and HOD signature blocks.
   - Click **Save as PDF / Print Report** for print-ready A4 formatting.

5. **Logout / Switch Student**:
   - Click **"🚪 Logout"** or **"🔄 Switch Student"** in the sidebar or top header to return to the Login portal and authenticate as another student.

---

## 📄 License
Academic Mini Project — Department of Computer Science & Engineering.
