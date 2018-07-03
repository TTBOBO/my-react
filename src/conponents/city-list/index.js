import React, { Component } from 'react';
import cityList from './cityList';
import BScroll from 'better-scroll'
import './cityList.css';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY:0,
            letter:[],
            currentIndex:0,  //默认选中第一个
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.initConHeight();  //初始化滚动条最小高度
        this.getHeight();
        this.initScroll();
        
        this.getLetter();
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
        this.scroll.on("scroll", pos => {
           this.setState({
               scrollY:pos.y
           })
           this.getCurrentIndex(pos.y);
        });
    }

    getCurrentIndex(curY){
        if (curY > -50) {
            this.setState({
                currentIndex:0
            })
            return;
        }

        for(var i = 0; i < this.listheight.length; i++){
            console.log(this.listheight[i],this.listheight[index+1],curY)
            if(-curY > this.listheight[i] && -curY < this.listheight[i+1]){
                console.log(i)
                this.setState({
                    currentIndex:i
                })
                return false;
            }
        }
        // this.listheight.forEach((item,index) => {
        //     console.log(item,this.listheight[index+1],curY)
        //     if(-curY > item && -curY < this.listheight[index+1]){
        //         this.setState({
        //             currentIndex:index
        //         })
        //         return false;
        //     }
        // })
    }


    getHeight(){
        this.listheight = [];  //初始化列表组高度的组合
        let height = 50;
        this.listheight.push(height);   //初始化  push第一个高度距离
        for(var i in this.refs){
            height = this.refs[i].clientHeight;
            this.listheight.push(height);
        }
        console.log(this.listheight);
    }


    //滑动到指定位置
    _scrollTo(index){

    }

    getLetter(){
        let _letter = cityList.map((item) =>{
            return item.name.substr(0,1);
        })
        this.setState({
            letter:_letter
        })
    }
    

    render() {
        return (
            <div className="wapper-list" >
                <div ref="wapperList" style={{height:"100%"}}>
                    <ul className="list-ul" ref="content">
                        {cityList.map((item,index) => {
                            return (<li key={index} ref={'listGroup'+index}>
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
                        {
                            this.state.letter.map((item,index) => {
                                return (<li key={index+''} className={this.state.currentIndex == index ? 'active' : ''}>{item}</li>)
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}


export default index;