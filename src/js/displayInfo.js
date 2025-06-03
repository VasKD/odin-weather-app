import { getIcon } from "./icons";
import { parseISO, format } from 'date-fns'

export function displayInfoPage(weatherData) {
    clearHomePage();
    displayCurrentConditions(weatherData);
    displayForecastData(weatherData);
}

export function clearHomePage() {
    const appContainer = document.querySelector(".weather-app");
    appContainer.textContent = "";
}



// ******************************
// * Display Current Conditions *
// ******************************

const infoPage = document.createElement("div");
infoPage.classList.add("info-page");

const infoContainer = document.createElement("div");
infoContainer.classList.add("info-container");

export function displayCurrentConditions(weatherData) {
    console.log(weatherData);
    const appContainer = document.querySelector(".weather-app");

    const currentConditionsDiv = document.createElement("div");
    currentConditionsDiv.classList.add("current-conditions");

    // add info to containers
    currentConditionsDiv.appendChild(createConditionsDiv(weatherData));
    currentConditionsDiv.appendChild(createIconDiv(weatherData.currentConditions.icon));
    infoContainer.appendChild(currentConditionsDiv);
    infoPage.appendChild(infoContainer);
    
    // push to the dom
    appContainer.appendChild(infoPage);
}

function createIconDiv(condition) {
    const iconContainer = document.createElement("div");
    iconContainer.classList.add("icon");
    iconContainer.appendChild(getIcon(condition));

    return iconContainer;
}

function createConditionsDiv(weatherData) {
    const conditions = document.createElement("div");
    conditions.classList.add("conditions");

    const location = document.createElement("h1");
    location.textContent = weatherData.resolvedAddress;

    const temperature = document.createElement("h2");
    temperature.textContent = weatherData.currentConditions.temp + " °F";

    const description = document.createElement("p");
    description.textContent = weatherData.currentConditions.conditions;

    conditions.appendChild(location);
    conditions.appendChild(temperature);
    conditions.appendChild(description);

    return conditions;
}



// ********************
// * Display Forecast *
// ********************

function displayForecastData(weatherData) {
    const forecastDiv = createForecastDiv();
    createCards(forecastDiv, weatherData);

    infoContainer.appendChild(forecastDiv);
}

function createForecastDiv() {
    const forecastDiv = document.createElement("div");
    forecastDiv.classList.add("forecast");
    console.log(forecastDiv);
    return forecastDiv;
}


function createCards(forecastDiv, weatherData) {
    for (let i = 1; i < 6; i++) {
        const card = document.createElement("div");
        card.classList.add("card");

        const day = document.createElement("h3");
        const dayOfWeek = getDayOfWeek(weatherData.days[i].datetime)
        day.textContent = dayOfWeek;
        card.appendChild(day);

        const icon = getIcon(weatherData.days[i].icon);
        // remove any classes that conflict with sizing
        icon.classList.value = '';
        card.appendChild(icon);

        const tempDiv = createTempDiv(weatherData.days[i]);
        card.appendChild(tempDiv);

        forecastDiv.appendChild(card);
    }
    
}

function createTempDiv(weatherData) {
    const tempDiv = document.createElement("div");
    tempDiv.classList.add("temp");

    const highTemp = document.createElement("p");
    highTemp.textContent = "H: " + weatherData.tempmax;
    tempDiv.appendChild(highTemp);

    const lowTemp = document.createElement("p");
    lowTemp.textContent = "L: " + weatherData.tempmin;
    tempDiv.appendChild(lowTemp);

    return tempDiv;
}

function getDayOfWeek(date) {
    date = parseISO(date);
    const dayOFWeek = format(date, 'EEEE');

    return dayOFWeek;
}