from flask import Blueprint, jsonify
import json
from bson.json_util import dumps
from __init__ import mongo

list_route = Blueprint('list_route', __name__)

@list_route.route('/api/list-entries', methods=['GET'])
def get_all_translations():
    translations = mongo.db.translations.find()
    translations_list = [json.loads(dumps(translation)) for translation in translations]
    translations_list = sorted(translations_list, key=lambda x: x['can'])
    return jsonify(translations_list), 200

@list_route.route('/api/list-roots', methods=['GET'])
def get_all_roots():
    roots = mongo.db.roots.find()
    roots_list = [json.loads(dumps(root)) for root in roots]
    for i, root in enumerate(roots_list, start=1):
        root['number'] = i
    roots_list = sorted(roots_list, key=lambda x: x['root'])
    return jsonify(roots_list), 200

