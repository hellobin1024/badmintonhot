/**
 * Created by dell on 2016/10/27.
 */
import React from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router';

import { connect } from 'react-redux';

var Tips = require('../../components/basic/Tips');

var ProxyQ = require('../../components/proxy/ProxyQ');
var SyncStore = require('../../components/flux/stores/SyncStore');
var UserActions=require('../action/UserActions');

var Login=React.createClass({

    //获取url中的参数
    getUrlParam :function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        // var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        var r = window.location.href.substr(window.location.href.indexOf('?')+1).match(reg);
        if (r != null) return unescape(r[2]); return null; //返回参数值
    },

    ////显示提示框，目前三个参数(txt：要显示的文本；time：自动关闭的时间（不设置的话默认1500毫秒）；status：默认0为错误提示，1为正确提示；)
    //showTips:function(txt,time,status) {
    //    var htmlCon = '';
    //    if(txt != ''){
    //        if(status != 0 && status != undefined){
    //            htmlCon = '<div class="tipsBox" style="width:220px;padding:10px;background-color:#4AAF33;border-radius:4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;color:#fff;box-shadow:0 0 3px #ddd inset;-webkit-box-shadow: 0 0 3px #ddd inset;text-align:center;position:fixed;top:25%;left:50%;z-index:999999;margin-left:-120px;">'+txt+'</div>';
    //        }else{
    //            htmlCon = '<div class="tipsBox" style="width:220px;padding:10px;background-color:#D84C31;border-radius:4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;color:#fff;box-shadow:0 0 3px #ddd inset;-webkit-box-shadow: 0 0 3px #ddd inset;text-align:center;position:fixed;top:25%;left:50%;z-index:999999;margin-left:-120px;">'+txt+'</div>';
    //        }
    //        $('body').prepend(htmlCon);
    //        if(time == '' || time == undefined){
    //            time = 1500;
    //        }
    //        setTimeout(function(){ $('.tipsBox').remove(); },time);
    //    }
    //},

    login:function(){
        var loginPage = this.refs['loginPage'];
        var username = $(loginPage).find("input[name='username']").val();
        var password = $(loginPage).find("input[name='password']").val();

        var validate = $(loginPage).find("input[name='verify']").val();
        this.loginSetCookie(username,password);
        if (username == ''||username==null) {
            alert('请填写用户名！');
        } else if(password ==''||password == null){
            alert('请填写密码！');
        } else if(validate == ''||validate == null){
            alert('请填写验证码！');
        }
        else {
            var type=this.getUrlParam("loginType");
            var product=parseInt(this.getUrlParam("product"));
            this.props.dispatch(UserActions.loginAction(username,password,validate,type,product));
        }
    },

    viewSwitch:function(ob){
        var view=ob;
        this.setState({view:view});
    },

    checkPasswordStatus:function(){
        var refsPage = this.refs['login-register-forget'];
        var value = $(refsPage).find("input[name='password']").val();
        var len = value.length;
        var element = this.refs['safely'];

        var regxs = [];
        regxs.push(/[^a-zA-Z0-9_]/g);
        regxs.push(/[a-zA-Z]/g);
        regxs.push(/[0-9]/g);

        var sec = 0;
        if (len >= 6) { // 至少六个字符
            for (var i = 0; i < regxs.length; i++) {
                if (value.match(regxs[i])) {
                    sec++;
                }
            }
        } else{
            sec = 0;
        }
        var result = (sec / regxs.length) * 100;
        if(result == 0){
            $(element).removeClass('safely-general');
            $(element).removeClass('safely-safe');
            $(element).removeClass('safely-danger');
        }else if(result > 0 && result <= 50){
            $(element).removeClass('safely-general');
            $(element).removeClass('safely-safe');
            $(element).addClass('safely-danger');
        }else if (result > 50 && result < 100) {
            $(element).removeClass('safely-danger');
            $(element).removeClass('safely-safe');
            $(element).addClass('safely-general');
        } else if (result == 100) {
            $(element).removeClass('safely-danger');
            $(element).removeClass('safely-general');
            $(element).addClass('safely-safe');
        }
    },

    isRegisterAsTrainer:function(){

        var registerPage = this.refs['registerPage'];
        var isTrainer = $(registerPage).find("input[name='isTrainer']:checked").val();
        var sportsLevel = $(registerPage).find('#sportsLevel');

        var inThis=this;
        var url = '/func/register/getAthleteLevel';
        if(isTrainer!== undefined && isTrainer!==null){
            sportsLevel.css('display','');
            ProxyQ.query(
                'GET',
                url,
                null,
                null,
                function (re) {
                    var reCode = re.reCode;
                    if(reCode==0 || reCode=='0'){
                        var sportsLevel=re.resList;
                        inThis.setState({sportsLevel:sportsLevel});
                    }
                },
                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }
            );
        }else{
            sportsLevel.css('display','none');
        }

    },

    register:function(){
        var type=this.getUrlParam("loginType");
        var product=this.getUrlParam("product");
        var registerPage = this.refs['registerPage'];
        var userName = $(registerPage).find("input[name='userName']").val();
        var password = $(registerPage).find("input[name='password']").val();
        var ackPassword = $(registerPage).find("input[name='ackPassword']").val();
        var verifyCode = $(registerPage).find("input[name='verifyCode']").val();
        var phoneNum = $(registerPage).find("input[name='phoneNum']").val();

        var isTrainer = $(registerPage).find("input[name='isTrainer']:checked").val();
        var sportsLevel = "";
        if(isTrainer!== undefined && isTrainer!==null){
            sportsLevel = $('#sportsLevel option:selected').val();
        }
        var phoneReg = /^1[34578]\d{9}$/;

        if (userName == "") {
            Tips.showTips('请填写用户名~');
        } else if (password == "") {
            Tips.showTips('请填写密码~');
        } else if (password.length<6) {
            Tips.showTips('密码至少为6位~');
        } else if (ackPassword == "") {
            Tips.showTips('请再次输入密码~');
        } else if (phoneNum == "") {
            Tips.showTips('请填写手机号~');
        } else if(!(phoneReg.test(phoneNum))){
            Tips.showTips("手机号码有误，请重新填写~");
        } else if (verifyCode == "") {
            Tips.showTips('请填写验证码~');
        } else if(this.state.verifyCode == null || this.state.verifyCode == undefined) {
            Tips.showTips('验证码失效，请重新获取~');
        } else if(verifyCode!==this.state.verifyCode) {
            Tips.showTips('验证码不正确~');
        } else if (sportsLevel == "-1" || sportsLevel == -1) {
            Tips.showTips('请选择运动员水平~');
        } else{

            var url = '/func/register/userRegister';
            var params={
                userName:userName,
                password:password,
                phoneNum:phoneNum,
                sportsLevel:sportsLevel
            };
            ProxyQ.query(
                'POST',
                url,
                params,
                null,
                function (re) {
                    var reCode = re.reCode;
                    if(reCode==0 || reCode=='0'){
                       alert(re.response);
                    }else{
                        alert(re.response);
                    }
                },
                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }
            );
        }
    },

    ackPassword:function(){ //检查两次密码输入是否一致
        var refsPage = this.refs['login-register-forget'];
        var password = $(refsPage).find("input[name='password']").val();
        var ackPassword = $(refsPage).find("input[name='ackPassword']").val();
        if(password==ackPassword){
            return;
        }else{
            Tips.showTips('两次输入密码不一致！');
        }
    },

    verifyCodeTimeOut:function(){  //获取验证码倒计时
        var refsPage = this.refs['login-register-forget'];
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
        var refsPage = this.refs['login-register-forget'];
        var phoneNum = $(refsPage).find("input[name='phoneNum']").val();
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

    submit:function(){ //修改密码提交按钮
        var forgetPage = this.refs['forgetPage'];
        var userName = $(forgetPage).find("input[name='userName']").val();
        var password = $(forgetPage).find("input[name='password']").val();
        var ackPassword = $(forgetPage).find("input[name='ackPassword']").val();
        var phoneNum = $(forgetPage).find("input[name='phoneNum']").val();
        var verifyCode = $(forgetPage).find("input[name='verifyCode']").val();
        var phoneReg = /^1[34578]\d{9}$/;

        if (userName == "") {
            Tips.showTips('请填写用户名~');
        } else if (password == "") {
            Tips.showTips('请填写密码~');
        } else if (password.length<6) {
            Tips.showTips('密码至少为6位~');
        } else if (ackPassword == "") {
            Tips.showTips('请再次输入密码~');
        } else if (password != ackPassword) {
            Tips.showTips('两次输入密码不一致~');
        } else if (phoneNum == "") {
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
            var url="/func/modify/modifyPassword";
            var params={
                userName:userName,
                password:password,
                phoneNum:phoneNum,
            };
            ProxyQ.query(
                'post',
                url,
                params,
                null,
                function(re) {
                    var reCode = re.reCode;
                    if(reCode==0 || reCode=='0'){
                        alert(re.response);
                    }else{
                        alert(re.response);
                    }
                }.bind(this),
                function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
    },

    loginSetCookie:function(username,password){
        var userValue = username;
        //alert(userValue);
        var exp = new Date();
        exp.setTime(exp.getTime() + (30*24*60*60*1000));
        window.document.cookie = "username=" + escape (userValue) + "; expires=" + exp.toGMTString()+";path=/";

        var auto = document.getElementById("login_autoLoginCheckbox").checked;

        if(auto)
        {
            var password = password;
            window.document.cookie = "password="+escape(password)+"; expires=" + exp.toGMTString()+";path=/";
            window.document.cookie = "autocheck=true; expires="+ exp.toGMTString()+";path=/";
        }else{
            window.document.cookie = "password=; expires=" + exp.toGMTString()+";path=/";
            window.document.cookie = "autocheck=false; expires="+ exp.toGMTString()+";path=/";
        }

    },

    loginAutoLogin:function (){
        this.loginGetCookie("login_strLoginName","username");
        this.loginGetCookie("login_strPassword","password");
        this.loginCheckAuto();
    },

    loginCheckAuto:function (){
        var checkValue = this.loginGetCookieValue("autocheck");
        if(checkValue=="true")
            document.all("login_autoLoginCheckbox").checked = checkValue;
    },

    loginGetCookieValue:function (name){
        var arg = name + "="; // 要查找的对象
        var arglength = arg.length;
        var cookielength = window.document.cookie.length;
        var i = 0;
        while (i < cookielength)
        {
            var j = i + arglength;
            if (window.document.cookie.substring(i, j) == arg) {
                return this.loginGetCookieVal (j);
            }
            i = window.document.cookie.indexOf(" ", i) + 1;
            if (i == 0)
                break;
        }
        return null;
    },

    loginGetCookie:function(showText, name){
        var arg = name + "="; // 要查找的对象
        var arglength = arg.length;
        var cookielength = window.document.cookie.length;
        var i = 0;
        while (i < cookielength)
        {
            var j = i + arglength;
            if (window.document.cookie.substring(i, j) == arg) {
                var a=this.loginGetCookieVal (j)
                document.getElementById(showText).value = a;
                return true;
            }
            i = window.document.cookie.indexOf(" ", i) + 1;
            if (i == 0)
                break;
        }
        return true;
    },
    loginGetCookieVal:function  (offset) {
        var endstr = window.document.cookie.indexOf (";", offset);
        if (endstr == -1)
            endstr = window.document.cookie.length;
        return unescape(window.document.cookie.substring(offset, endstr));
    },

    getInitialState:function(){
        var path='/app';
        var type=this.getUrlParam("loginType");
        //var path = SyncStore.getRouter();
        //SyncStore.setRouter(null);
        return ({view:'login', path:path, verifyCode: null, sportsLevel: null,type:type});
    },

    repaintImage:function (){
        var img = $("#validateImage");
        img.attr('src',"/validatecode.jpg?rnd=" + Math.random());// 防止浏览器缓存的问题
    },

    render:function(){
        var mainContent;
        var view=this.state.view;
        var a=this.props.token;
        var product=parseInt(this.getUrlParam("product"));
        switch(view){
            case 'login':
                mainContent=
                    <div ref="loginPage"  onLoad={this.loginAutoLogin}>
                        <div className="main-form">
                            <div className="passport-tab" id="login-tabs">
                                <div className="tabs">
                                    <ul>
                                        <li className="active">登录</li>
                                    </ul>
                                </div>

                                <div className="tabbed">
                                    <div className="tab-group" style={{display: 'block'}}>
                                        <div className="passport-form passport-form-sign" id="login-form">
                                            <div className="form-item">
                                                <div className="form-cont">
                                                    <input type="text" name="username" id="login_strLoginName" className="passport-txt xl w-full" tabIndex="1" placeholder="用户名/手机号" autoComplete="off"/>
                                                </div>
                                            </div>

                                            <div className="form-item">
                                                <div className="form-cont">
                                                    <input type="password" name="password" id="login_strPassword" className="passport-txt xl w-full" tabIndex="2" placeholder="请输入密码" autoComplete="off"/>
                                                </div>
                                            </div>
                                            <table id="tableVerify" className="form-item">
                                                <tbody>
                                                <tr >
                                                    <td>验证码: </td>
                                                    <td><input type="text" name="verify" id="verify" className="passport-txt xl w-full" /></td>
                                                    <td><img style={{paddingLeft:'10px'}} id="validateImage" src="badmintonhot/validatecode.jpg" /></td>
                                                    <td><img style={{paddingLeft:'5px'}} onClick={this.repaintImage} src={window.App.getResourceDeployPrefix()+"/images/refresh1.png"} ></img></td>
                                                    <td><span id="verifyMsg" className="errorMessage"></span></td>
                                                </tr>
                                                </tbody>
                                            </table>

                                            <div className="form-item form-sevenday">
                                                <div className="form-cont clearfix">
                                                    <label><input type="checkbox" id="login_autoLoginCheckbox" className="remember" tabIndex="2" />记住密码</label>
                                                    <a className="forget-link" onClick={this.viewSwitch.bind(this,'forget')}>忘记密码</a>
                                                </div>
                                            </div>



                                            <div className="form-item">
                                                <div className="form-cont">

                                                    <button type="button" id="login" className="passport-btn passport-btn-def xl w-full" tabIndex="4" onClick={this.login}>
                                                        <a style={{color:'#ffffff'}}>登录</a>
                                                        {this.state.type==null?
                                                            <Link to={window.App.getAppRoute() + '/training'} id="goToOther"></Link>:
                                                            <Link to={window.App.getAppRoute() + '/order?product='+product} id="goToOther"></Link>
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="aside">
                            <div className="passport-goto">没有账号?
                                <a tabIndex="6" className="direct" onClick={this.viewSwitch.bind(this,'register')}>新用户注册</a>
                            </div>
                            <div className="sendgift"></div>
                            <div className="passport-third">
                                <header className="hd">
                                    <div className="layout-inner">
                                        <h3>BadmintonHot</h3>
                                    </div>
                                </header>
                                <div className="links">
                                    <img src={window.App.getResourceDeployPrefix()+"/images/ayk.png"} />
                                </div>
                            </div>
                        </div>

                    </div>
                break;
            case 'register':

                var sportsLevel=this.state.sportsLevel;
                if(sportsLevel !==undefined && sportsLevel !==null){
                    var relative_add_trs=[];
                    sportsLevel.map(function(item, i){
                        relative_add_trs.push(<option key={i} value={item.value}>{item.label}</option>);
                    });
                }

                mainContent=
                    <div ref="registerPage">
                        <div className="main-form">
                            <div className="passport-tab" id="login-tabs">
                                <div className="tabs">
                                    <ul>
                                        <li className="active">新用户注册</li>
                                    </ul>
                                </div>

                                <div className="passport-form passport-form-sign" id="register-form">
                                    <div className="form-item">
                                        <div className="form-cont">
                                            <input type="text" name="userName" className="passport-txt xl w-full" tabIndex="1" autoComplete="off" placeholder="请输入用户名/手机号"/>
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <div className="form-cont">
                                            <input type="password" name="password" className="passport-txt xl w-full" tabIndex="2" autoComplete="off" onKeyUp={this.checkPasswordStatus} placeholder="请输入密码"/>
                                            <ul className="passport-safely" ref="safely">
                                                <li className="danger">弱</li>
                                                <li className="general">中</li>
                                                <li className="safe">高</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <div className="form-cont">
                                            <input type="password" name="ackPassword" className="passport-txt xl w-full" tabIndex="3" autoComplete="off" onBlur={this.ackPassword} placeholder="请再次输入密码"/>
                                        </div>
                                    </div>

                                    <div className="form-item form-mcode mb-25">
                                        <div className="form-cont">
                                            <input type="text" name="phoneNum" className="passport-txt xl w-full" tabIndex="5" maxLength="11" autoComplete="off" placeholder="请输入手机号"/>
                                            <div className="btn-getcode">
                                                <button type="button" className="passport-btn js-getcode" id="J_getCode" onClick={this.getVerifyCode}>发送验证码</button>
                                            </div>
                                            <div className="btn-getcode">
                                                <button type="button" className="passport-btn js-getcode" id="J_resetCode" style={{display:'none'}}><span id="J_second">60</span>秒后重发</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-item">
                                        <div className="form-cont">
                                            <input type="text" name="verifyCode" className="passport-txt xl w-full" tabIndex="6" autoComplete="off" placeholder="请输入验证码"/>
                                        </div>
                                    </div>

                                    {/*<div className="form-item" >
                                        <span>是否注册为教练&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <span className="form-cont">
                                            <input name="isTrainer" type="checkbox" tabIndex="7" className="is-Trainer" onClick={this.isRegisterAsTrainer}/>

                                            <select style={{marginLeft:'15px', color:'#000000!important', width:'180px', height:'35px', display:'none'}} id="sportsLevel">
                                                <option value={-1}>请选择运动水平</option>
                                                {relative_add_trs}
                                            </select>
                                        </span>

                                    </div>*/}


                                    <div className="form-item">
                                        <div className="form-cont">
                                            <button type="button" name="register" id="register" className="passport-btn passport-btn-def xl w-full" tabIndex="7" onClick={this.register}>注册</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="aside">
                            <div className="passport-goto mg-b100">已有帐号
                                <a tabIndex="6" className="direct" onClick={this.viewSwitch.bind(this,'login')}>直接登录</a>
                            </div>
                            <div className="passport-third">
                                <header className="hd">
                                    <div className="layout-inner">
                                        <h3>BadmintonHot</h3>
                                    </div>
                                </header>
                                <div className="links">
                                    <img src={window.App.getResourceDeployPrefix()+"/images/ayk.png"} />
                                </div>
                            </div>
                        </div>
                    </div>
                break;
            case 'forget':
                mainContent=
                    <div ref="forgetPage">
                        <div className="main-form">
                            <div className="passport-tab" id="login-tabs">
                                <div className="tabs">
                                    <ul>
                                        <li className="active">密码重置</li>
                                    </ul>
                                </div>

                                <div className="passport-form passport-form-sign" id="register-form">
                                    <div className="form-item">
                                        <div className="form-cont">
                                            <input type="text" name="userName" className="passport-txt xl w-full" tabIndex="1" autoComplete="off" placeholder="请输入用户名"/>
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <div className="form-cont">
                                            <input type="password" name="password" className="passport-txt xl w-full" tabIndex="2" autoComplete="off" onKeyUp={this.checkPasswordStatus} placeholder="请输入新密码"/>
                                            <ul className="passport-safely" ref="safely">
                                                <li className="danger">弱</li>
                                                <li className="general">中</li>
                                                <li className="safe">高</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <div className="form-cont">
                                            <input type="password" name="ackPassword" className="passport-txt xl w-full" tabIndex="3" autoComplete="off" onBlur={this.ackPassword} placeholder="请再次输入新密码"/>
                                        </div>
                                    </div>
                                    <div className="form-item form-mcode mb-25">
                                        <div className="form-cont">
                                            <input type="text" name="phoneNum" className="passport-txt xl w-full" tabIndex="4" maxLength="11" autoComplete="off" placeholder="请输入手机号"/>
                                            <div className="btn-getcode">
                                                <button type="button" className="passport-btn js-getcode" id="J_getCode" onClick={this.getVerifyCode}>发送验证码</button>
                                            </div>
                                            <div className="btn-getcode">
                                                <button type="button" className="passport-btn js-getcode" id="J_resetCode" style={{display:'none'}}><span id="J_second">60</span>秒后重发</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-item">
                                        <div className="form-cont">
                                            <input type="text" name="verifyCode" className="passport-txt xl w-full" tabIndex="5" autoComplete="off" placeholder="请输入验证码"/>
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <div className="form-cont">
                                            <button type="button" name="forget" id="forget" className="passport-btn passport-btn-def xl w-full" tabIndex="6" onClick={this.submit}>提交</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="aside">
                            <div className="passport-goto mg-b100">密码已找回
                                <a tabIndex="6" onClick={this.viewSwitch.bind(this,'login')}>直接登录</a></div>
                            <div className="passport-third">
                                <header className="hd">
                                    <div className="layout-inner">
                                        <h3>BadmintonHot</h3>
                                    </div>
                                </header>
                                <div className="links">
                                    <img src={window.App.getResourceDeployPrefix()+"/images/ayk.png"} />
                                </div>
                            </div>
                        </div>
                    </div>
                break;
        }


        return(
            <div className="container" style={{position: 'absolute',height: '100%', width: '100%',background:'url('+window.App.getResourceDeployPrefix()+'/images/loginbg.jpg)'}}>
            <div className="passport-wrapper">

                <div id="container" ref='login-register-forget'>
                    <div className="passport-sign">

                        {mainContent}

                    </div>
                </div>
                </div>
            </div>
        )
    },

    componentDidMount:function () {
        this.repaintImage();
    },

});

const mapStateToProps = (state, ownProps) => {

    const props = {
        token: state.userInfo.accessToken,
        name: state.userInfo.loginName,
        personId:state.userInfo.personId
    }

    return props
}
export default connect(mapStateToProps)(Login);



