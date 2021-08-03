import React, {useState, useRef} from "react";
import {Radio, Card, CardContent, IconButton} from '@material-ui/core';
import moment from 'moment';
import '../style/WeatherInfoStyle.css';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import ArrowRight from '@material-ui/icons/ArrowRight';
import ArrowLeft from '@material-ui/icons/ArrowLeft';

function WeatherInfo({data , refreshParentFunction, temperatureType}) {

  const [chartData, setCharData] = useState(data[0].detail);
  const ref = useRef(null);

  const handleRadioChange = (event) => {
    refreshParentFunction(event.target.value);
  };

  const handleChartData = (chartData) => {
    console.log(chartData);
    setCharData(chartData.detail);
  }

  const scroll = (direction) => {
    if (direction === 'left') {
      ref.current.scrollLeft -= 50;
    } else {
      ref.current.scrollLeft += 50;
    }
  };

  return (
    <div className="main-container">
      <center><h1>Weather App</h1></center>
      <div className="radio-container">
        <div>
          <Radio
            checked={temperatureType === 'metric'}
            onChange={handleRadioChange}
            value="metric"
          />Celcius
        </div>
        <div>
          <Radio
            checked={temperatureType === 'imperial'}
            onChange={handleRadioChange}
            value="imperial"
          />Fahrenheit
        </div>
      </div>
      <div className="button-container">
        <IconButton  variant="outlined" onClick={() => scroll('left')}><ArrowLeft className="button-size"/></IconButton>
        <IconButton  variant="outlined" onClick={() => scroll('right')}><ArrowRight className="button-size"/></IconButton>
      </div>
      <div className="weather-card-container" ref={ref}>
          {data?.map((item, index) => (
            <Card variant="outlined" key={index} className="weather-card-items" onClick={()=>handleChartData(item)}>
              <CardContent>
                <h2>{Math.floor(item.temp)}{(temperatureType === 'metric')? "°C" : "°F"}</h2> 
                <p className="">{moment(item.date * 1000).format("Do MMM, YY")}</p>
              </CardContent>
            </Card>
          ))}
      </div>
      <div className="chart-container">
        <ResponsiveContainer height={300}>
          <BarChart
            width={600}
            height={300}
            data={chartData}
          >
            <XAxis dataKey="date" />
            <YAxis dataKey="temp" />
            <Bar dataKey="temp" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div> 
  )
}

export default WeatherInfo
