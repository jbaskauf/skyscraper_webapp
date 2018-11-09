initialize()

/*filter search results upon initialization*/
function initialize() {
    filterFunction()
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

/*filter search results based on search string from URL and API call to /skyscrapers endpoint*/
function filterFunction() {
    var currentEndpoint = window.location.pathname;
    var search = currentEndpoint.substring(9);
    var searchString, a, i;
    searchString = search.toUpperCase().split(' ').join(''); //
    var url = getBaseURL() + '/skyscrapers';
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(skyscrapersList) {
        var tableBody = ''; 
        var counter = 0;
        for (var k=0; k<skyscrapersList.length; k++) {
            if (skyscrapersList[k]['name'].toUpperCase().split(' ').join('').indexOf(searchString) > -1) {
                tableBody += '<tr>';
                tableBody += '<td><a onclick="goToSkyscraperPage(' + skyscrapersList[k]['id']  + ' ' +")\">" + skyscrapersList[k]['name'] + '</a></td>\n';
                tableBody += '</tr>';
                counter += 1;
            }
        }
        var searchDetails = '';
        if (counter == 0) {
            searchDetails +=  '<th>There are no skyscrapers that match your search.</th>';
        }
        else {
            searchDetails += '<th>There are ' + counter + ' skyscrapers that match your search.</th>';
        }
        searchDetails += tableBody;
        var skyscrapersTableElement = document.getElementById('results_table');
        if (skyscrapersTableElement) {
            skyscrapersTableElement.innerHTML = searchDetails;
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

/*go to the individual page for the specified skyscraper based on its ID*/
function goToSkyscraperPage(skyscraperID){
    window.location=getPageBaseURL() + '/skyscraper/' + skyscraperID;
}

