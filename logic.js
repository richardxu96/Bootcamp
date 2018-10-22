/*Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

   * Your data markers should reflect the magnitude of the earthquake in their size and color. 
     Earthquakes with higher magnitudes should appear larger and darker in color.

   * Include popups that provide additional information about the earthquake when a marker is clicked.

   * Create a legend that will provide context for your map data.

   * Your visualization should look something like the map above.


   * to run this application run python -m http.server 
        -> make sure you open the terminal at the location the index.html file is located
   
   */

// We need to create the map object and tell it it what level to zoom for the default view 


var APIquake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson" 
console.log(APIquake);

var map = L.map("map", {
    center: [ 40.7, -94.5],
    zoom: 3
  });
  

// Then send the api request 
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

function markerSize(magnitude) {
  return magnitude * 4;
};

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
        //console.log(data);
        plotData(data);
        pointToLayer: function (geoJsonPoint, latlng) {
          return L.circleMarker(latlng, { radius: markerSize(geoJsonPoint.properties.mag) });
      },

      style: function (geoJsonFeature) {
          return {
              fillColor: Color(geoJsonFeature.properties.mag),
              fillOpacity: 0.7,
              weight: 0.1,
              color: 'black'

          }
      },

      onEachFeature: function (feature, layer) {
          layer.bindPopup(
              "<h4 style='text-align:center;'>" + new Date(feature.properties.time) +
              "</h4> <hr> <h5 style='text-align:center;'>" + feature.properties.title + "</h5>");
      }
  }).addTo(earthquakes);
  createMap(earthquakes);
});
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        magnitude = [0, 1, 2, 3, 4, 5],
        labels = [];

    div.innerHTML += "<h4 style='margin:4px'>Magnitude</h4>"

    for (var i = 0; i < magnitude.length; i++) {
        div.innerHTML +=
            '<i style="background:' + Color(magnitude[i] + 1) + '"></i> ' +
            magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
    }

    return div;
};
legend.addTo(mymap);
}
        
});


/** We can start by putting data on the map 
 * 
 *   Step 1: put the data on the map. 
 *        1.1 Since we are using geoJson data we need to use the L.geoJson function to plot the data on the map
 *        1.2 Resources -- https://leafletjs.com/reference-1.3.4.html#geojson
 * 
 * 
 *   Step 2: We can use the options in the GeoJson file to color our map 
 *        2.1: We need to color the map based on the Earthquake Manitude
 */

function plotData(data){

  // step 1.1 + 1.2 goes here

}

