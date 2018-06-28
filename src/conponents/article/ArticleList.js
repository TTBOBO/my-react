import React, { Component } from 'react';
import Scroll from '../Scroll/Scroll'
import '../Scroll/scroll.css';
// import { NavBar, Icon } from 'antd-mobile';
class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        }
    }

    componentDidMount() {
        // console.log(this.refs.scroll)
        // this.initList();
    }

    initList(num) {
        let _arr = JSON.parse(JSON.stringify(this.state.arr));
        for (var i = 0; i < 12; i++) {
            _arr.push(i);
        }
        setTimeout(() => {
            this.setState({
                arr: _arr
            })
            this.refs.scroll.forceUpdate(true);
        }, 300)
    }

    handClick(index) {
        console.log(index);
    }

    render() {
        const navbar = {
            mode: "dark",
            title: "购物车",
            ltype: "",
            rightContent: []  //<Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={() => this.handClick()} />
        }
        return (
            <div style={{ height: '100%' }}>
                {/* <Navbar option={navbar} goBack={() => { console.log(1) }}></Navbar> */}
                <Scroll ref="scroll" loadMore={(num) => this.initList(num)} pullDownRefresh={false}>
                    <ul>
                        {this.state.arr.map((item, index) => {
                            return (<li className="list-item" onClick={() => this.handClick(index)} key={index}>{this.props.name +','+item}</li>)
                        })}
                    </ul>
                </Scroll>
            </div>
        );
    }
}


export default ArticleList;