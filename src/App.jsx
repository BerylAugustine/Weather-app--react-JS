import React, { useState, useEffect } from 'react';
import './App.css';
import PropTypes from "prop-types";

/**Images */
import cactusIcon from './images/cactus.webp';
import clearIcon from './images/clear.png';
import cloudsIcon from './images/clouds.png';
import drizzleIcon from './images/haze.png';
import humidityIcon from './images/humidity.png';
// import mistIcon from './images/mist.png';s
import rainIcon from './images/rain.png';
import searchIcon from './images/search.png';
import windIcon from './images/wind.png'; 
import snowIcon from './images/snow.png'



const WeatherDetails = ({icon, temp, city, country, lat, log, humidity, wind})=> {
 return(
  <>
  <div className="image">
    <img src={icon} alt="Image" />  
  </div>
  <div className="temp">{temp}°C</div>
  <div className='city'>{city}</div>
  <div className='country'>{country}</div>
  <div className="cord">
    <div>
  <span className="lat">Latitude</span>
  <span>{lat}</span>
  </div>
  <div>
  <span className="log"> Longitude</span>
  <span>{log}</span>
  </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img src={humidityIcon} alt="humidity" className='icon'/>
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
    </div>
    <div className="element">
      <img src={windIcon} alt="wind" className='icon'/>
        <div className="data">
          <div className="wind-percent">{wind} Km/h</div>
          <div className="text">Wind Speed</div>
        </div>
    </div>
  </div>
    </>
 )
};

WeatherDetails.propTypes = {
  icon:PropTypes.string.isRequired,
  temp:PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log:PropTypes.number.isRequired,
};

function App() {

  let api_key = `8cab3a63fab4aafa23866e264993a3cd`;

  const [text, setText] = useState("Chennai");
  const [icon, setIcon] = useState(cactusIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("chennai");
  const [country, setCountry] = useState("In");
  const [lat, setLatitude] = useState(0);
  const [log, setLongitude] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
"01d": clearIcon, 
"01n": clearIcon,
"02d":cloudsIcon, 
"02n":cloudsIcon, 
"03d": drizzleIcon, 
"03n": drizzleIcon,
"04d": drizzleIcon,
"04n": drizzleIcon,
"09d":rainIcon,
"09n":rainIcon,
"10n":rainIcon,
"13d":snowIcon, 
"13n":snowIcon, 
  }

  const search = async () => {
    setLoading(true);
   
   let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&=metric`;

try {
  let res = await fetch(url);
  let data = await res.json();
if (data.cod === "404") {
  console.error("City Not Found");
  setCityNotFound(true);
  setLoading(false);
  return;
}

setHumidity(data.main.humidity);
setWind(data.wind.speed);
setTemp(Math.floor(data.main.temp-273.15));
setCity(data.name);
setCountry(data.sys.country);
setLatitude(data.coord.lat);
setLongitude(data.coord.lon);
const weatherIconCode = data.weather[0].icon;
setIcon(weatherIconMap[weatherIconCode] || clearIcon)
setCityNotFound(false);

} catch (error) {
  console.error("An error occured:", error.message);
  setError("An Error occured while Fetching data");
}finally{
}
};

  const handleCity = (e) => {
    setText(e.target.value);
  ;}

const handlekeyDown = (e) => {
  if (e.key === "Enter") {
    search()
  }
};

useEffect (function () {
search();
},[]);

  return (
    <div>
    <div className="container">
      <div className="input-container">
        <input type="text" className="cityInput" placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handlekeyDown}/>
        <div className="search-icon">
          <img src={searchIcon} alt="Search" />
        </div>
      </div> 

{loading && <div className="loading-message">Loading...</div>}
{error && <div className="error-message">{error}</div>}
{cityNotFound && <div className="city-not-found">City Not Found</div>}

{!loading && !cityNotFound && <WeatherDetails icon = {icon} temp = {temp} city = {city} country = {country} lat = {lat} log ={log} humidity={humidity} wind={wind}/>}

      <p className="copyright">
        Designed by <span>Beryl Shanthapriya</span>
      </p>
    </div>
    </div>
  );
}

export default App;
