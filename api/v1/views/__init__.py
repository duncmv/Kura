#!/usr/bin/python3
"""initializes the blueprint"""
from flask import Blueprint


app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.index import *
from api.v1.views.countries import *
from api.v1.views.districts import *
from api.v1.views.institutions import *
from api.v1.views.users import *
from api.v1.views.polls import *
from api.v1.views.choices import *
from api.v1.views.questions import *
from api.v1.views.answers import *
from api.v1.views.legal_entity import *
from api.v1.views.tags import *
from api.v1.views.signup import *
from api.v1.views.login import *
from api.v1.views.industries import *
from api.v1.views.profile import *
