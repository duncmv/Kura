#!/usr/bin/python3
"""starts a industries route"""
from api.v1.views import app_views
from flask import jsonify, abort
from models import Storage
from models.industries import Industry


@app_views.route(
    '/industries',
    strict_slashes=False,
    methods=['GET']
    )
def industry():
    """This route handles the retrieval of industry objects for a specific industry.

        Returns:
            GET: A JSON response containing a list of industry IDs associated with the industry and a status code of 200 if successful.
                Each industry in the list is represented as a dictionary with the structure:
                {
                    "id": <industry ID>,
                    "name": <industry name>,
                    ... (additional industry details)
                }

            A response with an error message and a status code of 404 if no
            industry is found.
    """

    industries = Storage.all(Industry)
    if industries is None:
        abort(404)
    industries = [industry.to_dict() for industry in industries]
    return jsonify(industries)
