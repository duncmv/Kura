#!/usr/bin/python3
"""
answers.py

This module contains the `Answer` class which represents the `answers` table
in the database.

Imports:
- `Column`, `String`, `ForeignKey`, `orm` from `sqlalchemy`: These are used
    to define the columns in the `answers` table.
- `BaseModel`, `Base` from `models.base_model`: `BaseModel` is the base class
    for all models and `Base` is the declarative base class from SQLAlchemy.

Classes:
- `Answer`: This class represents the `answers` table in the database. It has
    the following attributes:
    - `text`: A string that represents the actual answer. It cannot be null.
    - `question_id`: A string that represents the ID of the question this
        answer is associated with. It's a foreign key that references the `id`
        column in the `questions` table. It cannot be null.
    - `choices`: A list of `Choice` instances that have this answer's ID as
        `answer_id`. This attribute is not represented as a column in the
        `answers` table. It's a relationship that is defined elsewhere in the
        code.
"""

from datetime import datetime
from sqlalchemy import Column, String, ForeignKey, orm
from models.base_model import BaseModel, Base


class Answer(BaseModel, Base):
    """
    This class is a structure for the table answers with the following columns:
    Attributes :
        text: which is the actual answer
        question_id: the id of the question of this answer
        choices: a list of choices instances that have this answer's id as answer_id
    Methods:
        to_dict: returns a dictionary of local data for this answer
                to use it as a respond if requested
    """

    __tablename__ = "answers"
    text = Column(String(250), nullable=False)
    question_id = Column(
        String(60),
        ForeignKey('questions.id'),
        nullable=False
        )

    choices = orm.relationship(
        'Choice',
        backref='answer',
        cascade='all, delete',
        viewonly=False
        )

    def to_dict(self):
        """
        Returns a dictionary of the data for this answer
        to be used with the Flask jsonify method

        Returns:
            dict: A dictionary representation of the answer
        """
        return {
            '__class__': self.__class__.__name__,
            'id': self.id,
            'created_at': datetime.isoformat(self.created_at),
            'updated_at': datetime.isoformat(self.updated_at),
            'text': self.text,
            'question_id': self.question_id
        }

