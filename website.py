#!/usr/bin/env python3
'''
website.py
    Jessie Baskauf and Ellie Mamantov
    This is the Flask app for the
    skyscrapers API and website. The API offers
    JSON access to the data, while the website (at
    route '/') offers end-user browsing of the data.
'''
import sys
import flask

app = flask.Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def get_main_page():
    ''' This is the only route intended for human users '''
    global api_port
    return flask.render_template('index.html', api_port=api_port)

@app.route('/rankings')
def get_rankings_page():
    global api_port
    return flask.render_template('rankings.html', api_port=api_port)

@app.route('/cities')
def get_cities_page():
    global api_port
    return flask.render_template('cities.html', api_port=api_port)

@app.route('/materials')
def get_materials_page():
    global api_port
    return flask.render_template('materials.html', api_port=api_port)

@app.route('/purposes')
def get_purposes_page():
    global api_port
    return flask.render_template('purposes.html', api_port=api_port)

@app.route('/skyscraper/<skyscraper_id>')
def get_skyscraper_page(skyscraper_id):
    global api_port
    return flask.render_template('skyscraper.html', api_port=api_port)

@app.route('/results/<search_string>')
def get_results_page(search_string):
    global api_port
    return flask.render_template('results.html', api_port=api_port)

if __name__ == '__main__':
    if len(sys.argv) != 4:
        print('Usage: {0} host port api-port'.format(sys.argv[0]), file=sys.stderr)
        exit()

    host = sys.argv[1]
    port = sys.argv[2]
    api_port = sys.argv[3]
    app.run(host=host, port=port)
