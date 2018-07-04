import React, { Component } from 'react';
import cityList from './cityList';
import BScroll from 'better-scroll'
import ReactDOM from "react-dom"
import './cityList.css';
import { SIGABRT } from 'constants';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: 0,
            letter: [],
            currentIndex: 0,  //默认选中第一个
            letterItemH:window.innerHeight <= 480 ? 17 : 18,   //设置每个字母的高度
            currentLetter:"123",
            hadndTouch:false,
            curCity:""
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.initConHeight();  //初始化滚动条最小高度
        this.getHeight();
        this.initScroll();
        this.getLetter();
        this.touch = {};
    }


    initConHeight() {
        let height = this.refs.wapperList.clientHeight;
        this.refs.content.style['min-height'] = height + 1 + 'px';
    }

    setCurCity(name){
        this.setState({
            curCity:name
        })
        // this.props.handList(name,index);
    }


    initScroll() {
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
        this.scroll.on("scroll", pos => {
            this.setState({
                scrollY: pos.y
            })
            this.getCurrentIndex(pos.y);
        });
    }

    getCurrentIndex(curY) {
        if (curY > -50) {
            this.setState({
                currentIndex: 0
            })
            return;
        }

        for (var i = 0; i < this.listheight.length; i++) {
            if (-curY > this.listheight[i] && -curY < this.listheight[i + 1]) {
                this.setState({
                    currentIndex: i+1
                })
                return false;
            }
        }
    }


    getHeight() {
        this.listheight = [];  //初始化列表组高度的组合
        let height = 0;
        this.listheight.push(height);   //初始化  push第一个高度距离
        for (var i in this.refs) {
            height += this.refs[i].clientHeight;
            this.listheight.push(height);
        }
    }


    //滑动到指定位置
    _scrollTo(index) {
        if (!index && index !== 0) {
            return
        }
        if (index < 0) {
            index = 0
        } else if (index > this.listheight.length - 2) {
            index = this.listheight.length - 2
        }
        this.scroll.scrollToElement(this.refs['listGroup'+index], 100)
    }

    //获取右边的关键词
    getLetter() {
        let _letter = cityList.map((item) => {
            return item.name.substr(0, 1);
        })
        this.setState({
            letter: _letter
        })
    }


    //右边栏touch开始
    touchStart(e) {
        console.log(e.target)
        this._scrollTo(e.target.getAttribute("data-index"))
        this.touch.y1 = e.touches[0].pageY;
        this.touch.anchorIndex = e.target.getAttribute("data-index");
         //设置当前选中的是哪个组
        this.setState({
            currentLetter:cityList[this.touch.anchorIndex].name.substr(0, 1)
        })
        this.setState({
            hadndTouch:true
        })
        // this.props.handMove(this.touch.anchorIndex);
    }

    touchMove(e) {
        let firstTouch = e.touches[0];
        this.touch.y2 = e.touches[0].pageY;
        let _index = (this.touch.y2 - this.touch.y1) / this.state.letterItemH | 0;
        let resIndex =  parseInt(this.touch.anchorIndex) + _index;
        if(resIndex > cityList.length){
            resIndex = cityList.length-1;
        }else if(resIndex < 0){
            resIndex = 0
        }
        this._scrollTo(resIndex);
        //设置当前选中的是哪个组
        this.setState({
            currentLetter:cityList[resIndex] ? cityList[resIndex].name.substr(0, 1) : cityList[cityList.length-1].name.substr(0, 1)
        })
        // this.props.handMove(resIndex);
    }


    onTouchend(){
        this.setState({
            hadndTouch:false
        })
    }

    render() {
        return (
            <div className="wapper-list" >
                <ul>
                    <li className="list-ul-item">当前选中的是：{this.state.curCity}</li>
                </ul>
                <div ref="wapperList" style={{ height: "100%" }}>
                    <ul className="list-ul" ref="content">
                        {cityList.map((item, index) => {
                            return (<li key={index} ref={'listGroup' + index}>
                                <h2>{item.name}</h2>
                                <ul className="list-ul-content">
                                    {item.cities.map((_item, _index) => {
                                        return (<li className="list-ul-item" key={_index + 'item'} onClick={() => this.setCurCity(_item.name,_index)}>{_item.name}</li>)
                                    })}
                                </ul>
                            </li>)
                        })}
                    </ul>
                </div>
                <div className="letter">
                    <ul onTouchStart={(e) => this.touchStart(e)} onTouchMove={(e) => this.touchMove(e) }   onTouchEnd={() => this.onTouchend()}>
                        {
                            this.state.letter.map((item, index) => {
                                return (<li key={index + ''} data-index={index} className={this.state.currentIndex == index ? 'active' : ''}>{item}</li>)
                            })
                        }
                    </ul>
                </div>
                <div className="letter-box" style={{display:this.state.hadndTouch ? 'block' : 'none'}}>{this.state.currentLetter}</div>
            </div>
        );
    }
}


export default index;