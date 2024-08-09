import csv
import pandas as pd


def export_to_csv(user_data, file_path):
    if not user_data:
        print("No data to export.")
        return
    keys = user_data[0].keys()
    with open(file_path, 'w', newline='') as output_file:
        dict_writer = csv.DictWriter(output_file, fieldnames=keys)
        dict_writer.writeheader()
        dict_writer.writerows(user_data)
    print(f"User data successfully exported to {file_path}")


def export_to_excel(user_data, file_path):
    if not user_data:
        print("No data to export.")
        return
    df = pd.DataFrame(user_data)
    df.to_excel(file_path, index=False)
    print(f"User data successfully exported to {file_path}")
