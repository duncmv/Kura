#!/usr/bin/python3
""" regions.py
This module contains the `Region` class which represents the `regions` table in the database.
Imports:
    - `Column`, `String`, `orm` from `sqlalchemy`:
        These are used to define the columns in the `regions` table.
    - `BaseModel`, `Base` from `models.base_model`:
        `BaseModel` is the base class for all models
        and `Base` is the declarative base class from SQLAlchemy.
classes: The classes in this module include:
    - `Region`: This class represents the `regions` table in the database.
        It has the following attributes:
            - `name`: A string that represents the name of the region.
                It cannot be null.
            - `districts`: A list of `District` instances that belong to this region.
                This attribute is not represented as a column in the `regions` table.
                It's a relationship that is defined in districts table.
    - `to_dict`: This method returns a dictionary of the data for this region.
        The dictionary includes the class name, id, created_at, and updated_at attributes of the region.
"""

from datetime import datetime
from sqlalchemy import Column, String, orm
from models.base_model import BaseModel, Base


class Region(BaseModel, Base):
    """ This class structures a regions table in the database
    Attributes:
        name: The name of the region
        districts: A list of districts that belong to this region
    """

    __tablename__ = "regions"
    name = Column(String(128), nullable=False)

    districts = orm.relationship(
        'District',
        backref='region'
        )

    def to_dict(self):
        """ Returns a dictionary of the data for this region
        to be used with the Flask jsonify method
        Returns:
            dict: A dictionary representation of the region
        """
        return {
            '__class__': self.__class__.__name__,
            'id': self.id,
            'created_at': datetime.isoformat(self.created_at),
            'updated_at': datetime.isoformat(self.updated_at),
            'name': self.name
        }
