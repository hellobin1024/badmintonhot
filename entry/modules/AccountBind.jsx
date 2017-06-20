/**
 * Created by douxiaobin on 2016/10/27.
 */
import React from 'react';
import {render} from 'react-dom';
import '../../css/entry/modules/accountBind.css';
var ProxyQ = require('../../components/proxy/ProxyQ');

var accountBind=React.createClass({

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
    viewSwitch:function(ob){
        var view=ob;
        this.setState({view:view});
    },
    doSaveSelfInfo:function(ob){
        var customerId=ob;
        var selfPersonInfo = this.refs.selfPersonInfo;
        var perName=$(selfPersonInfo).find("input[name='perName']").val();
        var perIdCard=$(selfPersonInfo).find("input[name='perIdCard']").val();
        var phoneNum=$(selfPersonInfo).find("input[name='phoneNum']").val();
        var postCode=$(selfPersonInfo).find("input[name='postCode']").val();
        var address=$(selfPersonInfo).find("input[name='address']").val();

        if (perName == '') {
            this.showTips('请填写您的姓名~');
        } else if (perIdCard == '') {
            this.showTips('请输入您的证件号码~');
        } else if (phoneNum == '') {
            this.showTips('请输入您的电话号码~');
        } else if (postCode == '') {
            this.showTips('请输入您的邮编~');
        } else if (address == '') {
            this.showTips('请输入您的地址~');
        } else {
            //this.showTips('提交成功~', 2500, 1);

            var url="/insurance/insuranceReactPageDataRequest.do";
            var params={
                reactPageName:'insurancePersonalCenterPersonInfo',
                reactActionName:'setInsuranceCustomerInfo',
                customerId:this.state.customerId,
                perName:perName,
                perIdCard:perIdCard,
                phoneNum:phoneNum,
                postCode:postCode,
                address:address
            };

            ProxyQ.queryHandle(
                'post',
                url,
                params,
                null,
                function(ob) {

                }.bind(this),
                function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
    },

    initialData:function(){
        var url="/insurance/insuranceReactPageDataRequest.do";
        var params={
            reactPageName:'insurancePersonalCenterPersonInfo',
            reactActionName:'getInsuranceCustomerInfo',
        };

        ProxyQ.queryHandle(
            'post',
            url,
            params,
            null,
            function(ob) {
                var re = ob.re;
                if(re!==undefined && re!==null && (re ==2 || re =="2")) { //登录信息为空
                    return;
                }
                var data=ob.data;
                var customerId=ob.customerId;
                this.setState({
                    data:data,
                    customerId:customerId
                });
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },

    getInitialState:function(){
        return ({view:'bindall',data:null,
            customerId:null,});
    },

    render:function(){
        var mainContent;
        var data;
        switch(this.state.view) {
            case 'bindall':
                mainContent =
                    <div ref="accPersonInfo" style={{marginTop:'50px'}}>

                        <div className="acc_control_group">
                            <div className="acc_conte" style={{float:'left'}}>
                                <img style={{paddingLeft:'5px'}}
                                     src={window.App.getResourceDeployPrefix()+"/images/wechat.jpg"}></img>
                            </div>
                            <div className="acc_span" style={{float:'left',width:'120px',marginLeft:'15px'}}>
                                <span className="acc_span">微信绑定</span>
                            </div>
                        </div>
                        <div className="toolBar">
                            <button className="accBtn" href="javascript:;"
                                    onClick={this.viewSwitch.bind(this,'bindwechat')}>去绑定
                            </button>
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
                            <button className="baccBtn" href="javascript:;" onClick={this.viewSwitch.bind(this,'bindphone')}>去绑定</button>
                        </div>
                        <div className="clear"></div>
                    </div>
                break;
            case 'bindwechat':
                mainContent =
                    <div ref="accPersonInfo" style={{marginTop:'50px'}}>

                        <div className="acc_control_group">
                            <div className="acc_label" style={{float:'left',width:'60px'}}>
                                <span className="acc_label" >微信号：</span>
                            </div>
                            <div className="acc_conte" style={{float:'left'}} >
                                <input name="oldpwd" defaultValue="" maxLength="25" className="inputStyle" placeholder="  请输入正确的微信号"/>
                            </div>
                            <div className="toolBar">
                                <button className="caccBtn" href="javascript:;" onClick={this.doSaveSelfInfo.bind(null,this.state.customerId)}>获取验证码
                                </button>
                            </div>
                        </div>
                        <div className="clear"></div>
                        <div className="acc_control_group">
                            <div className="acc_label" style={{float:'left',width:'60px'}}>
                                <span className="acc_label" >验证码：</span>
                            </div>
                            <div className="acc_conte" style={{float:'left'}} >
                                <input name="oldpwd" defaultValue="" maxLength="25" className="inputStyle" placeholder="  请输入收到的验证码"/>
                            </div>
                        </div>
                        <div className="clear"></div>
                        <div className="toolBar">
                            <button className="wechatBtn" href="javascript:;" onClick={this.doSaveSelfInfo.bind(null,this.state.customerId)}>完成绑定</button>
                        </div>
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
                                <input name="oldpwd" defaultValue="" maxLength="25" className="inputStyle" placeholder="  请输入正确的手机号"/>
                            </div>
                            <div className="toolBar">
                                <button className="caccBtn" href="javascript:;" onClick={this.doSaveSelfInfo.bind(null,this.state.customerId)}>获取验证码
                                </button>
                            </div>
                        </div>
                        <div className="clear"></div>
                        <div className="acc_control_group">
                            <div className="acc_label" style={{float:'left',width:'60px'}}>
                                <span className="acc_label" >验证码：</span>
                            </div>
                            <div className="acc_conte" style={{float:'left'}} >
                                <input name="oldpwd" defaultValue="" maxLength="25" className="inputStyle" placeholder="  请输入收到的验证码"/>
                            </div>
                        </div>
                        <div className="clear"></div>
                        <div className="toolBar">
                            <button className="wechatBtn" href="javascript:;" onClick={this.doSaveSelfInfo.bind(null,this.state.customerId)}>完成绑定</button>
                        </div>
                    </div>
                break;
        }
        return(
            <div >
                {mainContent}
            </div>
        );
    },
});
module.exports=accountBind;
/**
 * Created by douxiaobin on 2016/10/27.
 */
