import React from 'react';
import DynamicSlider from './DynamicSlider.js'
import DynamicSliderButton from './DynamicSliderButton.js'

class Slider extends React.Component {
   
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
        };
    };
        
    componentWillReceiveProps(newProps) {
        if (newProps.value !== this.state.value) {
            this.setState({ value: newProps.value });
        }
    };

    render() {
        return (
            <div className="led-slider">
                <DynamicSliderButton position={"left"} title={"Decrease"} sliderProps={this.props} value={this.state.value}/>
                <DynamicSliderButton position={"right"} title={"Increase"} sliderProps={this.props} value={this.state.value}/>
	        <label>{this.props.label}: {this.state.value}</label>
	        <DynamicSlider sliderProps={this.props} value={this.state.value}/>
	     </div>
	);
    };
};

export default Slider;
