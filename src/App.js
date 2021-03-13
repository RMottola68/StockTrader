import React, {useState, useEffect} from 'react';
import './App.css';
import Search from './search';
import Portfolio from './portfolio';


function App() {
  return (
   <>

    <div className={'navbar bg-primary border-bottom justify-content-center'}>
      <h1 className={'text-light'}>Paper Trader</h1>
    </div>
    
    <div className={'container-fluid '}>
      <div className={'row inline-flex'}>
        
        <Search />
        <Portfolio/>
        
      </div>
    </div>

    
    


   </>
  );
}

export default App;
