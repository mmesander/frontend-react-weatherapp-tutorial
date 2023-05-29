//Functions
import React, {useState} from 'react';
import './App.css';
import axios from "axios";

//Components
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';

const apiKey = '08ebcec99a4487212029dd95f36fa8de';

function App() {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState('');

    async function fetchData() {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=utrecht,nl&appid=${apiKey}&lang=nl`);
            console.log(response.data);
            setWeatherData(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className="weather-container">

                {/*HEADER -------------------- */}
                <div className="weather-header">
                    <SearchBar setLocationHandler={setLocation}/>

                    <span className="location-details">
                        {Object.keys(weatherData).length > 0 &&
                            <>
                                <h2>{weatherData.weather[0].description}</h2>
                                <h3>{weatherData.name}</h3>
                                <h1>{weatherData.main.temp}</h1>
                            </>
                        }

                        <button
                            type="button"
                            onClick={fetchData}
                        >
              Haal data op!
            </button>
          </span>
                </div>

                {/*CONTENT ------------------ */}
                <div className="weather-content">
                    <TabBarMenu/>

                    <div className="tab-wrapper">
                        Alle inhoud van de tabbladen komt hier!
                    </div>
                </div>

                <MetricSlider/>
            </div>
        </>
    );
}

export default App;
