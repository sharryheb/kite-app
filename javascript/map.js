

var map;
var markers;
var parks;
var iconStyle = new ol.style.Style({
  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
    anchor: [55, 49],
    anchorXUnits: 'pixels',
    anchorYUnits: 'pixels',
    opacity: 1.0,
    src: 'images/kite-icon.png'
  }))
});

function createMap(position) {
  // Create the map with given position from geopositioning.
  console.log('Creating Map');
  var lonLat;
  if (position && position.coords) {
    lonLat = [position.coords.longitude, position.coords.latitude];
  } else {
    lonLat = [-122.190933, 47.613701];
  }
  var marker = new ol.Feature({
    geometry: new ol.geom.Point(
      ol.proj.fromLonLat(lonLat)
    )
  });
  vectorSource = new ol.source.Vector({
    features: [marker]
  });
  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      new ol.layer.Vector({
        source: vectorSource
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat(lonLat),
      zoom: 12
    })
  });
  marker = new ol.Feature({
    geometry: new ol.geom.Point(
      ol.proj.fromLonLat(lonLat)
    )
  });
  vectorSource = new ol.source.Vector({
    features: [marker]
  });
  markerVectorLayer = new ol.layer.Vector({
    source: vectorSource,
  });
  map.addLayer(markerVectorLayer);

//ll=40.7243,-74.0018
  fetch('https://api.foursquare.com/v2/venues/explore?client_id='
    + fourSquare.clientId + '&client_secret=' + fourSquare.clientSecret +
    '&v=20190715&radius=' + requestRadius * 1609.344 + '&limit=10&ll=' + position.coords.latitude + ',' + position.coords.longitude + '&query=parks')
    .then(function (response) 
    {
        // Code for handling API response
        //console.log(response);
        response.json()
        .then(function(parsedJson){

          locationResults = parsedJson.response.groups[0].items;

          // I think the below is not necessary because I have locationResults already stored for the UI anyway. Can you use locationResults? 
          /*
          for (var i = 0; i < locationResults.length; ++i) 
          {
            var venue = locationResults[i].venue;
            parks.push(
            {
              name: venue.name,
              lat: venue.location.lat,
              long: venue.location.lng
            })
          }
          */
        })
    })
    .catch(function (error) {
      // Code for handling errors
      console.log(error);
    });
}


function addMapMarker(lonLat) {
  // Add a marker to the map, takes longitude and latitude as an array.
  var marker = new ol.Feature({
    geometry: new ol.geom.Point(
      ol.proj.fromLonLat(lonLat)
    )
  });
  vectorSource.addFeatures(marker);
}
