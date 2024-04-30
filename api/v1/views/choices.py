#!/usr/bin/python3
"""starts a choices route"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import Storage
from models.choices import Choice
from models.users import User
from models.answers import Answer
from models.questions import Question

@app_views.route(
    "users/<user_id>/<answer_id>/",
    strict_slashes=False,
    methods=['POST', 'DELETE']
    )
@app_views.route(
    'answers/<answer_id>/',
    strict_slashes=False,
    methods='GET'
    )
def choice(user_id=None, answer_id=None):
    """This route handles the retrieval, creation, and deletion of choice objects associated with a specific user and answer.

        Returns:
            GET: A JSON response containing the count of choices associated with the answer and a status code of 200 if successful.
            POST: A JSON response with a status code of 201 and a body containing "done" if successful.
            DELETE: A JSON response with a status code of 200 and a body containing "deleted" if successful.

            A response with an error message and a status code of 404 if no choices are found for the user and answer.
    """
    if request.method == 'GET':
        the_answer = Storage.get(Answer, answer_id)
        answer_counter = len(the_answer.choices)
        return jsonify(answer_counter)

    if request.method == 'POST':
        user = Storage.get(User, user_id)
        if user is None:
            abort(404)
        for choices in user.choices:
            if choices.answer_id == answer_id:
                return make_response("done\n", 200)
        answer = Storage.get(Answer, answer_id)
        if answer is None:
            abort(404)
        question = Storage.get(Question, answer.question_id)
        if question is None:
            abort(404)
        answer_ids = [answer.id for answer in question.answers]
        for choice in user.choices:
            if choice.answer_id in answer_ids:
                choice.delete()
        new_choice = Choice(user_id=user_id, answer_id=answer_id)
        new_choice.save()
        return make_response("done\n", 201)          

    if request.method == 'DELETE':
        user = Storage.get(User, user_id)
        if user is None:
            abort(404)
        for choice in user.choices:
            if choice.answer_id == answer_id:
                choice.delete()
                return make_response("deleted\n", 200)
        abort(404)
    
@app_views.route('users/<user_id>/choices', strict_slashes=False, methods=['GET'])
def choices_by_user(user_id):
    """This route handles the retrieval of choice objects associated with a specific user.

        Returns:
            A JSON response containing a list of answer IDs chosen by the user and a status code of 200 if successful.

            A response with an error message and a status code of 404 if no choices are found for the user.
    """
    user = Storage.get(User, user_id)
    if user is None:
        abort(404)
    choices = [choice.answer_id for choice in user.choices]
    return jsonify(choices)
