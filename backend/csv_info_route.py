from flask import Blueprint, Flask, request, jsonify
import pandas as pd
from __init__ import mongo
import os
from datetime import datetime
import socket

from constants import paths
from docker_paths import docker_paths

csv_info_route = Blueprint('csv_info_route', __name__)

def is_docker():
    path = '/.dockerenv'
    return os.path.isfile(path)


@csv_info_route.route('/api/csv-info', methods=['GET'])
def csv_info():
     
    hostname = socket.gethostname()
    csv_path_name = f"{hostname.upper()}_CSV_PATH"
    if is_docker():
        csv_path = docker_paths["CSV_PATH"]
    else:
        csv_path = paths[csv_path_name]

    root_csv_path_name = f"{hostname.upper()}_ROOT_CSV_PATH"
    if is_docker():
        root_csv_path = docker_paths["ROOT_CSV_PATH"]
    else:    
        root_csv_path = paths[root_csv_path_name]

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