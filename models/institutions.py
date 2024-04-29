#!/usr/bin/python3
"""
institutions.py

This module contains the `Institution` class
which represents the `institutions` table in the database.

Imports:
- `Column`, `String`, `DATE`, `INTEGER`, `ForeignKey`, `orm` from `sqlalchemy`:
    These are used to define the columns in the `institutions` table.
- `BaseModel`, `Base` from `models.base_model`:
    `BaseModel` is the base class for all models
    and `Base` is the declarative base class from SQLAlchemy.

Classes:
- `Institution`: This class represents the `institutions` table in the database.
    It has the following attributes:
        - `email`: A string that represents the email of the institution.
            It cannot be null and must be unique.
        - `password`: A string that represents the password of the institution.
            It cannot be null.
        - `username`: A string that represents the username of the institution.
            It must be unique.
        - `name`: A string that represents the name of the institution.
            It cannot be null.
        - `registration_number`: A string that represents the registration number of the institution.
            It cannot be null and must be unique.
        - `date_of_establishment`: A date that represents the date of establishment of the institution.
        - `postal_code`: An integer that represents the postal code of the institution.
        - `phone_number`: A string that represents the phone number of the institution.
        - `parent_company`: A string that represents the parent company of the institution.
        - `website_url`: A string that represents the website URL of the institution.
        - `district_id`: A string that represents the district ID of the institution.
            It cannot be null.
        - `legal_entity_id`: A string that represents the legal entity ID of the institution.
            It cannot be null.
        - `industry_id`: A string that represents the industry ID of the institution.
            It cannot be null.
        - `users`: A list of `User` instances that belong to this institution.
            This attribute is not represented as a column in the `institutions` table.
            It's a relationship that is defined elsewhere in the code.
        - `polls`: A list of `Poll` instances that belong to this institution.
            This attribute is not represented as a column in the `institutions` table.
            It's a relationship that is defined elsewhere in the code.
        - `to_dict`: This method returns a dictionary of the data for this institution.
            The dictionary includes the class name,
            id, created_at, and updated_at attributes of the institution.
"""

from datetime import datetime, date
from sqlalchemy import Column, String, DATE, INTEGER, ForeignKey, orm
from models.base_model import BaseModel, Base


class Institution(BaseModel, Base):
    """
    This class structures an Institution table in the database

    Attributes:
        email: The email of the institution
        password: The password of the institution
        username: The username of the institution
        name: The name of the institution
        registration_number: The registration number of the institution
        date_of_establishment: The date of establishment of the institution
        postal_code: The postal code of the institution
        phone_number: The phone number of the institution
        parent_company: The parent company of the institution
        website_url: The website URL of the institution
        district_id: The district ID of the institution
        legal_entity_id: The legal entity ID of the institution
        industry_id: The industry ID of the institution
    """


    __tablename__ = "institutions"

    email = Column(String(128), nullable=False, unique=True)
    password = Column(String(128), nullable=False)
    username = Column(String(128), unique=True)

    name = Column(String(128), nullable=False)

    pic = Column(String(128))

    registration_number = Column(String(64), nullable=False, unique=True)
    date_of_establishment = Column(DATE)

    postal_code = Column(INTEGER)
    phone_number = Column(String(14))

    parent_company = Column(String(128))

    website_url = Column(String(128))

    district_id = Column(
        String(60),
        ForeignKey('districts.id'),
        nullable=False
        )

    legal_entity_id = Column(
        String(60),
        ForeignKey('legal_entities.id'),
        nullable=False
        )
    industry_id = Column(
        String(60),
        ForeignKey('industries.id'),
        nullable=False
        )
    users = orm.relationship('User', backref='company')

    polls = orm.relationship(
        'Poll',
        backref='institution',
        cascade='all, delete'
        )

    def to_dict(self):
        """
        Returns a dictionary of the data for this institution
        to be used with the Flask jsonify method

        Returns:
            dict: A dictionary representation of the institution
        """
        return {
            '__class__': self.__class__.__name__,
            'id': self.id,
            'created_at': datetime.isoformat(self.created_at),
            'updated_at': datetime.isoformat(self.updated_at),
            'email': self.email,
            'password': self.password,
            'username': self.username,
            'name': self.name,
            'pic': self.pic,
            'registration_number': self.registration_number,
            'date_of_establishment': date.isoformat(self.date_of_establishment) if self.date_of_establishment else None,
            'postal_code': self.postal_code,
            'phone_number': self.phone_number,
            'parent_company': self.parent_company,
            'website_url': self.website_url,
            'district_id': self.district_id,
            'legal_entity_id': self.legal_entity_id,
            'industry_id': self.industry_id
        }
