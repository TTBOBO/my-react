import React, { Component } from 'react';
import Navbar from '../../conponents/navbar/navBar';
import Navlist from '../../conponents/list/Navlist';
import { Toast} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import connect from '../../store/connnect'
import CellSwiper from '../../conponents/list/cellSwiper';
import './user.css';
import { width } from 'window-size';
@connect
@withRouter
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navList:[{
                thumb:this.getIcon("icon-dingdan"),  //icon
                title:"我要提现",  //tile
                Brief:"",  //subTitle
                isLogin:true,  //监听登录
                callBack:this.getResult.bind(this),  //父组件自己事件
                path:""  //跳转路由
            },{
                thumb:this.getIcon("icon-heart"),  //icon
                title:"喜欢的文章",  //tile
                Brief:"",  //subTitle
                isLogin:true,  //监听登录
                callBack:this.getResult.bind(this),  //父组件自己事件
                path:""  //跳转路由
            },{
                thumb:this.getIcon("icon-biaoxing"),
                title:"浏览过的文章",
                Brief:"",
                callBack:this.getResult.bind(this),  //父组件自己事件
                isLogin:false
            }],
            otherList:[{
                thumb:this.getIcon("icon-sale"),
                title:"意见反馈",
                Brief:"",
                // callBack:this.getResult.bind(this),  //父组件自己事件
                isLogin:true
            },{
                thumb:this.getIcon("icon-tishi"),
                title:"关于我们",
                Brief:"",
                // callBack:this.getResult.bind(this),  //父组件自己事件
                isLogin:true
            }],
            userinfo:{}
        }
    }

    getIcon(name){
        return(<div className={'iconfont '+name}></div>)
    }
    componentWillMount(){
        this.setState({
            userinfo:this.props.getuserinfo
        })
        console.log(this.props.getuserinfo)
        let dom = null;
        let arr = [];
        for(var i = 0; i < 5; i++){
            arr.push({
                children:this.getDom(i)
            })
        }
        this.setState({
            listData:arr
        })
    }

    getDom(i){
        return (<div>123{i}</div>);
    }
    
    getResult(res){
        if(res.isLogin){
            Toast.info("请登录再操作",2,null,false);
            this.props.history.push({
                pathname:"/login",
                state:{
                    name:123
                }
            })
        }else{
            Toast.info("跳转",2,null,false);
        }
    }
    
    handler(item,index){
        console.log(item,index);
    }

    getLoginStatus(){
        if(this.props.getuserinfo){
            return (<div><p>{this.state.userinfo.username}</p><p className="icon">{this.state.userinfo.lcb || 0}LCB</p></div>)
        }else{
            return (<div> 现在去登录</div>)
        }
    }

    render() {
        const navbar = {
            mode:"dark",
            title:"我的",
            ltype:""
        }
        return (
            <div>
                <Navbar option={navbar}></Navbar>
                <div className="user-info herder-content">
                    <div className="user-info-left">
                        <div className="user-author">
                            <img src={require('../../assets/img/login-bg.jpg')} />
                        </div>
                        <div className="user-author-info">
                           {this.getLoginStatus()}
                        </div>
                    </div>
                    <div className="user-info-right">
                        <span className="iconfont icon-shezhi"></span>
                    </div>
                </div>
                <div className="h-line-5"></div>
                <Navlist navList={this.state.navList}></Navlist>
                <div className="h-line-5"></div>
                <Navlist navList={this.state.otherList}></Navlist>
                
                {/* <CellSwiper listData={this.state.listData} handler={(index) => this.handler(index)}></CellSwiper> */}
            </div>
        );
    }
}


export default index;