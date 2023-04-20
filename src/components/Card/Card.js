
import React from "react";
import moment from 'moment';

export default function Card(results) {

    let display;

    const handleAnchorClick = el => {
        window.open(el.story_url, '_blank').focus(); 
    };

    const favoriteClic = item  => {
        results.UpdateData(item);
    };

    
    if (results) {
        display = results.results.map((x) => {
            let { author, story_title, created_at } = x;
            const timeago = moment(created_at).fromNow();
            return (
                
                <div  id = {x.id} className="card">
                    <div  onClick={()=> handleAnchorClick(x)}  className="card-body">
                        <div  className="">
                            <img   src="../images/icon-time.svg"   alt="icon" className="icon--timer"/>
                            <span className="card--author"> {timeago}</span>
                            <span className="card--author">  by {author}</span>
                        </div>
                        <div  className="">
                             <p className="card--title ">{story_title} </p>
                        </div>
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