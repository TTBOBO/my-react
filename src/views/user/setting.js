import React, { Component } from 'react';
import Navbar from '../../conponents/navbar/navBar';
import { Toast , Button} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import connect from '../../store/connnect'
import './user.css';

@connect
@withRouter

class setting extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        console.log(this.props)
        // <Button type="warning">warning</Button><WhiteSpace />
    }

    componentDidMount() {

    }
    handclick() {
        if(!this.props.getuserinfo){
            Toast.info("退出成功",2,null,false);
        }else{
            this.props.history.push({
                pathname:"/login"
            })
        }
    }

    render() {
        const navbar = {
            mode:"dark",
            title:"设置",
            ltype:"left"
        }
        return (
            <div>
                <Navbar option={navbar}></Navbar>
                <div className="herder-content" style={{padding:'.2rem'}}>
                    <Button onClick={() => this.handclick()} size="large" type={this.props.getuserinfo ? 'warning' : 'primary'}>{this.props.getuserinfo ? '退出登录' : '立即登录'}</Button>
                </div>
            </div>
        );
    }
}


export default setting;