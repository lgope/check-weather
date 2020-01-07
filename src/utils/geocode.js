const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibGFrc2htYW5nb3BlIiwiYSI6ImNqeGhtM2x5bzEyNGMzdmxpZmtzNnpzemsifQ.G5BJ53RpqFm1bZUVM9ngVQ&limit=1';

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {

        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {

            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                shortCode: body.features[0].context[body.features[0].context.length - 1].short_code
            });
        }

    });
};

module.exports = geocode;