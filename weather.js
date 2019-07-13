var weather = {
    //takes a lattitude and longitude and returns an object with wind speed and gust speed


    getWeather: function (lat,long) {
        var key = '44d4a55b5025e5a21a8ab11202df6b6c';
        var url = 'https://api.darksky.net/forecast/' + key + '/' + lat + ',' + long;
        var speed,gust,dir;

        $.ajax({
            url:url,
            method:'GET'
        }).then(function(response){
            console.log(JSON.stringify(response));
            var speed,gust,dir;

            speed = response.currently.windSpeed;
            gust = response.currently.windGust;
            dir = response.currently.windBearing;
        });



        // return {speedMax:gust,speedMin:speed,direction:dir};

        // $.get(URL,function(response) {
        //     var speed,gust,dir;

        //     speed = response.currently.windSpeed;
        //     gust = response.currently.windGust;
        //     dir = response.currently.windBearing;

        //     return {speedMax:gust,speedMin:speed,direction:dir};
        // });
    },

    //takes an array of place objects, an object with requirements, and a number of requested results, returns an array of place objects
    topSpots: function(places, requirements, numRequested) {

    }
};

console.log(weather.getWeather(37.8267,-122.4233));