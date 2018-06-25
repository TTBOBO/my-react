import React, { Component } from 'react';
import BScroll from 'better-scroll'

class Scroll extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){
        console.log(this.$refs)
    }

    render() {
        return (
            <div >
                <div ref="name">
                123123131231233
                </div>
                   
            </div>
        );
    }
}


export default Scroll;