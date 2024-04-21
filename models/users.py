#!/usr/bin/python3
"""This module defines a class User"""

from sqlalchemy import Column, String, DATE, FLOAT, ForeignKey, orm, BOOLEAN
from models.base_model import BaseModel, Base
from models.choices import Choice
from models.polls import Poll
from models.tags import Tag
from models.choices import Choice


class User(BaseModel, Base):
    """This class defines a user by various attributes"""

    __tablename__ = "users"

    email = Column(String(128), nullable=False, unique=True)
    password = Column(String(128), nullable=False)

    first_name = Column(String(128))
    middle_name = Column(String(128))
    last_name = Column(String(128))

    id_card_number = Column(String(64), nullable=False, unique=True)

    date_of_birth = Column(DATE)

    district_id = Column(
        String(60),
        ForeignKey('districts.id'),
        nullable=False
        )

    mobile_number = Column(String(14))

    occupation = Column(String(128))
    ed_speciality = Column(String(128))

    job_role = Column(String(128))
    company_id = Column(String(60), ForeignKey('institutions.id'))
    jop_description = Column(String(2048))
    salary = Column(FLOAT)

    hobbies = Column(String(2048))

    pic = Column(String(128))

    verified = Column(BOOLEAN, default=False)

    choices = orm.relationship('Choice', back_populates='user', viewonly=False)
    taged_polls = orm.relationship('Poll', secondary='tags', viewonly=False)
