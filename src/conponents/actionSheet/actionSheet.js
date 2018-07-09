import React, { Component } from 'react';
import { ActionSheet } from 'antd-mobile';
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class actionSheet extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    showActionSheet = () => {
        const BUTTONS = ['Operation1', 'Operation2', 'Operation2', 'Delete', 'Cancel'];
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          destructiveButtonIndex: BUTTONS.length - 2,
          // title: 'title',
          message: 'I am description, description, description',
          maskClosable: true,
          'data-seed': 'logId',
          wrapProps,
        },
        (buttonIndex) => {
            console.log(buttonIndex)
          this.setState({ clicked: BUTTONS[buttonIndex] });
        });
      }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

actionSheet.propTypes = {

};

export default actionSheet;