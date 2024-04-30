#!/usr/bin/env python
"""
This script populates the database with the basic data which are the following:
    countries,
    regions,
    districts,
    legal entities,
    industries,
    and sexes.

Before you run this script make sure to drop the database, kura_db by running "DROP DATABASE kura_db;" in the psql shell.
Also, you make sure that districts.json, and populate.json are in the same directory as this script.

"""

import json
from models import Storage
from models.countries import Country
from models.regions import Region
from models.legal_entity import LegalEntity
from models.industries import Industry
from models.districts import District

Storage.all()

populate = json.loads(open('populate.json').read())
uganda = Country(name=populate['countries'][0])
Storage.new(uganda)
Storage.save()

uganda_id = uganda.id

for region in populate['regions']:
    Storage.new(Region(name=region))

Storage.save()

for entity in populate['entities']:
    Storage.new(LegalEntity(name=entity['name'], description=entity['description']))

Storage.save()

for industry in populate['industries']:
    Storage.new(Industry(name=industry))

Storage.save()

all_regions = Storage.all(Region)

regions = {region.name: region.id for region in all_regions}

districts = json.load(open('districts.json', 'r'))
district_region = {district['name']: district['region'] for district in districts}

for district in populate['districts']:
    Storage.new(
        District(
            name=district,
            country_id=uganda_id,
            region_id=regions[district_region[district]]
            )
        )
Storage.save()