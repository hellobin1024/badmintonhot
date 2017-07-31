/**
 * Created by dellbin on 2017/6/27.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';
import Calendar from '../../components/basic/Calendar.jsx';
import '../../css/entry/modules/create.css';
import { connect } from 'react-redux';

var Tips = require('../../components/basic/Tips');

var today=new Date().toLocaleDateString().replace("/", "-").replace("/", "-");
var ProxyQ = require('../../components/proxy/ProxyQ');

var CreateEvent = React.createClass({

    doSave: function () {
        var createEvent = this.refs['createEvent'];
        var eventName = $(createEvent).find("input[name='eventName']").val();
        var eventBrief = $(createEvent).find("input[name='eventBrief']").val();
        var transferDate = $(createEvent).find("input[name='transferDate']").val();
        var eventPlace = $('#eventPlace option:selected').val();
        var eventGroup = $('#eventGroup option:selected').val();
        var eventMaxMemNum = $(createEvent).find("input[name='eventMaxMemNum']").val();
        var hasSparring = $('#hasSparring option:selected').val();
        var eventType = $('#eventType option:selected').val();
        var reg = new RegExp("^[0-9]*$");

        if (eventName == "") {
            Tips.showTips('请填写活动名称~');
        } else if (eventBrief == "") {
            Tips.showTips('请填写活动简介~');
        } else if (transferDate == "") {
            Tips.showTips('请选择活动时间~');
        } else if (eventPlace == "-1") {
            Tips.showTips('请选择活动地点~');
        } else if (eventMaxMemNum == "") {
            Tips.showTips('请填写活动最大人数~');
        } else if(!reg.test(eventMaxMemNum)){
            Tips.showTips("最大人数只能为数字~");
        }  else if (hasSparring == "-1") {
            Tips.showTips('请选择是否需要陪练~');
        } else if (eventType == "-1") {
            Tips.showTips('请选择活动类型~');
        } else {

            var url="/func/events/createEvent";
            var params={
                personId:this.state.personId,
                eventName:eventName,
                eventBrief:eventBrief,
                transferDate:transferDate,
                eventPlace:eventPlace,
                eventMaxMemNum:eventMaxMemNum,
                hasSparring:hasSparring,
                eventGroup:eventGroup,
                eventType:eventType
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

    initialData:function(){
        var url="/func/events/getVenueUnitGroup";
        var params={};

        ProxyQ.query(
            'post',
            url,
            params,
            null,
            function(ob) {
                var reCode = ob.reCode;
                if(reCode!==undefined && reCode!==null && (reCode ==1 || reCode =="1")) { //数据获取失败
                    alert(ob.response);
                    return;
                }
                var data=ob.resList;
                this.setState({data:data});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },


    getInitialState: function () {
        var personId = null;
        if(this.props.personId!==undefined && this.props.personId){
            personId = this.props.personId;
        }
        return ({personId: personId, data:null,addPerson:[]});
    },

    render:function(){
        var mainContent = null;
        var data = this.state.data;
        var eventPlaceList = [];
        var eventGroupList = [];
        if(data!==undefined && data!==null){

            var data1=data.listGroupInfo;
            var data2=data.listVenueUnit;
            data2.map(function(item, i){
                eventPlaceList.push(<option key={i} value={item.unitId}>{item.name}</option>);
            });
            data1.map(function(item, i){
                eventGroupList.push(<option key={i} value={item.groupId}>{item.groupName}</option>);
            });

            mainContent=
                <div ref="createEvent" className="c-block">
                    <div className="common-line">
                        <span className="common-label l-label">活动名称：</span><span>
                            <input type="text" name="eventName" className="common-input" tabIndex="1"></input>
                        </span>

                        <span className="common-label r-label">活动简介：</span>
                        <span>
                            <input type="text" name="eventBrief" className="common-input" tabIndex="2"></input>
                        </span>
                    </div>

                    <div className="common-line">
                        <span className="common-label l-label" >选择星期：</span>
                        <span>
                            <select className="common-input" style={{color:'#000000!important',width:'190px',lineHeight:'13px'}} id="eventType">
                                <option value={-1}>请选择</option>
                                <option value={1}>周一</option>
                                <option value={2}>周二</option>
                                <option value={3}>周三</option>
                                <option value={4}>周四</option>
                                <option value={5}>周五</option>
                                <option value={6}>周六</option>
                                <option value={7}>周日</option>
                            </select>
                        </span>
                        <span className="common-label r-label" >是否为周期活动</span>
                        <input type="checkbox"  style={{marginLeft:'30px',width:'inherit',height:'inherit'}} name="periodFlag"  id="periodFlag"  value="是否为周期活动"  />
                    </div>
                    <div className="common-line">

                        <span className="common-label l-label" style={{float:'left'}} >开始时间：</span>
                        <span style={{float:'left'}} >
                            <Calendar data={today} ctrlName='transferDate1'/>
                        </span>
                        <span className="common-label r-label" style={{float:'left',marginLeft:'120px'}}>结束时间：</span>
                        <span style={{}} >
                            <Calendar data={today} ctrlName='transferDate2'/>
                        </span>
                        <div className="clearfix"/>
                    </div>

                    <div className="common-line">

                        <span className="common-label l-label" style={{}}>活动地点：</span>
                        <span>
                            <select className="common-input" style={{color:'#000000!important',width:'190px',lineHeight:'13px'}} id="eventPlace">
                                <option value={-1}>请选择</option>
                                {eventPlaceList}
                            </select>
                        </span>
                        <span className="common-label r-label">活动类型：</span>
                        <span>
                            <select className="common-input" style={{color:'#000000!important',width:'190px',lineHeight:'13px'}} id="eventType">
                                <option value={-1}>请选择</option>
                                <option value={1}>群活动</option>
                                <option value={0}>公开活动</option>
                            </select>
                        </span>



                    </div>
                    <div className="common-line">
                        <span className="common-label l-label"> 选择小组：</span>
                        <span>
                                <select className="common-input" style={{color:'#000000!important',width:'190px',lineHeight:'13px'}} id="eventGroup">
                                    <option value={-1}>请选择</option>
                                    {eventGroupList}
                                </select>
                        </span>
                        <span className="common-label r-label">是否需要陪练：</span>
                        <span>
                            <select className="common-input" style={{color:'#000000!important',width:'163px',lineHeight:'13px'}} id="hasSparring">
                                <option value={-1}>请选择</option>
                                <option value={1}>是</option>
                                <option value={0}>否</option>
                            </select>
                        </span>
                    </div>

                    <div className="common-line">
                        <span className="common-label l-label">最多人数：</span>
                        <span>
                            <input type="text" name="eventMaxMemNum" className="common-input" tabIndex="5"></input>
                        </span>
                    </div>

                    <div className="save-line" style={{position:'absolute'}}>
                        <span>
                            <button className="save-Btn" onClick={this.doSave}>保存</button>
                        </span>
                    </div>

                </div>

        } else{
            this.initialData();
        }
        return mainContent;
    },
});

module.exports=CreateEvent;