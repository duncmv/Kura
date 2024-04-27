#!/usr/bin/python3
""" legal_entity.py
This module contains the `LegalEntity` class which represents the `legal_entities` table in the database.
Imports:
    - `Column`, `String`, `orm` from `sqlalchemy`:
        These are used to define the columns in the `legal_entities` table.
    - `BaseModel`, `Base` from `models.base_model`:
        `BaseModel` is the base class for all models
        and `Base` is the declarative base class from SQLAlchemy.
classes:
    - `LegalEntity`: This class represents the `legal_entities` table in the database.
        It has the following attributes:
            - `name`: A string that represents the name of the legal entity.
                It cannot be null.
            - `description`: A string that represents the description of the legal entity.
            - `institutions`: A list of `Institution` instances that belong to this legal entity.
                This attribute is not represented as a column in the `legal_entities` table.
                It's a relationship that is defined elsewhere in the code.
    - `to_dict`: This method returns a dictionary of the data for this legal entity.
        The dictionary includes the class name, id, created_at, and updated_at attributes of the legal entity.
"""

from sqlalchemy import Column, String, orm
from models.base_model import BaseModel, Base


class LegalEntity(BaseModel, Base):
    """ This class structures an legal_entities table in the database
    Attributes:
        name: The name of the legal entity
        description: The description of the legal entity
        institutions: A list of institutions that belong to this legal entity
    """

    __tablename__ = "legal_entities"
    name = Column(String(128), nullable=False)
    description = Column(String(1024))
    institutions = orm.relationship('Institution',
                                    backref='legal_entity',
                                    cascade='all, delete')

    def to_dict(self):
        """ Returns a dictionary of the data for this legal entity
        to be used with the Flask jsonify method
        Returns:
            dict: A dictionary representation of the legal entity
        """
        return {
            '__class__': self.__class__.__name__,
            'id': self.id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'name': self.name,
            'description': self.description
        }
