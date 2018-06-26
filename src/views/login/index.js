import React, { Component } from 'react';
import Navbar from '../../conponents/navbar/navBar';
class login extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){
        React.ajaxPost('ranking',{
            type:2
        }).then(res => {
            console.log(res);
        })
    }

    render() {
        const navbar = {
            mode:"dark",
            title:"登录",
            ltype:"left",
            rightContent:[]  //<Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={() => this.handClick()} />
        }
        return (
            <div>
                <Navbar option={navbar} goBack={() => {console.log(1)}}></Navbar>
            </div>
        );
    }
}



export default login;