from flask import Blueprint, send_file, request, jsonify

import csv
import socket
from flask import send_file

from __init__ import mongo
from tkinter import messagebox

hostname = socket.gethostname()

messagebox.showinfo("Variable Value", f"The value of the variable is: |{hostname}|")

from constants import AYUR_CSV_PATH
from constants import AYUR_CSV_GIT_PATH
from constants import AMLENAI_CSV_PATH
from constants import AMLENAI_CSV_GIT_PATH

csv_route = Blueprint('csv_route', __name__)

@csv_route.route('/api/export/csv', methods=['GET'])
def export_csv():
    # Get all documents from your MongoDB collection and sort them by 'can'
    cursor = mongo.db.translations.find({}, {'_id': 0}).sort('can')
    cursor_git = mongo.db.translations.find({}, {'_id': 0}).sort('can')

    # Specify the path where you want to save the CSV file

    if (hostname == 'Ayur'):
        path = AYUR_CSV_PATH
        path_git = AYUR_CSV_GIT_PATH
        messagebox.showinfo("Variable Value", f"Hostname is Ayur, path is {path}")
    elif (hostname  == 'Amlenai'):
        path = AMLENAI_CSV_PATH
        path_git = AMLENAI_CSV_GIT_PATH
        messagebox.showinfo("Variable Value", f"Hostname is Amlenai, path is {path}")
    else:
        path = AMLENAI_CSV_PATH
        path_git = AMLENAI_CSV_GIT_PATH
        messagebox.showinfo("Variable Value", f"Hostname is neither Ayur nor Amlenai |{hostname}|, defaulting to path {path}")


    # Open the file at the specified path
    with open(path, 'w', newline='') as file:
        writer = csv.writer(file)
        # Get the first document and write the keys as a header row
        first_doc = cursor[0]
        writer.writerow(first_doc.keys())
        # write the values
        for doc in cursor:
            writer.writerow(doc.values())  # write values of each item

    with open(path_git, 'w', newline='') as file:
        writer = csv.writer(file)
        # Get the first document and write the keys as a header row
        first_doc = cursor_git[0]
        writer.writerow(first_doc.keys())
        # write the values
        for doc in cursor_git:
            writer.writerow(doc.values())  # write values of each item


     # Return a success message

    return 'CSV generated successfully from {}'.format(hostname), 200