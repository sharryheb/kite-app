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

var locationResults = [];

var requestFamilyFriendly = false;
var requestDate = Date.now();
var requestRadius = 0;
var unitsImperial = true;
