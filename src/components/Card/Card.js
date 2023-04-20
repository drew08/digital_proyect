
import React, { useState, useEffect } from "react";

export default function Card(results) {
     debugger;
    let display;


    const handleAnchorClick = event => {
        debugger;
        window.open(results.story_url, '_blank').focus(); 
    };

    const favoriteClic = item  => {
        debugger;
        results.UpdateData(item);
    };

    debugger;
    if (results) {
        display = results.results.map((x) => {
            let { author, story_title, story_url, created_at } = x;
            return (
                
                <div  className="card">
                    <div  onClick={handleAnchorClick}   className="">
                        <span className="card--author"> {created_at}</span>
                        <span className="card--author"> {author}</span>
                        <p className="card--title ">{story_title} </p>
                    </div>
                    <div className="favorite">
                        
                        <img   onClick={()=> favoriteClic(x)}   src={x.isFavorite ? "../images/icon-full.svg"  : "../images/icon.svg"}   alt="icon" className="icon--favorite"/>
                    </div>   
                </div>
            )
        });    
    }    
    return <>{display}</>;
}