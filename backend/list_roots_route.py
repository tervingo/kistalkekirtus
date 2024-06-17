from flask import Blueprint, send_file, jsonify
import json
from bson.json_util import dumps
from __init__ import mongo

list_roots_route = Blueprint('list_roots_route', __name__)

@list_roots_route.route('/api/list-roots', methods=['GET'])
def get_all_translations():
    roots = mongo.db.roots.find()
    roots_list = [json.loads(dumps(root)) for root in roots]
    for i, root in enumerate(roots_list, start=1):
        root['number'] = i
    roots_list = sorted(roots_list, key=lambda x: x['root'])
    return jsonify(roots_list), 200
