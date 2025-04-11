# index.py - Flask app for Vercel
import os
import logging
from flask import Flask, render_template, redirect, url_for, request, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Create database instance
db = SQLAlchemy()

class Message(db.Model):
    """Model for storing love messages from users."""
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Message {self.id}: {self.name}>'

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# Configure the database
# Use PostgreSQL in production (Vercel) and SQLite locally
db_url = os.environ.get("DATABASE_URL", "sqlite:///love.db")
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize the database with the app
db.init_app(app)

# Create tables (only when running locally, not on Vercel)
if not os.environ.get('VERCEL_REGION'):
    with app.app_context():
        db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/success', methods=['GET', 'POST'])
def success():
    if request.method == 'POST':
        name = request.form.get('name')
        message = request.form.get('message')
        
        # Validate form data
        if not name or not message:
            flash('Please fill out both fields!')
            return redirect(url_for('success'))
        
        # Create new message
        new_message = Message(name=name, message=message)
        db.session.add(new_message)
        db.session.commit()
        
        # Show thank you message
        flash('Thank you for your sweet message! ❤️')
        
    # Get all messages to display
    messages = Message.query.order_by(Message.created_at.desc()).all()
    return render_template('success.html', messages=messages)

# Vercel requires this handler function
def handler(request, **kwargs):
    return app(request.environ, request.start_response)