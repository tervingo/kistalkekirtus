from flask import Flask
from flask_pymongo import PyMongo
import os

def is_docker():
    path = '/.dockerenv'
    return os.path.isfile(path)


username = os.getenv("MONGODB_USERNAME")
password = os.getenv("MONGODB_PASSWORD")
app = Flask(__name__)
if is_docker():
    app.config["MONGO_URI"] = f"mongodb://mongodb:27017/mydictionary"
else:
    app.config["MONGO_URI"] = f"mongodb://localhost:27017/mydictionary"
mongo = PyMongo(app)
