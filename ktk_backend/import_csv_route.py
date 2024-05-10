from flask import Blueprint, Flask, request, jsonify
from werkzeug.utils import secure_filename
import pandas as pd
from pymongo import MongoClient
from __init__ import mongo
import os
from datetime import datetime
import socket
from tkinter import messagebox

import_csv_route = Blueprint('import_csv_route', __name__)


@import_csv_route.route('/api/import/csv', methods=['POST'])
def import_csv():
    file = request.files['file']
    filename = secure_filename(file.filename)
    file.save(filename)

    # Read the CSV file
    data = pd.read_csv(filename)

    # Replace 'NaN' values with empty strings
    data = data.fillna('')
    
    # Clear the collection
    mongo.db.translations.delete_many({})

    # Insert the CSV data into the collection
    mongo.db.translations.insert_many(data.to_dict('records'))

    return {'message': 'CSV data has been successfully imported to MongoDB!'}

