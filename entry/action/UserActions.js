/**
 * Created by dingyiming on 2017/2/15.
 */
var Proxy = require('../../components/proxy/ProxyQ');
import { browserHistory } from 'react-router';
import {
    // UPDATE_CAR_HISTORY_ORDERS,
    // UPDATE_APPLIED_CAR_ORDERS,
    // DISABLE_CARORDERS_ONFRESH
    ACCESS_TOKEN_ACK,
    UPDATE_ROUTER

} from '../constants/UserConstants';


export let loginAction=function(name,psw){

    return dispatch=> {

        return new Promise((resolve, reject) => {

            var loginName=name;
            var password=psw;
            var url = "/func/auth/webLogin";
            var param={
                'loginName' :loginName,
                'password' : password
            };
            var ref = this;
            Proxy.query(
                'POST',
                url,
                param,
                null,
                function (res) {
                    var reCode = res.reCode;
                    var loninName = res.loginName;
                    if(reCode==0){
                        dispatch(getReCode(reCode,loninName));
                        const path = "/main";
                        browserHistory.push(path);
                    }else {
                        alert("登录失败！");
                    }

                },
                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }
            );
        });
    }

}
let getReCode= (reCode,loginName)=>{

        return {
            type: ACCESS_TOKEN_ACK,
            accessToken: reCode,
            loginName:loginName,
            auth:true,
            validate:true
        };
}

