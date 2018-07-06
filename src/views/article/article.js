import React, { Component } from 'react';
import './news.css';
import Navbar from '../../conponents/navbar/navBar';
import { Toast} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import connect from '../../store/connnect'
@connect
@withRouter
class article extends Component {
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
            </div>
        );
    }
}

article.propTypes = {

};

export default article;