import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import loader from "../Images/loader.svg"

export const ContextState = createContext({ yourdata: {}, searchData: {}, fetchData: {}, data: {}, handleSearch: () => { }, location: [], handleSetData: () => { },cityData:[]});

function ContextProvider({ children }) {
     
    const [yourdata, setYourData] = useState({});  //iplook data 
    const [fetchData, setfetchData] = useState({});  //fetchData 
    const [searchData, setSearchData] = useState({});  //searchData 
    const [location, setLocation] = useState([]);
    const [loading, setLoading] = useState(true);
    
    let date = new Date();
    let dayIndex = date.getDay();
  
    const [data, setData] = useState({});

    const [cityData,setCityData]=useState([])
    
    function handleSetData(input) {
        setData(input);
    }
    
    function handlefetchData(lat,lon)
    {
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=5f27abbb4cddba315706507fc9e0cd78`)
     .then(res => {
      setfetchData(res.data)
      setData(res.data.daily[dayIndex])
     })
      .catch(err => console.log(err))
    }

    function handleSearch(query) {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=5f27abbb4cddba315706507fc9e0cd78`)
       .then(res => {
        setSearchData(res.data)
        handlefetchData(res.data.coord.lat, res.data.coord.lon)
       })
       .catch(err => console.log(err))
    }

    function ipLookUp() {
        axios.get('http://ip-api.com/json')
            .then(res => {
                setYourData(res.data)
                handleSearch(res.data.city)
                setLocation([res.data.city,res.data.regionName])
         })
         .catch(err => console.log(err))
    }
     
    function loadCities() {
        axios.get("http://localhost:3001/city")
            .then((res) => {
                setCityData(res.data)
        })
    }
    
    useEffect(() => {
        loadCities()
        ipLookUp()
        let timer = setTimeout(() => {
        setLoading(false);
        clearTimeout(timer);
      }, 2000);
      
    }, [])
  

    return  loading ? <div className="loader"><img src={loader} alt="" /></div> : (
        <ContextState.Provider value={{yourdata,searchData,fetchData,data,handleSearch,location,handleSetData,cityData}}>
            { children }
        </ContextState.Provider>
    )
}

export default ContextProvider