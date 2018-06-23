import React, { Component } from 'react';
import {Button} from 'antd-mobile';
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink ,Link } from "react-router-dom"
class cart extends Component {
    constructor(props) {
        super(props);

    }

    goHome(){
        this.props.history.push({
            pathname:"home"
        })
    }

    render() {
        return (
            <div>
                购物车
                <Button onClick={() => this.goHome()}>点击跳转</Button>
                {/* <Link to="/home" onClick={() => this.goHome()}>点击</Link> */}
            </div>
        );
    }
}



export default cart;