import React, { Component } from 'react';
import Navbar from '../../conponents/navbar/navBar';
import BScroll from 'better-scroll'
import './index.css'
class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banner:[]
        }
    }

    componentDidMount(){
        this.initBanner();
        
    }

    initBanner(){
        React.ajaxPost('get_channel',{
            username:15308498888,
            token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.W3sidXNlcm5hbWUiOiIxNTMwODQ3ODI3MCIsInRpbWUiOjE1Mjk2NTg0NTR9XQ.BB7I58YHibKcJHu-xWsCMhhSrKIk5Ewrhh05hbyBnGQ"
        }).then(res => {
            let arr = [...res.data,...res.data,...res.data,...res.data];
            console.log(arr)
            this.setState({
                banner:arr
            })
            setTimeout(() => {
                this.initScroll();
            },1000)
        })
    }

    initScroll(){
        this.scroll = new BScroll(this.refs.topWrapper, {
            scrollX: true,
            scrollY: false,
            momentum: true,
            snapSpeed: 400,
            click: true,
            eventPassthrough: "vertical"
        });
        this.children = this.refs.ul.children;
        let width = 0;
        this.refs.ul.style.width = this.state.banner.length * 0.6 + "rem";
    }

    render() {
        const navbar = {
            mode:"dark",
            title:"首页",
            ltype:""
        }
        return (
            <div>
                {/* <Navbar option={navbar}></Navbar> */}
                <div className="topWrapper" ref="topWrapper">
                    <ul  ref="ul">
                       {this.state.banner.map((item,index) => {
                           return (<li key={index}>{item.name}</li>)
                       })}
                    </ul>
                </div>
                <div className="bottomWrapper container"></div>

            </div>
        );
    }
}


export default home;