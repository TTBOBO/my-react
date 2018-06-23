import React, { Component } from 'react';
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';
import { Provider } from 'react-redux';
import Main from './views/Main';
import store from './store/index'
import Tabbar from './conponents/Tabbar/tabbar'
class App extends Component {
	constructor() {
		super();
		this.state = {
			value: "111"
		}
	}

	componentDidMount() {
		console.log(this.props.history)
	}




	render() {
		return (
			<div>
				<main>
					{this.props.children}
				</main>
				{/* {this.props.children} */}
				<Tabbar></Tabbar>
			</div>
		)
	}
}

export default App;
