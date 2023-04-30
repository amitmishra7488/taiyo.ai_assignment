import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Chart as ChartJS } from "chart.js/auto";
import 'leaflet/dist/leaflet.css';
import Loading from './Loading';
import { Box, Text } from '@chakra-ui/react';

function Graph() {
    const [casesData, setCasesData] = useState({});
    const [countryData, setCountryData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch worldwide data for cases with date
                const worldwideResponse = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=30');
                const worldwideData = worldwideResponse.data;

                // Create data object for line graph
                const data = {
                    labels: Object.keys(worldwideData.cases),
                    datasets: [
                        {
                            label: 'Total Cases',
                            data: Object.values(worldwideData.cases),
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                        },
                        {
                            label: 'Total Deaths',
                            data: Object.values(worldwideData.deaths),
                            fill: false,
                            borderColor: 'rgb(255, 99, 132)',
                            tension: 0.1,
                        },
                        {
                            label: 'Total Recovered',
                            data: Object.values(worldwideData.recovered),
                            fill: false,
                            borderColor: 'rgb(54, 162, 235)',
                            tension: 0.1,
                        },
                    ],
                };

                setCasesData(data);

                // Fetch country specific data for cases
                const countryResponse = await axios.get('https://disease.sh/v3/covid-19/countries');
                const countryData = countryResponse.data;

                setCountryData(countryData);

                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <Box textAlign="center" mt="20%">
            <Text color="#5719AF" fontSize="30px" fontFamily="cursive" fontWeight="700">Chart is Preparing...</Text>
            <Loading />
        </Box>;
    }

    return (
        <div>
            <h2>COVID-19 Cases</h2>
            <Line data={casesData} />

            <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {countryData.map((country) => (
                    <Marker key={country.countryInfo._id} position={[country.countryInfo.lat, country.countryInfo.long]}>
                        <Popup>
                            <div>
                                <h3>{country.country}</h3>
                                <p>Total Active Cases: {country.active}</p>
                                <p>Total Recovered Cases: {country.recovered}</p>
                                <p>Total Deaths: {country.deaths}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default Graph;
