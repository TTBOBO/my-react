import React, { Component } from 'react';
import Navbar from '../../conponents/navbar/navBar';
import util from '../../assets/js/util';
import './sear.css'
import { NavBar, SearchBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom'

@withRouter
class searArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchStatus: false,
            arr:[1,2,3,4],
            seeCount:3,
            value:""
        }
    }

    componentWillMount() {
        let _arr = util.getLocalStorage('searArr');
        this.setState({
            arr:_arr ? JSON.parse(_arr) : []
        })
    }

    componentDidMount() {
        this.setState({
            searchStatus:this.state.arr.length > 3 ? false :true
        })
        setTimeout(() => {
            this.manualFocusInst.focus();
        })
    }
    changeVal(e){
        this.setState({
            value:e
        })
    }
    onSubmit(e) {
        let _arr = this.state.arr;
        _arr.forEach((item,index) => {
            if(item == e){
                _arr.splice(index,1);
            }
        })
        _arr.unshift(e);
        util.setLocalStorage('searArr',JSON.stringify(_arr));
        this.setState({
            arr:_arr,
            searchStatus:this.state.arr.length > 3 ? false :true,
            value:""
        })
    }

    setMore() {
        if (!this.state.searchStatus) {
            this.setState({
                searchStatus: true,
                seeCount:this.state.arr.length
            })
        } else {
            this.setState({
                searchStatus: false,
                seeCount:3,
                arr:[]
            })
            util.setLocalStorage('searArr',[]);
        }
    }

    getBtn(){
        if(this.state.arr.length > 0){
            return (<li className="clear-btn"  onClick={() => this.setMore()}>{this.state.searchStatus ? '清除搜索记录' : '全部搜索记录'}</li>)
        }else{
            return(<div className="no-sear">暂无搜索记录</div>)
        }
    }

    delHis(index){
        let _arr = this.state.arr;
         _arr.splice(index,1);
         console.log(_arr);
        this.setState({
            arr:_arr,
            searchStatus:this.state.arr.length > 3 ? false :true
        })
    }

    gobake(){
        this.props.history.goBack();
    }

    render() {
        const navbar = {
            mode: "dark",
            title: "24小时热文",
            ltype: "left",
        }
        return (
            <div className="sear-page">
                <NavBar
                    mode='dark'
                    rightContent={[]}>
                    <div className="search-box">
                        {this.state.value ? (<Icon type="left"  onClick={() => this.gobake()}/>) : ""}
                        <div className="search-con">
                            <SearchBar ref={ref => this.manualFocusInst = ref} onChange={(e) => this.changeVal(e)} value={this.state.value} placeholder="请输入搜索关键字" onSubmit={(e) => this.onSubmit(e)}></SearchBar>
                        </div>
                    </div>
                </NavBar>
                <div className="herder-content">
                    <div className="h-line-5"></div>
                    <ul className="sear-his">
                       {
                           this.state.arr.map((item,index) => {
                              if(index < this.state.seeCount){
                                return ( <li key={index}><div className="con"><div><span className="iconfont icon-biaoxing "></span><span>{item}</span></div><span onClick={() => this.delHis(index)} className="iconfont icon-shanchu del-icon "></span></div></li>)
                              }
                           })
                       }
                        {
                            this.getBtn()
                        }
                    </ul>
                    <div className="h-line-5"></div>
                </div>
            </div>
        );
    }
}

searArticle.propTypes = {

};

export default searArticle;