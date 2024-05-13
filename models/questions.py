#!/usr/bin/python3
"""This module defines a class User"""

from sqlalchemy import Column, String, ForeignKey, orm
from models.base_model import BaseModel, Base
from datetime import datetime


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

    def to_dict(self):
        """ Returns a dictionary of the data for this question
        to be used with the Flask jsonify method
        Returns:
            dict: A dictionary representation of the question
        """
        return {
            '__class__': self.__class__.__name__,
            'id': self.id,
            'created_at': datetime.isoformat(self.created_at),
            'updated_at': datetime.isoformat(self.updated_at),
            'text': self.text,
            'poll_id': self.poll_id,
            'answers': [answer.to_dict() for answer in self.answers]
        }