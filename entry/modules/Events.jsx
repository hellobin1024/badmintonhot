import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'



import RightSlide from '../../entry/modules/RightSilde'
var Proxy = require('../../components/proxy/ProxyQ');

var Event = React.createClass({


    getInitialState: function () {

        return ({});
    },
    initialData:function(){

        this.getAllEvents();


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

    signUp:function (item) {
        var url = "/func/allow/classSignUp";
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
                ref.setState({data:a});
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
    },

    render:function() {
        var contains = null;

        if(this.state.data!==null&&this.state.data!==undefined) {
            var data = this.state.data;
            var trs = [];
            var ref = this;
            data.map(function (item,i) {
               trs.push(
                   <div className="basic" key={i}>

                    <div className="business">
                        <h2>{item.eventName}</h2>
                        <p><span>地点：</span>{item.badmintonVenueUnit.name}</p>
                    </div>
                    <div className="value">
                        <p><span>组织者：</span>{item.infoPersonInfo.perName}</p>
                    </div>
                    <ul>
                        <li><span>时间：</span> {item.eventTime}</li>
                        <li><span>已报名：</span> {item.eventNowMemNum}人</li>
                        <li><span>简介：</span> {item.eventBrief}</li>

                    </ul>
                    <div className="buy-me">
                        <a onClick={ref.showEventsDetail.bind(null,item)}>参加</a>
                    </div>
                </div>
               )

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
                            <li id="eventTime"><span>时间：</span>{item.eventTime}</li>
                            <li id="eventPlaceDetail"><span>活动详细地址：</span>{item.badmintonVenueUnit.address}</li>
                            <li id="eventMaxNum"><span>最大需求人数：</span>{item.eventMaxMemNum}</li>
                            <li id="eventNum"><span>参与者：</span>{item.member}</li>
                            <li id="eventBrief"><span>简介：</span>{item.eventBrief}</li>
                        </ul>
                        <div className="buy-me">
                            <a onClick={this.signUp.bind(null,item.classId)}>报名</a>
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
                                        {trs}

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
    }
});

module.exports = Event;

