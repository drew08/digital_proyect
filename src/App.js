
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Pagination from './components/Pagination/Pagination';
import Card from './components/Card/Card';
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorite from './components/Card/Favorite';


function App() {
  return (
    <Router>
      <div className="nav">
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
  let [pageNumber, updatePageNumber] = useState(1);     // pagination
  let [fetchedData, updateFetchedData] = useState([]);   ///  API data

  let [type, updateType] = React.useState('');    // selelect option

  let [totalPages, updateTotalPagesData] = useState(1);   ///  API data

 // call api
 let api = `https://hn.algolia.com/api/v1/search_by_date?query=${type}&page=${pageNumber}`;

  
    useEffect(() => {
      if (window.localStorage !== undefined) {
        localStorage.removeItem("angularData");
        localStorage.removeItem("reactjsData");
        localStorage.removeItem("vuejsData");        
      }
    }, [pageNumber]);

    useEffect(() => {
      if (window.localStorage !== undefined) {
        
        let angularItems = JSON.parse(localStorage.getItem('angularData'));
        let reactItems = JSON.parse(localStorage.getItem('reactjsData'));
        let vueItems = JSON.parse(localStorage.getItem('vuejsData'));
      
        if (angularItems  && type === "angular") {
            updateFetchedData(angularItems);
        }
        if (reactItems && type === "reactjs") {
          updateFetchedData(reactItems);
        }
        if (vueItems && type === "vuejs") {
          updateFetchedData(vueItems);
        }
      }  
    }, [api]);
  
 
    useEffect(() => {
      (async function () {
        let data = await fetch(api).then((res) => res.json());
        var newData= [];
        
        data.hits.map(item => {

          // select only those with non-null data
          if(item.author && item.story_title && item.story_url && item.created_at){ 
           let newItem ={
             id: item.story_id,
             author:  item.author ,
             story_title:item.story_title ,
             story_url:item.story_url ,
             created_at:item.created_at ,
             isFavorite:false,
             type: type
           }

            updateTotalPagesData(data.nbPages); 
           
            // check that the ids are unique 
            const checkUnique = newData.some(element => {
              if (element.id === item.story_id) {
                  return true;
                }
                return false;
              });
             
              if(!checkUnique){
                newData.push(newItem);  
              }  

            }
         })
        
        
        if( !window.localStorage.angularData || !window.localStorage.reactjsData || !window.localStorage.vuejsData ){
           updateFetchedData(newData);  
         }
          


      })();
    }, [api]);   


    
    useEffect(() => {
   
      if(type === "angular"){
        localStorage.setItem('angularData', JSON.stringify(fetchedData));
      }    
      if(type === "reactjs"){
        localStorage.setItem('reactjsData', JSON.stringify(fetchedData));
      }
      if(type === "vuejs"){
        localStorage.setItem('vuejsData', JSON.stringify(fetchedData));
      }
      localStorage.setItem('fetchedData', JSON.stringify(fetchedData));
    }, [fetchedData]);

        
    function handleChange(event) {
      const {value} = event.target
      updateType(value);
  }

  function UpdateData(newValue) {
 
    updateFetchedData(prev => {
      return prev.map((el) => {
        return el.id === newValue.id ? {...el, isFavorite: !el.isFavorite} : el
      })
    })      
  }

  return (
    
    <div className="App">
       <main>
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
                        <option value="" disabled>Select your news</option>
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
          pages={totalPages}
          pageNumber={pageNumber}
          updatePageNumber={updatePageNumber}
        /> }
      </main>       
   </div>
  );


};
export default App;
