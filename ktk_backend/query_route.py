from flask import Blueprint, send_file, request, jsonify
from bson.objectid import ObjectId
import re

from __init__ import mongo

query_route = Blueprint('query_route', __name__)

@query_route.route('/api/search-entries', methods=['GET'])
def search_translations():
    search = request.args.get('search')
    if search:
        regex = re.compile(search, re.IGNORECASE)
#        translation = mongo.db.translations.find_one({'$or': [{'can': regex}, {'en': regex}]})
        translations = mongo.db.translations.find({'$or' : [{'can': {'$regex':regex}}, {'en': {'$regex':regex}}]}).sort('can',1)
        translations = list(translations)
    else:
        return jsonify({'error': 'Missing query parameter'}), 400
    if translations:
    # Convert the ObjectIds into strings
        for translation in translations:
            translation['_id'] = str(translation['_id'])
        return jsonify(translations), 200
    else:
        return jsonify({'error': 'No translations found'}), 404
#          return jsonify([json.loads(dumps(translation)) for translation in translations]), 200


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