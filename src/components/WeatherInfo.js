import React, {useState} from "react";
import {Radio, Card, CardContent} from '@material-ui/core';
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import moment from 'moment';
import '../style/WeatherInfoStyle.css';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext)

  return (
    <button disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      Left
    </button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext)

  return (
    <button disabled={isLastItemVisible} onClick={() => scrollNext()}>
      Right
    </button>
  );
}

function WeatherInfo({data , refreshParentFunction, temperatureType}) {

  const [chartData, setCharData] = useState(data[0].detail);

  const handleRadioChange = (event) => {
    refreshParentFunction(event.target.value);
  };

  const handleChartData = (chartData) => {
    console.log(chartData);
    setCharData(chartData.detail);
  }

  return (
    <div className="main-container">
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
      <div className="weather-card-container">
          {data?.map((item, index) => (
            <Card variant="outlined" key={index} className="weather-card-items" onClick={()=>handleChartData(item)}>
              <CardContent>
                <h1>{Math.floor(item.temp)}{(temperatureType === 'metric')? "°C" : "°F"}</h1> 
                <p>{moment(item.date * 1000).format("Do MMM, YY")}</p>
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
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
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
