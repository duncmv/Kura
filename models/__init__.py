"""
__init__.py

This module initializes the `Storage` instance for the application.

Imports:
- `PDBStorage` from `models.engine.storage`: 
	This is the storage engine class that the application uses to interact with the database.

Variables:
- `Storage`: This is an instance of `PDBStorage`
	that the application uses to interact with the database.

Initialization:
When this module is imported, it creates an instance of `PDBStorage`
and assigns it to `Storage`. Then it calls the `reload` method on `Storage`
to load any existing data from the database.
"""

from models.engine.storage import PDBStorage

Storage = PDBStorage()
Storage.reload()