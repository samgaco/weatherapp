/* eslint-env browser */
/* eslint no-unused-vars: [1, {"argsIgnorePattern": "evt"}] */

const domManager = (() => {

  const temperature = document.querySelector('.temperature')
  const humidity = document.querySelector('.humidity')
  const weathertitle = document.querySelector('#weathertitle')
  const key = 'c3e71b244675fb70f2b3fcf42479dbd8';

  const toCelcius = (kelvin) => {
    return Math.round(kelvin - 273.15)
  }

  const toFar = (kelvin) => {
    return Math.round(32+(toCelcius(kelvin)*9)/5)
  }

  let weather = {
    temperature: null,
    humidity: null
  }

  const renderData = (cityname) => {

    let api = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}`;

    fetch(api)

      .then(function (response) {
        let data = response.json()
        console.log(data)
        return data;
      })

      .then(function (data) {
        weather.temperature = data.main.temp
        weather.humidity = data.main.humidity
        let celcius = true

        temperature.innerHTML = `Temperature: ${toCelcius(weather.temperature)}C/ F`;

        temperature.addEventListener('click', (evt) => {

          if(celcius){
            temperature.innerHTML = `Temperature: ${toFar(weather.temperature)}F/ C`;
            celcius = false;
          }else{
            temperature.innerHTML = `Temperature: ${toCelcius(weather.temperature)}C/ F`;
            celcius = true;
          }  
        });

        humidity.innerHTML = `Humidity: ${weather.humidity}%`;
      })


  }

  const AddTitle = (cityname) => {
    weathertitle.textContent = `Weather in ${cityname}`
  }



  const StartApp = () => {

    document.getElementById(`weather-check`).addEventListener('click', (evt) => {

      let cityname = document.querySelector('#weather-check-input').value
      AddTitle(cityname);
      renderData(cityname);

    });
  }

  return { StartApp }
})();

export default domManager;