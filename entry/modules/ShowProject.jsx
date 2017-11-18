import React from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import '../../build/css/style.css'
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import RightSlide from './components/RightSilde'
import {Link} from 'react-router';
var Proxy = require('../../components/proxy/ProxyQ');
import PageNavigator from '../../components/basic/PageNavigator.jsx';
var Page = require('../../components/basic/Page');
var UserActions=require('../action/UserActions');
var PageActions=require('../action/PageActions');
var Tips = require('../../components/basic/Tips');
var ShowProject = React.createClass({

    getUrlParam :function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        // var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        var r = window.location.href.substr(window.location.href.indexOf('?')+1).match(reg);
        if (r != null) return unescape(r[2]); return null; //返回参数值
    },
    paginationData:function (data,pageIndex) {
        let capacity=data.length;
        var slices=null;
        Page.getInitialDataIndex(4,capacity,pageIndex,function(ob){
                slices=data.slice(ob.begin,ob.end);
            }
        );
        return slices;
    },
    previousCb:function (index,isChange) { //向前跳页
        this.setState({pageIndex:index,isChange:isChange});
    },

    pageCb:function(index,isChange) { //进入指定页的列表
        this.setState({pageIndex:index,isChange:isChange});
    },
    nextCb:function(index,isChange){ //向后跳页,isChange为true
        this.setState({pageIndex:index,isChange:isChange});
    },

    getInitialState: function () {
        var competitionId=parseInt(this.getUrlParam("competitionId"));
        if(competitionId!=null&&competitionId+''=='NaN'){

            competitionId=null;
        }

        var personId=this.props.personId;
        if(this.props.personId!==undefined && this.props.personId!==null){
            personId = this.props.personId;
        }
        return ({
            pageIndex: 0,
            competitionId:competitionId,
            personId:personId,
            isChange: false,
            PerProject:null,
            type:null,
            addPerson:[]
        });
    },
    initialData:function(){

        this.getBadmintonCompetitionProjectList();
    },
    getBadmintonCompetitionProjectList:function () {
        var url = "/func/competition/getBadmintonCompetitionProjectList";
        var ref = this;
        var params={
            competitionId:this.state.competitionId
        };
        Proxy.query(
            'post',
            url,
            params,
            null,
            function (res) {
                var a = res.data;
                var projectType2="";
                for (var i = 0; i < a.length; i++) {
                    if (a[i].projectType == "6") {
                        projectType2 = "团体";
                    } else if (a[i].projectType == "1") {
                        projectType2 = "男单";
                    }else if (a[i].projectType == "2") {
                        projectType2 = "女单";
                    }else if (a[i].projectType == "3") {
                        projectType2 = "男双";
                    }else if (a[i].projectType == "4") {
                        projectType2 = "女双";
                    }else if (a[i].projectType == "5") {
                        projectType2 = "混双";
                    }
                    a[i].projectType2 = projectType2;
                }
                ref.setState({data:a});
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
    },
    doSignup: function (projectId,personIdA,personIdB,type) {
        var projectId=projectId;
        var personIdA=personIdA;
        var personIdB=personIdB;
        var teamName="";
        var remark="";
        var type=type;

        var personIdA=parseInt(personIdA);
        var personIdB=parseInt(personIdB);
        var ref=this;
        if(type=="team"){
        var createTeam = this.refs['createTeam'];
        var teamName = $(createTeam).find("input[name='teamName']").val();
        var remark = $(createTeam).find("input[name='remark']").val();

        }

        var url="/func/competition/createCompetitionTeam";
        var params={
            projectId:projectId,
            personIdA:personIdA,
            personIdB:personIdB,
            teamName:teamName,
            remark:remark
        };
        Proxy.query(
            'post',
            url,
            params,
            null,
            function(ob) {
                var reCode = ob.re;
                if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) {
                    alert(ob.data);
                    return;
                }
                Tips.showTips("报名成功！");
                var TeamModel = this.refs['TeamModel'];
                $(TeamModel).modal('hide');
                var a = ob.data;
                var projectType2="";
                for (var i = 0; i < a.length; i++) {
                    if (a[i].projectType == "6") {
                        projectType2 = "团体";
                    } else if (a[i].projectType == "1") {
                        projectType2 = "男单";
                    }else if (a[i].projectType == "2") {
                        projectType2 = "女单";
                    }else if (a[i].projectType == "3") {
                        projectType2 = "男双";
                    }else if (a[i].projectType == "4") {
                        projectType2 = "女双";
                    }else if (a[i].projectType == "5") {
                        projectType2 = "混双";
                    }
                    a[i].projectType2 = projectType2;
                }
                ref.setState({data:a});

            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    doSerachGroupMember: function () {
        var name = document.getElementById("GroupMember").value;
        var createGroup = this.refs['createGroup'];
        var username = $(createGroup).find("input[name='GroupMember']").val();
        var reg = new RegExp("^[0-9]*$");
        if (username == "") {
                Tips.showTips('请填写您要搜索的队友~');
            } else {

            var url = "/func/allow/SerachGroupMemberDetail";
            var params = {
                    username: username
                };
            Proxy.query(
                'post',
                url,
                params,
                null,
                function (ob) {
                    var reCode = ob.re;
                    if (reCode !== undefined && reCode !== null && (reCode == -1 || reCode == "-1")) { //操作失败
                        return;
                    }
                    var member=ob.data;
                    this.setState({member:member});
                    var name=this.state.member;
                    if(name!=="") {
                        this.setState({addPerson: member});
                    }else
                    {

                    }
                    }.bind(this),
                    function (xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }.bind(this)
                );
            }

    },
    doAddSignupPerson: function (projectId,type) {
        var doubleModal = this.refs['doubleModal'];
        $(doubleModal).modal('show');
        this.state.PerProject=projectId;
        this.state.type=type;
    },
    doCreateTeam: function (projectId) {
        var projectId=projectId;
        var TeamModel = this.refs['TeamModel'];
        $(TeamModel).modal('show');

        this.setState({TeamProject:projectId});
    },
    doCreateNewTeamPerson: function () {
        var doubleModal = this.refs['doubleModal'];
        $(doubleModal).modal('hide');
        var NewTeamPersonModel = this.refs['NewTeamPersonModel'];
        $(NewTeamPersonModel).modal('show');

    },
    doCancelPerson: function (name,projectId) {
        var projectId=projectId;
        var name=name;
        var Str="你确定要删除["+name+"]么？";
        var ref=this;
        if(window.confirm(Str)) {

            var url = "/func/competition/removePersonFromCompetitionTeam";
            var params = {
                projectId:projectId,
                username:name,
            };

            Proxy.query(
                'post',
                url,
                params,
                null,
                function (ob) {
                    var reCode = ob.re;
                    if (reCode !== undefined && reCode !== null && (reCode == -1 || reCode == "-1")) {
                        alert(ob.data);
                        return;
                    }
                    ref.setState({data:ob.data});
                    Tips.showTips("删除成功！");
                }.bind(this),
                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }else{
            return;
        }
    },
    doCancelTeam: function (projectId) {
        var projectId=projectId;
        var url="/func/competition/cancelCompetitionTeam";
        var params={
            projectId:projectId,
        };
        var ref=this;
        Proxy.query(
            'post',
            url,
            params,
            null,
            function(ob) {
                var reCode = ob.re;
                if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) {
                    alert(ob.data);
                    return;
                }
                Tips.showTips("退报成功！");
                var TeamModel = this.refs['TeamModel'];
                $(TeamModel).modal('hide');
                var a = ob.data;
                var projectType2="";
                for (var i = 0; i < a.length; i++) {
                    if (a[i].projectType == "6") {
                        projectType2 = "团体";
                    } else if (a[i].projectType == "1") {
                        projectType2 = "男单";
                    }else if (a[i].projectType == "2") {
                        projectType2 = "女单";
                    }else if (a[i].projectType == "3") {
                        projectType2 = "男双";
                    }else if (a[i].projectType == "4") {
                        projectType2 = "女双";
                    }else if (a[i].projectType == "5") {
                        projectType2 = "混双";
                    }
                    a[i].projectType2 = projectType2;
                }
                ref.setState({data:a});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    doAddMember:function(personId,name){
        //this.props.dispatch(UserActions.test(id));

        //var name = document.getElementById("GroupMember").value;
        var personId=personId;
        var name=name;
        var ref=this;
        var projectId=this.state.PerProject;
        var a = this.state.data;
        var type=this.state.type;
        if(type=="team")
        {
            var url="/func/competition/addPersonToCompetitionTeam";
            var params={
                projectId:projectId,
                username:name,
            };
        }
        else {
            var url="/func/competition/createCompetitionTeam";
            var projectId=parseInt(projectId);
            var personIdA=parseInt(this.state.personId);
            var personIdB=parseInt(personId);

            var params={
                projectId:projectId,
                personIdA:personIdA,
                personIdB:personIdB,
                teamName:null,
                remark:null
            };
            Proxy.query(
                'post',
                url,
                params,
                null,
                function(ob) {
                    var reCode = ob.re;
                    if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) {
                        alert(ob.data);
                        return;
                    }
                    var a = ob.data;
                    var projectType2="";
                    for (var i = 0; i < a.length; i++) {
                        if (a[i].projectType == "6") {
                            projectType2 = "团体";
                        } else if (a[i].projectType == "1") {
                            projectType2 = "男单";
                        }else if (a[i].projectType == "2") {
                            projectType2 = "女单";
                        }else if (a[i].projectType == "3") {
                            projectType2 = "男双";
                        }else if (a[i].projectType == "4") {
                            projectType2 = "女双";
                        }else if (a[i].projectType == "5") {
                            projectType2 = "混双";
                        }
                        a[i].projectType2 = projectType2;
                    }
                    ref.setState({data:a});
                    Tips.showTips("报名成功！");
                    var doubleModal = this.refs['doubleModal'];
                    $(doubleModal).modal('hide');
                    this.state.addPerson=null;
                    $("#GroupMember").val("");
                }.bind(this),
                function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
        if(name!==""&&type=="team") {
            var addPerson = [];
            var flag = 0;
            for (var i = 0; i < a.length; i++) {
                if(a[i].projectId==projectId){
                    var personList = a[i].personList;
                    var num = i;
                    Proxy.query(
                            'post',
                            url,
                            params,
                            null,
                            function(ob) {
                                var reCode = ob.re;
                                if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) {
                                    alert(ob.data);
                                    flag=1;
                                }
                                if(personList!=null&&personList!=""){
                                    personList.map(function (item) {
                                        if (item == name) {
                                            flag = 1;
                                        }
                                        addPerson.push(item);
                                    })
                                    if (flag==0) {
                                        addPerson.push(name);
                                        alert(ob.data);
                                    }
                                    personList=addPerson;
                                }else{
                                    if(flag==0){
                                        addPerson.push(name);
                                        alert(ob.data);
                                    }
                                    personList=addPerson;
                                }
                                a[num].personList = personList;
                                ref.setState({data:a});
                                var doubleModal = ref.refs['doubleModal'];
                                $(doubleModal).modal('hide');
                                ref.state.addPerson=null;
                                $("#GroupMember").val("");
                            }.bind(this),
                            function(xhr, status, err) {
                                console.error(this.props.url, status, err.toString());
                            }.bind(this)
                    );

                }
            }

        }

    },
    doSignupNewTeamPerson:function(){

        var registerPage = this.refs['registerPage'];
        var userName = $(registerPage).find("input[name='userName']").val();
        var Trainer=0;
        var ref=this;
        if (userName == "") {
            Tips.showTips('请填写用户名~');
        } else{

            var url = '/func/register/userRegister';
            var params={
                userName:userName,
                password:"1",
                phoneNum:"",
                Trainer:Trainer
            };
            Proxy.query(
                'POST',
                url,
                params,
                null,
                function (re) {
                    var reCode = re.re;
                    if(reCode==1 || reCode=='1'){
                        Tips.showTips("注册成功！");
                        var url = "/func/allow/SerachGroupMemberByName";
                        var params = {
                            username: userName
                        };
                        Proxy.query(
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
                                var id=data.userid;
                                ref.doAddMember(id,userName);
                            }.bind(this),
                            function (xhr, status, err) {
                                console.error(this.props.url, status, err.toString());
                            }.bind(this)
                        );
                        var NewTeamPersonModel = ref.refs['NewTeamPersonModel'];
                        $(NewTeamPersonModel).modal('hide');
                    }else{
                        Tips.showTips("注册失败！");
                    }
                },
                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }
            );
        }
    },
    test:function(){
        document.getElementById("showproject").click();
    },
    render:function() {
        var contains = null;
        if(this.state.competitionId!=null) {
            var doSignup = this.doSignup;
            var doCancelPerson = this.doCancelPerson;
            var doCancelTeam = this.doCancelTeam;
            var doAddSignupPerson = this.doAddSignupPerson;
            var doCreateNewTeamPerson=this.doCreateNewTeamPerson;
            var doSignupNewTeamPerson=this.doSignupNewTeamPerson;
            var doAddMember = this.doAddMember;
            var doCreateTeam = this.doCreateTeam;
            var ref = this;
            if (this.state.data !== null && this.state.data !== undefined) {
                var data = this.state.data;
                var trs = [];
                var nrs = [];
                var ttrs = [];
                var sjrs=[];
                data.map(function (item, i) {

                    if (item.projectType == "6") {
                        {/*Team报名*/
                        }
                        ttrs = [];
                        if (item.personList !== null && item.personList !== undefined&&item.isTeamCreateor == 1) {

                            item.personList.map(function (itema, j) {
                                ttrs.push(
                                    <span
                                        style={{fontSize:'14px',marginRight:'5px',textDecoration:'underline',cursor:'pointer'}}
                                        onClick={ref.doCancelPerson.bind(ref,itema,item.projectId)}>{itema}</span>
                                )
                            })

                        }
                        if (item.personList !== null && item.personList !== undefined&&item.isTeamCreateor == 0) {

                            item.personList.map(function (itema, j) {
                                ttrs.push(
                                    <span style={{fontSize:'14px',marginRight:'5px'}}>{itema}</span>
                                )
                            })

                        }
                        trs.push(
                            <tbody key={i} className="group-table">
                            <tr>
                                <td>{item.projectName}</td>
                                <td>{item.projectType2}</td>
                                <td>{item.maxTeamNum}</td>
                                <td>{item.nowTeamNum}</td>
                                <td>{item.maxTeamPersonNum}</td>
                                <td rowSpan={2}>{ttrs}</td>
                                {item.joinMark == 1 && item.isTeamCreateor == 1 ?
                                    <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}}
                                        onClick={ref.doAddSignupPerson.bind(ref,item.projectId,"team")}>添加队员
                                </button>
                             </span>
                                    </td> : null

                                }
                                {
                                    item.joinMark == 0 ?
                                        <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}}
                                        onClick={doCreateTeam.bind(ref,item.projectId)}>报名
                                </button>
                             </span>
                                        </td> :
                                        null
                                }
                                {
                                    item.joinMark == 1 && item.isTeamCreateor == 1 ?
                                        <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}}
                                        onClick={doCancelTeam.bind(ref,item.projectId)}>退出报名
                                </button>
                             </span>
                                        </td> : null
                                }
                                {
                                    item.joinMark == 1 && item.isTeamCreateor == 0 ?
                                        <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn"
                                        style={{borderRadius:'3px',background:'#969f96',borderColor:'#8a9084'}}
                                        disabled="true">已报名
                                </button>
                             </span>
                                        </td> : null
                                }

                            </tr>
                            </tbody>
                        )
                    } else if (item.projectType == "1" || item.projectType == "2") {
                        {/*单人报名*/
                        }
                        sjrs=[];
                        if (item.personList !== null && item.personList !== undefined) {

                            item.personList.map(function (itema, j) {
                                sjrs.push(
                                    <span style={{fontSize:'14px',marginRight:'5px'}}>{itema}</span>
                                )
                            })

                        }
                        trs.push(
                            <tbody key={i} className="group-table">
                            <tr>
                                <td>{item.projectName}</td>
                                <td>{item.projectType2}</td>
                                <td>{item.maxTeamNum}</td>
                                <td>{item.nowTeamNum}</td>
                                <td>{item.maxTeamPersonNum}</td>
                                <td rowSpan={2}>{sjrs}</td>

                                {
                                    item.joinMark == 0 ?
                                        <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}}
                                        onClick={doSignup.bind(ref,item.projectId,ref.state.personId,null,"person")}>报名
                                </button>
                             </span>
                                        </td> : null
                                }
                                {
                                    item.joinMark == 1 && item.isTeamCreateor == 1 ?
                                        <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}}
                                        onClick={doCancelTeam.bind(ref,item.projectId)}>退出报名
                                </button>
                             </span>
                                        </td>
                                        : null
                                }
                                {
                                    item.joinMark == 1 && item.isTeamCreateor == 0 ?
                                        <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn"
                                        style={{borderRadius:'3px',background:'#969f96',borderColor:'#8a9084'}}
                                        disabled="true">已报名
                                </button>
                             </span>
                                        </td> : null
                                }
                            </tr>
                            </tbody>
                        )
                    } else {
                        {/*两个人报名*/
                        }
                        nrs=[];
                        
                        if (item.personList !== null && item.personList !== undefined) {

                            item.personList.map(function (itema, j) {
                                nrs.push(
                                    <span style={{fontSize:'14px',marginRight:'5px'}}>{itema}</span>
                                )
                            })

                        }
                        trs.push(
                            <tbody key={i} className="group-table">
                            <tr>
                                <td>{item.projectName}</td>
                                <td>{item.projectType2}</td>
                                <td>{item.maxTeamNum}</td>
                                <td>{item.nowTeamNum}</td>
                                <td>{item.maxTeamPersonNum}</td>
                                <td rowSpan={2}>{nrs}</td>
                                {
                                    item.joinMark == 0 ?
                                        <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}}
                                        onClick={ref.doAddSignupPerson.bind(ref,item.projectId,"double")}>报名
                                </button>
                             </span>
                                        </td> : null
                                }
                                {
                                    item.joinMark == 1 && item.isTeamCreateor == 1 ?
                                        <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}}
                                        onClick={doCancelTeam.bind(ref,item.projectId)}>退出报名
                                </button>
                             </span>
                                        </td> : null
                                }
                                {
                                    item.joinMark == 1 && item.isTeamCreateor == 0 ?
                                        <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn"
                                        style={{borderRadius:'3px',background:'#969f96',borderColor:'#8a9084'}}
                                        disabled="true">已报名
                                </button>
                             </span>
                                        </td> : null
                                }
                            </tr>
                            </tbody>
                        )
                    }
                })

                var mrs = [];
                mrs.push(
                    <div ref="createTeam">
                        <div className="common-line">
                            <span className="common-label l-label">队伍名称：</span>
                            <span>
                            <input type="text" name="teamName" className="common-input" tabIndex="1"></input>
                            </span>
                        </div>
                        <div className="common-line">
                            <span className="common-label l-label">队伍备注：</span>
                        <span>
                            <input type="text" name="remark" className="common-input" tabIndex="2"></input>
                        </span>
                        </div>
                        <div className="common-line">
                            <button style={{fontSize:'14px',color:'#11a669',width:'60px',height:'30px'}}
                                    onClick={doSignup.bind(null,this.state.TeamProject,null,null,"team")}>保存
                            </button>
                        </div>
                    </div>
                )
                var jrs=[];
                jrs.push(
                    <div ref="registerPage">
                        <div className="common-line">
                            <span className="common-label l-label">新队员名称：</span>
                            <span>
                            <input type="text" name="userName" className="common-input" tabIndex="1"></input>
                            </span>
                        </div>
                        <div className="common-line">
                            <span className="common-label l-label">默认密码为数字 1</span>
                        </div>
                        <div className="common-line">
                            <button style={{fontSize:'14px',color:'#11a669',width:'60px',height:'30px'}}
                                    onClick={doSignupNewTeamPerson}>保存
                            </button>
                        </div>
                    </div>
                )


                if (this.state.addPerson !== null && this.state.addPerson !== undefined) {
                    var prs = [];
                    this.state.addPerson.map(function (item, i) {
                        prs.push(
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.gender}</td>
                                <td>
                                    <button style={{color:'#11a669',fontSize:'14px',textAlign:'Center'}}
                                            onClick={doAddMember.bind(ref,item.id,item.name)}>添加
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                var drs = [];
                drs.push(
                    <div ref="createGroup">
                        <div className="common-line">
                            <div className="common-label l-label" style={{float:'left'}}>搜索组员：</div>
                            <div style={{float:'left'}}>
                                <input type="text" id="GroupMember" name="GroupMember" placeholder="请输入你要搜索的队友"
                                       className="common-input" tabIndex="5"></input>
                            </div>
                            <div style={{float:'left'}}>
                                <button
                                    style={{fontSize:'14px',color:'#11a669',width:'50px',height:'35px',marginLeft:'20px'}}
                                    onClick={this.doSerachGroupMember}>搜索
                                </button>
                            </div>
                            <div style={{float:'left'}}>
                                <button
                                    style={{fontSize:'14px',color:'#11a669',width:'80px',height:'35px',marginLeft:'2px'}}
                                    onClick={doCreateNewTeamPerson.bind(ref)}>注册新队员
                                </button>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div style={{height: '190px', overflowY: 'scroll'}}>
                            <table className="table table-striped invoice-table">
                                <thead className="table-head">
                                <tr>
                                    <th width="150">姓名</th>
                                    <th width="150">年龄</th>
                                    <th width="150">性别</th>
                                    <th width="150">操作</th>
                                </tr>
                                </thead>
                                <tbody className="group-table" over-flow="scroll" style={{overFlow:'scroll'}}>
                                {prs}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            } else {
                this.initialData();
            }

            contains =
                <div className="banner-bottom">
                    <div className="container">
                        <div className="faqs-top-grids">
                            <div >
                                <h1 style={{paddingLeft:'400px',fontSize:'25px',paddingBottom:'20px'}}>参赛项目报名</h1>
                                <table className="table table-striped invoice-table">
                                    <thead className="table-head">
                                    <tr>
                                        <th width="150">项目名称</th>
                                        <th width="150">项目类型</th>
                                        <th width="190">最大参赛队伍</th>
                                        <th width="230">已报名参赛队伍</th>
                                        <th width="150">队伍最大人数</th>
                                        <th width="300">已报名人员</th>
                                    </tr>
                                    </thead>
                                    {trs}
                                </table>
                            </div>
                            { /*<RightSlide/>*/}
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="modal fade bs-example-modal-sm login-container"
                         tabIndex="-1"
                         role="dialog"
                         aria-labelledby="myLargeModalLabel"
                         aria-hidden="true"
                         ref='successModal'
                         data-keyboard="false"
                         style={{zIndex: 1045}}
                        >
                        <div className="modal-dialog modal-sm"
                             style={{position: 'absolute', top: '30%', width: '400px', marginLeft: '25%'}}>
                            <div className="modal-content"
                                 style={{position: 'relative', width: '400px', padding: '100px'}}>
                                <div className="modal-body">
                                    <div className="modalEventDetail">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade bs-example-modal-sm login-container"
                         tabIndex="-1"
                         role="dialog"
                         aria-labelledby="myLargeModalLabel"
                         aria-hidden="true"
                         ref='TeamModel'
                         data-keyboard="false"
                         style={{zIndex: 1045}}
                        >
                        <div className="modal-dialog modal-sm"
                             style={{position: 'absolute', top: '30%', width: '400px', marginLeft: '25%'}}>
                            <div className="modal-content"
                                 style={{position: 'relative', width: '400px', padding: '40px'}}>
                                <div className="modal-body">
                                    <div className="modalEventDetail">
                                        {mrs}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade bs-example-modal-sm login-container"
                         tabIndex="-1"
                         role="dialog"
                         aria-labelledby="myLargeModalLabel"
                         aria-hidden="true"
                         ref='NewTeamPersonModel'
                         data-keyboard="false"
                         style={{zIndex: 1045}}
                        >
                        <div className="modal-dialog modal-sm"
                             style={{position: 'absolute', top: '30%', width: '400px', marginLeft: '25%'}}>
                            <div className="modal-content"
                                 style={{position: 'relative', width: '400px', padding: '40px'}}>
                                <div className="modal-body">
                                    <div className="modalEventDetail">
                                        {jrs}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade bs-example-modal-sm login-container"
                         tabIndex="-1"
                         role="dialog"
                         aria-labelledby="myLargeModalLabel"
                         aria-hidden="true"
                         ref='doubleModal'
                         data-keyboard="false"
                         style={{zIndex: 1045}}
                        >
                        <div className="modal-dialog modal-sm"
                             style={{position: 'relative', top: '30%', width: '450px', marginLeft: '25%'}}>
                            <div className="modal-content"
                                 style={{position: 'relative', width: '450px'}}>
                                <div className="modal-body">
                                    <div className="modalEventDetail">
                                        {drs}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        }else{
            contains=
                <div>
                    <Link to={window.App.getAppRoute() + "/competition"} id='showproject'>数据为空，请跳转到赛事模块</Link>
                </div>
        }
        return contains

    }

});
const mapStateToProps = (state, ownProps) => {
    const props = {
        token: state.userInfo.accessToken,
        personId:state.userInfo.personId,
        loginName: state.userInfo.loginName,
    }
    return props
}
export default connect(mapStateToProps)(ShowProject);
