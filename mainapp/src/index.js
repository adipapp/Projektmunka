import React from 'react';
import ReactDOM from 'react-dom';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import $ from 'jquery';
import Calendar from './js/calendar.js';
import Homepage from './js/homepage.js';
import UserList from "./js/userlist";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './css/mainapp.scss';

import userData from 'userData';
import {CanDo, Actions} from "./js/privileges";

/* globals __webpack_public_path__ */
__webpack_public_path__ = `${window.STATIC_URL}/mainapp/src/`;

function dateToString(date){
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function getISODayNumber(dt) {
    return (dt.getDay() === 0 ? 6 : dt.getDay()-1);
}
function GetUserData(){

}

var targetUser = null;

class Main extends React.Component{
    constructor(){
        super();
    }
    componentDidMount(){

    }
    renderRoutes(){
        let routes = [];

    }
    render(){
        let navlinks = [];
        let routes = [];
        if (CanDo(Actions.APPROVE_HOLIDAY)){
            navlinks.push(<li><NavLink to ="/ApproveList">Jóváhagyás</NavLink></li>);
            routes.push(<Route exact path ="/ApproveList" component={<div/>}/>);
        }
        if (CanDo(Actions.LIST_USERS)){
            navlinks.push(<li><NavLink to ="/UserList">Felhasználók kezelése</NavLink></li>);
            routes.push(<Route path ="/UserList" component={() => <UserList/>}/>);
        }
        return(
            <HashRouter>
                <div className="topheader">
                    <div >
                        Széchenyi István Egyetem
                    </div>
                </div>
                <div>
                    <ul className="header">
                        <li><NavLink exact to ="/">Home</NavLink></li>
                        <li><NavLink to ="/Holiday">Szabadság</NavLink></li>
                        {navlinks}
                        <li><NavLink to ="#">Saját adatok módosítása</NavLink></li>
                        <li><NavLink to ="#" style={{float:'right'}}>Kilépés</NavLink></li>
                    </ul>
                    <Route exact path ="/" component={() => <Homepage name={userData.user.name}/>}/>
                    <Route path ="/Holiday" component={() => <Calendar targetUser={targetUser}/>}/>
                    {routes}
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