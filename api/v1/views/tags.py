#!/usr/bin/python3
"""starts a tags route"""
from api.v1.views import app_views
from flask import jsonify, request, abort
from models import Storage
from models.tags import Tag


@app_views.route('user/<user_id>/tags/<poll_id>', strict_slashes=False,
                 methods=['GET', 'POST', 'DELETE'])
def tag(user_id, poll_id=None):
    """performs CRUD on tag objects"""
    if request.method == 'GET':
        tags = Storage.all(Tag)
        if tags is None:
            abort(404)
        tags = [tag.poll_id for tag in tags if tag.user_id == user_id]
        return jsonify(tags)

    if request.method == 'POST':
        new = Tag(user_id=user_id, poll_id=poll_id)
        new.save()
        return jsonify(new.to_dict()), 201

    if request.method == 'DELETE':
        for tag in Storage.all(Tag):
            if tag.user_id == user_id and tag.poll_id == poll_id:
                tag.delete()
                