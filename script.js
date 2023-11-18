function handleInput(){
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
          const city = data.city;// whole city details ->lat,lon,timezone,sunrise,sunset
          const datalist = data.list; //whole whether report list thik hai

          
          var currentDate = new Date();
          var hours = currentDate.getHours();
          var minutes = currentDate.getMinutes();
          
          
          const temp = datalist[0].main.temp; //fatching current temp of the city
          tempCelcious = Math.floor(temp - 273.15);// converting temp - kelvin to celcius 

          const temperature = document.querySelector('.deg');
          const timeLonLat = document.querySelector('.info p')
          const main1deg = document.querySelector('.main1 .main1deg')
          const cityElement = document.querySelector('.location');
          
          // FOR SUNRISE 
          const sunRise  = city.sunrise;
          // Convert UNIX timestamp to milliseconds
          const sunRiseMilliseconds = sunRise * 1000;

          // Create a new Date object using the converted timestamp
          const sunRiseDate = new Date(sunRiseMilliseconds);

          // Get hours, minutes, and seconds
          const riseHr = sunRiseDate.getHours();
          const riseMin = sunRiseDate.getMinutes();
          const  riseSec = sunRiseDate.getSeconds();

          // FOR SUNSET   
          const sunSet = city.sunset;
          // Convert UNIX timestamp to milliseconds
          const sunSetMilliseconds = sunSet * 1000;

          // Create a new Date object using the converted timestamp
          const sunSetDate = new Date(sunSetMilliseconds);

          // Get hours, minutes, and seconds
          const setHr = sunSetDate.getHours();
          const setMin = sunSetDate.getMinutes();
          const  setSec = sunSetDate.getSeconds();
          
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

          
          
          cityElement.innerHTML = `<h2>${city.name}</h2>`;
          temperature.innerHTML = `${tempCelcious}<span class="cel">&deg;c</span>`;
          timeLonLat.innerHTML = `<p>${hours}:${minutes} | H:${city.coord.lat.toFixed(2)}&deg; L:${city.coord.lon.toFixed(2)}&deg;
                                  <br>Sunrise: ${riseHr}hr:${riseMin}min AM
                                  <br>Sunset: ${setHr}hr:${setMin}min PM
                                  <br>Timezone:${adjustedTime}</p>`;
          main1deg.innerHTML = `${tempCelcious} <span class="cel">&deg;c</span>`;
        
       
       
       
         

       
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  
 

}
  