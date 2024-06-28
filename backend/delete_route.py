from flask import Blueprint, send_file, request, jsonify
from bson.objectid import ObjectId

from __init__ import mongo

delete_route = Blueprint('delete_route', __name__)

@delete_route.route('/api/delete-entry/<id>', methods=['DELETE'])
def delete_entry(id):
    mongo.db.translations.delete_one({'_id': ObjectId(id)})
    return jsonify({'result': 'Entry deleted successfully'}), 200


@delete_route.route('/api/delete-root/<id>', methods=['DELETE'])
def delete_root(id):
    mongo.db.roots.delete_one({'_id': ObjectId(id)})
    return jsonify({'result': 'Root deleted successfully'}), 200
