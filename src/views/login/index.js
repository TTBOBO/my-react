import React, { Component } from 'react';
import Navbar from '../../conponents/navbar/navBar';
import './login.css'
import util from '../../assets/js/util';
import { Toast} from 'antd-mobile';
import {withRouter} from 'react-router-dom'

@withRouter
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile:"111",
            yzm:"222",
            countdown:59,
            time:null,
            codeText:"获取验证码",
            check:false
        }
    }
    componentDidMount(){
        
    }

    goLogin(){
        
        if(!this.state.mobile || !/^1(3|4|5|7|8|9)\d{9}$/.test(this.state.mobile)){
            Toast.info("请输入正确的手机号码",2,null,false);
            return false;
        }
        if(!this.state.check) {
            Toast.info("请同意已阅读声明",2,null,false);
            return false;
        }
        React.ajaxPost('login', {
            mobile: this.state.mobile,
            yzm:this.state.yzm
        }).then(res => {
            if(res.status == 'success') {
                Toast.info("登录成功",2,null,false);
                util.setLocalStorage('userinfo',JSON.stringify(res.userinfo));
                this.props.history.goBack();
            }else{
                Toast.info(res.msg,2,null,false);
            }
        })
    }

    getCode(){
        if(this.state.mobile && /^1(3|4|5|7|8|9)\d{9}$/.test(this.state.mobile)){
            if(this.state.time) {
                return;
            }
           
            React.ajaxPost('sent_msg', {
                mobile: this.state.mobile
            }).then(res => {
                
                console.log(res)
            })
            this.state.time = setInterval(() => {
                this.settime();
            }, 1000);
        }else {
            Toast.info("请输入正确的手机号码",2,null,false);
        }
        
    }

    changeVal(name){
        var obj = {};
        obj[name] = this.refs[name].value;
        this.setState(obj)
    }

    handCheck(){
        this.setState({
            check:!this.state.check
        })
    }

    settime(){
        if(this.state.countdown == 0) {
            this.setState({
                codeText:"获取验证码"
            })
            this.setState({
                countdown: 60
            })
            clearInterval(this.state.time);
            this.setState({
                time: ""
            })
        } else {
            let _countdown = this.state.countdown;
            _countdown -= 1;
            // $(el).text("重新发送(" + this.state.countdown + ")");
            this.setState({
                codeText:"重新发送(" + this.state.countdown + ")"
            })
            this.setState({
                countdown: _countdown--
            })
        }
    }

    render() {
        const navbar = {
            mode:"dark",
            title:"登录",
            ltype:"left",
            rightContent:[]  //<Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={() => this.handClick()} />
        }
        return (
            <div className="main-content  user-con">
                <Navbar option={navbar} goBack={() => { console.log(1) }}></Navbar>
                <div className="login-bottom-wrap div-tab">
                    <div className="phone input-wrap input1">
						<input type="text" id="phone" ref="mobile" value={this.state.mobile} onChange={this.changeVal.bind(this,'mobile')} />
						<div id="getcode" onClick={() => this.getCode()}>{this.state.codeText}</div>
					</div>
                    <div className="phone input-wrap">
						<input type="text" id="phone" ref="yzm"  value={this.state.yzm} onChange={this.changeVal.bind(this,'yzm')}  style={{width: '65%', marginBottom: 0}} placeholder="输入验证码" />
					</div>
					<p className="go-login login"> <span className="mmlogin">密码登录</span><span className="forget">未注册用户登陆后自动注册</span></p>
					<button className="res-q" id="go-login" onClick={() => this.goLogin()}>登录</button>
					<p className="sm">龙采头条软件负责声明<span onClick={() => this.handCheck()} className={this.state.check ? 'check is-check' : 'check'}></span></p>
                </div>
            </div>
        );
    }
}



export default login;