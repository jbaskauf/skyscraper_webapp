initialize()

/*generate the purposes table on initialization*/
function initialize() {
    getPurposes();
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

/*generate the purposes table HTML by communicating with the /purposes API endpoint*/
function getPurposes() {
    var url = getBaseURL() + '/purposes';
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(purposesList) {
        var tableBody = '';
        for (var k = 0; k < purposesList.length; k++) {
            tableBody += '<tr>';
            tableBody += '<td><a onclick="goToRankingsPage(' +  purposesList[k]['id'] + ")\">" + purposesList[k]['name'] + '</a></td>\n';
            tableBody += '</tr>';
        }
        var purposesTableElement = document.getElementById('results_table');
        if (purposesTableElement) {
            purposesTableElement.innerHTML = tableBody;
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

/*go to the rankings page for the purpose specified*/
function goToRankingsPage(purposeID){
    window.location=getPageBaseURL() + '/rankings?tab=height_button&purpose=' + purposeID;
}
