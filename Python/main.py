import sys
from pymongo import MongoClient
from email_service import send_welcome_email
from user_data_export import export_to_csv, export_to_excel
from database import fetch_user_data, get_mongo_client

def main():
    if len(sys.argv) < 2:
        print("Usage: python main.py <operation> [arguments]")
        return

    operation = sys.argv[1]

    if operation == 'send_email':
        if len(sys.argv) < 4:
            print("Usage: python main.py send_email <to_email> <user_name>")
            return
        to_email = sys.argv[2]
        user_name = sys.argv[3]
        send_welcome_email(to_email, user_name)

    elif operation == 'export_csv':
        if len(sys.argv) < 6:
            print("Usage: python main.py export_csv <connection_string> <db_name> <collection_name> <output_file>")
            return
        connection_string = sys.argv[2]
        db_name = sys.argv[3]
        collection_name = sys.argv[4]
        output_file = sys.argv[5]

        client = get_mongo_client(connection_string)
        user_data = fetch_user_data(client, db_name, collection_name)
        export_to_csv(user_data, output_file)

    elif operation == 'export_excel':
        if len(sys.argv) < 6:
            print("Usage: python main.py export_excel <connection_string> <db_name> <collection_name> <output_file>")
            return
        connection_string = sys.argv[2]
        db_name = sys.argv[3]
        collection_name = sys.argv[4]
        output_file = sys.argv[5]

        client = get_mongo_client(connection_string)
        user_data = fetch_user_data(client, db_name, collection_name)
        export_to_excel(user_data, output_file)

    else:
        print("Invalid operation. Supported operations: send_email, export_csv, export_excel")

if __name__ == '__main__':
    main()
