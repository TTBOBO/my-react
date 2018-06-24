import React, { Component } from 'react';
import Navbar from '../../conponents/navbar/navBar';
class home extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const navbar = {
            mode:"dark",
            title:"首页",
            ltype:""
        }
        return (
            <div>
                <Navbar option={navbar}></Navbar>
            </div>
        );
    }
}


export default home;