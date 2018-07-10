import React, { Component } from 'react';
import Scroll from '../Scroll/Scroll'
import '../Scroll/scroll.css';
import './video.css';
class video extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {
        console.log(this.props.dataList)
    }

    componentWillReceiveProps(nextProps) {

    }

    initList(num){
        console.log(num)
    }
    
    handVideo(item,index){
        console.log(item,index);
    }

    render() {
        return (
            <Scroll ref="scroll" loadMore={(num) => this.initList(num)}  curHeight={1}>
                <div  className="video-con">
                    {this.props.dataList.map((item,index) => {
                        return (<div className="video-item" key={index}>
                        <div className="video-title" onClick={() => this.handVideo(item,index)}>{item.title}</div>
                        <div className="video-box"><video className="video-video" src={item.video_url} controls="controls"></video></div>
                        <div className="video-footer">
                            <div className="avatar-con">
                                <img  src={item.avatars}  />
                                <span>{item.author}</span>
                            </div>
                            <div>
                                <span className="vfeed-con vfeed-con-first"><span className="iconfont icon-comment vfeed-icon"></span>{item.comment}</span>
                                <span className="iconfont icon-gengduo vfeed-con"></span>
                            </div>
                        </div>
                    </div>)
                    })}
                </div>
            </Scroll>
           
        );
    }
}

video.propTypes = {

};

export default video;