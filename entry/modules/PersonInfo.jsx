/**
 * Created by dellbin on 2017/6/15.
 */
import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import Header from '../modules/Heard.jsx';
import SelfBaseInfo from '../modules/SelfBaseInfo.jsx';
import ModifyPassword from '../modules/ModifyPassword.jsx';
import AccountBind from '../modules/AccountBind.jsx';
import '../../css/entry/modules/personCenter.css';
var ProxyQ = require('../../components/proxy/ProxyQ')

var PersonCenter = React.createClass({

    tabChange:function(tab){
        this.setState({current:tab});
    },

    getInitialState: function () {
        var route = new Array();
        route.push(undefined);
        return ({route: route});
    },

    render:function(){
        var path=this.props.route.path;

        let mainContent=null;
        switch (this.state.current) {
            case 'baseInfo':
                mainContent =(
                    <SelfBaseInfo />
                );
                break;
            case 'modifyPwd':
                mainContent =(
                    <ModifyPassword />
                );
                break;
            case 'accountBind':
                mainContent =(
                    <AccountBind />
                );
                break;
        }

        return(
            <div>
                <Header path={path}/>

                <div id="pjax-container" className="person-container clearfix">
                    <div id="aside" className="l" style={{height:'800px',border: '1px solid #1C6'}}>
                        <dl className="st">
                            <dt><i className="icon-user-md"></i>群圈</dt>
                            <dd className="my-group">
                                <div><a data-pjax="true" >我的群圈</a></div>
                            </dd>
                            <dt><i className="icon-calendar"></i>活动</dt>
                            <dd className="my-activity">
                                <div><a data-pjax="true" >我的活动</a></div>
                            </dd>
                            <dt><i className="icon-cog"></i>账号设置</dt>
                            <dd className="base-info">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'baseInfo')}>个人资料</a></div>
                            </dd>
                            <dd className="count-bind">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'accountBind')}>账号绑定</a></div>
                            </dd>
                            <dd className="modify-pwd">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'modifyPwd')}>修改密码</a></div>
                            </dd>
                        </dl>
                    </div>


                    <div id="content" className="r" data-tag="wallet-balance" data-title="" style={{height: '800px'}}>
                        <div className="wrap" id="balance">

                            {mainContent}

                        </div>
                    </div>
                </div>
            </div>

        );
    },
});

module.exports=PersonCenter;
