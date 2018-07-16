import React, { Component } from 'react';
import BScroll from 'better-scroll'
import './scroll.css';

import { Icon } from 'antd-mobile';

class Scroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pullUpDirty: true,   //初始化有无更多数据  true可继续刷新  false  五更多数据
            isPullUpLoad: false,  //上拉刷新  加载状态 true  显示加载全  false  显示文字
            beforePullDown: true,
            isPullingDown: false,  //下拉刷新  加载状态 true  显示加载全  false  显示文字
            pullDownStyle: { top: "-50px" },  //下拉刷新文字默认显示的位置
            bubbleY: 0,
            beforeTxt: "下拉刷新",
            refreshTxt: "加载完成",
            pullDownInitTop: -50,  //刷新完文件回到原来的位子
        }
    }
    

    componentDidMount() {
        this.Wrapper = this.refs.scroll;
        setTimeout(() => {
            this.initScroll();  //初始化  better-scroll
        })
    }

    

    initScroll() {
        if (!this.Wrapper) {
            return false;
        }
        if (this.Wrapper && (this.props.pullDownRefresh || this.props.pullUpLoad)) {
           
            //+1  超出屏幕最大高度才会有效果      this.header  当有顶部时
            if (this.props.header) { 
                this.Wrapper.style.height = (this.Wrapper.parentNode.parentNode.clientHeight - 45) + "px";
                this.refs.scrollList.style.minHeight = (this.Wrapper.parentNode.parentNode.clientHeight - 44) + "px";
            } else if (this.props.curHeight) {   //当容器自定义高度时  需传一个高度进来
                this.Wrapper.style.height = (this.Wrapper.parentNode.parentNode.clientHeight - this.props.curHeight) + "px";
                this.refs.scrollList.style.minHeight = (this.Wrapper.parentNode.parentNode.clientHeight - this.props.curHeight + 1) + "px";
            } else {
                this.Wrapper.style.height = (this.Wrapper.parentNode.parentNode.clientHeight) + "px";
                this.refs.scrollList.style.minHeight = (this.Wrapper.parentNode.parentNode.clientHeight +1) + "px";
            }
        }
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
        //
        if (this.props.pullDownRefresh) {
            this._initPullDownRefresh();
        }
        if (this.props.pullUpLoad) {
            this._initPullUpLoad();
        }
    }



    _initPullDownRefresh() {
        this.scroll.on("pullingDown", () => {
            this.setState({
                beforePullDown: false,
                isPullingDown: true
            })
            this.initPage();
            setTimeout(() => {
                this.forceUpdate(true);
            }, 300)
        })

        this.scroll.on("scroll", pos => {
            this.setState({
                beforeTxt: parseInt(pos.y) > this.props.pullDownRefresh.threshold ? "释放刷新" : "下拉刷新"
            })

            if (this.props.beforePullDown) {
                // this.props.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
                this.setState({
                    bubbleY: Math.max(0, pos.y + this.pullDownInitTop)
                })
                this.setState({
                    pullDownStyle: { top: Math.min(pos.y + this.pullDownInitTop, 10) + 'px' }
                });
            } else {
                this.setState({
                    bubbleY: 0
                })
            }
            this.setState({
                pullDownStyle: { top: (10 - (this.props.pullDownRefresh.stop - pos.y)) + 'px' }
            });
        });



        //设置每个scroll的  scrollTop
        this.scroll.on('scrollEnd', pos => {
            // this.globel.newsList[this.globel.currentPage].scrollTop = pos.y;
        })
    }
    _initPullUpLoad() {
        this.scroll.on("pullingUp", () => {
            this.setState({
                isPullUpLoad: true
            })
            // this.$emit("pullingUp");
            if (!this.props.isNoMore) {
                // this.props.pageObj.page += 1;
                setTimeout(() => {
                    this.forceUpdate();
                }, 300)
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
        this.props.loadMore(111)
    }
    forceUpdate(dirty) {
        if (this.props.pullDownRefresh && this.state.isPullingDown) {
            this.setState({
                isPullingDown: false
            })
            this._reboundPullDown().then(() => {
                this._afterPullDown();
            });
        } else if (this.props.pullUpLoad && this.state.isPullUpLoad) {
            this.setState({
                isPullUpLoad: false
            })
            this.scroll.finishPullUp();
            this.refresh();
        } else {
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
            this.setState({
                pullDownStyle: { top: this.state.pullDownInitTop + 'px' },
                beforePullDown: true
            })
            this.refresh();
        }, 100);
    }
    refresh() {
        this.scroll && this.scroll.refresh();
    }
    handClick(index) {
        console.log(index);
    }
    getpullDown() {
        return (<div style={this.state.pullDownStyle}>{this.getpullDownCon()} </div>)
    }

    getUp() {
        {/* <!-- 上拉加载 --> */ }
        if (this.props.pullUpLoad) {
            return (
                <div className="pullup-wrapper">
                {
                    !this.state.isPullUpLoad ? <div className="after-trigger"><Icon type="loading" /> </div> : <div className="before-trigger"><span>{this.gettext()}</span></div>
                }
            </div>)
        }
    }

    gettext() {
        const moreTxt = this.props.pullUpLoad && this.props.pullUpLoad.txt && this.props.pullUpLoad.txt.more;
        const noMoreTxt = this.props.pullUpLoad && this.props.pullUpLoad.txt && this.props.pullUpLoad.txt.noMore;

        return this.state.pullUpDirty ? moreTxt : noMoreTxt;
    }

    //反向设置  数据有无更多数据
    setNoMore() {
        this.setState({pullUpDirty:false});
    }


    getpullDownCon() {
        if (this.props.pullDownRefresh) {
            return (
                <div ref="pulldown" className="pulldown-wrapper" style={this.state.pullDownStyle} >
                    {this.state.beforePullDown ? <div className="before-trigger">{this.state.beforeTxt}</div> : this.getloadText()}
                </div>
            )
        }
    }

    getloadText() {

        return (<div className="after-trigger">
            {this.state.isPullingDown ? <div className="loading"><Icon type="loading" /></div> : <div><span className="refresh-txt">{this.state.refreshTxt}</span></div>}
        </div>)
    }


    scrollTo(x,y,time){
        if(this.scroll){
            this.scroll.scrollTo(x,y,time);
        }
    }

    

    render() {
        //onClick={() => this.handClick(index)}
        return (
            <div style={{height:'100%'}}>
                <div ref="scroll"  style={{ overflow: "hidden", position: 'relative' }}>
                    <div className="scroll-content newsCon" id="scroll-content" >
                        <div ref="scrollList">
                            {
                               this.props.children
                            }
                        </div>
                        {/* 上拉加载内容 */}
                        {this.getUp()}  
                    </div>
                    {/* 下拉刷新内容 */}
                    {this.getpullDown()}
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