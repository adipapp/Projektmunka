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
function dateToString(date){
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
var CurrentView;

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

    }
    render(){
        return(
            <HashRouter>
                <div className="topheader">
                    <div >
                        Széchenyi István Egyetem
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
                    <Route exact path ="/" component={() => <Homepage name={userData.user.name}/>}/>
                    <Route path ="/asd" component={() => <Calendar user={userData}/>}/>
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