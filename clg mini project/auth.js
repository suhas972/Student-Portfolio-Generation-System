/**
 * Student Interest Portfolio Report Generator
 * Multi-Student Authentication & Individual Session Management (auth.js)
 * 5th Semester CSE Mini Project
 */

(function () {
  'use strict';

  // Pre-configured Sample Student Accounts for Demo & Evaluation
  const DEFAULT_STUDENTS = [
    {
      name: 'Sahana K.',
      fullName: 'Sahana K.',
      studentId: '1MS22CS095',
      branch: 'Computer Science & Engineering',
      semester: '5th Semester',
      email: 'sahana@college.edu',
      password: 'student123',
      college: 'Department of Computer Science & Engineering',
      academicYear: '2024–2025',
      avatar: 'SK',
      focusArea: 'C Programming (30%) & Web Dev (25%)'
    },
    {
      name: 'Rahul Sharma',
      fullName: 'Rahul Sharma',
      studentId: '1MS22CS080',
      branch: 'Artificial Intelligence & Machine Learning',
      semester: '5th Semester',
      email: 'rahul.s@college.edu',
      password: 'student123',
      college: 'Department of Artificial Intelligence & Machine Learning',
      academicYear: '2024–2025',
      avatar: 'RS',
      focusArea: 'AI / Machine Learning (35%) & Python (25%)'
    },
    {
      name: 'Priya Patel',
      fullName: 'Priya Patel',
      studentId: '1MS22CS102',
      branch: 'Information Science & Engineering',
      semester: '5th Semester',
      email: 'priya.p@college.edu',
      password: 'student123',
      college: 'Department of Information Science & Engineering',
      academicYear: '2024–2025',
      avatar: 'PP',
      focusArea: 'Cybersecurity (35%) & Python / C'
    }
  ];

  // Primary Default Account (Sahana K.)
  const DEFAULT_DEMO_USER = DEFAULT_STUDENTS[0];

  // --- Storage Helpers ---
  function getUsers() {
    try {
      const usersStr = localStorage.getItem('sip_users');
      if (usersStr) {
        let users = JSON.parse(usersStr);
        if (Array.isArray(users)) {
          // Merge any missing default demo accounts to ensure quick testing works reliably
          let updated = false;
          DEFAULT_STUDENTS.forEach(defUser => {
            const exists = users.some(u => u.studentId && u.studentId.toUpperCase() === defUser.studentId.toUpperCase());
            if (!exists) {
              users.push(defUser);
              updated = true;
            }
          });
          if (updated) {
            localStorage.setItem('sip_users', JSON.stringify(users));
          }
          return users;
        }
      }
    } catch (e) {
      console.error('Error reading sip_users from localStorage', e);
    }

    // First time initialization: populate with default student accounts
    localStorage.setItem('sip_users', JSON.stringify(DEFAULT_STUDENTS));
    return DEFAULT_STUDENTS;
  }

  function saveUsers(users) {
    try {
      localStorage.setItem('sip_users', JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users', e);
    }
  }

  // --- Session Management ---
  function getCurrentUser() {
    try {
      const cur = localStorage.getItem('sip_current_user');
      return cur ? JSON.parse(cur) : null;
    } catch (e) {
      return null;
    }
  }

  function setCurrentUserSession(user) {
    const sessionObj = {
      name: user.fullName || user.name || 'Sahana K.',
      fullName: user.fullName || user.name || 'Sahana K.',
      studentId: (user.studentId || '1MS22CS095').toUpperCase(),
      branch: user.branch || 'Computer Science & Engineering',
      semester: user.semester || '5th Semester',
      college: user.college || ('Department of ' + (user.branch || 'Computer Science & Engineering')),
      academicYear: user.academicYear || '2024–2025',
      email: user.email || '',
      loginTimestamp: new Date().toISOString()
    };

    // Save active session token
    localStorage.setItem('sip_current_user', JSON.stringify(sessionObj));

    // Also persist student-specific profile
    localStorage.setItem(`sip_profile_${sessionObj.studentId}`, JSON.stringify(sessionObj));
    localStorage.setItem('sip_profile', JSON.stringify(sessionObj));
  }

  function logout(forceRedirect = true) {
    try {
      localStorage.removeItem('sip_current_user');
    } catch (e) {}
    if (forceRedirect) {
      window.location.href = 'login.html?logout=success';
    }
  }

  // --- Tab Switching ---
  function switchTab(mode) {
    const loginTabBtn = document.getElementById('tabLoginBtn');
    const regTabBtn = document.getElementById('tabRegisterBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const alertBox = document.getElementById('authAlert');

    if (alertBox) alertBox.style.display = 'none';

    if (mode === 'register') {
      if (loginTabBtn) loginTabBtn.classList.remove('active');
      if (regTabBtn) regTabBtn.classList.add('active');
      if (loginForm) loginForm.style.display = 'none';
      if (registerForm) registerForm.style.display = 'block';
    } else {
      if (regTabBtn) regTabBtn.classList.remove('active');
      if (loginTabBtn) loginTabBtn.classList.add('active');
      if (registerForm) registerForm.style.display = 'none';
      if (loginForm) loginForm.style.display = 'block';
    }
  }

  // --- Password Visibility Toggle ---
  function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = '🙈';
    } else {
      input.type = 'password';
      btn.textContent = '👁️';
    }
  }

  // --- Alert Notice Helper ---
  function showAlert(msg, type = 'danger') {
    const alertBox = document.getElementById('authAlert');
    if (!alertBox) return;
    alertBox.className = `auth-alert alert-${type}`;
    alertBox.innerHTML = `<span>${type === 'success' ? '✓' : '⚠️'}</span> <div>${msg}</div>`;
    alertBox.style.display = 'flex';
  }

  // --- Login Handler ---
  async function handleLogin() {
    const idInput = document.getElementById('loginStudentId');
    const pwdInput = document.getElementById('loginPassword');

    const studentId = idInput ? idInput.value.trim().toUpperCase() : '';
    const password = pwdInput ? pwdInput.value : '';

    if (!studentId || !password) {
      showAlert('Please enter both Student ID / USN and password.');
      return;
    }

    // Try Django Backend if available
    if (window.SIP_API && window.SIP_API.isOnline) {
      try {
        const res = await window.SIP_API.login(studentId, password);
        if (res && res.success && res.user) {
          setCurrentUserSession(res.user);
          showAlert(`Welcome back, <strong>${res.user.fullName}</strong> (${res.user.studentId})! Authenticated via Django Backend.`, 'success');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 600);
          return;
        }
      } catch (err) {
        showAlert(err.message || 'Authentication error from Django backend.');
        return;
      }
    }

    // Offline / LocalStorage Fallback
    const users = getUsers();
    const user = users.find(u => u.studentId && u.studentId.toUpperCase() === studentId);

    if (!user) {
      showAlert(`No student account found with USN "<strong>${studentId}</strong>". Please check your credentials or register a new student account.`);
      return;
    }

    if (user.password !== password) {
      showAlert('Incorrect password. Please try again or click one of the quick demo student accounts below.');
      return;
    }

    // Login successful
    setCurrentUserSession(user);
    showAlert(`Welcome back, <strong>${user.fullName}</strong> (${user.studentId})! Loading your individual portfolio...`, 'success');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 600);
  }

  // --- Registration Handler ---
  async function handleRegister() {
    const name = document.getElementById('regFullName').value.trim();
    const studentId = document.getElementById('regStudentId').value.trim().toUpperCase();
    const branch = document.getElementById('regBranch').value;
    const semester = document.getElementById('regSemester').value;
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (!name || !studentId || !password) {
      showAlert('Please complete all required fields marked with *.');
      return;
    }

    if (password.length < 4) {
      showAlert('Password should be at least 4 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Passwords do not match. Please re-enter carefully.');
      return;
    }

    // Compute initials for avatar
    const nameParts = name.split(' ').filter(Boolean);
    const initials = nameParts.length > 1 
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();

    // Create user object
    const newUser = {
      name: name,
      fullName: name,
      studentId: studentId,
      branch: branch,
      semester: semester,
      email: email || '',
      password: password,
      college: 'Department of ' + (branch.includes('Computer Science') ? 'Computer Science & Engineering' : branch),
      academicYear: '2024–2025',
      avatar: initials,
      focusArea: `${branch} (${semester})`
    };

    // Try Django Backend if available
    if (window.SIP_API && window.SIP_API.isOnline) {
      try {
        const res = await window.SIP_API.register(newUser);
        if (res && res.success && res.user) {
          const users = getUsers();
          users.push(res.user);
          saveUsers(users);
          setCurrentUserSession(res.user);
          showAlert(`Account registered in Django SQLite database for <strong>${name}</strong> (${studentId})! Initializing dashboard...`, 'success');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 700);
          return;
        }
      } catch (err) {
        showAlert(err.message || 'Registration failed on Django backend.');
        return;
      }
    }

    // Offline / LocalStorage Fallback
    const users = getUsers();
    const exists = users.some(u => u.studentId && u.studentId.toUpperCase() === studentId);

    if (exists) {
      showAlert(`A student with USN "<strong>${studentId}</strong>" is already registered. Please sign in instead.`);
      return;
    }

    users.push(newUser);
    saveUsers(users);

    // Set active session for new student
    setCurrentUserSession(newUser);
    showAlert(`Account created successfully for <strong>${name}</strong> (${studentId})! Initializing your personal portfolio dashboard...`, 'success');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 700);
  }

  // --- Quick Fill for Specific Student ---
  function fillStudentCredentials(usn) {
    const users = getUsers();
    const user = users.find(u => u.studentId && u.studentId.toUpperCase() === usn.toUpperCase()) || DEFAULT_DEMO_USER;

    const idInput = document.getElementById('loginStudentId');
    const pwdInput = document.getElementById('loginPassword');

    if (idInput) idInput.value = user.studentId;
    if (pwdInput) pwdInput.value = user.password;

    showAlert(`Credentials populated for <strong>${user.fullName}</strong> (${user.studentId}). Click <strong>"Sign In to Dashboard"</strong> or press Enter.`, 'success');
  }

  // --- 1-Click Instant Login for Specific Student ---
  function loginAsStudent(usn) {
    const users = getUsers();
    const user = users.find(u => u.studentId && u.studentId.toUpperCase() === usn.toUpperCase()) || DEFAULT_DEMO_USER;

    setCurrentUserSession(user);
    showAlert(`⚡ Signing in as <strong>${user.fullName}</strong> (${user.studentId}) &bull; ${user.branch}...`, 'success');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 400);
  }

  // --- Render Dynamic Student Switcher Cards on Login Page ---
  function renderStudentAccountsList() {
    const container = document.getElementById('studentAccountsList');
    if (!container) return;

    const users = getUsers();
    if (!users || users.length === 0) return;

    let html = '';
    users.forEach(u => {
      const initials = u.avatar || (u.fullName ? u.fullName.slice(0, 2).toUpperCase() : 'ST');
      const focusText = u.focusArea || `${u.branch} • ${u.semester}`;
      
      html += `
        <div class="student-account-card" data-usn="${u.studentId}">
          <div class="sac-left">
            <div class="sac-avatar">${initials}</div>
            <div class="sac-info">
              <div class="sac-name">${u.fullName || u.name}</div>
              <div class="sac-usn"><code>${u.studentId}</code> <span class="sac-branch">&bull; ${u.branch}</span></div>
              <div class="sac-focus">${focusText}</div>
            </div>
          </div>
          <div class="sac-actions">
            <button type="button" class="btn btn-xs btn-outline" onclick="auth.fillStudentCredentials('${u.studentId}')" title="Fill Credentials">
              Auto Fill
            </button>
            <button type="button" class="btn btn-xs btn-primary" onclick="auth.loginAsStudent('${u.studentId}')" title="1-Click Login">
              Sign In ⚡
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // --- Check Active Session & Query Status ---
  function checkSessionNotice() {
    const params = new URLSearchParams(window.location.search);
    const sessionNotice = document.getElementById('activeSessionNotice');

    // Check if coming from a logout action
    if (params.get('logout') === 'success' || params.get('logout') === '1') {
      showAlert('✅ <strong>Logged Out Successfully:</strong> Your student session was securely ended. Select an account or enter credentials to sign back in.', 'success');
      return;
    }

    const cur = getCurrentUser();
    if (cur && cur.studentId && sessionNotice) {
      sessionNotice.style.display = 'block';
      const nameEl = document.getElementById('curSessionName');
      const usnEl = document.getElementById('curSessionUSN');
      if (nameEl) nameEl.textContent = cur.fullName || cur.name;
      if (usnEl) usnEl.textContent = cur.studentId;
    }
  }

  // --- Theme Toggle ---
  function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', nextTheme);
    localStorage.setItem('sip_theme', nextTheme);
  }

  // --- Initialization ---
  function init() {
    const savedTheme = localStorage.getItem('sip_theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);

    // Ensure users array is initialized
    getUsers();

    // Render registered accounts switcher
    renderStudentAccountsList();

    // Check session notices (logout success or already logged-in)
    checkSessionNotice();

    // Bind tab clicks
    const tabLogin = document.getElementById('tabLoginBtn');
    const tabReg = document.getElementById('tabRegisterBtn');
    if (tabLogin) tabLogin.addEventListener('click', () => switchTab('login'));
    if (tabReg) tabReg.addEventListener('click', () => switchTab('register'));

    // Bind theme button
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  }

  // Expose methods to global auth namespace
  window.auth = {
    switchTab,
    togglePasswordVisibility,
    handleLogin,
    handleRegister,
    fillStudentCredentials,
    loginAsStudent,
    logout,
    fillDemoCredentials: () => fillStudentCredentials('1MS22CS095'),
    quickDemoLogin: () => loginAsStudent('1MS22CS095'),
    renderStudentAccountsList
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
