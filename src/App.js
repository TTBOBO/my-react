import React, { Component } from 'react';
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';
import Tabbar from './conponents/Tabbar/tabbar'
import connect from './store/connnect'

@connect
class App extends Component {
	constructor() {
		super();
		this.state = {
			value: "111"
		}
		
	}
	componentDidMount(){
		
	}
	componentWillMount(){
		// this.props.getLoginStatus('GETLOGININFO');
	}
	
	render() {
		const main = {
			position:'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		}
		return (
			<div style={main}>
				<main style={{height:'100%'}}>
					{this.props.children}
				</main>
				{/* {this.props.children} */}
				<Tabbar></Tabbar>
			</div>
		)
	}
}

export default App;
