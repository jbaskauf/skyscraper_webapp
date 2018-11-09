initialize();

/*display the current skyscraper's information upon initialization*/
function initialize() {
    var element = document.getElementById('test_button');
    if (element) {
        element.onclick = getSkyscraper;
    }
    getSkyscraper();
}

/*generate the URL for the API call*/
function getBaseURL() {
    var baseURL = window.location.protocol + '//' + window.location.hostname + ':' + api_port;
    return baseURL;
}

/*generate the URL for the website port*/
function getPageBaseURL() {
    var baseURL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
    return baseURL;
}

/*initializes the contents of the data tables HTML by communicating with the /skyscraper API endpoint*/
function getSkyscraper() {
    var currentEndpoint = window.location.pathname;
    var id = currentEndpoint.substring(12);
    var url = getBaseURL() + '/skyscraper/' + id;

    fetch(url, {method: 'get'})

    .then((response) => response.json())

    .then(function(skyscraper) {
        var nameDivBody = '<h1>' + skyscraper['name'] + '</h1><h2>' + skyscraper['city'] + '</h2>';
        var nameDivElement = document.getElementById('name')
        if (nameDivElement) {
            nameDivElement.innerHTML = nameDivBody;
        }
        var factsResultsTableBody = '<tr><th>Height</th><th>Year started</th><th>Year completed</th><th>Number of floors</th></tr><tr><td>';
        factsResultsTableBody += skyscraper['height'] + ' m</td><td>' + skyscraper['started_year'] + '</td><td>' + skyscraper['completed_year'] + '</td><td>' + skyscraper['number_of_floors'] + '</td></tr>' ;
        var resultsTableElement = document.getElementById('facts_results_table');
        if (resultsTableElement) {
            resultsTableElement.innerHTML = factsResultsTableBody;
        }
        var purposesTableBody = '<tr><th>Purposes</th></tr>';
        for (var k = 0; k < skyscraper['purposes'].length; k++) {
            purposesTableBody += '<tr><td>'+ skyscraper['purposes'][k] + '</td></tr>';
        }
        var purposesTableElement = document.getElementById('purposes_table');
        if (purposesTableElement) {
            purposesTableElement.innerHTML = purposesTableBody;
        }
        var materialsTableBody = '<tr><th>Materials</th></tr><tr><td>';
        materialsTableBody += skyscraper['material']; + '</td></tr>'
        var materialsTableElement = document.getElementById('materials_table');
        if (materialsTableElement) {
            materialsTableElement.innerHTML = materialsTableBody;
        }
    })

    .catch(function(error) {
        console.log(error);
    });
}

/*return the value of the string entered into the search box*/
function getSearchBoxValue() {
    return document.getElementById("search-box").value;
}

/*go to the search results page for the search string entered into the search box*/
function getSearchResults() {
    var searchString = getSearchBoxValue();
    var url = getPageBaseURL() + '/results/' + searchString;
    window.location = url;
}

