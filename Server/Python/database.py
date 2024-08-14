from pymongo import MongoClient

def get_mongo_client(connection_string):
    return MongoClient(connection_string)

def fetch_user_data(client, database_name, collection_name):
    db = client[database_name]
    collection = db[collection_name]
    return list(collection.find({}, {'_id': 0, 'firstName': 1, 'lastName': 1, 'email': 1, 'role': 1}))
