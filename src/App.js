//Functions
import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";

//Components
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import ForecastTab from './pages/forecastTab/ForecastTab';
import {Routes, Route} from "react-router-dom";
import TodayTab from "./pages/todayTab/TodayTab";
import kelvinToCelsius from "./helpers/kelvinToCelsius";

const apiKey = '08ebcec99a4487212029dd95f36fa8de';

function App() {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${apiKey}&lang=nl`);
                // console.log(response.data);
                setWeatherData(response.data);
                setError(false);
            } catch (e) {
                setError(true);
                console.error(e);
            }
        }

        if (location) {
            void fetchData();
        }
    }, [location]);
    return (
        <>
            <div className="weather-container">

                {/*HEADER -------------------- */}
                <div className="weather-header">
                    <SearchBar setLocationHandler={setLocation}/>
                    {error &&
                        <div className="wrong-location-error">
                            Oeps! Deze locatie bestaat niet!
                        </div>
                    }

                    <span className="location-details">
                        {Object.keys(weatherData).length > 0 &&
                            <>
                                <h2>{weatherData.weather[0].description}</h2>
                                <h3>{weatherData.name}</h3>
                                <h1>{kelvinToCelsius(weatherData.main.temp)}</h1>
                            </>
                        }
                    </span>
                </div>

                {/*CONTENT ------------------ */}
                <div className="weather-content">
                    <TabBarMenu/>

                    <div className="tab-wrapper">
                        <Routes>
                            <Route path="/" element={<TodayTab coordinates={weatherData.coord}/>}/>
                            <Route path="/komende-week" element={<ForecastTab coordinates={weatherData.coord}/>}/>
                        </Routes>
                    </div>
                </div>

                <MetricSlider/>
            </div>
        </>
    )
        ;
}

export default App;
