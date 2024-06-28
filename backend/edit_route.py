from flask import Blueprint, send_file, request, jsonify
from bson.objectid import ObjectId

from __init__ import mongo

edit_route = Blueprint('edit_route', __name__)


@edit_route.route('/api/edit-entry/<id>', methods=['PUT'])
def edit_entry(id):
    data = request.get_json()
    can = data['can']
    cat = data['cat']
    pl = data['pl']
    pl2 = data['pl2']
    par = data['par']
    pul = data['pul']
    pr = data['pr']
    pa = data['pa']
    fu = data['fu']
    root = data['root']
    en = data['en']
    sw = data['sw']

    mongo.db.translations.update_one(
        {'_id': ObjectId(id)},
        {'$set': {'can': can, 'cat': cat, 'pl': pl, 'pl2': pl2, 'par': par, 'pul' : pul, 'pr': pr, 'pa': pa, 'fu': fu, 'root': root, 'en': en, 'sw': sw }}
    )
    return jsonify({'result': 'Entry updated successfully'}), 200


@edit_route.route('/api/edit-root/<id>', methods=['PUT'])
def edit_root(id):
    data = request.get_json()
    root = data['root']
    prim = data['prim']
    moda = data['moda']
    act = data['act']
    modp = data['modp']
    pas = data['pas']
 
    mongo.db.roots.update_one(
        {'_id': ObjectId(id)},
        {'$set': {'root': root, 'prim': prim, 'moda': moda, 'act': act, 'modp': modp, 'pas': pas }}
    )
    return jsonify({'result': 'Entry updated successfully'}), 200

