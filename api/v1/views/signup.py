#!/usr/bin/python3
"""starts a signup route"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import Storage
from models.users import User
from models.institutions import Institution
from api.v1.ext import textract
import json
import traceback
from sqlalchemy.exc import IntegrityError

@app_views.route('/signup', strict_slashes=False,
                 methods=['POST'])
def signup():
    """Handles the signup process.

    This route handles the signup process for both users and institutions.
    It expects a form containing the necessary information for signup.
    The structure of the form payload for user signup should be as follows:
    { 'json': {
        "class": "user",
        "email": "user@example.com",
        "name": "John Doe",
        "password": "password123"
        },
      'id_snippet': <ID card file>
    }

    The structure of the form payload for institution signup should be as follows:
    {  'json': {
        "class": "institution",
        "email": "institution@example.com",
        "name": "ABC Institution",
        "password": "password123"
        }
    }

    Returns:
        A JSON response containing the newly created user or institution
        details and a status code of 201 if successful. The structure of the
        JSON response will be as follows:
        {
            "id": <user/institution ID>,
            "email": <user/institution email>,
            "name": <user/institution name>,
            "verified": <verification status>,
            ... (additional user/institution details)
        }

        A response with an error message and a status code of 400 if there
        was an issue verifying the ID card.

    Raises:
        Exception: If there was an error during the ID card verification process.
    """
    params = json.load(request.files['json'])
    if params['class'] == 'user':
        try:
            id_card = request.files['id_snippet']
            file_path = '/tmp/' + params['email']
            id_card.save(file_path)
            id_details = textract.extract(file_path)
            params.update(id_details)
            params['verified'] = True
        except Exception:
            traceback.print_exc()
        params.pop('class')
        try:
            new = User(**params)
            new.save()
        except IntegrityError:
            return jsonify({'error': 'User with these credentials already exists'}), 400
    else:
        params.pop('class')
        try:
            new = Institution(**params)
            new.save()
        except IntegrityError:
            traceback.print_exc()
            return jsonify({'error': 'Institution already exists'}), 400
    return jsonify(new.to_dict()), 201
