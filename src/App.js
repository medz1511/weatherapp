import React, { useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const isValidLatitude = (value) => {
    return !isNaN(value) && parseFloat(value) >= -90 && parseFloat(value) <= 90;
  };

  const isValidLongitude = (value) => {
    return !isNaN(value) && parseFloat(value) >= -180 && parseFloat(value) <= 180;
  };

  useEffect(() => {
    if (latitude && longitude && isValidLatitude(latitude) && isValidLongitude(longitude)) {
      setLoading(true);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=60064fb24486d02b2ef8d6d0b12a4c9d&units=metric`
      )
        .then((result) => result.json())
        .then((jsonresult) => {
          setWeatherData(jsonresult);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [latitude, longitude]);

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Latitude"
              value={latitude}
              onChange={handleLatitudeChange}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Longitude"
              value={longitude}
              onChange={handleLongitudeChange}
            />
            <div>Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Latitude"
              value={latitude}
              onChange={handleLatitudeChange}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Longitude"
              value={longitude}
              onChange={handleLongitudeChange}
            />
            <div>Entrez la latitude et la longitude pour afficher la météo</div>
          </div>
        </div>
      </div>
    );
  }

  const { name, main, weather, sys } = weatherData;
  const { temp } = main;
  const { main: weatherMain, description, icon } = weather[0];
  const { sunrise, sunset } = sys;

  const getTemperatureColor = (temperature) => {
    if (temperature < 10) return "#6495ED"; // Cold: Light Blue
    if (temperature < 20) return "#32CD32"; // Moderate: Green
    return "#FF450"; // Hot: Orange
  };

  return (
    <div className="container mt-5 " style={{ backgroundColor: getTemperatureColor(temp) }}>

      <div className="card">
        <h1>Kounama Météo</h1>
        <div className="card-body">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Latitude"
            value={latitude}
            onChange={handleLatitudeChange}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Longitude"
            value={longitude}
            onChange={handleLongitudeChange}
          />
          <h2 className="card-title">{name}</h2>
          <p className="card-text">Temperature: {temp} °C</p>
          <p className="card-text">Main: {weatherMain}</p>
          <p className="card-text">Description: {description}</p>
          <img
            className=" img-fluid"
            src={`http://openweathermap.org/img/wn/${icon}.png`}
            alt="Weather icon"
          />
          <p className="card-text">Sunrise: {new Date(sunrise * 1000).toLocaleTimeString()}</p>
          <p className="card-text">Sunset: {new Date(sunset * 1000).toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
