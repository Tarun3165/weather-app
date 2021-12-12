import React, {  useEffect, useState } from "react";
import "../Styles/TemperatureGraph.css";
import cloud from "../Images/cloud.svg";
import clear from "../Images/clear.svg";
import rain from "../Images/rain.png";
import graph from "../Images/graph.svg";
import Chart from "react-apexcharts";
import {v4 as uuid} from "uuid"
const day = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];

export default function TemperatureGraph({ fetchData,data,handleSetData }) {
  
  
  const [tempArrDay1, setTempArrDay1] = useState([])  

  function changeWeather(el){
    // console.log('el:', el)
    
    handleSetData(el)
    
    getTempArr()
  }
  let date = new Date();
  let dayIndex = date.getDay();

  function getTempArr() {
    let arr = [];
    let i=Math.floor(Math.random() * 12);
   for ( let j=i; j < i+12;j++)
   {
     arr.push(fetchData.hourly[j].temp);
    
    }
    setTempArrDay1(arr);
  }

 useEffect(() => {
  
   getTempArr()
 
 }, [])
  
  const options = {
    chart: {
      height: 280,
      type: "area"
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: [
        "12",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ]
    }
  };
  const series = [
    {
      name: "Temperature",
      data: tempArrDay1
    }
  ];
  
  
   
  function selectImage(key) {
    try {
      // let key = fetchData.current.weather[0].main;
      switch (key) {
        case "Clear":
          return clear;
        case "Cloud":
          return cloud;
        case "Rain":
          return rain;

        default:
          break;
      }
      return cloud;
    } catch (err) {
      console.log(err);
    }
  }

  return  (
    <div className="graphContainer">
      <div className="weeksWeather">
        {fetchData.daily.map((el) => {
          return (
            <div key={uuid()} onClick={()=>changeWeather(el)}  className="card ">
              <p>{ day[(dayIndex++)%7]}</p>
              <p>{ el.temp.day} °C</p>
              <img src={selectImage(el.weather[0].main)} alt="" />
              <p>{ el.weather[0].main}</p>
            </div>
          )
        })}
      </div>
      <div>
        <div className="temperature">
          
          <h1>{data.temp.day}°C</h1>
        </div>
        {
          <div className="weatherimg">
            
            <img src={selectImage(data.weather[0].main)} alt="" />
          </div>
        }
      </div>
      <div className="temperaturechart">
        
      <Chart
         options={options}
         series={series}
         type="area"
         width="750"
      />
        
      </div>
      <div>
        <div className="values">
          <h3>Pressure</h3>
          <span>{data.pressure} hpa</span>
        </div>
        <div className="values">
          <h3>Humidity</h3>
          <span>{data.humidity} %</span>
        </div>
      </div>
      <div>
        <div id="time" className="values">
          <h3>sunrise</h3>
          <span>{data.sunrise} </span>
        </div>
        <div id="time" className="values">
          <h3>sunset</h3>
          <span>{data.sunset} </span>
        </div>
      </div>
   
      <div>
        <img src={graph} alt="" />
      </div>
    </div>
  );
}
