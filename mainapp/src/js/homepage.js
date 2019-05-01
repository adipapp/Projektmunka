import React, {Component} from 'react'

var d=new Date();
const remainingdays=Math.abs(10-(d.getDate()));

class Homepage extends Component{
    render(){
        return(
            <div >
                <div className="leftcolumn">
                    <div className="card">
                        <h2>SZABADSÁGOK LEADÁSA</h2>
                        <p>A leadásig még {remainingdays} nap van</p>
                    </div>
                    <div className="card">
                        <h2>ÁLTALÁNOS INFORMÁCIÓ</h2>
                        <p>Űrlapok kitöltéséhez útmutató</p>
                    </div>
                </div>
                <div className="rightcard">
                    <div className="card">Közelgő esemény</div>
                    <h2>{this.props.name}</h2>
                </div>
            </div>

        )
    }
}
export default Homepage;