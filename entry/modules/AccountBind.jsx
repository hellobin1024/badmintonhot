/**
 * Created by douxiaobin on 2016/10/27.
 */
import React from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import '../../css/entry/modules/accountBind.css';
var Tips = require('../../components/basic/Tips');

var ProxyQ = require('../../components/proxy/ProxyQ');

var accountBind=React.createClass({

    viewSwitch:function(ob){
        var view=ob;
        this.setState({view:view});
    },

    verifyCodeTimeOut:function(){  //获取验证码倒计时
        var refsPage = this.refs['accPersonInfo'];
        var J_getCode = $(refsPage).find('#J_getCode');
        var J_second = $(refsPage).find('#J_second');
        var J_resetCode = $(refsPage).find('#J_resetCode');
        J_getCode.hide();
        J_second.html('60');
        J_resetCode.show();
        var second = 60; //验证码有效时间60秒
        var timer = null;
        var ins = this;
        timer = setInterval(function () {
            second -= 1;
            if (second > 0) {
                J_second.html(second);
            } else {
                clearInterval(timer);
                J_getCode.show();
                J_resetCode.hide();
                ins.setState({verifyCode:null}); //把验证码设置失效
            }
        }, 1000);
    },

    getVerifyCode:function(){
        var accPersonInfo = this.refs['accPersonInfo'];
        var phoneNum = $(accPersonInfo).find("input[name='phoneNum']").val();
        var verifyCode = $(accPersonInfo).find("input[name='verifyCode']").val();
        var reg = /^1[34578]\d{9}$/;
        if(!(reg.test(phoneNum))){
            Tips.showTips("手机号码有误，请重新填写~");
            return false;
        }
        var num = '';
        for(var i=0;i<4;i++){
            num+=Math.floor(Math.random()*10);
        }
        this.setState({verifyCode:num});

        var params = {
            corp_id:'hy6550',
            corp_pwd:'mm2289',
            corp_service:1069003256550,
            mobile:phoneNum,
            msg_content:''+num,
            corp_msg_id:'',
            ext:''
        };

        var ins=this; //保存this
        var url='http://sms.cloud.hbsmservice.com:8080/sms_send2.do';
        $.ajax({
            type    : 'POST',
            url     : url,
            data    : params,
            dataType: 'JSONP',
            crossDomain: true,
            cache   : false,
            ContentType: 'application/json',
            //jsonpCallback: '?',
            //jsonp: 'callback',
            success : function (response) {
                Tips.showTips("验证码发送成功！");
                ins.verifyCodeTimeOut();
            },
            error   : function (xhr, status, err) {
                var $modal=$("#root_modal");
                var content;
                var errType="";
                if(xhr.status==200 || xhr.status=="200") {
                    Tips.showTips("验证码发送成功！");
                    ins.verifyCodeTimeOut();
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

    phoneSubmit:function(){
        var accPersonInfo = this.refs['accPersonInfo'];
        var phoneNum = $(accPersonInfo).find("input[name='phoneNum']").val();
        var verifyCode = $(accPersonInfo).find("input[name='verifyCode']").val();
        var phoneReg = /^1[34578]\d{9}$/;

        if (phoneNum == "") {
            Tips.showTips('请填写手机号~');
        } else if(!(phoneReg.test(phoneNum))){
            Tips.showTips("手机号码有误，请重新填写~");
        } else if (verifyCode == "") {
            Tips.showTips('请填写验证码~');
        } else if(this.state.verifyCode == null || this.state.verifyCode == undefined) {
            Tips.showTips('验证码失效，请重新获取~');
        } else if(verifyCode!==this.state.verifyCode) {
            Tips.showTips('验证码不正确~');
        } else{

            var url = '/func/bind/bindPhoneNum';
            var params={
                phoneNum:phoneNum,
            };
            ProxyQ.query(
                'POST',
                url,
                params,
                null,
                function (re) {
                    var reCode = re.re;
                    if(reCode==1 || reCode=='1'){
                        alert("绑定成功");
                    }else{
                        alert("绑定失败");
                    }
                },
                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }
            );
        }
    },

    initialData:function(){
        var url="/func/manageBean/accountBindInit";

        ProxyQ.query(
            'get',
            url,
            null,
            null,
            function(ob) {
                var reCode = ob.re;
                if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) { //数据获取失败
                    return;
                }
                var weichat=ob.data.weichat;
                var phoneNum=ob.data.phoneNum;
                var weichatBind=false;
                var phoneBind=false;
                if(weichat!==null && weichat!==""){
                    weichatBind=true;
                }
                if(phoneNum!==null && phoneNum!==""){
                    phoneBind=true;
                }
                this.setState({
                    init:true,
                    weichat:weichat, weichatBind:weichatBind,
                    phoneNum:phoneNum ,phoneBind:phoneBind});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },

    getInitialState:function(){
        return ({view:'bindall', verifyCode:null, init:null});
    },

    qrcode:function () {
        var personId=this.props.personId+"";
        window.setTimeout(function () {
            var el=document.getElementById("qrcode");
            new QRCode(el, personId);
        },500)

    },
    render:function(){
        var mainContent;
        var data;

        if(this.state.init!==undefined && this.state.init!==null){
            switch(this.state.view) {
                case 'bindall':
                    mainContent =
                        <div ref="accPersonInfo" style={{marginTop:'50px'}}>


                            <div className="acc_control_group">
                                <div className="acc_conte" style={{float:'left'}}>
                                    <img style={{paddingLeft:'5px'}}
                                         src={window.App.getResourceDeployPrefix()+"/images/wechaticon.jpg"}></img>
                                </div>
                                <div className="acc_span" style={{float:'left',width:'120px',marginLeft:'15px'}}>
                                    <span className="acc_span">微信绑定</span>
                                </div>
                            </div>
                            <div className="toolBar">
                                {this.state.weichatBind ?
                                    <div>
                                        <span className="tag"> {this.state.weichat}</span>
                                        <span>
                                            <a className="update" onClick={this.viewSwitch.bind(this,'bindwechat')}>更换微信号>></a>
                                        </span>
                                    </div>
                                    :
                                    <button className="accBtn" onClick={this.viewSwitch.bind(this,'bindwechat')}>去绑定</button>
                                }
                            </div>

                            <div className="clear"></div>
                            <div className="acc_control_group" style={{marginTop:'40px'}}>
                                <div className="acc_conte" style={{float:'left'}}>
                                    <img style={{paddingLeft:'5px'}}
                                         src={window.App.getResourceDeployPrefix()+"/images/phone.png"}></img>
                                </div>
                                <div className="acc_span" style={{float:'left',width:'120px',marginLeft:'15px'}}>
                                    <span className="acc_span">手机绑定</span>
                                </div>
                            </div>
                            <div className="toolBar">

                                {this.state.phoneBind ?
                                    <div>
                                        <span className="tag">{this.state.phoneNum}</span>
                                        <span>
                                            <a className="update" onClick={this.viewSwitch.bind(this,'bindphone')}>更换手机号>></a>
                                        </span>
                                    </div>
                                    :
                                    <button className="baccBtn" onClick={this.viewSwitch.bind(this,'bindphone')}>去绑定</button>
                                }
                            </div>
                            <div className="clear"></div>
                        </div>
                    break;
                case 'bindwechat':
                    mainContent =
                        <div ref="accPersonInfo" style={{marginTop:'50px',padding:'170px'}} id="qrcode" onLoad={this.qrcode()}>
                            <span style={{fontSize: 'larger',paddingLeft: '100px'}}>扫码绑定</span>
                        </div>
                    break;
                case 'bindphone':
                    mainContent =
                        <div ref="accPersonInfo" style={{marginTop:'50px'}}>

                            <div className="acc_control_group">
                                <div className="acc_label" style={{float:'left',width:'60px'}}>
                                    <span className="acc_label" >手机号：</span>
                                </div>
                                <div className="acc_conte" style={{float:'left'}} >
                                    <input name="phoneNum" defaultValue="" maxLength="11" className="inputStyle" placeholder=""/>
                                </div>
                                <div className="toolBar">
                                    <button className="caccBtn" name="verifyCode" id="J_getCode" onClick={this.getVerifyCode}>获取验证码</button>
                                    <button type="button" className="js-getcode" id="J_resetCode" style={{display:'none'}}><span id="J_second">60</span>秒后重发</button>
                                </div>

                            </div>
                            <div className="clear"></div>
                            <div className="acc_control_group">
                                <div className="acc_label" style={{float:'left',width:'60px'}}>
                                    <span className="acc_label" onClick={this.getVerifyCode}>验证码：</span>
                                </div>
                                <div className="acc_conte" style={{float:'left'}} >
                                    <input name="verifyCode" defaultValue="" maxLength="25" className="inputStyle" placeholder=""/>
                                </div>
                            </div>
                            <div className="clear"></div>
                            <div className="toolBar">
                                <button className="wechatBtn" onClick={this.phoneSubmit}>保存</button>
                            </div>
                        </div>
                    break;
            }
        }else{
            this.initialData();
        }

        return(
            <div style={{marginLeft:'100pX'}}>
                {mainContent}
            </div>
        );
    },
});

const mapStateToProps = (state, ownProps) => {
    const props = {
        loginName: state.userInfo.personId,
    }
    return props
}
export default connect(mapStateToProps)(accountBind);
/**
 * Created by douxiaobin on 2016/10/27.
 */
