#!/usr/bin/python3
"""
This module structures the table 'choices'
"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, orm


class Choice(BaseModel, Base):
    " choices table that holds the answer of each user "

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

    user = orm.relationship('User', back_populates='choices', viewonly=False)
    answer = orm.relationship('Answer', back_populates='choices', viewonly=False)
