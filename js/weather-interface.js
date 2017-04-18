var Weather = require('../js/weather.js').weatherModule;

var displayOutput = function(output) {
  for (var i in output) {
    $("#current ."+i).text(output[i]);
  }
}

var displayForecast = function(output) {
  for (var i = 0; i < output.length; i++) {
    for (var j in output[i]) {
      $("#"+(i+1)+" ."+j).text(output[i][j]);
    }
  }
}

$(function() {
  var newWeather = new Weather();
  $("#getWeather").click(function() {
    var location = $("#location").val();
    $("#location").val("");
    newWeather.getWeather(location, displayOutput);
    newWeather.getForecast(location, displayForecast);
  })
})
