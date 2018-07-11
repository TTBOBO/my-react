import React, { Component } from 'react';
import './news.css';
import Navbar from '../../conponents/navbar/navBar';
import Scroll from '../../conponents/Scroll/Scroll'
import { Toast } from 'antd-mobile';
import Sheet from '../../conponents/actionSheet/actionSheet'
import { withRouter } from 'react-router-dom'
import connect from '../../store/connnect'
import util from '../../assets/js/util';
import { fastest } from 'sw-toolbox';
@connect
@withRouter
class article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleInfo: {},
            news_rand: [],
            AdInfo: {},
            feedList: [],
            pageList: {
                page: 1,
                limit: 10,
                isNoMore:false
            },
            isZanStatus: false,
            groom: 0
        }
    }

    componentWillMount() {
        const { match: { params: { id } } } = this.props;
        this.params = id;

    }

    componentDidMount() {
        this.initArticleinfo();  //初始化 文章详情
        this.getFeedback();
        
    }

    componentWillReceiveProps(nextProps) {

    }

    initArticleinfo() {
        let data = {
            news_id: this.params,
            imei: util.getLocalStorage('equipment'),
            type: 1,
            user_id: this.props.getuserinfo.id
        }
        React.ajaxGet('adetail', data).then(res => {
            this.isZan(res['user']);
            this.setState({
                articleInfo: res,
                groom: res.groom
            })

            this.news_rand();
            this.getadImg();
            //只有在没有加过3次钱再加钱
            // if(res.data.seconds_status != 3){
            //     $('.canvas-box').show()
            //     that.InitCanvas();
            // }		
            // setTimeout(() => {
            //     this.refs.sheet.showActionSheet();
            // },2000)

        })
    }


    getadImg() {
        React.ajaxPost('getAdvertisement', {
            phone: this.props.getuserinfo.username
        }).then(res => {
            this.setState({
                AdInfo: res.data.data
            })
            this.feedScrollTop = this.refs.listWrap.offsetTop;
        })
    }

    news_rand() {
        React.ajaxGet('news_rand', {
            cid: this.state.articleInfo.cid
        }).then(res => {
            this.setState({
                news_rand: res
            })
            
        })
    }

    getFeedback(page) {
        React.ajaxGet('acomment', {
            news_id: this.params,
            page: page ? page : this.state.pageList.page,
            limit: this.state.pageList.limit
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
                item.isZan = item.user.indexOf(this.props.getuserinfo.id) != -1 ? true : false
                return item;
            })
            this.setState({
                pageList: Object.assign(this.state.pageList, { page: _page,isNoMore:res.data.length < this.state.pageList.limit ? true : false }),
                feedList: data
            })
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



    getIndex(zanArr) {
        if (zanArr.indexOf(this.props.getuserinfo.id) != -1) {
            return false;
        }
        return true;
    }

    clickZan(option) {
        var status;
        if(option.type == 1){  //文章点赞
            status = this.state.isZanStatus ? 0 : 1;
        }else{//评论点赞
            status = option.src ? 0 : 1;
            console.log(this.state.feedList,option)
            // return false;
        }
        var data = {
            user_id: this.props.getuserinfo.id,
            type: option.type || 1,
            status: status
        };
        option.type == 1 ? data.news_id = option.news_id : data.comment_id = option.news_id;
        React.ajaxGet('groom', data).then(res => {
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

    makeFeedback(e){
        let feedVal = this.refs.feed.value;
        console.log(this.refs.feed.value);
        if (!this.props.getuserinfo){
            Toast.info("请登录再评论",2,null,false);
            return false;
        }
        if(feedVal.length > 150) {
            Toast.info("最多字数为150",2,null,false);
            return false;
        } else if(feedVal.length == 0) {
            Toast.info("请输入评语再评论",2,null,false);
            return false;
        }
        React.ajaxGet('write_comment',{
            news_id: this.params,
            user_id: this.props.getuserinfo.id,
            comment: feedVal
        }).then(res => {
            Toast.info("评论成功",2,null,false);
            this.getFeedback();
            feedVal = "";
        })
       
    }
    scrollTo(){
        this.refs.scroll.scrollTo(0,-this.feedScrollTop,200);
    }

    initList(num) {
        console.log(num)
        this.getFeedback();
        setTimeout(() => {
            this.refs.scroll.forceUpdate(true);
        }, 2000)
    }

    render() {
        const navbar = {
            mode: "dark",
            title: "文章详情",
            ltype: "left",
        }
        return (
            <div>
                <Navbar option={navbar}></Navbar>
                <div className="herder-content news-wrap ">
                    <Scroll ref="scroll" isNoMore={this.state.pageList.isNoMore} loadMore={(num) => this.initList(num)} pullDownRefresh={false} header={true} >
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
                                    <span detail="content" dangerouslySetInnerHTML={{ __html: this.state.articleInfo['content'] }}>

                                    </span>
                                    <div className="news-ju">
                                        <div className="review-zan-info" onClick={() => this.clickZan(
                                            {
                                                news_id: this.params,
                                                type: 1,
                                                src: this.state.articleInfo['user'],
                                            }
                                        )}>
                                            <img src={this.state.isZanStatus ? require("../../assets/img/iszan.png") : require("../../assets/img/zan.png")} alt="" className="news-zan" />
                                            <div detail="groom">
                                                {this.state.articleInfo['groom']}
                                            </div>
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
                                        this.state.news_rand.map((item, index) => {
                                            return (<span key={index}>{item.title}</span>)
                                        })
                                    }

                                </div>
                                <div className="con-list-wrap" ref="listWrap">
                                    <span className="con-list-title">相关评论</span>
                                    <div className="feed-back">
                                        {this.state.feedList.map((item, index) => {
                                            return (<div className="review-wrap" key={index}>
                                                <div className="review-left"> <img src={item.image} alt="" className="review-icon" /> </div>
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
                                                            <img src={item.isZan ? require("../../assets/img/iszan.png") : require("../../assets/img/zan.png")} alt="" /></span><span detail="groom">{item.groom}</span></div>
                                                    </div>
                                                    <div className="review-con">
                                                        {item.contents}
                                                    </div>
                                                    <div className="review-time-wrap">
                                                        <div>${util.time.getNowTime(item.create_time, true)}</div>
                                                        <div><span>举报</span></div>
                                                    </div>
                                                </div>
                                            </div>)
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Scroll>
                    <div id="send" className="footer">
                        <div className="input-wrap">
                            <img src={require('../../assets/img/feedback1.png')} alt="" />
                            <input type="text" placeholder="写评论" id="ipt" ref="feed" />
                            <div className="send"  onClick={(e) => this.makeFeedback(e)}>发布</div>
                        </div>
                        <span onClick={() => this.scrollTo()}><img src={require('../../assets/img/feedback.png')} alt="" className="plsl" /></span>
                        <span className="plnub" detail="comment"> {this.state.articleInfo['comment']}</span>
                        <span id="share"><img src={require('../../assets/img/icon_share.png')} alt="" className="share-b" /></span>
                    </div>
                    <div className="canvas">
                        <div className="canvas-box" style={{ width: '80px', height: '80px', right: '0' }}>
                            <canvas width="320" height="320" id="yuan" style={{ width: '80px', height: '80px' }}></canvas>
                        </div>
                    </div>
                    <Sheet ref="sheet"></Sheet>
                </div>
            </div>
        );
    }
}

article.propTypes = {

};

export default article;