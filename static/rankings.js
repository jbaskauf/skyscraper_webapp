initialize();

/*initialize dropdown menus and pre-selects proper ordered_by tab depending on 'tab' parameter in the URL upon initialization*/
function initialize() {
    initializeCitiesDropdown();
    initializeMaterialsDropdown();
    initializePurposesDropdown();
    var element = document.getElementById('height_button');
    if (element) {
        element.onclick = onHeightButtonClicked;
    }
    var element = document.getElementById('numfloors_button');
    if (element) {
        element.onclick = onNumfloorsButtonClicked;
    }

   var element = document.getElementById('alphabetical_button');
    if (element) {
        element.onclick = onAlphabeticalButtonClicked;
    }

    var element = document.getElementById('started_year_button');
    if (element) {
        element.onclick = onStartedYearButtonClicked;
    }

    var element = document.getElementById('completed_year_button');
    if (element) {
        element.onclick = onCompletedYearButtonClicked;
    }

    var currentURL = new URL(window.location.href);
    var tabID = currentURL.searchParams.get('tab');

    if (tabID == "height_button") {
        onHeightButtonClicked();
    }

    else if (tabID == "numfloors_button") {
        onNumfloorsButtonClicked();
    }

    else if (tabID == "alphabetical_button") {
        onAlphabeticalButtonClicked();
    }

    else if (tabID == "started_year_button") {
        onStartedYearButtonClicked();
    }

    else if (tabID == "completed_year_button") {
        onCompletedYearButtonClicked();
    }


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

/*returns purpose ID if found in the current URL*/
function getPurposeID(){
    var currentURL = new URL(window.location.href);
    var purposeID = currentURL.searchParams.get('purpose');
    return purposeID;
}

/*returns material ID if found in the current URL*/
function getMaterialID(){
    var currentURL = new URL(window.location.href);
    var materialID = currentURL.searchParams.get('material');
    return materialID;
}

/*returns city ID if found in the current URL*/
function getCityID(){
    var currentURL = new URL(window.location.href);
    var cityID = currentURL.searchParams.get('city');
    return cityID;
}

/*returns started year if found in the current URL*/
function getStartedYear(){
    var currentURL = new URL(window.location.href);
    var startedYear = currentURL.searchParams.get('started_year');
    return startedYear;
}

/*returns completed year if found in the current URL*/
function getCompletedYear(){
    var currentURL = new URL(window.location.href);
    var completedYear = currentURL.searchParams.get('completed_year');
    return completedYear;
}

/*initialize the contents of the results_table HTML by communicating with the /skyscrapers API endpoint, using specified refinement parameters from the URL and ordering by height*/
function onHeightButtonClicked() {
    var url = getBaseURL() + '/skyscrapers?ordered_by=height';
    var purposeID = getPurposeID();
    var materialID = getMaterialID();
    var cityID = getCityID();
    var startedYear = getStartedYear();
    var completedYear = getCompletedYear();
    if (purposeID != null){
        url += '&purpose=' + purposeID;
    }
    if (materialID != null){
        url += '&material=' + materialID;
    }
    if (cityID != null){
        url += '&city_id=' + cityID;
    }
    if (startedYear != null) {
        url += '&started_year=' + startedYear;
    }
    if (completedYear != null) {
        url += '&completed_year=' + completedYear;
    }
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(skyscrapersList) {
	var tableBody = '<tr><th>Name</th><th>Height</th>';
        for (var k = 0; k < skyscrapersList.length; k++) {
            tableBody += '<tr>';

            tableBody += '<td><a onclick="goToSkyscraperPage(' + skyscrapersList[k]['id'] + ",'"
                            + skyscrapersList[k]['name'] + ' ' + "')\">"
                            + skyscrapersList[k]['name']
                            + '</a></td>';
            tableBody += '<td>' + skyscrapersList[k]['height'] + '</td>'

            tableBody += '</tr>';
        }
        var resultsTableElement = document.getElementById('results_table');
        if (tableBody == '<tr><th>Name</th><th>Height</th>') {
            tableBody = '<td>No skyscrapers match your criteria.</td>'
        }
        if (resultsTableElement) {
            resultsTableElement.innerHTML = tableBody;
        }
    })

    .catch(function(error) {
        console.log(error);
    });
}

/*initialize the contents of the results_table HTML by communicating with the /skyscrapers API endpoint, using specified refinement parameters from the URL and ordering by number of floors*/
function onNumfloorsButtonClicked() {
    var url = getBaseURL() + '/skyscrapers?ordered_by=number_of_floors';
    var purposeID = getPurposeID();
    var materialID = getMaterialID();
    var cityID = getCityID();
    var startedYear = getStartedYear();
    var completedYear = getCompletedYear();
    if(purposeID != null){
        url += '&purpose=' + purposeID;
    }
    if (materialID != null){
        url += '&material=' + materialID;
    }
    if (cityID != null){
        url += '&city_id=' + cityID;
    }
    if (startedYear != null) {
        url += '&started_year=' + startedYear;
    }
    if (completedYear != null) {
        url += '&completed_year=' + completedYear;
    }
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(skyscrapersList) {
     var tableBody = '<tr><th>Name</th><th>Height</th><th>Number of floors</th>';
        for (var k = 0; k < skyscrapersList.length; k++) {
            tableBody += '<tr>';

            tableBody += '<td><a onclick="goToSkyscraperPage(' + skyscrapersList[k]['id'] + ",'"
                            + skyscrapersList[k]['name'] + ' ' + "')\">"
                            + skyscrapersList[k]['name']
                            + '</a></td>';
            tableBody += '<td>' + skyscrapersList[k]['height'] + '</td>'
            tableBody += '<td>' + skyscrapersList[k]['number_of_floors'] + '</td>'
            tableBody += '</tr>';
        }
        var resultsTableElement = document.getElementById('results_table');
        if (tableBody == '<tr><th>Name</th><th>Height</th>') {
            tableBody = '<td>No skyscrapers match your criteria.</td>'
        }
        if (resultsTableElement) {
            resultsTableElement.innerHTML = tableBody;
        }
    })

    .catch(function(error) {
        console.log(error);
    });
}

/*initialize the contents of the results_table HTML by communicating with the /skyscrapers API endpoint, using specified refinement parameters from the URL and ordering by alphabetical order*/
function onAlphabeticalButtonClicked() {
    var url = getBaseURL() + '/skyscrapers?ordered_by=alphabetical';
    var purposeID = getPurposeID();
    var materialID = getMaterialID();
    var cityID = getCityID();
    var startedYear = getStartedYear();
    var completedYear = getCompletedYear();
    if(purposeID != null){
        url += '&purpose=' + purposeID;
    }
    if (materialID != null){
        url += '&material=' + materialID;
    }
    if (cityID != null){
        url += '&city_id=' + cityID;
    }
    if (startedYear != null) {
        url += '&started_year=' + startedYear;
    }
    if (completedYear != null) {
        url += '&completed_year=' + completedYear;
    }
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(skyscrapersList) {
        var tableBody = '<tr><th>Name</th><th>Height</th>';
        for (var k = 0; k < skyscrapersList.length; k++) {
            tableBody += '<tr>';

            tableBody += '<td><a onclick="goToSkyscraperPage(' + skyscrapersList[k]['id'] + ",'"
                            + skyscrapersList[k]['name'] + ' ' + "')\">"
                            + skyscrapersList[k]['name']
                            + '</a></td>';
            tableBody += '<td>' + skyscrapersList[k]['height'] + '</td>'
            tableBody += '</tr>';
        }
        var resultsTableElement = document.getElementById('results_table');
        if (tableBody == '<tr><th>Name</th><th>Height</th>') {
            tableBody = '<td>No skyscrapers match your criteria.</td>'
        }
        if (resultsTableElement) {
            resultsTableElement.innerHTML = tableBody;
        }
    })

    .catch(function(error) {
        console.log(error);
    });
}

/*initialize the contents of the results_table HTML by communicating with the /skyscrapers API endpoint, using specified refinement parameters from the URL and ordering by started year*/
function onStartedYearButtonClicked() {
    var url = getBaseURL() + '/skyscrapers?ordered_by=started_year';
    var purposeID = getPurposeID();
    var materialID = getMaterialID();
    var cityID = getCityID();
    var startedYear = getStartedYear();
    var completedYear = getCompletedYear();
    if(purposeID != null){
        url += '&purpose=' + purposeID;
    }
    if (materialID != null){
        url += '&material=' + materialID;
    }
    if (cityID != null){
        url += '&city_id=' + cityID;
    }
    if (startedYear != null) {
        url += '&started_year=' + startedYear;
    }
    if (completedYear != null) {
        url += '&completed_year=' + completedYear;
    }
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(skyscrapersList) {
        var tableBody = '<tr><th>Name</th><th>Height</th><th>Year started</th>';
        for (var k = 0; k < skyscrapersList.length; k++) {
            tableBody += '<tr>';

            tableBody += '<td><a onclick="goToSkyscraperPage(' + skyscrapersList[k]['id'] + ",'"
                            + skyscrapersList[k]['name'] + ' ' + "')\">"
                            + skyscrapersList[k]['name']
                            + '</a></td>';
            tableBody += '<td>' + skyscrapersList[k]['height'] + '</td>'
            tableBody += '<td>' + skyscrapersList[k]['started_year'] + '</td>'
            tableBody += '</tr>';
        }
        var resultsTableElement = document.getElementById('results_table');
        if (tableBody == '<tr><th>Name</th><th>Height</th>') {
            tableBody = '<td>No skyscrapers match your criteria.</td>'
        }
        if (resultsTableElement) {
            resultsTableElement.innerHTML = tableBody;
        }
    })

    .catch(function(error) {
        console.log(error);
    });
}

/*initialize the contents of the results_table HTML by communicating with the /skyscrapers API endpoint, using specified refinement parameters from the URL and ordering by completed year*/
function onCompletedYearButtonClicked() {
    var url = getBaseURL() + '/skyscrapers?ordered_by=completed_year';
    var purposeID = getPurposeID();
    var materialID = getMaterialID();
    var cityID = getCityID();
    var startedYear = getStartedYear();
    var completedYear = getCompletedYear();
    if(purposeID != null){
        url += '&purpose=' + purposeID;
    }
    if (materialID != null){
        url += '&material=' + materialID;
    }
    if (cityID != null){
        url += '&city_id=' + cityID;
    }
    if (startedYear != null) {
        url += '&started_year=' + startedYear;
    }
    if (completedYear != null) {
        url += '&completed_year=' + completedYear;
    }
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(skyscrapersList) {
        var tableBody = '<tr><th>Name</th><th>Height</th><th>Year completed</th>';
        for (var k = 0; k < skyscrapersList.length; k++) {
            tableBody += '<tr>';

            tableBody += '<td><a onclick="goToSkyscraperPage(' + skyscrapersList[k]['id'] + ",'"
                            + skyscrapersList[k]['name'] + ' ' + "')\">"
                            + skyscrapersList[k]['name']
                            + '</a></td>';
            tableBody += '<td>' + skyscrapersList[k]['height'] + '</td>'
            tableBody += '<td>' + skyscrapersList[k]['completed_year'] + '</td>'
            tableBody += '</tr>';
        }
        var resultsTableElement = document.getElementById('results_table');
        if (tableBody == '<tr><th>Name</th><th>Height</th>') {
            tableBody = '<td>No skyscrapers match your criteria.</td>'
        }
        if (resultsTableElement) {
            resultsTableElement.innerHTML = tableBody;
        }
    })

    .catch(function(error) {
        console.log(error);
    });
}

/*go to the page of the individual skyscraper specified by the skyscraper ID*/
function goToSkyscraperPage(skyscraperID, skyscraperName) {
    window.location=getPageBaseURL() + '/skyscraper/' + skyscraperID;
}

/*initialize the contents of the cities dropdown menu HTML by communicating with the /cities API endpoint*/
function initializeCitiesDropdown() {
    var url = getBaseURL() + '/cities';
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(cityList) {
        var dropdownBody = '<option value="">Select a city...</option>';
        for (var k = 0; k < cityList.length; k++) {
            dropdownBody += '<option value="' + cityList[k]['id'] + '">' + cityList[k]['name'] + '</option>\n';
        }
        var citiesDropdownElement = document.getElementById('cities-combobox');
        if (citiesDropdownElement) {
            citiesDropdownElement.innerHTML = dropdownBody;
        }
    })

    .catch(function(error) {
        console.log(error);
    });
}

/*initialize the contents of the materials dropdown menu HTML by communicating with the /materials API endpoint*/
function initializeMaterialsDropdown() {
    var url = getBaseURL() + '/materials';
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(materialsList) {
        var dropdownBody = '<option value="">Select a material...</option>';
        for (var k = 0; k < materialsList.length; k++) {
            dropdownBody += '<option value="' + materialsList[k]['id'] + '">' + materialsList[k]['name'] + '</option>\n';
        }
        var materialsDropdownElement = document.getElementById('materials-combobox');
        if (materialsDropdownElement) {
            materialsDropdownElement.innerHTML = dropdownBody;
        }
    })

    .catch(function(error) {
        console.log(error);
    });
}

/*initialize the contents of the purposes dropdown menu HTML by communicating with the /purposes API endpoint*/
function initializePurposesDropdown() {
    var url = getBaseURL() + '/purposes';
    fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then(function(purposesList) {
       var dropdownBody = '<option value="">Select a purpose...</option>';
        for (var k = 0; k < purposesList.length; k++) {
            dropdownBody += '<option value="' + purposesList[k]['id'] + '">' + purposesList[k]['name'] + '</option>\n';
        }
        var purposesDropdownElement = document.getElementById('purposes-combobox');
        if (purposesDropdownElement) {
            purposesDropdownElement.innerHTML = dropdownBody;
        }
    })

    .catch(function(error) {
        console.log(error);
    });
}

/*JQuery function to combine a dropdown menu with a search box*/
$( function() {
    $.widget( "custom.combobox", {
      _create: function() {
        this.wrapper = $( "<span>" )
          .addClass( "custom-combobox" )
          .insertAfter( this.element );

        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
      },

      _createAutocomplete: function() {
        var selected = this.element.children( ":selected" ),
          value = selected.val() ? selected.text() : "";

        this.input = $( "<input>" )
          .appendTo( this.wrapper )
          .val( value )
          .attr( "title", "" )
          .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
          .autocomplete({
            delay: 0,
            minLength: 0,
            source: $.proxy( this, "_source" )
          })
          .tooltip({
            classes: {
              "ui-tooltip": "ui-state-highlight"
            }
          });

        this._on( this.input, {
          autocompleteselect: function( event, ui ) {
            ui.item.option.selected = true;
            this._trigger( "select", event, {
              item: ui.item.option
            });
          },

          autocompletechange: "_removeIfInvalid"
        });
      },

         _createShowAllButton: function() {
        var input = this.input,
          wasOpen = false;

        $( "<a>" )
          .attr( "tabIndex", -1 )
          .attr( "title", "Show All Items" )
          .tooltip()
          .appendTo( this.wrapper )
          .button({
            icons: {
              primary: "ui-icon-triangle-1-s"
            },
            text: false
          })
          .removeClass( "ui-corner-all" )
          .addClass( "custom-combobox-toggle ui-corner-right" )
          .on( "mousedown", function() {
            wasOpen = input.autocomplete( "widget" ).is( ":visible" );
          })
          .on( "click", function() {
            input.trigger( "focus" );
            if ( wasOpen ) {
              return;
            }
            input.autocomplete( "search", "" );
          });
      },

      _source: function( request, response ) {
        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
        response( this.element.children( "option" ).map(function() {
          var text = $( this ).text();
          if ( this.value && ( !request.term || matcher.test(text) ) )
            return {
              label: text,
              value: text,
              option: this
            };
        }) );
      },

      _removeIfInvalid: function( event, ui ) {
        if ( ui.item ) {
          return;
        }
         var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
        this.element.children( "option" ).each(function() {
          if ( $( this ).text().toLowerCase() === valueLowerCase ) {
            this.selected = valid = true;
            return false;
          }
        });
        if ( valid ) {
          return;
        }
        this.input
          .val( "" )
          .attr( "title", value + " didn't match any item" )
          .tooltip( "open" );
        this.element.val( "" );
        this._delay(function() {
          this.input.tooltip( "close" ).attr( "title", "" );
        }, 2500 );
        this.input.autocomplete( "instance" ).term = "";
      },

      _destroy: function() {
        this.wrapper.remove();
        this.element.show();
      }
    });

    $( ".combobox" ).combobox();
    $( "#toggle" ).on( "click", function() {
        $( "#combobox" ).toggle();
    });
  } );

/*return the value in the cities combobox*/
function getCitiesComboboxValue() {
    var x = document.getElementById("cities-combobox").selectedIndex;
    return document.getElementsByTagName("option")[x].value;
}

/*return the value in the materials combobox*/
function getMaterialsComboboxValue() {
    var x = document.getElementById("materials-combobox").selectedIndex;
    return document.getElementsByTagName("option")[x].value;
}

/*return the value in the purposes combobox*/
function getPurposesComboboxValue() {
    var x = document.getElementById("purposes-combobox").selectedIndex;
    return document.getElementsByTagName("option")[x].value;
}

/*return the value in the started year textbox*/
function getStartedYearTextboxValue() {
    return document.getElementById("started-year-text").value;
}

/*return the value in the completed year textbox*/
function getCompletedYearTextboxValue() {
    return document.getElementById("completed-year-text").value;
}

/*go to the rankings page based on the ordering property specified*/
function getRankings() {
    var cityID = getCitiesComboboxValue();
    var materialID = getMaterialsComboboxValue();
    var purposeID = (getPurposesComboboxValue()-1);
    var startedYear = getStartedYearTextboxValue();
    var completedYear = getCompletedYearTextboxValue();
    var url = getPageBaseURL() + '/rankings?tab=height_button';
    if (cityID != "") {
        url += '&city=' + cityID;
    }
    if (materialID != "") {
        url += '&material=' + materialID;
    }
    if (purposeID != -1) {
        url += '&purpose=' + purposeID;
    }
    if (startedYear != "") {
        url += '&started_year=' + startedYear;
    }
    if (completedYear != "") {
        url += '&completed_year=' + completedYear;
    }
    window.location = url;
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
