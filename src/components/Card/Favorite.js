import React, { useState, useEffect } from "react";
import Card from './Card';
import { NavLink } from "react-router-dom";

const Favorite = () => {

    const results = JSON.parse(localStorage.getItem('fetchedData'));

    let [ favData, updateFavData] = useState(results); 

    var filterData= []; 
    results.map(item => {
        if(item.isFavorite){
            filterData.push(item);
        }
    })

    useEffect(()=>{
        updateFavData(filterData);
    }, [])

    return (
        <div className="main-Cards">
            <div className="taps">
                <NavLink to="/" className="tap">All</NavLink>
                <NavLink to="/favCards" className="tap">My faves</NavLink>
            </div>
            <div className="main-conteiner">
                <section className="cards-list">
                        <Card results={favData} />
                </section>
            </div>
        </div>    
    );
 
}


export default Favorite;