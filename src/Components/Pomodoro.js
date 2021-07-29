import React from 'react';

const STOP_STATE = 'stop'
const RUNNING_STATE = 'running'
const SESSION_LABEL = 'Session'
const BREAK_LABEL = 'Break'

const INITIAL_STATE = {
      breakLabel: 'Break Length',
      sessionLabel: 'Session Length',
      timerLabel: SESSION_LABEL,
      breakLength: 5,
      sessionLength: 25,
      timerState: STOP_STATE,
      intervalID: '',
      timerCount: 0
    }

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE
    this.resetTimer = this.resetTimer.bind(this)
    this.incrementSession = this.incrementSession.bind(this)
    this.decrementSession = this.decrementSession.bind(this)
    this.controllTimer = this.controllTimer.bind(this)
    this.decrementBreak = this.decrementBreak.bind(this)
    this.incrementBreak = this.incrementBreak.bind(this)
    
    this.startCountDown = this.startCountDown.bind(this)
    this.countUp = this.countUp.bind(this)
    this.calculateRest = this.calculateRest.bind(this)
    this.stopCountDown = this.stopCountDown.bind(this)
    this.zeroPadding = this.zeroPadding.bind(this)
  }
  
  decrementBreak() {
    let currentVal = this.state.breakLength
    if (currentVal > 1) { currentVal-- }
    this.setState({ breakLength: currentVal })
  }
  
  incrementBreak() {
    let currentVal = this.state.breakLength
    if (currentVal < 60) { currentVal++ }
    this.setState({ breakLength: currentVal })    
  }
  
  resetTimer() {
    console.log('resetTimer!')
    const audioItem = document.getElementById('beep')
    audioItem.pause()
    audioItem.currentTime = 0
    this.stopCountDown()
    this.setState(INITIAL_STATE)
  }
  
  incrementSession() {
    let currentVal = this.state.sessionLength
    if (currentVal < 60) { currentVal++ }
    this.setState({ sessionLength: currentVal })
  }
  
  decrementSession() {
    let currentVal = this.state.sessionLength
    if (currentVal > 1) { currentVal-- }
    this.setState({ sessionLength: currentVal })
  }
  
  stopCountDown() {
     this.setState({ timerState: STOP_STATE })
     console.log(this.state.intervalId)
     clearInterval(this.state.intervalId)
  }
  
  startCountDown() {
    this.timerId = setInterval(this.countUp, 1000)
    this.setState({intervalId: this.timerId})
  }
  
  calculateRest() {
    return (this.state.sessionLength * 60) - this.state.timerCount
  }
  
  // return array
  restTimer() {
    const rest = this.calculateRest()
    let min = Math.floor(rest / 60)
    let sec = rest % 60
    return [this.zeroPadding(2, min), this.zeroPadding(2, sec)] 
  }
  
  zeroPadding(len, val) {
    return (Array(len).join('0') + val ).slice(-len)
  }
  
  countUp() {
    const timerCount = this.state.timerCount + 1
    const rest = this.calculateRest()
    this.setState({ timerCount: timerCount})
    this.setState({ timerRest: rest })
    if (rest === 0) {
      const currentLabel = this.state.timerLabel
      this.resetTimer()
      if (currentLabel === SESSION_LABEL) {
        this.setState({sessionLength: this.state.breakLength})
        this.setState({ timerLabel: BREAK_LABEL })
      } else {
        this.setState({sessionLength: this.state.sessionLength})
        this.setState({ timerLabel: SESSION_LABEL })        
      }
      this.beepSound()
      this.controllTimer()
    }
  }
  
  
  controllTimer() {
    if (this.state.timerState === STOP_STATE) {
      this.setState({ timerState: RUNNING_STATE })
      this.startCountDown()
    } else {
      this.stopCountDown()
    }
  }
  
  beepSound() {
   const audioItem = document.getElementById('beep')
   audioItem.play().then(() => {
      // Automatic playback started!
   }).catch((error) => {
     // Automatic playback failed.
     // Show a UI element to let the user manually start playback.
   })
 }
  
  render () {
    const timerState = this.state.timerState
    let startStyle = (timerState === RUNNING_STATE ? 'hide' : 'show')
    let stopStyle = (timerState === STOP_STATE ? 'hide' : 'show')
    let restTimer = this.restTimer()
    let sessionLabel = SESSION_LABEL
    return (
      <div id='wrapper'>
      <h2>Pomodoro Clock</h2>
      <div id="container">
        <div id="timer-container">
          <div id="timer-label" className='label'>{this.state.timerLabel}</div>
          <div id="time-left">{restTimer[0]}:{restTimer[1]}</div>
          <div className="innerContainer">
            <button id="start_stop" onClick={this.controllTimer} className={this.state.timerState}>
            <audio id="beep" preload="auto" 
          src="https://bobmatyas.github.io/fcc-pomodoro-clock/sounds/beep.mp3" />
              <span id='startButton' className={startStyle}>Start</span>
              <span id='stopButton' className={stopStyle}>Stop</span>
            </button>
            <button id='reset' onClick={this.resetTimer}>Reset</button>  
          </div>
        </div>
         <div id="break-container">
          <div id='break-label' className='label'>{this.state.breakLabel}</div>
           <div className="lengthContainer">
            <button id='break-decrement' onClick={this.decrementBreak}></button>
            <div id="break-length">{this.state.breakLength}</div>
             <button id='break-increment' onClick={this.incrementBreak}></button>
           </div>
        </div>
        <div id="session-container">
          <div id='session-label' className='label'>{this.state.sessionLabel}</div>
          <div className="lengthContainer">
            <button id='session-decrement' onClick={this.decrementSession}></button>
            <div id="session-length">{this.state.sessionLength}</div>
            <button id='session-increment' onClick={this.incrementSession}></button>
          </div>
        </div>
      </div>
     </div>
    )
  }
}


export default Pomodoro;
