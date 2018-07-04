import React, { Component } from 'react';
import { List } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import ReactDOM from "react-dom"
import { Toast } from 'antd-mobile';
import './list.css'
const Item = List.Item;
const Brief = Item.Brief;
@withRouter
class NavList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navlist: this.props.navList,
            header:"",
            transform:"translate3d(0, 0px, 0px)",
            transformtool:"translate3d(100%, 0px, 0px)%",
            toolWidth:0
        }
    }

    

    handClickItem(row,index){
        
        if(row.callBack && typeof row.callBack == 'function'){
            row.callBack(row);
        }else if(!row.callBack && row.isLigin){
            Toast.info(row.info || "请登录再操作")
        }
    }

    touchStart(e){
        this.firstX = e.touches[0].pageX;
        this.setState({
            toolWidth:e.target.parentNode.nextSibling.clientWidth
        })
    }
    touchMove(e){
        let _curPageX = e.touches[0].pageX;
        //(this.props.threshold*50)
        if((this.firstX - _curPageX) > 0){
            if((this.firstX - _curPageX) > this.props.threshold*50){
                this.setState({
                    transform:`translate3d(-${this.state.toolWidth}px, 0px, 0px)`,
                    transformtool:`translate3d(0, 0px, 0px)%`
                })
                return false;
            }
            this.setState({
                transform:`translate3d(-${this.firstX - _curPageX}px, 0px, 0px)`,
                transformtool:`translate3d(-${this.state.toolWidth -(this.firstX - _curPageX)}px, 0px, 0px)`
            })
        }else{
            if((this.firstX - _curPageX) > this.props.threshold*50){
                this.setState({
                    transform:`translate3d(0, 0px, 0px)`,
                    transformtool:`translate3d(100%, 0px, 0px)%`
                })
                return false;
            }
            console.log(this.firstX - _curPageX)
            // this.setState({
            //     transform:`translate3d(-${this.firstX - _curPageX}px, 0px, 0px)`,
            //     transformtool:`translate3d(${this.state.toolWidth -(this.firstX - _curPageX)}px, 0px, 0px)`
            // })
        }
    }



    render() {
        return (
            //renderHeader={() => this.state.header || ""} style={{height:this.state.header ? '' : '0px'}}
            
            <div>
                <List   className="my-list">
                    { this.state.navlist.map(((item,index) => {
                        return <Item
                            thumb={item.thumb}
                            arrow="horizontal"
                            onClick={() => {
                                this.handClickItem(item,index);
                            }}
                            key={index}
                            >
                            {item.title}{item.Brief ? <Brief>{item.Brief}</Brief> : ""}
                        </Item>
                    }))}
                </List>
                <ul className="list-ul-content">
                    <li className="list-ul-item" onTouchStart={(e) => {this.touchStart(e)}}  onTouchMove={(e) => {this.touchMove(e)}}>
                        <div className="list-con" style={{transform:this.state.transform}}>
                            <div className="list-con-box">12313</div>
                        </div>
                        <div className="slider-right" style={{transform:this.state.transformtool}}>
                            <a className="del">删除</a>
                            {/* <a className="del">删除</a> */}
                        </div>
                    </li>
                </ul>
            </div>
            
        );
    }
}


NavList.defaultProps = {
    threshold:1.5
}

export default NavList;