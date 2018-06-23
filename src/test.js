import React, { Component } from 'react';

class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:this.props.name,
            sex:this.props.sex,
            List:this.props.List
        }
        this.handName = this.handName.bind(this);
    }

    handName(){
        this.setState({
            name:this.state.name === "60M还是狗蛋" ? '60M是狗蛋' : '60M还是狗蛋' 
        })
    }
    delList(e){
        this.props.delList(e.target.getAttribute('data-key'))
    }

    render() {
        return (
            <div>
                <p onClick={this.handName}>{this.state.name}</p>
                <p>{this.state.sex}</p>
               {
                   this.state.List.map((item,index) => {
                       return  <div  key={index}><span>{item.val}</span>  <button data-key={index} onClick={this.delList.bind(this)}>删除</button> </div>
                   })
               }
            </div>
        );
    }
}


export default test;