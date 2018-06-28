import { combineReducers } from 'redux'
import * as type from './actionType'
const state = {
	loginStatus:false,
	loginInfo:"",
	channel:[]
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
				state.channel = action.params;
			return state.channel;
		default:
			return state.channel;
	}
}

const reducer = combineReducers({
	skin,
	getloginStatus,
	getChannel
});
export default reducer;