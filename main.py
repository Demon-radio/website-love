import os
import logging
from flask import Flask, render_template, redirect, url_for, request, flash
from models import db, Message

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# Configure the database
# Check if running on Vercel (look for VERCEL environment variable)
if os.environ.get("VERCEL"):
    # Use SQLite for Vercel deployments
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///love.db"
else:
    # Use PostgreSQL for development
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///love.db")

app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize the database with the app
db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/success')
def success():
    return render_template('success.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
