var wind = {
    speedMax: 0,
    speedMin: 0,
    direction: "N"
};

var locationProp = {
    name: "",
    lat: 0.00,
    long: 0.00,
    address: ""
};

var locationResults = [ /* INTENT: ARRAY OF LOCATIONS */ ];

var requestFamilyFriendly = false;
var requestDate = new Date();
var requestRadius = 0;
var unitsImperial = true;
