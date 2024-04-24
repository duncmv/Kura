#!/usr/bin/python3
"""starts a polls route"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import Storage
from models.polls import Poll


@app_views.route("/polls", strict_slashes=False,
                 methods=['GET'])
@app_views.route('/polls/<poll_id>', strict_slashes=False,
                 methods=['GET', 'DELETE'])
def poll(poll_id=None):
    """This route handles the retrieval and deletion of poll objects.

        Returns:
            GET: A JSON response containing the requested poll details and a status code of 200 if successful.
                The JSON response will be structured as follows:
                 {
                     "id": <poll ID>,
                     "title": <poll title>,
                     "description": <poll description>,
                     "questions": [
                         {
                             "id": <question ID>,
                             "text": <question text>,
                             "answers": [
                                 {
                                     "id": <answer ID>,
                                     "text": <answer text>,
                                     ... (additional answer details)
                                 },
                                 ... (additional answers)
                             ],
                             ... (additional question details)
                         },
                         ... (additional questions)
                     ],
                     ... (additional poll details)
                 }
                 If no poll_id is provided, it returns a list of poll IDs for all polls.

            DELETE: A JSON response with a status code of 200 and an empty body if successful.

            A response with an error message and a status code of 404 if the
            poll is not found.
    """
    if request.method == 'GET':
        if poll_id is None:
            all = [poll.id for poll in Storage.all(Poll)]
            return jsonify(all)
        else:
            poll = Storage.get(Poll, poll_id)
            if poll is None:
                abort(404)
            p_dict = poll.to_dict()
            questions = poll.questions
            q_list = []
            for question in questions:
                answers = question.answers
                q_dict = question.to_dict()
                a_list = []
                for answer in answers:
                    a_list.append(answer.to_dict())
                q_dict['answers'] = a_list
                q_list.append(q_dict)
            p_dict['questions'] = q_list

            return jsonify(p_dict)

    if request.method == 'DELETE':
        poll = Storage.get(Poll, poll_id)
        if poll is not None:
            Storage.delete(poll)
            Storage.save()
            return jsonify({})
        abort(404)


@app_views.route('/users/<user_id>/polls', strict_slashes=False,
                 methods=['GET'])
def polls_by_user(user_id):
    """This route retrieves all polls a specific user has participated in.

        Returns:
            A JSON response containing a list of poll IDs the user has participated in and a status code of 200 if successful.
    """
    polls = Storage.all(Poll)
    u_polls = []
    for poll in polls:
        for question in poll.questions:
            for answer in question.answers:
                for choice in answer.choices:
                    if choice.user_id == user_id:
                        if poll.id not in u_polls:
                            u_polls.append(poll.id)
    return jsonify(u_polls)

@app_views.route('/institutions/<institution_id>/polls', strict_slashes=False,
                 methods=['GET', 'POST'])
def polls_by_institution(institution_id):
    """This route handles the retrieval and creation of poll objects for a specific institution.

        Returns:
            GET: A JSON response containing a list of poll IDs associated with the institution and a status code of 200 if successful.
            POST: A JSON response containing the details of the newly created poll and a status code of 201 if successful.

            A response with an error message and a status code of 400 if the
            request is not a JSON or the title is missing in the request.
    """
    if request.method == 'GET':
        polls = [poll.id for poll in Storage.all(Poll) if poll.institution_id == institution_id]
        return jsonify(polls)

    if request.method == 'POST':
        params = request.get_json(silent=True)
        if not params:
            return make_response("Not a JSON\n", 400)
        if 'title' not in params:
            return make_response("Missing title\n", 400)
        params['institution_id'] = institution_id
        new = Poll(**params)
        new.save()
        return jsonify(new.to_dict()), 201
