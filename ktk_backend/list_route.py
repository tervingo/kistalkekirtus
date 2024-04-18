from flask import Blueprint, send_file, jsonify
import json
from bson.json_util import dumps
from __init__ import mongo

list_route = Blueprint('list_route', __name__)


@list_route.route('/api/list-entries', methods=['GET'])
def get_all_translations():
    translations = mongo.db.translations.find().sort('can', 1)
    return jsonify([json.loads(dumps(translation)) for translation in translations]), 200
