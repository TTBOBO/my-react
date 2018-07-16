import React, { Component } from 'react';
import Navbar from '../../conponents/navbar/navBar';
import TimeArticleList from '../../conponents/article/timeArticleList';
class timeArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header:true,
            dataList:[]
        }
    }

    componentWillMount() {
        this.initList();
    }

    componentDidMount() {
        
    }

    initList(){
        let  data = {
            imei:'BA84AB47-3399-4643-903B-71D90422EF04'
        }
        React.ajaxPost('hot_news', data).then(res => {
            let data = res.today.concat(res.yesterday);
            this.setState({
                dataList:data
            })
            console.log(data)
        })
    }

    handClickItem(res){
        console.log(res);
    }

    render() {
        const navbar = {
            mode: "dark",
            title: "24小时热文",
            ltype: "left",
        }
        return (
            <div>
                <Navbar option={navbar}></Navbar>
                <div className=" herder-content">
                    <TimeArticleList handClickItem={(res) => this.handClickItem(res)} header={this.state.header}   dataList={this.state.dataList}></TimeArticleList>
                </div>
            </div>
        );
    }
}


export default timeArticle;