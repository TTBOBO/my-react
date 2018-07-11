import React, { Component } from 'react';
import './news.css';
import Navbar from '../../conponents/navbar/navBar';
import Scroll from '../../conponents/Scroll/Scroll'
import { Toast} from 'antd-mobile';
import util from '../../assets/js/util';
import {withRouter} from 'react-router-dom'
import connect from '../../store/connnect'
@connect
@withRouter
class video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageList: {
                page: 1,
                limit: 10,
                isNoMore:false
            },
            isZanStatus:false,
            videoinfo:{},
            video_rand:[],
            feedList:[]
        }
    }

    componentWillMount() {
        const {match:{params:{id}}} = this.props;
        this.params = id;
    }

    componentDidMount() {
        this.initVideoInfo();
        this.getFeedback();
    }

    componentWillReceiveProps(nextProps) {

    }

    initVideoInfo(){
        let data = {
            video_id: this.params,
            imei: util.getLocalStorage('equipment'),
            type: 1,
            user_id: this.props.getuserinfo.id
        }
        React.ajaxGet('videoDetail', data).then(res => {
            this.setState({
                videoinfo:res
            })
            this.isZan(res['user']);
            this.setState({
                articleInfo: res,
                groom: res.groom
            })

            this.news_rand();
            this.getadImg();

        })
    }

    isZan(zanArr, clickOption) {
        //显示点赞图标
        if (!zanArr) {
            return;
        }
        if (!this.props.getuserinfo)
            this.setState({ isZanStatus: false })
        if (zanArr.indexOf(this.props.getuserinfo.id) != -1) {
            this.setState({
                isZanStatus: true
            })
        } else {
            this.setState({
                isZanStatus: false
            })
        }
    }

    news_rand() {
        React.ajaxGet('video_rand', {
            cid:  this.state.videoinfo.cid
        }).then(res => {
            this.setState({
                video_rand: res
            })
            
        })
    }

    getadImg() {
        React.ajaxPost('getAdvertisement', {
            phone: this.props.getuserinfo.username
        }).then(res => {
            this.setState({
                AdInfo: res.data.data
            })
            // this.feedScrollTop = this.refs.listWrap.offsetTop;
        })
    }

    initList(){

    }

    getFeedback(page) {
        React.ajaxGet('vcomment', {
            video_id: this.params,
            page: page ? page : this.state.pageList.page,
            limit: this.state.pageList.limit,
            user_id: this.props.getuserinfo.id,
        }).then(res => {
            //刷新评论数量大于0时    page加1
            let _page = res.current_page;
            if (res.data.length == 0 || res.data.length < this.state.pageList.limit) {
                setTimeout(() => {
                    this.refs.scroll.setNoMore();
                    this.refs.scroll.refresh();
                }, 1000)
            }else{
                _page += 1;
            }
            let data = res.data.map((item) => {
                
                item.isZan = item.groom_user && item.groom_user.indexOf(this.props.getuserinfo.id) != -1 ? true : false
                return item;
            })
            this.setState({
                pageList: Object.assign(this.state.pageList, { page: _page,isNoMore:res.data.length < this.state.pageList.limit ? true : false }),
                feedList: data
            })
        })
    }

    clickZan(option) {
        var status;
        if(option.type == 1){  //文章点赞
            status = this.state.isZanStatus ? 0 : 1;
        }else{//评论点赞
            status = option.src ? 0 : 1;
            // return false;
        }
        var data = {
            user_id: this.props.getuserinfo.id,
            type: option.type || 1,
            status: status
        };
        option.type == 1 ? data.video_id = option.news_id : data.comment_id = option.news_id;
        React.ajaxGet('vgroom', data).then(res => {
            if (option.type == 1) {  //文章点赞
                this.setState({
                    isZanStatus: this.state.isZanStatus ? false : true,
                    articleInfo: Object.assign(this.state.articleInfo, { groom: res })
                })
            } else {   //评论点赞
                let _res = this.state.feedList.map((item,index) => {
                    if(index == option.index){
                        item.isZan = option.src ? false : true;
                        item.groom = res;
                        return item;
                    }
                    return item;
                })
                this.setState({
                    feedList:_res
                })
            }
        })
    }

    

    render() {
        const navbar = {
            mode:"dark",
            title:"视频详情",
            ltype:"left",
        }
        return (
            <div>
                <Navbar option={navbar}></Navbar>
                <div className="news-wrap">
                <Scroll ref="scroll" isNoMore={this.state.pageList.isNoMore} loadMore={(num) => this.initList(num)} pullDownRefresh={false} header={true} >
                    <div id="content">
                        <div >
                            <video src={this.state.videoinfo.video_url} controls="controls" className="video-video"></video>
                            <div className="con-news">
                                <div className="news-title">{this.state.videoinfo.title}</div>
                                <div className="news-views-video">
                                    <div><span>来源于</span><span className="source">{this.state.videoinfo.source}</span></div>
                                    <div className="review-zan-info"   onClick={() => this.clickZan(
                                            {
                                                news_id: this.params,
                                                type: 1,
                                                src: this.state.articleInfo['user'],
                                            }
                                        )}>
                                        <img className="news-zan" src={this.state.isZanStatus ? require("../../assets/img/iszan.png") : require("../../assets/img/zan.png")} alt="" />
                                         <span className="groom">{this.state.videoinfo.groom}</span></div>
                                </div>
                            </div>
                            <div className="views-list">
                                <span className="con-list-title">相关视频</span>
                                <div className="video-list">
                                    {this.state.video_rand.map((item,index) => {
                                        return (<div className="video-list-con"  key={index}>
                                                    <div><img src={item.thumb} /></div>
                                                <div>
                                                <div>{item.title}</div>
                                                <div><img src="../../assets/img//评论.png" alt="" /><span>{item.comment}</span></div>
                                            </div>
                                        </div>)
                                    })}
                                </div>
                            </div>
                            <div className="con-list-wrap">
                                <span className="con-list-title">相关评论</span>
                                <div className="feed-back">
                                    {
                                        this.state.feedList.map((item,index) => {
                                            return (<div className="review-wrap" key={index}>
                                                <div className="review-left"> <img src={item.image} alt="" className="review-icon" /></div>
                                                <div className="review-right">
                                                    <div className="review-name-wrap">
                                                        <div>{item.nickname}</div>
                                                        <div><span className="review-zan" onClick={() => this.clickZan(
                                                            {
                                                                news_id: item.id,
                                                                type: 2,
                                                                src: item.isZan,
                                                                index:index
                                                            }
                                                        )}>
                                                            <img src={item.isZan ? require("../../assets/img/iszan.png") : require("../../assets/img/zan.png")} alt="" />
                                                        <span detail="groom">{item.groom}</span></span></div>
                                                    </div>
                                                    <div className="review-con">
                                                    {item.contents}
                                                    </div>
                                                    <div className="review-time-wrap">
                                                        <div>{util.time.getNowTime(item.create_time,true)}</div>
                                                        <div><span className="jub">举报</span></div>
                                                    </div>
                                                </div>
                                            </div>)
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    </Scroll>
                    <div id="send" className="footer">
                        <div className="input-wrap">
                            <img src={require('../../assets/img/feedback1.png')} alt="" />
                            <input type="text" placeholder="写评论" id="ipt" />
                            <div className="send">发布</div>
                        </div>
                        <span><img src={require('../../assets/img/feedback.png')} alt="" className="plsl" /></span>
                        <span className="plnub" detail="comment"></span>
                        <span id="share"><img src={require('../../assets/img/icon_share.png')} alt="" className="share-b" /></span>
                    </div>
                    <div className="canvas">
                        <div className="canvas-box" style={{width: '80px', height: '80px', right: '0'}}>
                            <canvas width="320" height="320" id="yuan" style={{width: '80px', height: '80px'}} ></canvas>
                        </div>
                    </div>
                    
	            </div>
            </div>
        );
    }
}

video.propTypes = {

};

export default video;