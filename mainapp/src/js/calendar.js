import React from 'react'
import $ from 'jquery'
import Dropdown from './dropdown.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../css/calendar.scss'

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

class CalendarElement extends React.Component{
    render(){
        let disabled = false;
        if (this.props.actualDate.getMonth() !== this.props.selectedDate.getMonth()) {
            disabled = true;
        }
        return(
            <div className={disabled ? "calendar-day font-grey" : "calendar-day"}>
                <div className="calendar-day-number">{this.props.actualDate.getDate()}</div>
                <Dropdown index={this.props.index} disabled={disabled} options={dropdownOptions} selectionChanged={(index, data) =>this.props.selectionChanged(index, data)} selected={this.props.selected}/>
            </div>
        );
    }
}

class Calendar extends React.Component{
    constructor(props){
        super(props);
        let sd = new Date();
        sd.setDate(1);
        let cfd = new Date(sd);
        cfd.setDate(-(getISODayNumber(cfd)-1));
        this.state = {
            calendarFirstDay: cfd,
            selectedDate: sd,
            selectedStates: [],
        };
        for(let i = 0; i < 42; i++){
            this.state.selectedStates.push(dropdownOptions[0]);
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
    selectionChanged(index, value){
        const state = this.state.selectedStates.slice();
        state[index] = value;
        this.setState({selectedStates: state});
    }
    monthChange(dir) {
        let sd = new Date(this.state.selectedDate);
        if (dir === "left"){
            sd.setMonth(sd.getMonth() - 1);
            let cfd = new Date(sd);
            cfd.setDate(-(getISODayNumber(cfd)-1));
            this.setState({selectedDate: sd, calendarFirstDay: cfd});
        }
        else if (dir === "right"){
            sd.setMonth(sd.getMonth() + 1);
            let cfd = new Date(sd);
            cfd.setDate(-(getISODayNumber(cfd)-1));
            this.setState({selectedDate: sd, calendarFirstDay: cfd});
            console.log(cfd);
            console.log(sd);
        }
        let tempState = [];

        for(let i = 0; i < 42; i++){
            tempState.push(dropdownOptions[0]);
        }
        this.setState({selectedStates: tempState})
    }
    renderSUM(){
        let F, E, T, J, I, B, H;
        F = E = T = J = I = B = H = 0;
        for(let i = 0; i < 42; i++) {
            if (this.state.selectedStates[i].label === "F") {
                F++;
            } else if (this.state.selectedStates[i].label === "E") {
                E++;
            } else if (this.state.selectedStates[i].label === "T") {
                T++;
            } else if (this.state.selectedStates[i].label === "J") {
                J++;
            } else if (this.state.selectedStates[i].label === "I") {
                I++;
            } else if (this.state.selectedStates[i].label === "B") {
                B++;
            } else if (this.state.selectedStates[i].label === "H") {
                H++;
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
            </div>
        );
    }
    dateToString(date){
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
    save(){
        let data = [];
        for (let i = 0; i < 42; i++) {
            if (this.state.selectedStates[i].value === 0) {
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
        console.log(data); //10.4.240.235
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
                        <button type="button" className="btn btn-secondary" onClick={() => this.save()}>Mentés</button>
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
                    </div>
                    {this.renderSUM()}
                </div>
            </div>
        );
    }
}
export default Calendar;