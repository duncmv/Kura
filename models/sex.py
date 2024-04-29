#!/usr/bin/python3

from sqlalchemy import Column, String, orm
from models.base_model import BaseModel, Base


class Sex(BaseModel, Base):
    """ This class structures a sexes table in the database
    Attributes:
        type: The type of the sex
        users: A list of users with this sex
    """

    __tablename__ = "sexes"
    type = Column(String(60), nullable=False)
    
    users = orm.relationship(
        'User',
        backref='sex',
        viewonly=False
        )
