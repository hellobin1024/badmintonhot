/**
 * Created by dellbin on 2017/6/15.
 */
import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import Header from '../modules/heard.jsx';
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
            case 'carOrder':
                mainContent =(
                    <CarOrder />
                );
                break;
            case 'lifeOrder':
                mainContent =(
                    <LifeOrder />
                );
                break;
            case 'serviceOrder':
                mainContent =(
                    <ServiceOrder />
                );
                break;
            case 'score':
                mainContent =(
                    <OrderCenterScore />
                );
                break;
            case 'baseInfo':
                mainContent =(
                    <SelfBaseInfo />
                );
                break;
            case 'relatedInfo':
                mainContent =(
                    <RelatedPersonInfo />
                );
                break;
            case 'carInfo':
                mainContent =(
                    <RelatedCarInfo />
                );
                break;
        }

        return(
            <div>
                <Header path={path}/>

                <div id="pjax-container" className="container clearfix">
                    <div id="aside" className="l" style={{height:'900px'}}>
                        <dl className="st">
                            <dt><i className="icon-credit-card"></i>我的钱包</dt>
                            <dd className="current">
                                <div><a>我的余额(<i style={{fontFamily:'Arial',fontStyle:'normal'}}>￥：0.00</i>)</a></div>
                            </dd>
                            <dd className="">
                                <div><a>交易记录</a></div>
                            </dd>

                            <dt><i className="icon-user-md"></i>我的群组</dt>
                            <dd className="">
                                <div><a data-pjax="true" >我加入的俱乐部</a></div>
                            </dd>
                            <dd className="">
                                <div><a data-pjax="true" >我管理的俱乐部</a></div>
                            </dd>

                            <dt><i className="icon-calendar"></i>我的活动</dt>
                            <dd className="">
                                <div><a data-pjax="true" >尚未开始活动</a></div>
                            </dd>
                            <dd className="">
                                <div><a data-pjax="true" >报名为候补</a></div>
                            </dd>
                            <dd className="">
                                <div><a data-pjax="true" >已结束活动</a></div>
                            </dd>

                            <dt><i className="icon-cog"></i>账号设置</dt>
                            <dd className=""><div><a data-pjax="true" onClick={this.tabChange.bind(this,'baseInfo')}>个人资料</a></div></dd>
                            <dd className=""><div><a data-pjax="true" >修改头像</a></div></dd>
                            <dd className=""><div><a data-pjax="true" >账号绑定</a></div></dd>
                            <dd className=""><div><a data-pjax="true" >修改密码</a></div></dd>

                            <dt className=""><i className="iconfont2"></i><a data-pjax="true" href="?rm=SSO&amp;rc=Vip">会员中心</a></dt>

                            <dt className=""><i className="iconfont"></i><a data-pjax="true" href="?rm=SSO&amp;rc=Personal&amp;ra=GetHistory">最近浏览</a></dt>

                            <dt className=""><i className="iconfont"></i><a data-pjax="true" href="?rm=SSO&amp;rc=Personal&amp;ra=GetCollect">我的收藏</a></dt>

                            <dt className=""><i className="iconfont"></i><a data-pjax="true" href="?rm=SSO&amp;rc=Personal&amp;ra=MessageIndex">系统消息</a></dt>
                        </dl>
                    </div>

                    <div id="content" className="r" data-tag="wallet-balance" data-title="我的余额 - 个人中心 - 体育社" style={{height: '900px'}}>
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
