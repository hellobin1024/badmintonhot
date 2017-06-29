import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import { connect } from 'react-redux';


import RightSlide from '../../entry/modules/RightSilde'
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
                var a = res.resList;
                var member ="";
                for(var i=0;i<a.length;i++){
                    member+=" "+a[i].infoPersonInfo.perName
                }
                item.member=member;
                ref.setState({modal:item});
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
                if(res.reCode==0){
                    alert(res.response);
                }else {
                    alert(res.response);
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
                    if(res.reCode==0){
                        alert(res.response);
                    }else {
                        alert(res.response);
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
        var url = "/func/allow/getAllEvents";
        var ref = this;
        Proxy.query(
            'GET',
            url,
            null,
            null,
            function (res) {
                var a = res.resList;
                ref.setState({event:a});
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
    },
    getAllGroups:function () {
        var url = "/func/allow/getAllGroups";
        var ref = this;
        Proxy.query(
            'GET',
            url,
            null,
            null,
            function (res) {
                var a = res.resList;
                ref.setState({group:a});
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
            event.map(function (item, i) {
                if (i == 0) {
                    trs.push(
                        <div className="basic_first" key={"event"+i}>

                            <div className="business">
                                <h2>{item.eventName}</h2>
                                <p><span>地点：</span>{item.badmintonVenueUnit.name}</p>
                            </div>
                            <div className="value">
                                <p><span>组织者：</span>{item.infoPersonInfo.perName}</p>
                            </div>
                            <ul>
                                <li><span>时间：</span> {ref.dateFormat(item.eventTime)}</li>
                                <li><span>已报名：</span> {item.eventNowMemNum}人</li>
                                <li><span>简介：</span> {item.eventBrief}</li>
                            </ul>
                            <div className="buy-me">
                                <a onClick={ref.showEventsDetail.bind(null, item)}>详情</a>
                            </div>
                        </div>
                    )
                }
                else {
                    trs.push(
                        <div className="basic" key={"event"+i}>
                            <div className="business">
                                <h2>{item.eventName}</h2>
                                <p><span>地点：</span>{item.badmintonVenueUnit.name}</p>
                            </div>
                            <div className="value">
                                <p><span>组织者：</span>{item.infoPersonInfo.perName}</p>
                            </div>
                            <ul>
                                <li><span>时间：</span> {ref.dateFormat(item.eventTime)}</li>
                                <li><span>已报名：</span> {item.eventNowMemNum}人</li>
                                <li><span>简介：</span> {item.eventBrief}</li>
                            </ul>
                            <div className="buy-me">
                                <a onClick={ref.showEventsDetail.bind(null, item)}>详情</a>
                            </div>
                        </div>
                    )
                }
            })

            group.map(function (item, i) {
                if (i == 0) {
                    grs.push(
                        <div className="basic_first" key={"group"+i}>

                            <div className="business">
                                <h2>{item.groupName}</h2>
                            </div>
                            <div className="value">
                                <p><span>群主：</span>{item.infoPersonInfo.perName}</p>
                            </div>
                            <ul>
                                <li><span>现有人数：</span> {item.groupNowMemNum}人</li>
                                    <li><span>简介：</span> {item.groupBrief}</li>
                                </ul>
                                <div className="buy-me">
                                    <a onClick={ref.groupSignUp.bind(null,item.groupId)}>加入</a>
                                </div>
                            </div>
                        )
                    }else{
                        grs.push(
                            <div className="basic" key={"group"+i}>

                                <div className="business">
                                    <h2>{item.groupName}</h2>
                                </div>
                                <div className="value">
                                    <p><span>群主：</span>{item.infoPersonInfo.perName}</p>
                                </div>
                                <ul>
                                    <li><span>现有人数：</span> {item.groupNowMemNum}人</li>
                                    <li><span>简介：</span> {item.groupBrief}</li>
                                </ul>
                                <div className="buy-me">
                                    <a onClick={ref.groupSignUp.bind(null,item.groupId)}>加入</a>
                                </div>
                            </div>
                        )
                    }
                })

            var mrs = [];
            if(this.state.modal!==null&&this.state.modal!==undefined){
                var item = this.state.modal;
                mrs.push(
                    <div style={{textAlign: 'center'}} key='modal'>
                        <div className="business">
                            <h2 id="eventTitle">{item.eventName}</h2>
                            <p id="eventPlace"><span>地点：</span>{item.badmintonVenueUnit.name}</p>
                        </div>
                        <div className="value">
                            <p id="eventCreater"><span>组织者：</span>{item.infoPersonInfo.perName}</p>
                        </div>
                        <ul>
                            <li id="eventTime"><span>时间：</span>{ref.dateFormat(item.eventTime)}</li>
                            <li id="eventPlaceDetail"><span>活动详细地址：</span>{item.badmintonVenueUnit.address}</li>
                            <li id="eventMaxNum"><span>最大需求人数：</span>{item.eventMaxMemNum}</li>
                            <li id="eventNum"><span>参与者：</span>{item.member}</li>
                            <li id="eventBrief"><span>简介：</span>{item.eventBrief}</li>
                        </ul>
                        <div className="buy-me">
                            {item.eventMaxMemNum>item.eventNowMemNum?
                                <a onClick={this.eventSignUp.bind(null,item.eventId)}>报名</a>:
                                <a onClick={function(){alert("抱歉！您报名的活动已满员！")}}>人员已满</a>
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


