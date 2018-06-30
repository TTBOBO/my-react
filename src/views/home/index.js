import React, { Component } from 'react';
import BScroll from 'better-scroll'
import connect from '../../store/connnect'
import './index.css';
import Cart from '../cart/index'
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
            isNoMore: false
        }
    }
    componentDidMount() {
        if (this.props.getChannel.length != 0) {
            this.initScroll();
            this.initSwiper();
        }
    }

    componentWillMount() {
        this.initBanner();
    }


    initBanner() {
        if (this.props.getChannel.length == 0) {
            React.ajaxPost('get_channel', {
                username: 15308498888,
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.W3sidXNlcm5hbWUiOiIxNTMwODQ3ODI3MCIsInRpbWUiOjE1Mjk2NTg0NTR9XQ.BB7I58YHibKcJHu-xWsCMhhSrKIk5Ewrhh05hbyBnGQ"
            }).then(res => {
                let arr = [...res.data];
                this.props.get_channel('GETCHANNEL', arr);
                this.initScroll(); //初始化 横向滚动栏
                this.initSwiper(); //初始化横向滚动栏宽度
                this.getList(); //获取栏目内容
                console.log(this.props.getChannel)
            })
        }
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
            left: this.state.left + (index * 1.2),
            currentPage: index
        })
        this.left = this.left + index * 1.2;
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
        React.ajaxPost('news', {
            type: 7,  //this.props.getChannel[this.state.currentPage].id
            page: 1
        }).then(res => {
            console.log(res);
        })
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
                    <ul ref="ul">
                        {this.props.getChannel.map((item, index) => {
                            return (<li key={index} onClick={() => {this.activeLi(index)}}>{item.name}</li>)
                        })}
                    </ul>
                    <div className="bottom-line" style={{ left: this.state.left + 'rem' }}></div>
                </div>
                <div className="bottomWrapper container" ref="bottomWrapper">
                    <div ref="newCon" >
                        {this.props.getChannel.map((item, index) => {
                            return (<div key={index} className="newsList" >
                                {/* <Cart></Cart> */}
                                <ArticleList name={'banner'+index}></ArticleList>
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
export default home;