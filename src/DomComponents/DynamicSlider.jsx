import 'rc-slider/assets/index.css';

import React from 'reactn';
import Slider from 'rc-slider';

class DynamicSlider extends React.Component {

    constructor(props) {
        super(props);

        this.sliderProps = props.sliderProps;
    };

    state = {
        value: this.props.value,
    };

    onSliderChange = (newValue) => {
        this.sliderProps.onUpdate(this.sliderProps.id, newValue, false);
    };

    onAfterChange = (newValue) => {
        this.sliderProps.onUpdate(this.sliderProps.id, newValue, true);
    };

    //TODO remove this
    componentWillReceiveProps(newProps) {
        if (newProps.sliderProps.value !== this.state.value) {
            this.setState({ value: newProps.sliderProps.value });
        }
    };

    render() {
        return <Slider value={this.state.value} min={this.sliderProps.min} max={this.sliderProps.max} onChange={this.onSliderChange} onAfterChange={this.onAfterChange}/>        
    }
}

export default DynamicSlider;