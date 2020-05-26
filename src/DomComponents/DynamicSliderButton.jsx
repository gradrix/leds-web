import '../bootstrap/css/bootstrap.css'
import '../bootstrap/css/bootstrap-theme.css'

import React from 'react';

class DynamicSliderButton extends React.Component {

    constructor(props) {
        super(props);

        this.sliderProps  = props.sliderProps;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    };

    state = {
        value: this.props.value,
    };
    btnTimer = null;
    btnCycleCount = 1;
    btnPressTimeStamp = null;

    changeValue(commitChanges) {
        var newValue = this.props.position === "right" ? this.state.value + 1 : this.state.value - 1;
        if (newValue > this.sliderProps.max || newValue < this.sliderProps.min) return;
        this.setState({value: newValue});
        this.sliderProps.onUpdate(this.sliderProps.id, newValue, commitChanges);
    };

    clickHandler() {
        if (this.btnCycleCount > 10)
            this.btnCycleCount = 1;

        var refresh = false;
        var timeSinceClick = (new Date() - this.btnPressTimeStamp);

        if (timeSinceClick >= 0  && timeSinceClick <= 1000 
            && this.timeSinceLastUpdate >= 500) {
            refresh = true;
        } 
        else if (timeSinceClick > 1000 && timeSinceClick <= 2500 
            && this.timeSinceLastUpdate >= 250) {
            refresh = true;
        } 
        else if (timeSinceClick > 2500 && timeSinceClick <= 5000
            && this.timeSinceLastUpdate >= 125) {
            refresh = true;
        }
        else if (timeSinceClick > 5000 && timeSinceClick <= 8000
            && this.timeSinceLastUpdate >= 50) {
            refresh = true; 
        }
        else if (timeSinceClick > 8000 && this.timeSinceLastUpdate >= 5) {
            refresh = true;
        }

        if (refresh) {
            this.changeValue(false);
            this.lastUpdate = new Date();
            this.timeSinceLastUpdate = 0;
        } 
        else {
            this.timeSinceLastUpdate = (new Date() - this.lastUpdate);
        }
        this.btnCycleCount++;
    };

    onMouseDown() {
        var self = this;
        this.changeValue(false);
        this.btnCycleCount = false;
        this.btnPressTimeStamp = new Date();
        this.timeSinceLastUpdate = 0;
        this.lastUpdate = new Date();
        this.btnTimer = setInterval( function() {
            self.clickHandler();
        }, 10);
    };

    onMouseUp() {        
        clearTimeout(this.btnTimer);
        this.sliderProps.onUpdate(this.sliderProps.id, this.state.value, true);
    };

    componentWillReceiveProps(newProps) {
        if (newProps.value !== this.state.value) {
            this.setState({ value: newProps.value });
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.btnTimer === null;
    };

    render() {
        return <button className={(this.props.position + " btn btn-outline-primary")} onTouchStart={this.onMouseDown} onTouchEnd={this.onMouseUp} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>{this.props.title}</button>
    };
}

export default DynamicSliderButton;