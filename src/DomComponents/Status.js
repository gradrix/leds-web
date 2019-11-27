import React from "react";
import moment from "moment";
import EnableButton from "./EnableButton.js";

class Status extends React.Component {

  lastUpdateTime = null;
  blankUpdateTime = "-s ago / --:--:--";

  constructor(props) {
    super(props);

    this.state = { 
      status: "inactive",
      statusText: "-",
      stateText: "Loading..",
      clockText: this.blankUpdateTime,
    };
  }

  getClockText = function() {
    var timeSinceLast = "infinite ";
    if (this.lastUpdateTime) {
      timeSinceLast = Math.floor((new Date() - this.lastUpdateTime) / 1000);
      return timeSinceLast + "s ago / "+moment(this.lastUpdateTime).format("HH:mm:ss");
    } 
    return this.blankUpdateTime;
  }

  tick() {
    if (this.lastUpdateTime !== null)
      this.setState({
      clockText: this.getClockText()
      });
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    );
  };

  componentWillUnmount() {
    clearInterval(this.timerId);
  };

  componentWillReceiveProps(newProps) {
    var newStatus = "inactive";
    var newState = "";
    if (newProps.isOn !== null) {
      newStatus = newProps.isOn ? "active": "inactive";
      newState = newProps.isOn ? "On": "Off";
      this.lastUpdateTime = new Date();
    }
    else {
      newState = "Off (offline)";    
    }

    if (newState !== this.state.stateText) {
      this.setState({
        status: newStatus, 
        stateText: newState,
        clockText: this.getClockText()
      });
    }
  };

  /*<div className={this.state.status + " icon"}></div> */
  render() {
    return (
      <div className="led-status">
      <div className="text">
      <div className="status">Status: <span className={this.state.status}>{this.state.stateText}</span></div>
      <div className="clock">{this.state.clockText}</div>
      </div>
      <EnableButton isOn={this.props.isOn} onUpdate={this.props.onUpdate}/>
      </div>
    );
  };
};

export default Status;
