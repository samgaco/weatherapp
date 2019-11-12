/* eslint-env browser */
/* eslint no-unused-vars: [1, {"argsIgnorePattern": "evt"}] */

const domManager = (() => {
  const temperature = document.querySelector('.temperature');
  const humidity = document.querySelector('.humidity');
  const weathertitle = document.querySelector('#weathertitle');
  const key = 'c3e71b244675fb70f2b3fcf42479dbd8';

  const toCelcius = (kelvin) => Math.round(kelvin - 273.15);

  const toFar = (kelvin) => Math.round(32 + (toCelcius(kelvin) * 9) / 5);

  const weather = {
    temperature: null,
    humidity: null,
  };

  const renderData = (cityname) => {
    const api = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}`;

    fetch(api)

      .then((response) => {
        const data = response.json();
        return data;
      })

      .then((data) => {
        weather.temperature = data.main.temp;
        weather.humidity = data.main.humidity;
        let celcius = true;

        temperature.innerHTML = `Temperature: ${toCelcius(weather.temperature)}C/ F`;

        temperature.addEventListener('click', (evt) => {
          if (celcius) {
            temperature.innerHTML = `Temperature: ${toFar(weather.temperature)}F/ C`;
            celcius = false;
          } else {
            temperature.innerHTML = `Temperature: ${toCelcius(weather.temperature)}C/ F`;
            celcius = true;
          }
        });

        humidity.innerHTML = `Humidity: ${weather.humidity}%`;
      })

      .catch(() => {
        temperature.innerHTML = 'Not found. Please introduce another city.';
        humidity.innerHTML = '';
      });
  };

  const AddTitle = (cityname) => {
    weathertitle.textContent = `Weather in ${cityname}`;
  };


  const StartApp = () => {
    document.getElementById('weather-check').addEventListener('click', (evt) => {
      const cityname = document.querySelector('#weather-check-input').value;
      AddTitle(cityname);
      renderData(cityname);
    });
  };

  return { StartApp };
})();

export default domManager;
