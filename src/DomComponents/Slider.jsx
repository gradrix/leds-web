import React from 'reactn';
import DynamicSlider from './DynamicSlider.jsx'
import DynamicSliderButton from './DynamicSliderButton.jsx'

class Slider extends React.Component {
   
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
        };
    };

    //TODO remove this
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
