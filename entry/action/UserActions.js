/**
 * Created by dingyiming on 2017/2/15.
 */
var Proxy = require('../../components/proxy/ProxyQ');

import {
    // UPDATE_CAR_HISTORY_ORDERS,
    // UPDATE_APPLIED_CAR_ORDERS,
    // DISABLE_CARORDERS_ONFRESH
    ACCESS_TOKEN_ACK
} from '../constants/UserConstants';

export let loginAction=function(){

    return dispatch=> {

        return new Promise((resolve, reject) => {

            var accessToken=null;
            Proxy.query({
                url: "/login",
                data: {
                    username: '201613508',
                    password: 'qindong33491486'
                },
            }).then((json)=> {
                accessToken = json.access_token;
                //菜单
                // return Proxy.postes({
                //     url: Config.server + '/svr/request',
                //     headers: {
                //         'Authorization': "Bearer " + accessToken,
                //         'Content-Type': 'application/json'
                //     },
                //     body: {
                //         request: 'getPersonInfoByPersonId'
                //     }
                // });
            }).then((json)=>{


                //
                dispatch(getAccessToken(accessToken));
//dispatch(保存菜单)

            }).catch((err)=> {

            });
        });
    }

}
let getAccessToken= (accessToken)=>{

        return {
            type: ACCESS_TOKEN_ACK,
            accessToken: accessToken,
            auth:true,
            validate:true
        };

}