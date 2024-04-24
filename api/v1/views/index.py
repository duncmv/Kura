#!/usr/bin/python3
"""starts a status route"""
from api.v1.views import app_views
from flask import jsonify, send_from_directory
from models import Storage
from models.polls import Poll
from models.institutions import Institution
from models.users import User
from models.districts import District
from models.choices import Choice
from models.legal_entity import LegalEntity

@app_views.route('/status', strict_slashes=False)
def status():
    """returns the status"""
    return jsonify(status="OK")


@app_views.route('/stats', strict_slashes=False)
def stats():
    """returns the stats"""
    stats = {
        "polls": Storage.count(Poll),
        "institutions": Storage.count(Institution),
        "users": Storage.count(User),
        "districts": Storage.count(District),
        "choices": Storage.count(Choice),
        "legal_entities": Storage.count(LegalEntity)
    }
    return jsonify(stats)

@app_views.route('/docs/<path:filename>', methods=['GET'])
def docs(filename):
    """returns the documentation"""
    return send_from_directory('../_build/html', filename)

@app_views.route('/docs/_static/<path:filename>', methods=['GET'])
def docs_static(filename):
    """returns the static files for the documentation"""
    return send_from_directory('../_build/html/_static', filename)