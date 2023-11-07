import { combineReducers } from 'redux';
import auth from './auth/authReducer'
import course from './course/courseReducer'

export default combineReducers({
    auth, course
})