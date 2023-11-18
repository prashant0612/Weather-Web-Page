function handleInput(){
  var inputElement = document.getElementById('myInput');
  var inputValue = inputElement.value;

    const apiKey = '4e13120cf71ced98bb0b83db4a8624fe';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;
   
   
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the result to see its structure
          const city = data.name;
          const cityElement = document.querySelector('.location');
          cityElement.innerHTML = city;

          var currentDate = new Date();
          var hours = currentDate.getHours();
          var minutes = currentDate.getMinutes();

          const temp = data.main.temp;
          const lon = data.coord.lon;
          const lat = data.coord.lat;
          tempCelcious = Math.floor(temp - 273.15);

          const temperature = document.querySelector('.deg');
          const timeLonLat = document.querySelector('.info p')
          const main1deg = document.querySelector('.main1 .main1deg')


          temperature.innerHTML = `${tempCelcious}<span class="cel">&deg;c</span>`;
          timeLonLat.innerHTML = `<p>${hours}:${minutes} | H:${lat.toFixed(2)}&deg; L:${lat.toFixed(2)}&deg;</p>`
          main1deg.innerHTML = `${tempCelcious} <span class="cel">&deg;c</span>`

         
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  
 

}
  