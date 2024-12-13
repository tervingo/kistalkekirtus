
from flask import Flask
from flask_cors import CORS


from enter_route import enter_route
from list_route import list_route
from query_route import query_route
from edit_route import edit_route
from delete_route import delete_route
from csv_route import csv_route
from remote_pdf_route import pdf_route
from display_html import html_route
import os
import secrets 

def create_app():
    app = Flask(__name__)
    # Make sure your app has a secret key for sessions
    app.secret_key = os.getenv('FLASK_SECRET_KEY', secrets.token_hex(16))
    CORS(app, supports_credentials=True, origins=[
        "https://ktkirtus.netlify.app",
        "http://localhost:3000"  # for local development
    ])
    
    app.register_blueprint(enter_route)
    app.register_blueprint(list_route)
    app.register_blueprint(query_route)
    app.register_blueprint(edit_route)
    app.register_blueprint(delete_route)
    app.register_blueprint(csv_route)
    app.register_blueprint(pdf_route)
    app.register_blueprint(html_route)

    return app

# Create an app instance for Gunicorn to find
app = create_app()

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True)
