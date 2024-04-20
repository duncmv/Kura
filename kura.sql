-- create a new user kura_test 
CREATE ROLE kura_test WITH LOGIN PASSWORD 'test_choices_01';

-- grant kura_test privilages ( LOGIN - CREATEDB - CREATEROLE - SUPERUSER - REPLICATION - TEMP - CONNECT - USAGE -
-- SELECT, INSERT, UPDATE, DELETE - REFERENCES - EXECUTE - USAGE ON SCHEMA - ALL PRIVILEGES)

ALTER ROLE newuser CREATEDB;

GRANT SELECT ON my_table TO my_user;
GRANT SELECT, INSERT, UPDATE ON my_table TO my_user;

REVOKE INSERT ON my_table FROM my_user;

-- creating a database
CREATE DATABASE IF NOT EXISTS my_database;

-- switching to a database
CONNECT TO my_database;

-- create table
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    quantity INT DEFAULT 1,
    price NUMERIC(10, 2),
    CONSTRAINT positive_quantity CHECK (quantity > 0)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    is_active BOOLEAN
);

