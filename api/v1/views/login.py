#!/usr/bin/python3
"""starts a login route"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import Storage
from models.users import User
from models.institutions import Institution


@app_views.route(
    '/login',
    strict_slashes=False,
    methods=['POST']
    )
def login():
    """Handles the login process.

        This route handles the login process for both users and institutions.
        It expects a JSON payload containing the necessary information for login.
        The structure of the JSON payload for login should be as follows:
        {
            "email": "<user/institution email>",
            "password": "<password>"
        }

        Returns:
            A JSON response containing the logged in user or institution
            details and a status code of 200 if successful. The structure of the
            JSON response will be as follows:
            {
                "id": <user/institution ID>,
                "email": <user/institution email>,
                "name": <user/institution name>,
                "verified": <verification status>,
                ... (additional user/institution details)
            }

            A response with an error message and a status code of 400 if the
            json was not formatted right

            A response with an error message and a status code of 404 if the
            user or institution is not found.

        Raises:
            Exception: If there was an error during the login process.
        """
    users = Storage.all(User)
    institutions = Storage.all(Institution)
    params = request.get_json(silent=True)
    if not params:
        return make_response("Not a JSON\n", 400)
    for user in users:
        if user.email == params['email']:
            if user.password == params['password']:
                return jsonify(user.to_dict())
            else:
                abort(404)
    for inst in institutions:
        if inst.email == params['email']:
            if inst.password == params['password']:
                return jsonify(inst.to_dict())
            else:
                abort(404)
    abort(404)