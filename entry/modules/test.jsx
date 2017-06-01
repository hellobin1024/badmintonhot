import React from 'react';
import {render} from 'react-dom';
var ProxyQ=require('../../components/proxy/ProxyQ.js');
var SyncStore = require('../../components/flux/stores/SyncStore');
var MyTabs = require('../../components/bootstrap_tab/react-bootstrap-tabs');
var test=require('../../data/test.json');

var StudentStatusInfo =React.createClass({

    personInfo:function () {
        var headers={
            "Authorization":"Bearer "+SyncStore.getToken(),
        }
       var url="/gradms/user"
        var data={
            request:"getPersonInfo"
        }
        ProxyQ.querymy(
            url,
            null,
            null,
            data,
            headers,
            function(ob) {
                this.setState({data:ob.data});
            }.bind(this),

        )
    },
    getInitialState:function(){
        this.personInfo();
        return({
            data:null
        });
    },
    initialData:function(){
        this.personInfo();
    },

    render:function () {
        var contains=null;
        if(this.state.data!==null&&this.state.data!==undefined){
            var data=this.state.data.data;
            contains=
                <div >
                    <MyTabs data={test}>
                    </MyTabs>
                </div>;


        }else{
            this.initialData();
        }
            return contains;

        }


})
module.exports=StudentStatusInfo;