import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router'
var ProxyQ=require('../../components/proxy/ProxyQ.js');
var SyncStore = require('../../components/flux/stores/SyncStore');
/**
 *
 * function fetch in Brief.jsx shoud fetch the data from the rule in background
 *
 */


var Brief=React.createClass({
    fetch:function(){
        // ProxyQ.queryHandle(
        //     null,
        //     "/bsuims/reactPageDataRequest.do",
        //     {
        //         reactActionName:'',
        //         reactPageName:''
        //     },
        //     null,
        //     function(response){
        //         var ob=new Object();
        //         if(response.arr!==null&&response.arr!==undefined)
        //         {
        //             ob.data=response.arr;
        //         }
        //         ob.data.push(constant);
        //         this.setState(ob);
        //     }.bind(this)
        // );
    },
    getInitialState:function(){
        var data=null;
        var data$initialed=false;
        if(this.props.data!==undefined&&this.props.data!==null)
        {
            data = this.props.data;
            data$initialed=true;
        }
        else
            data$initialed=false;

        return ({data: data});
    },

    test:function () {
        ProxyQ.query({
            headers:{
                "Authorization":"Bearer "+SyncStore.getToken(),
            },
            url:"/node/menue",
            data:{
                request:"getTopMenue"
            },

        }).then(function(json){

            var a=json;
            alert(a);
        }).catch(function(e){
            alert(e);
        })


        //ProxyQ.query({
        //    headers:{
        //        "Authorization":"Bearer "+SyncStore.getToken(),
        //    },
        //    url:"/node/test",
        //    data:{
        //        request:"test"
        //    },
        //
        //}).then(function(json){
        //
        //    var a=json;
        //    alert(a);
        //}).catch(function(e){
        //    alert(e);
        //})
    },
    personInfo:function () {
        ProxyQ.query({
            headers:{
                "Authorization":"Bearer "+SyncStore.getToken(),
            },
            url:"/gradms/user",
            data:{
                request:"getPersonInfo"
            },

        }).then(function(json){

            var a=json;
            alert(a);
        }).catch(function(e){
            alert(e);
        })
    },

    login:function(){
        if(SyncStore.getToken()==null||SyncStore.getToken()==undefined||SyncStore.getToken().length==0){
            ProxyQ.query({
                url: "/login",
                data: {
                    username: '201613508',
                    password: 'qindong33491486'
                },

            }).then(function (json) {

                var a = json;
                SyncStore.setToken(a.access_token);
                alert("登陆成功！拿到的token：" + a.access_token);

            }).catch(function (e) {
                alert(e);
            })
        }

    },
    render:function(){
        let data=null;
        if(this.state.data!==undefined&&this.state.data!==null)
        {
            let lis=new Array();
            if(Object.prototype.toString.call(this.state.data)=='[object Array]')
            {
                this.state.data.map(function(item,i) {
                    lis.push(<li key={i}>{item}</li>);
                });
            }
            if(lis.length>0)
            data=<ul>
                {lis}
                </ul>;
            return (
                <div className="briefInformation" >
                    {data}
                    <button onClick={this.login}>ok</button>
                    <button onClick={this.test}>test</button>
                    <button onClick={this.personInfo}>test2</button>
                    <Link to={window.App.getAppRoute() + "/test"}>
                        <button>turn</button>
                    </Link>
                </div>
            )
        }else{
            if(this.state.auto==true)
            {
                this.fetch();
                return <div className="briefInformation"></div>;
            }
        }
    }
});
module.exports=Brief;