import React from "react";
import { connect } from 'react-redux';

import { fetchLedStatus } from "./redux/actions/ledStatusActions";
import { fetchLayoutSettings } from "./redux/actions/layoutSettingsActions";
import StatusContainer from './components/StatusContainer';
import SliderContainer from "./components/SliderContainer";
import ProgramSelector from "./components/ProgramSelector";
import ColorPicker from "./components/ColorPicker";

class LedsClient extends React.Component {

  constructor(props) {
    if (!props.serviceIndex) {
      props.serviceIndex = 1
    }
    
    super(props);
  }

  getLedStatus() {
    this.updateModeLayoutIfNeeded();
    this.props.fetchLedStatus({serviceIndex: this.props.serviceIndex});
  }

  updateModeLayoutIfNeeded() {
    if (this.props.currentMode !== this.props.mode) {
      this.props.fetchLayoutSettings({serviceIndex: this.props.serviceIndex});
    }
  };

  componentDidMount() {
    this.getLedStatus();

    this.timerId = setInterval(
      () => this.getLedStatus(),
      5000
    );
  };

  componentWillUnmount() {
    clearInterval(this.timerId);
  };
 
  render() {
    return (
      <div className="LedsApp">
        <header className="App-header">
          <h1 className="App-title">{this.props.modeName} Control</h1>
        </header>
        <StatusContainer />
        <SliderContainer label="Brightness" settingKey="brightness" />
        <SliderContainer label="Speed" settingKey="speed" min={this.props.minSpeed} max={this.props.maxSpeed}/>
        <br/>
        <ProgramSelector />
        <br/>
        <ColorPicker />
    </div>
    );
  };
}

const mapStateToProps = state => {
  const { ledStatus, layoutSettings } = state;
  
  const ledProgram = layoutSettings.modes.find(m => m.id === ledStatus.mode)

  return { 
    isOn: ledStatus.isOn,
    modeName: ledProgram ? ledProgram.name : "Led",
    currentMode: ledStatus.mode,
    mode: layoutSettings.modeIndex,
    minSpeed: layoutSettings.minSpeed, 
    maxSpeed: layoutSettings.maxSpeed 
  };
};

function buildLedsClient(serviceIndex) {
  console.log(serviceIndex);
  return connect(
    mapStateToProps,
    { fetchLedStatus, fetchLayoutSettings }
  )(LedsClient);
}

export { buildLedsClient };
