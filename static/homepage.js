initialize();

/*initialize dropdown menus upon initialization*/
function initialize() {
    initializeCitiesDropdown();
    initializeMaterialsDropdown();
    initializePurposesDropdown();
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
