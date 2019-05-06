import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Dropdown from './js/dropdown.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './css/calendar.scss'

const dropdownOptions = [
    {label: "Válassz", value: 0},
    {
        label: "Szabadság",
        options: [
            {label: "Fizetett", value: 1},
            {label: "Fezetett előzőévei", value: 2},
            {label: "Tanulmányi", value: 3},
            {label: "Jutalom", value: 4},
            {label: "Fizetés nélküli", value: 5},
            {label: "Betegség", value: 6},
            {label: "Igazolatlan", value: 7},
            {label: "Apanap", value: 8}
        ]
    },
    {
        label: "Utazás",
        options: [
            {label: "Egyéni-1 út", value: 9},
            {label: "Egyéni-2 út", value: 10},
            {label: "Közösségi", value: 11},
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
        if (this.props.actualDate.getMonth() !== this.props.selectedDate.getMonth() || getISODayNumber(this.props.actualDate) > 4 || this.props.selected.approved == 1 || this.props.selected.approved == 10){
            return true;
        }
        return false;
    }
    render(){
        const disabled = this.isDayDisabled();
        const rejected = this.props.selected.approved == 2 ? true : false;
        return(
            <div className={disabled ? "calendar-day font-grey" : "calendar-day"}>
                <div className="calendar-day-number">{this.props.actualDate.getDate()}</div>
                <Dropdown
                    index={this.props.index}
                    disabled={disabled}
                    rejected={rejected}
                    options={dropdownOptions}
                    selectionChanged={(index, data) =>this.props.selectionChanged(index, data)}
                    selected={this.props.selected.option}
                    approved={this.props.selected.approved}/>
            </div>
        );
    }
}
const exampleState = {
    date: '2019-04-30',
    approved: false,
    option: null,
    isTravel: false,
};
class Calendar extends React.Component{
    constructor(props){
        super(props);
        let sd = getRoundedDate(new Date());
        sd.setDate(1);
        let cfd = getRoundedDate(new Date(sd));
        cfd.setDate(-(getISODayNumber(cfd)-1));
        this.state = {
            calendarFirstDay: cfd,
            selectedDate: sd,
            selectedStates: [],
            originalStates: [],
        };
        for(let i = 0; i < 42; i++){
            this.state.selectedStates.push({
                date: null,
                approved: null,
                option: dropdownOptions[0],
                isTravel: false,
            });
            this.state.originalStates.push({
                date: null,
                approved: null,
                option: dropdownOptions[0],
                isTravel: false,
            });
        }
    }
    componentDidMount(){
        this.loadData(this.state.calendarFirstDay);
    }
    createNotification(type, message = "", title = "", timeout = 5000){
        switch (type) {
            case 'info':
                return NotificationManager.info(message, title, timeout);
            case 'success':
                return NotificationManager.success(message, title, timeout);
            case 'warning':
                return NotificationManager.warning(message, title, timeout);
            case 'error':
                return NotificationManager.error(message, title, timeout);
        }
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
                />
            );
            d.setDate(d.getDate()+1);
        }
        return dayDivs;
    }
    getIsTravel(option){
        let isTravel = false;
        for (let i = 0; i < dropdownOptions[2].options.length; i++){
            if (dropdownOptions[2].options[i] == option) {
                isTravel = true;
            }
        }
        return isTravel;
    }
    selectionChanged(index, value){
        const state = this.state.selectedStates.slice();
        state[index].option = value;
        state[index].isTravel = this.getIsTravel(value);
        if (value == dropdownOptions[0]){
            state[index].approved = null;
        }
        else if (this.state.originalStates[index].option == value && value != dropdownOptions[0]){
            state[index].approved = this.state.originalStates[index].approved;
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
        endDate.setDate(endDate.getDate() + 41);
        const data = {
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
            });
        }
        $.ajax({
            type:"POST",
            url: "http://adampapp.ddns.net/projektmunka/szabadsagleker",
            data: {data:data},
            success: function (data) {
                const returnData = JSON.parse(data);
                //console.log(returnData)
                for (let i = 0; i < returnData.length; i++){
                    const d = new Date(Date.parse(returnData[i].date));
                    state[Math.floor((d-cfd)/1000/60/60/24)] = {
                        date: d,
                        approved: returnData[i].approved,
                        option: getSelectedItemByValue(dropdownOptions, returnData[i].optionValue),
                        isTravel: returnData[i].isTravel,
                    };
                    ostate[Math.floor((d-cfd)/1000/60/60/24)] = {
                        date: d,
                        approved: returnData[i].approved,
                        option: getSelectedItemByValue(dropdownOptions, returnData[i].optionValue),
                        isTravel: returnData[i].isTravel,
                    };
                }
                this.setState({selectedStates: state, originalStates: ostate});
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
            if (this.state.originalStates[i].option == this.state.selectedStates[i].option) {
                continue;
            }
            let dt = new Date(this.state.calendarFirstDay);
            dt.setDate(dt.getDate() + i);
            const dateString = this.dateToStringDateOnly(dt);
            if (this.state.selectedStates[i].option == dropdownOptions[0]) {
                data.push({
                    date:  dateString,
                    approved: 0,
                    optionValue: this.state.selectedStates[i].option.value,
                    isTravel: this.state.originalStates[i].isTravel
                });
            }
            else{
                data.push({
                    date:  dateString,
                    approved: this.state.selectedStates[i].approved,
                    optionValue: this.state.selectedStates[i].option.value,
                    isTravel: this.state.selectedStates[i].isTravel
                });
            }
        }
        //console.log(data);
        this.createNotification("info", "Mentés folyamatban!");
        $.ajax({
            type:"POST",
            url: "http://adampapp.ddns.net/projektmunka/szabadsag",
            data: {data: {szabadsag: data}},
            success: function (data) {
                console.log("success");
                console.log(data);
                this.createNotification("success", "Sikeres mentés!");
                this.loadData(this.state.calendarFirstDay);
            }.bind(this),
            error: function (data) {
                console.log("error");
                console.log(data);
                this.createNotification("error", "Sikertelen mentés!");
                this.loadData(this.state.calendarFirstDay);
            }.bind(this)
        });
    }
    compareStates(original, current){
        if (original.date == current.date && original.approved == current.approved && original.option == current.option && original.isTravel == current.isTravel) {
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
                <NotificationContainer/>
            </div>
        );
    }
}

ReactDOM.render(
    <Calendar/>,
    document.getElementById('root')
);