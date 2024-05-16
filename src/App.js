import './App.css';
import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faPlay, faPause, faRepeat } from '@fortawesome/free-solid-svg-icons';

function App() {
  const initialVals = [false, 25, 5];
  const[sessionlength, setSessionLength] = useState(initialVals[1]);
  const[breakLength, setBreakLength] = useState(initialVals[2]);
  const[currentTime, setCurrentTime] = useState('25:00');
  const[isOn, setIsOn] = useState(initialVals[0]);

 
  function resetVals() {
    setIsOn(initialVals[0]);
    setSessionLength(initialVals[1]);
    setBreakLength(initialVals[2]);
  }

  return (
    <div className="App">
     
      <div className='full-container'>
        <div className='title'>POMODORO TIMER</div> 
        <div className='clock-container row'>  
          <div className='session-container col-8'>
            <div className='current-session'>
              <div id='timer-label'>Current Session</div>
              <div id='time-left'>{sessionlength + ':00'}</div>
            </div>
            <div className='session-controls'>
              <button id='start_stop' onClick={()=>setIsOn(!isOn)}><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></button>
              <button id='reset'onClick={resetVals}><FontAwesomeIcon icon={faRepeat} /></button>
            </div>
          </div>
          
      
          <div className='lengths-containers col-4' style={{fontSize: '25px'}}>
            
              <div id='session-label'>Session Length</div>
              <div className='length-container'>
                <button id='session-decrement' onClick={() => setSessionLength(sessionlength-1)}><FontAwesomeIcon icon={faAngleDown}/></button>
                <div id='session-length'>{sessionlength}</div>
                <button id='session-increment'onClick={() => setSessionLength(sessionlength+1)}><FontAwesomeIcon icon={faAngleUp}/></button>
              </div>
            
              <div id='break-label'>Break Length</div>
              <div className='length-container'>
                <button id='break-decrement' onClick={()=>setBreakLength(breakLength-1)}><FontAwesomeIcon icon={faAngleDown}/></button>
                <div id='break-length'>{breakLength}</div>
                <button id='break-increment' onClick={()=>setBreakLength(breakLength+1)}><FontAwesomeIcon icon={faAngleUp} /></button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
