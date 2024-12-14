from flask import Blueprint, send_file, request, jsonify
import csv
from io import StringIO, BytesIO
import pandas as pd
from dropbox import Dropbox
from dropbox.files import WriteMode
from __init__ import mongo
import datetime

csv_route = Blueprint('csv_route', __name__)

@csv_route.route('/oauth/csv-connect')
def oauth_csv_connect():
    auth_url = f"https://www.dropbox.com/oauth2/authorize?client_id={os.getenv('DROPBOX_CLIENT_ID')}&response_type=token&redirect_uri={os.getenv('FRONTEND_URL')}/export-csv"
    print(f"Redirecting to Dropbox auth URL: {auth_url}")
    return redirect(auth_url)

@csv_route.route('/api/export-csv', methods=['GET'])
def export_csv():
    try:
        # Get token from request headers
        print("Received export-csv request")
        auth_header = request.headers.get('Authorization')
        print(f"Auth header present: {bool(auth_header)}")

        if not auth_header:
            return jsonify({'error': 'No token provided'}), 401
            
        access_token = auth_header.split(' ')[1]
        print("Token extracted from header")

        dbx = Dropbox(access_token)
        print("Dropbox client initialized")

        # Get all documents from MongoDB collections
        cursor = mongo.db.translations.find({}, {'_id': 0}).sort('can')
        root_cursor = mongo.db.roots.find({}, {'_id': 0}).sort('root')

        # Create in-memory file-like objects
        entries_buffer = StringIO()
        roots_buffer = StringIO()

        # Write entries to the first buffer
        entries_writer = csv.writer(entries_buffer)
        first_doc = cursor[0]
        entries_writer.writerow(first_doc.keys())
        entry_count = 0
        for doc in cursor:
            entries_writer.writerow(doc.values())
            entry_count += 1

        # Write roots to the second buffer
        roots_writer = csv.writer(roots_buffer)
        first_root = root_cursor[0]
        roots_writer.writerow(first_root.keys())
        root_count = 0
        for doc in root_cursor:
            roots_writer.writerow(doc.values())
            root_count += 1

        # Create timestamp for filenames
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")

        # Upload entries CSV to Dropbox
        entries_buffer.seek(0)
        entries_path = f"/kistalkekirtus/ilven_entries_{timestamp}.csv"
        dbx.files_upload(
            entries_buffer.getvalue().encode('utf-8'),
            entries_path,
            mode=WriteMode('overwrite')
        )
        entries_link = dbx.sharing_create_shared_link(entries_path)

        # Upload roots CSV to Dropbox
        roots_buffer.seek(0)
        roots_path = f"/kistalkekirtus/ilven_roots_{timestamp}.csv"
        dbx.files_upload(
            roots_buffer.getvalue().encode('utf-8'),
            roots_path,
            mode=WriteMode('overwrite')
        )
        roots_link = dbx.sharing_create_shared_link(roots_path)

        # Create a simple summary
        summary = f"""Last exported on: {datetime.datetime.now().strftime("%d-%m-%Y at %H:%M:%S")}
Number of entries: {entry_count}
Number of roots: {root_count}"""

        summary_buffer = StringIO()
        summary_buffer.write(summary)
        summary_buffer.seek(0)
        
        summary_path = f"/kistalkekirtus/export_summary_{timestamp}.txt"
        dbx.files_upload(
            summary_buffer.getvalue().encode('utf-8'),
            summary_path,
            mode=WriteMode('overwrite')
        )

        return jsonify({
            'success': True,
            'message': 'CSV files uploaded to Dropbox',
            'entries_link': entries_link.url,
            'roots_link': roots_link.url,
            'entry_count': entry_count,
            'root_count': root_count
        })

    except Exception as e:
        print(f"Error during CSV export: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
    
