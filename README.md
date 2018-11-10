# High Rise: Skyscraper Webapp
High Rise is a full-stack web application for accessing a database of information about the tallest skyscrapers in the United States. It is a class project from CS257 (taught by Jeff Ondich at Carleton College), completed collaboratively with Ellie Mamantov. It consists of a normalized PostgreSQL database, accessible by API calls, and a clear and interactive user interface with advanced search, ranking, and sorting capabilities.

## Features
A rich dataset of skyscraper information stored in a normalized PostgreSQL database. This dataset includes the height, construction year, location, purpose, and materials used to build a given skyscraper, as extracted from the original dataset found at https://think.cs.vt.edu/corgis/csv/skyscrapers/skyscrapers.html. CSV files corresponding to the database tables can be found in the `data` folder, as well as a .sql dump file for the database, the original raw data in CSV form, and Python code for converting this raw data into separate CSV files for each table.

An HTTP-based API allows JSON access to the dataset. A detailed description of the API endpoints can be found in `reference/APIservices.txt`, and the Flask app for the API can be found in `api.py`.

An interactive web interface for easy user browsing of data. The user can see a ranking of skyscrapers based on their height, number of floors, year construction was started or completed, or alphabetical order. They can view all available information about a specific skyscraper from the rankings page or any other page with listings of specific skyscrapers. They can also refine the ranking listing to show only skyscrapers in a certain city, built in a certain year, built of a specific material (e.g. steel), or used for a specific purpose (e.g. belltower). Users can browse the lists of cities, materials, and purposes, or search for a specific skyscraper.

The HTML layout files, stylesheets, and Javascript files for the webpages can be found in the `templates` and `static` folders.

(Unfortunately the server ports are no longer active for this project, but mockups showing rough visualizations of most of the features of the webapp are available in the `reference/mockups` folder.)


## Repo structure
```
├── README.md                 : Description of this repository
├── api.py                    : Flask app for the HTTP-based API with JSON access to skyscraper data
├── website.py                : Flask app linking API to website for user browsing of data
├── data                      : Raw data and postgreSQL table contents in CSV form, .sql dump file, and rawdata converter .py file
├── reference                 : Reference files from database, API, and UI design planning stages
│   ├── mockups               : Mockup drawings for primary webpages
│   ├── APIservices.txt       : Detailed descriptions of API endpoints, corresponding query responses, and usage examples
│   ├── createstatements.txt  : CREATE TABLE statements used to populate the PostgreSQL database tables
│   ├── improvements.txt      : Reflections on bugs and imperfections remaining at the end of the project, to be improved in the future
│   └── userstories.txt       : User stories describing possible use cases of the webapp
├── static                    : Static files (.css and .js)
├── templates                 : HTML layout files
└── .gitignore                : Files and directories to be ignored by git
```

## Usage

Access the webapp at:
http://perlman.mathcs.carleton.edu:5203/ (port no longer active)
Access the API at:
http://perlman.mathcs.carleton.edu:5103/ (port no longer active)

### Contributors
Jessie Baskauf

Ellie Mamantov

Some basic code stubs provided by Jeff Ondich

Original data from the following webpage:
https://think.cs.vt.edu/corgis/csv/skyscrapers/skyscrapers.html
