#!/usr/bin/python3
"""starts a entities route"""
from api.v1.views import app_views
from flask import jsonify, request, abort
from models import Storage
from models.legal_entity import LegalEntity


@app_views.route('/entities', strict_slashes=False,
                 methods=['GET'])
def entity():
    """performs CRUD on entity objects"""
    if request.method == 'GET':
        entities = [entity.to_dict() for entity in Storage.all(LegalEntity)]
        if entities is None:
            abort(404)
        return jsonify(entities)