
var map;
var vectorSource;
var parks = [];

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



  $.ajax({
    url: 'https://api.foursquare.com/v2/venues/search?client_id='
      + fourSquare.clientId + '&client_secret=' + fourSquare.clientSecret +
      '&v=20190715&limit=50&ll=' + String([lonLat[1], lonLat[0]]) + '&query=park',
    method: 'GET'
  })
    .then(function (response) {
      // Code for handling API response
      var venues = response.response.venues;
      for (var i = 0; i < venues.length; ++i) {
        parks.push({
          name: venues[i].name,
          lat: venues[i].location.lat,
          long: venues[i].location.lng
        });
      }
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
  marker.setStyle(iconStyle);
  vectorSource.addFeature(marker);
}

function markPlaces(places) {
  for (var i = 0; i < places.length; ++i) {
    addMapMarker([places[i].long, places[i].lat]);
  }
}



if ('geolocation' in navigator)
  navigator.geolocation.getCurrentPosition(createMap, createMap);
else
  createMap();




