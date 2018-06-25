import { combineReducers } from 'redux'
import * as type from './actionType'
const state = {
	loginStatus:false,
	loginInfo:""
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
				console.log(111)
				state.loginInfo = action.params;
				return state.loginInfo;
		default:
			return false;
	}
}

const reducer = combineReducers({
	skin,
	getloginStatus
});
export default reducer;