#!/usr/bin/python3
"""starts a question route"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import Storage
from models.answers import Answer



@app_views.route('/questions/<question_id>/answers', strict_slashes=False,
                 methods=['POST'])
def answers_by_question(question_id):
    """preforms CRUD operations on questions"""
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


@app_views.route('/answers/answer_id', strict_slashes=False,
                 methods=['PUT', 'DELETE'])
def answers(answer_id):
    """more CRUD on answers"""
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
        for k in ("id", "answer_id", "question_id", "created_at", "updated_at"):
            params.pop(k, None)
        for k, v in params.items():
            setattr(answer, k, v)
        answer.save()
        return jsonify(answer.to_dict())
