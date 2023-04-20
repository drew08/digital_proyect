
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Pagination from './components/Pagination/Pagination';
import Card from './components/Card/Card';
import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorite from './components/Card/Favorite';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favCards" element={<Favorite />} />
      </Routes>
    </Router>
  );

}

const Home = () => {
  let [pageNumber, updatePageNumber] = useState(1);     // paginacion
  let [fetchedData, updateFetchedData] = useState([]);   ///  informacion del api

  let [type, updateType] = React.useState('angular');    
  //const [isActive, setActive] = React.useState(false);
  
  // estructura del api
  let api = `https://hn.algolia.com/api/v1/search_by_date?query=${type}&page=${pageNumber}`;


    useEffect(() => {
      (async function () {
        let data = await fetch(api).then((res) => res.json());
        var newData= [];
        debugger;
        data.hits.map(item => {
          if(item.author && item.story_title && item.story_url && item.created_at){ 
           let newItem ={
             id: item.story_id,
             author:  item.author ,
             story_title:item.story_title ,
             story_url:item.story_url ,
             created_at:item.created_at ,
             isFavorite:false
           }
            newData.nbPages =  data.nbPages;  
          
            const checkUnique = newData.some(element => {
              if (element.id === item.story_id) {
                  return true;
                }
                return false;
              });
              debugger;
              if(!checkUnique){
                newData.push(newItem);  
              }  

            }
         })

          updateFetchedData(newData);
      })();
    }, [api]);   // watch, cuando la url del api cambien se vuelve a jecutar

    
    useEffect(() => {
      localStorage.setItem('fetchedData', JSON.stringify(fetchedData));
    }, [fetchedData]);

    console.log(fetchedData); 
    
    // const cards = NewArray?.map(item => {
    //   return (
    //       <Card
    //           key={item.story_id}
    //           {...item}  
    //       />
    //   )
    // })
    
    function handleChange(event) {
      debugger;
      const {name, value} = event.target
      updateType(value);
  }

  function clicTap(event) {
    debugger;
   // setActive(!isActive);
  }


  function UpdateData(newValue) {
    debugger;
    updateFetchedData(prev => {
      debugger;
      return prev.map((el) => {
        return el.id === newValue.id ? {...el, isFavorite: !el.isFavorite} : el
      })
    })      
  }

  debugger;
  return (
    
    <div className="App">
      <div className="taps">
          <NavLink to="/" className="tap">All</NavLink>
          <NavLink to="/favCards" className="tap">My faves</NavLink>
      </div>

     
     <div className="main-conteiner">
        <div className="selectType">
            <select className="type-select"
                      id="type"
                      value={type}
                      onChange={handleChange}
                      name="type"
                  >
                      <option value="angular">angular</option>
                      <option value="reactjs">reactjs</option>
                      <option value="vuejs">vuejs</option>

            </select>
        </div>
       
        <section className="cards-list">
            <Card  results={fetchedData}   UpdateData={UpdateData} />
        </section>
      </div>
      { <Pagination
        pages={fetchedData.nbPages}
        pageNumber={pageNumber}
        updatePageNumber={updatePageNumber}
      /> }
   </div>
  );


};
export default App;
