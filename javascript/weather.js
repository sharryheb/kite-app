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
    //takes a lattitude and longitude and returns an object with wind speed and gust speed


    getWeather: function (place) {
        var key = '44d4a55b5025e5a21a8ab11202df6b6c';
        var url = `https://api.darksky.net/forecast/${key}/${place.lat},${place.long}`;

        return $.ajax({
            url:url,
            method:'GET'
        });

    },

    //takes an array of place objects, an object with requirements, returns an array of place objects
    topSpots: function(places,min,max) {

        let requests = places.map(this.getWeather);

        Promise.all(requests)
            .then(responses => {
                var bestPlaces = [];
                for (let i =0; i < responses.length; i++) {
                    let p = places[i];
                    let r = responses[i];

                    p.speedMax = r.currently.windGust;
                    p.speedMin = r.currently.windSpeed;
                    p.direction = r.currently.windBearing;

                    if(p.speedMax <== max && p.speedMin >== min) {
                        bestPlaces.push(p);
                    }

                    // console.log(p);
                }
                
                markPlaces(bestPlaces);
            });


    }
};


// var parks = [{lat:34,long:45,speedMax:null,speedMin:null,direction:null},{lat:29,long:93,speedMax:null,speedMin:null,direction:null}];



