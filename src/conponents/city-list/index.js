import React, { Component } from 'react';
import cityList from './cityList';
import BScroll from 'better-scroll'
import './cityList.css';
class index extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {
        this.initConHeight();  //初始化滚动条最小高度
        this.initScroll();
    }

    initConHeight(){
        let height  = this.refs.wapperList.clientHeight;
        this.refs.content.style['min-height'] = height+1+'px';
    }


    initScroll(){
        this.Wrapper = this.refs.wapperList;
        let option = {
            scrollY: true,
            click: true,
            momentum: true,
            eventPassthrough: "horizontal",
            probeType: 3,
            bounce: true,
            startY: 0,
            scrollbar: false,
        };
        this.scroll = new BScroll(this.Wrapper, option);

    }

    

    render() {
        return (
            <div className="wapper-list" >
                <div ref="wapperList" style={{height:"100%"}}>
                    <ul className="list-ul" ref="content">
                        {cityList.map((item,index) => {
                            return (<li key={index}>
                                <h2>{item.name}</h2>
                                <ul className="list-ul-content">
                                    {item.cities.map((_item,_index) => {
                                        return (<li className="list-ul-item" key={_index+'item'}>{_item.name}</li>)
                                    })}
                                </ul>
                            </li>)
                        })}
                    </ul>
                </div>
                <div className="letter">
                    <ul>
                        <li className="active">a</li>
                        <li>b</li>
                        <li>c</li>
                        <li>d</li>
                    </ul>
                </div>
            </div>
        );
    }
}


export default index;