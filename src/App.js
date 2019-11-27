import React, { Component } from 'react';
import Slider from './DomComponents/Slider.js';
import Status from './DomComponents/Status.js';
import axios from 'axios';
import 'rc-slider/assets/index.css';
import './App.scss';

class App extends Component {

  constructor(props) {
    super(props);

    this.stateUpdate = this.stateUpdate.bind(this);
    this.makingChanges = false;
    this.receivingData = false;
    this.lastChangesSaved = false;
    this.lastLedStatusCheck =  null;
  };  

  state = {
    isOn: null,
    brightness: 0,
    mode: 0,
    toggle: 0,
    speed: 0,
  };    

  stateUpdate(key, newValue, commitChanges) {
    var newState = {};
    newState[key] = newValue;
    if (newState[key] !== this.state[key]) {
      this.lastChangesSaved = false;
    }

    this.setState(newState);
    if (commitChanges) {
      this.setLedSetting(key, newState);
      this.makingChanges = false;
    } else {
      this.makingChanges = true;
    }
    return newState;
  };

  setLedStates(model) {
    var newModel = {};
    Object.keys(model).forEach(function(key) {
        if (key === "isOn" || model[key]) {
        newModel[key] = model[key];
        }
        });

    this.setState(newModel);
    this.lastLedStatusCheck = new Date();
  };

  getLedStatus() {
    if (!this.makingChanges && !this.receivingData) {
      this.receivingData = true;
      axios.get("/api/status/")
        .then(result => { 
          this.setLedStates(result.data);
          this.receivingData = false; 
        })
        .catch(error => {
          var model = {
            isOn: null,
          };
          this.setLedStates(model);
          this.receivingData = false;
        });
    }
  };

  setLedSetting(key, object) {
    if (!this.lastChangesSaved) {
      axios.post("/api/"+key+"/", object)
        .then(result => { 
          this.setLedStates(result.data);
          this.lastChangesSaved = true; 
        })
        .catch(error => {
          var model = {
            isOn: null,
          };
          this.setLedStates(model);
          this.lastChangesSaved = true; 
        });
    }
  };

  ledStatusTask() {
    var self = this;
      this.interval = setInterval(() => {
        if (!self.lastLedStatusCheck || (((new Date() - self.lastLedStatusCheck) / 1000) > 5 )) {
          self.getLedStatus()
        }
      }, 1000);
  }

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
      <Status isOn={this.state.isOn} onUpdate={this.stateUpdate}/>
      <Slider label={"Brightness"} min={0} max={100} value={this.state.brightness} onUpdate={this.stateUpdate} id={"brightness"}/>
      <Slider label={"Speed"} min={0} max={100} value={this.state.speed} onUpdate={this.stateUpdate} id={"speed"}/>
      </div>
    );
  };
};

export default App;
