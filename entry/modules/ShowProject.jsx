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
        var personId=this.props.personId;
        if(this.props.personId!==undefined && this.props.personId!==null){
            personId = this.props.personId;
        }
        return ({
            pageIndex: 0,
            competitionId:competitionId,
            personId:personId,
            isChange: false,
            addPerson:[]
        });
    },
    initialData:function(){

        this.getBadmintonCompetitionProjectList();

    },
    closeModal:function () {
        var successModal = this.refs['successModal'];
        $(successModal).modal('hide');
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
                    if (a[i].projectType == "1") {
                        projectType2 = "团体";
                    } else if (a[i].projectType == "2") {
                        projectType2 = "男单";
                    }else if (a[i].projectType == "3") {
                        projectType2 = "女单";
                    }else if (a[i].projectType == "4") {
                        projectType2 = "男双";
                    }else if (a[i].projectType == "5") {
                        projectType2 = "女双";
                    }else if (a[i].projectType == "6") {
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
    doSignupPerson: function (projectId) {
        var projectId=projectId;
        var url="/func/competition/joinCompetitionPerson";
        var params={
            projectId:projectId,
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
                alert(ob.data);
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
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
                Tips.showTips('请填写您要搜索的队友~');
            } else {

                var url = "/func/allow/SerachGroupMember";
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
    doSignupTeam: function (projectId) {
        var projectId=projectId;
        var url="/func/competition/isJoinCompetitionTeam";
        var params={
            projectId:projectId,
        };
        var ref = this;
        Proxy.query(
            'post',
            url,
            params,
            null,
            function(ob) {
                var reCode = ob.re;
                projectId=projectId;
                if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) {
                    alert(ob.data);
                    return;
                }else{
                    var successModal2 = this.refs['successModal2'];
                    $(successModal2).modal('show');
                    ref.setState({project:projectId});

                }
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    doSignupDoublePerson: function (projectId) {
        var projectId=projectId;
        var doubleModal = this.refs['doubleModal'];
        $(doubleModal).modal('show');
        this.setState({Dbproject:projectId});
    },
    doJoinCompetitionTeam: function (projectId) {
        var projectId=projectId;
        var createTeam = this.refs['createTeam'];
        var teamName = $(createTeam).find("input[name='teamName']").val();
        var remark = $(createTeam).find("input[name='remark']").val();

        var url="/func/competition/joinCompetitionTeam";
        var params={
            projectId:projectId,
            teamName:teamName,
            remark:remark
        };
        var ref = this;
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
                alert(ob.data);
                var successModal2 = this.refs['successModal2'];
                $(successModal2).modal('hide');

            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    doCancelPerson: function (projectId) {
        var projectId=projectId;
        var url="/func/competition/cancelCompetitionPerson";
        var params={
            projectId:projectId,
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
                alert(ob.data);
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    doCancelTeam: function (projectId) {
        var projectId=projectId;
        var url="/func/competition/cancelCompetitionTeam";
        var params={
            projectId:projectId,
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
                alert(ob.data);
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    groupRegistration:function (item) {
        this.setState({modal:item});
        var successModal = this.refs['successModal'];
        $(successModal).modal('show');

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
    render:function() {
        var contains = null;
        var doSignupPerson = this.doSignupPerson;
        var doCancelPerson= this.doCancelPerson;
        var doSignupTeam= this.doSignupTeam;
        var doCancelTeam=this.doCancelTeam;
        var doSignupDoublePerson=this.doSignupDoublePerson;
        var doJoinCompetitionTeam=this.doJoinCompetitionTeam;
        var ref=this;
        if(this.state.data!==null&&this.state.data!==undefined) {
            var data = this.state.data;
            var len = this.state.data.length;
            var trs = [];


            data.map(function (item, i) {
                if(item.projectType=="1"){ {/*Team报名*/}
                trs.push(
                    <tbody  key={i} className="group-table">
                    <tr>
                        <td>{item.projectName}</td>
                        <td>{item.projectType2}</td>
                        <td>{item.maxTeamNum}</td>
                        <td>{item.nowTeamNum}</td>
                        <td>{item.maxTeamPersonNum}</td>
                        <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}} onClick={ref.groupRegistration}>添加队员</button>
                             </span>
                        </td>
                        {
                        item.joinMark==0?
                        <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}} onClick={doSignupTeam.bind(ref,item.projectId)} >报名</button>
                             </span>
                        </td>:
                        <div>/</div>
                        }
                        {
                            item.joinMark==1?
                        <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}} onClick={doCancelTeam.bind(ref,item.projectId)} >退出报名</button>
                             </span>
                        </td> : <div>/</div>
                        }
                    </tr>
                    </tbody>
                )
                }else if(item.projectType=="2"||item.projectType=="3") {  {/*单人报名*/}



                    trs.push(
                        <tbody  key={i} className="group-table">
                        <tr>
                            <td>{item.projectName}</td>
                            <td>{item.projectType2}</td>
                            <td>{item.maxTeamNum}</td>
                            <td>{item.nowTeamNum}</td>
                            <td>{item.maxTeamPersonNum}</td>
                            <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}} onClick={ref.groupRegistration}>添加队员</button>
                             </span>
                            </td>
                            {
                                item.joinMark==0?

                                <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}} onClick={doSignupPerson.bind(ref,item.projectId)}>报名</button>
                             </span>
                            </td> : <div>/</div>
                            }
                            {
                                item.joinMark==1?
                            <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}} onClick={doCancelPerson.bind(ref,item.projectId)}>退出报名</button>
                             </span>
                            </td>
                                    : <div>/</div>
                            }
                        </tr>
                        </tbody>
                    )
                }else{{/*两个人报名*/}
                    trs.push(
                        <tbody  key={i} className="group-table">
                        <tr>
                            <td>{item.projectName}</td>
                            <td>{item.projectType2}</td>
                            <td>{item.maxTeamNum}</td>
                            <td>{item.nowTeamNum}</td>
                            <td>{item.maxTeamPersonNum}</td>
                            <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}} onClick={ref.groupRegistration}>添加队员</button>
                             </span>
                            </td>
                            {
                                item.joinMark==0?
                            <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}} onClick={doSignupDoublePerson.bind(ref,item.projectId)}>报名</button>
                             </span>
                            </td>: <div>/</div>
                            }
                            {
                                item.joinMark==1?
                            <td>
                            <span style={{fontSize:'16px',borderRadius:'2px'}}>
                                <button className="search-Btn" style={{borderRadius:'3px'}} onClick={doCancelPerson.bind(ref,item.projectId)}>退出报名</button>
                             </span>
                            </td>: <div>/</div>
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
                        <button style={{fontSize:'14px',color:'#11a669',width:'100px',height:'30px'}} onClick={doJoinCompetitionTeam.bind(ref,this.state.project)} >保存</button>
                    </div>
                </div>

            )
            if(this.state.addPerson!==null&&this.state.addPerson!==undefined) {
                var prs = [];
                this.state.addPerson.map(function (item, i) {
                    prs.push(
                        <div key={'addPerson'+i} style={{float:'left',paddingRight:'25px'}}>
                            <div style={{float: 'left'}}><input type="checkbox" key={i} value={item}/></div>

                            <div style={{float: 'left'}}><span>{item}</span></div>

                        </div>
                    )
                })
            }
            var drs = [];
            drs.push(
                <div ref="createGroup">
                    <div className="common-line">
                        <div className="common-label l-label"style={{float:'left'}}>搜索组员：</div>
                        <div>
                            <input type="text" id="GroupMember" name="GroupMember" placeholder="请输入你要搜索的队友" className="common-input" tabIndex="5"></input>
                        </div>
                        <div className="common-label l-label" style={{float:'left'}}>保存时请点击您想选择的组员：</div>
                        <div style={{float:'left'}}>
                            <button  style={{fontSize:'14px',color:'#11a669',width:'80px',height:'30px'}}  onClick={this.doSerachGroupMember}>搜索</button>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="common-line"style={{height:'30px'}}>
                        {prs}
                    </div>
                    <div className="common-line">
                        <span>
                            <button  style={{fontSize:'14px',color:'#11a669',width:'80px',height:'30px'}} >提交</button>
                        </span>
                    </div>
                </div>

            )
        }else{
            this.initialData();
        }

        contains =
            <div className="banner-bottom">
                <div className="container">
                    <div className="faqs-top-grids"style={{width:'1900px'}} >
                        <div className="col-md-8 product-grids">
                            <h1 style={{paddingLeft:'400px',fontSize:'25px',paddingBottom:'20px'}}>参赛项目报名</h1>
                            <table className="table table-striped invoice-table">
                            <thead className="table-head">
                            <tr>
                                <th width="150">项目名称 </th>
                                <th width="150">项目类型  </th>
                                <th width="150">最大参赛队伍/人数 </th>
                                <th width="170">已报名参赛队伍/人数 </th>
                                <th width="150">队伍最大人数  </th>
                                <th width="150">已报名人员 </th>
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
                         style={{position: 'absolute', top: '30%', width: '50%', marginLeft: '25%'}}>
                        <div className="modal-content"
                             style={{position: 'relative', width: '80%', padding: '100px'}}>
                            <div className="modal-body">
                                <div className="modalEventDetail">
                                     sdsds
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
                     ref='successModal2'
                     data-keyboard="false"
                     style={{zIndex: 1045}}
                    >
                    <div className="modal-dialog modal-sm"
                         style={{position: 'absolute', top: '30%', width: '50%', marginLeft: '25%'}}>
                        <div className="modal-content"
                             style={{position: 'relative', width: '60%', padding: '40px'}}>
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
                     ref='doubleModal'
                     data-keyboard="false"
                     style={{zIndex: 1045}}
                    >
                    <div className="modal-dialog modal-sm"
                         style={{position: 'absolute', top: '30%', width: '50%', marginLeft: '25%'}}>
                        <div className="modal-content"
                             style={{position: 'relative', width: '50%', padding: '40px'}}>
                            <div className="modal-body">
                                <div className="modalEventDetail">
                                    {drs}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


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
