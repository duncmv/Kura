#!/usr/bin/python3
""" questions.py
This module contains the `Question` class which represents the `questions` table in the database.
Imports:
    - `Column`, `String`, `ForeignKey`, `orm` from `sqlalchemy`:
        These are used to define the columns in the `questions` table.
    - `BaseModel`, `Base` from `models.base_model`:
        `BaseModel` is the base class for all models
        and `Base` is the declarative base class from SQLAlchemy.
classes:
    - `Question`: This class represents the `questions` table in the database.
        It has the following attributes:
            - `text`: A string that represents the text of the question.
                It cannot be null.
            - `poll_id`: A string that represents the ID of the poll this question belongs to.
                It's a foreign key that references the `id` column in the `polls` table. It cannot be null.
            - `answers`: A list of `Answer` instances that belong to this question.
                This attribute is not represented as a column in the `questions` table.
                It's a relationship that is defined elsewhere in the code.
        - `to_dict`: This method returns a dictionary of the data for this question.
            The dictionary includes the class name, id, created_at, and updated_at attributes of the question.
"""

from datetime import datetime
from sqlalchemy import Column, String, ForeignKey, orm
from models.base_model import BaseModel, Base


class Question(BaseModel, Base):
    """ This class structures a questions table in the database
    Attributes:
        text: The text of the question
        poll_id: The ID of the poll this question belongs to
        answers: A list of answers that belong to this question
    """

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
