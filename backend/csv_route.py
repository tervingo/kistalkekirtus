from flask import Blueprint, send_file, request, jsonify
import csv
import socket
from flask import send_file
import pandas as pd
from __init__ import mongo
import os
from datetime import datetime

from constants import paths, new_paths
from docker_paths import docker_paths


hostname = socket.gethostname()

def is_docker():
    path = '/.dockerenv'
    return os.path.isfile(path)

csv_route = Blueprint('csv_route', __name__)

# ===============================
# EXPORT CSV (ENTRIES & ROOTS)
# ===============================

@csv_route.route('/api/export/csv', methods=['GET'])
def export_csv():
    # Get all documents from your MongoDB collection and sort them by 'can'
    cursor = mongo.db.translations.find({}, {'_id': 0}).sort('can')
    root_cursor = mongo.db.roots.find({}, {'_id': 0}).sort('root')

    # Specify the paths where you want to save the CSV files

#    csv_path_name = f"{hostname.upper()}_CSV_PATH"
    csv_path_name = "CSV_PATH"
    if is_docker():
        path = docker_paths["CSV_PATH"]
    else:
        path = new_paths[csv_path_name]

#    root_csv_path_name = f"{hostname.upper()}_ROOT_CSV_PATH"
    root_csv_path_name = "ROOT_CSV_PATH"
    if is_docker():
        root_path = docker_paths["ROOT_CSV_PATH"]
    else:
        root_path = new_paths[root_csv_path_name]

    # Open the lexicon file at the specified path
    with open(path, 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        # Get the first document and write the keys as a header row
        first_doc = cursor[0]
        writer.writerow(first_doc.keys())
        # write the values
        for doc in cursor:
            writer.writerow(doc.values())  # write values of each item

    # Open the roots file at the specified path
    with open(root_path, 'w', newline='', encoding='utf-8') as root_file:
        writer = csv.writer(root_file)
        # Get the first document and write the keys as a header row
        first_doc = root_cursor[0]
        writer.writerow(first_doc.keys())
        # write the values
        for doc in root_cursor:
            writer.writerow(doc.values())  # write values of each item

    # write CSV stamp file

    hostname_csv_last_read_path_name = f"{hostname.upper()}_CSV_LAST_READ_PATH"
    if is_docker():
        hostname_last_read_file = docker_paths["CSV_LAST_READ_PATH"]
    else:
        hostname_last_read_file = paths[hostname_csv_last_read_path_name]

    # Count the number of entries
    with open(path, 'r') as f:
        reader = csv.reader(f)
        entries = sum(1 for row in reader) - 1

    # Write to the "last_csv_written.txt" file
    with open(hostname_last_read_file, 'w') as f:
        f.write(f'Last read on: {datetime.now().strftime("%d-%m-%Y at %H:%M:%S")}\n')
        f.write(f'Number of entries: {entries}\n')


     # Return a success message

    return 'CSV generated successfully from {}'.format(hostname), 200


# ===============================
# IMPORT CSV (ENTRIES & ROOTS)
# ===============================

@csv_route.route('/api/import/csv', methods=['POST'])
def import_csv():
       
#    csv_path_name = f"{hostname.upper()}_CSV_PATH"
    csv_path_name = "CSV_PATH"
    if is_docker():
        csv_file = docker_paths["CSV_PATH"]
    else:
        csv_file = new_paths[csv_path_name]

#    root_csv_path_name = f"{hostname.upper()}_ROOT_CSV_PATH"
    root_csv_path_name = "ROOT_CSV_PATH"
    if is_docker():
        root_file = docker_paths["ROOT_CSV_PATH"]
    else:
        root_file = new_paths[root_csv_path_name]

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
    if is_docker():
        hostname_last_read_file = docker_paths["CSV_LAST_READ_PATH"]
    else:
        hostname_last_read_file = paths[hostname_csv_last_read_path_name]

    # Write to the "last_csv_written.txt" file
    with open(hostname_last_read_file, 'w') as f:
        f.write(f'Last read on: {datetime.now().strftime("%d-%m-%Y at %H:%M:%S")}\n')
        f.write(f'Number of entries: {nof_entries}\n')
        f.write(f'Number of roots: {nof_roots}\n')

    return {'message': f'CSV files with {nof_entries} entries and {nof_roots} roots have been successfully imported to MongoDB!'}


# ===============================
# GET CSV READ & WRITE INFO
# ===============================

@csv_route.route('/api/csv-info', methods=['GET'])
def csv_info():
     
    hostname = socket.gethostname()
#    csv_path_name = f"{hostname.upper()}_CSV_PATH"
    csv_path_name = "CSV_PATH"
    if is_docker():
        csv_path = docker_paths["CSV_PATH"]
    else:
        csv_path = new_paths[csv_path_name]

#    root_csv_path_name = f"{hostname.upper()}_ROOT_CSV_PATH"
    root_csv_path_name = "ROOT_CSV_PATH"
    if is_docker():
        root_csv_path = docker_paths["ROOT_CSV_PATH"]
    else:    
        root_csv_path = new_paths[root_csv_path_name]

    # Get the modified date
    timestamp = os.path.getmtime(csv_path)
    modified_date = datetime.fromtimestamp(timestamp).strftime('"%d-%m-%Y at %H:%M:%S"')

    root_timestamp = os.path.getmtime(root_csv_path)
    root_modified_date = datetime.fromtimestamp(root_timestamp).strftime('"%d-%m-%Y at %H:%M:%S"')

    # Get the number of rows
    df = pd.read_csv(csv_path)
    num_entries = len(df)

    root_df = pd.read_csv(root_csv_path)
    num_roots = len(root_df)

    # Read the contents of the "<host>_csv_last_read.txt" file
    
    hostname_csv_last_read_path_name = f"{hostname.upper()}_CSV_LAST_READ_PATH"
    if is_docker():
        hostname_last_read_file = docker_paths["CSV_LAST_READ_PATH"]
    else:
        hostname_last_read_file = paths[hostname_csv_last_read_path_name]

    with open(hostname_last_read_file, 'r') as f:
        last_date_info = f.readline()
        last_noe_info = f.readline()
        last_nor_info = f.readline()

    return jsonify({
        'modified_date': modified_date,
        'num_entries': num_entries,
        'root_modified_date' : root_modified_date,
        'num_roots' : num_roots,
        'hostname': hostname,
        'last_date_info': last_date_info,
        'last_noe_info': last_noe_info,
        'last_nor_info': last_nor_info
    })
