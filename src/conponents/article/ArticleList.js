import React, { Component } from 'react';
import Scroll from '../Scroll/Scroll'
import '../Scroll/scroll.css';
import './article.css';

// import { NavBar, Icon } from 'antd-mobile';
class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15,16],
            curHeight:0
        }
        
    }
    componentDidMount() {
        // console.log(this.props);
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

    initList(num) {
        console.log(num);
    }


    render() {
        const navbar = {
            mode: "dark",
            title: "购物车",
            ltype: "",
            rightContent: []  //<Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={() => this.handClick()} />
        }

        

        return (
            <div style={{ height: '100%' }} id="article-view">
                <Scroll ref="scroll" loadMore={(num) => this.initList(num)}  curHeight={1}>
                    <div className="shopList" id="shopList">
                        {this.props.dataList.map((item, index) => {
                            return (
                            <div className="shop-list"  key={index}>
                                <div id="shop-item">
                                    <div className="shop-list-con">
                                        <div className="shop-text">
                                            <p className="text-ellipsis">{item.title}</p>
                                            <p className="tool"> <span><span className="icon iconfont icon-xianshikejian"></span><span className="num">{item.reading}</span></span><span><span className="icon iconfont icon-comment"></span><span className="num">{item.comment}</span></span></p>
                                        </div>
                                        <div><img src={item.allimgs[0]} /></div>
                                    </div>
                                </div>
                            </div>)
                        })}
                    </div>
                </Scroll>

            </div>
        );
    }
}


export default ArticleList;