#!/usr/bin/python3
import boto3
import os

def upload_to_s3(file_name, object_name=None):
    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = file_name
    #with open(file_name, 'rb') as file:
    #    img_test = file.read()
    #new_file = f"/tmp/{object_name}"
    #with open(new_file, "w") as file:
    #    file.write(img_test)
    # Upload the file
    s3_client = boto3.client('s3')
    response = s3_client.upload_file(file_name, "kuradev2", object_name)
    os.remove(file_name)

    # Get the object URL
    object_url = f"https://kuradev2.s3.amazonaws.com/{object_name}"

    return object_url
