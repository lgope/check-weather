const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8e63dd69464247667574c0c46c9e1cfd/' + latitude + ',' + longitude;

    request({
        url,
        json: true
    }, (error, {
        body
    }) => { // json is true for automatically parse the data to json

        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                forecastData :`${body.daily.data[0].summary} It is currently ${Math.floor((body.currently.temperature-32)*(5/9))} °C out. This high today is ${Math.floor((body.daily.data[0].temperatureHigh-32)*(5/9))} °C with a low of ${Math.floor((body.daily.data[0].temperatureLow-32)*(5/9))} °C. There is a ${body.currently.precipProbability}% chance of rain.`,

                summary: `${body.currently.summary}`,
                temperature: `${Math.floor((body.currently.temperature-32)*(5/9))}`,
                precipProbability: `${body.currently.precipProbability}%`,
                humidity: `${body.currently.humidity * 100}%`,
                windSpeed: `${Math.floor(body.currently.windSpeed)} km/h`
            });
        }
    }); // new%20york

};

module.exports = forecast;