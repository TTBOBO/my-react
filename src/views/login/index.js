import React, { Component } from 'react';
import Navbar from '../../conponents/navbar/navBar';
class login extends Component {

    componentDidMount(){
        React.ajaxPost('get_channel',{
            username:15308498888,
            token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.W3sidXNlcm5hbWUiOiIxNTMwODQ3ODI3MCIsInRpbWUiOjE1Mjk2NTg0NTR9XQ.BB7I58YHibKcJHu-xWsCMhhSrKIk5Ewrhh05hbyBnGQ"
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