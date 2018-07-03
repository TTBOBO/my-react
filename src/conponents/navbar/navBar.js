import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile';
import './navbar.css'
@withRouter
class navBar extends Component {
    
    goBack(){
        //navBar 左边存在时，执行返回，如父组件存在回调即回调父组件
        if(this.props.option.ltype && this.props.option.ltype === 'left'){
            this.props.history.goBack();
            if( this.props.goBack){
                this.props.goBack();
            }
        }
    }
    render() {
        return (
            <div>
                 <NavBar
                    mode={this.props.option.mode || 'light'}
                    icon={<Icon type={this.props.option.ltype} /> }
                    onLeftClick={() => this.goBack()}
                    rightContent= {this.props.option.rightContent || [
                        // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        // <Icon key="1" type="ellipsis" />,
                    ]}
                    >
                    {this.props.option.title}
                </NavBar>
            </div>
        );
    }
}



export default navBar;