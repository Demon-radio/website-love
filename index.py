from app import app

# This file is used by Vercel as an entry point
# Set up app for serverless
def handler(request, **kwargs):
    return app(request.environ, request.start_response)