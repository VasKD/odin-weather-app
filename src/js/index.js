import "../style.css";
import { displayInfoPage } from "./displayInfo.js";



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


const searchBtn = document.querySelector("button[type='submit']");
    searchBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const searchQuery = document.getElementById("search").value.trim();
        if (!searchQuery) {
            alert("Please enter a location.");
            return;
        }

        try {
             const weatherData = await getInfo(searchQuery);

            if (e.target.closest(".home")) {
                displayInfoPage(weatherData);
            }
        } catch (error) {
            console.log(error.message);
        }
       
});

