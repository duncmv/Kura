#!/usr/bin/python3
"""This module defines a class User"""

from sqlalchemy import Column, String, orm
from models.base_model import BaseModel, Base
from models.districts import District


class Country(BaseModel, Base):
    """This class defines a user by various attributes"""

    __tablename__ = "countries"
    name = Column(String(128), nullable=False)

    districts = orm.relationship('District',
                                 backref='country',
                                 cascade='all, delete')
