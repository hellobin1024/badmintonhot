/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { connect } from 'react-redux';
import { render} from 'react-dom'
import { browserHistory ,hashHistory} from 'react-router';
import Header from './components/Heard.jsx';
import '../../css/entry/modules/myEvents.css'
import Calendar from '../../components/basic/Calendar.jsx';
var Tips = require('../../components/basic/Tips');
var today=new Date().toLocaleDateString().replace("/", "-").replace("/", "-");

var ProxyQ = require('../../components/proxy/ProxyQ')

var Order = React.createClass({

    getUrlParam :function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        // var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        var r = window.location.href.substr(window.location.href.indexOf('?')+1).match(reg);
        if (r != null) return unescape(r[2]); return null; //返回参数值
    },
    getInitialState: function () {

        var product=parseInt(this.getUrlParam("product"));
        var loginName=this.props.loginName;
        return({product:product,
            loginName:loginName,
        data:null})
    },
    initialData:function () {
        this.getClassInfo();
        this.getRelateMan();
    },
    getClassInfo:function () {
        var url="/func/allow/getClassByClassId";
        var params={
            id:this.state.product
        };

        ProxyQ.query(
            'post',
            url,
            params,
            null,
            function(ob) {
                var data=ob.data;
                this.setState({data:data});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    getRelateMan:function () {
        var url="/func/relative/getMyRelative";
        ProxyQ.query(
            'get',
            url,
            null,
            null,
            function(ob) {
                var a=ob.data;
                this.setState({relate:a});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    showModal:function () {
        var addNewManModal = this.refs['addNewManModal'];
        $(addNewManModal).modal('show');
    },
    //显示提示框，目前三个参数(txt：要显示的文本；time：自动关闭的时间（不设置的话默认1500毫秒）；status：默认0为错误提示，1为正确提示；)
    showTips:function(txt,time,status) {
        var htmlCon = '';
        if(txt != ''){
            if(status != 0 && status != undefined){
                htmlCon = '<div class="tipsBox" style="width:220px;padding:10px;background-color:#4AAF33;border-radius:4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;color:#fff;box-shadow:0 0 3px #ddd inset;-webkit-box-shadow: 0 0 3px #ddd inset;text-align:center;position:fixed;top:25%;left:50%;z-index:999999;margin-left:-120px;">'+txt+'</div>';
            }else{
                htmlCon = '<div class="tipsBox" style="width:220px;padding:10px;background-color:#D84C31;border-radius:4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;color:#fff;box-shadow:0 0 3px #ddd inset;-webkit-box-shadow: 0 0 3px #ddd inset;text-align:center;position:fixed;top:25%;left:50%;z-index:999999;margin-left:-120px;">'+txt+'</div>';
            }
            $('body').prepend(htmlCon);
            if(time == '' || time == undefined){
                time = 1500;
            }
            setTimeout(function(){ $('.tipsBox').remove(); },time);
        }
    },
    addNewMan:function () {
        var relativePersonInfo = this.refs.relativePersonInfo;
        var relatedName=$(relativePersonInfo).find("input[name='relatedName']").val();
        var relatedRealName=$(relativePersonInfo).find("input[name='relatedRealName']").val();
        var relatedDate=$(relativePersonInfo).find("input[name='birthdayDate']").val();
        var relativeSex = $('#relativeSex option:selected').val();

        if (relatedName == '') {
            this.showTips('请填写关联人的登录名~');
        } else if (relatedRealName == "") {
            this.showTips('请填写关联人的真实姓名~');
        } else if (relatedDate == "") {
            this.showTips('请选择出生日期~');
        } else if (relativeSex == "-1"||relativeSex == -1){
            this.showTips('请选择性别~');
        } else {

            var url = "/func/relative/addRelative";
            var params = {
                userName: relatedName,
                perName: relatedRealName,
                genderCode: relativeSex,
                perBirthday: relatedDate
            };

            ProxyQ.query(
                'post',
                url,
                params,
                null,
                function (ob) {
                    alert(ob.data);
                    var addNewManModal = this.refs['addNewManModal'];
                    $(addNewManModal).modal('hide');
                    this.getRelateMan();
                }.bind(this),
                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
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
    classSignUp:function () {
        var store="";
        $("#d1 input:checkbox:checked").each(function (index, domEle) {
            store+=$(domEle).val()+",";
        });
        if(store.length==0){
            alert('请至少选择一个报名人！');
        }else {
            var url = "/func/allow/getCoachPhone";
            var params = {
                classId: this.state.product
            };
            ProxyQ.query(
                'post',
                url,
                params,
                null,
                function (ob) {

                    var ref = this;
                    var coachName=this.state.data.creatorName;
                    var className=this.state.data.courseName;
                    var loginName=this.state.loginName;
                    var coachPhone=ob.data;

             var url = "/func/allow/getMyPhone";
             ProxyQ.query(
                'get',
                url,
                null,
                null,
                function (ob) {

                    var myPhone = ob.data;
                    var url = "/func/allow/classMultiplySignUp";
                    var params = {
                        personId: store,
                        classId: this.state.product
                    };
                    ProxyQ.query(
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

                            const path = "/personInfo";
                            hashHistory.push(path);
                            ref.sendMessage(coachPhone,"羽毛球热——注册会员'"+loginName+"'报名了您所开设的暑期课程'"+className+"'，请及时电话联系进行确认！联系电话：+"+myPhone);//给教练发消息
                            ref.sendMessage(myPhone,"羽毛球热——感谢您报名我们的暑期课程，具体缴费，福利详情请与您的课程教练："+coachName+" "+coachPhone+"联系确认");//给自己发消息

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
        }
    },
    render:function(){
        var mainContent = null;
        if(this.state.product!==undefined && this.state.product!==null) {
            var data = this.state.data;
            var relate = this.state.relate;
            var path = this.props.route.path;
            var table = null;
            var lis = [];
            if (data !== undefined && data !== null && relate !== undefined && relate !== null) {
                table =
                    <div>
                        <table className="table table-striped invoice-table">
                            <thead className="table-head">
                            <tr>
                                <th width="300"></th>
                                <th width="300"></th>
                                <th width="300"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>课程名称:</td>
                                <td>{data.courseName}</td>
                                <td>开课教员:</td>
                                <td>{data.creatorName}</td>
                            </tr>
                            <tr>
                                <td>课程时间:</td>
                                <td>{1}</td>
                                <td>课程地点:</td>
                                <td>{data.unitName}</td>
                            </tr>
                            <tr>
                                <td>课程计划招生:</td>
                                <td>{data.maxNumber}</td>
                                <td>课程现有人数:</td>
                                <td>{data.signNumber}</td>
                            </tr>
                            <tr>
                                <td style={{borderBottom: '1px solid #ddd'}}>课程简介:</td>
                                <td style={{borderBottom: '1px solid #ddd'}} colSpan={6}>{data.detail}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                relate.map(function (item, i) {
                    lis.push(
                        <div style={{width:'150px',float: 'left'}} key={'checkbox'+i}>
                            <div style={{float: 'left'}}><input type="checkbox" key={i} value={item.relatedPersonId}/></div>

                            <div style={{float: 'left'}}><span>{item.userName}</span></div>
                            <div className="clearfix"></div>
                        </div>
                    )
                })
            } else {
                this.initialData();
            }
            mainContent =
                <div>
                    <Header path={path}/>
                    <div className="person-container clearfix" style={{paddingTop:'25px',paddingTop:'10px', borderStyle:'solid', borderWidth:'thin', borderColor:'yellowgreen', marginTop:'20px', background: '#eaf4df'}}>
                        <h2 style={{textAlign:'center',fontSize:'small',color: 'burlywood'}}>温馨提示：</h2>
                        <p style={{textIndent:'25px'}}>下方是您刚刚报名的暑期培训班的一些详细信息，在进行确认后，请在"报名人员选择"栏中选取您要报名的人员（第一个候选人是自己），若选择栏中未出现您想报名人的选项，
                            请在右下角点击"点此添加"选项进行人员添加，在您添加的同时我们将会为您创建该人员的账号（初始密码000000）以方便其登陆！</p>
                    </div>

                    <div id="pjax-container" className="person-container clearfix" style={{paddingTop: '25px',color:'black'}}>
                        <div>
                            <div className="orderTitle">
                                <h2 >您所选课程</h2>
                            </div>
                            {table}
                            <div className="orderTitle">
                                <h2>报名人员选择</h2>
                            </div>
                            <div id="d1" className="order-container">
                                    {lis}
                                <div className="clearfix"></div>
                            </div>
                            <div style={{marginLeft: '78em'}}>
                                <p>以上没有您所需要的人员？<a onClick={this.showModal}>点此添加！</a></p>
                            </div>
                            <div className="orderSubmit">
                                <button style={{padding: '7px 20px 7px 20px'}} onClick={this.classSignUp}>报名</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade bs-example-modal-sm login-container"
                         tabIndex="-1"
                         role="dialog"
                         aria-labelledby="myLargeModalLabel"
                         aria-hidden="true"
                         ref='addNewManModal'
                         data-keyboard="false"
                         style={{zIndex: 1045}}
                    >
                        <div className="modal-dialog modal-sm"
                             style={{position: 'absolute', top: '30%', width: '50%', marginLeft: '25%'}}>
                            <div className="modal-content"
                                 style={{position: 'relative', width: '100%', padding: '40px'}}>

                                <div className="modal-body">
                                    <div className="modalEventDetail">

                                        <div ref="relativePersonInfo">
                                            <div className="article"
                                                 style={{textAlign: 'center', borderBottom: '1px dashed #CCCCCC'}}>
                                                <h2 className="font_15 text" style={{fontSize: 'medium'}}>添加关联人</h2>
                                            </div>

                                            <div>
                                                <div style={{marginTop: '25px'}}>
                                                    <div >
                                                        <label className="related_label">用户昵称（登录名）</label>
                                                        <div className="self_controls">
                                                            <input name="relatedName" defaultValue=""
                                                                   className="self_input"
                                                                   style={{width: '230px', fontSize: 'medium'}}/>
                                                        </div>
                                                        <label className="related_label">（这将成为您申请添加的关联人的登录账号！初始密码000000！请牢记！）</label>
                                                    </div>

                                                </div>

                                                <div style={{marginTop: '25px'}}>
                                                    <div>
                                                        <label className="related_label">真实姓名</label>
                                                        <div className="self_controls">
                                                            <input name="relatedRealName" defaultValue=""
                                                                   className="self_input"
                                                                   style={{width: '230px', fontSize: 'medium'}}/>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="clear">
                                                </div>
                                                <div style={{marginTop: '25px'}}>
                                                    <div>
                                                        <label className="related_label">性别</label>
                                                        <div className="self_controls">
                                                            <select style={{height: '35px'}} id="relativeSex">
                                                                <option value={-1}>请选择性别</option>
                                                                <option value={1}>男</option>
                                                                <option value={2}>女</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{marginTop: '25px'}}>
                                                    <div>
                                                        <label className="related_label">出生日期</label>
                                                        <div className="self_controls">
                                                   <span>
                                                       <Calendar data={today} ctrlName='birthdayDate'/>
                                                   </span>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="clear">
                                                </div>

                                                <div className="save_control" style={{
                                                    marginLeft: '44%',
                                                    marginTop: '20px',
                                                    marginBottom: '20px',
                                                    width: '100%'
                                                }}>
                                                    <button style={{padding: '5px 20px'}} onClick={this.addNewMan}>添加
                                                    </button>
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
        }else {
            mainContent=
                <div>
                <h1>数据出错，请重新尝试，抱歉！</h1>
            </div>
        }


        return mainContent;

    },

});

const mapStateToProps = (state, ownProps) => {
    const props = {
        loginName: state.userInfo.loginName,
    }
    return props
}
export default connect(mapStateToProps)(Order);