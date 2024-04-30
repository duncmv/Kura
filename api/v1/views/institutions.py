#!/usr/bin/python3
"""starts a institutions route"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import Storage
from models.institutions import Institution


@app_views.route(
    "/institutions",
    strict_slashes=False,
    methods='GET'
    )
@app_views.route(
    '/institutions/<institution_id>',
    strict_slashes=False,
    methods=['GET', 'DELETE', 'PUT']
    )
def institution(institution_id=None):
    """This route handles the retrieval, deletion, and updating of institution objects.

        Returns:
            GET: A JSON response containing the requested institution details and a status code of 200 if successful.
                If no institution_id is provided, it returns a list of all institutions.
                Each institution in the list is represented as a dictionary with the structure:
                {
                    "id": <institution ID>,
                    "name": <institution name>,
                    ... (additional institution details)
                }
            DELETE: A JSON response with a status code of 200 and an empty body if successful.
            PUT: A JSON response containing the updated institution details and a status code of 200 if successful.

            A response with an error message and a status code of 404 if the
            institution is not found.
            A response with an error message and a status code of 400 if the
            request is not a JSON.
    """
    if request.method == 'GET':
        if institution_id is None:
            all_institutions = [institution.to_dict() for institution in Storage.all(Institution)]
            return jsonify(all_institutions)
        else:
            institution = Storage.get(Institution, institution_id)
            if institution is None:
                abort(404)
            return jsonify(institution.to_dict())

    if request.method == 'DELETE':
        institution = Storage.get(institution, institution_id)
        if institution is not None:
            Storage.delete(institution)
            Storage.save()
            return jsonify({})
        abort(404)

    if request.method == 'PUT':
        institution = Storage.get(institution, institution_id)
        if institution is None:
            abort(404)
        params = request.get_json(silent=True)
        if not params:
            return make_response("Not a JSON\n", 400)
        for k in ("id", "created_at", "updated_at"):
            params.pop(k, None)
        for k, v in params.items():
            setattr(institution, k, v)
        # try saving the changes, if any conflict happens abort with 400
        try:
            institution.save()
        except Exception:
            abort(400)
        return jsonify(institution.to_dict())
