#!/usr/bin/python3
"""starts a institutions route"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import Storage
from models.institutions import Institution


@app_views.route("/institutions", strict_slashes=False,
                 methods=['GET'])
@app_views.route('/institutions/<institution_id>', strict_slashes=False,
                 methods=['GET', 'DELETE', 'PUT'])
def institution(institution_id=None):
    """performs CRUD on institution objects"""
    if request.method == 'GET':
        if institution_id is None:
            all = [institution.to_dict() for institution in Storage.all(Institution)]
            return jsonify(all)
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
        for k in ("id", "email", "created_at", "updated_at"):
            params.pop(k, None)
        for k, v in params.items():
            setattr(institution, k, v)
        institution.save()
        return jsonify(institution.to_dict())
