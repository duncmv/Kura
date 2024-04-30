#!/usr/bin/python3
"""This module defines a class User"""

from sqlalchemy import Column, String, ForeignKey, Boolean, orm
from models.base_model import BaseModel, Base
from datetime import datetime


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

    def to_dict(self):
        """ Returns a dictionary of the data for this poll
        to be used with the Flask jsonify method
        Returns:
            dict: A dictionary representation of the poll
        """
        return {
            '__class__': self.__class__.__name__,
            'id': self.id,
            'created_at': datetime.isoformat(self.created_at),
            'updated_at': datetime.isoformat(self.updated_at),
            'institution': {
                'id': self.institution.id,
                'name': self.institution.name,
                },
            'title': self.title,
            'description': self.description,
            'ed_role': self.ed_role,
            'industry_of_interest': self.industry_of_interest,
            'occupation': self.occupation,
            'company_staff_only': self.company_staff_only,
            'questions': [question.to_dict() for question in self.questions]
        }