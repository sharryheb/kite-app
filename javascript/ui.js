
var wind = {speedMax: 20, speedMin: 5, ignoreMaxWindSpeed: false};

var locationProp = {name: '', lat: 0, long: 0, address: ''};

var geoLocatedAddress = {street: '', city: '', state: '', zip: ''};

var locationResults = [];
var positionForMap = null;
var requestRadius = 5;

var nowDateTime = new Date();
var requestDateTime = Math.round(nowDateTime.getTime() / 1000);
var windSpeedSlider = null;
var radiusSlider = null;


$(document).ready(function() {
  nowDateTime = roundUpToHalfHour(nowDateTime);
  $('#datetimepicker').datetimepicker({
    startDate: nowDateTime,
    onChangeDateTime: SetRequestedDate,
    minDate: 0,
    format: 'm/d/Y g:i A',
    formatDate: 'm/d/Y',
    formatTime: 'g:i A',
    value: nowDateTime,
    hours12: false,
    step: 30,
    defaultDate: nowDateTime,
    defaultTime: nowDateTime,
    validateOnBlur: false
  });
  $.datetimepicker.setLocale('en');
  $('datetimepicker').text(nowDateTime);

  windSpeedSlider = document.getElementById('windSlider');
  radiusSlider = document.getElementById('radiusSlider');

  noUiSlider.create(windSpeedSlider, {
    start: [5, 20],
    connect: true,
    range: {'min': 0, 'max': 40},
    step: 5,
    pips: {mode: 'steps', density: 5},

    format: {
      to: function(value) {
        return parseInt(value);
      },
      from: function(value) {
        return Number(value);
      }
    }
  });

  noUiSlider.create(radiusSlider, {
    start: [5],
    connect: true,
    range: {'min': 0, 'max': 20},
    step: 1,
    pips: {mode: 'count', values: 5, density: 5, stepped: true},

    format: {
      to: function(value) {
        return parseInt(value);
      },
      from: function(value) {
        return Number(value);
      }
    }
  });

  windSpeedSlider.noUiSlider.on('end', function(values, handle) {
    if (handle === 0) wind.speedMin = values[0];
    if (handle === 1) wind.speedMax = values[1];
  });

  windSpeedSlider.noUiSlider.on('update', function(values) {
    $('#curWind').text(values[0] + ' to ' + values[1] + ' mph');
  });

  radiusSlider.noUiSlider.on('end', function(values) {
    requestRadius = parseInt(values[0]);
  });

  radiusSlider.noUiSlider.on('update', function(values) {
    $('#curRadius').text(values[0] + ' miles');
  });

  if ('geolocation' in navigator)
    navigator.geolocation.getCurrentPosition(getAddressFromLatLong);
});

$('form').keypress(function(e) {
  var code = e.keyCode || e.which;

  if (code === 13) {
    $('#search').click();
  }
})

$('#search').click(function() {
  var inputAddress = $('#address').val();
  if (inputAddress === '') {
    $('#address').removeClass('valid');
    $('#address').addClass('invalid');
    $('#validateErrorMsg').text('Please enter an address');
  } else {
    $('#address').addClass('valid');
    $('#address').removeClass('invalid');
    $('#inputScreen').addClass('hide');
    $('#results').removeClass('hide');
    if (positionForMap) {
      createMap(positionForMap);
    }
    getLatLongFromAddress(inputAddress);
  }
});

$('#redoSearch').click(function() {
  $('#results').addClass('hide');
  $('#inputScreen').removeClass('hide');
  $('#map').html('');
  $('#locationList').html('');
});

$('#ignoreMaxWind').click(function() {
  if ($(event.target).attr('checked')) {
    $('#ignoreMaxWind').attr('checked', false);
    wind.ignoreMaxWindSpeed = false;
  } else {
    $('#ignoreMaxWind').attr('checked', true);
    wind.ignoreMaxWindSpeed = true;
  }
});

function SetRequestedDate(dateString) {
  requestDateTime = Math.round((new Date(dateString)).getTime() / 1000);
};

function createLocationList(parksFinal) {
  $('#locationList').empty();
  if (parksFinal.length)
    for (var i = 0; i < parksFinal.length; i++) {
      var listItem = $('<a>');
      listItem.addClass('collection-item teal-text text-lighten-2');
      listItem.attr('data-park', JSON.stringify(parksFinal[i]));
      listItem.click(function() {
        var park = JSON.parse($(this).attr('data-park'));
        console.log(park);
        map.getView().animate(
            {center: ol.proj.fromLonLat([park.long, park.lat]), zoom: 13});
      });
      listItem.html(
          parksFinal[i].name + '<br>Wind will be ' +
          String(Math.round(parksFinal[i].speedMin)) + '-' +
          String(Math.round(parksFinal[i].speedMax)) + 'mph');
      $('#locationList').append(listItem);
    }
  else
    $('#locationList')
        .append($('<div style="margin:2px">')
                    .html(
                        'We couldn\'t find anywhere windy enough to fly.<br>' +
                        'Try changing your parameters.'));
}

function roundUpToHalfHour(time) {
  var timeToReturn = new Date(time);

  timeToReturn.setMilliseconds(
      Math.round(time.getMilliseconds() / 1000) * 1000);
  timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
  timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 30) * 30);
  return timeToReturn;
};

function getAddressFromLatLong(position) {
  if (position && position.coords) {
    positionForMap = position;
  }
  fetch(
      'http://www.mapquestapi.com/geocoding/v1/reverse?key=' +
      getSecret('mapQuest', 'consumerKey') +
      '&location=' + position.coords.latitude + ',' + position.coords.longitude)
      .then(function(response) {
        response.json().then(function(parsedJson) {
          var loc = parsedJson.results[0].locations[0];
          geoLocatedAddress.street = loc.street;
          geoLocatedAddress.city = loc.adminArea5;
          geoLocatedAddress.state = loc.adminArea3;
          geoLocatedAddress.zip = loc.postalCode;

          $('#address')
              .val(
                  loc.street + '  ' + loc.adminArea5 + ', ' + loc.adminArea3 +
                  ' ' + loc.postalCode);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
};

function getLatLongFromAddress() {
  fetch(
      'http://www.mapquestapi.com/geocoding/v1/address?key=' +
      getSecret('mapQuest', 'consumerKey') + '&location=' + $('#address').val())
      .then(function(response) {
        response.json().then(function(parsedJson) {
          var loc = parsedJson.results[0].locations[0];

          if (!positionForMap) {
            positionForMap = {
              coords: {latitude: loc.latLng.lat, longitude: loc.latLng.lng}
            };
            createMap(positionForMap);
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
};
