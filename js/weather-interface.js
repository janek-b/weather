var Weather = require('../js/weather.js').weatherModule;

var displayOutput = function(output) {
  for (var i in output) {
    $("#"+i).text(output[i]);
  }
}

$(function() {
  var newWeather = new Weather();
  $("#getWeather").click(function() {
    var location = $("#location").val();
    $("#location").val("");
    newWeather.getWeather(location, displayOutput);
  })
})
