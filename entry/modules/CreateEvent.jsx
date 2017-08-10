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



    getWeek:function () {
        const Today=new Date();

        var myDay=new Array();

        for(var i=0;i<7;i++){
            var millsec=Today.getTime()+i*24*60*60*1000;
            myDay[i]=millsec;
        }

        var setDay=new Array();
        setDay[0]='取消';
        for(var j=0;j<7;j++)
        {
            var day1=new Date(myDay[j]);
            setDay[j+1]=day1;
        }


        var req = [];
        for(var k=1;k<8;k++){
            var date=new Date(setDay[k]);
            var month=date.getMonth()+1;
            var w=date.getDay();
            var day=date.getDate();
            var a;
            var finalShow={};
            switch(w){
                case 0:a= '星期天';break;
                case 1:a= '星期一';break;
                case 2:a= '星期二';break;
                case 3:a= '星期三';break;
                case 4:a= '星期四';break;
                case 5:a= '星期五';break;
                case 6:a= '星期六';break;

            }
            finalShow.lable=a+'('+month+'月'+day+'日)';
            finalShow.value=(w==0?7:w);
            req.push(finalShow);
        }
        return req;
    },
    getDay:function (chooseweek) {
        const Today=new Date();

        var myDay=new Array();

        for(var i=0;i<7;i++){
            var millsec=Today.getTime()+i*24*60*60*1000;
            myDay[i]=millsec;
        }

        var setDay=new Array();
        for(var j=0;j<7;j++)
        {
            var day1=new Date(myDay[j]);
            setDay[j+1]=day1;
        }


        var finalShow={};
        var data1;
        for(var k=1;k<8;k++){
            var date=new Date(setDay[k]);
            var month=date.getMonth()+1;
            var w=date.getDay();
            var day=date.getDate();
            var a;

            chooseweek==7?0:chooseweek;

            switch(w){
                case 0:a= '星期天';break;
                case 1:a= '星期一';break;
                case 2:a= '星期二';break;
                case 3:a= '星期三';break;
                case 4:a= '星期四';break;
                case 5:a= '星期五';break;
                case 6:a= '星期六';break;

            }
            if(chooseweek==w){
                var month1;
                if(month<=10)
                    month1="0"+month;
                else
                    month1=month;
                var day1;
                if(day<=10)
                    day1="0"+day;
                else
                    day1=day;

                finalShow='2017-'+month1+'-'+day1;
            }
        }
        return finalShow;
    },


    doSave: function () {
        var createEvent = this.refs['createEvent'];
        var eventName = $(createEvent).find("input[name='eventName']").val();
        var eventBrief = $(createEvent).find("input[name='eventBrief']").val();
        var chooseWeek = $('#chooseWeek option:selected').val();
        var eventPlace = $('#eventPlace option:selected').val();
        var eventGroup = $('#eventGroup option:selected').val();
        var startTime = $(createEvent).find("input[name='startTime']").val();
        var endTime = $(createEvent).find("input[name='endTime']").val();
        var classTrainer= $('#classTrainer option:selected').val();
        var eventMaxMemNum = $(createEvent).find("input[name='eventMaxMemNum']").val();
        var eventType = $('#eventType option:selected').val()
        var memberLevel = $('#level option:selected').val();
        var costType = $('#costType option:selected').val();
        var eventCost = $(createEvent).find("input[name='eventCost']").val();
        var IsSchedule=0;
        var IsSparing=0;


        if(document.getElementById("periodFlag").checked){

            IsSchedule=1;
        }
        else{

            IsSchedule=0;
        }
        if(document.getElementById("IsSparing").checked){

            IsSparing=1;
        }
        else{

            IsSparing=0;
        }
        var reg = new RegExp("^[0-9]*$");

        var data1=this.getDay(chooseWeek);

        var eventPlaceId = parseInt(eventPlace);
        var classTrainer = parseInt(classTrainer);
        var eventMaxMemNum2 = parseInt(eventMaxMemNum);
        var eventCost = parseInt(eventCost);
        var IsSparing = parseInt(IsSparing);
        var eventGroup = parseInt(eventGroup);
        var chooseWeek = parseInt(chooseWeek);
        if(classTrainer==-1)
        {
            classTrainer=null;
        }

        startTime=data1+" "+startTime+":00";
        var time1 = Date.parse(startTime);
        var newDate1 = new Date(time1);

        endTime=data1+" "+endTime+":00";
        var time2 = Date.parse(endTime);
        var newDate2 = new Date(time2);

        const Today=new Date();
        if(newDate1<Today){
            Tips.showTips("开始时间必须大于当前时间~");
        }else if(newDate1>newDate2){
            Tips.showTips("开始时间不能大于结束时间~");
        }else if (eventName == "") {
            Tips.showTips('请填写活动名称~');
        } else if (eventBrief == "") {
            Tips.showTips('请填写活动简介~');
        } else if (eventMaxMemNum == "") {
            Tips.showTips('请填写活动最大人数~');
        } else if(!reg.test(eventMaxMemNum)){
            Tips.showTips("最大人数只能为数字~");
        } else if(!reg.test(eventCost)){
            Tips.showTips("最大人数只能为数字~");
        } else {

            var url="/func/allow/createEvents";
            var params={
                eventManagerId:parseInt(this.state.personId),
                eventName:eventName,
                eventBrief:eventBrief,
                eventDate:chooseWeek,
                eventPlaceId:eventPlaceId,
                eventMaxMemNum:eventMaxMemNum2,
                coachId:classTrainer,
                groupId:eventGroup,
                eventType:eventType,
                startTime:startTime,
                endTime:endTime,
                IsSchedule:IsSchedule,
                memberLevel:memberLevel,
                cost:eventCost,
                isNeedSparring:IsSparing,
                feeDes:"",
                eventNowMemNum:1,
                status:0,
                costType:costType

            };
            ProxyQ.query(
                'post',
                url,
                params,
                null,
                function(ob) {
                    var reCode = ob.re;
                    if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) { //操作失败
                        alert("创建失败");
                        return;
                    }
                    alert("创建成功");
                }.bind(this),
                function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
    },

    initialData:function(){
        var url="/func/events/getVenueUnitGroupTrainer";
        var params={};

        ProxyQ.query(
            'post',
            url,
            params,
            null,
            function(ob) {
                var reCode = ob.re;
                if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) { //数据获取失败
                    alert(ob.response)
                    return;
                }
                var data=ob.data;
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
        var eventTrainerList = [];
        var weekList=[];


        if(data!==undefined && data!==null){

            var data4=this.getWeek();
            var data1=data.listGroupInfo;
            var data2=data.listVenueUnit;
            var data3=data.listTrainer;
            data2.map(function(item, i){
                eventPlaceList.push(<option key={i} value={item.unitId}>{item.name}</option>);
            });
            data1.map(function(item, i){
                eventGroupList.push(<option key={i} value={item.groupId}>{item.groupName}</option>);
            });
            data3.map(function(item, i){
                eventTrainerList.push(<option key={i} value={item.infoPersonInfo.personId}>{item.infoPersonInfo.perNum}</option>);
            });
            data4.map(function(item, i){
                weekList.push(<option key={i} value={item.value}>{item.lable}</option>);
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
                            <select className="common-input" style={{color:'#000000!important',width:'190px',lineHeight:'16px'}} id="chooseWeek">
                                {weekList}
                            </select>
                        </span>
                        <span className="common-label r-label" >是否为周期活动</span>
                        <input type="checkbox"  style={{marginLeft:'30px',width:'inherit',height:'inherit'}} name="periodFlag"  id="periodFlag"  value="是否为周期活动"  />
                    </div>
                    <div className="common-line">
                        <div style={{float:'left',width:'300px'}}>
                        <span className="common-label l-label" style={{float:'left'}} >开始时间：</span>
                        <span className="input-group clockpicker" data-placement="right" data-align="top" data-autoclose="true" style={{width:'100px'}}>
                            <input type="text" className="form-control" style={{width:'100px'}} value="9:30"  name="startTime"/>
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-time"></span>
                                            </span>
                             <div className="clearfix"/>
                        </span>
                        </div>
                        <div style={{float:'left',width:'300px'}}>
                        <span className="common-label r-label" style={{float:'left'}}>结束时间：</span>
                        <span className="input-group clockpicker" data-placement="right" data-align="top" data-autoclose="true" style={{width:'100px'}}>
                            <input type="text" className="form-control" value="11:30" style={{width:'100px'}} name="endTime"/>
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-time"></span>
                                            </span>
                             <div className="clearfix"/>
                        </span>
                                </div>


                        <div className="clearfix"/>
                    </div>

                    <div className="common-line">

                        <span className="common-label l-label" style={{}}>活动地点：</span>
                        <span>
                            <select className="common-input" style={{color:'#000000!important',width:'190px',lineHeight:'16px'}} id="eventPlace">
                                {eventPlaceList}
                            </select>
                        </span>
                        <span className="common-label r-label">活动类型：</span>
                        <span>
                            <select className="common-input" style={{color:'#000000!important',width:'190px',lineHeight:'16px'}} id="eventType">
                                <option value={1}>群活动</option>
                                <option value={0}>公开活动</option>
                            </select>
                        </span>



                    </div>
                    <div className="common-line">
                        <span className="common-label l-label"> 选择小组：</span>
                        <span>
                                <select className="common-input" style={{color:'#000000!important',width:'190px',lineHeight:'16px'}} id="eventGroup">
                                    {eventGroupList}
                                </select>
                        </span>
                        <span className="common-label r-label" >选择教练：</span>
                        <span>
                                <select className="common-input" style={{color:'#000000!important',width:'190px',lineHeight:'16px'}} id="classTrainer">
                                    <option value={-1}>请选择</option>
                                    {eventTrainerList}
                                </select>
                        </span>

                    </div>

                    <div className="common-line">
                        <span className="common-label l-label">最多人数：</span>
                        <span>
                            <input type="text" name="eventMaxMemNum" className="common-input" tabIndex="5"></input>
                        </span>
                        <span className="common-label r-label">选择水平：</span>
                        <span>
                            <select className="common-input" style={{color:'#000000!important',width:'163px',lineHeight:'16px'}} id="level">
                                <option value={1}>业余小白</option>
                                <option value={2}>初级爱好者</option>
                                <option value={3}>业余高手</option>
                                <option value={4}>专业运动员</option>
                            </select>
                        </span>
                    </div>
                    <div className="common-line">
                        <span className="common-label l-label">收费类型：</span>
                        <span>
                            <select className="common-input" style={{color:'#000000!important',width:'190px',lineHeight:'16px'}} id="costType">
                                <option value={1}>按每人收费</option>
                                <option value={2}>按每小时收费</option>
                                <option value={3}>总费用</option>
                                <option value={4}>按每人次收费</option>
                                <option value={5}>按每人每小时收费</option>
                                <option value={6}>按场地小时收费</option>
                            </select>
                        </span>
                        <span className="common-label r-label">收费标准：</span>
                        <span>
                            <input type="text" name="eventCost" className="common-input" tabIndex="5"></input>
                        </span>
                    </div>
                    <div className="common-line">
                        <span className="common-label l-label" >是否需要陪练</span>
                        <input type="checkbox" style={{marginLeft:'30px',width:'inherit',height:'inherit'}} name="IsSparing" id="IsSparing"  value="是否需要陪练"  />
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
    componentDidMount:function () {
        $(document).click(function () {
            $('.clockpicker').clockpicker()
                .find('input').change(function(){
                    // TODO: time changed
                    console.log(this.value);
                });
            $('#demo-input').clockpicker({
                autoclose: true
            });
        })
    }
});

module.exports=CreateEvent;