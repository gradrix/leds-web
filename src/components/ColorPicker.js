import React from "react";
import { connect } from "react-redux";
import { SketchPicker } from 'react-color';

import { setLedStatus } from "../redux/actions/ledStatusActions";

class ColorPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showColorPicker: false
        };
    }

    handleChangeComplete = (color) => {
        this.props.setLedStatus("color", color.hex.replace('#',''))
    };

    handleRandomButtonClick = () => {
        this.setState({
            showColorPicker: false
        });
        this.props.setLedStatus("color", "")
    };

    handleSelectButtonClick = () => {
        this.setState({
            showColorPicker: true
        });
    };

    render() {
        return <div>
                    <label>Color</label>
                    <div className="color-picker-controls">
                        <button onClick={ this.handleSelectButtonClick }>Select</button>
                        <button onClick={ this.handleRandomButtonClick }>Random</button>
                    </div>
                    <div className="color-picker-container" style={{ "visibility": this.state.showColorPicker ? "visible" : "hidden" }} >
                        <SketchPicker
                            display={ this.state.showColorPicker }
                            color={ this.props.color }
                            disableAlpha="true"
                            position="center"
                            onChangeComplete={ this.handleChangeComplete }
                        />
                    </div>
        </div>;
    }
}

const mapStateToProps = state => {
    const { ledStatus } = state;
    const isRandom = !ledStatus.color 
    const color = !isRandom ?
        "#"+ledStatus.color : "#0000FF"
    return { color };
};

export default connect(
    mapStateToProps,
    { setLedStatus }
)(ColorPicker);