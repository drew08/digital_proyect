import React from 'react'
import Card from './Card';
import { NavLink, Link } from "react-router-dom";

const Favorite = () => {
    debugger;

    const results = JSON.parse(localStorage.getItem('fetchedData'));

    var filterData= []; 
    results.map(item => {
        if(item.isFavorite){
            filterData.push(item);
        }
    })

    debugger;
    return (
        <div className="main-Cards">
            <div className="taps">
                <NavLink to="/" className="tap">All</NavLink>
                <NavLink to="/favCards" className="tap">My faves</NavLink>
            </div>
            <div className="main-conteiner">
                <section className="cards-list">
                        <Card results={filterData} />
                </section>
            </div>
        </div>    
    );
 
}


export default Favorite;