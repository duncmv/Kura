#!/usr/bin/python3
"""This module creates a new engine for the project"""

from sqlalchemy import create_engine, orm


class PDBStorage:
    """ This class is a second engine for the project """
    __engine = None
    __session = None

    def __init__(self):
        """create the engine"""
        user = 'kura_user'
        pswd = 'test_choices_01'
        host = 'localhost'
        db = 'kura_db'
        self.__engine = create_engine('postgresql://{}:{}@{}:5432/{}'.format(
            user, pswd, host, db), pool_pre_ping=True)

    def all(self, cls=None):
        """query on the current database session
all objects depending of the class name cls"""

        from models.answers import Answer
        from models.base_model import BaseModel
        from models.countries import Country
        from models.districts import District
        from models.institutions import Institution
        from models.legal_entity import LegalEntity
        from models.polls import Poll
        from models.questions import Question
        from models.users import User

        classes = [Answer,
                   BaseModel,
                   Country,
                   District,
                   Institution,
                   LegalEntity,
                   Poll, Question,
                   User
                   ]

        all_obj_dict = []
        if not cls:
            for _cls in classes:
                all_obj_dict.extend(self.__session.query(_cls).all())  # type: ignore
        else:
            all_obj_dict = self.__session.query(cls).all()  # type: ignore
        return all_obj_dict

    def new(self, obj):
        """add the obj to the current db session"""

        self.__session.add(obj)  # type: ignore

    def save(self):
        """commit all changes of the current db session"""

        self.__session.commit()  # type: ignore

    def delete(self, obj=None):
        """deletes the obj from the current db session"""

        if obj:
            self.__session.delete(obj)  # type: ignore

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

        Base.metadata.create_all(self.__engine)
        Session_factory = orm.sessionmaker(bind=self.__engine,
                                           expire_on_commit=False)
        thread_safe_session = orm.scoped_session(Session_factory)
        self.__session = thread_safe_session()

    def close(self):
        """closes the current session"""
        self.__session.close()  # type: ignore

    def get(self, cls, id):
        """get an object by class and id"""
        return self.__session.query(cls).get(id)  # type: ignore

    def count(self, cls):
        """count the number of records in a table"""

        return self.__session.query(cls).count()  # type: ignore
