#!/usr/bin/python3
"""This module defines a class User"""

from sqlalchemy import Column, String, DATE, INTEGER, ForeignKey, orm
from models.base_model import BaseModel, Base
from models.users import User
from datetime import date


class Institution(BaseModel, Base):
    """This class defines a user by various attributes"""

    __tablename__ = "institutions"

    email = Column(String(128), nullable=False, unique=True)
    password = Column(String(128), nullable=False)

    name = Column(String(128), nullable=False)

    industry_classification = Column(String(128), nullable=False)
    registration_number = Column(String(64), nullable=False, unique=True)
    date_of_establishment = Column(DATE, nullable=False)

    postal_code = Column(INTEGER)
    phone_number = Column(String(14), nullable=False)

    parent_company = Column(String(128))

    website_url = Column(String(128))

    district_id = Column(
        String(60),
        ForeignKey('districts.id'),
        nullable=False
        )

    legal_intity_id = Column(
        String(60),
        ForeignKey('legal_entities.id'),
        nullable=False
        )

    users = orm.relationship('User', backref='company')

    polls = orm.relationship(
        'Poll',
        backref='institution',
        cascade='all, delete'
        )
