import React from 'react';
import $ from 'jquery';
import Dropdown from './dropdown.js';
import {CanDo, Actions, TargetUser, SetTargetUser} from './privileges.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../css/calendar.scss'

import userData from 'userData';


const dropdownOptions = [
    {label: "Válassz", value: 0},
    {
        label: "Szabadság",
        options: [
            {label: "F", value: 1},
            {label: "E", value: 2},
            {label: "T", value: 3},
            {label: "J", value: 4},
            {label: "I", value: 5},
            {label: "B", value: 6},
            {label: "H", value: 7},
            {label: "A", value: 8}
        ]
    },
    {
        label: "Utazás",
        options: [
            {label: "E", value: 9},
            {label: "EE", value: 10},
            {label: "K", value: 11},
        ]
    }
];
const days = [
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
    "Vasárnap",
];
const months = [
    "Január",
    "Február",
    "Március",
    "Április",
    "Május",
    "Június",
    "Július",
    "Augusztus",
    "Szeptember",
    "Október",
    "November",
    "December",
];

function getISODayNumber(dt) {
    return (dt.getDay() === 0 ? 6 : dt.getDay()-1);
}
function getRoundedDate(dt){
    const dateString = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    return new Date(Date.parse(dateString));
}
function getSelectedItemByValue(options, value){
    for(let i = 0; i < options.length; i++){
        if ("options" in options[i]){
            const tempOption = getSelectedItemByValue(options[i].options, value);
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
class CalendarElement extends React.Component{
    isDayDisabled(){
        if (this.props.actualDate.getMonth() !== this.props.selectedDate.getMonth() || getISODayNumber(this.props.actualDate) > 4 || (!CanDo(Actions.MODIFY_OTHERS_HOLIDAY) && TargetUser != null)){
            return true;
        }
        return false;
    }
    handleCostChange(e){
        this.props.costChanged(this.props.index, e.target.value);
    }
    render(){
        const disabled = this.isDayDisabled();
        let isTravel = false;
        for (let i = 0; i < dropdownOptions[2].options.length; i++){
            if (dropdownOptions[2].options[i] == this.props.selected.option) {
                isTravel = true;
            }
        }
        return(
            <div className={disabled ? "calendar-day font-grey" : "calendar-day"}>
                <div className="calendar-day-number">{this.props.actualDate.getDate()}</div>
                <Dropdown
                    index={this.props.index}
                    disabled={disabled}
                    options={dropdownOptions}
                    selectionChanged={(index, data) =>this.props.selectionChanged(index, data)}
                    selected={this.props.selected.option}
                    approved={this.props.selected.approved}/>
                {isTravel ? <input type="number" className="form-control" value={this.props.selected.cost} onChange={this.handleCostChange.bind(this)}/> : ""}
            </div>
        );
    }
}
const exampleState = {
    date: '2019-04-30',
    approved: false,
    option: null,
    isTravel: false,
    cost: 0,
};
class Calendar extends React.Component{
    constructor(props){
        super(props);7
        let sd = getRoundedDate(new Date());
        sd.setDate(1);
        let cfd = getRoundedDate(new Date(sd));
        cfd.setDate(-(getISODayNumber(cfd)-1));
        this.state = {
            calendarFirstDay: cfd,
            selectedDate: sd,
            selectedStates: [],
            originalState: [],
        };
        for(let i = 0; i < 42; i++){
            this.state.selectedStates.push({
                date: null,
                approved: null,
                option: dropdownOptions[0],
                isTravel: false,
                cost: 0,
            });
        }
    }
    componentDidMount(){
        this.loadData(this.state.calendarFirstDay);
    }
    createTable() {
        let dayDivs = [];
        let d = new Date(this.state.calendarFirstDay);
        for(let i = 0; i < 42; i++){
            dayDivs.push(
                <CalendarElement
                    index={i}
                    actualDate={new Date(d)}
                    selectedDate={this.state.selectedDate}
                    key={'calendar-element-' + i}
                    selected={this.state.selectedStates[i]}
                    selectionChanged={(index, data) => this.selectionChanged(index, data)}
                    costChanged={(index, data) => this.handleCostChange(index, data)}
                />
            );
            d.setDate(d.getDate()+1);
        }
        return dayDivs;
    }
    handleCostChange(index, value){
        const state = this.state.selectedStates.slice();
        state[index].cost = value;
        this.setState({selectedStates: state});
    }
    selectionChanged(index, value){
        const state = this.state.selectedStates.slice();
        state[index].option = value;
        if (value == dropdownOptions[0]){
            state[index].approved = null;
            state[index].cost = 0;
        }
        else if (this.state.originalState[index].option == value && value != dropdownOptions[0]){
            state[index].approved = this.state.originalState[index].approved;
            state[index].cost = this.state.originalState[index].cost;
        }
        else if (value != dropdownOptions[0]){
            state[index].approved = 0;
        }
        this.setState({selectedStates: state});
    }
    monthChange(dir) {
        let sd = new Date(this.state.selectedDate);
        if (dir === "left"){
            sd.setMonth(sd.getMonth() - 1);
            let cfd = new Date(sd);
            cfd.setDate(-(getISODayNumber(cfd)-1));
            this.setState({selectedDate: sd, calendarFirstDay: cfd});
            this.loadData(cfd);
        }
        else if (dir === "right"){
            sd.setMonth(sd.getMonth() + 1);
            let cfd = new Date(sd);
            cfd.setDate(-(getISODayNumber(cfd)-1));
            this.setState({selectedDate: sd, calendarFirstDay: cfd});
            this.loadData(cfd);
        }
    }
    renderSUM(){
        let F, E, T, J, I, B, H, A;
        F = E = T = J = I = B = H = A = 0;
        for(let i = 0; i < 42; i++) {
            if (this.state.selectedStates[i].option === dropdownOptions[1].options[0]) {
                F++;
            } else if (this.state.selectedStates[i].option === dropdownOptions[1].options[1]) {
                E++;
            } else if (this.state.selectedStates[i].option === dropdownOptions[1].options[2]) {
                T++;
            } else if (this.state.selectedStates[i].option === dropdownOptions[1].options[3]) {
                J++;
            } else if (this.state.selectedStates[i].option === dropdownOptions[1].options[4]) {
                I++;
            } else if (this.state.selectedStates[i].option === dropdownOptions[1].options[5]) {
                B++;
            } else if (this.state.selectedStates[i].option === dropdownOptions[1].options[6]) {
                H++;
            } else if (this.state.selectedStates[i].option === dropdownOptions[1].options[7]) {
                A++;
            }
        }
        return (
            <div className="holdiay-sum-column">
                <h6 id="F">{F}</h6>
                <h6 id="E">{E}</h6>
                <h6 id="T">{T}</h6>
                <h6 id="J">{J}</h6>
                <h6 id="I">{I}</h6>
                <h6 id="B">{B}</h6>
                <h6 id="H">{H}</h6>
                <h6 id="A">{A}</h6>
            </div>
        );
    }
    dateToString(date){
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
    dateToStringDateOnly(date){
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
    loadData(date){
        let endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 42);
        let targetUser = null;
        if (this.props.targetUser != null && CanDo(Actions.APPROVE_HOLIDAY) || CanDo(Actions.MODIFY_OTHERS_HOLIDAY)){
            targetUser = TargetUser;
        }
        else{
            let targetUser = userData;
        }
        const data = {
            requestUser: userData,
            targetUser: null,
            requestType: "getCalendarData",
            dateFrom: this.dateToStringDateOnly(date),
            dateTo: this.dateToStringDateOnly(endDate)
        };
        const cfd = date;
        let state = [];
        let ostate = [];
        for (let i = 0; i < 42; i++){
            let dt = new Date(cfd);
            dt.setDate(dt.getDate() + i);
            state.push({
                date: null,
                approved: null,
                option: dropdownOptions[0],
                isTravel: false,
                cost: 0,
            });
        }
        for (let i = 0; i < 42; i++){
            let dt = new Date(cfd);
            dt.setDate(dt.getDate() + i);
            ostate.push({
                date: null,
                approved: null,
                option: dropdownOptions[0],
                isTravel: false,
                cost: 0,
            });
        }
        $.ajax({
            type:"POST",
            url: "http://localhost/getData.php",
            data: {data:data},
            success: function (data) {
                const returnData = JSON.parse(data);
                for (let i = 0; i < returnData.length; i++){
                    const d = new Date(Date.parse(returnData[i].date));
                    state[Math.floor((d-cfd)/1000/60/60/24)] = {
                        date: d,
                        approved: returnData[i].approved,
                        option: getSelectedItemByValue(dropdownOptions, returnData[i].optionValue),
                        isTravel: returnData[i].isTravel,
                        cost: returnData[i].cost,
                    };
                    ostate[Math.floor((d-cfd)/1000/60/60/24)] = {
                        date: d,
                        approved: returnData[i].approved,
                        option: getSelectedItemByValue(dropdownOptions, returnData[i].optionValue),
                        isTravel: returnData[i].isTravel,
                        cost: returnData[i].cost,
                    };
                }
                this.setState({selectedStates: state, originalState: ostate});
            }.bind(this),
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
    }
    saveData(){
        let data = [];
        for (let i = 0; i < 42; i++) {
            if (this.compareStates(this.state.originalState[i], this.state.selectedStates[i])) {
                continue;
            }
            let dt = new Date(this.state.calendarFirstDay);
            dt.setDate(dt.getDate() + i);
            const dateString = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
            data.push({
                date:  dateString,
                value: this.state.selectedStates[i].value,
            });
        }
        $.ajax({
            type:"POST",
            url: "http://localhost/save.php",
            data: {data: data},
            success: function (data) {
                console.log("success");
                console.log(data);
            },
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
    }
    compareStates(original, current){
        if (original.date == current.date && original.approved == current.approved && original.option == current.option && original.isTravel == current.isTravel && original.cost == current.cost ) {
            return true;
        }
        return false;
    }
    render() {
        return (
            <div className="calendar-container">
                <div className="calendar-header">
                    <div className="btn-group calendar-header-left">
                        <button type="button" className="btn btn-secondary" onClick={() => this.monthChange("left")}>&lt;-</button>
                        <button type="button" className="btn btn-secondary" onClick={() => this.monthChange("right")}>-&gt;</button>
                    </div>
                    <div >

                    </div>
                    <div className="calendar-header-center">{this.state.selectedDate.getFullYear()+ " " + months[this.state.selectedDate.getMonth()]}</div>
                    <div>
                    </div>
                    <div className="btn-group btn-group-toggle calendar-header-right" data-toggle="buttons">
                        <button type="button" className="btn btn-secondary" onClick={() => this.saveData()}>Mentés</button>
                    </div>
                </div>
                <div className="calendar-container-day-headers">
                    <div className="calendar-day-header">{days[0]}</div>
                    <div className="calendar-day-header">{days[1]}</div>
                    <div className="calendar-day-header">{days[2]}</div>
                    <div className="calendar-day-header">{days[3]}</div>
                    <div className="calendar-day-header">{days[4]}</div>
                    <div className="calendar-day-header">{days[5]}</div>
                    <div className="calendar-day-header">{days[6]}</div>
                </div>
                <div className="calendar-container-days">
                    {this.createTable()}
                </div>
                <div className="holdiay-sum-row">
                    <h3>Összesített távollét</h3>
                    <div className="holdiay-sum-column">
                        <h6 title="Fizetett tárgyévi szabadság">F</h6>
                        <h6 title="Fizetett előző évi szabadság">E</h6>
                        <h6 title="Tanulmányi szabadság">T</h6>
                        <h6 title="Jutalomszabadság">J</h6>
                        <h6 title="Fizetés nélküli igazolt távollét">I</h6>
                        <h6 title="Betegség">B</h6>
                        <h6 title="Igazolatlan távollét">H</h6>
                        <h6 title="Apa nap">A</h6>
                    </div>
                    {this.renderSUM()}
                </div>
            </div>
        );
    }
}
export default Calendar;