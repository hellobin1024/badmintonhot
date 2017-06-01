/**
 * Created by dingyiming on 2017/2/15.
 */
var Proxy = require('../../components/proxy/ProxyQ');

import {
    // UPDATE_CAR_HISTORY_ORDERS,
    // UPDATE_APPLIED_CAR_ORDERS,
    // DISABLE_CARORDERS_ONFRESH
    ACCESS_TOKEN_ACK,
    GRT_TOPMENUE
} from '../constants/UserConstants';

export let loginAction=function(){

    return dispatch=> {

        return new Promise((resolve, reject) => {

            var accessToken=null;
            var topMenue=null;
            Proxy.query({
                url: "/login",
                data: {
                    username: '201613508',
                    password: 'qindong33491486'
                },
            }).then((json)=> {
                accessToken = json.access_token;
                //菜单
                return Proxy.query({
                    headers:{
                        "Authorization":"Bearer "+accessToken,
                    },
                    url:"/node/menue",
                    data:{
                        request:"getTopMenue"
                    },

                }).then((json)=>{
                    topMenue=json
                })
            }).then((json)=>{

                dispatch(getAccessToken(accessToken));
                dispatch(getTopMenue(topMenue));

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
let getTopMenue=(topMenue)=>{

    return {
        type: GRT_TOPMENUE,
        topMenue:topMenue
    };
}