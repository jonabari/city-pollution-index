// Cities (Easter cities commented out, as the API doesn't handle them. We ahve to find a new API for that)
const cdmx = { name: 'Mexico', lat: '19.4326', lon: '-99.1332', img: 'cdmx.svg' }
const ny = { name: 'New York', lat: '40.7128', lon: '-74.0060', img: 'ny.svg' }
const dallas = { name: 'Dallas', lat: '32.7767', lon: '-96.7970', img: 'dallas.svg' }
const denver = { name: 'Denver', lat: '39.7392', lon: '-104.9903', img: 'denver.svg' }
// const yangon = { name: 'Yangon', lat: '16.8661', lon: '96.1951', img: 'yangon.svg' }
// const shanghai = { name: 'Shanghai', lat: '31.2304', lon: '121.4737', img: 'shanghai.svg' }


let city = ny

// airNow API call: https://docs.airnowapi.org/CurrentObservationsByLatLon/query
function getPollutionIndex() {

    $('#city-name').text(city.name)
    $('.backgroundPainting').css('background-image', `url('assets/images/painting-${city.img}')`);

    let key = 'E0A84CAA-864F-41AA-BDF7-100EFA2048E4'
    let URL = `https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${city.lat}&longitude=${city.lon}&distance=25&API_KEY=${key}`

    $.ajax({
        url: URL,
        success: function (res) {
            let AQI = res[0].AQI
            $('#pollution-index').text(`${res[1].Category.Name} (AQI: ${AQI})`)
            calculateHazeAndFog(AQI)
        }
    })
}

function calculateHazeAndFog(AQI) {
    haze = (500 - AQI) * .002
    fog = AQI / 500
    $('#check-haze').text(`Haze: ${haze.toFixed(3)}`)
    $('#check-fog').text(`Fog: ${fog.toFixed(3)}`)
    airQualityIndex(AQI)
}

function airQualityIndex(AQI) {
    if (AQI >= 300) {
        $('#airQualityIndexName').addClass('severe').text('严重污染')
        $('#airQualityIndexNumber').addClass('severe').text('六')
        $('#locationName').addClass('severe')
    } else if (AQI <= 299 && AQI > 201) {
        $('#airQualityIndexName').addClass('heavy').text('重度污染')
        $('#airQualityIndexNumber').addClass('heavy').text('五')
        $('#locationName').addClass('heavy')
    } else if (AQI <= 200 && AQI > 151) {
        $('#airQualityIndexName').addClass('moderate').text('中度污染')
        $('#airQualityIndexNumber').addClass('moderate').text('四')
        $('#locationName').addClass('moderate')
    } else if (AQI <= 150 && AQI > 101) {
        $('#airQualityIndexName').addClass('light').text('轻度污染')
        $('#airQualityIndexNumber').addClass('light').text('三')
        $('#locationName').addClass('light')
    } else if (AQI <= 100 && AQI > 51) {
        $('#airQualityIndexName').addClass('good').text('良')
        $('#airQualityIndexNumber').addClass('good').text('一')
        $('#locationName').addClass('good')
    } else if (AQI <= 51) {
        $('#airQualityIndexName').addClass('excellent').text('优')
        $('#airQualityIndexNumber').addClass('excellent').text('二')
        $('#locationName').addClass('excellent')
    }
}

function translateCity() {
    switch (city.name) {
        case 'Mexico':
            $("#locationName").text('墨西哥')
            break
        case 'New York':
            $("#locationName").text('纽约')
            break
        case 'Dallas':
            $("#locationName").text('达拉斯')
            break
        case 'Denver':
            $("#locationName").text('丹佛')
            break
        // case 'Yangon':
        //     $("#locationName").text('仰光')
        //     break
        // case 'Shanghai':
        //     $("#locationName").text('上海')
        //     break
    }
}

// On Load
getPollutionIndex()
translateCity()
