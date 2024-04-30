#!/usr/bin/python3
"""starts a question route"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import Storage
from models.answers import Answer


@app_views.route(
    '/questions/<question_id>/answers',
    strict_slashes=False,
    methods=['POST']
)
def answers_by_question(question_id):
    """This route handles the creation of answer objects for a specific question.

        Returns:
            POST: A JSON response containing the details of the newly created answer and a status code of 201 if successful.

            A response with an error message and a status code of 400 if the
            request is not a JSON or the text is missing in the request.
    """
    if request.method == 'POST':
        params = request.get_json(silent=True)
        if not params:
            return make_response("Not a JSON\n", 400)  
        if 'text' not in params:
            return make_response("Missing text\n", 400)
        params['question_id'] = question_id
        new = Answer(**params)
        new.save()
        return jsonify(new.to_dict()), 201


@app_views.route(
    '/answers/<answer_id>',
    strict_slashes=False,
    methods=['PUT', 'DELETE']
)
def answers(answer_id):
    """This route handles the update and deletion of answer objects.

        Returns:
            DELETE: A JSON response with a status code of 200 and an empty body if successful.
            PUT: A JSON response containing the updated answer details and a status code of 200 if successful.

            A response with an error message and a status code of 404 if the
            answer is not found.
            A response with an error message and a status code of 400 if the
            request is not a JSON.
    """
    if request.method == 'DELETE':
        answer = Storage.get(Answer, answer_id)
        if answer is not None:
            Storage.delete(answer)
            Storage.save()
            return jsonify({})
        abort(404)

    if request.method == 'PUT':
        answer = Storage.get(Answer, answer_id)
        if answer is None:
            abort(404)
        params = request.get_json(silent=True)
        if not params:
            return make_response("Not a JSON\n", 400)
        for k in ("id", "question_id", "created_at", "updated_at"):
            params.pop(k, None)
        for k, v in params.items():
            setattr(answer, k, v)
        answer.save()
        return jsonify(answer.to_dict())
