import React, {useEffect, useState} from 'react';
import './ForecastTab.css';
import axios from "axios";

const apiKey = '08ebcec99a4487212029dd95f36fa8de'

function createDateString(timestamp) {
    const day = new Date(timestamp * 1000);
    return day.toLocaleDateString(`nl-NL`, {weekday: 'long'});
}

function ForecastTab({coordinates}) {
    const [forecasts, setForecasts] = useState([]);

    useEffect(() => {
        async function fetchForecasts() {
            try {
                // const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.long}&appid=${apiKey}&lang=nl`);
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${apiKey}&lang=nl`);
                console.log(response.data);
                const fiveDayForecast = response.data.list.filter((singleForecast) => {
                    return singleForecast.dt_txt.includes("12:00:00");
                });
                setForecasts(fiveDayForecast);
                console.log(forecasts)
            } catch (e) {
                console.error(e);
            }
        }

        if (coordinates) {
            void fetchForecasts();
        }

    }, [coordinates]);

    return (
        <div className="tab-wrapper">
            {forecasts.map((day) => {
                return <article key={day.dt} className="forecast-day">
                    <p className="day-description">
                        {createDateString(day.dt)}
                    </p>

                    <section className="forecast-weather">
            <span>
                {day.main.temp}&deg; C
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
