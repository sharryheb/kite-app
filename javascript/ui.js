
var wind = {
    speedMax: 0,
    speedMin: 0,
    direction: "N",
    ignoreMaxWindSpeed: false
};

var locationProp = {
    name: "",
    lat: 0,
    long: 0,
    address: ""
};

var geoLocatedAddress = {
    street: "",
    city: "",
    state: "",
    zip: ""
};

var locationResults = [];
var positionForMap = null;
var requestRadius = 5;

var nowDateTime = new Date();
var requestDateTime = null;
var windSpeedSlider = null;
var radiusSlider = null;


$(document).ready(function () {

    nowDateTime = roundUpToHalfHour(nowDateTime);
    $("#datetimepicker").datetimepicker({
        startDate: nowDateTime,
        onChangeDateTime: SetRequestedDate,
        minDate: 0,
        format: 'm/d/Y g:i A',
        formatDate: "m/d/Y",
        formatTime: "g:i A",
        value: nowDateTime,
        hours12: false,
        step: 30,
        defaultDate: nowDateTime,
        defaultTime: nowDateTime,
        validateOnBlur: false
    });
    $.datetimepicker.setLocale('en');
    $("datetimepicker").text(nowDateTime);

    windSpeedSlider = document.getElementById('windSlider');
    radiusSlider = document.getElementById('radiusSlider');

    noUiSlider.create(windSpeedSlider, {
        start: [5, 20],
        connect: true,
        range: {
            'min': 0,
            'max': 40
        },
        step: 5,
        pips: {
            mode: 'steps',
            density: 5
        },

        format: {
            to: function (value) {
                return parseInt(value);
            },
            from: function (value) {
                return Number(value);
            }
        }
    });

    noUiSlider.create(radiusSlider, {
        start: [5],
        connect: true,
        range: {
            'min': 0,
            'max': 20
        },
        step: 1,
        pips: {
            mode: 'count',
            values: 5,
            density: 5,
            stepped: true
        },

        format: {
            to: function (value) {
                return parseInt(value);
            },
            from: function (value) {
                return Number(value);
            }
        }
    });

    windSpeedSlider.noUiSlider.on('end', function (values, handle) {
        if (handle === 0)
            wind.speedMin = values[0];
        if (handle === 1)
            wind.speedMax = values[1];
    });

    windSpeedSlider.noUiSlider.on('update', function (values) {
        $("#curWind").text(values[0] + " to " + values[1] + " mph");
    });

    radiusSlider.noUiSlider.on('end', function (values) {
        requestRadius = parseInt(values[0]);
    });

    radiusSlider.noUiSlider.on('update', function (values) {
        $("#curRadius").text(values[0] + " miles");
    });

    if ('geolocation' in navigator)
        navigator.geolocation.getCurrentPosition(getAddressFromLatLong);
    //else
    //    createMap();

});

$("#search").click(function () {
    $("#map").html("");
    $("#locationList").html("");
    getLatLongFromAddress($("#address").val());

    $("#inputScreen").addClass("hide");
    $("#results").removeClass("hide");
});

$("#redoSearch").click(function () {
    setTimeout(function () { map.updateSize(); }, 200);
    $("#results").addClass("hide");
    $("#inputScreen").removeClass("hide");
});

$("#ignoreMaxWind").click(function () {
    if ($(event.target).attr("checked")) {
        $("#ignoreMaxWind").attr("checked", false);
        wind.ignoreMaxWindSpeed = false;
    }
    else {
        $("#ignoreMaxWind").attr("checked", true);
        wind.ignoreMaxWindSpeed = true;
    }
});

function SetRequestedDate(dateString) {
    requestDateTime = Math.round((new Date(dateString)).getTime() / 1000);
};

function createLocationList() {
    for (var i = 0; i < parks.length; i++) {
        var listItem = $("<a>");
        listItem.addClass("collection-item teal-text text-lighten-2");
        listItem.attr("href", "#!");
        listItem.text(parks[i].name);
        $("#locationList").append(listItem);
    }
}

function roundUpToHalfHour(time) {
    var timeToReturn = new Date(time);

    timeToReturn.setMilliseconds(Math.round(time.getMilliseconds() / 1000) * 1000);
    timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
    timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 30) * 30);
    return timeToReturn;
};

function getAddressFromLatLong(position) {
    if (position && position.coords) {
        createMap(position);
    }
    fetch("http://www.mapquestapi.com/geocoding/v1/reverse?key=zeGKwPqmtYulJwF8gftOgbJGVaJaJrWc&location=" + position.coords.latitude + "," + position.coords.longitude)
        .then(function (response) {
            response.json()
                .then(function (parsedJson) {
                    var loc = parsedJson.results[0].locations[0];
                    geoLocatedAddress.street = loc.street;
                    geoLocatedAddress.city = loc.adminArea5;
                    geoLocatedAddress.state = loc.adminArea3;
                    geoLocatedAddress.zip = loc.postalCode;

                    $("#address").val(loc.street + "  " + loc.adminArea5 + ", " + loc.adminArea3 + " " + loc.postalCode);

                });
        })
        .catch(function (error) {
            console.log(error);
        });
};

function getLatLongFromAddress() {
    fetch("http://www.mapquestapi.com/geocoding/v1/address?key=zeGKwPqmtYulJwF8gftOgbJGVaJaJrWc&location=" + $("#address").val())
        .then(function (response) {
            response.json()
                .then(function (parsedJson) {
                    var loc = parsedJson.results[0].locations[0];

                    positionForMap = {
                        coords: {
                            latitude: loc.latLng.lat,
                            longitude: loc.latLng.lng
                        }
                    };

                    if (!map) {
                        createMap(positionForMap);
                    }
                });
        })
        .catch(function (error) {
            console.log(error);
        });
};