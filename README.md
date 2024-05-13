
<h1 align='center'><a href='https://kura-mxoi.onrender.com/'>KURA</a></h1>

#### Choices with *IMPACT!*
<div align='center'>
	<a href='https://github.com/ibrahimmorad/'>![Ibrahim Morad](https://img.shields.io/badge/My%20Account-ibrahimmorad-24314d.svg)</a>
</div>
## [Description](#table-of-contents)

[KURA](https://kura-mxoi.onrender.com/) is a polling service that helps the institutions and companies to include their employees or others in their decision-making process.

An institution-type user can create polls and get statistical information about votes on their own polls.

A normal user can vote on polls and get some information (what the institution allows) about polls he/she votes on.

## Table of Contents
- [KURA](#)
			- [Choices with *IMPACT!*](#choices-with-impact)
	- [Description](#description)
	- [Table of Contents](#table-of-contents)
	- [Technologies](#technologies)
	- [Installation](#installation)
	- [Usage](#usage)
    	- [go to home page](#go-to-home-page)
    	- [Register](#register)
    	- [choose account type](#choose-account-type)
    	- [institution](#an-institution-user)
    	- [individual](#an-individual-user)
	- [Contributing](#contributing)
	- [License](#license)


## [Technologies](#table-of-contents)
[![Python](https://img.shields.io/badge/Python-3.10.12-blue.svg)](https://www.python.org/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0.27-8c564b.svg)](https://www.sqlalchemy.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.11-336791.svg)](https://www.postgresql.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0.2-1383BE.svg)](https://flask.palletsprojects.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.2-black.svg)](https://nextjs.org/)
[![Forks](https://img.shields.io/github/forks/duncmv/Kura?style=social)](https://github.com/duncmv/Kura/network/members)
[![Stars](https://img.shields.io/github/stars/duncmv/Kura?style=social)](https://github.com/duncmv/Kura/stargazers)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![GitHub watchers](https://img.shields.io/github/watchers/duncmv/kura)
[![Contributors](https://img.shields.io/github/contributors/duncmv/Kura?style=social)](https://github.com/duncmv/Kura/graphs/contributors)

## [Installation](#table-of-contents)

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
	```sql
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

## [Usage](#table-of-contents)

#### Go to home page
A user can go to the home page, which works as the landing page too, using the following url: [https://kura-mxoi.onrender.com/](https://kura-mxoi.onrender.com/).

#### Register
From there, a user can click join or sign up to register or sign in to (you know).

For a first visit, of course, a user needs to register, so click on join.

This redirects the user to the [registration page](https://kura-mxoi.onrender.com/register).

#### Choose account type
There are two types of accounts, [institution](#an-institution-user) and [individual](#an-individual-user).
Follow the registration steps by filling the required fields and submit. This redirects you to your home page.
There you can create polls if you are an [institution](#an-institution-user) or vote on polls if you are an [individual](#an-individual-user).

### An institution user
- 

### An individual user
- 

## [Contributing](#table-of-contents)
1. Fork the project.
2. Clone the repository.
3. Make the changes you see.
4. commit the changes you made.
5. Make a pull request and wait for you request to be accepted or commented on.

## [License](#table-of-contents)
Specify the license under which your project is distributed.
