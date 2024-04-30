#!/usr/bin/python3
"""starts a districts route"""
from api.v1.views import app_views
from flask import jsonify, request, abort
from models import Storage
from models.countries import Country


@app_views.route(
    '/countries/<country_id>/districts',
    strict_slashes=False,
    methods='GET'
    )
def district_by_country(country_id):
    """This route handles the retrieval of district objects for a specific country.

        Returns:
            GET: A JSON response containing a list of district IDs associated with the country and a status code of 200 if successful.
                Each district in the list is represented as a dictionary with the structure:
                {
                    "id": <district ID>,
                    "name": <district name>,
                    ... (additional district details)
                }

            A response with an error message and a status code of 404 if the
            country is not found.
    """
    if request.method == 'GET':
        country = Storage.get(Country, country_id)
        if country is None:
            abort(404)
        districts = [district.to_dict() for district in country.districts]
        return jsonify(districts)
