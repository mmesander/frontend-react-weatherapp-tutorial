import React, {useEffect} from 'react';
import './TodayTab.css';
import {useState} from "react";
import axios from "axios";

const apiKey = '08ebcec99a4487212029dd95f36fa8de'

function TodayTab({coordinates}) {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchForecast() {
			setLoading(true);
			try {
				const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&lang=nl`);
				console.log(response.data);

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

	return(
		<div className="tab-wrapper">
			<div className="chart">
				Hier komt de chart!
			</div>
			<div className="legend">
				<span>08:00 uur</span>
				<span>12:00 uur</span>
				<span>16:00 uur</span>
			</div>
		</div>
  );
}

export default TodayTab;
