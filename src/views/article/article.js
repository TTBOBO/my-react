import React, { Component } from 'react';
import './news.css';
import Navbar from '../../conponents/navbar/navBar';
import Scroll from '../../conponents/Scroll/Scroll'
import { Toast} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import connect from '../../store/connnect'
import util from '../../assets/js/util';
@connect
@withRouter
class article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleInfo:{},
            news_rand:[],
            AdInfo:{},
            feedList:[],
            pageList:{
				page: 1,
				limit: 10
			}
        }
    }

    componentWillMount() {
        const {match:{params:{id}}} = this.props;
        this.params = id;
        
    }

    componentDidMount() {
        this.initArticleinfo();  //初始化 文章详情
        this.getFeedback()
    }

    componentWillReceiveProps(nextProps) {

    }

    initArticleinfo(){
        let data = {
            news_id: this.params,
            imei:util.getLocalStorage('equipment'),
            type:1,
            user_id:this.props.getuserinfo.id
        }
        React.ajaxGet('adetail', data).then(res => {
            this.setState({
                articleInfo:res
            })
            this.news_rand();
            this.getadImg();
			//只有在没有加过3次钱再加钱
            // if(res.data.seconds_status != 3){
            //     $('.canvas-box').show()
            //     that.InitCanvas();
            // }		

        })
    }

    
    getadImg(){
        React.ajaxPost('getAdvertisement', {
            phone: this.props.getuserinfo.username
        }).then(res => {
           this.setState({
                AdInfo:res.data.data
           })
        })
    }

    news_rand(){
        React.ajaxGet('news_rand', {
            cid: this.state.articleInfo.cid
        }).then(res => {
           	this.setState({
                news_rand:res
            })
        })
    }

    getFeedback(page){
        React.ajaxGet('acomment', {
            news_id: this.params,
			page: page ? page : this.state.pageList.page,
			limit:  this.state.pageList.limit
        }).then(res => {
            //刷新评论数量大于0时    page加1
			if(res.data.length == 0) {
                setTimeout(() => {
                    this.refs.scroll.refresh();
                }, 1000)
                return false;
            }
            let _page = res.current_page + 1	
            this.setState({
                pageList:Object.assign(this.state.pageList,{page:_page}),
                feedList:res.data
            })
           	console.log(this.state.pageList);
        })
    }

    isZan(zanArr,clickOption){
        //显示点赞图标
        if(!zanArr) {
            return;
        }
        if(!this.props.getuserinfo)
            return require("../../assets/img/zan.png");
        if(zanArr.indexOf(this.props.getuserinfo.id) != -1){
            return require("../../assets/img/iszan.png");
        }else{
            return require("../../assets/img/zan.png");
        }
        
    }

    clickZan(item){
        console.log(item);
    }


    initList(num){
        setTimeout(() => {
            this.refs.scroll.refresh();
        },2000)
    }
    

    render() {
        const navbar = {
            mode:"dark",
            title:"文章详情",
            ltype:"left",
        }
        return (
            <div>
                <Navbar option={navbar}></Navbar>
                <div className="herder-content news-wrap ">
                    <Scroll ref="scroll" loadMore={(num) => this.initList(num)} pullDownRefresh={false} header={true} >
                    <div id="content" >
                        <div>
                            <div className="con-news">
                                <div className="news-title" >{this.state.articleInfo['title']}</div>
                                <div className="news-views">
                                    <div><span>阅读</span><span >{this.state.articleInfo['reading']}</span></div>
                                    <div><span>来源于</span><span >{this.state.articleInfo['source']}</span><span>{util.getDateDiff(this.state.articleInfo['create_time'])}</span></div>
                                </div>
                            </div>
                            <div className="con-bottom-con">
                                <span detail="content" dangerouslySetInnerHTML={{__html:this.state.articleInfo['content']}}>
                                    
                                </span>
                                <div className="news-ju">
                                    <div className="review-zan-info">
                                        <img src={this.isZan(this.state.articleInfo['user'])} onClick={() => this.clickZan(item) alt="" className="news-zan" />
                                        <div detail="groom"></div>
                                    </div>
                                    <div className="infojub">
                                        <img src={require('../../assets/img/ld.png')} alt="" className="news-jubao" />
                                        <div>举报</div>
                                    </div>
                                </div>

                            </div>
                            <div className="con-bottom-gg">
                                <div className="con-bor">
                                    <img src={this.state.AdInfo.fx_img} alt="" className="con-bottom-con-img" />
                                    <span className="fx-name">{this.state.AdInfo.name}</span>
                                </div>
                            </div>

                            <div className="con-back-ccc">
                                {
                                    this.state.news_rand.map((item,index) => {
                                        return (<span key={index}>{item.title}</span>)
                                    })
                                }
                                
                            </div>
                            <div className="con-list-wrap">
                                <span className="con-list-title">相关评论</span>
                                <div className="feed-back">
                                    {this.state.feedList.map((item,index) => {
                                        return (<div className="review-wrap" key={index}>
                                            <div className="review-left"> <img src={item.image} alt="" className="review-icon" /> </div>
                                            <div className="review-right">
                                                <div className="review-name-wrap">
                                                    <div>{item.nickname}</div>
                                                    <div><span className="review-zan"><img src="/resource/front/img/赞.png" alt=""/></span><span detail="groom">21</span></div>
                                                </div>
                                                <div className="review-con">
                                                    {item.contents}
                                                </div>
                                                <div className="review-time-wrap">
                                                    <div>${util.time.getNowTime(item.create_time,true)}</div>
                                                    <div><span>举报</span></div>
                                                </div>
                                            </div>
                                        </div> )
                                    })}
                                    {/* <div className="review-wrap">
                                        <div className="review-left"> <img src="/resource/front/img/笑脸(2).png" alt="" className="review-icon" /> </div>
                                        <div className="review-right">
                                            <div className="review-name-wrap">
                                                <div>爱笑会议室</div>
                                                <div><span className="review-zan"><img src="/resource/front/img/赞.png" alt=""/></span><span detail="groom">21</span></div>
                                            </div>
                                            <div className="review-con">西班牙必胜，西班牙必胜，西班牙必胜，西班牙必胜西班牙必胜，西班牙必胜西班牙必胜，西班牙必胜，西班牙必胜 ，西班牙必胜西班牙必胜，西班牙必胜西班牙必胜，西班牙必胜，西班牙必胜，西班牙必胜西班牙必胜，西班牙必胜
                                            </div>
                                            <div className="review-time-wrap">
                                                <div>05-4 10：31</div>
                                                <div><span>举报</span></div>
                                            </div>
                                        </div>
                                    </div> */}
                                    
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
                            
                            <canvas width="320" height="320" id="yuan" style={{width: '80px', height: '80px'}}></canvas>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        );
    }
}

article.propTypes = {

};

export default article;