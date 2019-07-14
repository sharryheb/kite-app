var map;
function createMap(position) {
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
}

var parks;

if ('geolocation' in navigator)
  navigator.geolocation.getCurrentPosition(createMap, createMap);
else
  createMap();
