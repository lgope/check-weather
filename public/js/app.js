const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageZero = document.querySelector('#message-0');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const countryflags = document.querySelector('img');


// const hourlySummary = document.querySelector('.hourly-summary');
// const celsiusValue = document.querySelector('.celsius-value');
// const celsiusSymbol = document.querySelector('.celsius-symbol');
// const precipitation = document.querySelector('.precipitation-value');
// const humidity = document.querySelector('.humidity-value"');
// const windSpeed = document.querySelector('.wind-value');

weatherForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const location = search.value;

    messageZero.textContent = 'Loading...';
    messageOne.textContent = '';
    messageTwo.textContent = '';
    countryflags.src = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageZero.textContent = '';
                messageOne.textContent = data.error;
            } else {
                messageZero.textContent = '';
                messageOne.textContent = data.location;
                countryflags.src = 'https://www.countryflags.io/' + data.shortCode + '/flat/64.png';

                // hourlySummary.textContent = data.summary;
                // celsiusValue.textContent = data.temperature;
                // // celsiusSymbol.textContent = '°C';
                // precipitation.textContent = data.precipProbability;
                // humidity.textContent = data.humidity;
                // windSpeed.textContent = data.windSpeed;

                messageTwo.textContent = data.forecast;
                console.log(data.shortCode);

            }
        });
    });
});