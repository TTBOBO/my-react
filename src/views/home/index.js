import React, { Component } from 'react';
import BScroll from 'better-scroll'
import utils from '../../assets/js/util'
import './index.css'
class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banner:[]
        }
    }

    componentDidMount() {
        this.initScroll();
    }

    componentWillMount() {
        this.initBanner();
    }


    initBanner() {
        React.ajaxPost('get_channel', {
            username: 15308498888,
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.W3sidXNlcm5hbWUiOiIxNTMwODQ3ODI3MCIsInRpbWUiOjE1Mjk2NTg0NTR9XQ.BB7I58YHibKcJHu-xWsCMhhSrKIk5Ewrhh05hbyBnGQ"
        }).then(res => {
            let arr = [...res.data, ...res.data, ...res.data, ...res.data];
            utils.setLocalStorage("data", JSON.stringify(res.data))
            this.setState({
                banner: arr
            })
            this.initScroll();
        })
    }

    initScroll() {
        this.children = this.refs.ul.children;
        this.refs.ul.style.width = this.state.banner.length * 60 + "px";
        this.scroll = new BScroll(this.refs.topWrapper, {
            scrollX: true,
            scrollY: false,
            momentum: true,
            snapSpeed: 400,
            click: true,
            eventPassthrough: "vertical"
        });
    }

    render() {
        return (
            <div>
                <div className="topWrapper" ref="topWrapper">
                    <ul ref="ul">
                        {this.state.banner.map((item, index) => {
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