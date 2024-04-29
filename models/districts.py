#!/usr/bin/python3
"""
districts.py

This module contains the `District` class
which represents the `districts` table in the database.

Imports:
- `Column`, `String`, `ForeignKey`, `orm` from `sqlalchemy`:
    These are used to define the columns in the `districts` table.
- `BaseModel`, `Base` from `models.base_model`:
    `BaseModel` is the base class for all models
    and `Base` is the declarative base class from SQLAlchemy.

Classes:
- `District`: This class represents the `districts` table in the database.
    It has the following attributes:
        - `country_id`: A string that represents the ID of the country this district belongs to.
            It's a foreign key that references the `id` column in the `countries` table. It cannot be null.
        - `name`: A string that represents the name of the district.
            It cannot be null.
        - `region_id`: A string that represents the ID of the region this district belongs to.
            It's a foreign key that references the `id` column in the `regions` table.
        - `institutions`: A list of `Institution` instances that belong to this district.
            This attribute is not represented as a column in the `districts` table.
            It's a relationship that is defined elsewhere in the code.
        - `users`: A list of `User` instances that belong to this district.
            This attribute is not represented as a column in the `districts` table.
            It's a relationship that is defined elsewhere in the code.
"""

from datetime import datetime
from sqlalchemy import Column, String, ForeignKey, orm
from models.base_model import BaseModel, Base


class District(BaseModel, Base):
    """
    This class structures an districts table in the database

    Attributes:
        country_id: The ID of the country this district belongs to
        name: The name of the district
        region_id: The ID of the region this district belongs to
        institutions: A list of institutions that belong to this district
        users: A list of users that belong to this district
    """

    __tablename__ = "districts"
    country_id = Column(String(60), ForeignKey('countries.id'), nullable=False)
    name = Column(String(128), nullable=False)
    region_id = Column(String(60), ForeignKey("regions.id"))

    institutions = orm.relationship('Institution',
                                    backref='district',
                                    cascade='all, delete')

    users = orm.relationship(
        'User',
        backref='district',
        cascade='all, delete'
        )

    polls = orm.relationship('Poll', backref='district')

    def to_dict(self):
        """
        Returns a dictionary of the data for this district
        to be used with the Flask jsonify method

        Returns:
            dict: A dictionary representation of the district
        """
        return {
            '__class__': self.__class__.__name__,
            'id': self.id,
            'created_at': datetime.isoformat(self.created_at),
            'updated_at': datetime.isoformat(self.updated_at),
            'country_id': self.country_id,
            'name': self.name,
            'region_id': self.region_id
        }
