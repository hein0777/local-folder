import { useState,useEffect } from "react";

import axios from 'axios'
export default function Weather()
{
    let [cityName,setCityName] = useState();
    let [temperature , setTemperature] = useState();
    let [windSpeed, setWindSpeed] = useState();
    let [cloud,setCloud] = useState();
    useEffect(()=>{
      const fetchData = async()=>{
        console.log("fetch data is called")
          let result = await axios.get('http://localhost:3000/weather');
            setCityName(result.data.name)
            setTemperature(result.data.main.temp)
            setWindSpeed(result.data.wind.speed)
            setCloud(result.data.clouds.all)
            console.log('City Name' , cityName);
      };
      fetchData();
  },[]);


  return(
    <div>
                <div> City Name : {cityName}</div> 
                <div> Temperature : {temperature} °C</div>
                <div> WindSpeed : {windSpeed}</div>
                <div> Clouds : {cloud} %</div>
    </div>
  )
}