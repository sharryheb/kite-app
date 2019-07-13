var weather = {
    //takes a lattitude and longitude and returns an object with wind speed and gust speed


    function getWeather (lat,long) {
        var key = 44d4a55b5025e5a21a8ab11202df6b6c;
        var URL = `https://api.darksky.net/forecast/{key}/{lat},{long}`;

        $.get(URL,function(response) {
            
        });
    }

    //takes an array of place objects, an object with requirements, and a number of requested results, returns an array of place objects
    function topSpots(places, requirements, numRequested) {

    }
};