#!/usr/bin/python3
"""starts a choices route"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import Storage
from models.choices import Choice
from models.users import User


@app_views.route("users/<user_id>/<answer_id>/", strict_slashes=False,
                 methods=['POST', 'DELETE'])
@app_views.route('answers/<answer_id>/', strict_slashes=False,
                 methods=['GET'])
def choice(user_id=None, answer_id=None):
    """performs CRUD on choice objects"""
    if request.method == 'GET':
        choices = len([choice for choice in Storage.all(Choice) if choice.answer_id == answer_id])
        return jsonify(choices)

    if request.method == 'POST':
        new = Choice(user_id=user_id, answer_id=answer_id)
        new.save()
        return make_response("done\n", 201)

    if request.method == 'DELETE':
        for choice in Storage.all(Choice):
            if choice.answer_id == answer_id and choice.user_id == user_id:
                choice.delete()
                return make_response("deleted\n", 200)
        abort(404)