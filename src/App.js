import './App.css';
import React, { useEffect, useState } from "react";

import LoadingScreen from './components/LoadingScreen';
import WeatherInfo from './components/WeatherInfo';
import moment from 'moment';


const App = () => {
  const [data, setData] = useState([]);
  const [temperatureType, setTemperatureType] = useState('imperial');


  const fetchData = async (unit) => {
    setData([]);
    console.log("here",process.env);
    await fetch(`${process.env.REACT_APP_API_URL}/forecast?q=Kathmandu&APPID=${process.env.REACT_APP_API_KEY}&units=${unit}`)
    .then(res => res.json())
    .then(result => {
      console.log(result);
      // setData(result.list);
      var tempList = result.list;
      var total = 0;
      var average = 0;
      var counter = 0;
      var singleDayTemp = [];
      for (let outerindex = 1; outerindex < 6; outerindex++) {
        for (let innerindex = counter * 8; innerindex < 8*outerindex; innerindex++){
          total += tempList[innerindex].main.temp;
          var item = {
            temp : tempList[innerindex].main.temp,
            date :  moment(tempList[innerindex].dt * 1000).format("h a")
          }
          singleDayTemp.push(item);
        }
        average = total / 8;
        var tempObj = {
          temp : average,
          date : tempList[counter * 8].dt,
          detail: singleDayTemp
        }
        average= 0;
        total = 0;
        singleDayTemp = [];
        console.log(tempObj);
        setData((data) => [...data, tempObj]);
        counter++;
      }
    });
  }

  useEffect(() => {
    fetchData('imperial');
  }, []);

  const refreshParentFunction = (temperatureType) => {
    setTemperatureType(temperatureType);
    fetchData(temperatureType);
  }

  return (
    <div className="App">
      {
        (data.length === 0)? (
          <LoadingScreen/>
        ) : (
          <WeatherInfo data={data} refreshParentFunction={refreshParentFunction} temperatureType={temperatureType} />
        )
      }
    </div>
  );
}

export default App;
