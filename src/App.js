import React, { useEffect, useState,useContext } from "react"
import './Styles/App.css';
import SearchBar from "./Components/SearchBar";
import TemperatureGraph from "./Components/TemperatureGraph";
import { ContextState } from "./Context/ContextProvider";


function App() {
  const { fetchData,data,cityData,handleSetData,location,handleSearch } = useContext(ContextState)
  
  // const [data, setData] = useState(fetchData.daily[dayIndex]) 

  return  (
    <div className="App">
      <div className="container">
        <SearchBar location={location} cityData={cityData} handleSearch={handleSearch}/>
        {fetchData && <TemperatureGraph handleSetData={handleSetData} data={data} fetchData={fetchData}/>} 
      </div>
    </div>
  );
}

export default App;
