#!/usr/bin/python3
"""starts a countries route"""
from api.v1.views import app_views
from flask import jsonify, abort
from models import Storage
from models.countries import Country


@app_views.route(
    '/countries',
    strict_slashes=False,
    methods=['GET']
    )
def country():
    """This route handles the retrieval of country objects for a specific country.

        Returns:
            GET: A JSON response containing a list of country IDs associated with the country and a status code of 200 if successful.
                Each country in the list is represented as a dictionary with the structure:
                {
                    "id": <country ID>,
                    "name": <country name>,
                    ... (additional country details)
                }

            A response with an error message and a status code of 404 if no
            country is found.
    """
    countries = Storage.all(Country)
    if countries is None:
        abort(404)
    countries = [country.to_dict() for country in countries]
    return jsonify(countries)
