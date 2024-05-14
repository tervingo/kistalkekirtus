from flask import Blueprint, Flask, request, jsonify
import pandas as pd
from __init__ import mongo
import os
from datetime import datetime
import socket

from constants import paths

csv_info_route = Blueprint('csv_info_route', __name__)

@csv_info_route.route('/api/csv-info', methods=['GET'])
def csv_info():
     
    hostname = socket.gethostname()
    csv_path_name = f"{hostname.upper()}_CSV_PATH"
    csv_path = paths[csv_path_name]

    # Get the modified date
    timestamp = os.path.getmtime(csv_path)
    modified_date = datetime.fromtimestamp(timestamp).strftime('"%d-%m-%Y at %H:%M:%S"')

    # Get the number of rows
    df = pd.read_csv(csv_path)
    num_rows = len(df)

    # Read the contents of the "<host>_csv_last_read.txt" file
    
    hostname_csv_last_read_path_name = f"{hostname.upper()}_CSV_LAST_READ_PATH"
    hostname_last_read_file = paths[hostname_csv_last_read_path_name]

    with open(hostname_last_read_file, 'r') as f:
        last_date_info = f.readline()
        last_noe_info = f.readline()

    return jsonify({
        'modified_date': modified_date,
        'num_rows': num_rows,
        'hostname': hostname,
        'last_date_info': last_date_info,
        'last_noe_info': last_noe_info
    })
