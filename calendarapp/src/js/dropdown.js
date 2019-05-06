import React from 'react'
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

//porps: index, selected item, options, disabled, selection changed event handler (index, selected item)
class Dropdown extends React.Component{
    renderOptions(options){
        let optionTags = [];
        for(let i = 0; i < options.length; i++){
            if ("options" in options[i]){
                if (options[i].label == 'Szabadság' && this.props.rejected) {
                    optionTags.push(
                        <optgroup disabled label={options[i].label}>
                            {this.renderOptions(options[i].options)}
                        </optgroup>
                    );
                }
                else {
                    optionTags.push(
                        <optgroup label={options[i].label}>
                            {this.renderOptions(options[i].options)}
                        </optgroup>
                    );
                }
            }
            else{
                optionTags.push(
                    <option key={this.props.index + "-option-" + i} value={options[i].value}>{options[i].label}</option>
                );
            }
        }
        return optionTags;
    }
    handleChange(e){
        this.props.selectionChanged(this.props.index, this.getSelectedItemByValue(this.props.options, e.target.value));
    }
    getSelectedItemByValue(options, value){
        for(let i = 0; i < options.length; i++){
            if ("options" in options[i]){
                const tempOption = this.getSelectedItemByValue(options[i].options, value);
                if (tempOption != null){
                    return tempOption;
                }
            }
            else{
                if (options[i].value == value){
                    return options[i];
                }
            }
        }
        return null;
    }
    getIsTravel(option){
        let isTravel = false;
        for (let i = 0; i < this.props.options[2].options.length; i++){
            if (this.props.options[2].options[i] == option) {
                isTravel = true;
            }
        }
        return isTravel;
    }
    render(){
        let bgColor;
        if (this.props.approved == 1){
            bgColor = "#90ee90";
        } else if (this.props.approved == 0){
            bgColor = "#ffff90";
        }
        else if (this.props.approved == 2){
            bgColor = "#ff594f"
        }
        if (this.getIsTravel(this.props.selected)){
            bgColor = "#89a8ff"
        }
        if (this.props.disabled) {
            return(
                <select disabled style={{backgroundColor: bgColor}} className="form-control" id={this.props.index} onChange={this.handleChange.bind(this)} value={this.props.selected.value} key={"dropdown" + this.props.index}>
                    {this.renderOptions(this.props.options)}
                </select>
            );
        }
        return(
            <select className="form-control" style={{backgroundColor: bgColor}} id={this.props.index} onChange={this.handleChange.bind(this)} value={this.props.selected.value} key={"dropdown" + this.props.index}>
                {this.renderOptions(this.props.options)}
            </select>
        );
    }
}

export default Dropdown;