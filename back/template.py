# template.py

import os
from pathlib import Path 

PROJECT_NAME = "app" #add your project name here

LIST_FILES = [
    "requirements.txt",
    "app/__init__.py",
    "app/main/__init__.py",
    "app/main/controller/__init__.py",
    "app/main/model/__init__.py",
    "app/main/service/__init__.py",
    "app/test/__init__.py",
   ]

for file_path in LIST_FILES:
    file_path = Path(file_path)
    file_dir, file_name = os.path.split(file_path)

    # first make dir
    if file_dir!="":
        os.makedirs(file_dir, exist_ok= True)
        print(f"Creating Directory: {file_dir} for file: {file_name}")
    
    if (not os.path.exists(file_path)) or (os.path.getsize(file_path)==0):
        with open(file_path, "w") as f:
            pass
            print(f"Creating an empty file: {file_path}")
    else:
        print(f"File already exists {file_path}")