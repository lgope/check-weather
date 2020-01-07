const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => { // home page
    res.render('index', {
        title: 'Weather',
        name: 'Lakshman Gope'
    });
});


app.get('/about', (req, res) => { // about page
    res.render('about', {
        title: 'About Me',
        name: 'Lakshman Gope'
    });
});

app.get('/help', (req, res) => { // help page
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Lakshman Gope'
    });
});


app.get('/weather', (req, res) => { // weather page

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }


    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location,
        shortCode
    } = {}) => {

        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, {forecastData, summary, temperature, precipProbability, humidity, windSpeed}) => {

            if (error) {
                return res.send({
                    error
                });
            }

            res.send({

                forecast: forecastData,
                location,
                shortCode,
                address: req.query.address,
                summary,
                temperature,
                precipProbability,
                humidity,
                windSpeed

            });
        });
    });
});

app.get('/products', (req, res) => { // products page

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        appName: 'Weather-Application',
        errorMessage: 'LOST IN SPACE!! Help article not found.'
    });
});


app.get('*', (req, res) => { // error page
    res.render('404', {
        title: '404',
        appName: 'Weather-Application',
        errorMessage: "LOST IN SPACE !! Hmm, looks like that page doesn't exist."
    });
});


app.listen(port, () => {
    console.log('Server is up on port ' + port);

});