/**
 * @by QD
 * 作为工作区tab页组件
 * 传入的数据data以test.json为模板
 */
import React from 'react';
import {render} from 'react-dom';
import { Tabs,Tab} from 'react-bootstrap';
var SyncStore = require('../../components/flux/stores/SyncStore');

var MyTabs=React.createClass({

    getInitialState:function(){
        var data=null;

        if(this.props.data!==undefined&&this.props.data!==null
        )
        {
            data = this.props.data;

        }

        return ({
            data: data,

        });
    },
    render:function() {
        var contains=null;
        if (this.state.data !== undefined && this.state.data !== null) {
            var oneTab = new Array();
            var ref=this;
            this.state.data.map(function (first, i) {

                oneTab.push(
                    <Tab eventKey={i} key={i} title={first.label}>
                        <iframe style={{width:"100%",position:"relative",height:'1032px'}} id={"mainFrame"+i}
                                frameBorder="0" scrolling="no" src={first.pageRoute+"?token="+SyncStore.getToken()}
                        />

                    </Tab>
                )

            });


            contains=
                <div>
                    <Tabs id="controlled-tab-example" >
                        {oneTab}
                    </Tabs>
                </div>

        } else{
            contains=
                <div>
                    <h2>请求失败！</h2>
                </div>
        }
        return contains;

    },

})
module.exports = MyTabs;