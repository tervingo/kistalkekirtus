from flask import Blueprint, send_file, request, jsonify
from bson.objectid import ObjectId
import re

from __init__ import mongo

query_root_route = Blueprint('query_root_route', __name__)

# Entry point used for Search Entries Option (kistalkeeva massi)

@query_root_route.route('/api/search-roots', methods=['GET'])
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
@query_root_route.route('/api/query-root', methods=['GET'])
def get_translation():
    root = request.args.get('root')
    kono = mongo.db.roots.find_one({'root': root})
 
    if kono:
        # Convert the ObjectId into a string
        kono['_id'] = str(kono['_id'])
        return jsonify(kono), 200
    else:
#        return jsonify({'result' : 'no root found'}), 200
        return "0", 201