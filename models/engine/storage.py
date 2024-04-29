#!/usr/bin/python3
""" storage.py
This module contains the `PDBStorage` class which is main engine for the project.
Imports:
    - `create_engine`, `orm` from `sqlalchemy`:
        These are used to create the engine and the session.
Classes:
    - `PDBStorage`: This class is the main engine for the project.
        It has the following attributes:
            - `__engine`: The engine used to connect to the database.
            - `__session`: The session used to interact with the database.
        It has the following methods:
            - `all`: This method queries the current database session
                for all objects depending on the class name `cls`.
            - `new`: This method adds the object `obj` to the current db session.
            - `save`: This method commits all changes of the current db session.
            - `delete`: This method deletes the object `obj` from the current db session.
            - `reload`: This method creates all tables in the database.
            - `close`: This method closes the current session.
            - `get`: This method gets an object by class and id.
            - `count`: This method counts the number of records in a table.
"""

from sqlalchemy import create_engine, orm


class PDBStorage:
    """ This class is the main engine for the project """
    __engine = None
    __session = None

    def __init__(self):
        """ Constructor for the PDBStorage class """
        user = 'kura_user'
        pswd = 'test_choices_01'
        host = 'localhost'
        db = 'kura_db'
        self.__engine = create_engine('postgresql://{}:{}@{}:5432/{}'.format(
            user, pswd, host, db), pool_pre_ping=True)

    def all(self, cls=None):
        """ query on the current db session all objects depending on the class name `cls` """

        from models.base_model import BaseModel
        from models.answers import Answer
        from models.countries import Country
        from models.districts import District
        from models.institutions import Institution
        from models.legal_entity import LegalEntity
        from models.polls import Poll
        from models.questions import Question
        from models.users import User
        from models.choices import Choice
        from models.tags import Tag
        from models.industries import Industry
        from models.regions import Region
        from models.sex import Sex

        classes = [
            Answer,
            Country,
            Choice,
            District,
            Institution,
            LegalEntity,
            Poll, Question,
            User, Choice, Tag,
            Industry,
            Region, Sex
            ]

        all_obj_dict = []
        if not cls:
            for _cls in classes:
                all_obj_dict.extend(self.__session.query(_cls).all())
        else:
            all_obj_dict = self.__session.query(cls).all()
        return all_obj_dict

    def new(self, obj):
        """add the obj to the current db session"""

        self.__session.add(obj)

    def save(self):
        """commit all changes of the current db session"""

        self.__session.commit()

    def delete(self, obj=None):
        """deletes the obj from the current db session"""

        if obj:
            self.__session.delete(obj)

    def reload(self):
        """create all tables in the database"""

        from models.answers import Answer
        from models.base_model import Base
        from models.base_model import BaseModel
        from models.countries import Country
        from models.districts import District
        from models.institutions import Institution
        from models.legal_entity import LegalEntity
        from models.polls import Poll
        from models.questions import Question
        from models.users import User
        from models.choices import Choice
        from models.industries import Industry
        from models.regions import Region
        from models.sex import Sex
        from models.tags import Tag

        Base.metadata.create_all(self.__engine)
        Session_factory = orm.sessionmaker(
            bind=self.__engine,
            expire_on_commit=False)
        thread_safe_session = orm.scoped_session(Session_factory)
        self.__session = thread_safe_session()

    def close(self):
        """closes the current session"""
        self.__session.close()

    def get(self, cls, id):
        """get an object by class and id"""
        return self.__session.query(cls).get(id)

    def count(self, cls):
        """count the number of records in a table"""

        return self.__session.query(cls).count()
