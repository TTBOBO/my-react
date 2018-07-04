import React, { Component } from 'react';
import BScroll from 'better-scroll'
import connect from '../../store/connnect'
import './index.css';
import ArticleList from '../../conponents/article/ArticleList'
@connect
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
            height:""
        }
    }
    componentDidMount() {
        this.initBanner();
        if (this.props.getChannel.length != 0) {
            // this.initBanner();
            // this.initScroll();
            // this.initSwiper();
        }
    }

    componentWillMount() {
       
    }


    initBanner() {
        // if (this.props.getChannel.length == 0) {
            let arr = [
                {
                    "id": 1,
                    "name": "教育",
                    "status": 1,
                    "create_time": "2016-12-22 18:22:24"
                },
                {
                    "id": 2,
                    "name": "娱乐",
                    "status": 1,
                    "create_time": "2018-06-07 15:23:01"
                },
                {
                    "id": 3,
                    "name": "财经",
                    "status": 1,
                    "create_time": "2018-06-07 15:23:09"
                },
                {
                    "id": 4,
                    "name": "游戏",
                    "status": 1,
                    "create_time": "2018-06-11 16:15:14"
                },
                {
                    "id": 5,
                    "name": "新闻",
                    "status": 1,
                    "create_time": "2018-06-13 15:35:32"
                },
                {
                    "id": 7,
                    "name": "科技",
                    "status": 1,
                    "create_time": "2018-06-13 15:39:28"
                },
                {
                    "id": 6,
                    "name": "体育",
                    "status": 1,
                    "create_time": "2018-06-13 15:40:34"
                }
            ];
            this.props.get_channel('GETCHANNEL', arr);
            setTimeout(() => {
                this.initScroll(); //初始化 横向滚动栏
                this.initSwiper(); //初始化横向滚动栏宽度
                this.getList(); //获取栏目内容
            },100)
            // React.ajaxPost('get_channel', {
            //     username: 18680341334,
            //     token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.W3sidXNlcm5hbWUiOiIxNTMwODQ3ODI3MCIsInRpbWUiOjE1Mjk2NTg0NTR9XQ.BB7I58YHibKcJHu-xWsCMhhSrKIk5Ewrhh05hbyBnGQ"
            // }).then(res => {
            //     let arr = [...res.data];
            //     this.props.get_channel('GETCHANNEL', arr);
            //     this.initScroll(); //初始化 横向滚动栏
            //     this.initSwiper(); //初始化横向滚动栏宽度
            //     this.getList(); //获取栏目内容
            //     console.log(this.props.getChannel)
            // })
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
        let _left = this.state.left;
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
        if (left * 100 > bottomWrapperWidth / 2 && -(left * 100 - bottomWrapperWidth / 2) > maxScrollW) {
            this.scroll.scrollTo(-(left * 100 - bottomWrapperWidth / 2), 0, 200);
        } else if (left * 100 < bottomWrapperWidth / 2) {
            this.scroll.scrollTo(0, 0, 200);
        }

        /**当列表长度为空时  加载当前页数据 */
        // setTimeout(() =>{
        // if (this.globel.newsList[index].newList.length == 0) {
        //     this.initPage(this.globel.newsList[this.currentPage].objList);
        // }
        // },200)
    }

    changePage(objList) {
        // this.initPage(objList);
    }

    getList(){
        // React.ajaxPost('news', {
        //     type: 1,  //this.props.getChannel[this.state.currentPage].id
        //     page: 1
        // }).then(res => {
        //     console.log(res);
        // })
    }

    initPage(page) {
        this.globel.newsList[this.currentPage].objList = page ? page : 1;
        //当下这行可忽略
        this.globel.newsList[this.currentPage].objList.filter = "hm_archives.typeid = "+ ( (this.currentPage % 7 ) + 2);
        this.$ajaxPost("/hmapi/article/api_article/grid", this.globel.newsList[this.currentPage].objList).then(
          res => {
            if(res.data.rows.length > 0 ){
              /**给当前页新闻列表添加加载数据 */
              this.isNoMore = false;
              this.globel.newsList[this.currentPage].isNoMore = false;
              this.globel.newsList[this.currentPage].objList.page == 1 ? (this.globel.newsList[this.currentPage].newList = res.data.rows)  : this.globel.newsList[this.currentPage].newList.push(...res.data.rows);
            }else{
              this.isNoMore = true;
              this.globel.newsList[this.currentPage].isNoMore = true;
              
            }
  
            setTimeout(() =>{
               this.$refs.loadMore[this.currentPage].forceUpdate(true);
            },300)
          }
        );
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

    render() {
        return (
            <div style={{ height: '100%' }}>
                <div className="topWrapper" ref="topWrapper">
                
                    <ul ref="ul" style={{position:'relative'}}>
                        {this.props.getChannel.map((item, index) => {
                            return (<li className={this.state.currentPage == index ? 'top-active' : ''} key={index} onClick={() => {this.activeLi(index)}}>{item.name}</li>)
                        })}
                        <div className="bottom-line" style={{ left: this.state.left + 'rem' }}></div>
                    </ul>
                </div>
                {this.state.left}
                <div className="bottomWrapper container" ref="bottomWrapper">
                    <div ref="newCon" >
                        {this.props.getChannel.map((item, index) => {
                            if(this.state.height){
                                return (<div key={index} className="newsList" >
                                    <ArticleList name={'banner'+index} height={this.state.height} ></ArticleList>
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