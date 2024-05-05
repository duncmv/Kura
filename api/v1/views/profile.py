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
def update(obj_id):
    """Handles the update process.

    This route handles the update process for both users and institutions.
    It expects a form containing the necessary information for update.
    The structure of the form payload for user update should be as follows:
    For a user:
    { 'json': {
        "class": "user",
        "mobile_number": A string that represents the user's mobile number.
        "occupation": A string that represents the user's occupation.
        "ed_speciality": A string that represents the user's educational speciality.
        "job_role": A string that represents the user's job role.
        "company_id": <valid institution_id> A string that represents the ID of the company where the user works.
        "job_description": A string that represents a description of the user's job.
        "salary": A float that represents the user's salary.
        "hobbies": A string that represents the user's hobbies.
        },
        'pic': <profile picture file>
        'id_snippet': <ID card file>
    } 
    For an institution:
    { 'json': {
        "class": "institution",
        "postal_code": An integer that represents the postal code of institution.
        "phone_number": A string that represents the phone number of the institution. 
        "parent_company": A string that represents the parent company of the institution.
        "website_url": A string that represents the website URL of the institution.
        },
        'pic': <profile picture file>
        'cover': <cover picture file>
    }
"""
    params = json.load(request.files['json'])
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
            pass
        params.pop('class')
        params.pop('__class__')
        try:
            profile_pic = request.files['pic']
            filename = '/tmp/' + obj.id + '.jpeg'
            profile_pic.save(filename)
            params['pic'] = upload.upload_to_s3(file_name = filename, object_name = f"{obj.id}.jpeg")
            os.remove(filename)
        except Exception:
            pass
        try:
            obj.update(**params)
        except IntegrityError:
            return make_response(jsonify({"error": "User already exists"}), 400)
    else:
        obj = Storage.get(Institution, obj_id)
        params.pop('class')
        params.pop('__class__')
        try:
            profile_pic = request.files['pic']
            filename = '/tmp/' + obj.id + '.jpeg'
            profile_pic.save(filename)
            params['pic'] = upload.upload_to_s3(file_name = filename, object_name = f"{obj.id}.jpeg")
            os.remove(filename)
        except Exception:
            traceback.print_exc()
        try:
            cover = request.files['cover']
            filename = '/tmp/cover_' + obj.id + '.jpeg'
            profile_pic.save(filename)
            params['cover'] = upload.upload_to_s3(file_name = filename, object_name = f"cover_{obj.id}.jpeg")
            os.remove(filename)
        except Exception:
            traceback.print_exc()
        obj.update(**params)
    Storage.save()
    return jsonify(obj.to_dict()), 200