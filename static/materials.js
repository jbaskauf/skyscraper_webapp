initialize()

/*generate materials table upon initialization*/
function initialize() {
    getMaterials();
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

/*generate the materials table HTML by communicating with the /materials API endpoint*/
function getMaterials() {
    var url = getBaseURL() + '/materials';
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(materialsList) {
        var tableBody = '';
        for (var k = 0; k < materialsList.length; k++) {
            tableBody += '<tr>';
            tableBody += '<td><a onclick="goToRankingsPage(' +  materialsList[k]['id'] + ' ' +")\">" + materialsList[k]['name'] + '</a></td>\n';
            tableBody += '</tr>';
        }
        var materialsTableElement = document.getElementById('results_table');
        if (materialsTableElement) {
            materialsTableElement.innerHTML = tableBody;
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

/*go to the rankings page for the material specified*/
function goToRankingsPage(materialID){
    window.location=getPageBaseURL() + '/rankings?tab=height_button&material=' + materialID;
}

