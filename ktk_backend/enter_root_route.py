from flask import Blueprint, send_file, request, jsonify
from __init__ import mongo

enter_root_route = Blueprint('enter_root_route', __name__)


@enter_root_route.route('/api/enter-root', methods=['POST'])
def add_root():
    data = request.get_json()
    root = data['root']
    moda = data['moda']
    act = data['act']
    modp = data['modp']
    pas = data['pas']
 
    mongo.db.roots.insert_one({'root': root, 'moda': moda, 'act': act, 'modp': modp, 'pas': pas })
    return jsonify({'result': 'Root added successfully'}), 201
