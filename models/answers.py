#!/usr/bin/python3
"""This module defines a class User"""

from sqlalchemy import Column, String, ForeignKey, orm
from models.base_model import BaseModel, Base
from models.users import User


class Answer(BaseModel, Base):
    """This class defines a user by various attributes"""

    __tablename__ = "answers"
    text = Column(String(250), nullable=False)
    question_id = Column(
        String(60),
        ForeignKey('questions.id'),
        nullable=False
        )

    users = orm.relationship('User', secondary='choices', viewonly=False)
