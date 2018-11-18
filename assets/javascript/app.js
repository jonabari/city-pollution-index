// Cities (Easter cities commented out, as the API doesn't handle them. We ahve to find a new API for that)
const cdmx = { name: 'Mexico', lat: '19.4326', lon: '-99.1332', img: 'cdmx.svg' }
const ny = { name: 'New York', lat: '40.7128', lon: '-74.0060', img: 'ny.svg' }
const dallas = { name: 'Dallas', lat: '32.7767', lon: '-96.7970', img: 'dallas.svg' }
const denver = { name: 'Denver', lat: '39.7392', lon: '-104.9903', img: 'denver.svg' }
// const yangon = { name: 'Yangon', lat: '16.8661', lon: '96.1951', img: 'yangon.svg' }
// const shanghai = { name: 'Shanghai', lat: '31.2304', lon: '121.4737', img: 'shanghai.svg' }

// CDMX is hardcoded as the onLoad city for now
let city = cdmx
var modal = document.getElementById('menuModal')

// airNow API call: https://docs.airnowapi.org/CurrentObservationsByLatLon/query
function renderCityAndGetAQI() {

    console.log(city.name)
    $('#city-name').text(city.name)
    $('.backgroundPainting').css('background-image', `url('assets/images/painting-${city.img}')`);

    let key = 'E0A84CAA-864F-41AA-BDF7-100EFA2048E4'
    let URL = `https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${city.lat}&longitude=${city.lon}&distance=25&API_KEY=${key}`

    $.ajax({
        url: URL,
        success: function (res) {
            let AQI = res[1].AQI
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
    displayAQI(AQI)
}

function displayAQI(AQI) {
    if (AQI >= 300) {
        $('#airQualityIndexName').attr('class', 'severe').text('严重污染')
        $('#airQualityIndexNumber').attr('class', 'severe').text('六')
        $('#selectedLocation').attr('class', 'severe')
    } else if (AQI <= 299 && AQI > 201) {
        $('#airQualityIndexName').attr('class', 'heavy').text('重度污染')
        $('#airQualityIndexNumber').attr('class', 'heavy').text('五')
        $('#selectedLocation').attr('class', 'heavy')
    } else if (AQI <= 200 && AQI > 151) {
        $('#airQualityIndexName').attr('class', 'moderate').text('中度污染')
        $('#airQualityIndexNumber').attr('class', 'moderate').text('四')
        $('#selectedLocation').attr('class', 'moderate')
    } else if (AQI <= 150 && AQI > 101) {
        $('#airQualityIndexName').attr('class', 'light').text('轻度污染')
        $('#airQualityIndexNumber').attr('class', 'light').text('三')
        $('#selectedLocation').attr('class', 'light')
    } else if (AQI <= 100 && AQI > 51) {
        $('#airQualityIndexName').attr('class', 'good').text('良')
        $('#airQualityIndexNumber').attr('class', 'good').text('二')
        $('#selectedLocation').attr('class', 'good')
    } else if (AQI <= 51) {
        $('#airQualityIndexName').attr('class', 'excellent').text('优')
        $('#airQualityIndexNumber').attr('class', 'excellent').text('一')
        $('#selectedLocation').attr('class', 'excellent')
    }
}

$('.locationName').on('click', function () {
    let selection = this.getAttribute('data-name')
    switch (selection) {
        case 'cdmx':
            city = cdmx
            $('.openMenu').text('墨西哥成')
            break
        case 'ny':
            city = ny
            $('.openMenu').text('纽约')
            break
        case 'dallas':
            city = dallas
            $('.openMenu').text('达拉斯')
            break
        case 'denver':
            city = denver
            $('.openMenu').text('丹佛')
            break
        // case 'yangon':
        //     city = yangon
        //     $("#locationName").text('仰光')
        //     break
        // case 'shanghai':
        //     city = shanghai
        //     $("#locationName").text('上海')
        //     break
    }
    renderCityAndGetAQI()
    console.log(city.name)
})

// Open Menu
$('.openMenu').on('click', function () {
    modal.style.display = "block"
})

// When the user clicks on <span> (x), close the modal
$('#menuCloseButton').on('click', function () {
    modal.style.display = "none"
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

renderCityAndGetAQI()
