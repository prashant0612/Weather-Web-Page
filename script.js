function fetchWeatherData() {
    const url = 'https://foreca-weather.p.rapidapi.com/location/search/patna?lang=en&country=in';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '747d25a676msh9e71fd01e72869bp1e2d86jsndd1c6909fada',
        'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
      }
    };
  
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response as JSON
      })
      .then(result => {
        console.log(result); // Log the result to see its structure
          const city = result.locations[0].name;
          const cityElement = document.querySelector('.location');
          cityElement.innerHTML = city;
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }
  
  // Call the function to fetch weather data and display it
  fetchWeatherData();
  