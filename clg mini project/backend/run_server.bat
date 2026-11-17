@echo off
title SIP Backend - Django Server (Port 8000)
echo ============================================================
echo   Student Interest Portfolio Report Generator
echo   Python + Django 6.1 REST API Backend Server
echo ============================================================
echo.
cd /d "%~dp0"
echo [1/2] Checking database migrations...
python manage.py migrate --noinput >nul 2>&1
echo [2/2] Detecting your Local Wi-Fi IP address...
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set "IP=%%a"
    goto :found_ip
)
:found_ip
set "IP=%IP: =%"
echo ============================================================
echo   SERVER ACCESS LINKS:
echo ============================================================
echo   💻 On This PC:
echo      Web App:            http://127.0.0.1:8000/
echo      Django Admin:       http://127.0.0.1:8000/admin/
echo      API Documentation:  http://127.0.0.1:8000/dev/
echo.
echo   📱 On Your Mobile Phone (Same Wi-Fi / Hotspot):
echo      Open in phone browser: http://%IP%:8000/
echo ============================================================
echo.
echo Press Ctrl+C in this terminal window to stop the server.
echo.
python manage.py runserver 0.0.0.0:8000
pause
