#!/usr/bin/python3
""" tags.py
    This module contains the `Tag` class which represents the `tags` table in the database.
    Imports:
        - `Column`, `String`, `ForeignKey` from `sqlalchemy`:
            These are used to define the columns in the `tags` table.
        - `Base` from `models.base_model`:
            `Base` is the declarative base class from SQLAlchemy.
    Classes:
        - `Tag`: This class represents the `tags` table in the database.
            It has the following attributes:
                - `user_id`: The ID of the user that created the tag.
                - `poll_id`: The ID of the poll that the tag is associated with.
"""

from models.base_model import Base
from sqlalchemy import Column, String, ForeignKey, Index, UniqueConstraint


class Tag(Base):
    """ This class structures a tags table in the database
    Attributes:
        user_id: The ID of the user that created the tag
        poll_id: The ID of the poll that the tag is associated with
    """

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

    def to_dict(self):
        """ This method returns a dictionary representation of this tag
        Returns:
            A dictionary representation of this tag
        """
        return {
            'user_id': self.user_id,
            'poll_id': self.poll_id
        }
