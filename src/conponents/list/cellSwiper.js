import React, { Component } from 'react';
import './list.css'
class cellSwiper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toolWidth:0,
            defauleOption:{
                transform:"translate3d(0, 0px, 0px)",
                transformtool:"translate3d(100%, 0px, 0px)",
            },
            arr:[{
                transform:"translate3d(0, 0px, 0px)",
                transformtool:"translate3d(100%, 0px, 0px)%",
            },{
                transform:"translate3d(0, 0px, 0px)",
                transformtool:"translate3d(100%, 0px, 0px)%",
            }]
        }
    }


    componentDidMount() {

    }


    //触摸开始
    /**
     * 
     * @param {*} e  event
     * @param {*} item  当前触摸的item数据
     * @param {*} index 当前触摸的item  下标
     */
    touchStart(e,item,index){
        //储存触摸开始的坐标
        this.firstX = e.touches[0].pageX;
        // this.setState({
        //     toolWidth:e.target.parentNode.nextSibling.clientWidth
        // })
    }
    //触摸结束
    /**
     * 
     * @param {*} e  event
     * @param {*} item  当前触摸的item数据
     * @param {*} index 当前触摸的item  下标
     */
    touchEnd(e,item,index){
        var count = this.state.arr.filter((item) => {
            return item.isOpen
        })
        //当列表展开数量为0时  执行点击事件 
        //相反 执行触摸逻辑
        
        if(count.length == 0){
            console.log(1)
        }else{
            /**
            *当前展开一个item时， 点击当前直接关闭 右滑无效不关闭当前item   
                [点击,右滑,左滑]其他item时关闭当前item  无其他操作事件
             */
            this.setOtherClose(index)
            
        }
    }

    //触摸移动中
    /**
     * 
     * @param {*} e  event
     * @param {*} item  当前触摸的item数据
     * @param {*} index 当前触摸的item  下标
     */
    touchMove(e,item,index){
        if(!this.setAlldefault(index)){
            return false;
        }
        let _curPageX = e.touches[0].pageX;
        this._curPageX = _curPageX;
        //左滑
        if((this.firstX - _curPageX) > 0){
            if(item.isOpen){  //若当前已展开move 停止
                return;
            }
            // if((this.firstX - _curPageX)  && !item.isOpen){
            // 没有展开时执行模块移动效果
            if((this.firstX - _curPageX) > this.props.threshold*50 && !item.isOpen){
                this.setState({
                    arr:this.getopen(index,_curPageX)
                })
                return false;
            }
        }else{
        //右滑  关闭所有展开的item 类同初始化
            let _arr = [];
            _arr = this.state.arr.map((item) => {
                item = this.state.defauleOption;
                item.isOpen = false;
                return item;
            })
            this.setState({
                arr:_arr
            })
        }
    }

    /**
     * 
     * @param {*} _index   当前移动的item 下标
     * @param {*} _curPageX 当前触摸的坐标
     */
    getopen(_index,_curPageX){
        let _arr = [];
        let itemObj = {
            transform:`translate3d(-${this.firstX - _curPageX > this.props.threshold*50 ? this.props.threshold*50 : this.firstX - _curPageX}px, 0px, 0px)`,
            transformtool:`translate3d(-${this.firstX - _curPageX > this.props.threshold*50 ? 0 : this.firstX - _curPageX}px, 0px, 0px)`
        };
        this.state.arr.forEach((item,index) => {
            if(_index == index ){
                item = itemObj
                if(this.firstX - _curPageX > this.props.threshold*50 ){
                    item.isOpen = true;
                }
            }
            _arr.push(item);
        })
        return _arr;
    }

    /**
     * 
     * @param {*} touchIndex 当前触摸结束的item 下标
     */
    setOtherClose(touchIndex){
        let _arr = [];
        /**
         * 当有展开的item时   触摸任何一个item 都会关闭展开的 
         * 反之初始化默认
         */
        this.state.arr.forEach((item,index) => {
            if(item.isOpen){  
                if(touchIndex == index && this._curPageX){
                    this._curPageX = "";
                }else if(!this._curPageX){  
                    item = this.state.defauleOption;
                }
            }else{
                item = this.state.defauleOption;
            }
            _arr.push(item);
        })
        this.setState({
            arr:_arr
        })
    }
    /**
     * 
     * @param {*} touchIndex 当前触摸结束的item 下标
     */
    setAlldefault(touchIndex){
        let count = 0;
        this.state.arr.forEach((item,index) => {
            if(item.isOpen == true && touchIndex != index){
                count++;
            }
        })
        //返回 有展开的item  并且不是当前触摸的   否知 触摸move当前  会关闭item展开
        return count > 0 ? false : true;
    }

    handClickbtn(item,index){
        if(this.props.handler){
            this.props.handler(item,index)
        }
    }

    render() {
        return (
            <div>
                <ul className="list-ul-content">
                    {this.state.arr.map((item,index) =>{
                        return ( <li key={index} className="list-ul-item" >
                            <div className="list-con" style={{transform:item.transform}} onTouchStart={(e) => {this.touchStart(e,item,index)}} onTouchEnd={(e) => {this.touchEnd(e,item,index)}}  onTouchMove={(e) => {this.touchMove(e,item,index)}}>
                                <div className="list-con-box">12313</div>
                            </div>
                            <div className="slider-right" style={{transform:item.transformtool}}>
                                {
                                    this.props.btnArr.map((item,index) => {
                                        return (<a className={item.className || 'del'} onClick={()=> this.handClickbtn(item,index)} key={index}>{item.name}</a>)
                                    })
                                }
                            </div>
                        </li>)
                    })}
                   
                </ul>
            </div>
        );
    }
}

cellSwiper.defaultProps = {
    threshold:1.5,
    btnArr:[{
        name:"删除",
        className:"del"
    }]
}

export default cellSwiper;