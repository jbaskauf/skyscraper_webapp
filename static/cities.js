initialize()

/*generate the cities table on initialization*/
function initialize() {
    getCities();
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

/*generate the cities table HTML by communicating with the /cities API endpoint*/
function getCities() {
    var url = getBaseURL() + '/cities';
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(cityList) {
        var tableBody = '';
        for (var k = 0; k < cityList.length; k++) {
            tableBody += '<tr>';
            tableBody += '<td><a onclick="goToRankingsPage(' + cityList[k]['id']  + ' ' +")\">" + cityList[k]['name'] + '</a></td>\n';
            tableBody += '</tr>';
        }
        var citiesTableElement = document.getElementById('results_table');
        if (citiesTableElement) {
            citiesTableElement.innerHTML = tableBody;
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

/*go to the rankings page for the city specified*/
function goToRankingsPage(cityID){
    window.location=getPageBaseURL() + '/rankings?tab=height_button&city=' + cityID;
}
