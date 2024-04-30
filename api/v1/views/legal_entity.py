#!/usr/bin/python3
"""starts a entities route"""
from api.v1.views import app_views
from flask import jsonify, request, abort
from models import Storage
from models.legal_entity import LegalEntity


@app_views.route(
    '/entities',
    strict_slashes=False,
    methods=['GET']
    )
def entity():
    """Handles retrieval of legal entity objects.

        This route handles the retrieval of all legal entity objects.

        Returns:
            GET: A JSON response containing a list of all legal entities and a status code of 200 if successful.
                Each legal entity in the list is represented as a dictionary with the structure:
                {
                    "id": <entity ID>,
                    "name": <entity name>,
                    ... (additional entity details)
                }

            A response with an error message and a status code of 404 if no legal entities are found.
    """
    if request.method == 'GET':
        entities = [entity.to_dict() for entity in Storage.all(LegalEntity)]
        if entities is None:
            abort(404)
        return jsonify(entities)
