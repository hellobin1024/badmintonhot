import { routeReducer, } from 'react-router-redux'
import { combineReducers } from 'redux';


import userInfoReducer from './userInfoReducer';
import pageInfoReducer from './pageInfoReducer';


var rootReducer=combineReducers({
    userInfo:userInfoReducer,
    routing: routeReducer,
    pageInfo:pageInfoReducer,
});

module.exports=rootReducer;