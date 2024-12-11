from flask import Flask
from flask_pymongo import PyMongo
import os

username = os.getenv("MONGODB_USERNAME")
password = os.getenv("MONGODB_PASSWORD")
app = Flask(__name__)
#    app.config["MONGO_URI"] = f"mongodb://localhost:27017/mydictionary"
app.config["MONGO_URI"] = f"mongodb+srv://tervingo:mig.langar.inn@gagnagunnur.okrh1.mongodb.net/eltotek"
mongo = PyMongo(app)
