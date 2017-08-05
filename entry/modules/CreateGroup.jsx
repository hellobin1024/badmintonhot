/**
 * Created by dellbin on 2017/6/27.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';
import '../../css/entry/modules/create.css';
import { connect } from 'react-redux';
var Tips = require('../../components/basic/Tips');

var ProxyQ = require('../../components/proxy/ProxyQ');

var CreateGroup = React.createClass({

    doSave: function () {
        var createGroup = this.refs['createGroup'];
        var username="";
        $("#group input:checkbox:checked").each(function (index, domEle) {
            username+=$(domEle).val()+",";
        });
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

            var url="/func/allow/createGroup";
            var params={
                groupName:groupName,
                groupBrief:groupBrief,
                groupMaxMemNum:groupMaxMemNum,
                remark:remark,
                username:username
            };
            ProxyQ.query(
                'post',
                url,
                params,
                null,
                function(ob) {
                    var reCode = ob.re;
                    if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) { //操作失败
                        alert("创建失败！");
                        return;
                    }else{
                        alert("创建成功！");
                    }
                }.bind(this),
                function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
    },
    doSerachGroupMember: function () {
        var name = document.getElementById("GroupMember").value;
        if(name==this.props.loginName){
            alert("不可以搜索自己");
        }else {
            var createGroup = this.refs['createGroup'];
            var username = $(createGroup).find("input[name='GroupMember']").val();
            var reg = new RegExp("^[0-9]*$");
            if (username == "") {
                Tips.showTips('请填写您要搜索的组员~');
            } else {

                var url = "/func/allow/SerachGroupMember";
                var params = {
                    personId: this.state.personId,
                    username: username
                };
                ProxyQ.query(
                    'post',
                    url,
                    params,
                    null,
                    function (ob) {
                        var reCode = ob.re;
                        if (reCode !== undefined && reCode !== null && (reCode == -1 || reCode == "-1")) { //操作失败
                            return;
                        }
                        var data=ob.data;
                        this.setState({data:data});
                        var name=this.state.data;
                        if(name!=="") {
                            var addPerson = [];
                            var flag = 0;
                            addPerson = this.state.addPerson;
                            if (addPerson == null) {
                                addPerson.push(name);
                            } else {
                                addPerson.map(function (item) {
                                    if (item == name) {
                                        flag = 1;
                                    }
                                })
                                if (flag == 1) {
                                    alert("已存在！");
                                } else {
                                    addPerson.push(name);
                                }
                            }
                            this.setState({addPerson: addPerson});
                        }else
                        {

                        }
                    }.bind(this),
                    function (xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }.bind(this)
                );
            }
        }
    },


    getInitialState: function () {
        var personId = null;
        if(this.props.personId!==undefined && this.props.personId){
            personId = this.props.personId;
        }
        return ({personId: personId, data:null,addPerson:[]});
    },
    doAddMember:function(){
        //var name = document.getElementById("GroupMember").value;
        var name=this.state.data;
        if(name!=="") {
            var addPerson = [];
            var flag = 0;
            addPerson = this.state.addPerson;
            if (addPerson == null) {
                addPerson.push(name);
            } else {
                addPerson.map(function (item) {
                    if (item == name) {
                        flag = 1;
                    }
                })
                if (flag == 1) {
                    alert("已存在！");
                } else {
                    addPerson.push(name);
                }
            }
            this.setState({addPerson: addPerson});
        }else
        {

        }


    },
    render:function(){
        var mainContent = null;
        var data = this.state.data;
        if(this.state.addPerson!==null&&this.state.addPerson!==undefined) {
            var ars = [];
            this.state.addPerson.map(function (item, i) {
                ars.push(
                    <div key={'addPerson'+i} style={{float:'left',paddingRight:'25px'}}>
                        <div style={{float: 'left'}}><input type="checkbox" key={i} value={item}/></div>

                        <div style={{float: 'left'}}><span>{item}</span></div>

                    </div>
                )
            })
        }

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
                <div className="common-line">
                    <span className="common-label l-label">搜索组员：</span>
                        <span>
                            <input type="text" id="GroupMember" name="GroupMember" className="common-input" tabIndex="5"></input>
                        </span>
                        <span>
                            <button className="search-Btn" onClick={this.doSerachGroupMember}>搜索</button>
                        </span>
                    {/*<span>
                            <button className="search-Btn" onClick={this.doAddMember}>添加</button>
                        </span>
                     <span className="common-label r-label" style={{marginLeft:'20px'}}>提示搜索成功点击添加</span>*/}
                </div>
                <div className="common-line" id="group">
                    <span className="common-label l-label" style={{float:'left'}}>保存时请点击您想选择的组员：</span>
                    {ars}
                </div>
                <div className="save-line"  style={{position:'absolute'}}>
                        <span>
                            <button className="save-Btn" onClick={this.doSave}>保存</button>
                        </span>
                </div>

            </div>

        return mainContent;
    },
});

const mapStateToProps = (state, ownProps) => {
    const props = {
        loginName: state.userInfo.loginName,
    }
    return props
}
export default connect(mapStateToProps)(CreateGroup);