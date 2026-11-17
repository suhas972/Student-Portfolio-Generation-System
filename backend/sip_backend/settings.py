"""
Django settings for Student Interest Portfolio Report Generator (SIP) Backend.
5th-Semester Computer Science & Engineering Mini Project
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-sip-mini-project-(#8m@4^%y90$!5z8e#@*2q1p!g'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # SIP Academic App
    'api.apps.ApiConfig',
]

MIDDLEWARE = [
    # Custom CORS Middleware for seamless communication with HTML/JS frontend
    'sip_backend.middleware.CustomCorsMiddleware',
    
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # Note: CSRF exemption handled on API endpoints or middleware for API ease
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'sip_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'sip_backend.wsgi.application'

# Database Configuration
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases
# Default: Relational SQLite 3 (Zero configuration, pre-seeded file database)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'student_project_db',
        'USER': 'postgres',
        'PASSWORD': '2004',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}


# --- Optional MySQL Database Configuration (For College Viva / External Examiners) ---
# To switch to MySQL / XAMPP / phpMyAdmin:
# 1. Start MySQL in XAMPP and create database: CREATE DATABASE sip_database;
# 2. In terminal: pip install mysqlclient (or PyMySQL)
# 3. Comment out the SQLite DATABASES block above and uncomment the MySQL block below:
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'sip_database',
#         'USER': 'root',
#         'PASSWORD': '',
#         'HOST': '127.0.0.1',
#         'PORT': '3306',
#     }
# }

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATICFILES_DIRS = [
    BASE_DIR.parent, # Allows Django to serve project frontend files directly if desired
]

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
