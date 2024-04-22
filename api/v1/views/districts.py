#!/usr/bin/python3
"""starts a districts route"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import Storage
from models.countries import Country


@app_views.route('/countries/<country_id>/districts', strict_slashes=False,
                 methods=['GET', 'POST'])
def district_by_country(country_id):
    """performs CRUD on district objects"""
    if request.method == 'GET':
        country = Storage.get(Country, country_id)
        if country is None:
            abort(404)
        districts = [district.to_dict() for district in country.districts]
        return jsonify(districts)