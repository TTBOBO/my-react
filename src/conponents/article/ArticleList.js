import React, { Component } from 'react';
import Scroll from '../Scroll/Scroll'
import '../Scroll/scroll.css';
import './article.css';

// import { NavBar, Icon } from 'antd-mobile';
class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        }
    }

    componentDidMount() {
        // console.log(this.refs.scroll)
        // this.initList();
    }

    initList(num) {
        let _arr = JSON.parse(JSON.stringify(this.state.arr));
        for (var i = 0; i < 10000; i++) {
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
                <div className="shopList" id="shopList">
                    <div className="shop-list">
                        <div id="shop-item">
                            <div className="shop-list-con">
                                
                                <div className="shop-text">
                                    <p className="text-ellipsis">价值SD卡还是快点哈老师看到哈安康市大理石的看见了爱上大垃圾开始懂了看见啊按价值SD卡还是快点哈老师看到哈安康市大理石的看见了爱上大垃圾开始懂了看见啊按时打卡了华盛顿卡价值SD卡还是快点哈老师看到哈安康市大理石的看见了爱上大垃圾开始懂了看见啊按时打卡了华盛顿卡时打卡了华盛顿卡</p>
                                    <p>78944 LCB</p>
                                </div>
                                <div><img src={require("../../assets/img/blur-book-stack-books-590493.png")} /></div>
                            </div>
                            {/* <div className="shop-list-con">
                                <div><img src="/resource/front/img/list1.jpg" /></div>
                                <div id="shop-text">
                                    <p className="text-ellipsis-3">价值SD卡还是快点哈老师看到哈安康市</p>
                                    <p className="money">78944 LCB</p>
                                </div>
                                <div className="shop-button">查看详情</div>
                            </div> */}
                        </div>

                    </div>
                </div>
                {/* <Navbar option={navbar} goBack={() => { console.log(1) }}></Navbar> */}
                {/* <Scroll ref="scroll" loadMore={(num) => this.initList(num)} pullDownRefresh={false}>
                    <ul>
                        {this.state.arr.map((item, index) => {
                            return (<li classNameName="list-item" onClick={() => this.handClick(index)} key={index}>{this.props.name +','+item}</li>)
                        })}
                    </ul>
                </Scroll> */}
            </div>
        );
    }
}


export default ArticleList;