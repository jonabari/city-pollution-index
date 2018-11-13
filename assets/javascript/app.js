// Cities
const mexico = { name: 'Mexico', lat: '19.4326', lon: '-99.1332', dist: '25' }
const newYork = { lat: '19.4326', lon: '-99.1332', dist: '25' }

var city

// airNow API call: https://docs.airnowapi.org/CurrentObservationsByLatLon/query
function getPollutionIndex() {
    city = mexico
    $('#city-name').text(city.name)

    let key = 'E0A84CAA-864F-41AA-BDF7-100EFA2048E4'
    let URL = `http://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${city.lat}&longitude=${city.lon}&distance=${city.dist}&API_KEY=${key}`

    $.ajax({
        url: URL,
        success: function (res) {
            $('#pollution-index').text(res[0].Category.Name)
        }
    })
}

getPollutionIndex()