import React, { Component } from 'react';
import Scroll from '../Scroll/Scroll'
import '../Scroll/scroll.css';
import './article.css';
// import { NavBar, Icon } from 'antd-mobile';
class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curHeight: 0
        }

    }


    componentDidMount() {
        this.setState({
            data: this.props.dataList
        })
        // console.log(this.props);
    }

    initList(num) {
        // console.log(num)
    }

    componentWillReceiveProps(props){
        // console.log(props);
    }


    handClickItem(item, index) {
        if (typeof this.props.handClickItem === 'function') {
            this.props.handClickItem(item);
        }
    }

    render() {
        // const navbar = {
        //     mode: "dark",
        //     title: "购物车",
        //     ltype: "",
        //     rightContent: []  //<Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={() => this.handClick()} />
        // }


        return (
            <div style={{ height: '100%' }} className={this.props.header ? 'content' : ''} id="article-view">
                <Scroll ref="scroll" loadMore={(num) => this.initList(num)} header={this.props.header} curHeight={1}>
                    <div className="shopList" id="shopList">
                        {this.props.dataList.map((item, index) => {
                            if (item.allimgs && item.allimgs.length > 0) {
                                return (
                                    <div className="shop-list" key={index} onClick={() => this.handClickItem(item, index)}>
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
                            }
                        })}
                    </div>
                </Scroll>

            </div>
        );
    }
}


export default ArticleList;