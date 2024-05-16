import './App.css';
import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

function App() {
  const[sessionlength, setSessionLength] = useState(25);
  const[breakLength, setBreakLength] = useState(5);
  return (
    <div className="App">
     
      <div className='full-container'>
        <div className='title'>POMODORO TIMER</div> 
        <div className='clock-container row'>  
          <div className='session-container col-8'>
            <div className='current-session'>
              <div id='timer-label'>Current Session</div>
              <div id='time-left'>25:00</div>
            </div>
            <div className='session-controls'>
              <button id='start_stop'></button>
              <button id='reset'></button>
            </div>
          </div>
          
      
          <div className='lengths-containers col-4' style={{fontSize: '25px'}}>
            
              <div id='session-label'>Session Length</div>
              <div className='length-container'>
                <button id='session-decrement'><FontAwesomeIcon icon={faAngleDown}/></button>
                <div id='session-length'>{sessionlength}</div>
                <button id='session-increment'><FontAwesomeIcon icon={faAngleUp}/></button>
              </div>
            
              <div id='break-label'>Break Length</div>
              <div className='length-container'>
                <button id='break-decrement'><FontAwesomeIcon icon={faAngleDown}/></button>
                <div id='break-length'>{breakLength}</div>
                <button id='break-increment'><FontAwesomeIcon icon={faAngleUp} /></button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
