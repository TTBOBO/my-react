import React, { Component } from 'react';
import Router from '../router/index';
import { Provider } from 'react-redux';
import store from '../store/index'


// import {BrowserRouter as Router, Route, Switch, Redirect, NavLink,Link} from "react-router-dom"
// import Tabbar from '../conponents/Tabbar/tabbar'
// import Home from './home/index';
// import Cart from './cart/cart'

import './main.css'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routeLike:"cart",
            history:this.props
        }
    }

    componentWillMount(){
        
    }

    changeBar(name){
        this.setState({
            routeLike:name
        })
    }
    render() {
        return (
            <Provider store={store}>
            <Router />
            {/* <div>
                <div className="app-view">
                    <Switch>
                        <Route path="/cart" component={Cart} />
                        <Route path="/home" component={Home} />
                        <Redirect from="/" to={`/`+this.state.routeLike} />
                    </Switch>
                </div>
                <Tabbar history={this.state.history} changeBar={this.changeBar.bind(this)}></Tabbar>
            </div> */}
            </Provider>
        );
    }
}


export default Main;