#!/usr/bin/python3
"""This module defines a class User"""

from sqlalchemy import Column, String, ForeignKey, Boolean, orm
from models.base_model import BaseModel, Base


class Poll(BaseModel, Base):
    """This class defines a user by various attributes"""

    __tablename__ = "polls"
    title = Column(String(128))
    description = Column(String(1024))
    institution_id = Column(
        String(60),
        ForeignKey('institutions.id'),
        nullable=False
        )
    district_id = Column(String(60), ForeignKey('districts.id'))
    ed_role = Column(String(128))
    endustry_of_interest = Column(String(128))
    occupation = Column(String(128))
    company_staff_only = Column(Boolean, default=False)

    questions = orm.relationship(
        'Question',
        backref='poll',
        cascade='all, delete'
        )
