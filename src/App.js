import React, { Component, setGlobal } from 'reactn';

import Slider from './DomComponents/Slider.jsx';
import Status from './DomComponents/Status.jsx';
import 'rc-slider/assets/index.css';
import './App.scss';

class App extends Component {

  constructor(props) {
    super(props);

    this.stateUpdate = this.stateUpdate.bind(this);
    this.makingChanges = false;
    this.receivingData = false;
    this.lastChangesSaved = false;
    this.lastLedStatusCheck = null;
  };  

  stateUpdate(key, newValue, commitChanges) {
    var newState = {};
    newState[key] = newValue;
    if (newState[key] !== this.state[key]) {
      this.lastChangesSaved = false;
    }

    this.setState(newState);
    if (commitChanges) {
      this.dispatch.setLedSetting(key, newState);
      this.makingChanges = false;
    } 
    else {
      this.makingChanges = true;
    }
    return newState;
  };

  ledStatusTask() {
    var self = this;

    this.interval = setInterval(() => {
      if (!self.lastLedStatusCheck || (((new Date() - self.lastLedStatusCheck) / 1000) > 5 )) {
        setGlobal(self.dispatch.getLedSettings());
        this.lastLedStatusCheck = new Date();
      }
    }, 1000);
  };

  componentDidMount() {
    this.ledStatusTask();
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  };

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <h1 className="App-title">Led Control</h1>
      </header>
      <Status isOn={this.global.isOn}/>
      <Slider label={"Brightness"} min={0} max={100} value={this.global.brightness} id={"brightness"}/>
      <Slider label={"Speed"} min={0} max={100} value={this.global.speed} id={"speed"}/>
      </div>
    );
  };
};

export default App;