import "../style.css";
import { displayInfoPage } from "./displayInfo.js";
import { showLoadingScreen, hideLoadingScreen, delay } from "./loading.js";


export async function getInfo(searchQuery) {
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchQuery}?unitGroup=us&key=WJKQ6WV8EQ3WGXRXDD9RK64MF&contentType=json`;
    
    try {
        const response = await fetch(url, {mode: 'cors'});

        if (!response.ok) {  
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
            
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log("Fetch Error: ", error.message);
    }
}


document.addEventListener("submit", async (e) => {
    e.preventDefault();

    const searchQuery = document.getElementById("search").value.trim();
    if (!searchQuery) {
        alert("Please enter a valid location.");
        return;
    }

    showLoadingScreen();
    
    try {
        const weatherData = await getInfo(searchQuery);

        // Check if data is valid before proceeding
        if (!weatherData) {
            throw new Error("No weather data returned.");
        }

        // Allow time for loading screen to show
        await delay(1500);
        displayInfoPage(weatherData);

    } catch (error) {
        console.log(error.message);
        alert("Error fetching weather data. Please try again.");
        return;
        
    } finally {
        hideLoadingScreen();
    }
});

