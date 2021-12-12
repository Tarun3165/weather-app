
import React, { useState } from 'react'
import locationIcon from "../Images/location.svg"
import search from "../Images/search.svg"
import "../Styles/SearchBar.css"
import { v4 as uuid } from "uuid"
import cloud from "../Images/cloud.svg";
import clear from "../Images/clear.svg";
import rain from "../Images/rain.png";

export default function SearchBar({handleSearch,location,cityData}) {
    
    
    const [query, setQuery] = useState(location.join(","));
    
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

    const [state, setState] = useState(false);
    
    return (<>
        <div className="SearchContainer">
            <div className="locationicon">
                <img src={locationIcon} alt="" />
            </div>
            <div className="searchbar">
                <input value={query} onInput={(e) => { setQuery(e.target.value);setState(true)}} type="text" placeholder="Search" />
            </div>
            <div onClick={()=>handleSearch(query)} className="searchicon">
                <img src={search} alt="" />
            </div>
        </div>
        <div className={state?"searchList":"display"}>
            {
                cityData.map((el,i) => {
                    return (
                        < div key={uuid()}>
                            <div  onClick={(e)=>{setQuery(e.target.innerHTML );setState(false)}} className="citydiv" >
                               { el}
                            </div>
                            <div><img src="" alt="" /></div>
                            <hr />
                        </div>

                    )
                })
            }
        </div>
    </>
    )
}
