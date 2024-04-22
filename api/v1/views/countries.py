#!/usr/bin/python3
"""starts a countries route"""
from api.v1.views import app_views
from flask import jsonify, request, abort
from models import Storage
from models.countries import Country


@app_views.route('/countries', strict_slashes=False,
                 methods=['GET', 'POST'])
def country():
    """performs CRUD on country objects"""
    if request.method == 'GET':
        countries = Storage.all(Country)
        if countries is None:
            abort(404)
        countries = [country.to_dict() for country in countries]
        return jsonify(countries)