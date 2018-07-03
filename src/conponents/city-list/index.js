import React, { Component } from 'react';
import cityList from './cityList';
import './cityList.css';
class index extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {
        console.log(cityList);
    }

    

    render() {
        return (
            <div className="wapper-list">
                12313
            </div>
        );
    }
}


export default index;