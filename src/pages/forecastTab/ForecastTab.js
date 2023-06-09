import React, {useEffect, useState, useContext} from 'react';
import './ForecastTab.css';
import axios from "axios";
import createDateString from "../../helpers/createDateString";
import {TempContext} from "../../context/TempProvider";

function ForecastTab({coordinates}) {
    const [forecasts, setForecasts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {kelvinToMetric} = useContext(TempContext);

    useEffect(() => {
        async function fetchForecasts() {
            setLoading(true);
            try {
                // const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.long}&appid=${apiKey}&lang=nl`);
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);
                // console.log(response.data);
                const fiveDayForecast = response.data.list.filter((singleForecast) => {
                    return singleForecast.dt_txt.includes("12:00:00");
                });

                if (response.data) {
                    setError(false);
                }

                setForecasts(fiveDayForecast);

                // console.log(forecasts);
            } catch (e) {
                setError(true);
                console.error(e);
            }

            setLoading(false);
        }

        if (coordinates) {
            void fetchForecasts();
        }

    }, [coordinates]);

    return (
        <div className="tab-wrapper">
            {error &&
                <span className="error-message">
                    Er is iets misgegaan met het ophalen van de data
                </span>
            }
            {loading && forecasts.length === 0 &&
                <span className="no-forecast">
                    Data wordt opgehaald!!!
                </span>
            }
            {forecasts.length === 0 && !error && !loading &&
                <span className="no-forecast">
                    Zoek eerst een locatie om het weer voor deze week te bekijken
                </span>
            }

            {forecasts.map((day) => {
                return <article key={day.dt} className="forecast-day">
                    <p className="day-description">
                        {createDateString(day.dt)}
                    </p>

                    <section className="forecast-weather">
            <span>
                {kelvinToMetric(day.main.temp)}
            </span>
                        <span className="weather-description">
              {day.weather[0].description}
            </span>
                    </section>
                </article>
            })}
        </div>
    );
}

export default ForecastTab;
