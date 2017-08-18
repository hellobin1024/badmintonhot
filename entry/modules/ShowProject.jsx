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
        return ({
            pageIndex: 0,
            competitionId:competitionId,
            isChange: false,
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
                ref.setState({data:a});
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
    },

    render:function() {
        var contains = null;
        if(this.state.data!==null&&this.state.data!==undefined) {
            var data = this.paginationData(this.state.data, this.state.pageIndex);
            var len = this.state.data.length;
            var trs = [];
            var ref=this;

            data.map(function (item, i) {
                if(item.projectType!="1"){
                trs.push(
                     <div key={i} style={{paddingLeft:'10px'}}>

                        <div  style={{paddingLeft:'1px',float:'left',width:'60%',color:'#303030',fontSize:'14px',marginTop:'21px'}}>
                            <p style={{float:'left'}}>
                                项目名称: {item.projectName}
                            </p>
                            <p style={{float:'left'}}>
                                项目类型: {item.projectType}
                            </p>

                        </div>

                    </div>

                )}else{

                    trs.push(
                        <div key={i} style={{paddingLeft:'10px'}}>

                            <div  style={{paddingLeft:'1px',float:'left',width:'60%',color:'#303030',fontSize:'14px',marginTop:'21px'}}>
                                <p style={{float:'left'}}>
                                    项目名称: {item.projectName}
                                </p>
                                <p style={{float:'left'}}>
                                    项目类型: {item.projectType}
                                </p>
                                <p style={{float:'left'}}>
                                    最大参赛队伍: {item.maxTeamNum}
                                </p>
                                <p style={{float:'left'}}>
                                    已报名参赛队伍: {item.nowTeamNum}
                                </p>
                                <p style={{float:'left'}}>
                                    队伍最大人数: {item.maxTeamPersonNum}
                                </p>
                            </div>

                        </div>

                    )

                }






            })

        }else{
            this.initialData();
        }

        contains =
            <div className="banner-bottom">
                <div className="container">
                    <div className="faqs-top-grids">
                        <div className="product-grids">
                            <h1 style={{textAlign:'center',fontSize:'25px'}}>参赛项目报名</h1>
                            {trs}
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>

        return contains

    }

});
module.exports = ShowProject;
