import React from 'react';
import $ from 'jquery';
import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import {CanDo, Actions, TargetUser, SetTargetUser} from "./privileges";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import userData from 'userData';
import Calendar from "./calendar";

library.add(faCalendarAlt);

const userlist = [
    {
        userId: 1,
        name: "Tanszéki Ügyintéző",
        email: "tsz.ui@sze.hu",
        dateCreated: "2019-04-22 19:05:21",
        dateModified: "2019-04-22 19:05:21",
        inactive: false,
        privileges: {
            superuser: true,
            biralhat: true,
            szabit_kiirhat: true,
            adatot_modosithat: true,
            orarend_felelos: true,
        }
    },
    {
        userId: 2,
        name: "Tanszéki Ügyintéző2",
        email: "tsz.ui2@sze.hu",
        dateCreated: "2019-04-22 19:05:21",
        dateModified: "2019-04-22 19:05:21",
        inactive: false,
        privileges: {
            superuser: true,
            biralhat: true,
            szabit_kiirhat: false,
            adatot_modosithat: true,
            orarend_felelos: false,
        }
    },
];

const userSpacer = {
    userId: null,
    name: null,
    email: null,
    dateCreated: null,
    dateModified: null,
    inactive: null,
    privileges: {
        superuser: null,
        biralhat: null,
        szabit_kiirhat: null,
        adatot_modosithat: null,
        orarend_felelos: null,
    }
};

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {showDeleteModal: false, showModifyModal: false, showNewModal: false, selectedUser: userSpacer, users: [userSpacer,], originalUsers: [userSpacer,], redirect: false,};
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        let targetUser;
        const data = {
            requestUser: userData,
            targetUser: null,
            requestType: "getUserList",
            dateFrom: null,
            dateTo: null
        };
        let users = [];
        let ousers = [];
        $.ajax({
            type:"POST",
            url: "http://localhost/getData.php",
            data: {data:data},
            success: function (data) {
                users = JSON.parse(data);
                ousers = JSON.parse(data);
                this.setState({users: users, originalUsers: ousers});
            }.bind(this),
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
    }
    deepCopyUser(user){
        let copiedUser = {
            userId: user.userId,
            name: user.name,
            email: user.email,
            dateCreated: user.dateCreated,
            dateModified: user.dateModified,
            inactive: user.inactive,
            privileges: {
                superuser: user.privileges.superuser,
                biralhat: user.privileges.biralhat,
                szabit_kiirhat: user.privileges.szabit_kiirhat,
                adatot_modosithat: user.privileges.adatot_modosithat,
                orarend_felelos: user.privileges.orarend_felelos,
            }
        };
        return copiedUser;
    }
    showDelete(user){
        this.setState({showDeleteModal: true, selectedUser: this.deepCopyUser(user)});
    }
    hideDelete(){
        this.setState({showDeleteModal: false, selectedUser: userSpacer});
    }
    saveDelete(){
        let targetUser;
        const data = {
            requestUser: userData,
            targetUser: this.state.selectedUser,
            requestType: "deleteUser",
            dateFrom: null,
            dateTo: null
        };
        $.ajax({
            type:"POST",
            url: "http://localhost/setData.php",
            data: {data:data},
            success: function (data) {
                this.hideDelete();
                this.loadData();
            }.bind(this),
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
    }
    showModify(user){
        this.setState({showModifyModal: true, selectedUser: this.deepCopyUser(user)});
    }
    hideModify(){
        this.setState({showModifyModal: false, selectedUser: userSpacer});
    }
    saveModify(){
        let targetUser;
        const data = {
            requestUser: userData,
            targetUser: this.state.selectedUser,
            requestType: "updateUser",
            dateFrom: null,
            dateTo: null
        };
        $.ajax({
            type:"POST",
            url: "http://localhost/setData.php",
            data: {data:data},
            success: function (data) {
                this.hideModify();
                this.loadData();
            }.bind(this),
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
    }
    showNew(){
        this.setState({showNewModal: true, selectedUser: this.deepCopyUser(userSpacer)});
    }
    hideNew(){
        this.setState({showNewModal: false, selectedUser: userSpacer});
    }
    saveNew(){
        let targetUser;
        const data = {
            requestUser: userData,
            targetUser: this.state.selectedUser,
            requestType: "addUser",
            dateFrom: null,
            dateTo: null
        };
        console.log(data);
        $.ajax({
            type:"POST",
            url: "http://localhost/setData.php",
            data: {data:data},
            success: function (data) {
                this.hideNew();
                this.loadData();
            }.bind(this),
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
    }
    checkBoxChanged(param){
        if (param == 'szabit_kiirhat'){
            let user = this.state.selectedUser;
            user.privileges.szabit_kiirhat = !user.privileges.szabit_kiirhat;
            this.setState({selectedUser: user});
        } else if (param == 'biralhat') {
            let user = this.state.selectedUser;
            user.privileges.biralhat = !user.privileges.biralhat;
            this.setState({selectedUser: user});
        } else if (param == 'adatot_modosithat') {
            let user = this.state.selectedUser;
            user.privileges.adatot_modosithat = !user.privileges.adatot_modosithat;
            this.setState({selectedUser: user});
        } else if (param == 'inactive') {
            let user = this.state.selectedUser;
            user.inactive = !user.inactive;
            this.setState({selectedUser: user});
        }
    }
    nameChanged(e){
        let user = this.state.selectedUser;
        user.name = e.target.value;
        this.setState({selectedUser: user});
    }
    emailChanged(e){
        let user = this.state.selectedUser;
        user.email = e.target.value;
        this.setState({selectedUser: user});
    }
    passChanged(e){
        let user = this.state.selectedUser;
        user.password = e.target.value;
        this.setState({selectedUser: user});
    }
    handleCalendarClick(user){
        SetTargetUser(user);
        this.setState({redirect:true});
    }
    render(){
        if (this.state.redirect){
            return <Redirect to="/Holiday" />
        }
        return(
            <React.Fragment>
                <div>
                    {CanDo(Actions.ADD_USER) ? <Button variant="primary" onClick={this.showNew.bind(this)}>Új felhasználó</Button> : ""}
                </div>
                <table className="table table-hover">
                    <tr>
                        {CanDo(Actions.MODIFY_USER) || CanDo(Actions.DELETE_USER) ? <th className="text-center" scope="col">ID</th> : ""}
                        <th className="text-center" scope="col">Név</th>
                        <th className="text-center" scope="col">Email</th>
                        {CanDo(Actions.MODIFY_OTHERS_HOLIDAY) || CanDo(Actions.APPROVE_HOLIDAY) ? <th className="text-center" scope="col">Naptár</th> : ""}
                        {CanDo(Actions.MODIFY_USER) || CanDo(Actions.DELETE_USER) ? <th className="text-center" scope="col">Létrehozva</th> : ""}
                        {CanDo(Actions.MODIFY_USER) || CanDo(Actions.DELETE_USER) ? <th className="text-center" scope="col">Módosítva</th> : ""}
                        {CanDo(Actions.MODIFY_USER) || CanDo(Actions.DELETE_USER) ? <th className="text-center" scope="col">Szabdságot kiírhat?</th> : ""}
                        {CanDo(Actions.MODIFY_USER) || CanDo(Actions.DELETE_USER) ? <th className="text-center" scope="col">Szabadságot bírálhat?</th> : ""}
                        {CanDo(Actions.MODIFY_USER) || CanDo(Actions.DELETE_USER) ? <th className="text-center" scope="col">Más adatát módosíthatja?</th> : ""}
                        {CanDo(Actions.MODIFY_USER) || CanDo(Actions.DELETE_USER) ?  <th className="text-center" scope="col">Órarend felelős?</th> : ""}
                        {CanDo(Actions.MODIFY_USER) ? <th className="text-center" scope="col"></th> : ""}
                        {CanDo(Actions.DELETE_USER) ? <th className="text-center" scope="col"></th> : ""}
                    </tr>
                    {this.state.users.map( user =>  {
                        return(
                            <tr>
                                {CanDo(Actions.MODIFY_USER ) || CanDo( Actions.DELETE_USER) ?  <td className="text-center">{user.userId}</td> : ""}
                                <td className="text-center">{user.name}</td>
                                <td className="text-center">{user.email}</td>
                                {CanDo(Actions.MODIFY_OTHERS_HOLIDAY ) || CanDo(Actions.APPROVE_HOLIDAY) ? <td className="text-center"><div onClick={() => this.handleCalendarClick(user)}><FontAwesomeIcon icon="calendar-alt"/></div></td> : ""}
                                {CanDo(Actions.MODIFY_USER ) || CanDo( Actions.DELETE_USER) ?  <td className="text-center">{user.dateCreated}</td> : ""}
                                {CanDo(Actions.MODIFY_USER ) || CanDo( Actions.DELETE_USER) ?  <td className="text-center">{user.dateModified}</td> : ""}
                                {CanDo(Actions.MODIFY_USER ) || CanDo( Actions.DELETE_USER) ?  <td className="text-center">{user.privileges.szabit_kiirhat ? 'Igen':'Nem'}</td> : ""}
                                {CanDo(Actions.MODIFY_USER ) || CanDo( Actions.DELETE_USER) ?  <td className="text-center">{user.privileges.biralhat ? 'Igen':'Nem'}</td> : ""}
                                {CanDo(Actions.MODIFY_USER ) || CanDo( Actions.DELETE_USER) ?  <td className="text-center">{user.privileges.adatot_modosithat ? 'Igen':'Nem'}</td> : ""}
                                {CanDo(Actions.MODIFY_USER ) || CanDo( Actions.DELETE_USER) ?  <td className="text-center">{user.privileges.orarend_felelos ? 'Igen':'Nem'}</td> : ""}
                                {CanDo(Actions.MODIFY_USER) ? <td><button type="submit" onClick={() => this.showModify(user)} className="btn btn-secondary" disabled="">Módosít</button></td> : ""}
                                {CanDo(Actions.DELETE_USER) ? <td><button type="submit" onClick={() => this.showDelete(user)} className="btn btn-danger" disabled="">Töröl</button></td> : ""}
                            </tr>
                        );
                    })}
                </table>
                <Modal show={this.state.showModifyModal} onHide={this.hideModify.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Módosítás</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="id">ID:</label>
                            <input type="text" className="form-control" value={this.state.selectedUser.userId} readOnly="readonly"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Név:</label>
                            <input type="text" className="form-control" value={this.state.selectedUser.name} onChange={this.nameChanged.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email cím:</label>
                            <input type="email" className="form-control" value={this.state.selectedUser.email} onChange={this.emailChanged.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Új jelszó:</label>
                            <input type="password" className="form-control" value={this.state.selectedUser.password} onChange={this.passChanged.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="szabit_kiirhat">Jogok:</label>
                            <fieldset>
                                <p>
                                    <input type="checkbox" value="szabit_kiirhat" checked={this.state.selectedUser.privileges.szabit_kiirhat} onChange={() => this.checkBoxChanged('szabit_kiirhat')}/>
                                    <label htmlFor="szabit_kiirhat">Szabadságot kiírhat</label>
                                </p>
                                <p>
                                    <input type="checkbox" value="biralhat" checked={this.state.selectedUser.privileges.biralhat} onChange={() => this.checkBoxChanged('biralhat')}/>
                                    <label htmlFor="biralhat">Szabadságot bírálhat</label>
                                </p>
                                <p>
                                    <input type="checkbox" value="adatot_modosithat" checked={this.state.selectedUser.privileges.adatot_modosithat} onChange={() => this.checkBoxChanged('adatot_modosithat')}/>
                                    <label htmlFor="adatot_modosithat">Más felhasználó adatát módosíthatja</label>
                                    </p>
                                <p>
                                    <input type="checkbox" value="inactive" id="inactive" checked={this.state.selectedUser.inactive} onChange={() => this.checkBoxChanged('inactive')}/>
                                    <label htmlFor="inactive">Inaktív felhasználó</label>
                                </p>
                            </fieldset>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideModify.bind(this)}>
                            Bezár
                        </Button>
                        <Button variant="primary" onClick={this.saveModify.bind(this)}>
                            Módosít
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showDeleteModal} onHide={this.hideDelete.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Törlés</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Biztosan törli?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideDelete.bind(this)}>
                            Bezár
                        </Button>
                        <Button variant="danger" onClick={this.saveDelete.bind(this)}>
                            Töröl
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showNewModal} onHide={this.hideNew.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Módosítás</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="id">ID:</label>
                            <input type="text" className="form-control" value={this.state.selectedUser.userId} readOnly="readonly"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Név:</label>
                            <input type="text" className="form-control" value={this.state.selectedUser.name} onChange={this.nameChanged.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email cím:</label>
                            <input type="email" className="form-control" value={this.state.selectedUser.email} onChange={this.emailChanged.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Új jelszó:</label>
                            <input type="password" className="form-control" value={this.state.selectedUser.password} onChange={this.passChanged.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="szabit_kiirhat">Jogok:</label>
                            <fieldset>
                                <p>
                                    <input type="checkbox" value="szabit_kiirhat" checked={this.state.selectedUser.privileges.szabit_kiirhat} onChange={() => this.checkBoxChanged('szabit_kiirhat')}/>
                                    <label htmlFor="szabit_kiirhat">Szabadságot kiírhat</label>
                                </p>
                                <p>
                                    <input type="checkbox" value="biralhat" checked={this.state.selectedUser.privileges.biralhat} onChange={() => this.checkBoxChanged('biralhat')}/>
                                    <label htmlFor="biralhat">Szabadságot bírálhat</label>
                                </p>
                                <p>
                                    <input type="checkbox" value="adatot_modosithat" checked={this.state.selectedUser.privileges.adatot_modosithat} onChange={() => this.checkBoxChanged('adatot_modosithat')}/>
                                    <label htmlFor="adatot_modosithat">Más felhasználó adatát módosíthatja</label>
                                </p>
                                <p>
                                    <input type="checkbox" value="inactive" id="inactive" checked={this.state.selectedUser.inactive} onChange={() => this.checkBoxChanged('inactive')}/>
                                    <label htmlFor="inactive">Inaktív felhasználó</label>
                                </p>
                            </fieldset>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideNew.bind(this)}>
                            Bezár
                        </Button>
                        <Button variant="primary" onClick={this.saveNew.bind(this)}>
                            Hozzáad
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

export default UserList;