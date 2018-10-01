// from data.js
var tableData = data;

// 
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#datetime");
var $stateInput = document.querySelector("#state");
var $searchBtn = document.querySelector("#search");
var $cityInput = document.querySelector("#city");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");

// addresses
var filteredTable = data;

// Tables
function renderTable() {
    $tbody.innerHTML = "";
    for (var i = 0; i < filteredTable.length; i++) {
      // Get get the current address object and its fields
      var address = filteredTable[i];
      console.log(address)
      var fields = Object.keys(address);
      // Create a new row in the tbody, set the index to be i + startingIndex
      var $row = $tbody.insertRow(i);
      for (var j = 0; j < fields.length; j++) {
        // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
        var field = fields[j];
        var $cell = $row.insertCell(j);
        $cell.innerText = address[field];
      }
    }
  }

  function handleSearchButtonClick() {
    // Filter
      function selectCity(City) {
        return city.city=searchbutton;
      }

      var CitySelect = data.filter(selectCity);

      
  
    // // Set filteredAddresses to an array of all addresses whose "state" matches the filter
    // if (filterDate != "")
    // {
    //   filteredTable = dataSet.filter(function(address) 
    //   {
    //     var addressDate = address.datetime; 
      
    //   // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    //   return addressDate === filterDate;
    //   });
    // }
    // else {filteredTable};
    // if(filterState != "")
    // {
    //   filteredTable = filteredTable.filter(function(address)
    //   {
    //     var addressState = address.state;
    //     return addressState === filterState;
    //   });
    // }
    // else{filteredTable};
  
    // if(filterCity != "")
    // {
    //   filteredTable = filteredTable.filter(function(address)
    //   {
    //     var addressCity = address.city;
    //     return addressCity === filterCity;
    //   });
    // }
  
    // else{filteredTable};
  
 
  
  renderTable();
  
  }
  
  // Render the table for the first time on page load
  renderTable();
  
 
