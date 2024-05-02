from flask import Blueprint, send_file, request, jsonify
from __init__ import mongo

enter_route = Blueprint('enter_route', __name__)


@enter_route.route('/api/enter-entry', methods=['POST'])
def add_translation():
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

    mongo.db.translations.insert_one({'can': can, 'cat': cat, 'pl': pl, 'pl2': pl2, 'par': par, 'val' : val, 'pr': pr, 'pa': pa, 'fu': fu, 'root': root, 'en': en })
    return jsonify({'result': 'Translation added successfully'}), 201
