var apiKey = require('../.env').apiKey;

function Weather() {
}

Weather.prototype.convertTemp = function(temp) {
  var output = "";
  output = output + temp + " C / " + (temp * (9/5) + 32).toFixed(2) + " F";
  return output;
};

Weather.prototype.getWeather = function(city, displayOutput) {
  var self = this;
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + apiKey).then(function(response) {
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

Weather.prototype.getForecast = function (city, displayForecast) {
  var self = this;
  $.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=metric&cnt=5&appid=' + apiKey).then(function(response) {
    var output = [];
    response.list.forEach(function(day) {
      var condition = "";
      day.weather.forEach(function(weather) {
        condition = condition + " / " + weather.main;
      })
      condition = condition.slice(3);
      var dayForecast = {};
      dayForecast["day"] = moment(day.dt, "X").format("dddd");
      dayForecast["condition"] = condition;
      dayForecast["high"] = self.convertTemp(day.temp.max);
      dayForecast["low"] = self.convertTemp(day.temp.min);
      output.push(dayForecast);
    })
    displayForecast(output);
  }).fail(function(error) {
    console.log(error.responseJSON.message);
  });
};

exports.weatherModule = Weather;
