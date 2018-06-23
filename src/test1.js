import React, { Component } from 'react';
import { Button } from 'element-react';
import 'element-theme-default';
import './App.css';
import Test from './test';

class App extends Component {
  constructor() {
    super();
    this.state = {
      List: [{ val: "123132" }],
      value: ""
    }
    // this.addList = this.addList,bind(this);
  }
  addList() {
    let _list = this.state.List;
    _list.push({ val: this.state.value })
    this.setState({
      List: _list,
      value: ""
    });
  }
  changeValue(e) {
    this.setState({
      value: e.target.value
    })
  }

  delList(index) {
    let arr = this.state.List;
    arr.splice(index, 1);
    this.setState({
      List: arr
    })
  }


  render() {
    return (
      <div className="App">
        <div>
          <div>
            <input type="text" value={this.state.value} onChange={this.changeValue.bind(this)} />  <button onClick={this.addList.bind(this)}>添加</button>
          </div>
          <Test name="大波波" sex="男" List={this.state.List} delList={this.delList.bind(this)}></Test>
          <Button type={this.state.value ? 'primary' : 'text'} loading={true} >Hello</Button>
        </div>
      </div>
    );
  }
}

export default App;
