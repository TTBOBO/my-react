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
                isLogin:true
            },{
                thumb:"https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
                title:"我的喜欢",
                Brief:"",
                isLogin:true
            }]
        }
    }
    getResult(res){
        console.log(res)
        if(res.isLogin){
            Toast.info("请登录再操作",2,null,false);
            console.log(this.props)
            this.props.history.push('/login')
            return false;
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
            </div>
        );
    }
}


export default index;