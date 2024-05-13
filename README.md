# [KURA](https://kura-mxoi.onrender.com/)
#### Choices with *IMPACT!*


## Description

[KURA](https://kura-mxoi.onrender.com/) is a polling service that helps the institutions and companies to include their employees or others in their decision-making process.

An institution-type user can create polls and get statistical information about votes on their own polls.

A normal user can vote on polls and get some information (what the institution allows) about polls he/she votes on.

## Table of Contents
- [KURA](#kura)
			- [Choices with *IMPACT!*](#choices-with-impact)
	- [Description](#description)
	- [Table of Contents](#table-of-contents)
	- [Installation](#installation)
	- [Usage](#usage)
	- [Contributing](#contributing)
	- [License](#license)


## Technologies
[![Python](https://img.shields.io/badge/Python-3.10.12-blue.svg)](https://www.python.org/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0.27-8c564b.svg)](https://www.sqlalchemy.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.11-336791.svg)](https://www.postgresql.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0.2-1383BE.svg)](https://flask.palletsprojects.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.2-black.svg)](https://nextjs.org/)

## Installation

1. **Setup dependencies**: run the bash script `setup.sh`, it should install all the required technologies required for the project.
```bash
chmod u+x setup.sh; ./setup.sh
```
2. **setup the database** :
	- run postgresql in interactive mode.
	```bash
	psql -u postgres postgres
	```
	- Create the database, the user and give the user privilages for the project.
	```postgresql
	CREATE DATABASE kura_db;
	CREATE ROLE kura_user WITH LOGIN PASSWORD 'test_choices_01';
	GRANT ALL ON DATABASE kura_db TO kura_user;
	\q
	```
	- got to frontend directory.
	```bash
	cd frontend
	```
	- start the application.
	```bash
	npm run dev
	```

## Usage

Guidelines on how to use your project, including examples and screenshots if applicable.




## Contributing

Information on how others can contribute to your project, including guidelines and code of conduct.

## License
Specify the license under which your project is distributed.
