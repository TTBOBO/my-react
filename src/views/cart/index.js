import React, { Component } from 'react';
import Navbar from '../../conponents/navbar/navBar';
import Scroll from '../../conponents/Scroll/Scroll'
import '../../conponents/Scroll/scroll.css';
import { fastest } from 'sw-toolbox';
// import { NavBar, Icon } from 'antd-mobile';
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
        }
    }

    componentDidMount() {
        console.log(this.refs.scroll)
        // this.initList();
    }

    initList(num) {
        console.log(num);
        let _arr = JSON.parse(JSON.stringify(this.state.arr));
        for (var i = 0; i < 10; i++) {
            _arr.push(i);
        }
        setTimeout(() => {
            this.setState({
                arr: _arr
            })
            this.refs.scroll.forceUpdate(true);
        }, 300)
    }

    handClick(index) {
        console.log(index);
    }

    render() {
        const navbar = {
            mode: "dark",
            title: "购物车",
            ltype: "",
            rightContent: []  //<Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={() => this.handClick()} />
        }
        return (
            <div style={{ height: '100%' }}>
                <Navbar option={navbar} goBack={() => { console.log(1) }}></Navbar>
                <Scroll ref="scroll" loadMore={(num) => this.initList(num)} pullDownRefresh={false}>
                    <ul>
                        {this.state.arr.map((item, index) => {
                            return (<li className="list-item" onClick={() => this.handClick(index)} key={index}>{item}</li>)
                        })}
                    </ul>
                </Scroll>
            </div>
        );
    }
}


export default Cart;