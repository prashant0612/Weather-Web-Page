function handleInput() {
  var inputElement = document.getElementById('myInput');
  var inputValue = inputElement.value;

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

      const temperature = document.querySelector('.deg');
      const timeLonLat = document.querySelector('.info p')
      const main1 = document.querySelector('.main1');
      const cityElement = document.querySelector('.location');
      const weatherIconElement = document.querySelector('.icon');
      const main2 = document.querySelector('.maintwo');
      const main3 = document.querySelector('.mainthree');
      const main4 = document.querySelector('.mainfour');
      const main5 = document.querySelector('.mainfive');
      const main6 = document.querySelector('.mainsix');
      
      
      
      
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

      
      cityElement.innerHTML = `<h2>${city.name}</h2>`;
      weatherIconElement.innerHTML = iconMapping[weatherNow];
      temperature.innerHTML = `${kalToCel(temp)}<span class="cel">&deg;c</span>`;
      timeLonLat.innerHTML = `<p>${formattedTime} | H:${city.coord.lat.toFixed(2)}&deg; L:${city.coord.lon.toFixed(2)}&deg;
      <br>Sunrise: ${riseHr}hr:${riseMin}min AM
      <br>Sunset: ${setHr}hr:${setMin}min PM`;



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
      
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });



}
