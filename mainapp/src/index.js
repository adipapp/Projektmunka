import React from 'react';
import ReactDOM from 'react-dom';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import $ from 'jquery';
import Calendar from './js/calendar.js';
import Homepage from './js/homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './css/mainapp.scss';

import userData from 'userData';

/* globals __webpack_public_path__ */
__webpack_public_path__ = `${window.STATIC_URL}/mainapp/src/`;

const Privileges = {
    SUPERUSER: [],
    BIRALHAT: [],
    SZABIT_KIIRHAT: [],
    ADATOT_MODOSITHAT: [],
    ORAREND_FELELOS: [],
};
const Actions = {

};
const Views = {
    USERLIST: 1,
    HOLIDAY: 2,
    HOLIDAYAPPROVE: 3,
};
var CurrentView;
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
function getISODayNumber(dt) {
    return (dt.getDay() === 0 ? 6 : dt.getDay()-1);
}
function GetUserData(){

}
function CanDo(action){

}
class Main extends React.Component{
    constructor(){
        super();
    }
    componentDidMount(){
        console.log(userData);
        console.log(userData.user);
    }
    render(){
        return(
            <HashRouter>
                <div className="topheader">
                    <div >
                        Széchenyi István Egyetem - Űrlapok {userData.user.name}
                    </div>
                </div>
                <div>
                    <ul className="header">
                        <li><NavLink exact to ="/">home</NavLink></li>
                        <li><NavLink to ="/asd">szabadság</NavLink></li>
                        <li><NavLink to ="#">Felhasználók kezelése</NavLink></li>
                        <li><NavLink to ="#">Saját adatok módosítása</NavLink></li>
                        <li><NavLink to ="#" style={{float:'right'}}>kilépés</NavLink></li>
                    </ul>
                    <Route exact path ="/" component={Homepage}/>
                    <Route path ="/asd" component={Calendar}/>
                </div>
            </HashRouter>
        );
    }
}
// ========================================

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);