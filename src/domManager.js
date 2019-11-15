/* eslint-env browser */
/* eslint no-unused-vars: [1, {"argsIgnorePattern": "evt"}] */

const domManager = (() => {
  const temperature = document.querySelector('.temperature');
  const humidity = document.querySelector('.humidity');
  const weathertitle = document.querySelector('#weathertitle');
  const key = 'c3e71b244675fb70f2b3fcf42479dbd8';

  const weatherStruct = () => {
    const weather = {
      temperature: null,
      humidity: null,
    };
    return weather;
  };

  const renderData = (cityname) => {
    let celsius = true;
    let metric = 'Metric';
    const weather = weatherStruct();
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}&units=${metric}`;

    fetch(api)

      .then((response) => {
        const data = response.json();
        return data;
      })

      .then((data) => {
        weather.temperature = data.main.temp;
        weather.humidity = data.main.humidity;

        temperature.innerHTML = `Temperature: ${weather.temperature}C/ F`;

        temperature.addEventListener('click', (evt) => {
          if (celsius) {
            celsius = false;
            metric = 'Imperial';
            api = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}&units=${metric}`;
            fetch(api)

              .then((response) => {
                const data2 = response.json();
                return data2;
              })

              .then((data2) => {
                weather.temperature = data2.main.temp;
                weather.humidity = data2.main.humidity;

                temperature.innerHTML = `Temperature: ${weather.temperature}C/ F`;
              });
          } else {
            celsius = true;
            metric = 'Metric';
            api = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}&units=${metric}`;
            fetch(api)

              .then((response) => {
                const data3 = response.json();
                return data3;
              })

              .then((data3) => {
                weather.temperature = data3.main.temp;
                weather.humidity = data3.main.humidity;

                temperature.innerHTML = `Temperature: ${weather.temperature}C/ F`;
              });
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
