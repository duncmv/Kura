"""
base_model.py

This module contains the `BaseModel` class
which serves as the base class for other models in the application.

Classes:
- `BaseModel`: The `BaseModel` class is the base class for other models.
It includes common attributes and methods that will be inherited by all other models.
"""
from uuid import uuid4
from datetime import datetime, date
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class BaseModel:
    """
    BaseModel class

    Attributes:
    - `id`: A string that represents the unique identifier of the instance.
        It's a primary key in the database.
    - `created_at`: A datetime object that represents when the instance was created.
    - `updated_at`: A datetime object that represents when the instance was last updated.

    Methods:
    - `__init__(self, **kwargs)`: This method initializes a new instance of the model.
        It takes in keyword arguments and sets the attributes of the instance accordingly.
        If an attribute is not included in the keyword arguments, it's set to a default value.
    - `save(self)`: This method updates the `updated_at` attribute
        with the current datetime and saves the instance to the database.
    - `delete(self)`: This method deletes the current instance from the database
        and saves the changes.
    - `__str__(self)`: This method returns a string representation of the instance.
    """

    id = Column(String(60), nullable=False, primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow())
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow())

    def __init__(self, **kwargs):
        """Instantiates a new model"""
        if kwargs:
            for key, value in kwargs.items():
                if key == '__class__':
                    continue
                elif key == 'created_at':
                    self.created_at = datetime.fromisoformat(value)
                elif key == 'updated_at':
                    self.updated_at = datetime.fromisoformat(value)
                elif key == 'date_of_birth':
                    self.date_of_birth = date.fromisoformat(value)
                elif key == 'date_of_establishment':
                    self.date_of_birth = date.fromisoformat(value)
                else:
                    setattr(self, key, value)
            # if some main attributes are not included in kwargs
            if 'id' not in kwargs.keys():
                self.id = str(uuid4())
            if 'created_at' not in kwargs.keys():
                self.created_at = datetime.utcnow()
            if 'updated_at' not in kwargs.keys():
                self.updated_at = datetime.utcnow()
        else:
            self.id = str(uuid4())
            self.created_at = datetime.utcnow()
            self.updated_at = datetime.utcnow()

    def save(self):
        """Updates the attribute 'updated_at' with the current datetime and saves the instance"""
        self.updated_at = datetime.utcnow()
        from models import Storage
        Storage.new(self)
        Storage.save()

    def delete(self):
        """Deletes the current instance from Storage and saves the changes"""
        from models import Storage
        Storage.delete(self)
        Storage.save()

    def __str__(self):
        """Return string representation of the instance"""
        return "{}".format(self.to_dict())
