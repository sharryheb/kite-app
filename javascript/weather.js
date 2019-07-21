/*
place object format:
{
    lat:12.34,
    long:12.34,
    speedMax:15,
    speedMin:10,
    direction:234
}
*/
var weather = {
  refreshInterval: 10800000,  // max time to wait before checking weather again
  savedPlaces: {},
  incompleteCount: 0,

  callAccuWeather: function(place, callback, keyIndex) {
    // Retrieve location key.
    var key = getSecret('accuWeather', 'keys', keyIndex);
    var url =
        'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=' +
        `${key}&q=${place.lat},${place.long}`;
    var that = this;
    console.log('Looking up weather for ' + place.name + ' on accuweather');
    $.ajax({url: url, method: 'GET'}).then(function(response) {
      // Retrieve hourly forecast.
      place.key = response.Key;
      console.log('Got location key ' + place.key + ' for ' + place.name);
      url = 'https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' +
          `${place.key}?apikey=${key}`;
      $.ajax({url: url, method: 'GET'}).then(function(response) {
        console.log('Got hourly weather data for ' + place.name);
        place.hourly = response;
        // Remember when we accessed this data.
        place.accessTime = new Date().getTime();
        // Remember where this data came from.
        place.source = 'accuWeather';
        // Save the data for this place in the savedPlaces object.
        that.savedPlaces[place.name] = place;
        // Decrease incomplete count and call callback if it is 0.
        if (!--that.incompleteCount) callback();
      })
    });
  },

  callDarkSky: function(place, callback, retries, keyIndex) {
    var key = getSecret('darkSky', 'keys', keyIndex);
    var url = 'https://cors-anywhere.herokuapp.com/' +
        `https://api.darksky.net/forecast/${key}/${place.lat},${place.long}` +
        '?exclude=currently,minutely,daily,alerts,flags';
    var that = this;
    console.log('Looking up weather for ' + place.name + ' on dark sky');
    $.ajax({url: url, method: 'GET'})
        .then(function(response) {
          // Store hourly weather data for this place.
          place.hourly = response.hourly.data;
          // Remember when we accessed this data.
          place.accessTime = new Date().getTime();
          // Remember where this data came from.
          place.source = 'darkSky';
          // Save the data for this place in the savedPlaces object.
          that.savedPlaces[place.name] = place;
          // Decrease incomplete count and call callback if it is 0.
          if (!--that.incompleteCount) callback();
        })
        .catch(function(error) {
          if (error.responseJSON &&
              error.responseJSON.error === 'daily usage limit exceeded' &&
              retries--) {
            console.log(
                'Usage limit exceeded on key ' + keyIndex + ', using next key');
            // This key is used up, so we use the next one.
            that.callDarkSky(
                place, callback, retries,
                (keyIndex + 1) % gibberish.darkSky.keys.length);
          } else {
            console.log(error);
            console.log('Error from dark sky, trying accuweather')
            that.callAccuWeather(place, retries, callback);
          }
        });
  },
  // Takes places objects and makes api calls, putting responses in responses
  // object. Calls callback when responses object is full.
  getWeather: function(places, callback) {
    this.incompleteCount = places.length;
    for (var i = 0; i < places.length; ++i) {
      if (this.savedPlaces.hasOwnProperty(places[i].name)) {
        // We already have this place and time saved with wind data.
        places[i] = this.savedPlaces[places[i].name];
        if (new Date().getTime() - places[i].accessTime > this.refreshInterval)
          // Old data is too old, get new data for this place.
          this.callDarkSky(
              places[i], callback, gibberish.darkSky.keys.length,
              gibberish.darkSky.i);
        // Decrease incomplete count and call callback if it is 0.
        if (!--this.incompleteCount) callback();
      } else
        // We don't have data, so we call dark sky to get it.
        this.callDarkSky(
            places[i], callback, gibberish.darkSky.keys.length,
            gibberish.darkSky.i);
    }
  },

  // takes an array of place objects, a minimum wind speed, a maximum wind
  // speed, then renders all the places meeting criteria on the map
  topSpots: function(places, min, max, time) {
    $('#mapResultsTag').text('Checking the weather...');
    var that = this;
    this.getWeather(places, function() {
      window.localStorage.setItem(
          'savedPlaces', JSON.stringify(that.savedPlaces));
      let bestPlaces = [];
      for (let i = 0; i < places.length; i++) {
        // Put current hourly data in speedMax and speedMin
        // Find the index of the hourly data after the time we want.
        var isDarkSky = places[i].source === 'darkSky';
        var j = places[i].hourly.findIndex(
            e => e[isDarkSky ? 'time' : 'EpochDateTime'] > time);
        if (--j < 0) j = 0;
        var current = places[i].hourly[j];
        places[i].speedMin =
            isDarkSky ? current.windSpeed : current.Wind.Speed.value;
        places[i].speedMax =
            isDarkSky ? current.windGust : current.WindGust.Speed.value;
        places[i].windBearing =
            isDarkSky ? current.windBearing : current.Wind.Direction.Degrees;
        // Add any places within wind criteria to a the bestPlaces array.
        if ((places[i].speedMax <= max && places[i].speedMin >= min) ||
            (wind.ignoreMaxWindSpeed && places[i].speedMin >= min)) {
          bestPlaces.push(places[i]);
        }
      }
      // Sort places such that highest minimum wind speed is first in list.
      bestPlaces.sort((a, b) => b.speedMin - a.speedMin);
      // Create map pins for all matching places.
      markPlaces(bestPlaces);
      // Call function to populate text list of places.
      createLocationList(bestPlaces);
    });
  }
};

weather.savedPlaces = JSON.parse(localStorage.getItem('savedPlaces'));
if (!weather.savedPlaces) weather.savedPlaces = {};


// var parks =
// [{lat:34,long:45,speedMax:null,speedMin:null,direction:null},{lat:29,long:93,speedMax:null,speedMin:null,direction:null}];
