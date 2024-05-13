from uuid import uuid4
from datetime import datetime
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class BaseModel:
    """A base class for all kura models"""

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
        """Updates the attribute 'updated_at' with the current datetime"""
        self.updated_at = datetime.utcnow()
        from models import Storage
        Storage.new(self)
        Storage.save()

    def delete(self):
        """Deletes the current instance from Storage"""
        from models import Storage
        Storage.delete(self)
        Storage.save()

    def to_dict(self):
        """Convert instance into dict format"""
        dictionary = {}
        dictionary.update(self.__dict__)
        if '_sa_instance_state' in dictionary.keys():
            dictionary.pop('_sa_instance_state')
        dictionary.update({'__class__':
                          (str(type(self)).split('.')[-1]).split('\'')[0]})
        dictionary['created_at'] = self.created_at.isoformat()
        dictionary['updated_at'] = self.updated_at.isoformat()
        return dictionary

    def __str__(self):
        """Return string representation of instance"""
        return "{}".format(self.to_dict())

    def update(self, **kwargs):
        """updates a model"""
        from models import Storage
        for key, value in kwargs.items():
            ignore = ['id', 'created_at', 'updated_at', 'class']
            if key in ignore:
                continue
            else:
                setattr(self, key, value)
        Storage.save()