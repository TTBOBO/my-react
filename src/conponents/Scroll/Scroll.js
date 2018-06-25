import React, { Component } from 'react';
import ReactDOM from "react-dom"
import BScroll from 'better-scroll'

class Scroll extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){
        this.scrollView = ReactDOM.findDOMNode(this.refs.scroll);
        console.log(this.scrollView);
        console.log(this.refs)
    }

    render() {
        return (
            <div >
                <div ref="scroll">

                </div>
            </div>
        );
    }
}


export default Scroll;