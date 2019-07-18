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
  responses: {},
  // Takes places objects and makes api calls, putting responses in responses
  // object. Calls callback when responses object is full.
  getWeather: function(places, time, callback) {
    var completedCount = 0;
    for (var i = 0; i < places.length; ++i) {
      const key = getSecret('darkSky', 'key');
      let url = `https://api.darksky.net/forecast/${key}/${places[i].lat},${
          places[i].long},${time}?exclude=flags`;
      places[i].key = places[i].name + String(time);
      if (this.responses.hasOwnProperty(places[i].key)) {
        console.log('Already had weather for ' + places[i].key);
        if (++completedCount === places.length) callback(this.responses);
      } else {
        console.log('Looking up weather for ' + places[i].key);
        var that = this;
        var responseKey = places[i].key;
        $.ajax({url: url, method: 'GET'}).then(function(response) {
          console.log(that);
          that.responses[responseKey] = response;
          if (++completedCount === places.length) callback(that.responses);
        });
      }
    }
  },

  // takes an array of place objects, a minimum wind speed, a maximum wind
  // speed, then renders all the places meeting criteria on the map
  topSpots: function(places, min, max, time) {
    console.log('Getting weather');
    this.getWeather(places, time, function(responses) {
      console.log(places);
      console.log(responses);
      let bestPlaces = [];
      for (let i = 0; i < places.length; i++) {
        let r = responses[places[i].key];

        places[i].speedMax = r.currently.windGust;
        places[i].speedMin = r.currently.windSpeed;
        places[i].direction = r.currently.windBearing;

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
