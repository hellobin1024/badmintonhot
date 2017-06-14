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
            var params = {
                        'loginName' :'root',
                        'password' : 1
                    };
            Proxy.queryHandle({
                type:'POST',
                url:'/func/auth/webLogin',
                params:JSON.stringify(params),
                dataType:null
            }).then((json)=> {
                reCode = json.reCode;
                //菜单
                // return Proxy.queryHandle({
                //         type:'POST',
                //         url:'',
                //         params:JSON.stringify(params),
                //         dataType:null
                // }).then((json)=>{
                //     topMenue=json
                // })
            }).then((json)=>{

                dispatch(getReCode(reCode));
                // dispatch(getTopMenue(topMenue));

            }).catch((err)=> {

            });
        });
    }

}
let getReCode= (reCode)=>{

        return {
            type: ACCESS_TOKEN_ACK,
            reCode: reCode,
            auth:true,
            validate:true
        };
}
