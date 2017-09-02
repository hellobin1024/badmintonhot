/**
 * Created by dingyiming on 2017/2/15.
 */
var Proxy = require('../../components/proxy/ProxyQ');

import { browserHistory ,hashHistory} from 'react-router';


import {
    STORE_INFO,

} from '../constants/PageConstants';


export let storeAction=function(id){

    return dispatch=> {

        return new Promise((resolve, reject) => {

            dispatch(getPageInfo(id));


        });
    }
}




let getPageInfo= (id)=>{

    return {
        type: STORE_INFO,
        competitionId:id
    };
}

