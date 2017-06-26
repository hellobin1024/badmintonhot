/**
 * Created by douxiaobin on 2016/10/27.
 */
import React from 'react';
import {render} from 'react-dom';
import '../../css/entry/modules/modifyPassword.css';
var ProxyQ = require('../../components/proxy/ProxyQ');

var ModifyPassword=React.createClass({

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

    doModifyPwd:function(){
        var selfPersonInfo = this.refs.modifyPersonInfo;
        var oldpwd=$(selfPersonInfo).find("input[name='oldpwd']").val();
        var newpwd=$(selfPersonInfo).find("input[name='newpwd']").val();
        var renewpwd=$(selfPersonInfo).find("input[name='renewpwd']").val();

        if (oldpwd == '') {
            this.showTips('请输入旧密码~');
        } else if (newpwd == '') {
            this.showTips('请输入新密码~');
        } else if (newpwd.length<6) {
            this.showTips('密码至少为6位~');
        } else if (renewpwd == '') {
            this.showTips('请再次输入新密码~');
        } else {

            var url="/func/manageBean/doModifyPwd";
            var params={
                personId:this.state.personId,
                oldpwd:oldpwd,
                newpwd:newpwd
            };

            ProxyQ.query(
                'post',
                url,
                params,
                null,
                function(ob) {
                    var reCode = ob.reCode;
                    if(reCode!==undefined && reCode!==null && (reCode ==0 || reCode =="0")) { //成功
                        alert("密码修改成功！");
                    }

                }.bind(this),
                function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
    },

    getInitialState:function(){
        var personId = null;
        if(this.props.personId!==undefined && this.props.personId!==null){
            personId = this.props.personId;
        }
        return ({personId:personId});
    },

    render:function(){
        var mainContent;

        mainContent=
            <div ref="modifyPersonInfo" style={{marginTop:'50px'}}>

                <div className="modify_control_group">
                    <div className="modify_label" style={{float:'left',width:'60px'}}>
                        <span className="modify_label" >原密码</span>
                    </div>
                    <div className="modify_conte" style={{float:'left'}} >
                        <input name="oldpwd" type="password" defaultValue="" maxLength="25" className="inputStyle"/>
                    </div>
                    {/*
                    <div className="modify_span" style={{float:'left',width:'120px',marginLeft:'15px'}}>
                        <span className="modify_span" >忘记密码？</span>
                    </div> */}
                </div>
                <div className="clear"></div>
                <div className="modify_control_group" >
                    <div className="modify_label" style={{float:'left',width:'60px'}}>
                        <span className="modify_label">新密码</span>
                    </div>
                    <div className="modify_conte" style={{float:'left',width:'198px'}}>
                        <input name="newpwd" type="password" defaultValue="" className="inputStyle" />
                    </div>
                </div>
                <div className="clear"></div>
                <div className="modify_label">
                    <div className="modify_control_group"  style={{float:'left',width:'60px'}}>
                        <span className="modify_label">确认密码</span>
                    </div>
                    <div className="modify_conte"  style={{float:'left'}}>
                        <input name="renewpwd" type="password" defaultValue="" className="inputStyle"/>
                    </div>
                </div>
                <div className="clear"></div>
                <div className="toolBar">
                    <button className="modifyBtn" onClick={this.doModifyPwd}>提交</button>
                </div>
            </div>

        return(
            <div style={{marginLeft:'100pX'}}>
                {mainContent}
            </div>
        );
    },
});
module.exports=ModifyPassword;
/**
 * Created by douxiaobin on 2016/10/27.
 */
