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

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    

    render() {
        const navbar = {
            mode:"dark",
            title:"文章详情",
            ltype:""
        }
        return (
            <div>
                <Navbar option={navbar}></Navbar>
            </div>
        );
    }
}

video.propTypes = {

};

export default video;