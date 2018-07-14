import React, { Component } from 'react';
import Navbar from '../../conponents/navbar/navBar';
import ArticleList from '../../conponents/article/ArticleList';


class searResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height:0,
            dataList:[],
            pageObj:{
                page:1,
                limit:10
           },
           header:true
        }
    }

    componentWillMount() {
        const { match: { params: { keycode } } } = this.props;
        this.params = keycode;
    }

    componentDidMount() {
        this.initList();
    }

    initList(){
        let data = Object.assign({},{keywords:this.params },this.state.pageObj)
        React.ajaxPost('search', data).then(res => {
            this.setState({
                dataList:res.data.data,
                pageObj:Object.assign({},this.state.pageObj,{page:res.data.current_page})
            })
            console.log(this.state.dataList)
        })
    }

    handClickItem(res){
        console.log(res)
    }

    render() {
        const navbar = {
            mode:"dark",
            title:"搜索结果",
            ltype:"left"
        }
        return (
            <div style={{height:"100%"}}>
                <Navbar option={navbar}></Navbar>
                <div className=" herder-content">
                <ArticleList handClickItem={(res) => this.handClickItem(res)} header={this.state.header}   dataList={this.state.dataList}></ArticleList>
                </div>
            </div>
        );
    }
}



export default searResult;