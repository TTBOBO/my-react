import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import './baritem.css';
@withRouter
class tabbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            barList: this.props.barList || [{
                bg: "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat",
                seBg: "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat",
                title: "首页",
                key: "/"
            },
            //  {
            //     bg: "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat",
            //     seBg: "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat",
            //     title: "发现",
            //     key: "find"
            // },
             {
                bg: "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat",
                seBg: "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat",
                title: "购物车",
                key: "/cart"
            }, {
                bg: "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat",
                seBg: "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat",
                title: "我的",
                key: "/user"
            }],
            selectedTab: "/home",
            hidden: false
        }
    }

    componentDidMount(){
        this.setState({
            selectedTab: this.props.history.location.pathname,
        });
    }

    changeBar = (key) => {
        this.setState({
            selectedTab: key,
        });
        if(this.props.history.location.pathname != key){
            this.props.history.push(key);
        }
        // console.log()
        
    }
    componentWillMount (){
        console.log(this.props.location.pathname);
    }


    render(children) {
        return (
            <div className="bar-con">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    {this.state.barList.map((item, index) => (
                        <TabBar.Item
                            title={item.title}
                            key={index}
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: item.bg
                            }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: item.seBg
                            }}
                            />
                            }
                            selected={this.state.selectedTab === item.key}
                            onPress={this.changeBar.bind(this,item.key)}
                        >
                            {/* {getLike(item.key)} */}
                        </TabBar.Item>
                    ))
                    }


                </TabBar>
            </div>
        );
    }
}


export default tabbar;