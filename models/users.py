#!/usr/bin/python3
""" users.py
    This module contains the `User` class which represents the `users` table in the database.
    Imports:
        - `Column`, `String`, `DATE`, `FLOAT`, `ForeignKey`, `orm`, `BOOLEAN` from `sqlalchemy`:
            These are used to define the columns in the `users` table.
        - `BaseModel`, `Base` from `models.base_model`:
            `BaseModel` is the base class for all models
            and `Base` is the declarative base class from SQLAlchemy.
    Classes:
        - `User`: This class represents the `users` table in the database.
            It has the following attributes:
                - `email`: A string that represents the email of the user.
                    It cannot be null and must be unique.
                - `password`: A string that represents the password of the user.
                    It cannot be null.
                - `username`: A string that represents the username of the user.
                    It must be unique.
                - `first_name`: A string that represents the first name of the user.
                - `middle_name`: A string that represents the middle name of the user.
                - `last_name`: A string that represents the last name of the user.
                - `sex`: the sex of the user.
                - `id_card_number`: A string that represents the ID card number of the user.
                - `date_of_birth`: A date that represents the date of birth of the user.
                - `district_id`: A string that represents the district ID of the user.
                - `mobile_number`: A string that represents the mobile number of the user.
                - `occupation`: A string that represents the occupation of the user.
                - `ed_speciality`: A string that represents the educational speciality of the user.
                - `job_role`: A string that represents the job role of the user.
                - `company_id`: A string that represents the company ID of the user.
                - `jop_description`: A string that represents the job description of the user.
                - `salary`: A float that represents the salary of the user.
                - `hobbies`: A string that represents the hobbies of the user.
                - `pic`: A string that represents the profile picture of the user.
                - `verified`: A boolean that represents whether the user is verified.
                - `choices`: A list of `Choice` instances that belong to this user.
                    This attribute is not represented as a column in the `users` table.
                    It's a relationship that is defined elsewhere in the code.
                - `taged_polls`: A list of `Poll` instances that are tagged by this user.
                    This attribute is not represented as a column in the `users` table.
                    It's a relationship that is defined elsewhere in the code.
        - `to_dict`: This method returns a dictionary of the data for this user.
            The dictionary includes the class name, id, created_at, and updated_at attributes of the user.
"""

from sqlalchemy import Column, String, DATE, FLOAT, ForeignKey, orm, BOOLEAN, Enum
from models.base_model import BaseModel, Base
from datetime import datetime, date


class User(BaseModel, Base):
    """ This class structures a users table in the database
    Attributes:
        email: The email of the user
        password: The password of the user
        username: The username of the user
        first_name: The first name of the user
        middle_name: The middle name of the user
        last_name: The last name of the user
        sex_id: The sex ID of the user
        id_card_number: The ID card number of the user
        date_of_birth: The date of birth of the user
        district_id: The district ID of the user
        mobile_number: The mobile number of the user
        occupation: The occupation of the user
        ed_speciality: The educational speciality of the user
        job_role: The job role of the user
        company_id: The company ID of the user
        jop_description: The job description of the user
        salary: The salary of the user
        hobbies: The hobbies of the user
        pic: The profile picture of the user
        verified: A boolean that represents whether the user is verified
        choices: A list of choices that belong to this user
        taged_polls: A list of polls that are tagged by this user
    """

    __tablename__ = "users"

    email = Column(String(128), nullable=False, unique=True)
    password = Column(String(128), nullable=False)
    username = Column(String(128), unique=True)
    first_name = Column(String(128))
    middle_name = Column(String(128))
    last_name = Column(String(128))
    
    sex = Column(Enum('Male', 'Female', 'Other', name='sex_type'))

    id_card_number = Column(String(64), nullable=True, unique=True)

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

    choices = orm.relationship('Choice', backref='user', cascade='all,delete',viewonly=False)
    taged_polls = orm.relationship('Poll', secondary='tags',cascade='all, delete', viewonly=False)

    def to_dict(self):
        """ Returns a dictionary of the data for this user
        to be used with the Flask jsonify method
        Returns:
            dict: A dictionary representation of the user
        """
        return {
            '__class__': self.__class__.__name__,
            'id': self.id,
            'created_at': datetime.isoformat(self.created_at),
            'updated_at': datetime.isoformat(self.updated_at),
            'email': self.email,
            'username': self.username,
            'first_name': self.first_name,
            'middle_name': self.middle_name,
            'last_name': self.last_name,
            'sex': self.sex,
            'id_card_number': self.id_card_number,
            'date_of_birth': date.isoformat(self.date_of_birth) if self.date_of_birth else None,
            'district_id': self.district_id,
            'mobile_number': self.mobile_number,
            'occupation': self.occupation,
            'ed_speciality': self.ed_speciality,
            'job_role': self.job_role,
            'company_id': self.company_id,
            'jop_description': self.jop_description,
            'salary': self.salary,
            'hobbies': self.hobbies,
            'pic': self.pic,
            'verified': self.verified
        }
