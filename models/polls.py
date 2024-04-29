#!/usr/bin/python3
""" polls.py
This module contains the `Poll` class which represents the `polls` table in the database.
Imports:
- `Column`, `String`, `ForeignKey`, `Boolean`, `orm` from `sqlalchemy`: These are used to define the columns in the `polls` table.
- `BaseModel`, `Base` from `models.base_model`: `BaseModel` is the base class for all models and `Base` is the declarative base class from SQLAlchemy.
classes:
- `Poll`: This class represents the `polls` table in the database.
    It has the following attributes:
        - `title`: A string that represents the title of the poll. It cannot be null.
        - `description`: A string that represents the description of the poll.
        - `institution_id`: A string that represents the ID of the institution this poll belongs to. It's a foreign key that references the `id` column in the `institutions` table. It cannot be null.
        - `district_id`: A string that represents the ID of the district this poll belongs to. It's a foreign key that references the `id` column in the `districts` table.
        - `ed_role`: A string that represents the educational role of the poll.
        - `industry_of_interest`: A string that represents the industry of interest of the poll.
        - `occupation`: A string that represents the occupation of the poll.
        - `company_staff_only`: A boolean that represents whether the poll is for company staff only.
        - `questions`: A list of `Question` instances that belong to this poll. This attribute is not represented as a column in the `polls` table. It's a relationship that is defined elsewhere in the code.
    - `to_dict`: This method returns a dictionary of the data for this poll. The dictionary includes the class name, id, created_at, and updated_at attributes of the poll.
"""

from sqlalchemy import Column, String, ForeignKey, Boolean, orm
from models.base_model import BaseModel, Base


class Poll(BaseModel, Base):
    """ This class structures a polls table in the database
    Attributes:
        title: The title of the poll
        description: The description of the poll
        institution_id: The ID of the institution this poll belongs to
        district_id: The ID of the district this poll belongs to
        ed_role: The educational role of the poll
        industry_of_interest: The industry of interest of the poll
        occupation: The occupation of the poll
        company_staff_only: A boolean that represents whether the poll is for company staff only
        questions: A list of questions that belong to this poll
    """

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
    industry_of_interest = Column(String(128))
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
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'institution': {
                'id': self.institution.id,
                'name': self.institution.name,
                'pic': self.institution.pic
                },
            'title': self.title,
            'description': self.description,
            'ed_role': self.ed_role,
            'industry_of_interest': self.industry_of_interest,
            'occupation': self.occupation,
            'company_staff_only': self.company_staff_only,
            'questions': [question.to_dict() for question in self.questions]
        }
