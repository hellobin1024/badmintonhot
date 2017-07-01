import React from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import '../../build/css/style.css'
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import RightSlide from '../../entry/modules/RightSilde'
import {Link} from 'react-router';
var Proxy = require('../../components/proxy/ProxyQ');

var Training = React.createClass({


    getInitialState: function () {

        var token=this.props.token;
        return ({
            token:token
        });
    },
    initialData:function(){

        this.getAllCLass();

    },
    signUp:function (item) {
        if(this.state.token!==null&&this.state.token!==undefined) {
            var url = "/func/allow/classSignUp";
            var param = {
                id: item
            }
            var ref = this;
            Proxy.query(
                'POST',
                url,
                param,
                null,
                function (res) {
                    if (res.reCode == 0) {
                        alert(res.response);
                    } else {
                        alert(res.response);
                    }
                    ref.closeModal();
                },

                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }
            );
        }else {
            alert("您尚未登录！");
        }

    },
    dateChange:function (date) {
        switch (date){
            case 1:
                date='一';
                break
            case 2:
                date='二';
                break
            case 3:
                date='三';
                break
            case 4:
                date='四';
                break
            case 5:
                date='五';
                break
            case 6:
                date='六';
                break
            case 7:
                date='七';
                break
        }
        return date;
    },
    showClassDetail:function (item) {
        var url = "/func/allow/getCLassScheduleByClassId";
        var param={
            id:item.classId
        }
        var ref = this;
        Proxy.query(
            'POST',
            url,
            param,
            null,
            function (res) {
                var a = res.resList;
                var day ="";
                var week="";
                for(var i=0;i<a.length;i++){
                    day+="每周"+ref.dateChange(a[i].sectionDay)+":"+a[i].sectionStart+"-"+a[i].sectionEnd+" ";
                }
                a[0].day=day;
                ref.setState({modal:a[0]});
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

    getAllCLass:function () {
        var url = "/func/allow/getAllClass";
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
                    <div key={i}>
                        <div className="basic" >

                            <div className="business">
                                <h2>{item.className}</h2>
                                <p><span>介绍：</span>{item.detail}</p>
                            </div>
                            <div className="value">
                                <p><span>教练：</span>{item.infoPersonInfo.perName}</p>
                            </div>
                            <ul>
                                <li><span>每周课程安排：</span> {item.classCount}次/周</li>
                                <li><span>费用：</span> {item.cost}</li>
                                <li><span>已报名人数：</span> {item.signNumber}</li>
                            </ul>
                            <div className="buy-me">
                                <a onClick={ref.showClassDetail.bind(null,item)}>详情</a>
                            </div>
                        </div>
                    </div>
                )

            })

            var mrs = [];
            if(this.state.modal!==null&&this.state.modal!==undefined){
                var item = this.state.modal;
                mrs.push(
                    <div style={{textAlign: 'center'}} key='modal' >
                        <div className="business">
                            <h2 id="CLassTitle">{item.badmintonClass.className}</h2>
                            <p id="eventPlace"><span>地点：</span>{item.badmintonClass.badmintonVenueUnit.name}</p>
                        </div>
                        <div className="value">

                            <p id="eventCreater"><span>教练：</span>{item.badmintonClass.infoPersonInfo.perName}</p>

                        </div>
                        <ul>
                            <li><span>详细地点：</span>{item.badmintonClass.badmintonVenueUnit.address}</li>
                            <li id="eventTime"><span>课程安排：</span>{item.day}</li>
                            <li id="eventMaxNum"><span>课程计划招生：</span>{item.badmintonClass.maxNumber}</li>
                            <li id="eventNum"><span>已报名人数：</span>{item.badmintonClass.signNumber}</li>
                            <li id="eventBrief"><span>简介：</span>{item.badmintonClass.detail}</li>
                        </ul>
                        <div className="buy-me">
                            {item.badmintonClass.maxNumber>item.badmintonClass.signNumber?
                                <a onClick={this.signUp.bind(null,item.badmintonClass.classId)}>报名</a>:
                                <a onClick={function(){alert("抱歉！您报名的课程已满员！")}}>招生已满</a>
                        }
                        </div>
                        <Link to={window.App.getAppRoute() + "/order?product="+item.badmintonClass.classId} style={{paddingLeft: '33em'}} onClick={this.closeModal}>给他人报名--></Link>
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
                                        <div className="clearfix"></div>
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

const mapStateToProps = (state, ownProps) => {
    const props = {
        token: state.userInfo.accessToken,
    }
    return props
}
export default connect(mapStateToProps)(Training);