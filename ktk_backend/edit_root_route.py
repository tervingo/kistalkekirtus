from flask import Blueprint, send_file, request, jsonify
from bson.objectid import ObjectId

from __init__ import mongo

edit_root_route = Blueprint('edit_root_route', __name__)


@edit_root_route.route('/api/edit-root/<id>', methods=['PUT'])
def edit_root(id):
    data = request.get_json()
    root = data['root']
    moda = data['moda']
    act = data['act']
    modp = data['modp']
    pas = data['pas']
 
    mongo.db.roots.update_one(
        {'_id': ObjectId(id)},
        {'$set': {'root': root, 'moda': moda, 'act': act, 'modp': modp, 'pas': pas }}
    )
    return jsonify({'result': 'Entry updated successfully'}), 200

