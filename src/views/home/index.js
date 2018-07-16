import React, { Component } from 'react';
import BScroll from 'better-scroll'
import connect from '../../store/connnect'
import { withRouter } from 'react-router-dom'
import { Toast} from 'antd-mobile';
import './index.css';
import * as  reacRouter from 'react-router';
import ArticleList from '../../conponents/article/ArticleList'
@connect
@withRouter
class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banner: [],
            clickStatus: false,
            topClick: false,
            left: .3,
            currentPage: 0,
            isNoMore: false,
            height:"",
            getChannel:[]
        }
    }
    componentDidMount() {
        this.initBanner();
        if (this.props.getChannel.length !== 0) {
            // this.initBanner();
            // this.initScroll();
            // this.initSwiper();
        }
        
    }

    

    componentWillMount() {
       
    }


    initBanner() {
            React.ajaxPost('get_channel', {
                // username: this.props.getuserinfo.username,
                // token: this.props.getuserinfo.token
            }).then(res => {
                let arr = [...res.data];
                this.props.get_channel('GETCHANNEL', arr);
                this.setState({
                    getChannel :this.props.getChannel
                })
                this.getList(3); //获取栏目内容
                this.initScroll(); //初始化 横向滚动栏
                this.initSwiper(); //初始化横向滚动栏宽度
            })
    }

   

    initScroll() {
        this.children = this.refs.ul.children;
        this.refs.ul.style.width = this.props.getChannel.length * 1.2 + "rem";
        this.scroll = new BScroll(this.refs.topWrapper, {
            scrollX: true,
            scrollY: false,
            momentum: true,
            snapSpeed: 400,
            click: true,
            eventPassthrough: "vertical"
        });
        this.scroll1 = new BScroll(this.refs.bottomWrapper, {
            scrollX: true,
            scrollY: true,
            click: true,
            momentum: false,
            eventPassthrough: "vertical",
            probeType: 3,
            bounce: false,
            snap: {
                threshold: 0.3,
                speed: 400
            },
            snapThreshold: 0.5, //滑动0.5到下一页
            snapSpeed: 400
        });
        this.scroll1.on("touchEnd", pos => {
            this.setState({
                topClick: false
            })

        });
        this.scroll1.on("scrollStart", pos => {
            this.setState({
                clickStatus: false
            })
        })
        this.scroll1.on("scrollEnd", pos => {
            this.setState({
                clickStatus: true
            })
            this.getActive(this.scroll1.currentPage.pageX);
        });
        //防止从详情页面返回时 没有返回到  之前的page
        // this.activeLi(this.globel.currentPage, true);
        // this.getActive(this.globel.currentPage);
    }

    activeLi(index, status) {
        this.setState({
            currentPage: index
        })
        // this.left = this.left + index * 1.2;
        this.currentPage = index;
        let bottomWrapperWidth = this.refs.bottomWrapper.clientWidth;
        this.topClick = true;
        this.scroll1.scrollTo(-(bottomWrapperWidth * parseInt(index)), 0, status ? 0 : 200);
        this.scroll1.currentPage.pageX = index;   //改变scrollTo  的同时 需改变scroll的pageX  否则 会出现异常
    }

    getActive(index) {
        let left = 0.3;
        if (!this.state.topClick) {
            left = left + index * 1.2;
            this.setState({
                left: left,
                currentPage: index
            })
        }
        let bottomWrapperWidth = this.refs.bottomWrapper.clientWidth;
        let maxScrollW = this.scroll.maxScrollX;
        if (this.state.left * 100 > bottomWrapperWidth  && -(this.state.left * 100 - bottomWrapperWidth ) > maxScrollW) {
            this.scroll.scrollTo(-(this.state.left * 100 - bottomWrapperWidth ), 0, 200);
        } else if (this.state.left * 100 < bottomWrapperWidth ) {
            this.scroll.scrollTo(0, 0, 200);
        }

        /**当列表长度为空时  加载当前页数据 */
        setTimeout(() =>{
            this.getList(3);
        },200)
    }

    changePage(objList) {
        // this.initPage(objList);
    }
    // 1下拉  2 上拉  3左右切换
    getList(status){
        if(this.props.getChannel[this.state.currentPage].dataList.length !== 0 && status == 3){
            return false;
        }
        React.ajaxPost('news', {
            type: this.state.currentPage+1,  //this.props.getChannel[this.state.currentPage].id
            page: this.props.getChannel[this.state.currentPage].page
        }).then(res => {
            if(res.data){
                let obj = {
                    page:res.data ? (res.data.current_page || 1) : 1,
                    type:this.state.currentPage,
                    dataList:res.data.data
                }
                if(res.data.current_page == res.data.last_page){
                    obj.isNoMore = true
                }
                this.props.addpage('ADDPAGE',obj);
                this.setState({
                    getChannel :this.props.getChannel
                })
            }else{

            }
        })
    }

    


    initSwiper() {
        this.state.children = this.refs.ul.children;
        let bottomWrapperWidth = this.refs.bottomWrapper.clientWidth;
        let bottomWrapperHeight = this.refs.bottomWrapper.clientHeight;
        this.state.bottomHeight = bottomWrapperHeight + "px";  //设置底部容器的高度
        this.state.childrenCon = this.refs.newCon.children;
        this.setState({
            height:bottomWrapperHeight
        })
        let newItemW = 0;
        let child = null;
        for (let i = 0; i < this.props.getChannel.length; i++) {
            child = this.state.childrenCon[i];
            child.style.width = bottomWrapperWidth + "px";
            newItemW += bottomWrapperWidth;
        }
        this.refs.newCon.style.width = newItemW + "px";
        this.refs.newCon.style.height = bottomWrapperHeight + "px";
    }

    

    handClickItem(res){
        this.props.history.push(`/article/${res.id}`);
    }

    handSearch(){
        this.props.history.push(`/searArticle`);
    }

    handTime(){
        this.props.history.push(`/timeArticle`);
    }

    handAdd(){
        Toast.info("该模块暂未开发，请等待！",2,null,false);
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <div className="header-tool">
                    <span className="iconfont icon-shijian left" onClick={() => this.handTime()}></span>
                    <div  className="iconfont icon-sousuo input" onClick={() => this.handSearch()}>
                        <div className="search-con"></div>
                    </div>
                    <span className="iconfont icon-tongzhi right"></span>
                </div>
                <div className="top-tool">
                    <div className="topWrapper" ref="topWrapper">
                        <ul ref="ul" style={{position:'relative'}}>
                            {this.state.getChannel.map((item, index) => {
                                return (<li className={this.state.currentPage == index ? 'top-active' : ''} key={index} onClick={() => {this.activeLi(index)}}>{item.name}</li>)
                            })}
                            <div className="bottom-line" style={{ left: this.state.left + 'rem' }}></div>
                        </ul>
                    </div>
                    <span className="iconfont icon-jiahao1" onClick={() => this.handAdd()}></span>
                </div>
                
                <div className="bottomWrapper container" ref="bottomWrapper">
                    <div ref="newCon" >
                        {this.state.getChannel.map((item, index) => {
                            if(this.state.height){
                                return (<div key={index} className="newsList" >
                                    <ArticleList handClickItem={(res) => this.handClickItem(res)} name={'banner'+index} height={this.state.height} dataList={item.dataList}></ArticleList>
                                </div>)
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
export default home;