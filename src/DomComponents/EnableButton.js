import React from "react";

class EnableButton extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isOn: props.isOn,
        };
        this.onUpdate = props.onUpdate;
        this.toggleLeds = this.toggleLeds.bind(this);
    };

    getClassName() {
        var className = "button ";
        if (this.state.isOn !== null) {
            className += this.state.isOn ? "off" : "on";
        }
        else {
            className += "disabled";
        }
        return className;
    }

    toggleLeds() {
        if (this.state.isOn !== null) {
            this.onUpdate("isOn", !this.state.isOn, true);        
        }
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            isOn: newProps.isOn,
        });
    };

    render() {
        return (
            <div className={this.getClassName()} onClick={this.toggleLeds}>
            </div>
        );
    };
};

export default EnableButton;
