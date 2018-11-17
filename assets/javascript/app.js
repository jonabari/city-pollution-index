// NOTE: What if express to send over the cities!

// Cities
const mexicoCity = { name: 'Mexico', lat: '19.4326', lon: '-99.1332', dist: '25' }
const newYork = { name: 'New York', lat: '19.4326', lon: '-99.1332', dist: '25' }

// Global variables
var city
var AQI
var haze
var fog
let locationName;


// airNow API call: https://docs.airnowapi.org/CurrentObservationsByLatLon/query
function getPollutionIndex() {
    city = mexicoCity
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
    $('#check-haze').text(`Haze: ${haze.toFixed(3)}`)
    $('#check-fog').text(`Fog: ${fog.toFixed(3)}`)
}

$('#select-mexico').on('click', function () {
    console.log('===> I hear ya!')
})

function airQualityIndex() {
  if (AQI >= 300){
    document.getElementById("airQualityIndexName").className = "severe";
    document.getElementById("airQualityIndexName").innerHTML = "严重污染";
    document.getElementById("airQualityIndexNumber").className = "severe";
    document.getElementById("airQualityIndexNumber").innerHTML = "六";
    document.getElementById("locationName").className = "severe";
  } else if (AQI <= 299 && AQI > 201 ){
    document.getElementById("airQualityIndexName").className = "heavy";
    document.getElementById("airQualityIndexName").innerHTML = "重度污染";
    document.getElementById("airQualityIndexNumber").className = "heavy";
    document.getElementById("airQualityIndexNumber").innerHTML = "五";
    document.getElementById("locationName").className = "heavy";
  } else if (AQI <= 200 && AQI > 151 ){
    document.getElementById("airQualityIndexName").className = "moderate";
    document.getElementById("airQualityIndexName").innerHTML = "中度污染";
    document.getElementById("airQualityIndexNumber").className = "moderate";
    document.getElementById("airQualityIndexNumber").innerHTML = "四";
    document.getElementById("locationName").className = "moderate";
  } else if (AQI <= 150 && AQI > 101 ){
    document.getElementById("airQualityIndexName").className = "light";
    document.getElementById("airQualityIndexName").innerHTML = "轻度污染";
    document.getElementById("airQualityIndexNumber").className = "light";
    document.getElementById("airQualityIndexNumber").innerHTML = "三";
    document.getElementById("locationName").className = "light";
  } else if (AQI <= 100 && AQI > 51 ){
    document.getElementById("airQualityIndexName").className = "good";
    document.getElementById("airQualityIndexName").innerHTML = "良";
    document.getElementById("airQualityIndexNumber").className = "good";
    document.getElementById("airQualityIndexNumber").innerHTML = "二";
    document.getElementById("locationName").className = "good";
  } else {
    document.getElementById("airQualityIndexName").className = "excellent";
    document.getElementById("airQualityIndexName").innerHTML = "优";
    document.getElementById("airQualityIndexNumber").className = "excellent";
    document.getElementById("airQualityIndexNumber").innerHTML = "一";
    document.getElementById("locationName").className = "excellent";
  }
}

function translateCity () {
  locationName = city;
    switch (locationName) {
      case mexicoCity:
      document.querySelector("#locationName").innerHTML = '墨西哥';
      break;

      case newYork:
      document.querySelector("#locationName").innerHTML = '纽约';
      break;

      case dallas:
      document.querySelector("#locationName").innerHTML = '达拉斯';
      break;

      case yangon:
      document.querySelector("#locationName").innerHTML = '仰光';
      break;

      case denver:
      document.querySelector("#locationName").innerHTML = '丹佛';
      break;
    }
}

// On Load
getPollutionIndex()
airQualityIndex()
translateCity()
