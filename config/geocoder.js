const NodeGeoder = require("node-geocoder");

// const geocoderProvider = require('./keys').geocoderProvider;
// const geocoderAPIKey = require('./keys').geocoderAPIKey;

const options = {
    provider: "google",
    httpAdapter: "https",
    apiKey:"",
    formatter: null
}

const geocoder = NodeGeoder(options);

module.exports = geocoder;