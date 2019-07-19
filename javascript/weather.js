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
  savedPlaces: {},
  incompleteCount: 0,

  callDarkSky: function(place, time, callback, keyIndex) {
    var key = getSecret('darkSky', 'keys', keyIndex);
    var url = `https://api.darksky.net/forecast/${key}/${place.lat},${
        place.long},${time}?exclude=flags`;
    var that = this;
    $.ajax({url: url, method: 'GET'})
        .then(function(response) {
          let r = response;

          // Store wind data for this place.
          place.speedMax = r.currently.windGust;
          place.speedMin = r.currently.windSpeed;
          place.direction = r.currently.windBearing;
          // Save the data for this place in the savedPlaces object.
          that.savedPlaces[place.id] = place;
          // Decrease incomplete count and call callback if it is 0.
          if (!--that.incompleteCount) callback();
        })
        .catch(function(error) {
          if (error.responseJSON.error === 'daily usage limit exceeded')
            // This key is used up, so we use the next one.
            that.callDarkSky(
                place, time, callback,
                (keyIndex + 1) % gibberish.darkSky.keys.length);
        });
  },
  // Takes places objects and makes api calls, putting responses in responses
  // object. Calls callback when responses object is full.
  getWeather: function(places, time, callback) {
    this.incompleteCount = places.length;
    for (var i = 0; i < places.length; ++i) {
      // Give this place an ID based on its name and the time.
      places[i].id = places[i].name + String(time);
      if (this.savedPlaces.hasOwnProperty(places[i].id)) {
        // We already have this place and time saved with wind data.
        places[i] = this.savedPlaces[places[i].id];
        // Decrease incomplete count and call callback if it is 0.
        if (!--this.incompleteCount) callback();
      } else
        // We don't have data, so we call dark sky to get it.
        this.callDarkSky(places[i], time, callback, gibberish.darkSky.i);
    }
  },

  // takes an array of place objects, a minimum wind speed, a maximum wind
  // speed, then renders all the places meeting criteria on the map
  topSpots: function(places, min, max, time) {
    console.log('Getting Weather');
    this.getWeather(places, time, function() {
      console.log('Got Weather');
      let bestPlaces = [];
      for (let i = 0; i < places.length; i++) {

        // add any places within wind criteria to a the bestPlaces array
        if ((places[i].speedMax <= max && places[i].speedMin >= min) ||
            (wind.ignoreMaxWindSpeed && places[i].speedMin >= min)) {
          bestPlaces.push(places[i]);
        }
      }
      // sort places such that highest minimum wind speed is first in list
      bestPlaces.sort((a, b) => b.speedMin - a.speedMin);
      // create map pins for all matching places
      markPlaces(bestPlaces);
      // call function to populate text list of places
      createLocationList(bestPlaces);
    });
  }
};


// var parks =
// [{lat:34,long:45,speedMax:null,speedMin:null,direction:null},{lat:29,long:93,speedMax:null,speedMin:null,direction:null}];
