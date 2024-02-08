
import './index.css'
import React from 'react';
// import Bulb from "./Components/ToggleBulb/main"

import Modal from "./Components/Modal/main"
// import Form from "./Components/Forms/main"



function App() {
  //  data;
  // function getData() {
  //   return JSON.parse(localStorage.getItem('Todos')) || [];
  // }

  return(
    <>
    
     
      <div className="container">
        <div className="row">
          <div className="col">
            <div className='addItemsContainer'>
              <h1 className='todoHeading '>To Do App</h1>
           
          {/* {getData().length > 0 && <Dropdown />} */}
           
           
          </div>
            <Modal />
        </div>
        </div>
      </div>


      


    </>
  
  )
}

export default App
