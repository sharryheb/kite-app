

var map;
var markers;
var parks;

function createMap(position) {
  // Create the map with given position from geopositioning.
  console.log('Creating Map');
  var lonLat;
  if (position && position.coords) {
    lonLat = [position.coords.longitude, position.coords.latitude];
  } else {
    lonLat = [-122.190933, 47.613701];
  }
  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
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
    .then(function (response) {
      response.json()
      .then(function(parsedJson){
          locationResults = parsedJson.response.groups[0].items;
      });
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
