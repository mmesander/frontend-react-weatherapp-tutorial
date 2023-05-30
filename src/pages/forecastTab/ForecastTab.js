import React, {useEffect, useState} from 'react';
import './ForecastTab.css';
import axios from "axios";

const apiKey = '08ebcec99a4487212029dd95f36fa8de';

function ForecastTab({coordinates}) {
    const [forecasts, setForecasts] = useState([]);

    useEffect(() => {
        async function fetchForecasts() {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.long}&appid=${apiKey}&lang=nl`);
                console.log(response.data)
            } catch (e) {
                console.error(e);
            }
        }

        if (coordinates) {
            fetchForecasts();
        }

    }, [coordinates]);

    return (
        <div className="tab-wrapper">
            <article className="forecast-day">
                <p className="day-description">
                    Maandag
                </p>

                <section className="forecast-weather">
            <span>
              12&deg; C
            </span>
                    <span className="weather-description">
              Licht Bewolkt
            </span>
                </section>
            </article>

            <article className="forecast-day">
                <p className="day-description">
                    Maandag
                </p>

                <section className="forecast-weather">
            <span>
              12&deg; C
            </span>
                    <span className="weather-description">
              Licht Bewolkt
            </span>
                </section>
            </article>

            <article className="forecast-day">
                <p className="day-description">
                    Maandag
                </p>

                <section className="forecast-weather">
            <span>
              12&deg; C
            </span>
                    <span className="weather-description">
              Licht Bewolkt
            </span>
                </section>
            </article>

            <article className="forecast-day">
                <p className="day-description">
                    Maandag
                </p>

                <section className="forecast-weather">
            <span>
              12&deg; C
            </span>
                    <span className="weather-description">
              Licht Bewolkt
            </span>
                </section>
            </article>

            <article className="forecast-day">
                <p className="day-description">
                    Maandag
                </p>

                <section className="forecast-weather">
            <span>
              12&deg; C
            </span>
                    <span className="weather-description">
              Licht Bewolkt
            </span>
                </section>
            </article>
        </div>
    );
}

export default ForecastTab;
