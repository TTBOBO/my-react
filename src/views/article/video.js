import React, { Component } from 'react';
import './news.css';
import Navbar from '../../conponents/navbar/navBar';
import { Toast} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import connect from '../../store/connnect'
@connect
@withRouter
class video extends Component {
    constructor(props) {
        super(props);
        
    }

    componentWillMount() {
        const {match:{params:{id}}} = this.props;
        this.params = id;
        console.log(JSON.parse(id));
        console.log(1)
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

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
                <div className="news-wrap">
                    <div id="content">
                        <div >
                            <video src="/resource/front/img/QQ20180326-135401-HD.mp4" controls="controls" className="video-video"></video>
                            <div className="con-news">
                                <div className="news-title"></div>
                                <div className="news-views-video">
                                    <div><span>来源于</span><span className="source"></span></div>
                                    <div className="review-zan-info"><img className="news-zan" src="/resource/front/img/赞.png" alt="" /> <span className="groom"></span></div>
                                </div>
                            </div>
                            <div className="views-list">
                                <span className="con-list-title">相关视频</span>
                                <div className="video-list"></div>
                            </div>
                            <div className="con-list-wrap">
                                <span className="con-list-title">相关评论</span>
                                <div className="feed-back">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
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