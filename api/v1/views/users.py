#!/usr/bin/python3
"""starts a users route"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import Storage
from models.users import User
from sqlalchemy.exc import IntegrityError


@app_views.route("/users", strict_slashes=False,
                 methods=['GET'])
@app_views.route('/users/<user_id>', strict_slashes=False,
                 methods=['GET', 'DELETE', 'PUT'])
def user(user_id=None):
    """Handles CRUD operations on user objects.

        This route handles the retrieval, deletion, and updating of user objects.

        Returns:
            GET: A JSON response containing the requested user details and a status code of 200 if successful.
                 If no user_id is provided, it returns a list of all users.
            DELETE: A JSON response with a status code of 200 and an empty body if successful.
            PUT: A JSON response containing the updated user details and a status code of 200 if successful.

            A response with an error message and a status code of 404 if the
            user is not found.

        Raises:
            Exception: If there was an error during the CRUD process.
    """
    if request.method == 'GET':
        if user_id is None:
            all = [user.to_dict() for user in Storage.all(User)]
            return jsonify(all)
        else:
            user = Storage.get(User, user_id)
            if user is None:
                abort(404)
            return jsonify(user.to_dict())

    if request.method == 'DELETE':
        user = Storage.get(User, user_id)
        if user is not None:
            Storage.delete(user)
            Storage.save()
            return jsonify({})
        abort(404)

    if request.method == 'PUT':
        user = Storage.get(User, user_id)
        if user is None:
            abort(404)
        params = request.get_json(silent=True)
        if not params:
            return make_response("Not a JSON\n", 400)
        for k in ("id", "email", "created_at", "updated_at"):
            params.pop(k, None)
        for k, v in params.items():
            setattr(user, k, v)
        try:
            user.save()
        except IntegrityError:
            return make_response("Credentials already exist", 400)
        return jsonify(user.to_dict())
