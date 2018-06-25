import React, { Component } from 'react';
import ReactDOM from "react-dom"
import BScroll from 'better-scroll'
import './scroll.css'
import { fastest } from 'sw-toolbox';

class Scroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pullUpDirty: true,
            isPullUpLoad: false,
            beforePullDown: true,
            isPullingDown: false,
            pullDownStyle: {top:"0px"},
            bubbleY: 0,
            beforeTxt: "下拉刷新",
            refreshTxt: "加载完成",
            data: [1, 2, 3, 4],
            pullDownInitTop: -50
        }
    }

    componentDidMount() {
        this.Wrapper = ReactDOM.findDOMNode(this.refs.scroll);
        this.initScroll();  //初始化  better-scroll
    }

    initScroll() {
        if (!this.Wrapper) {
            return false;
        }

        if (this.refs.Wrapper && (this.props.pullDownRefresh || this.props.pullUpLoad)) {
            //+1  超出屏幕最大高度才会有效果      this.header  当有顶部时
            if (this.header) {
                this.refs.Wrapper.style.height = (this.refs.Wrapper.parentNode.parentNode.clientHeight - 40) + "px";
                this.refs.scrollList.style.minHeight = (this.refs.Wrapper.parentNode.parentNode.clientHeight - 39) + "px";
            } else if (this.curHeight) {   //当容器自定义高度时  需传一个高度进来
                this.refs.Wrapper.style.height = (this.refs.Wrapper.parentNode.parentNode.clientHeight - this.curHeight) + "px";
                this.refs.scrollList.style.minHeight = (this.refs.Wrapper.parentNode.parentNode.clientHeight - this.curHeight + 1) + "px";
            } else {
                this.refs.Wrapper.style.height = (this.refs.Wrapper.parentNode.parentNode.clientHeight) + "px";
                this.refs.scrollList.style.minHeight = (this.refs.Wrapper.parentNode.parentNode.clientHeight + 1) + "px";
            }



            //全屏时代码
            //this.refs.scrollList.style.minHeight = `{util.bounce.getRect(this.refs.Wrapper).height + 1}px`;
        }
        console.log(this.props)
        console.log(this.Wrapper)
        let option = {
            scrollY: true,
            click: this.props.click,
            momentum: this.props.momentum,
            eventPassthrough: "horizontal",
            probeType: this.props.probeType,
            bounce: true,
            startY: 0,
            scrollbar: this.props.scrollbar,
            pullDownRefresh: this.props.pullDownRefresh,
            pullUpLoad: this.props.pullUpLoad
        };
        this.scroll = new BScroll(this.Wrapper, option);
        console.log(this.scroll);
    }

    _initPullUpLoad() {
        this.scroll.on("pullingUp", () => {
            this.state.isPullUpLoad = true;
            // this.$emit("pullingUp");
            if (!this.props.isNoMore) {
                this.props.pageObj.page += 1;
                this.initPage(this.props.pageObj.page);
            } else {
                setTimeout(() => {
                    this.forceUpdate(true);
                }, 300)
            }
        });
    }

    initPage(page) {
        this.props.pageObj.page = page ? page : 1;
        this.$emit("loadMore", this.props.pageObj);
    }
    forceUpdate(dirty) {
        if (this.props.pullDownRefresh && this.state.isPullingDown) {
            this.state.isPullingDown = false;
            this._reboundPullDown().then(() => {
                this._afterPullDown();
            });
        } else if (this.state.pullUpLoad && this.props.isPullUpLoad) {
            this.props.isPullUpLoad = false;
            this.scroll.finishPullUp();
            /**必须DOM生成完才能执行refresh  否则会出现scroll 出现异常   */
            this.refresh();
        } else {
            /**必须DOM生成完才能执行refresh  否则会出现scroll 出现异常   */
            this.refresh();
        }
    }

    _reboundPullDown() {
        return new Promise(resolve => {
            setTimeout(() => {
                this.scroll.finishPullDown();
                resolve();
            }, 1000);
        });
    }
    _afterPullDown() {
        setTimeout(() => {
            this.state.pullDownStyle = {top:this.state.pullDownInitTop+'px'};
            this.state.beforePullDown = true;
            /**必须DOM生成完才能执行refresh  否则会出现scroll 出现异常   */
            this.refresh();
        }, 100);
    }
    refresh() {
        this.scroll && this.scroll.refresh();
    }
    handClick(index) {
        console.log(index);
    }

    _initPullUpLoad() {
        this.scroll.on("pullingUp", () => {
            this.state.isPullUpLoad = true;
            // this.$emit("pullingUp");
            if (!this.props.isNoMore) {
                this.props.pageObj.page += 1;
                this.initPage(this.props.pageObj.page);
            } else {
                setTimeout(() => {
                    this.forceUpdate(true);
                }, 300)
            }
        });
    }

    getpullDown() {
        return (<div name="pulldown"
            pullDownRefresh={this.props.pullDownRefresh}
            pullDownStyle={this.state.pullDownStyle}
            beforePullDown={this.state.beforePullDown}
            isPullingDown={this.state.isPullingDown}
            bubbleY={this.state.bubbleY}
        >
            {this.getpullDownCon()}
        </div>)
    }

    getUp(){
        {/* <!-- 上拉加载 --> */}
        return (
            //name="pullup"
            <div 
                // pullUpLoad={this.props.pullUpLoad}
                // isPullUpLoad={this.state.isPullUpLoad}
                >
                {
                    this.props.pullUpLoad ? <div className="before-trigger"><span>123</span></div> : <div className="after-trigger"><loading></loading> </div> 
                }
                
            </div>)
    }
    // <div class="pullup-wrapper" v-if="pullUpLoad">
    //                 <div class="before-trigger" v-if="!isPullUpLoad">
    //                     <span>{{pullUpTxt}}</span>
    //                 </div>
    //                 <div class="after-trigger" v-else>
    //                     {/* <!-- 加载中 --> */}
    //                     <loading></loading>
    //                 </div>
    //             </div>


    getpullDownCon() {
        if (this.props.pullDownRefresh) {
            return (
                <div ref="pulldown" className="pulldown-wrapper" style={this.state.pullDownStyle} >
                    {this.state.beforePullDown ? <div className="before-trigger">{this.state.beforeTxt}</div> : (<div className="after-trigger">
                        {this.state.isPullingDown} ? <div className="loading"><loading></loading></div> : <div><span className="refresh-txt">{this.state.refreshTxt}</span></div>
                    </div>)}
                </div>
            )
        }
    }

    render() {
        //onClick={() => this.handClick(index)}
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
        return (
            <div >
                <div ref="scroll" style={{ overflow: "hidden", height: "400px" }}>
                    <div className="scroll-content newsCon" id="scroll-content" >
                        <div ref="scrollList">
                            <slot>
                                
                            </slot>
                        </div>
                        {this.getUp()}
                    </div>
                    {this.getpullDown()}
                    {/* <ul>
                        {arr.map((item, index) => {
                            return (<li className="list-item" onClick={() => this.handClick(index)} key={index}>{item}</li>)
                        })}
                    </ul> */}
                </div>
                
            </div>
        );
    }
}
Scroll.defaultProps = {
    pageObj: {
        page: 1,
        limit: 5,
        filter: "",
        order: ""
    },
    probeType: 3,
    click: true,
    listenScroll: false,
    listenBeforeScroll: false,
    scrollbar: false,
    pullDownRefresh: {
        threshold: 90,
        stop: 40
    },
    pullUpLoad: {
        threshold: 0,
        txt: { more: "加载中...", noMore: "没有更多了" }
    },
    startY: 0,
    momentum: true,
    isNoMore: false,
    header: false,
    curHeight: 0
}

export default Scroll;