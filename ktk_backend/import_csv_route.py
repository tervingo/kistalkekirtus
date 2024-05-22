from flask import Blueprint, Flask, request, jsonify
from werkzeug.utils import secure_filename
import pandas as pd
from pymongo import MongoClient
from __init__ import mongo
import os
from datetime import datetime
import socket
import tkinter as tk
from tkinter import messagebox
from constants import paths

import_csv_route = Blueprint('import_csv_route', __name__)

hostname = socket.gethostname()

@import_csv_route.route('/api/import/csv', methods=['POST'])
def import_csv():
       
    csv_path_name = f"{hostname.upper()}_CSV_PATH"
    csv_file = paths[csv_path_name]

    root_csv_path_name = f"{hostname.upper()}_ROOT_CSV_PATH"
    root_file = paths[root_csv_path_name]

    # Read the CSV file
    data = pd.read_csv(csv_file)
    nof_entries = len(data)

    #Read the root file

    root_data = pd.read_csv(root_file)
    nof_roots = len(root_data)

    # Replace 'NaN' values with empty strings
    data = data.fillna('')
    root_data = root_data.fillna('')
    
    # Clear the collection
    mongo.db.translations.delete_many({})
    mongo.db.roots.delete_many({})

    # Insert the CSV data into the collection
    mongo.db.translations.insert_many(data.to_dict('records'))

    # Insert the CSV root data into the collection
    mongo.db.roots.insert_many(root_data.to_dict('records'))

    hostname_csv_last_read_path_name = f"{hostname.upper()}_CSV_LAST_READ_PATH"
    hostname_last_read_file = paths[hostname_csv_last_read_path_name]

    # Write to the "last_csv_written.txt" file
    with open(hostname_last_read_file, 'w') as f:
        f.write(f'Last read on: {datetime.now().strftime("%d-%m-%Y at %H:%M:%S")}\n')
        f.write(f'Number of entries: {nof_entries}\n')
        f.write(f'Nummber of roots: {nof_roots}\n')

    return {'message': f'CSV files with {nof_entries} entries and {nof_roots} roots have been successfully imported to MongoDB!'}



    
    


        

