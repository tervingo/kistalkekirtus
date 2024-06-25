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
    pul = data['pul']
    pr = data['pr']
    pa = data['pa']
    fu = data['fu']
    root = data['root']
    en = data['en']
    sw = data['sw']

    # Get the current count of documents in the translations collection
    current_count = mongo.db.translations.count_documents({})

    # Create the new document with the 'num' field
    new_document = {
        'can': can, 
        'num': current_count + 1,
        'cat': cat, 
        'pl': pl, 
        'pl2': pl2, 
        'par': par, 
        'pul': pul, 
        'pr': pr, 
        'pa': pa, 
        'fu': fu, 
        'root': root, 
        'en': en, 
        'sw': sw
    }

    # Insert the new document
    mongo.db.translations.insert_one(new_document)
    
    return jsonify({'result': 'Translation added successfully', 'num': current_count + 1}), 201