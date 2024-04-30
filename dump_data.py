#!/usr/bin/env python3
"""
This script populates dump data into the database which are the following:
    institutions,
    users.

Before you run this script make sure to drop the database, kura_db by running "DROP DATABASE kura_db;" in the psql shell.
then, run populate.py script.
Also, you make sure that districts.json, and populate.json are in the same directory as this script.
"""

import json
import random
from models import Storage
from models.answers import Answer
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
from models.tags import Tag


populate = json.load(open('populate.json', 'r'))

institutions = populate['institutions']
users = populate['users']
entities_id = [entity.id for entity in Storage.all(LegalEntity)]
industries_id = [industry.id for industry in Storage.all(Industry)]
districts_id = [district.id for district in Storage.all(District)]

for institution in institutions:
    Storage.new(
        Institution(
            **institution,
            legal_entity_id=entities_id[random.randint(0, 11)],
            industry_id=industries_id[random.randint(0, 18)],
            district_id=districts_id[random.randint(0, 127)]
        )
	)

Storage.save()

insts_id = [inst.id for inst in Storage.all(Institution)]
number_of_inst = len(insts_id) - 1
for user in users:
    Storage.new(
        User(
            **user,
            company_id=insts_id[random.randint(0, number_of_inst)],
            district_id=districts_id[random.randint(0, 127)],
            sex='Male'
        )
	)

Storage.save()