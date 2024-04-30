#!/usr/bin/python3
"""starts a tags route"""
from api.v1.views import app_views
from flask import jsonify, request, abort, make_response
from models import Storage
from models.users import User
from models.polls import Poll


@app_views.route(
    'user/<user_id>/tags/<poll_id>',
    strict_slashes=False,
    methods=['POST', 'DELETE']
    )
@app_views.route('user/<user_id>/tags', strict_slashes=False, methods=['GET'])
def tag(user_id, poll_id=None):
    """This route handles the retrieval, creation, and deletion of tag objects associated with a specific user and poll.

        Returns:
            GET: A JSON response containing a list of poll IDs tagged by the user and a status code of 200 if successful.
            POST: A JSON response containing the details of the newly created tag and a status code of 201 if successful.
            DELETE: A JSON response with a status code of 200 and an empty body if successful.

            A response with an error message and a status code of 404 if no tags are found for the user.
    """
    if request.method == 'GET':
        user = Storage.get(User, user_id)
        if user is None:
            abort(404)
        tags = [poll.to_dict() for poll in user.taged_polls]
        return jsonify(tags)

    if request.method == 'POST':
        user = Storage.get(User, user_id)
        if user is None:
            abort(404)
        poll = Storage.get(Poll, poll_id)
        if poll is None:
            abort(404)
        user.taged_polls.append(poll)
        return make_response("Done\n", 201)

    if request.method == 'DELETE':
        user = Storage.get(User, user_id)
        if not user:
            abort(404)
        poll = Storage.get(Poll, poll_id)
        if not poll:
            abort(404)
        if poll in user.taged_polls:
            user.taged_polls.remove(poll)
            Storage.save()
            return jsonify({})
        else:
            abort(400)  # if the poll is not tagged by this user
