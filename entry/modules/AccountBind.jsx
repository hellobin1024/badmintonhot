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
        var url="/func/manageBean/accountBindInit";
        var params={};

        ProxyQ.query(
            'get',
            url,
            params,
            null,
            function(ob) {
                var reCode = ob.reCode;
                if(reCode!==undefined && reCode!==null && (reCode ==1 || reCode =="1")) { //数据获取失败
                    return;
                }
                var weichat=ob.resList.weichat;
                var phoneNum=ob.resList.phoneNum;
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
        return ({view:'bindall', init:null});
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
                                         src={window.App.getResourceDeployPrefix()+"/images/wechat.jpg"}></img>
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
                        <div ref="accPersonInfo" style={{marginTop:'50px'}}>

                            <div className="acc_control_group">
                                <div className="acc_label" style={{float:'left',width:'60px'}}>
                                    <span className="acc_label" >微信号：</span>
                                </div>
                                <div className="acc_conte" style={{float:'left'}} >
                                    <input name="weichat" defaultValue="" maxLength="25" className="inputStyle" placeholder=""/>
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
                                    <input name="verifyCode" defaultValue="" maxLength="25" className="inputStyle" placeholder=""/>
                                </div>
                            </div>
                            <div className="clear"></div>
                            <div className="toolBar">
                                <button className="wechatBtn" onClick={this.doSaveSelfInfo.bind(null,this.state.customerId)}>保存</button>
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
                                    <input name="phoneNum" defaultValue="" maxLength="25" className="inputStyle" placeholder=""/>
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
                                    <input name="verifyCode" defaultValue="" maxLength="25" className="inputStyle" placeholder=""/>
                                </div>
                            </div>
                            <div className="clear"></div>
                            <div className="toolBar">
                                <button className="wechatBtn" onClick={this.doSaveSelfInfo.bind(null,this.state.customerId)}>保存</button>
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
module.exports=accountBind;
/**
 * Created by douxiaobin on 2016/10/27.
 */
