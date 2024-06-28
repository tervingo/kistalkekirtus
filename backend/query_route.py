from flask import Blueprint, send_file, request, jsonify
from bson.objectid import ObjectId
import re

from __init__ import mongo

query_route = Blueprint('query_route', __name__)

# Entry point used for Search Entries Option (kistalkeeva massi)

@query_route.route('/api/search-entries', methods=['GET'])
def search_translations():
    search = request.args.get('search')
    if search:
        regex = re.compile(search, re.IGNORECASE)
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

# entry point used for internal entry retrieval 

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
    
# Entry point used for Search Entries Option (kistalkeeva massi)

@query_route.route('/api/search-roots', methods=['GET'])
def search_roots():
    search = request.args.get('search')
    if search:
        regex = re.compile(search, re.IGNORECASE)
        roots = mongo.db.roots.find({'root': {'$regex':regex}}).sort('root',1)
        roots = list(roots)
    else:
        return jsonify({'error': 'Missing query parameter'}), 400
    if roots:
    # Convert the ObjectIds into strings
        for root in roots:
            root['_id'] = str(root['_id'])
        return jsonify(roots), 200
    else:
        return jsonify({'error': 'No roots found'}), 404


# entry point used for internal entry retrieval 
@query_route.route('/api/query-root', methods=['GET'])
def get_root():
    root = request.args.get('root')
    kono = mongo.db.roots.find_one({'root': root})
 
    if kono:
        # Convert the ObjectId into a string
        kono['_id'] = str(kono['_id'])
        return jsonify(kono), 200
    elif (root == ""):
        return "1", 201   
    else:
#        return jsonify({'result' : 'no root found'}), 200
        return "0", 201