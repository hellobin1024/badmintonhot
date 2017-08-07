/**
 * Created by douxiaobin on 2016/10/27.
 */
import React from 'react';
import {render} from 'react-dom';
import '../../css/entry/modules/selleBase.css';

var Tips = require('../../components/basic/Tips');

var ProxyQ = require('../../components/proxy/ProxyQ');

var SelfBaseInfo=React.createClass({

    doSaveSelfInfo:function(){
        var personId=this.state.data.personId;
        var selfPersonInfo = this.refs.selfPersonInfo;
        var perName=$(selfPersonInfo).find("input[name='perName']").val();
        var genderCode=$(selfPersonInfo).find("input[name='genderCode']:checked").val();
        var phoneNum=$(selfPersonInfo).find("input[name='mobilePhone']").val();
        var qq=$(selfPersonInfo).find("input[name='QQ']").val();
        var wechat=$(selfPersonInfo).find("input[name='wechat']").val();
        var phoneReg = /^1[34578]\d{9}$/;

        if (perName == '') {
            Tips.showTips('请填写您的姓名~');
        } else if (genderCode == '') {
            Tips.showTips('请选择您的性别~');
        } else if (phoneNum == '') {
            Tips.showTips('请输入您的电话号码~');
        } else if(!(phoneReg.test(phoneNum))){
            Tips.showTips("手机号码有误，请重新填写~");
        } else if (qq == '') {
            Tips.showTips('请输入您的qq号~');
        } else if (wechat == '') {
            Tips.showTips('请输入您的微信号~');
        } else {
            var url="/func/manageBean/doSave";
            var params={
                personId:personId,
                perName:perName,
                genderCode:genderCode,
                phoneNum:phoneNum,
                qq:qq,
                wechat:wechat
            };

            ProxyQ.query(
                'post',
                url,
                params,
                null,
                function(ob) {
                    var reCode = ob.re;
                    if(reCode!==undefined && reCode!==null && (reCode ==1 || reCode =="1")) { //成功
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
                var data=ob.data;
                var genderCode = data.genderCode;
                this.setState({data:data, genderCode:genderCode});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },

    getInitialState:function(){
        return ({data:null, gender:null});
    },

    render:function(){
        var mainContent;

        if(this.state.data!==undefined && this.state.data!==null){
            mainContent=
                <div ref="selfPersonInfo" style={{marginTop:'50px'}}>

                    <div className="self_control_group">
                        <div className="self_label" style={{float:'left'}}>
                            <span className="self_label" >用户姓名</span>
                        </div>
                        <div className="self_conte" style={{float:'left'}} >
                            <input name="perName" defaultValue={this.state.data.perName} maxLength="25" className="inputStyle"/>
                        </div>
                    </div>

                    <div className="clear"></div>
                    <div className="self_control_group" >
                        <div className="self_label" style={{float:'left',width:'60px'}}>
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
                        <div className="self_label" style={{float:'left',width:'60px'}}>
                            <span className="self_label">电话</span>
                        </div>
                        <div className="self_conte" style={{float:'left',width:'198px'}}>
                            <input name="mobilePhone" defaultValue={this.state.data.mobilePhone} className="inputStyle" />
                        </div>
                    </div>
                    <div className="clear"></div>

                    <div className="self_label">
                        <div className="self_control_group"  style={{float:'left',width:'60px'}}>
                            <span className="self_label">QQ</span>
                        </div>
                        <div className="self_conte"  style={{float:'left'}}>
                            <input name="QQ" defaultValue={this.state.data.qq} className="inputStyle" />
                        </div>
                    </div>
                    <div className="clear"></div>
                    <div className="self_label">
                        <div className="self_control_group"  style={{float:'left',width:'60px'}}>
                            <span className="self_label">微信</span>
                        </div>
                        <div className="self_conte"  style={{float:'left'}}>
                            <input name="wechat" defaultValue={this.state.data.wechat}  className="inputStyle"/>
                        </div>
                    </div>
                    <div className="clear"></div>
                    <div className="toolBar">
                        <button className="saveBtn" href="javascript:;" onClick={this.doSaveSelfInfo}>保存</button>
                    </div>
                </div>
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
module.exports=SelfBaseInfo;
/**
 * Created by douxiaobin on 2016/10/27.
 */
