import React, { Component } from 'react';
import Router from '../router/index';
import { Provider } from 'react-redux';
import store from '../store/index'


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
            </Provider>
        );
    }
}


export default Main;