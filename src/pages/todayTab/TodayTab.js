import React, {useEffect} from 'react';
import './TodayTab.css';
import {useState} from "react";
import axios from "axios";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import createTimeString from "../../helpers/createTimeString";

function TodayTab({coordinates}) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [forecasts, setForecasts] = useState([]);

    useEffect(() => {
        async function fetchForecast() {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${apiKey}&lang=nl`);
                // console.log(response.data);
                setForecasts(response.data.list.slice(0, 3));
                console.log(forecasts)

                if (response.data) {
                    setError(false);
                }

            } catch (e) {
                setError(true);
                console.error(e);
            }

            setLoading(false);
        }

        if (coordinates) {
            void fetchForecast();
        }

    }, [coordinates]);

    return (
        <div className="tab-wrapper">
            <div className="chart">
                {forecasts.map((forecast) => {
                    return <WeatherDetail
                        temp={forecast.main.temp}
                        type={forecast.weather[0].main}
                        description={forecast.weather[0].description}
                        key={forecast.dt}
                    />
                })}
            </div>
            <div className="legend">
                {forecasts.map((forecast) => {
                    return <span key={`${forecast.dt}-timestamp`}>{createTimeString(forecast.dt)}</span>
                })}
            </div>
            {error &&
                <span>
					Het ophalen van de voorspellingen is mislukt. Probeer het opnieuw
				</span>
            }
            {loading &&
                <span>
					Loading...
				</span>
            }
        </div>
    );
}

export default TodayTab;
