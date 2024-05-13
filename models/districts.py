#!/usr/bin/python3
"""This module defines a class User"""

from sqlalchemy import Column, String, ForeignKey, orm
from models.base_model import BaseModel, Base
from models.institutions import Institution
from models.users import User


class District(BaseModel, Base):
    """This class defines a user by various attributes"""

    __tablename__ = "districts"
    country_id = Column(String(60), ForeignKey('countries.id'), nullable=False)
    name = Column(String(128), nullable=False)
    region = Column(String(10))

    institutions = orm.relationship('Institution',
                                    backref='district',
                                    cascade='all, delete')

    users = orm.relationship('User',
                             backref='district',
                             cascade='all, delete')

    polls = orm.relationship('Poll', backref='district')
