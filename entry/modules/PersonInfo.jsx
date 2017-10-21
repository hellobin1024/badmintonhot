/**
 * Created by dellbin on 2017/6/15.
 */
import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import Header from './components/Heard.jsx';
import SelfBaseInfo from '../modules/SelfBaseInfo.jsx';
import ModifyPassword from '../modules/ModifyPassword.jsx';
import AccountBind from '../modules/AccountBind.jsx';
import MyGroup from '../modules/MyGroup.jsx';
import MyEvents from '../modules/MyEvents.jsx';
import MyCompetition from '../modules/MyCompetition.jsx';
import MyHistoryCompetition from '../modules/MyHistoryCompetition.jsx';
import MyClass from '../modules/MyClass';
import CreateGroup from '../modules/CreateGroup.jsx';
import CreateEvent from '../modules/CreateEvent.jsx';
import CreateCLass from '../modules/CreateCLass.jsx';
import showCompetitionGames from './ShowCompetitionGames.jsx';
import DemandClass from './DemandClass.jsx';
import HistoryEvents from '../modules/HistoryEvents.jsx';
import MyNotices from '../modules/MyNotices.jsx';
import TodayIncome from '../modules/TodayIncome.jsx';
import HistoryIncome from '../modules/HistoryIncome.jsx';
import { connect } from 'react-redux';
import '../../css/entry/modules/personCenter.css';
var ProxyQ = require('../../components/proxy/ProxyQ')

var PersonInfo = React.createClass({

    tabChange:function(tab){
        this.setState({current:tab});
    },

    getInitialState: function () {
        var route = new Array();
        route.push(undefined);

        var a="1";
        var loginName= this.props.loginName;
        var personId=this.props.personId;

        return({router:route, userName:loginName, personId:personId,current:'manageMyClass'})
    },

    render:function(){
        var path=this.props.route.path;

        var personId=this.state.personId;
        let mainContent=null;
        switch (this.state.current) {
            case 'baseInfo':
                mainContent =(
                    <SelfBaseInfo />
                );
                break;
            case 'modifyPwd':
                mainContent =(
                    <ModifyPassword personId={personId}/>
                );
                break;
            case 'accountBind':
                mainContent =(
                    <AccountBind personId={personId}/>
                );
                break;
            case 'manageMyGroup':
                mainContent =(
                    <MyGroup personId={personId}/>
                );
                break;

            case 'createEvent':
                mainContent =(
                    <CreateEvent personId={personId}/>
                );
                break;
            case 'createGroup':
                mainContent =(
                    <CreateGroup personId={personId}/>
                );
                break;
            case 'manageMyEvents':
                mainContent =(
                    <MyEvents personId={personId}/>
                );
                break;
            case 'manageMyClass':
                mainContent =(
                    <MyClass personId={personId}/>
                );
                break;
            case 'createClass':
                mainContent =(
                    <CreateCLass personId={personId}/>
                );
                break;
            case 'demandClass':
                mainContent =(
                    <DemandClass personId={personId}/>
                );
                break;
            case 'myCompetition':
                mainContent =(
                    <MyCompetition personId={personId}/>
                );
                break;
            case 'myHistoryCompetition':
                mainContent =(
                    <MyHistoryCompetition personId={personId}/>
                );
                break;
            case 'historyEvents':
                mainContent =(
                    <HistoryEvents personId={personId} />
                );
                break;
            case 'myNotices':
                mainContent =(
                    <MyNotices personId={personId} />
                );
                break;
            case 'todayIncome':
                mainContent =(
                    <TodayIncome personId={personId} />
                );
                break;
            case 'historyIncome':
                mainContent =(
                    <HistoryIncome personId={personId} />
                );
                break;


        }

       if(personId==4||personId==3)
        return(
            <div>
                <Header path={path}/>

                <div id="pjax-container" className="person-container clearfix">
                    <div id="aside" className="l" style={{height:'800px',border: '1px solid #1C6'}}>
                        <dl className="st-dl">
                            <dt><i className="icon-user-md"></i>我的收益</dt>
                            <dd className="my-group">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'todayIncome')}>今日收益</a></div>
                            </dd>
                            <dd className="my-group">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'historyIncome')}>历史记录</a></div>
                            </dd>
                            <dt><i className="icon-calendar" ></i>通知消息</dt>
                            <dd className="my-group">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'myNotices')}>我的消息</a></div>
                            </dd>
                            <dt><i className="icon-user-md"></i>群圈</dt>
                            <dd className="my-group">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'manageMyGroup')}>管理群圈</a></div>
                            </dd>
                            <dd className="my-group">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'createGroup')}>创建群圈</a></div>
                            </dd>
                            <dt><i className="icon-calendar"></i>活动</dt>
                            <dd className="my-activity">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'manageMyEvents')}>管理活动</a></div>
                            </dd>
                            <dd className="my-activity">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'createEvent')}>创建活动</a></div>
                            </dd>
                            <dd className="my-activity">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'historyEvents')}>历史记录</a></div>
                            </dd>
                            <dt><i className="icon-user-md"></i>课程</dt>
                            <dd className="my-group">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'manageMyClass')}>我的课程</a></div>
                            </dd>
                            <dd className="my-group">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'createClass')}>课程定制</a></div>
                            </dd>
                            <dd className="my-group">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'demandClass')}>我的定制</a></div>
                            </dd>
                            <dt><i className="icon-calendar"></i>赛事</dt>
                            <dd className="my-activity">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'myCompetition')}>我的比赛</a></div>
                            </dd>
                            <dd className="my-activity">
                                <div><a data-pjax="true" onClick={this.tabChange.bind(this,'myHistoryCompetition')}>历史记录</a></div>
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
                        <div  id="balance">
                            {mainContent}

                        </div>
                    </div>
                </div>
            </div>

        );
        else
           return(
               <div>
                   <Header path={path}/>

                   <div id="pjax-container" className="person-container clearfix">
                       <div id="aside" className="l" style={{height:'800px',border: '1px solid #1C6'}}>
                           <dl className="st-dl">
                               <dt><i className="icon-calendar" ></i>通知消息</dt>
                               <dd className="my-group">
                                   <div><a data-pjax="true" onClick={this.tabChange.bind(this,'myNotices')}>我的消息</a></div>
                               </dd>
                               <dt><i className="icon-user-md"></i>群圈</dt>
                               <dd className="my-group">
                                   <div><a data-pjax="true" onClick={this.tabChange.bind(this,'manageMyGroup')}>管理群圈</a></div>
                               </dd>
                               <dd className="my-group">
                                   <div><a data-pjax="true" onClick={this.tabChange.bind(this,'createGroup')}>创建群圈</a></div>
                               </dd>
                               <dt><i className="icon-calendar"></i>活动</dt>
                               <dd className="my-activity">
                                   <div><a data-pjax="true" onClick={this.tabChange.bind(this,'manageMyEvents')}>管理活动</a></div>
                               </dd>
                               <dd className="my-activity">
                                   <div><a data-pjax="true" onClick={this.tabChange.bind(this,'createEvent')}>创建活动</a></div>
                               </dd>
                               <dd className="my-activity">
                                   <div><a data-pjax="true" onClick={this.tabChange.bind(this,'historyEvents')}>历史记录</a></div>
                               </dd>
                               <dt><i className="icon-user-md"></i>课程</dt>
                               <dd className="my-group">
                                   <div><a data-pjax="true" onClick={this.tabChange.bind(this,'manageMyClass')}>我的课程</a></div>
                               </dd>
                               <dd className="my-group">
                                   <div><a data-pjax="true" onClick={this.tabChange.bind(this,'createClass')}>课程定制</a></div>
                               </dd>
                               <dd className="my-group">
                                   <div><a data-pjax="true" onClick={this.tabChange.bind(this,'demandClass')}>我的定制</a></div>
                               </dd>
                               <dt><i className="icon-calendar"></i>赛事</dt>
                               <dd className="my-activity">
                                   <div><a data-pjax="true" onClick={this.tabChange.bind(this,'myCompetition')}>我的比赛</a></div>
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
                           <div  id="balance">
                               {mainContent}

                           </div>
                       </div>
                   </div>
               </div>

           );
    },
});

const mapStateToProps = (state, ownProps) => {
    const props = {
        token: state.userInfo.accessToken,
        loginName: state.userInfo.loginName,
        personId: state.userInfo.personId
    }
    return props
}
export default connect(mapStateToProps)(PersonInfo);