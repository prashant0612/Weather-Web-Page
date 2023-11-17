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
        return response.json(); // Parse response as JSON
      })
      .then(data => {
        console.log(data); // Log the result to see its structure
          const city = data.name;
          const cityElement = document.querySelector('.location');
          cityElement.innerHTML = city;


          const temp = data.main.temp;
          tempCelcious = Math.floor(temp - 273.15);
          const temperature = document.querySelector('.deg');
          temperature.innerHTML = tempCelcious;

         
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  
 

}



  // Call the function to fetch weather data and display it
  