import cloudyIcon from "../img/Cloudy.svg";
import sunIcon from "../img/Sun.svg";
import snowIcon from "../img/Snow.svg";
import rainIcon from "../img/Rain.svg";
import stormIcon from "../img/Storm.svg";
import cloudyDayIcon from "../img/Partly Cloudy Day.svg";
import cloudyNightIcon from "../img/Partly Cloudy Night.svg"
import moonIcon from "../img/Moon.svg";

const iconDict = {
    "snow": snowIcon,
    "rain": rainIcon,
    "cloudy": cloudyIcon,
    "partly-cloudy-day": cloudyDayIcon,
    "partly-cloudy-night": cloudyNightIcon,
    "clear-day": sunIcon,
    "clear-night": moonIcon,
    "thunder-rain": stormIcon
};

const iconClasses = {
    "cloudy": "cloudy",
    "clear-night": "clear-night"
}


export function getIcon(condition){
    const icon = document.createElement("img");

    if (condition in iconClasses) {
        icon.classList.add(iconClasses[condition]);
    }

    icon.src = iconDict[condition];
    return icon;
}
