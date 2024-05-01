#!/usr/bin/python3
"""starts a update route"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import Storage
from models.users import User
from models.institutions import Institution
from api.v1.ext import upload, textract
import json
import traceback
from sqlalchemy.exc import IntegrityError
import os

@app_views.route('/update/<obj_id>', strict_slashes=False,
                 methods=['POST'])
def signup(obj_id):
    """Handles the update process.

    This route handles the update process for both users and objitutions.
    It expects a form containing the necessary information for update.
    The structure of the form payload for user update should be as follows:
    For a user:
    { 'json': {
        "class": "user",
        "mobile_number": A string that represents the user's mobile number. It can store up to 14 characters.
        "occupation": A string that represents the user's occupation. It can store up to 128 characters.
        "ed_speciality": A string that represents the user's educational speciality. It can store up to 128 characters.
        "job_role": A string that represents the user's job role. It can store up to 128 characters.
        "company_id": A string that represents the ID of the company where the user works. It is a foreign key that references the 'id' column of the 'objitutions' table. It can store up to 60 characters.
        "job_description": A string that represents a description of the user's job. It can store up to 2048 characters.
        "salary": A float that represents the user's salary.
        "hobbies": A string that represents the user's hobbies. It can store up to 2048 characters.
        },
        'pic': <profile picture file>
        'id_snippet': <ID card file>
    } 
    For an objitution:
    { 'json': {
        "class": "objitution",
        "postal_code": An integer that represents the postal code of the user or objitution.
        "phone_number": A string that represents the phone number of the user or objitution. It can store up to 14 characters.
        "parent_company": A string that represents the parent company of the user or objitution. It can store up to 128 characters.
        "website_url": A string that represents the website URL of the user or objitution. It can store up to 128 characters.
        },
        'pic': <profile picture file>
    }
"""
    params = json.loads(request.files['json'])
    if params['class'] == 'user':
        try:
            obj = Storage.get(User, obj_id)
            if obj is None:
                abort(404)
            if obj.verified is False:
                id_card = request.files['id_snippet']
                file_path = '/tmp/' + obj.email
                id_card.save(file_path)
                id_details = textract.extract(file_path)
                params.update(id_details)
                params['verified'] = True
                os.remove(file_path)
        except Exception:
            traceback.print_exc()
        params.pop('class')
        try:
            profile_pic = request.files['pic']
            filename = '/tmp/' + obj.id + '.jpeg'
            profile_pic.save(filename)
            params['pic'] = upload.upload_to_s3(file_name = filename, object_name = f"{obj.id}.jpeg")
            os.remove(filename)
        except Exception:
            traceback.print_exc()
        obj.update(**params)
    else:
        obj = Storage.get(Institution, obj_id)
        params.pop('class')
        try:
            profile_pic = request.files['pic']
            filename = '/tmp/' + obj.id + '.jpeg'
            profile_pic.save(filename)
            params['pic'] = upload.upload_to_s3(file_name = filename, object_name = f"{obj.id}.jpeg")
            os.remove(filename)
        except Exception:
            traceback.print_exc()
        obj.update(**params)
    Storage.save()
    return jsonify(obj.to_dict()), 200