/**
 * Created by dellbin on 2017/6/27.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';
import '../../css/entry/modules/create.css';

var Tips = require('../../components/basic/Tips');

var ProxyQ = require('../../components/proxy/ProxyQ');

var CreateGroup = React.createClass({

    doSave: function () {
        var createGroup = this.refs['createGroup'];
        var groupName = $(createGroup).find("input[name='groupName']").val();
        var groupBrief = $(createGroup).find("input[name='groupBrief']").val();
        var groupMaxMemNum = $(createGroup).find("input[name='groupMaxMemNum']").val();
        var remark =  $(createGroup).find("input[name='remark']").val();
        var reg = new RegExp("^[0-9]*$");

        if (groupName == "") {
            Tips.showTips('请填写群组名称~');
        } else if (groupBrief == "") {
            Tips.showTips('请填写群组简介~');
        } else if (groupMaxMemNum == "") {
            Tips.showTips('请填写群组最大人数~');
        } else if(!reg.test(groupMaxMemNum)){
            Tips.showTips("最大人数只能为 数字~");
        } else {

            var url="/func/groups/createGroup";
            var params={
                personId:this.state.personId,
                groupName:groupName,
                groupBrief:groupBrief,
                groupMaxMemNum:groupMaxMemNum,
                remark:remark
            };
            ProxyQ.query(
                'post',
                url,
                params,
                null,
                function(ob) {
                    var reCode = ob.reCode;
                    if(reCode!==undefined && reCode!==null && (reCode ==1 || reCode =="1")) { //操作失败
                        alert(ob.response);
                        return;
                    }
                    alert(ob.response);
                }.bind(this),
                function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
    },

    getInitialState: function () {
        var personId = null;
        if(this.props.personId!==undefined && this.props.personId){
            personId = this.props.personId;
        }
        return ({personId: personId, data:null});
    },

    render:function(){
        var mainContent = null;
        mainContent=
            <div ref="createGroup" className="c-block">
                <div className="common-line">
                    <span className="common-label l-label">群组名称：</span>
                        <span>
                            <input type="text" name="groupName" className="common-input" tabIndex="1"></input>
                        </span>

                    <span className="common-label r-label">群组简介：</span>
                        <span>
                            <input type="text" name="groupBrief" className="common-input" tabIndex="2"></input>
                        </span>
                </div>
                <div className="common-line">
                    <span className="common-label l-label">最多人数：</span>
                        <span>
                            <input type="text" name="groupMaxMemNum" className="common-input" tabIndex="5"></input>
                        </span>
                    <span className="common-label r-label" style={{marginLeft:'63px'}}>备&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                        <span>
                            <input type="text" name="remark" className="common-input" tabIndex="5"></input>
                        </span>
                </div>
                <div className="save-line">
                        <span>
                            <button className="save-Btn" onClick={this.doSave}>保存</button>
                        </span>
                </div>
            </div>

        return mainContent;
    },
});

module.exports=CreateGroup;