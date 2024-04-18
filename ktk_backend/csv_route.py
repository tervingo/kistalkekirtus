from flask import Blueprint, send_file, request, jsonify

import csv
import io
from flask import send_file


from __init__ import mongo

csv_route = Blueprint('csv_route', __name__)


@csv_route.route('/api/export/csv', methods=['GET'])
def export_csv():
    # Get all documents from your MongoDB collection and sort them by 'can'
    cursor = mongo.db.translations.find({}, {'_id': 0}).sort('can')

    # Specify the path where you want to save the CSV file
    path = "C:\\Users\\j4alo\\Dropbox\\Lenguas\\Ilven\\Ilven-Inglisen_kiskirtus.csv"

    # Open the file at the specified path
    with open(path, 'w', newline='') as file:
        writer = csv.writer(file)
        # Get the first document and write the keys as a header row
        first_doc = cursor[0]
        writer.writerow(first_doc.keys())
        # write the values
        for doc in cursor:
            writer.writerow(doc.values())  # write values of each item

     # Return a success message
    return jsonify({"message": "CSV generated successfully!"}), 200