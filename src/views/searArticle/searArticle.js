import React, { Component } from 'react';
import Navbar from '../../conponents/navbar/navBar';

class searArticle extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

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
            </div>
        );
    }
}

searArticle.propTypes = {

};

export default searArticle;