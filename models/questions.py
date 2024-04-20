#!/usr/bin/python3
"""This module defines a class User"""

from sqlalchemy import Column, String, ForeignKey, orm
from models.base_model import BaseModel, Base


class Question(BaseModel, Base):
    """This class defines a user by various attributes"""

    __tablename__ = "questions"
    text = Column(String(180), nullable=False)
    poll_id = Column(String(60), ForeignKey('polls.id'), nullable=False)

    answers = orm.relationship(
        'Answer',
        backref='question',
        cascade='all, delete'
        )
