import React from 'react';
import { Player } from './components/Player/Player';
import "./App.css"

function App() {
  return (
    <div className='w-100 vh-100 d-flex flex-column align-items-center' style={{paddingTop:"23%"}}>
      <Player/>
      <div className='bg-dark' style={{height:"2px", width:"106%"}}></div>
      <div className='background'>
      </div>
    </div>
  );
}

export default App;
