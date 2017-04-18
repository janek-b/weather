var apiKey = require('../.env').apiKey;

function Weather() {
}

Weather.prototype.convertTemp = function(temp) {
  var output = "";
  output = output + (temp - 273.15).toFixed(2) + " C / " + ((temp - 273.15) * (9/5) + 32).toFixed(2) + " F";
  return output;
};

Weather.prototype.getWeather = function(city, displayOutput) {
  var self = this;
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
    var condition = "";
    response.weather.forEach(function(weather) {
      condition = condition + " / " + weather.main;
    })
    condition = condition.slice(3);
    var output = {};
    output["city"] = city;
    output["condition"] = condition;
    output["temp"] = self.convertTemp(response.main.temp);
    output["high"] = self.convertTemp(response.main.temp_max);
    output["low"] = self.convertTemp(response.main.temp_min);
    displayOutput(output);
  }).fail(function(error) {
    console.log(error.responseJSON.message);
  });
}




exports.weatherModule = Weather;
