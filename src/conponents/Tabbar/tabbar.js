import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import connect from '../../store/connnect'
import './baritem.css';
@connect
@withRouter
class tabbar extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            barList: this.props.barList || [{
                bg: "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat",
                seBg: "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat",
                title: "首页",
                key: "/",
                icon:"icon iconfont icon-shouye",
                selectIcon:"icon iconfont icon-shouyefill"
            },{
                bg: "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat",
                seBg: "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat",
                title: "视频",
                key: "/video",
                icon:"icon iconfont icon-shouye",
                selectIcon:"icon iconfont icon-shouyefill"
            },{
                bg: "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat",
                seBg: "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat",
                title: "购物车",
                key: "/cart",
                icon:"icon iconfont icon-gouwuche",
                selectIcon:"icon iconfont icon-gouwuchefill"
            }, {
                bg: "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat",
                seBg: "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat",
                title: "我的",
                key: "/user",
                icon:"icon iconfont icon-wode11",
                selectIcon:"icon iconfont icon-wode1"
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

    changeBar(key) {
        this.setState({
            selectedTab: key,
        });
        if(this.props.history.location.pathname !== key){
            this.props.history.push(key);
        }
        this.props.login("LOGIN",121);
    }
    componentWillMount (){
        // console.log(this.props.location.pathname);
    }


    render(children) {
        return (
            <div className="bar-con">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#fee151"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    {this.state.barList.map((item, index) => (
                        <TabBar.Item
                            title={item.title}
                            key={index}
                            icon={<span style={{
                                width: '22px',
                                height: '22px',
                                // background: item.bg,
                            }}
                            className={item.icon}
                            />
                            }
                            selectedIcon={<span style={{
                                width: '22px',
                                height: '22px',
                                // background: item.seBg,
                                
                            }}
                            className={item.selectIcon}
                            />
                            }
                            selected={this.state.selectedTab == item.key}
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