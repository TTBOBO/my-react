import { combineReducers } from 'redux'


//设置皮肤
function skin(skin = 0, action) {
	switch (action.type) {
		case 'loginIn':
            return 1;
        case 'loginOut':
			return 0;
		default:
			return "";
	}
}

const reducer = combineReducers({
    skin
});
export default reducer;