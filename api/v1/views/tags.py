#!/usr/bin/python3
"""starts a tags route"""
from api.v1.views import app_views
from flask import jsonify, request, abort
from models import Storage
from models.tags import Tag


@app_views.route('user/<user_id>/tags/<poll_id>', strict_slashes=False,
                 methods=['GET', 'POST', 'DELETE'])
def tag(user_id, poll_id=None):
    """This route handles the retrieval, creation, and deletion of tag objects associated with a specific user and poll.

        Returns:
            GET: A JSON response containing a list of poll IDs tagged by the user and a status code of 200 if successful.
            POST: A JSON response containing the details of the newly created tag and a status code of 201 if successful.
            DELETE: A JSON response with a status code of 200 and an empty body if successful.

            A response with an error message and a status code of 404 if no tags are found for the user.
    """
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
                return jsonify({})
        abort(404)
