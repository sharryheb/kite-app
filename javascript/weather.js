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

    //takes a place object and makes an API call for weather data on the object's latitude and longitude, returns a promise to resolve when the data comes back
    getWeather: function (place,time) {
        const key = '44d4a55b5025e5a21a8ab11202df6b6c';
        let url = `https://api.darksky.net/forecast/${key}/${place.lat},${place.long},${time}?exclude=flags`;

        return $.ajax({
            url:url,
            method:'GET'
        });

    },

    //takes an array of place objects, a minimum wind speed, a maximum wind speed, then renders all the places meeting criteria on the map
    topSpots: function(places,min,max,time) {

        //make an arrat of promises
        let requests = [];//places.map(this.getWeather);
        
        for (let i = 0; i < places.length;i++) {
            requests.push(this.getWeather(places[i],time));
        }


        //once all API calls are back, parse their data into our place objects
        Promise.all(requests)
            .then(responses => {
                let bestPlaces = [];
                for (let i =0; i < responses.length; i++) {
                    let p = places[i];
                    let r = responses[i];

                    p.speedMax = r.currently.windGust;
                    p.speedMin = r.currently.windSpeed;
                    p.direction = r.currently.windBearing;

                    //add any places within wind criteria to a the bestPlaces array
                    if((p.speedMax <= max && p.speedMin >= min) || (wind.ignoreMaxWindSpeed && p.speedMin >= min)) {
                        bestPlaces.push(p);
                    }

                    // console.log(p);
                }
                
                //create map pins for all matching places
                markPlaces(bestPlaces);
                //TODO: call function to populate text list of places, or do it here
            });


    }
};


// var parks = [{lat:34,long:45,speedMax:null,speedMin:null,direction:null},{lat:29,long:93,speedMax:null,speedMin:null,direction:null}];



