#!/usr/bin/python3
"""This module defines a class User"""

from sqlalchemy import Column, String, orm
from models.base_model import BaseModel, Base
from models.institutions import Institution


class LegalEntity(BaseModel, Base):
    """This class defines a user by various attributes"""

    __tablename__ = "legal_entities"
    name = Column(String(128), nullable=False)
    description = Column(String(1024))
    institutions = orm.relationship('Institution',
                                    backref='legal_entity',
                                    cascade='all, delete')
