import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faPlay, faPause, faRepeat } from '@fortawesome/free-solid-svg-icons';

function App() {
  //State variables
  const initialVals = [false, 25, 5];
  const[sessionlength, setSessionLength] = useState(initialVals[1]);
  const[breakLength, setBreakLength] = useState(initialVals[2]);
  const[currentTime, setCurrentTime] = useState(initialVals[1]+':00');
  const[isOn, setIsOn] = useState(initialVals[0]);
  const[isRunning, setIsRunning] = useState(initialVals[0]);
  const[isBreak, setIsBreak] = useState(initialVals[0]);

  //Returns state to original values
  function resetVals() {
    setIsOn(initialVals[0]);
    setSessionLength(initialVals[1]);
    setCurrentTime(initialVals[1] + ':00');
    setBreakLength(initialVals[2]);
    setIsRunning(initialVals[0]);
    setIsBreak(initialVals[0]);
  }

  //If we start the timer this will trigger the countdown function every second
  useEffect(() => {
    let timer;
    if (isOn && isRunning) {
      timer = setTimeout(() => countDown(currentTime), 1000);
    }
    return () => clearTimeout(timer);
  }, [isOn, isRunning, currentTime]);

  //This makes sure we display the correct time on loading
  useEffect(() => {
    if (!isOn && !isRunning) {
      if (isBreak) {
        setCurrentTime(`${breakLength}:00`);
      } else {
        setCurrentTime(`${sessionlength}:00`);
      }
    }
  }, [sessionlength, breakLength, isOn, isRunning, isBreak]);

  // Displays the correct time 
  function displayTime() {
    if (isOn || isRunning) {

      return currentTime;
    } else if(!isRunning){
        if(isBreak){
          return breakLength + ':00';
        } else {
          return sessionlength + ':00';
        }

    }
  }
  //Displays the correct label for the counter
  function breakOrStudy() {
    if(isBreak) {
      return 'Break';
    }
    else {
      return 'Session';
    }
  }

  function countDown(time){
    let minsAndSec = time.split(':');
    let min = minsAndSec[0];
    let sec = minsAndSec[1];
    if(sec === '00'){
      if(min === '00'){
        //play alarm
        //start break counter
        setIsBreak(!isBreak); //toggles break or study
        if(isBreak){  //If we reach the end and is a break we change to session
          setCurrentTime(sessionlength + ':00');
        } else {
          setCurrentTime(breakLength + ':00');// If session ended we start break
        }
        return;
      } else {
        min = eval(min -1 ).toString();
        sec = '59';
      }
    } else {
      sec = eval(sec - 1).toString();
    }
    let newTime = min.padStart(2,'0') + ':' + sec.padStart(2,'0');
    setCurrentTime(newTime);
  }

  return (
    <div className="App">
     
      <div className='full-container'>
        <div className='title'>POMODORO TIMER</div> 
        <div className='clock-container row'>  
          <div className='session-container col-8'>
            <div className='current-session'>
              <div id='timer-label'>{breakOrStudy()}</div>
              <div id='time-left'>{displayTime()}</div>
            </div>
            <div className='session-controls'>
              <button id='start_stop' onClick={()=>{setIsOn(!isOn); setIsRunning(true)}}><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></button>
              <button id='reset'onClick={resetVals}><FontAwesomeIcon icon={faRepeat} /></button>
            </div>
          </div>
          
      
          <div className='lengths-containers col-4' style={{fontSize: '25px'}}>
            
              <div id='session-label'>Session Length</div>
              <div className='length-container'>
                <button id='session-decrement' onClick={() => {
                  if(sessionlength > 1 && !isOn ){setSessionLength(sessionlength-1); setIsRunning(false)}}}><FontAwesomeIcon icon={faAngleDown}/></button>
                <div id='session-length'>{sessionlength}</div>
                <button id='session-increment'onClick={() => {
                  if(sessionlength < 60 && !isOn){setSessionLength(sessionlength+1); setIsRunning(false)}}}><FontAwesomeIcon icon={faAngleUp}/></button>
              </div>
            
              <div id='break-label'>Break Length</div>
              <div className='length-container'>
                <button id='break-decrement' onClick={()=>{
                  if(breakLength > 1 && !isOn) {
                    setBreakLength(breakLength-1);
                     if(isBreak){setCurrentTime(breakLength);setIsRunning(false)}
                  }
                  }}><FontAwesomeIcon icon={faAngleDown}/></button>
                <div id='break-length'>{breakLength}</div>
                <button id='break-increment' onClick={()=>{
                  if(breakLength < 60 && !isOn) {
                    setBreakLength(breakLength+1); 
                    if(isBreak){setCurrentTime(breakLength); setIsRunning(false)}
                    }
                  }}><FontAwesomeIcon icon={faAngleUp} /></button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
