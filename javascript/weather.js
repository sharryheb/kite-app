


var weather = {
    //takes a lattitude and longitude and returns an object with wind speed and gust speed


    getWeather: function (place) {
        var key = '44d4a55b5025e5a21a8ab11202df6b6c';
        var url = `https://api.darksky.net/forecast/${key}/${place.lat},${place.long}`;

        $.ajax({
            url:url,
            method:'GET'
        }).then(function(response){
            // console.log(JSON.stringify(response));

            place.speed = response.currently.windSpeed;
            place.gust = response.currently.windGust;
            place.dir = response.currently.windBearing;
        });

        console.log(place);

    },

    //takes an array of place objects, an object with requirements, and a number of requested results, returns an array of place objects
    topSpots: function(places) {
        // for (let i = 0; i < places.length; i++) {
        //     let p = places[i];
        //     this.getWeather(p).then(response => {
        //         p.speedMax = response.currently.windGust;
        //         p.speedMin = response.currently.windSpeed;
        //         p.direction = response.currently.windBearing;
        //     });
        // }


        let requests = places.map(this.getWeather);

        Promise.all(requests)
            .then(responses => {
                for (let i =0; i < responses.length; i++) {
                    let p = places[i];
                    let r = responses[i];

                    p.speedMax = r.currently.windGust;
                    p.speedMin = r.currently.windSpeed;
                    p.direction = r.currently.windBearing;

                    console.log(p);
                }

                

            });


    }
};


var parks = [{lat:34,long:45,speedMax:null,speedMin:null,direction:null},{lat:29,long:93,speedMax:null,speedMin:null,direction:null}];

weather.getWeather(parks[0]);


