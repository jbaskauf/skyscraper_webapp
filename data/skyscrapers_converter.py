#!/usr/bin/env python3
'''
    skyscrapers_converter.py
    Jessie Baskauf and Ellie Mamantov, 26 April 2018

    Converts the skyscraper dataset into skyscrapers, materials, cities,
    purposes, skyscrapers_materials, skyscrapers_cities, skyscrapers_purposes tables
    (in CSV from).
	
'''
import sys
import re
import csv

def load_from_raw_data_csv_file(csv_file_name):
    ''' Collect all the data from my skyscrapers_raw_data.csv file,
        assembling it into a list of skycrapers (dictionaries), a dictionary of materials,
        a dictionary of cities, and a dictionary of purposes,
        and 3 lists of ID links.
    '''
    csv_file = open(csv_file_name)
    reader = csv.reader(csv_file)

    materials = {}
    cities = {}
    purposes = {}
    #create purposes dictionary
    purposes['air_traffic_control_tower'] = 0
    purposes['bell_tower'] = 1
    purposes['bridge'] = 2
    purposes['casino'] = 3
    purposes['commerical'] = 4
    purposes['education'] = 5
    purposes['exhibition'] = 6
    purposes['government'] = 7
    purposes['hospital'] = 8
    purposes['hotel'] = 9
    purposes['industrial'] = 10
    purposes['library'] = 11
    purposes['museum'] = 12
    purposes['office'] = 13
    purposes['religious'] = 14
    purposes['residential'] = 15
    purposes['retail'] = 16
    purposes['serviced_apartments'] = 17
    purposes['telecommunications'] = 18
    #dictionary linking purposes id numbers to columns in the source file
    purposes_columns = {}
    purposes_columns[0] = 1
    purposes_columns[1] = 2
    purposes_columns[2] = 3
    purposes_columns[3] = 4
    purposes_columns[4] = 7
    purposes_columns[5] = 12
    purposes_columns[6] = 13
    purposes_columns[7] = 15
    purposes_columns[8] = 17
    purposes_columns[9] = 18
    purposes_columns[10] = 20
    purposes_columns[11] = 24
    purposes_columns[12] = 28
    purposes_columns[13] = 32
    purposes_columns[14] = 35
    purposes_columns[15] = 36
    purposes_columns[16] = 37
    purposes_columns[17] = 38
    purposes_columns[18] = 40
    skyscrapers = []
    skyscrapers_materials = []
    skyscrapers_cities = []
    skyscrapers_purposes = []
    for row in reader:
        assert len(row) == 41
        #create city tuples
        if row[5] in cities:
            city_id = cities[row[5]]
        else:
            city_id = len(cities)
            cities[row[5]] = city_id
		#create a skyscraper object for each row
        skyscraper_id = len(skyscrapers)
        skyscraper = {'id': skyscraper_id, 'name': row[29], 'height': row[16], 'started_year': row[39], 'completed_year': row[8], 'city_id': city_id, 'number_of_floors': row[14]}
        skyscrapers.append(skyscraper)
        #create material tuples
        if row[26] in materials:
            material_id = materials[row[26]]
        else:
            material_id = len(materials)
            materials[row[26]] = material_id
        #link skyscraper to material
        skyscrapers_materials.append({'skyscraper_id': skyscraper_id, 'material_id': material_id})
        #link skyscraper to city
        skyscrapers_cities.append({'skyscraper_id': skyscraper_id, 'city_id': city_id})
        #link skyscraper to purpose
        for i in range(19):
            col_number = purposes_columns[i]
            if row[col_number] == 'TRUE':
                purpose_id = i
                skyscrapers_purposes.append({'skyscraper_id': skyscraper_id, 'purpose_id': purpose_id})

    csv_file.close()
    return (skyscrapers, materials, cities, purposes, skyscrapers_materials,   skyscrapers_cities, skyscrapers_purposes)

def save_skyscrapers_table(skyscrapers, csv_file_name):
    ''' Save the skyscrapers in CSV form. '''
    output_file = open(csv_file_name, 'w')
    writer = csv.writer(output_file)
    for skyscraper in skyscrapers:
        skyscraper_row = [skyscraper['id'], skyscraper['name'], skyscraper['height'], skyscraper['started_year'], skyscraper['completed_year'], skyscraper['city_id'], skyscraper['number_of_floors']]
        writer.writerow(skyscraper_row)
    output_file.close()

def save_cities_table(cities, csv_file_name):
    ''' Save the materials in CSV form. '''
    output_file = open(csv_file_name, 'w')
    writer = csv.writer(output_file)
    for city in cities:
        name = city
        city_id = cities[city]
        city_row = [city_id, name]
        writer.writerow(city_row)
    output_file.close()
    
def save_materials_table(materials, csv_file_name):
    ''' Save the materials in CSV form. '''
    output_file = open(csv_file_name, 'w')
    writer = csv.writer(output_file)
    for material in materials:
        name = material
        material_id = materials[material]
        material_row = [material_id, name]
        writer.writerow(material_row)
    output_file.close()
    
def save_purposes_table(purposes, csv_file_name):
    ''' Save the purposes in CSV form. '''
    output_file = open(csv_file_name, 'w')
    writer = csv.writer(output_file)
    for purpose in purposes:
        name = purpose
        purpose_id = purposes[purpose]
        purpose_row = [purpose_id, name]
        writer.writerow(purpose_row)
    output_file.close()

def save_linking_table(skyscrapers_attributes, csv_file_name, attribute_id):
    ''' Save the linking table for a given attribute in CSV form, with each row containing
    (skyscraper id, atttribute id). '''
    output_file = open(csv_file_name, 'w')
    writer = csv.writer(output_file)
    for skyscraper_attribute in skyscrapers_attributes:
        skyscrapers_attributes_row=[skyscraper_attribute['skyscraper_id'], skyscraper_attribute[attribute_id]]
        writer.writerow(skyscrapers_attributes_row)
    output_file.close()

if __name__ == '__main__':
    skyscrapers, materials, cities, purposes, skyscrapers_materials, skyscrapers_cities,   skyscrapers_purposes = load_from_raw_data_csv_file('skyscrapers_raw_data.csv')

    save_skyscrapers_table(skyscrapers, 'skyscrapers.csv')
    save_cities_table(cities, 'cities.csv')
    save_materials_table(materials, 'materials.csv')
    save_purposes_table(purposes, 'purposes.csv')
    save_linking_table(skyscrapers_materials, 'skyscrapers_materials.csv', 'material_id')
    save_linking_table(skyscrapers_purposes, 'skyscrapers_purposes.csv', 'purpose_id')
    save_linking_table(skyscrapers_cities, 'skyscrapers_cities.csv', 'city_id')
