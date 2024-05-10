#!/usr/bin/python3
import uuid

# List of industry names
industries = ['Agriculture', 'Governance', 'Manufacturing', 'Education', 'Healthcare', 'Technology', 'Finance', 'Retail', 'Construction', 'Transportation']

# Open the dump.sql file in append mode
with open('dump.sql', 'a') as f:
    # For each industry in the list
    for industry in industries:
        # Generate a UUID for the industry
        id = uuid.uuid4()

        # Generate an SQL INSERT statement
        sql = f"INSERT INTO industries (id, name) VALUES ('{id}', '{industry}');\n"

        # Write the SQL statement to the dump.sql file
        f.write(sql)