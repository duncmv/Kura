#!/usr/bin/python3
"""
choices.py

This module contains the `Choice` class
which represents the `choices` table in the database.

Imports:
- `Column`, `String`, `ForeignKey`, `orm` from `sqlalchemy`:
    These are used to define the columns in the `choices` table.
- `BaseModel`, `Base` from `models.base_model`:
    `BaseModel` is the base class for all models
    and `Base` is the declarative base class from SQLAlchemy.

Classes:
- `Choice`: This class represents the `choices` table in the database.
    It has the following attributes:
        - `user_id`: A string that represents the ID of the user
            who made this choice. It's a foreign key that references
            the `id` column in the `users` table. It cannot be null
            and is a primary key in the `choices` table.
        - `answer_id`: A string that represents the ID of the answer
            that was chosen. It's a foreign key that references
            the `id` column in the `answers` table.
            It cannot be null and is a primary key in the `choices` table.
        - `user`: This attribute is not represented as a column
            in the `choices` table
            but it is an instance of the user who made the choice.
        - `answer`: This attribute is not represented as a column
            in the `choices` table
            but it is an instance of the answer that was chosen.
"""

from datetime import datetime
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, orm, UniqueConstraint, Index


class Choice(BaseModel, Base):
    """
    This class is a structure for the table choices with the following columns:
    Attributes :
        user_id: the id of the user who made this choice
        answer_id: the id of the answer that was chosen
        user: an instance of the user that made the choice
        answer: an instance of the answer that was chosen
    """

    __tablename__ = "choices"
    user_id = Column(
        String(60),
        ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'),
        primary_key=True
        )
    answer_id = Column(
        String(60),
        ForeignKey('answers.id', onupdate='CASCADE', ondelete='CASCADE'),
        primary_key=True
        )

    def to_dict(self):
        """
        This method returns a dictionary representation of this choice
        Returns:
            A dictionary representation of this choice
        """
        return {
            'id': self.id,
            'created_at': datetime.isoformat(self.created_at),
            'updated_at': datetime.isoformat(self.updated_at),
            'user_id': self.user_id,
            'answer_id': self.answer_id
        }
