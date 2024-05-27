
from flask import Flask
from flask_cors import CORS

from enter_route import enter_route
from list_route import list_route
from query_route import query_route
from edit_route import edit_route
from delete_route import delete_route
from csv_route import csv_route
from pdf_route import pdf_route
from import_csv_route import import_csv_route
from csv_info_route import csv_info_route
from list_roots_route import list_roots_route
from edit_root_route import edit_root_route
from query_root_route import query_root_route
from delete_root_route import delete_root_route
from enter_root_route import enter_root_route
from display_html import html_route

app = Flask(__name__)
CORS(app)

app.register_blueprint(enter_route)
app.register_blueprint(list_route)
app.register_blueprint(query_route)
app.register_blueprint(edit_route)
app.register_blueprint(delete_route)
app.register_blueprint(csv_route)
app.register_blueprint(pdf_route)
app.register_blueprint(import_csv_route)
app.register_blueprint(csv_info_route)
app.register_blueprint(list_roots_route)
app.register_blueprint(edit_root_route)
app.register_blueprint(query_root_route)
app.register_blueprint(delete_root_route)
app.register_blueprint(enter_root_route)
app.register_blueprint(html_route)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
    app.run(debug=True)