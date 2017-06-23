/**
 * Created by douxiaobin on 2016/10/27.
 */
import React from 'react';
import {render} from 'react-dom';
import '../../css/entry/modules/selleBase.css';
var ProxyQ = require('../../components/proxy/ProxyQ');

var SelfBaseInfo=React.createClass({

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

    doSaveSelfInfo:function(ob){
        var personId=ob;
        var selfPersonInfo = this.refs.selfPersonInfo;
        var perName=$(selfPersonInfo).find("input[name='perName']").val();
        var genderCode=$(selfPersonInfo).find("input[name='genderCode']:checked").val();
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
            var url="/func/manageBean/doSave";
            var params={
                personId:personId,
                perName:perName,
                genderCode:genderCode,
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
                    var reCode = ob.reCode;
                    if(reCode!==undefined && reCode!==null && (reCode ==0 || reCode =="0")) { //数据获取失败
                        alert("信息修改成功！");
                    }
                }.bind(this),
                function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
    },

    initialData:function(){
        var url="/func/manageBean/modify";
        var params={
            userName:'root',
            reactActionName:'1',
        };

        ProxyQ.query(
            'post',
            url,
            params,
            null,
            function(ob) {
                var reCode = ob.reCode;
                if(reCode!==undefined && reCode!==null && (reCode ==1 || reCode =="1")) { //数据获取失败
                    return;
                }

                var data=ob.resList[0];
                var genderCode = data.genderCode;
                this.setState({data:data, genderCode:genderCode});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },

    getInitialState:function(){
        return ({data:null,gender:null});
    },

    render:function(){
        var mainContent;

        if(this.state.data!==undefined && this.state.data!==null){
            mainContent=
                <div ref="selfPersonInfo" style={{marginTop:'50px'}}>

                    <div className="self_control_group">
                        <div className="self_label" style={{float:'left'}}>
                            <span className="self_label" >用户名</span>
                        </div>
                        <div className="self_conte" style={{float:'left'}} >
                            <input name="perName" defaultValue={this.state.data.perName} maxLength="25" className="inputStyle"/>
                        </div>
                    </div>

                    <div className="clear"></div>
                    <div className="self_control_group" >
                        <div className="self_label" style={{float:'left',width:'45px'}}>
                            <span className="self_label">性别</span>
                        </div>

                        {this.state.genderCode=='1' ?
                            <div className="self_conte" style={{float:'left',color:'#000000'}}>
                                <input name="genderCode" type="radio" value="1" defaultChecked="checked" style={{fontSize:'15px'}}/>男
                                <input name="genderCode" type="radio" value="2"  defaultChecked=""  style={{fontSize:'15px',marginLeft:'20px'}} />女
                            </div>
                            :
                            <div className="self_conte" style={{float:'left',color:'#000000'}}>
                                <input name="genderCode" type="radio" value="1" defaultChecked="" style={{fontSize:'15px'}}/>男
                                <input name="genderCode" type="radio" value="2"  defaultChecked="checked"  style={{fontSize:'15px',marginLeft:'20px'}} />女
                            </div>
                        }

                    </div>
                    <div className="clear"></div>
                    <div className="self_control_group" >
                        <div className="self_label" style={{float:'left',width:'45px'}}>
                            <span className="self_label">电话</span>
                        </div>
                        <div className="self_conte" style={{float:'left',width:'198px'}}>
                            <input name="mobilePhone" defaultValue={this.state.data.mobilePhone} className="inputStyle" />
                        </div>
                    </div>
                    <div className="clear"></div>
                    <div className="self_label">
                        <div className="self_control_group"  style={{float:'left',width:'45px'}}>
                            <span className="self_label">邮编</span>
                        </div>
                        <div className="self_conte"  style={{float:'left'}}>
                            <input name="perPostalCode" defaultValue={this.state.data.perPostalCode} className="inputStyle"/>
                        </div>
                    </div>
                    <div className="clear"></div>

                    <div className="self_label">
                        <div className="self_control_group"  style={{float:'left',width:'45px'}}>
                            <span className="self_label">地址</span>
                        </div>
                        <div className="self_conte"  style={{float:'left'}}>
                            <input name="perAddress" defaultValue={this.state.data.perAddress} className="inputStyle" />
                        </div>
                    </div>
                    <div className="clear"></div>

                    <div className="self_label">
                        <div className="self_control_group"  style={{float:'left',width:'45px'}}>
                            <span className="self_label">QQ</span>
                        </div>
                        <div className="self_conte"  style={{float:'left'}}>
                            <input name="QQ" defaultValue={this.state.data.QQ} className="inputStyle" />
                        </div>
                    </div>
                    <div className="clear"></div>
                    <div className="self_label">
                        <div className="self_control_group"  style={{float:'left',width:'45px'}}>
                            <span className="self_label">微信</span>
                        </div>
                        <div className="self_conte"  style={{float:'left'}}>
                            <input name="wechat" defaultValue={this.state.data.wechat}  className="inputStyle" className="inputStyle"/>
                        </div>
                    </div>
                    <div className="clear"></div>
                    <div className="toolBar">
                        <button className="saveBtn" href="javascript:;" onClick={this.doSaveSelfInfo.bind(null,this.state.data.personId)}>保存</button>
                    </div>
                </div>
        }else{
            this.initialData();
        }

        return(
            <div >
                {mainContent}
            </div>
        );
    },
});
module.exports=SelfBaseInfo;
/**
 * Created by douxiaobin on 2016/10/27.
 */
