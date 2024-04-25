#!/usr/bin/python3
import boto3
import re
from collections import defaultdict
from datetime import datetime


def get_kv_map(file_name):
    with open(file_name, 'rb') as file:
        img_test = file.read()
    bytes_test = bytearray(img_test)

    # process using image bytes
    session = boto3.Session(profile_name='duncmv')
    client = session.client('textract', region_name='us-east-1')
    response = client.analyze_document(Document={'Bytes': bytes_test}, FeatureTypes=['FORMS'])

    # Get the text blocks
    blocks = response['Blocks']

    # get key and value maps
    key_map = {}
    value_map = {}
    block_map = {}
    for block in blocks:
        block_id = block['Id']
        block_map[block_id] = block
        if block['BlockType'] == "KEY_VALUE_SET":
            if 'KEY' in block['EntityTypes']:
                key_map[block_id] = block
            else:
                value_map[block_id] = block

    return key_map, value_map, block_map


def get_kv_relationship(key_map, value_map, block_map):
    kvs = {}
    for block_id, key_block in key_map.items():
        value_block = find_value_block(key_block, value_map)
        key = get_text(key_block, block_map)
        val = get_text(value_block, block_map)
        key = key.strip().replace(' ', '_').lower()
        val = val.strip()
        kvs[key] = val
    return kvs


def find_value_block(key_block, value_map):
    for relationship in key_block['Relationships']:
        if relationship['Type'] == 'VALUE':
            for value_id in relationship['Ids']:
                value_block = value_map[value_id]
    return value_block


def get_text(result, blocks_map):
    text = ''
    if 'Relationships' in result:
        for relationship in result['Relationships']:
            if relationship['Type'] == 'CHILD':
                for child_id in relationship['Ids']:
                    word = blocks_map[child_id]
                    if word['BlockType'] == 'WORD':
                        text += word['Text'] + ' '
                    if word['BlockType'] == 'SELECTION_ELEMENT':
                        if word['SelectionStatus'] == 'SELECTED':
                            text += 'X '

    return text


def print_kvs(kvs):
    for key, value in kvs.items():
        print(key, ":", value)


def search_value(kvs, search_key):
    for key, value in kvs.items():
        if re.search(search_key, key, re.IGNORECASE):
            return value


def extract(file_name):
    key_map, value_map, block_map = get_kv_map(file_name)

    # Get Key Value relationship
    kvs = get_kv_relationship(key_map, value_map, block_map)
    kvs['last_name'] = kvs.pop('surname')
    kvs['id_card_number'] = kvs.pop('nin')
    names = list(kvs.pop('given_name').split(' '))
    kvs['first_name'] = names[0]
    if len(names) > 1:
        kvs['middle_name'] = names[1]
    old_date = datetime.strptime(kvs.pop('date_of_birth'), "%d.%m.%Y")
    kvs['date_of_birth'] = old_date.strftime("%Y-%m-%d")
    kvs.pop('date_of_expiry')
    kvs.pop('card_no.')
    kvs.pop('sex')
    kvs.pop('nationality')
    kvs.pop('holders_signature')
    return kvs
