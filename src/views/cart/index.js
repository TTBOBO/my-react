import React, { Component } from 'react';
import Navbar from '../../conponents/navbar/navBar';
import { NavBar, Icon } from 'antd-mobile';
class Cart extends Component {
    constructor(props) {
        super(props);

    }

    handClick(){
        console.log(11111)
    }

    render() {
        const navbar = {
            mode:"dark",
            title:"购物车",
            ltype:"",
            rightContent:[]  //<Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={() => this.handClick()} />
        }
        return (
            <div>
                <Navbar option={navbar} goBack={() => {console.log(1)}}></Navbar>
            </div>
        );
    }
}


export default Cart;