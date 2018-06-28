import { combineReducers } from 'redux'
import * as type from './actionType'
const state = {
	loginStatus:false,
	loginInfo:"",
	channel:[],
	pageList:[]
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
			return false;
	}
}


function getChannel(channel = state.channel,action){
	switch (action.type) {
		case type.GETCHANNEL:
				// dispatch()
				state.channel = action.params;
			return state.channel;
		default:
			return channel;
	}
}


function setPage(page = state.pageList,action){
	switch (action.type) {
		case type.SETPAGELIST:
			console.log(this)
			state.channel = action.params;
			return state.channel;
		case type.ADDPAGE:
			state.channel = action.params;
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
	setPage
});
export default reducer;