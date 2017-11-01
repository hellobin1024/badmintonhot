var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';
import { connect } from 'react-redux';
import { browserHistory ,hashHistory} from 'react-router';
import '../../build/css/style.css'
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import RightSlide from './components/RightSilde'
import {Link} from 'react-router';
import '../../css/entry/modules/myEvents.css'
var Tips = require('../../components/basic/Tips');
var Proxy = require('../../components/proxy/ProxyQ');

var Class = React.createClass({


    getInitialState: function () {
        var token=this.props.token;
        var loginName=this.props.loginName;
        var personId=this.props.personId;

        if(this.props.personId!==undefined && this.props.personId!==null){
            personId = this.props.personId;
        }
        return ({ token:token,personId:personId,loginName:loginName});
    },
    initialData:function(){

        this.getAllClass();

    },
    sendMessage:function (phoneNum,contents){

        var params = {
            corp_id:'hy6550',
            corp_pwd:'mm2289',
            corp_service:1069003256550,
            mobile:phoneNum,
            msg_content:contents,
            corp_msg_id:'',
            ext:''
        };

        var ins=this; //保存this
        var url='http://sms.cloud.hbsmservice.com:8080/sms_send2.do';
        $.ajax({
            type    : 'POST',
            url     : url,
            data    : params,
            // dataType: 'JSONP',
            crossDomain: true,
            cache   : false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            //jsonpCallback: '?',
            //jsonp: 'callback',
            success : function (response) {
                Tips.showTips("已通知课程教练！");
            },
            error   : function (xhr, status, err) {
                var $modal=$("#root_modal");
                var content;
                var errType="";
                if(xhr.status==200 || xhr.status=="200"||xhr.status==0 || xhr.status=="0") {
                    Tips.showTips("已通知课程教练！");
                    return;
                } else if(xhr.status==404||xhr.status=="404") {
                    content="错误描述:"+xhr.responseText;
                    errType="";
                    switch(xhr.statusText) {
                        case "Not Found":
                            errType="发生错误:"+"path not found";
                            break;
                        default:
                            break;
                    }
                } else if (xhr.status == 502 || xhr.status == "502") {
                    content = "错误描述:" + xhr.responseText;
                    errType = "发生错误:" + "无效的服务器指向";
                }
                $modal.find(".modal-body").text(content);
                $modal.find(".modal-title").text(errType);
                $modal.modal('show');
            }
        });
    },
    signUp:function (item) {
        if(this.state.token!==null&&this.state.token!==undefined) {
            /*  var url = "/func/allow/classSignUp";
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
             if (res.re == 1) {
             alert("报名成功！");
             ref.initialData();
             }
             ref.closeModal();
             },

             function (xhr, status, err) {
             console.error(this.props.url, status, err.toString());
             }
             );
             }else {
             alert("您尚未登录！");
             }*/

            var url = "/func/allow/getCoachPhoneAndClass";
            var params = {
                classId: item
            };
            Proxy.query(
                'post',
                url,
                params,
                null,
                function (ob) {

                    var ref = this;
                    var data=ob.data;
                    var coachName = data.coachName;
                    var className = data.className;
                    var loginName = this.state.loginName;
                    var coachPhone = data.phone;

                    var personId=this.props.personId+"";
                    var url = "/func/allow/getMyPhone";
                    Proxy.query(
                        'get',
                        url,
                        null,
                        null,
                        function (ob) {
                            var myPhone = ob.data;
                            var url = "/func/allow/classMultiplySignUp";
                            var params = {
                                personId: personId,
                                classId: item
                            };
                            Proxy.query(
                                'post',
                                url,
                                params,
                                null,
                                function (ob) {
                                    var reCode = ob.re;
                                    if (reCode == -1 || reCode == "-1") { //操作失败
                                        return;
                                    }
                                    alert(ob.data);

                                    ref.closeModal();
                                    const path = "/personInfo";
                                    hashHistory.push(path);

                                    ref.sendMessage(coachPhone, "羽毛球热——注册会员'" + loginName + "'报名了您所开设的暑期课程'" + className + "'，请及时电话联系进行确认！联系电话：+" + myPhone);//给教练发消息
                                    ref.sendMessage(myPhone, "羽毛球热——感谢您报名我们的暑期课程，具体缴费，福利详情请与您的课程教练：" + coachName + " " + coachPhone + "联系确认");//给自己发消息

                                }.bind(this),
                                function (xhr, status, err) {
                                    console.error(this.props.url, status, err.toString());
                                }.bind(this)
                            );
                        }.bind(this),
                        function (xhr, status, err) {
                            console.error(this.props.url, status, err.toString());
                        }.bind(this)
                    );
                }.bind(this),
                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );

        }else{
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
        // var url = "/func/allow/getClassScheduleByClassId";
        // var param={
        //     id:item.courseId
        // }
        // var ref = this;
        // Proxy.query(
        //     'POST',
        //     url,
        //     param,
        //     null,
        //     function (res) {
        //         var a = res.data;
        //         var day ="";
        //         var week="";
        //         for(var i=0;i<a.length;i++){
        //             day+="每周"+ref.dateChange(a[i].sectionDay)+":"+a[i].sectionStart+"-"+a[i].sectionEnd+" ";
        //         }
        //         a[0].day=day;
        //         ref.setState({modal:a[0]});
        this.setState({modal:item});
        var successModal = this.refs['successModal'];
        $(successModal).modal('show');
    //         },
    //
    //         function (xhr, status, err) {
    //             console.error(this.props.url, status, err.toString());
    //         }
    //     );
    //
     },

    closeModal:function () {
        var successModal = this.refs['successModal'];
        $(successModal).modal('hide');
    },

    getAllClass:function () {
        var url = "/func/allow/getAllClass";
        var ref = this;
        Proxy.query(
            'GET',
            url,
            null,
            null,
            function (res) {
                var a = res.data;
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
                                <p><span>教练：</span>{item.creatorName}</p>
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
                            <h2 id="CLassTitle">{item.courseName}</h2>
                            <p id="eventPlace"><span>地点：</span>{item.unitName}</p>
                        </div>
                        <div className="value">

                            <p id="eventCreater"><span>教练：</span>{item.creatorName}</p>

                        </div>
                        <ul>
                            <li id="eventTime"><span>课程安排：</span>{item.scheduleDes}</li>
                            <li id="eventMaxNum"><span>课程计划招生：</span>{item.maxNumber}</li>
                            <li id="eventNum"><span>已报名人数：</span>{item.signNumber}</li>
                            <li id="eventBrief"><span>简介：</span>{item.detail}</li>
                        </ul>
                        <div className="buy-me">
                            {item.maxNumber>item.signNumber?
                                <a onClick={this.signUp.bind(null,item.courseId)}>报名</a>:
                                <a onClick={function(){alert("抱歉！您报名的课程已满员！")}}>招生已满</a>
                        }
                        </div>
                        <div style={{paddingTop: '2em'}}>
                            <Link to={window.App.getAppRoute() + "/order?product="+item.courseId} onClick={this.closeModal}>给他人报名--></Link>
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

    },
    componentDidMount:function () {
        $(document).click(function () {
            $('.clockpicker').clockpicker()
                .find('input').change(function(){
                // TODO: time changed
                console.log(this.value);
            });
            $('#demo-input').clockpicker({
                autoclose: true
            });
        })
    }

});

const mapStateToProps = (state, ownProps) => {
    const props = {
        token: state.userInfo.accessToken,
        loginName: state.userInfo.loginName,
        personId:state.userInfo.personId,
}
    return props
}
export default connect(mapStateToProps)(Class);