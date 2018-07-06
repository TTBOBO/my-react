import { combineReducers } from 'redux'
import * as type from './actionType'
import util from '../assets/js/util'
// import { url } from 'inspector';
const state = {
	loginStatus:false,
	loginInfo:"",
	channel:[],
	pageList:[],
	userinfo:{}   //用户信息
}
//设置皮肤
function skin(skin = 0, action) {
	switch (action.type) {
		case 'loginIn':
            return 1;
        case 'loginOut':
			return 0;
		default:
			return "1";
	}
}

function getloginStatus(loginStatus = state.loginStatus,action){
	switch (action.type) {
		case type.LOGIN:
				state.loginInfo = action.params;
				return state.loginInfo;
		default:
			return state.loginInfo;
	}
}


function getChannel(channel = state.channel,action){
	switch (action.type) {
		case type.GETCHANNEL:
				let _channel = action.params;
				_channel.forEach((item,index) => {
					item['page'] = 1;
					item['isNoMore'] = false;
					item['dataList'] = [];
				})
				state.channel = _channel;
			return state.channel;
		default:
			return channel;
	}
}

function getuserinfo(_userinfo = state.userinfo,action){
	switch (action.type) {
		case type.GETLOGININFO:
			let userinfo = util.getLocalStorage('userinfo');
			state.userinfo = userinfo ? JSON.parse(userinfo) : false;
			return state.userinfo;
		default:
			return _userinfo;
	}
}


function setPage(page = state.pageList,action){
	switch (action.type) {
		case type.SETPAGELIST:
			state.channel = action.params;
			return state.channel;
		case type.ADDPAGE:
			state.channel[action.params.type].page = action.params.page;
			if(action.params.isNoMore){
				state.channel[action.params.type].isNoMore = !state.channel[action.params.type].isNoMore;
			}
			if(action.params.down){  //下拉
				state.channel[action.params.type].dataList = action.params.dataList;
			}else{  //上拉
				state.channel[action.params.type].dataList.push(...action.params.dataList);
			}
			return state.channel;
		case type.SETNOMORE:
			state.channel = action.params;
			return state.channel;
		default:
			return page;
	}
	// SETPAGELIST
}

const reducer = combineReducers({
	skin,
	getloginStatus,
	getChannel,
	setPage,
	getuserinfo
});
export default reducer;