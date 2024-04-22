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
    """performs CRUD on poll objects"""
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
    """gets polls a user participated in"""
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
    """CRUD operations on polls by institution"""
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
