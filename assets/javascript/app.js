// Cities
const mexico = { name: 'Mexico', lat: '19.4326', lon: '-99.1332', dist: '25' }
const newYork = { name: 'New York', lat: '19.4326', lon: '-99.1332', dist: '25' }

// Global variables
var city
var AQI
var haze
var fog

// airNow API call: https://docs.airnowapi.org/CurrentObservationsByLatLon/query
function getPollutionIndex() {
    city = mexico
    $('#city-name').text(city.name)

    let key = 'E0A84CAA-864F-41AA-BDF7-100EFA2048E4'
    let URL = `https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${city.lat}&longitude=${city.lon}&distance=${city.dist}&API_KEY=${key}`

    $.ajax({
        url: URL,
        success: function (res) {
            AQI = res[1].AQI
            $('#pollution-index').text(`${res[1].Category.Name} (AQI: ${AQI})`)
            calculateHazeAndFog()
        }
    })
}

function calculateHazeAndFog() {
    haze = (500 - AQI) * .002
    fog = AQI / 500
    $('#check-haze').text(`Haze: ${haze.toFixed(2)}`)
    $('#check-fog').text(`Fog: ${fog.toFixed(2)}`)
}

$('#select-mexico').on('click', function () {
    console.log('===> I hear ya!')
    $('#display-city').load('assets/html/painting-mexico-city.html')
});

// On Load
getPollutionIndex()