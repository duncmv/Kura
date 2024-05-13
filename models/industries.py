#!/usr/bin/python3
"""This module defines a class Industry"""

from sqlalchemy import Column, String, orm
from models.base_model import BaseModel, Base


class Industry(BaseModel, Base):
    """This class defines an Industry by various attributes"""

    __tablename__ = "industries"
    name = Column(String(128), nullable=False)

    institutions = orm.relationship('Institution',
                                 backref='industry')