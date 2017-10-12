import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import { connect } from 'react-redux';


import RightSlide from './components/RightSilde'
var Proxy = require('../../components/proxy/ProxyQ');

var Event = React.createClass({


    getInitialState: function () {
        var token=this.props.token;
        return ({
            token:token
        });
    },
    initialData:function(){
        if(this.state.event!==null&&this.state.event!==undefined){
            this.getAllGroups();
        }else {
            this.getAllEvents();
        }
        if(this.state.group!==null&&this.state.group!==undefined) {
            this.getAllEvents();
        }else {
            this.getAllGroups();
        }
    },
    dateFormat:function (date) {//object时间转时间格式"yyyy-mm-dd hh:mm:ss"
        return (new Date(date)).toLocaleDateString() + " " + (new Date(date)).toLocaleTimeString();
    },
    showEventsDetail:function (item) {
        var url = "/func/allow/getEventMemberByEventId";
        var param={
            id:item.eventId
        }
        var ref = this;
        Proxy.query(
            'POST',
            url,
            param,
            null,
            function (res) {
                var a = res.data;
                  var member = "";
                   for (var i = 0; i < a.length; i++){
                    member += " " + a[i].loginName
                   }
                  var costType2="";
                  for (var i = 0; i < a.length; i++){
                    costType2= ref.getStandard(a[i].costType);
                    item.costType2=costType2;
                  }
                  item.member = member;
                  ref.setState({modal: item});

                var successModal = ref.refs['successModal'];
                $(successModal).modal('show');
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );

    },
    closeModal:function () {
        var successModal = this.refs['successModal'];
        $(successModal).modal('hide');
    },

    eventSignUp:function (item) {
        var ref=this;
        if(this.state.token!==null&&this.state.token!==undefined){
        var url = "/func/allow/eventSignUp";
        var param={
            id:item
        }
        var ref = this;
        Proxy.query(
            'POST',
            url,
            param,
            null,
            function (res) {

                if(res.re==-1||res.re=="-1"){
                    alert(res.data);
                    //ref.initialData();
                }
                alert(res.data);
                ref.getAllEvents();
                ref.closeModal();
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
        }else{
            alert("您尚未登录！");
        }

    },
    groupSignUp:function (item) {
        if(this.state.token!==null&&this.state.token!==undefined){
            var url = "/func/allow/groupSignUp";
            var param={
                id:item
            }
            var ref = this;
            Proxy.query(
                'POST',
                url,
                param,
                null,
                function (res) {
                    if(res.re==1||res.re=="1"){
                        alert(res.data);
                        ref.initialData();
                    }

                    ref.closeModal();
                },

                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }
            );
        }else{
            alert("您尚未登录！");
        }

    },
    getAllEvents:function () {
        if(this.props.token!=null)
        {
            var url = "/func/allow/getCheckedEvents";//登录了以后

        }else{
            var url = "/func/allow/getEvents";//未登录
        }

        var ref = this;
        Proxy.query(
            'POST',
            url,
            {},
            null,
            function (res) {
                var a = res.data;
                var costType2="";
                for (var i = 0; i < a.length; i++){
                    costType2= ref.getStandard(a[i].costType);
                    a[i].costType2=costType2;
                }
                if(res.re==1) {
                    ref.setState({event: a});
                }else{
                    ref.setState({event: 0});
                }

            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
    },
    getAllGroups:function () {
        var url = "/func/allow/getGroups";
        var ref = this;
        Proxy.query(
            'POST',
            url,
            {},
            null,
            function (res) {
                var a = res.data;
                if(res.re==1) {
                    ref.setState({group: a});
                }else{
                    ref.setState({group: 0});
                }
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
    },
    getStandard:function (costType) {
        var type={};
        if(costType==1){
            type="按每人收费";
        }else if(costType==2){

            type="按每小时收费";
        }else if(costType==3){

            type="总费用";
        }else if(costType==4){

            type="按每人次收费";
        }else if(costType==5){

            type="按每人每小时收费";
        }else {

            type="按场地小时收费";
        }
       return type;
    },
    test:function () {
        var url = "/func/allow/testJp";
        var ref = this;
        var param={
            value:'000',
            label:'qd'
        }
        Proxy.query(
            'POST',
            url,
            param,
            null,
            function (res) {
                var a = res.data;
                if(res.re==1) {
                    alert(a);
                }else{
                    alert('fail');
                }
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
    },
    render:function() {
        var contains = null;

        if(this.state.event!==null&&this.state.event!==undefined
        &&this.state.group!==null&&this.state.group!==undefined) {
            var event = this.state.event;
            var group = this.state.group;
            var trs = [];
            var grs = [];
            var ref = this;
            if(event!=0) {
                event.map(function (item, i) {

                    if (i%3 == 0) {

                        trs.push(
                            <div className="basic_first" key={"event" + i}>

                                <div className="business" onClick={ref.showEventsDetail.bind(null, item)}  >
                                    <h2>{item.eventName}</h2>
                                    <p><span>地点：</span>{item.eventPlaceName}</p>
                                </div>
                                <div className="value"  onClick={ref.showEventsDetail.bind(null, item)}  >
                                    <p><span>组织者：</span>{item.eventManagerLoginName}</p>
                                </div>
                                <ul onClick={ref.showEventsDetail.bind(null, item)}  >
                                    <li><span>时间：</span> {item.startTimeStr}</li>
                                    <li><span>已报名：</span> {item.eventNowMemNum}人</li>
                                    <li><span>简介：</span> {item.eventBrief}</li>
                                    <li><span>收费标准：</span> {item.cost+"元/"+item.costType2}</li>

                                </ul>
                                <div className="buy-me">
                                    {/*   <a onClick={ref.showEventsDetail.bind(null, item)}>详情</a>*/}

                                    {item.eventMaxMemNum>item.eventNowMemNum&&item.isSignUp==0?
                                        <a onClick={ref.eventSignUp.bind(null,item.eventId)}>报名</a>:null
                                    }
                                    {item.eventMaxMemNum<item.eventNowMemNum&&item.isSignUp==0?
                                        <a onClick={function(){alert("抱歉！您报名的活动已满员！")}}>人员已满</a>:null
                                    }
                                    {item.eventMaxMemNum>item.eventNowMemNum&&item.isSignUp==1?
                                        <a >您已报名</a>:null
                                    }


                                </div>



                            </div>
                        )
                    }
                    else {
                        trs.push(
                            <div className="basic" key={"event" + i}>
                                <div className="business" onClick={ref.showEventsDetail.bind(null, item)} >
                                    <h2>{item.eventName}</h2>
                                    <p><span>地点：</span>{item.eventPlaceName}</p>
                                </div>
                                <div className="value" onClick={ref.showEventsDetail.bind(null, item)} >
                                    <p><span>组织者：</span>{item.eventManagerLoginName}</p>
                                </div>
                                <ul onClick={ref.showEventsDetail.bind(null, item)} >
                                    <li><span>时间：</span> {item.startTimeStr}</li>
                                    <li><span>已报名：</span> {item.eventNowMemNum}人</li>
                                    <li><span>简介：</span> {item.eventBrief}</li>
                                    <li><span>收费标准：</span> {item.cost+"元/"+item.costType2}</li>
                                </ul>
                                <div className="buy-me">
                                    {item.eventMaxMemNum>item.eventNowMemNum&&item.isSignUp==0?
                                        <a onClick={ref.eventSignUp.bind(null,item.eventId)}>报名</a>:null
                                    }
                                    {item.eventMaxMemNum<item.eventNowMemNum&&item.isSignUp==0?
                                        <a onClick={function(){alert("抱歉！您报名的活动已满员！")}}>人员已满</a>:null
                                    }
                                    {item.eventMaxMemNum>item.eventNowMemNum&&item.isSignUp==1?
                                        <a >您已报名</a>:null
                                    }
                                </div>
                            </div>
                        )
                    }
                })
            }else{
                trs.push(
                    <div>暂无数据！</div>
                )
            }
            if(group !=0) {
                group.map(function (item, i) {
                    if (i%3 == 0) {
                        grs.push(
                            <div className="basic_first" key={"group" + i}>

                                <div className="business">
                                    <h2>{item.groupName}</h2>
                                </div>
                                <div className="value">
                                    <p><span>群主：</span>{item.groupManagerLoginName}</p>
                                </div>
                                <ul>
                                    <li><span>现有人数：</span> {item.groupNowMemNum}人</li>
                                    <li><span>简介：</span> {item.groupBrief}</li>
                                </ul>
                                <div className="buy-me">
                                    <a onClick={ref.groupSignUp.bind(null, item.groupId)}>加入</a>
                                </div>
                            </div>
                        )
                    } else {
                        grs.push(
                            <div className="basic" key={"group" + i}>

                                <div className="business">
                                    <h2>{item.groupName}</h2>
                                </div>
                                <div className="value">
                                    <p><span>群主：</span>{item.groupManagerLoginName}</p>
                                </div>
                                <ul>
                                    <li><span>现有人数：</span> {item.groupNowMemNum}人</li>
                                    <li><span>简介：</span> {item.groupBrief}</li>
                                </ul>
                                <div className="buy-me">
                                    <a onClick={ref.groupSignUp.bind(null, item.groupId)}>加入</a>
                                </div>
                            </div>
                        )
                    }
                })
            }else {
                grs.push(
                    <div>暂无数据！</div>
                )
            }

            var mrs = [];
            if(this.state.modal!==null&&this.state.modal!==undefined){
                var item = this.state.modal;
                mrs.push(
                    <div style={{textAlign: 'center'}} key='modal'>
                        <div className="business">
                            <h2 id="eventTitle">{item.eventName}</h2>
                            <p id="eventPlace"><span>地点：</span>{item.eventPlaceName}</p>
                        </div>
                        <div className="value">
                            <p id="eventCreater"><span>组织者：</span>{item.eventManagerLoginName}</p>
                        </div>
                        <ul>
                            <li id="eventTime"><span>时间：</span>{item.startTimeStr}</li>
                            <li id="eventMaxNum"><span>最大需求人数：</span>{item.eventMaxMemNum}</li>
                            <li id="eventNum"><span>参与者：</span>{item.eventMember}</li>
                            <li id="eventBrief"><span>简介：</span>{item.eventBrief}</li>
                            {/*<li id="costType"><span>收费标准：</span>{item.costType2}</li>
                            <li id="cost"><span>花费：</span>{item.cost}</li>*/}
                            <li><span>收费标准：</span> {item.cost+"元/"+item.costType2}</li>
                            {
                                item.money!=null? <li><span>缴费状态：</span>已缴费{item.money+"/元"}</li>:
                                    <li><span>缴费状态：</span>未交费</li>
                            }

                        </ul>
                        <div className="buy-me">


                            {item.eventMaxMemNum>item.eventNowMemNum&&item.isSignUp==0?
                              <a onClick={ref.eventSignUp.bind(null,item.eventId)}>报名</a>:null
                            }
                            {item.eventMaxMemNum<item.eventNowMemNum&&item.isSignUp==0?
                                <a onClick={function(){alert("抱歉！您报名的活动已满员！")}}>人员已满</a>:null
                            }
                            {item.eventMaxMemNum>item.eventNowMemNum&&item.isSignUp==1?
                                <a >您已报名</a>:null
                            }

                        </div>
                    </div>

                )
            }
            contains =
                <div>
                    <div className="banner-bottom">
                        <div className="container">
                            <div className="faqs-top-grids">
                                <div className="product-grids">
                                    <div className="col-md-8 news_content">
                                        <ul id="myTab" className="nav nav-tabs">
                                            <li className="active" id="events" style={{width:'50%'}}>
                                                <a href="#home"  data-toggle="tab" style={{textAlign:'center',fontSize:'15px',color: '#337ab7',backgroundColor: 'white'}}>
                                                    活动
                                                </a>
                                            </li>
                                            <li id="groups"style={{width:'50%'}}>
                                                <a href="#ios"  data-toggle="tab"  style={{textAlign:'center',fontSize:'15px',color:'#337ab7',backgroundColor: 'white'}}>
                                                    群圈
                                                </a>
                                            </li>
                                        </ul>
                                        <div id="myTabContent" className="tab-content">
                                            <div className="tab-pane fade in active" id="home">
                                                {trs}
                                            </div>
                                            <div className="tab-pane fade" id="ios">
                                                {grs}
                                            </div>
                                        </div>
                                        <button onClick={this.test}>test</button>
                                    </div>
                                    <RightSlide/>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade bs-example-modal-sm login-container"
                         tabIndex="-1"
                         role="dialog"
                         aria-labelledby="myLargeModalLabel"
                         aria-hidden="true"
                         ref='successModal'
                         data-keyboard="false"
                         style={{zIndex: 1045}}
                    >
                        <div className="modal-dialog modal-sm"
                             style={{position: 'absolute', top: '30%', width: '50%', marginLeft: '25%'}}>
                            <div className="modal-content"
                                 style={{position: 'relative', width: '100%', padding: '40px'}}>

                                <div className="modal-body">
                                    <div className="modalEventDetail">
                                        {mrs}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
        }else{
            this.initialData();
        }

        return contains;
    },

});

const mapStateToProps = (state, ownProps) => {
    const props = {
        token: state.userInfo.accessToken,
    }
    return props
}
export default connect(mapStateToProps)(Event);


