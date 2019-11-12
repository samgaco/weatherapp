/* eslint-env browser */
/* eslint no-unused-vars: [1, {"argsIgnorePattern": "evt"}] */

const domManager = (() => {

    const temperature = document.querySelector('.temperature')
    const weathertitle = document.querySelector('#weathertitle')
    const key = 'c3e71b244675fb70f2b3fcf42479dbd8';

    const toCelcius = (kelvin) => {
      return Math.round(kelvin - 273.15)
    }
  
    const renderData = (cityname) =>{
              let api = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}`;
  
              fetch(api)
  
              .then(function (response) {
                let data = response.json()
                console.log(data)
                return data;
              })
              .then(function (data) {
                temperature.innerHTML = toCelcius(data.main.temp);
              })   }


    const AddTitle = (cityname) =>{
        weathertitle.textContent = `Weather in ${cityname}`
      }

    const StartApp =(cityname) =>{
        AddTitle(cityname);
        renderData(cityname);
    }

    return{StartApp}
})();

export default domManager;