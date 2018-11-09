# High Rise: Skyscraper Webapp
High Rise is a full-stack web application linked to a database of skyscrapers and their information. It consists of a 

## Features

## Repo structure
```
├── README.md                 : Description of this repository
├── api.py                    : Flask app for the HTTP-based API with JSON access to skyscraper data
├── website.py                : Flask app linking API to website for user browsing of data
├── data                      : Raw data and postgreSQL table contents in CSV form, .sql dump file, and rawdata converter .py file
├── reference                 : Reference files from database, API, and UI design planning stages
│   ├── mockups               : Mockup drawings for primary webpages
│   ├── APIservices.txt       : Detailed descriptions of API endpoints, corresponding query responses, and usage examples
│   ├── createstatements.txt  : CREATE TABLE statements used to populate the postgreSQL database tables
│   └── userstories.txt       : User stories describing possible use cases of the webapp
├── static                    : Static files (.css and .js)
├── templates                 : HTML layout files
└── .gitignore                : Files and directories to be ignored by git
```

## Usage

### Contributors
Jessie Baskauf

Ellie Mamantov

Some basic code stubs provided by Jeff Ondich

Dataset from the following webpage:
https://think.cs.vt.edu/corgis/csv/skyscrapers/skyscrapers.html
