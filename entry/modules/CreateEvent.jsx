/**
 * Created by dellbin on 2017/6/27.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';
import Calendar from '../../components/basic/Calendar.jsx';
import '../../css/entry/modules/create.css';

var today=new Date().toLocaleDateString().replace("/", "-").replace("/", "-");
var ProxyQ = require('../../components/proxy/ProxyQ');

var CreateEvent = React.createClass({

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

    doSave: function () {
        var createEvent = this.refs['createEvent'];
        var eventName = $(createEvent).find("input[name='eventName']").val();
        var eventBrief = $(createEvent).find("input[name='eventBrief']").val();
        var transferDate = $(createEvent).find("input[name='transferDate']").val();
        var eventPlace = $('#eventPlace option:selected').val();
        var eventMaxMemNum = $(createEvent).find("input[name='eventMaxMemNum']").val();
        var hasSparring = $('#hasSparring option:selected').val();
        var eventType = $('#eventType option:selected').val();
        var reg = new RegExp("^[0-9]*$");

        if (eventName == "") {
            this.showTips('请填写活动名称~');
        } else if (eventBrief == "") {
            this.showTips('请填写活动简介~');
        } else if (transferDate == "") {
            this.showTips('请选择活动时间~');
        } else if (eventPlace == "-1") {
            this.showTips('请选择活动地点~');
        } else if (eventMaxMemNum == "") {
            this.showTips('请填写活动最大人数~');
        } else if(!reg.test(eventMaxMemNum)){
            this.showTips("最大人数只能为数字~");
        }  else if (hasSparring == "-1") {
            this.showTips('请选择是否需要陪练~');
        } else if (eventType == "-1") {
            this.showTips('请选择活动类型~');
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
        var url="/func/events/getVenueUnit";
        var params={};

        ProxyQ.query(
            'get',
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
        return ({personId: personId, data:null});
    },

    render:function(){
        var mainContent = null;
        var data = this.state.data;
        var eventPlaceList = [];

        if(data!==undefined && data!==null){

            data.map(function(item, i){
                eventPlaceList.push(<option key={i} value={item.unitId}>{item.name}</option>);
            });

            mainContent=
                <div ref="createEvent" className="c-block">
                    <div className="common-line">
                        <span className="common-label l-label">活动名称：</span>
                        <span>
                            <input type="text" name="eventName" className="common-input" tabIndex="1"></input>
                        </span>

                        <span className="common-label r-label">活动简介：</span>
                        <span>
                            <input type="text" name="eventBrief" className="common-input" tabIndex="2"></input>
                        </span>
                    </div>
                    <div className="common-line">
                        <span className="common-label l-label">活动时间：</span>
                        <span >
                            <Calendar data={today} ctrlName='transferDate'/>
                        </span>
                        <span className="common-label r-label">活动地点：</span>
                        <span>
                            <select className="common-input" style={{color:'#000000!important',width:'190px',lineHeight:'13px'}} id="eventPlace">
                                <option value={-1}>请选择</option>
                                {eventPlaceList}
                            </select>
                        </span>
                    </div>
                    <div className="common-line">
                        <span className="common-label l-label">最多人数：</span>
                        <span>
                            <input type="text" name="eventMaxMemNum" className="common-input" tabIndex="5"></input>
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
                        <span className="common-label l-label">活动类型：</span>
                        <span>
                            <select className="common-input" style={{color:'#000000!important',width:'190px',lineHeight:'13px'}} id="eventType">
                                <option value={-1}>请选择</option>
                                <option value={1}>群活动</option>
                                <option value={0}>公开活动</option>
                            </select>
                        </span>
                    </div>

                    <div className="save-line">
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