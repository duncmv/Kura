#!/usr/bin/python3
"""api app v1"""
from flask import Flask, jsonify, make_response
from models import Storage
from api.v1.views import app_views
from os import getenv
from flask_cors import CORS


app = Flask(__name__)
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})


@app.errorhandler(404)
def not_found(err):
    return make_response(jsonify(error="Not found"), 404)


@app.teardown_appcontext
def teardown(err):
    Storage.close()


if __name__ == "__main__":
    app.run(host=getenv('KURA_API_HOST', '0.0.0.0'),
            port=int(getenv('KURA_API_PORT', 5000)),
            threaded=True)
