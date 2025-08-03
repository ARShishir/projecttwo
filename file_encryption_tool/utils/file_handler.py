import os

def read_file(file_path):
    if not os.path.exists(file_path):
        print("File not found!")
        return None
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def write_file(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(data)
    print(f"Data saved to {file_path}")
