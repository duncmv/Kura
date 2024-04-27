#!/usr/bin/python3
"""
countries.py

This module contains the `Country` class which represents the `countries` table in the database.

Imports:
- `Column`, `String`, `orm` from `sqlalchemy`:
    These are used to define the columns in the `countries` table.
- `BaseModel`, `Base` from `models.base_model`:
    `BaseModel` is the base class for all models
    and `Base` is the declarative base class from SQLAlchemy.

Classes:
- `Country`: This class represents the `countries` table in the database.
    It has the following attributes:
        - `name`: A string that represents the name of the country.
            It cannot be null.
        - `districts`: A list of `District` instances that belong to this country.
            This attribute is not represented as a column in the `countries` table.
"""

from sqlalchemy import Column, String, orm
from models.base_model import BaseModel, Base


class Country(BaseModel, Base):
    """This class structures an industries table in the database

    attributes:
        name: The name of the country
        districts: A list of districts that belong to this country
    """

    __tablename__ = "countries"
    name = Column(String(128), nullable=False)

    districts = orm.relationship(
        'District',
        backref='country',
        cascade='all, delete'
        )

    def to_dict(self):
        """
        Returns a dictionary of the data for this country
        to be used with the Flask jsonify method

        Returns:
            dict: A dictionary representation of the country
        """
        return {
            '__class__': self.__.class__.__name__,
            'id': self.id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'name': self.name
            }
