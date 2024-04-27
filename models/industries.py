#!/usr/bin/python3
"""
industries.py

This module contains the `Industry` class
which represents the `industries` table in the database.

Imports:
- `Column`, `String`, `orm` from `sqlalchemy`:
    These are used to define the columns in the `industries` table.
- `BaseModel`, `Base` from `models.base_model`:
    `BaseModel` is the base class for all models
    and `Base` is the declarative base class from SQLAlchemy.

Classes:
- `Industry`: This class represents the `industries` table in the database.
    It has the following attributes:
    - `name`: A string that represents the name of the industry.
        It cannot be null.
    - `institutions`: A list of `Institution` instances that belong to this industry.
        This attribute is not represented as a column in the `industries` table.
        It's a relationship that is defined elsewhere in the code.

Methods:
- `to_dict`: This method returns a dictionary of the data for this industry.
    The dictionary includes
    the class name, id, created_at, and updated_at attributes of the industry.
"""

from sqlalchemy import Column, String, orm
from models.base_model import BaseModel, Base


class Industry(BaseModel, Base):
    """
    This class structures an industries table in the database

    Attributes:
        name: The name of the industry
        institutions: A list of institutions that belong to this industry
    """

    __tablename__ = "industries"
    name = Column(String(128), nullable=False)

    institutions = orm.relationship(
        'Institution',
        backref='industry'
        )

    def to_dict(self):
        """
        Returns a dictionary of the data for this industry
        to be used with the Flask jsonify method

        Returns:
            dict: A dictionary representation of the industry
        """
        return {
            '__class__': self.__class__.__name__,
            'id': self.id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'name': self.name
        }
