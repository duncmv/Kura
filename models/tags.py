#!/usr/bin/python3
"""
This module structures the table 'tags'
"""

from models.base_model import Base
from sqlalchemy import Column, String, ForeignKey


class Tag(Base):
    " tags table that holds the tagged polls by a user "

    __tablename__ = "tags"
    user_id = Column(
        String(60),
        ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'),
        primary_key=True
        )

    poll_id = Column(
        String(60),
        ForeignKey('polls.id', onupdate='CASCADE', ondelete='CASCADE'),
        primary_key=True
        )
