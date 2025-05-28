import "./style.css";

const searchBtn = document.querySelector("button[type='submit']");
    let searchQuery = '';    
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      searchQuery = document.getElementById("search").value;
      getInfo(searchQuery);
});

async function getInfo(searchQuery) {
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchQuery}?unitGroup=us&key=WJKQ6WV8EQ3WGXRXDD9RK64MF&contentType=json`;

    const response = await fetch(url, {mode: 'cors'});

    if (!response.ok) {  
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const weatherData = await response.json();
    console.log(weatherData);
    console.log(weatherData.currentConditions.temp + " °F");
    console.log(weatherData.description);
    console.log(weatherData.resolvedAddress);
    console.log(weatherData.days[0].datetime);

}

getInfo().catch((err) => {
    console.log(err);
});