import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as action from './actions'
 
export default connect(
 state=>state,
 dispatch=>bindActionCreators(action,dispatch)
)