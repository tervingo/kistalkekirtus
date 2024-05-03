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
    val = data['val']
    pr = data['pr']
    pa = data['pa']
    fu = data['fu']
    root = data['root']
    en = data['en']
    sw = data['sw']

    mongo.db.translations.update_one(
        {'_id': ObjectId(id)},
        {'$set': {'can': can, 'cat': cat, 'pl': pl, 'pl2': pl2, 'par': par, 'val' : val, 'pr': pr, 'pa': pa, 'fu': fu, 'root': root, 'en': en, 'sw': sw }}
    )
    return jsonify({'result': 'Entry updated successfully'}), 200

