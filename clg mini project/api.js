/**
 * Student Interest Portfolio Report Generator
 * Django REST API Integration Layer (api.js)
 * 5th Semester CSE Mini Project
 * 
 * Provides transparent communication between the frontend and Django 6.1 backend,
 * with intelligent automatic offline fallback to browser localStorage.
 */

(function () {
  'use strict';

  // Auto-detect Django Backend Host (works seamlessly on Desktop, Laptop, and Mobile over Wi-Fi)
  function resolveApiBaseUrl() {
    try {
      if (typeof window !== 'undefined' && window.location) {
        const proto = window.location.protocol.startsWith('http') ? window.location.protocol : 'http:';
        const hostname = window.location.hostname && window.location.hostname !== '' ? window.location.hostname : '127.0.0.1';
        const port = window.location.port ? window.location.port : '8000';
        return `${proto}//${hostname}:${port}/api`;
      }
    } catch (e) {}
    return 'http://127.0.0.1:8000/api';
  }

  const API_BASE_URL = resolveApiBaseUrl();

  const SIP_API = {
    baseUrl: API_BASE_URL,
    isOnline: false,
    checked: false,

    /**
     * Check if Django Backend is online and responsive
     */
    async checkConnection() {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);

        const res = await fetch(`${this.baseUrl}/health/`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          this.isOnline = true;
          this.checked = true;
          this.updateConnectionUI(true);
          return true;
        }
      } catch (err) {
        // Backend offline or unreachable
      }

      this.isOnline = false;
      this.checked = true;
      this.updateConnectionUI(false);
      return false;
    },

    /**
     * Update visual status indicators across the UI
     */
    updateConnectionUI(isOnline) {
      // 1. Sidebar status element
      const statusEls = document.querySelectorAll('.system-status, .showcase-footer-note');
      statusEls.forEach(el => {
        if (isOnline) {
          el.innerHTML = `
            <span class="status-dot status-online" style="background:#10b981;box-shadow:0 0 8px #10b981;"></span>
            <span style="color:#10b981;font-weight:600;">Django Backend: Connected (Port 8000)</span>
          `;
        } else {
          el.innerHTML = `
            <span class="status-dot" style="background:#f59e0b;"></span>
            <span style="color:#d97706;">Storage: LocalStorage (Offline Mode)</span>
          `;
        }
      });

      // 2. Add or update header backend badge if app container exists
      const headerActions = document.querySelector('.header-actions, .auth-top-actions');
      if (headerActions && !document.getElementById('backendStatusPill')) {
        const pill = document.createElement('div');
        pill.id = 'backendStatusPill';
        pill.style.cssText = `
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
          margin-right: 8px;
        `;
        headerActions.insertBefore(pill, headerActions.firstChild);
      }

      const pill = document.getElementById('backendStatusPill');
      if (pill) {
        if (isOnline) {
          pill.style.background = 'rgba(16, 185, 129, 0.15)';
          pill.style.color = '#10b981';
          pill.style.border = '1px solid rgba(16, 185, 129, 0.4)';
          pill.innerHTML = `🟢 Django API Online`;
          pill.title = 'Connected to Django REST API (http://127.0.0.1:8000/api/)';
        } else {
          pill.style.background = 'rgba(245, 158, 11, 0.12)';
          pill.style.color = '#d97706';
          pill.style.border = '1px solid rgba(245, 158, 11, 0.3)';
          pill.innerHTML = `🟠 LocalStorage Mode`;
          pill.title = 'Django server offline. Operating in client-side localStorage mode.';
        }
      }

      // 3. Settings panel database status badge & description
      const dbBadge = document.getElementById('dbStatusBadge');
      const dbDesc = document.getElementById('dbStatusDesc');
      if (dbBadge) {
        if (isOnline) {
          dbBadge.className = 'badge badge-green';
          dbBadge.innerHTML = '● Connected (Port 8000)';
          if (dbDesc) dbDesc.innerHTML = '✓ Active connection to Django 6.1 REST API &amp; SQLite database (<code>backend/db.sqlite3</code>). All student data synchronizes automatically.';
        } else {
          dbBadge.className = 'badge badge-amber';
          dbBadge.innerHTML = '○ Offline (LocalStorage Fallback)';
          if (dbDesc) dbDesc.innerHTML = 'Backend server is currently offline. Operating in LocalStorage mode. Run <code>run_backend.bat</code> to connect the SQLite database.';
        }
      }
    },

    /**
     * Generic fetch wrapper with timeout
     */
    async _request(endpoint, options = {}) {
      const url = `${this.baseUrl}${endpoint}`;
      const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      const config = {
        ...options,
        headers: {
          ...defaultHeaders,
          ...(options.headers || {})
        }
      };

      const res = await fetch(url, config);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || `Request failed with status ${res.status}`);
      }
      return data;
    },

    // -----------------------------------------------------------------
    // AUTHENTICATION
    // -----------------------------------------------------------------

    async login(studentId, password) {
      if (this.isOnline) {
        try {
          const res = await this._request('/auth/login/', {
            method: 'POST',
            body: JSON.stringify({ studentId, password })
          });
          return res;
        } catch (err) {
          // If server returns authentication error (401/404), throw it
          throw err;
        }
      }
      return null; // Signals caller to use fallback
    },

    async register(studentData) {
      if (this.isOnline) {
        try {
          const res = await this._request('/auth/register/', {
            method: 'POST',
            body: JSON.stringify(studentData)
          });
          return res;
        } catch (err) {
          throw err;
        }
      }
      return null;
    },

    async getDemoUsers() {
      if (this.isOnline) {
        try {
          const res = await this._request('/auth/demo-users/');
          if (res && res.users && res.users.length > 0) {
            return res.users;
          }
        } catch (err) {
          console.warn('Could not fetch demo users from backend, using fallback', err);
        }
      }
      return null;
    },

    // -----------------------------------------------------------------
    // STUDENT PROFILE
    // -----------------------------------------------------------------

    async getStudent(usn) {
      if (this.isOnline) {
        try {
          const res = await this._request(`/students/${encodeURIComponent(usn)}/`);
          return res.student;
        } catch (err) {
          console.warn('Failed to fetch student from Django API', err);
        }
      }
      return null;
    },

    async updateStudent(usn, profileData) {
      if (this.isOnline) {
        try {
          const res = await this._request(`/students/${encodeURIComponent(usn)}/`, {
            method: 'PUT',
            body: JSON.stringify(profileData)
          });
          return res.student;
        } catch (err) {
          console.warn('Failed to update student on Django API', err);
        }
      }
      return null;
    },

    // -----------------------------------------------------------------
    // TIMETABLE
    // -----------------------------------------------------------------

    async getTimetable(usn) {
      if (this.isOnline) {
        try {
          const res = await this._request(`/timetable/${encodeURIComponent(usn)}/`);
          return res.timetable;
        } catch (err) {
          console.warn('Failed to get timetable from Django API', err);
        }
      }
      return null;
    },

    async saveTimetable(usn, timetableMatrix) {
      if (this.isOnline) {
        try {
          const res = await this._request(`/timetable/${encodeURIComponent(usn)}/`, {
            method: 'PUT',
            body: JSON.stringify({ timetable: timetableMatrix })
          });
          return res.timetable;
        } catch (err) {
          console.warn('Failed to save timetable to Django API', err);
        }
      }
      return null;
    },

    async resetTimetable(usn) {
      if (this.isOnline) {
        try {
          const res = await this._request(`/timetable/${encodeURIComponent(usn)}/reset/`, {
            method: 'POST'
          });
          return res.timetable;
        } catch (err) {
          console.warn('Failed to reset timetable on Django API', err);
        }
      }
      return null;
    },

    // -----------------------------------------------------------------
    // SUBJECT ASSESSMENTS
    // -----------------------------------------------------------------

    async getAssessments(usn) {
      if (this.isOnline) {
        try {
          const res = await this._request(`/assessments/${encodeURIComponent(usn)}/`);
          return res.assessments;
        } catch (err) {
          console.warn('Failed to get assessments from Django API', err);
        }
      }
      return null;
    },

    async saveAssessment(usn, assessmentData) {
      if (this.isOnline) {
        try {
          const res = await this._request(`/assessments/${encodeURIComponent(usn)}/`, {
            method: 'POST',
            body: JSON.stringify(assessmentData)
          });
          return res.assessment;
        } catch (err) {
          console.warn('Failed to save assessment to Django API', err);
        }
      }
      return null;
    },

    async autoAssessAll(usn) {
      if (this.isOnline) {
        try {
          const res = await this._request(`/assessments/${encodeURIComponent(usn)}/auto-assess/`, {
            method: 'POST'
          });
          return res.assessments;
        } catch (err) {
          console.warn('Failed to auto-assess on Django API', err);
        }
      }
      return null;
    },

    // -----------------------------------------------------------------
    // REPORTS & ANALYTICS
    // -----------------------------------------------------------------

    async getReportAnalytics(usn) {
      if (this.isOnline) {
        try {
          const res = await this._request(`/reports/${encodeURIComponent(usn)}/`);
          return res.report;
        } catch (err) {
          console.warn('Failed to get report from Django API', err);
        }
      }
      return null;
    },

    async saveReport(usn, reportData) {
      if (this.isOnline) {
        try {
          const res = await this._request(`/reports/${encodeURIComponent(usn)}/save/`, {
            method: 'POST',
            body: JSON.stringify(reportData)
          });
          return res;
        } catch (err) {
          console.warn('Failed to archive report to Django API', err);
        }
      }
      return null;
    }
  };

  // Expose to window
  window.SIP_API = SIP_API;

  // Auto-probe backend connection when page loads
  document.addEventListener('DOMContentLoaded', () => {
    SIP_API.checkConnection();
  });

})();
