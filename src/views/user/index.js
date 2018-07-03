import React, { Component } from 'react';
import Navbar from '../../conponents/navbar/navBar';
import Navlist from '../../conponents/list/Navlist';
import { Toast} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
@withRouter
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navList:[{
                thumb:"https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",  //icon
                title:"我的钱包",  //tile
                Brief:"",  //subTitle
                isLogin:true,  //监听登录
                callBack:this.getResult.bind(this),  //父组件自己事件
                path:""  //跳转路由
            },{
                thumb:"https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
                title:"我的收藏",
                Brief:"",
                callBack:this.getResult.bind(this),  //父组件自己事件
                isLogin:false
            },{
                thumb:"https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
                title:"我的喜欢",
                Brief:"",
                // callBack:this.getResult.bind(this),  //父组件自己事件
                isLogin:true
            }]
        }
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
    

    render() {
        const navbar = {
            mode:"dark",
            title:"我的",
            ltype:""
        }
        return (
            <div>
                <Navbar option={navbar}></Navbar>
                <Navlist navList={this.state.navList}></Navlist>
                <div>
                    <span className="icon iconfont icon-shouye"></span>
                </div>
            </div>
        );
    }
}


export default index;