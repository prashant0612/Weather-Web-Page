var inputElement= document.getElementById('myInput');
var inputouterbox = document.getElementById('inp-btn');
var weatherDetails = document.getElementById('weather-details');
var dayforcast = document.getElementById('dayforcast');
var fivedayforcase = document.getElementById('fivedayforcast');


inputElement.addEventListener('focus', function(){
  inputouterbox.style.boxShadow = '0 0 20px white';
})
inputElement.addEventListener('blur', function(){
  inputouterbox.style.boxShadow = '0 0 10px white';
})
function handleInput() {
  var inputValue = inputElement.value;
  inputouterbox.style.boxShadow = '0 0 20px white';
  weatherDetails.style.display = "flex";
  dayforcast.style.display = "block";
  fivedayforcase.style.display = "flex";


  const apiKey = '4e13120cf71ced98bb0b83db4a8624fe';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${apiKey}`;


  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Log the result to see its structure

      // FOR CLOUD
      const iconMapping = {
        '01d': '<img src="./weather icon/animated/day.svg">',   // clear sky day
        '01n': '<img src="./weather icon/animated/night.svg">',
        '02d': '<img src="./weather icon/animated/cloudy-day-1.svg">',
        '02n': '<img src="./weather icon/animated/cloudy-night-1.svg">',
        '03d': '<img src="./weather icon/animated/cloudy.svg">',
        '03n': '<img src="./weather icon/animated/cloudy.svg">',
        '04d': '<img src="./weather icon/animated/cloudy.svg">',
        '04n': '<img src="./weather icon/animated/cloudy.svg">',
        '09d': '<img src="./weather icon/animated/rainy-7.svg">',
        '09n': '<img src="./weather icon/animated/rainy-7.svg">',
        '10d': '<img src="./weather icon/animated/rainy-3.svg">',
        '10n': '<img src="./weather icon/animated/rainy-7.svg">',
        '11d': '<img src="./weather icon/animated/thunder.svg">',
        '11n': '<img src="./weather icon/animated/thunder.svg">',
        '13d': '<img src="./weather icon/animated/snowy-3.svg">',
        '13n': '<img src="./weather icon/animated/snowy-6.svg">',
        '50d': '50d.png',
        '50n': '50n.png'
      };

      const city = data.city;// whole city details ->lat,lon,timezone,sunrise,sunset
      const datalist = data.list; //whole whether report list thik hai

      function kalToCel(temp){
        return Math.floor(temp - 273.15);// converting temp - kelvin to celcius 
      }
      
      function extractTime(time){
        return time.split(' ')[1].slice(0, 5); //extracting time form date and time
      }
      
      function extractDate(DateAndTime){
        return DateAndTime.split(' ')[0];
      }


      function fetchDay(givendate){
        let date = new Date(givendate);
        let weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        let dayIndex = date.getDay();
        return weekdays[dayIndex];
      }
      
      function convertHumidityToPercentage(apiValue) {
        const maxValue = 100; // Maximum value for humidity is usually 100
        const percentage = (apiValue / maxValue) * 100;
        return percentage;
      }

      function convertVisiblityToMiles(meters) {
        const metersInOneMile = 1609.34; // 1 mile is approximately 1609.34 meters
        return Math.floor(meters / metersInOneMile);
      }

      function convertWindSpeedToMph(speedMps) {
        const mph = speedMps * 2.23694;
        return Math.floor(mph);
      }

      const temperature = document.querySelector('.deg');
      const cityElement = document.querySelector('.location');
      const weatherIconElement = document.querySelector('.icon');

      const main1 = document.querySelector('.main1');
      const main2 = document.querySelector('.maintwo');
      const main3 = document.querySelector('.mainthree');
      const main4 = document.querySelector('.mainfour');
      const main5 = document.querySelector('.mainfive');
      const main6 = document.querySelector('.mainsix');

      const today = document.querySelector('.today');
      const day1 = document.querySelector('.day1');
      const day2 = document.querySelector('.day2');
      const day3 = document.querySelector('.day3');
      const day4 = document.querySelector('.day4');

      //START WEATHER DETAILS
      const feels_like = document.querySelector('.feels-like');
      const humidity = document.querySelector('.humidity');
      const pressure = document.querySelector('.pressure');
      const visiblity = document.querySelector('.visiblity');
      const wind_speed = document.querySelector('.wind-speed');
      const population = document.querySelector('.population');
      // END WEATHER DETAILS
      
      


      const temp = datalist[0].main.temp; //fatching current temp of the city
      const weatherNow = datalist[0].weather[0].icon;
      

      var forcast2hr =datalist[1].dt_txt;
      var forcast3hr =datalist[2].dt_txt;
      var forcast4hr =datalist[3].dt_txt;
      var forcast5hr =datalist[4].dt_txt;
      var forcast6hr =datalist[5].dt_txt;

      var forcast2hrTemp =datalist[1].main.temp;
      var forcast3hrTemp =datalist[2].main.temp;
      var forcast4hrTemp =datalist[3].main.temp;
      var forcast5hrTemp =datalist[4].main.temp;
      var forcast6hrTemp =datalist[5].main.temp;

      var forcast2hrIcon =datalist[1].weather[0].icon;
      var forcast3hrIcon =datalist[2].weather[0].icon;
      var forcast4hrIcon =datalist[3].weather[0].icon;
      var forcast5hrIcon =datalist[4].weather[0].icon;
      var forcast6hrIcon =datalist[5].weather[0].icon;

      var todayDate =datalist[0].dt_txt;
      var day1Date =datalist[7].dt_txt;
      var day2Date =datalist[15].dt_txt;
      var day3Date =datalist[23].dt_txt;
      var day4Date =datalist[31].dt_txt;
      
      var todayIcon =datalist[0].weather[0].icon;
      var day1Icon =datalist[7].weather[0].icon;
      var day2Icon =datalist[15].weather[0].icon;
      var day3Icon =datalist[23].weather[0].icon;
      var day4Icon =datalist[31].weather[0].icon;
      
      var todayMax =datalist[0].main.temp_max;
      var day1Max =datalist[7].main.temp_max;
      var day2Max =datalist[15].main.temp_max;
      var day3Max =datalist[23].main.temp_max;
      var day4Max =datalist[31].main.temp_max;

      var todayMin =datalist[0].main.temp_min;
      var day1Min =datalist[7].main.temp_min;
      var day2Min =datalist[15].main.temp_min;
      var day3Min =datalist[23].main.temp_min;
      var day4Min =datalist[31].main.temp_min;
     
      var boxFeelsLike = datalist[0].main.feels_like;
      var boxHumidity = datalist[0].main.humidity;
      var boxPressure = datalist[0].main.pressure;
      var boxVisiblity = datalist[0].visibility;
      var boxWindSpeed = datalist[0].wind.speed;
      var boxPopulation = city.population;


      //START WEATHER DETAILS BOX
      feels_like.innerHTML= `${kalToCel(boxFeelsLike)}<span class="cel">&deg;c</span>`;
      var humidityPercentage = convertHumidityToPercentage(boxHumidity);
      humidity.innerHTML = `${humidityPercentage}%`;
      pressure.innerHTML = `${boxPressure} psi`;
      var boxVisiblityToMiles = convertVisiblityToMiles(boxVisiblity);
      visiblity.innerHTML = `${boxVisiblityToMiles} mi`;
      var boxWindSpeedInMph = convertWindSpeedToMph(boxWindSpeed);
      wind_speed.innerHTML = `${boxWindSpeedInMph} mi/h`;
      var formattedPopulation = boxPopulation.toLocaleString();
      population.innerHTML = formattedPopulation;
      //END WEATHER DETAILS BOX
      

      // FOR SUNRISE 
      const sunRise = city.sunrise;
      // Convert UNIX timestamp to milliseconds
      const sunRiseMilliseconds = sunRise * 1000;
      // Create a new Date object using the converted timestamp
      const sunRiseDate = new Date(sunRiseMilliseconds);
      // Get hours, minutes, and seconds
      const riseHr = sunRiseDate.getHours();
      const riseMin = sunRiseDate.getMinutes();
      
      
      // FOR SUNSET   
      const sunSet = city.sunset;
      // Convert UNIX timestamp to milliseconds
      const sunSetMilliseconds = sunSet * 1000;
      // Create a new Date object using the converted timestamp
      const sunSetDate = new Date(sunSetMilliseconds);
      // Get hours, minutes, and seconds
      const setHr = sunSetDate.getHours();
      const setMin = sunSetDate.getMinutes();
      
      
      //TIMEZONE
      const timeZone = city.timezone;
      // Current time
      const now = new Date();
      // Get current UTC time in milliseconds
      const utcTime = now.getTime();
      // Calculate the time for the given timezone
      const timeWithTimeZone = utcTime + (timeZone * 1000);
      // Create a new Date object with the adjusted time
      const adjustedTime = new Date(timeWithTimeZone);
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC' // Using UTC as a basis
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const formattedTime = formatter.format(adjustedTime);

      
      cityElement.innerHTML = `<h2>${city.name}</h2> 
      <p>${formattedTime} 
      <br>H:${city.coord.lat.toFixed(2)}&deg; L:${city.coord.lon.toFixed(2)}&deg;
      <br>Sunrise: ${riseHr}hr:${riseMin}min AM
      <br>Sunset: ${setHr}hr:${setMin}min PM </p>`;
      weatherIconElement.innerHTML = iconMapping[weatherNow];
      temperature.innerHTML = `${kalToCel(temp)}<span class="cel">&deg;c</span>`;



      main1.innerHTML = `
      <p style="font-size: 15px;">Now</p>
      ${iconMapping[weatherNow]}
      <p class="main1deg" style="font-size: 15px;">${kalToCel(temp)}<span class="cel">&deg;c</span></p>`;
      main2.innerHTML = `<p style="font-size: 15px;">${extractTime(forcast2hr)}</p>
      ${iconMapping[forcast2hrIcon]}
      <p style="font-size: 15px;">${kalToCel(forcast2hrTemp)} <span class="cel">&deg;c</span></p>`;
      main3.innerHTML = `<p style="font-size: 15px;">${extractTime(forcast3hr)}</p>
      ${iconMapping[forcast3hrIcon]}
      <p style="font-size: 15px;">${kalToCel(forcast3hrTemp)} <span class="cel">&deg;c</span></p>`;
      main4.innerHTML = `<p style="font-size: 15px;">${extractTime(forcast4hr)}</p>
      ${iconMapping[forcast4hrIcon]}
      <p style="font-size: 15px;">${kalToCel(forcast4hrTemp)} <span class="cel">&deg;c</span></p>`;
      main5.innerHTML = `<p style="font-size: 15px;">${extractTime(forcast5hr)}</p>
      ${iconMapping[forcast5hrIcon]}
      <p style="font-size: 15px;">${kalToCel(forcast5hrTemp)} <span class="cel">&deg;c</span></p>`;
      main6.innerHTML = `<p style="font-size: 15px;">${extractTime(forcast6hr)}</p>
      ${iconMapping[forcast6hrIcon]}
      <p style="font-size: 15px;">${kalToCel(forcast6hrTemp)} <span class="cel">&deg;c</span></p>`;
      

      // five days for cast html changing
      today.innerHTML = ` <h4 class="day">${fetchDay(extractDate(todayDate))}</h4>
      <div class="icon">${iconMapping[todayIcon]}</div>
      <h4>${kalToCel(todayMin)}<span class="cel">&deg;c</span></h4>
      <div class="upperbar">
          <div class="innerbar one"></div>
      </div>
      <h4>${kalToCel(todayMax)}<span class="cel">&deg;c</span></h4>`;
      day1.innerHTML = ` <h4 class="day">${fetchDay(extractDate(day1Date))}</h4>
      <div class="icon">${iconMapping[day1Icon]}</div>
      <h4>${kalToCel(day1Min)}<span class="cel">&deg;c</span></h4>
      <div class="upperbar">
          <div class="innerbar one"></div>
      </div>
      <h4>${kalToCel(day1Max)}<span class="cel">&deg;c</span></h4>`;
      day2.innerHTML = ` <h4 class="day">${fetchDay(extractDate(day2Date))}</h4>
      <div class="icon">${iconMapping[day2Icon]}</div>
      <h4>${kalToCel(day2Min)}<span class="cel">&deg;c</span></h4>
      <div class="upperbar">
          <div class="innerbar one"></div>
      </div>
      <h4>${kalToCel(day2Max)}<span class="cel">&deg;c</span></h4>`;
      day3.innerHTML = ` <h4 class="day">${fetchDay(extractDate(day3Date))}</h4>
      <div class="icon">${iconMapping[day3Icon]}</div>
      <h4>${kalToCel(day3Min)}<span class="cel">&deg;c</span></h4>
      <div class="upperbar">
          <div class="innerbar one"></div>
      </div>
      <h4>${kalToCel(day3Max)}<span class="cel">&deg;c</span></h4>`;
      day4.innerHTML = ` <h4 class="day">${fetchDay(extractDate(day4Date))}</h4>
      <div class="icon">${iconMapping[day4Icon]}</div>
      <h4>${kalToCel(day4Min)}<span class="cel">&deg;c</span></h4>
      <div class="upperbar">
          <div class="innerbar one"></div>
      </div>
      <h4>${kalToCel(day4Max)}<span class="cel">&deg;c</span></h4>`;
      

    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });

}