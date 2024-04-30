#!/usr/bin/python3
"""starts a question route"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import Storage
from models.questions import Question
from models.answers import Answer



@app_views.route(
    '/polls/<poll_id>/questions',
    strict_slashes=False,
    methods='POST'
    )
def questions_by_poll(poll_id):
    """This route handles the creation of question objects for a specific poll.

        Expected JSON payload:
        {
            [
                {
                    "text": "<question text>",
                    "answers": [
                        "<answer 1 text>",
                        "<answer 2 text>",
                        ... more answer texts
                    ]
                },
                ... more questions
            ]
        }

        Returns:
            POST: A JSON response with a status code of 201 and a body containing "done\n" if successful.

            A response with an error message and a status code of 400 if the
            request is not a JSON or the text is missing in the question.
    """
    if request.method == 'POST':
        questions = request.get_json(silent=True)
        if not questions:
            return make_response("Not a JSON\n", 400)
        for question in questions:
            if 'text' not in question:
                return make_response("Missing text in question\n", 400)
            q_params = {'text': question['text'], 'poll_id': poll_id}
            new_q = Question(**q_params)
            new_q.save()
            for answer in question.answers:
                a_params = {'question_id': new_q.id, 'text': answer}
                new_a = Answer(**a_params)
                new_a.save()
        return make_response('done\n', 201)


@app_views.route(
    '/questions/question_id',
    strict_slashes=False,
    methods=['PUT', 'DELETE']
    )
def questions(question_id):
    """This route handles the update and deletion of question objects.

        Returns:
            DELETE: A JSON response with a status code of 200 and an empty body if successful.
            PUT: A JSON response containing the updated question details and a status code of 200 if successful.

            A response with an error message and a status code of 404 if the
            question is not found.
            A response with an error message and a status code of 400 if the
            request is not a JSON.
    """
    if request.method == 'DELETE':
        question = Storage.get(Question, question_id)
        if question is not None:
            Storage.delete(question)
            Storage.save()
            return jsonify({})
        abort(404)

    if request.method == 'PUT':
        question = Storage.get(Question, question_id)
        if question is None:
            abort(404)
        params = request.get_json(silent=True)
        if not params:
            return make_response("Not a JSON\n", 400)
        for k in ("id", "poll_id", "created_at", "updated_at"):
            params.pop(k, None)
        for k, v in params.items():
            setattr(question, k, v)
        question.save()
        return jsonify(question.to_dict())
