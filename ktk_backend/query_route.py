from flask import Blueprint, send_file, request, jsonify
from bson.objectid import ObjectId

from __init__ import mongo

query_route = Blueprint('query_route', __name__)


@query_route.route('/api/query-entry', methods=['GET'])
def get_translation():
    can = request.args.get('can')
    en = request.args.get('en')
    if can:
        translation = mongo.db.translations.find_one({'can': can})
    elif en:
        translation = mongo.db.translations.find_one({'en': en})
    else:
        return jsonify({'error': 'Missing query parameter'}), 400
    if translation:
        # Convert the ObjectId into a string
        translation['_id'] = str(translation['_id'])
        return jsonify(translation), 200
    else:
        return jsonify({'error': 'No translation found'}), 404
