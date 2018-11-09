#!/usr/bin/env python3
'''
	api.py
	Jessie Baskauf and Ellie Mamantov, 4 May 2018
	Flask app for skyscraper database.
'''
import sys
import flask
import json
import psycopg2
import config

app = flask.Flask(__name__)

def get_connection():
    '''
    Returns a connection to the database described
    in the config module. Returns None if the
    connection attempt fails.
    '''
    connection = None
    try:
        connection = psycopg2.connect(database=config.database,
                                      user=config.user,
                                      password=config.password)
    except Exception as e:
        print(e, file=sys.stderr)
    return connection

def get_select_query_results(connection, query, parameters=None):
    '''
    Executes the specified query with the specified tuple of
    parameters. Returns a cursor for the query results.
    Raises an exception if the query fails for any reason.
    '''
    cursor = connection.cursor()
    if parameters is not None:
        cursor.execute(query, parameters)
    else:
        cursor.execute(query)
    return cursor

@app.route('/')
def hello():
	return 'Hello, lover of skyscrapers.'

@app.after_request
def set_headers(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

@app.route('/skyscraper/<skyscraper_id>')
def get_skyscraper(skyscraper_id):
    ''' Returns the skyscraper corresponding to skyscraper_id, or an empty dictionary if there's no match. '''
    query = '''SELECT skyscrapers.id, skyscrapers.name, skyscrapers.height, skyscrapers.started_year, skyscrapers.completed_year, cities.name, skyscrapers.number_of_floors, materials.name
				FROM skyscrapers, materials, skyscrapers_materials, cities, skyscrapers_cities
				WHERE skyscrapers.id = %s
				AND skyscrapers.id = skyscrapers_materials.skyscraper_id
				AND materials.id = skyscrapers_materials.material_id
                                AND skyscrapers.id = skyscrapers_cities.skyscraper_id
                                AND cities.id = skyscrapers_cities.city_id'''
    purposes = []
    purposes_query = '''SELECT purposes.name
					FROM skyscrapers_purposes, purposes
					WHERE skyscrapers_purposes.skyscraper_id = %s
					AND purposes.id = skyscrapers_purposes.purpose_id'''

    connection = get_connection()
    skyscraper={}
    if connection is not None:
        try:
            for row in get_select_query_results(connection, purposes_query, (skyscraper_id,)):
                purposes.append(row[0])
            for row in get_select_query_results(connection, query, (skyscraper_id,)):
                skyscraper = {'id':row[0], 'name':row[1], 'height':row[2], 'started_year':row[3], 'completed_year':row[4], 'city':row[5], 'number_of_floors':row[6], 'material':row[7], 'purposes':purposes}
                
        except Exception as e:
            print(e, file=sys.stderr)
        connection.close()
	
    return json.dumps(skyscraper)

@app.route('/cities')
def get_cities_list():
    query = '''SELECT id, name FROM cities;'''
    cities_list = {}
    connection = get_connection()
    if connection is not None:
        try:
            cities_list = []
            for row in get_select_query_results(connection, query):
                city = {'id': row[0], 'name': row[1]}
                cities_list.append(city)
        except Exception as e:
            print(e, file=sys.stderr)
        connection.close()
    return json.dumps(cities_list)

@app.route('/materials')
def get_materials_list():
    query = '''SELECT id, name FROM materials;'''
    materials_list = {}
    connection = get_connection()
    if connection is not None:
        try:
            materials_list = []
            for row in get_select_query_results(connection, query):
                material = {'id': row[0], 'name': row[1]}
                materials_list.append(material)
        except Exception as e:
            print(e, file=sys.stderr)
        connection.close()
    return json.dumps(materials_list)

@app.route('/purposes')
def get_purposes_list():
    query = '''SELECT id, name FROM purposes;'''
    purposes_list = {}
    connection = get_connection()
    if connection is not None:
        try:
            purposes_list = []
            for row in get_select_query_results(connection, query):
                purpose = {'id': row[0], 'name': row[1]}
                purposes_list.append(purpose)
        except Exception as e:
            print(e, file=sys.stderr)
        connection.close()
    return json.dumps(purposes_list)

@app.route('/skyscrapers')
def get_skyscraper_list():
    ''' Returns the list of skyscrapers that match GET parameters:
        ordered_by: height, year_started, year_completed, alphabetical, number_of_floors, construction_period_length
		    completion_status: under_construction, vision, completed, demolished
        city_id, int: return all skyscrapers in the given city
        started_year, int: return all skyscrapers started in the given year (or range of years)
        completed_year, int: return all skyscrapers completed in the given year (or range of years)
        purpose, int: return all skyscrapers that have the purpose that matches the provided purpose_id. 
            options: (0) air traffic control tower, (1) belltower, (2) bridge, (3) casino, (4) commercial, (5) education, (6) exhibition, (7) government, (8) hospital, (9) hotel, (10) industrial, (11) library, (12) museum, (13) office, (14) religious, (15) residential, (16) retail, (17) serviced apartments, (18) telecommunications
        material, int: return all skyscrapers that are made out of the material that matches the provided material_id.     options: (1) steel, (2) composite, (3) concrete, (4) steel/concrete, (5) concrete/steel (6) masonry, (7) precast
		
        If a GET parameter is absent, then any skyscraper is treated as though
		it meets the corresponding constraint. (That is, accept a skyscraper unless
		it is explicitly rejected by a GET parameter.)
		If ordered_by parameter is absent, then skyscrapers are ordered by height by default.
	'''
    query = '''SELECT skyscrapers.id, skyscrapers.name, skyscrapers.height, skyscrapers.started_year, skyscrapers.completed_year, skyscrapers.number_of_floors '''
    from_clause = '''FROM skyscrapers '''
    where_clause = '''WHERE 1=1 '''
    order_clause = ''
    ordered_by = flask.request.args.get('ordered_by')
    city_id = flask.request.args.get('city_id')
    started_year = flask.request.args.get('started_year')
    completed_year = flask.request.args.get('completed_year')
    purpose = flask.request.args.get('purpose') 
    material = flask.request.args.get('material') 
    
    if city_id is not None:
        where_clause += 'AND city_id = {0} '.format(city_id)
    if started_year is not None:
        where_clause += 'AND started_year = {0} '.format(started_year)
    if completed_year is not None:
        where_clause += 'AND completed_year = {0} '.format(completed_year)
    if purpose is not None:
        from_clause += ', skyscrapers_purposes '
        where_clause += 'AND skyscrapers.id = skyscrapers_purposes.skyscraper_id AND skyscrapers_purposes.purpose_id = {0} '.format(purpose)
    if material is not None:
        from_clause += ', skyscrapers_materials '
        where_clause += 'AND skyscrapers.id = skyscrapers_materials.skyscraper_id AND skyscrapers_materials.material_id = {0} '.format(material)
        
    if ordered_by == 'started_year': 
        order_clause += 'ORDER BY started_year DESC, height DESC '
    elif ordered_by == 'completed_year': 
        order_clause += 'ORDER BY completed_year DESC, height DESC '
    elif ordered_by == 'alphabetical':
        order_clause += 'ORDER BY name, height DESC '
    elif ordered_by == 'number_of_floors':
        order_clause += 'ORDER BY number_of_floors DESC, height DESC '
    else:
        order_clause += 'ORDER BY height DESC '
        
    query += from_clause
    query += where_clause 
    query += order_clause
    query += ';'
    
    print(query)
    
    skyscraper_list={}
    connection = get_connection()
    if connection is not None:
        try:
            skyscraper_list = []
            for row in get_select_query_results(connection, query):
                if ordered_by == 'started_year':
                    skyscraper = {'id': row[0], 'name': row[1], 'height': row[2], 'started_year': row[3]}
                elif ordered_by == 'completed_year':
                    skyscraper = {'id': row[0], 'name': row[1], 'height': row[2], 'completed_year': row[4]}
                elif ordered_by == 'number_of_floors':
                    skyscraper = {'id': row[0], 'name': row[1], 'height': row[2], 'number_of_floors': row[5]}
                else:
                    skyscraper = {'id': row[0], 'name':row[1], 'height':row[2]}
                skyscraper_list.append(skyscraper)
        except Exception as e:
            print(e, file=sys.stderr)
        connection.close()
    
    return json.dumps(skyscraper_list)
		

if __name__ == '__main__':
	if len(sys.argv) != 3:
		print('Usage: {0} host port'.format(sys.argv[0]))
		print('	 Example: {0} perlman.mathcs.carleton.edu 5101'.format(sys.argv[0]))
		exit()
	
	host = sys.argv[1]
	port = int(sys.argv[2])
	app.run(host=host, port=port, debug=True)
