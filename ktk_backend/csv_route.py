from flask import Blueprint, send_file, request, jsonify

import csv
import socket
from flask import send_file

from __init__ import mongo

from datetime import datetime

hostname = socket.gethostname()

from constants import paths

csv_route = Blueprint('csv_route', __name__)

@csv_route.route('/api/export/csv', methods=['GET'])
def export_csv():
    # Get all documents from your MongoDB collection and sort them by 'can'
    cursor = mongo.db.translations.find({}, {'_id': 0}).sort('can')
    root_cursor = mongo.db.roots.find({}, {'_id': 0}).sort('root')

    # Specify the paths where you want to save the CSV files

    csv_path_name = f"{hostname.upper()}_CSV_PATH"
    path = paths[csv_path_name]

    root_csv_path_name = f"{hostname.upper()}_ROOT_CSV_PATH"
    root_path = paths[root_csv_path_name]

    # Open the lexicon file at the specified path
    with open(path, 'w', newline='') as file:
        writer = csv.writer(file)
        # Get the first document and write the keys as a header row
        first_doc = cursor[0]
        writer.writerow(first_doc.keys())
        # write the values
        for doc in cursor:
            writer.writerow(doc.values())  # write values of each item

    # Open the roots file at the specified path
    with open(root_path, 'w', newline='') as root_file:
        writer = csv.writer(root_file)
        # Get the first document and write the keys as a header row
        first_doc = root_cursor[0]
        writer.writerow(first_doc.keys())
        # write the values
        for doc in root_cursor:
            writer.writerow(doc.values())  # write values of each item

    # write CSV stamp file

    hostname_csv_last_read_path_name = f"{hostname.upper()}_CSV_LAST_READ_PATH"
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