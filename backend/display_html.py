from flask import Flask, Blueprint, send_from_directory, request
import socket

from grammar_keys import grammar_keys, grammar_folders


app = Flask(__name__, static_folder='static')

hostname = socket.gethostname()

html_route = Blueprint('html_route', __name__)

@html_route.route('/api/get_html', methods=['POST'])
def serve_html():
    data = request.get_json()
    grammarKey = data['grammarKey']

    grammar_host = f"{hostname.upper()}_GRAM_FOLDER"
    grammar_folder = grammar_folders[grammar_host]

    html_file = grammar_keys[grammarKey]

#    messagebox.showinfo("My Message", f"The value of html_file is: {html_file}")

    return send_from_directory(grammar_folder, html_file)
