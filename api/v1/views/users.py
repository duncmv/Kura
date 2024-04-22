#!/usr/bin/python3
"""starts a users route"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import Storage
from models.users import User


@app_views.route("/users", strict_slashes=False,
                 methods=['GET'])
@app_views.route('/users/<user_id>', strict_slashes=False,
                 methods=['GET', 'DELETE', 'PUT'])
def user(user_id=None):
    """performs CRUD on user objects"""
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
        user.save()
        return jsonify(user.to_dict())
