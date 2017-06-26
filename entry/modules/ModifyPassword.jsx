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

    doModifySelfInfo:function(ob){
        var personId=ob;
        var modifyPersonInfo = this.refs.modifyPersonInfo;
        var oldpwd=$(modifyPersonInfo).find("input[name='oldpwd']").val();
        var newpwd=$(modifyPersonInfo).find("input[name='newpwd']").val();
        var repwd=$(modifyPersonInfo).find("input[name='repwd']").val();


        if (oldpwd == '') {
            this.showTips('请填写您的原密码~');
        } else if (newpwd == '') {
            this.showTips('请输入您的新密码~');
        } else if (repwd == '') {
            this.showTips('请再输一遍新密码~');
        } else if (repwd != newpwd) {
            this.showTips('两次输入密码不一致~');
        } else {
            //this.showTips('提交成功~', 2500, 1);

            var url="/func/manageBean/doModifyPwd";
            var params={
                personId:personId,
                oldpwd:oldpwd,
                newpwd:newpwd,
                repwd:repwd
            };

            ProxyQ.query(
                'post',
                url,
                params,
                null,
                function(ob) {
                    var reCode = ob.reCode;
                    if(reCode==undefined && reCode==null){
                        alert("密码修改错误！");
                    }
                    if(reCode!==undefined && reCode!==null && (reCode ==1 || reCode =="1")) { //数据获取失败

                        alert("原密码输入错误！");
                    }
                    if(reCode!==undefined && reCode!==null && (reCode ==0 || reCode =="0")) { //数据获取成功
                        alert("密码修改成功！");
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
                this.setState({data:data});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },


    getInitialState:function(){
        return ({data:null,
            customerId:null,});
    },

    render:function(){
        var mainContent;
        var data;

        if(this.state.data!==undefined && this.state.data!==null){
        mainContent=
            <div ref="modifyPersonInfo" style={{marginTop:'50px'}}>

                <div className="modify_control_group">
                    <div className="modify_label" style={{float:'left',width:'60px'}}>
                        <span className="modify_label" >原密码</span>
                    </div>
                    <div className="modify_conte" style={{float:'left'}} >
                        <input name="oldpwd" defaultValue="" maxLength="25" className="inputStyle"/>
                    </div>
                    <div className="modify_span" style={{float:'left',width:'120px',marginLeft:'15px'}}>
                        <span className="modify_span" >忘记密码？</span>
                    </div>
                </div>
                <div className="clear"></div>
                <div className="modify_control_group" >
                    <div className="modify_label" style={{float:'left',width:'60px'}}>
                        <span className="modify_label">新密码</span>
                    </div>
                    <div className="modify_conte" style={{float:'left',width:'198px'}}>
                        <input name="newpwd" defaultValue="" className="inputStyle" />
                    </div>
                </div>
                <div className="clear"></div>
                <div className="modify_label">
                    <div className="modify_control_group"  style={{float:'left',width:'60px'}}>
                        <span className="modify_label">确认密码</span>
                    </div>
                    <div className="modify_conte"  style={{float:'left'}}>
                        <input name="repwd" defaultValue="" className="inputStyle"/>
                    </div>
                </div>
                <div className="clear"></div>
                <div className="toolBar">
                    <button className="modifyBtn" href="javascript:;" onClick={this.doModifySelfInfo.bind(null,this.state.data.personId)}>确认修改</button>
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
module.exports=ModifyPassword;
/**
 * Created by douxiaobin on 2016/10/27.
 */
