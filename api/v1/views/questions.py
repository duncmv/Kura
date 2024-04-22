#!/usr/bin/python3
"""starts a question route"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import Storage
from models.questions import Question



@app_views.route('/polls/<poll_id>/questions', strict_slashes=False,
                 methods=['POST'])
def questions_by_poll(poll_id):
    """preforms CRUD operations on questions"""
    if request.method == 'POST':
        params = request.get_json(silent=True)
        if not params:
            return make_response("Not a JSON\n", 400)  
        if 'text' not in params:
            return make_response("Missing text\n", 400)
        params['poll_id'] = poll_id
        new = Question(**params)
        new.save()
        return jsonify(new.to_dict()), 201


@app_views.route('/questions/question_id', strict_slashes=False,
                 methods=['PUT', 'DELETE'])
def questions(question_id):
    """more CRUD on questions"""
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
        for k in ("id", "poll_id", "city_id", "created_at", "updated_at"):
            params.pop(k, None)
        for k, v in params.items():
            setattr(question, k, v)
        question.save()
        return jsonify(question.to_dict())
