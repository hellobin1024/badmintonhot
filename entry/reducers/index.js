import { routeReducer, } from 'react-router-redux'
import { combineReducers } from 'redux';


import userInfoReducer from './userInfoReducer';


var rootReducer=combineReducers({
    userInfo:userInfoReducer,
    routing: routeReducer,
});

module.exports=rootReducer;