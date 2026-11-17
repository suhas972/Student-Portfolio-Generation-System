"""
Custom CORS Middleware for SIP Django Backend.
Allows the frontend web app to communicate seamlessly with the Django REST API
without requiring external third-party dependencies.
"""
from django.http import HttpResponse

class CustomCorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Handle HTTP OPTIONS preflight request
        if request.method == 'OPTIONS':
            response = HttpResponse()
            self._set_cors_headers(response)
            return response

        # Process standard request
        response = self.get_response(request)
        self._set_cors_headers(response)
        return response

    def _set_cors_headers(self, response):
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With, Accept, Origin'
        response['Access-Control-Allow-Credentials'] = 'true'
        response['Access-Control-Max-Age'] = '86400'
