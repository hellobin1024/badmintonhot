import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import { connect } from 'react-redux';
import Calendar from './components/Calendar.jsx';
import MultipleSelect from './MultipleSelect';
import RightSlide from './components/RightSilde'
var Proxy = require('../../components/proxy/ProxyQ');
var Tips = require('../../components/basic/Tips');
var Event = React.createClass({


    getInitialState: function () {
        var token=this.props.token;
        return ({
            token:token,yard:[]
        });
    },
    initialData:function(){
        if(this.state.event!==null&&this.state.event!==undefined){
            this.getAllGroups();
        }else {
            this.getAllEvents();
        }
        if(this.state.group!==null&&this.state.group!==undefined) {
            this.getAllEvents();
        }else {
            this.getAllGroups();
        }

    },
    dateFormat:function (date) {//object时间转时间格式"yyyy-mm-dd hh:mm:ss"
        return (new Date(date)).toLocaleDateString() + " " + (new Date(date)).toLocaleTimeString();
    },
    showEventsDetail:function (item) {
        var url = "/func/allow/getEventMemberByEventId";
        var param={
            id:item.eventId
        }
        var ref = this;
        Proxy.query(
            'POST',
            url,
            param,
            null,
            function (res) {
                var a = res.data;
                  var member = "";
                   for (var i = 0; i < a.length; i++){
                    member += " " + a[i].loginName
                   }
                  var costType2="";
                  for (var i = 0; i < a.length; i++){
                    costType2= ref.getStandard(a[i].costType);
                    item.costType2=costType2;
                  }
                  item.member = member;
                  if(item.placeYardStr!=""&&item.placeYardStr!=undefined){
                    var b=[];
                    var c=[];
                    b=item.placeYardStr.split(",");
                    for(var j=0;j<b.length;j++)
                    {
                      //var s="场地"+b[j]+"";
                        c[j]=b[j];
                    }
                    item.yard=c;
                 }
                  ref.setState({modal: item});
                if(item.isChooseYardTime=="1"){

                    var url="/func/allow/getAllVenueUnitTime";
                    var params={
                        unitId:item.eventPlaceId,
                        placeYardStr:item.placeYardStr

                    };

                    Proxy.query(
                        'post',
                        url,
                        params,
                        null,
                        function(ob) {
                            var reCode = ob.re;
                            if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) { //数据获取失败
                                return;
                            }
                            var data=ob.data;
                            var unitperson =[];
                            for (var i=0;i<data.length;i++){

                                var a1="场地"+data[i].unitNum;
                                var a2=data[i].timeInterval1;
                                var a3=data[i].timeInterval2;
                                var a4=data[i].timeInterval3;
                                var a5=data[i].timeInterval4;
                                var a6=data[i].timeInterval5;
                                var a7=data[i].timeInterval6;
                                var a8=data[i].timeInterval7;
                                var a9=data[i].timeInterval8;
                                var a10=data[i].timeInterval9;
                                var b=[];
                                b[0]=a1;
                                b[1]=a2;
                                b[2]=a3;
                                b[3]=a4;
                                b[4]=a5;
                                b[5]=a6;
                                b[6]=a7;
                                b[7]=a8;
                                b[8]=a9;
                                b[9]=a10;
                               unitperson.push(b);
                            }
                            ref.setState({unitperson:unitperson});
                        }.bind(this),
                        function(xhr, status, err) {
                            console.error(this.props.url, status, err.toString());
                        }.bind(this)
                    );


                    var successModal = ref.refs['successModal'];
                    $(successModal).modal('show');
                }else{
                    var successModal2 = ref.refs['successModal2'];
                    $(successModal2).modal('show');
                }


            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );

    },
    closeModal:function () {
        var successModal = this.refs['successModal'];
        $(successModal).modal('hide');
        var successModal2 = this.refs['successModal2'];
        $(successModal2).modal('hide');
    },

    eventSignUp:function (item) {
        var ref=this;
        if(this.state.token!==null&&this.state.token!==undefined){
        var url = "/func/allow/eventSignUp";
        if(item.isChooseYardTime=="1"){
            var select = $('#yardplace option:selected').val();
            var a1=item.startTimeStr;
            var a2=a1.substring(0,11);
            var b1=item.endTimeStr;
            var b2=b1.substring(0,11);
            var startTime = $(Event).find("input[name='startTime']").val();
            var endTime = $(Event).find("input[name='endTime']").val();

            if(startTime.length==4){
                startTime="0"+startTime;
            }
            if(endTime.length==4){
                endTime="0"+endTime;
            }
            if(startTime>=endTime){
                Tips.showTips("开始时间必须大于当前时间~");
                return;
            }
            if(startTime<"09:00"){
                Tips.showTips("开始时间必须大于9.00~");
                return;
            }
            if(endTime>"17.00"){
                Tips.showTips("结束时间必须小于17.00~");
                return;
            }
            var a3=a2+ startTime+":00";
            var b3=b2+ endTime+":00";
            var param={
                id:item.eventId,
                isChooseYardTime:item.isChooseYardTime,
                placeYardStr:select,
                startTime:a3,
                endTime:b3,
                unitId:item.eventPlaceId,
            }

        }else{
            var param={
                id:item.eventId,
                isChooseYardTime:item.isChooseYardTime,
                placeYardStr: "",
                startTime:"",
                endTime:"",
                unitId:""
            }

        }

        var now=item.membernumber;
        var max=item.eventMaxMemNum;

        if(now+1>max){
            alert("人数已满，不能报名！");
        }
        var ref = this;
        Proxy.query(
            'POST',
            url,
            param,
            null,
            function (res) {

                if(res.re==-1||res.re=="-1"){
                    alert(res.data);
                    //ref.initialData();
                }
                alert(res.data);
                ref.getAllEvents();
                ref.closeModal();
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
        }else{
            alert("您尚未登录！");
        }

    },
    groupSignUp:function (item) {
        if(this.state.token!==null&&this.state.token!==undefined){
            var url = "/func/allow/groupSignUp";
            var param={
                id:item
            }
            var ref = this;
            Proxy.query(
                'POST',
                url,
                param,
                null,
                function (res) {
                    if(res.re==1||res.re=="1"){
                        alert(res.data);
                        ref.initialData();
                    }

                    ref.closeModal();
                },

                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }
            );
        }else{
            alert("您尚未登录！");
        }

    },
    getAllEvents:function () {
        if(this.props.token!=null)
        {
            var url = "/func/allow/getCheckedEvents";//登录了以后

        }else{

            var url = "/func/allow/getEvents";//未登录
        }

        var ref = this;
        Proxy.query(
            'POST',
            url,
            {},
            null,
            function (res) {
                var a = res.data;
                var costType2="";
                var members=new Array();
                for (var i = 0; i < a.length; i++){
                    costType2= ref.getStandard(a[i].costType);
                    a[i].costType2=costType2;
                    if(a[i].eventMember!=""&&a[i].eventMember!=undefined){
                    members =a[i].eventMember.split(",");
                    a[i].membernumber=members.length;
                    if(members==""){
                        a[i].membernumber=0;
                    }
                    }else{
                        a[i].membernumber=0;
                    }
                    var b=[];
                    var s="";
                    if(a[i].placeYardStr!=""&&a[i].placeYardStr!=undefined){
                    b=a[i].placeYardStr.split(",");

                    for(var j=0;j<b.length;j++)
                    {
                        s=s+"场地"+b[j]+" ";
                    }
                    a[i].eventPlaceName=a[i].eventPlaceName+" "+s;
                    var yard=[];
                    for(var j=0;j<b.length;j++)
                    {
                            yard[j]="场地"+(j+1)+"";
                    }
                    ref.setState({yard:yard});

                    } else {

                            a[i].eventPlaceName == "";
                        }
                        var c = a[i].endTimeStr;
                        var d = c.substring(11);
                        a[i].time = (a[i].startTimeStr + "-" + d + "").substring(5);

                    }
                    if (res.re == 1) {
                        ref.setState({event: a});
                    } else {
                        ref.setState({event: 0});
                    }

            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
    },
    getAllGroups:function () {
        var url = "/func/allow/getGroups";
        var ref = this;
        Proxy.query(
            'POST',
            url,
            {},
            null,
            function (res) {
                var a = res.data;
                if(res.re==1) {
                    ref.setState({group: a});
                }else{
                    ref.setState({group: 0});
                }
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
    },
    getStandard:function (costType) {
        var type={};
        if(costType==1){
            type="按每人收费";
        }else if(costType==2){

            type="按每小时收费";
        }else if(costType==3){

            type="总费用";
        }else if(costType==4){

            type="按每人次收费";
        }else if(costType==5){

            type="按每人每小时收费";
        }else {

            type="按场地小时收费";
        }
       return type;
    },

    render:function() {
        var contains = null;

        if(this.state.event!==null&&this.state.event!==undefined
        &&this.state.group!==null&&this.state.group!==undefined) {
            var event = this.state.event;
            var group = this.state.group;
            var isLand=this.props.token;
            var yardplace=this.state.yard;
            var trs = [];
            var grs = [];
            var tmrs=[];
            var ref = this;
            if(event!=0) {
                event.map(function (item, i) {

                    if (i%3 == 0) {

                        trs.push(
                            <div className="basic_first" key={"event" + i}>

                                <div className="business" onClick={ref.showEventsDetail.bind(null, item)}  >
                                    <h2>{item.eventName}</h2>
                                    <p><span>地点：</span>{item.eventPlaceName}</p>
                                </div>
                                <div className="value"  onClick={ref.showEventsDetail.bind(null, item)}  >
                                    <p><span>组织者：</span>{item.eventManagerLoginName}</p>
                                </div>
                                <ul onClick={ref.showEventsDetail.bind(null, item)}  >
                                    <li><span>时间：</span> {item.time}</li>
                                    <li><span>已报名：</span> {item.membernumber}人</li>
                                    <li><span>简介：</span> {item.eventBrief}</li>
                                    <li><span>收费标准：</span> {item.cost+"元/"+item.costType2}</li>

                                </ul>
                                <div className="buy-me">
                                    <a onClick={ref.showEventsDetail.bind(null, item)}>详情</a>


                                </div>



                            </div>
                        )
                    }
                    else {
                        trs.push(
                            <div className="basic" key={"event" + i}>
                                <div className="business" onClick={ref.showEventsDetail.bind(null, item)} >
                                    <h2>{item.eventName}</h2>
                                    <p><span>地点：</span>{item.eventPlaceName}</p>
                                </div>
                                <div className="value" onClick={ref.showEventsDetail.bind(null, item)} >
                                    <p><span>组织者：</span>{item.eventManagerLoginName}</p>
                                </div>
                                <ul onClick={ref.showEventsDetail.bind(null, item)} >
                                    <li><span>时间：</span> {item.time}</li>
                                    <li><span>已报名：</span> {item.membernumber}人</li>
                                    <li><span>简介：</span> {item.eventBrief}</li>
                                    <li><span>收费标准：</span> {item.cost+"元/"+item.costType2}</li>
                                </ul>
                                <div className="buy-me">
                                    <a onClick={ref.showEventsDetail.bind(null, item)}>详情</a>
                                </div>
                            </div>
                        )
                    }
                })
            }else{
                trs.push(
                    <div>暂无数据！</div>
                )
            }
            if(group !=0) {
                group.map(function (item, i) {
                    if (i%3 == 0) {
                        grs.push(
                            <div className="basic_first" key={"group" + i}>

                                <div className="business">
                                    <h2>{item.groupName}</h2>
                                </div>
                                <div className="value">
                                    <p><span>群主：</span>{item.groupManagerLoginName}</p>
                                </div>
                                <ul>
                                    <li><span>现有人数：</span> {item.groupNowMemNum}人</li>
                                    <li><span>简介：</span> {item.groupBrief}</li>
                                    <li><span>成员：</span> {item.memberName}</li>
                                </ul>

                                {
                                    isLand!=null&&item.isSignUP==1?
                                        <div className="buy-me">
                                            <a >已加入</a>
                                        </div>:null
                                }
                                {
                                    isLand!=null&&item.isSignUP==0?
                                        <div className="buy-me">
                                            <a onClick={ref.groupSignUp.bind(null, item.groupId)}>加入</a>
                                        </div>:null
                                }



                            </div>
                        )
                    } else {
                        grs.push(
                            <div className="basic" key={"group" + i}>

                                <div className="business">
                                    <h2>{item.groupName}</h2>
                                </div>
                                <div className="value">
                                    <p><span>群主：</span>{item.groupManagerLoginName}</p>
                                </div>
                                <ul>
                                    <li><span>现有人数：</span> {item.groupNowMemNum}人</li>
                                    <li><span>简介：</span> {item.groupBrief}</li>
                                    <li><span>成员：</span> {item.memberName}</li>
                                </ul>

                                {
                                    isLand!=null&&item.isSignUP==1?
                                        <div className="buy-me">
                                            <a >已加入</a>
                                        </div>:null
                                }
                                {
                                    isLand!=null&&item.isSignUP==0?
                                        <div className="buy-me">
                                            <a onClick={ref.groupSignUp.bind(null, item.groupId)}>加入</a>
                                        </div>:null
                                }
                            </div>
                        )
                    }
                })
            }else {
                grs.push(
                    <div>暂无数据！</div>
                )
            }

            var mrs = [];
            var yards=[];
            if(this.state.modal!==null&&this.state.modal!==undefined){
                var item = this.state.modal;
                if(item.yard!==null&&item.yard!==undefined){
                    var yarde=item.yard;
                    yarde.map(function(item, i){
                        yards.push(<option key={i} value={item}>{"场馆"+item}</option>);
                    });
                }
                var brs=[];

                if(this.state.unitperson!==null&&this.state.unitperson!==undefined){
                    for(var i=0;i<this.state.unitperson.length;i++){
                        var rs=[];

                        this.state.unitperson[i].map(function(item, i){
                            rs.push(<td key={i} value={i+1}>{item}</td>);
                        });
                        brs.push(<tr key={i} value={i+1}>{rs}</tr>);

                    }

                }
                mrs.push(
                    <div ref="Event" >
                    <div style={{textAlign: 'center'}} key='modal'>
                        <div style={{height: '30px',textAlign: 'center',background:'#344859'}}>
                            <div id="eventMaxNum" style={{float: 'left',marginLeft:'150px'}}><span style={{fontSize: '14px'}} >最大需求人数：</span>{item.eventMaxMemNum}<span>  </span><span style={{fontSize: '14px'}} >参与者：</span>{item.eventMember}
                            </div>
                            {
                                item.money!=null? <div style={{float: 'left',fontSize: '14px',marginLeft:'5px'}}>
                                    <span style={{float: 'left',fontSize: '14px',marginLeft:'5px'}}>缴费状态：</span>已缴费{item.money+"/元"}</div>:
                                    <div style={{float: 'left',fontSize: '14px',marginLeft:'5px'}} ><span>缴费状态：</span>未交费</div>
                            }

                        </div>
                        <div>
                            <table className="table table-striped invoice-table">
                                <thead className="table-head">
                                <tr>
                                    <th width="20%">场地编号</th>
                                    <th width="15%">8.00-9.00</th>
                                    <th width="15%">9.00-10.00</th>
                                    <th width="15%">10.00-11.00</th>
                                    <th width="15%">11.00-12.00</th>
                                    <th width="15%">12.00-13.00</th>
                                    <th width="15%">13.00-14.00</th>
                                    <th width="15%">14.00-15.00</th>
                                    <th width="15%">15.00-16.00</th>
                                    <th width="15%">16.00-17.00</th>
                                </tr>
                                </thead>
                                    { /*<td>场馆一</td>
                                    <td>2</td>
                                    <td>2</td>
                                    <td>2</td>
                                    <td>1</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>*/}
                                    {brs}


                            </table>
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
                            <span style={{float:'left'}} className="common-label l-label" >选择所需的场地：</span>
                        <span style={{float:'left'}}>
                              <select className="common-input" style={{color:'#000000!important',width:'163px',lineHeight:'16px'}} id="yardplace">
                                  {yards}
                              </select>
                        </span>
                            <div className="clearfix"></div>
                        </div>
                        <div>
                        <div className="buy-me" style={{marginTop:'20px'}}>
                            {item.eventMaxMemNum>item.membernumber&&item.isSignUp==0?
                                <a onClick={ref.eventSignUp.bind(null,item)}>报名</a>:null
                            }
                            {item.eventMaxMemNum<item.membernumber&&item.isSignUp==0?
                                <a onClick={function(){alert("抱歉！您报名的活动已满员！")}}>人员已满</a>:null
                            }
                            {item.eventMaxMemNum>item.membernumber&&item.isSignUp==1?
                                <a >您已报名</a>:null
                            }
                        </div>
                        </div>
                      </div>

                    </div>
                )
            }
            var tmrs = [];
            if(this.state.modal!==null&&this.state.modal!==undefined){
                var item = this.state.modal;
                tmrs.push(
                    <div style={{textAlign: 'center'}} key='modal' >
                        <div className="business">
                            <h2 id="CLassTitle">{item.eventName}</h2>
                            <p id="eventPlace"><span>地点：</span>{item.eventPlaceName}</p>
                        </div>
                        <ul>
                            <li id="eventTime"><span>最大活动人数:</span>{item.eventMaxMemNum}</li>
                            <li id="eventMaxNum"><span>参与者:</span>{item.eventMember}</li>
                            {
                                item.money!=null? <li>
                                    <span >缴费状态：</span>已缴费{item.money+"/元"}</li>:
                                    <li><span>缴费状态：</span>未交费</li>
                            }
                        </ul>
                        <div className="buy-me">
                            {item.eventMaxMemNum>item.membernumber&&item.isSignUp==0?
                                <a onClick={ref.eventSignUp.bind(null,item)}>报名</a>:null
                            }
                            {item.eventMaxMemNum<item.membernumber&&item.isSignUp==0?
                                <a onClick={function(){alert("抱歉！您报名的活动已满员！")}}>人员已满</a>:null
                            }
                            {item.eventMaxMemNum>item.membernumber&&item.isSignUp==1?
                                <a >您已报名</a>:null
                            }
                        </div>
                    </div>


                )
            }
            contains =
                <div>
                    <div className="banner-bottom">
                        <div className="container">
                            <div className="faqs-top-grids">
                                <div className="product-grids">
                                    <div className="col-md-8 news_content">
                                        <ul id="myTab" className="nav nav-tabs">
                                            <li className="active" id="events" style={{width:'50%'}}>
                                                <a href="#home"  data-toggle="tab" style={{textAlign:'center',fontSize:'15px',color: '#337ab7',backgroundColor: 'white'}}>
                                                    活动
                                                </a>
                                            </li>
                                            <li id="groups"style={{width:'50%'}}>
                                                <a href="#ios"  data-toggle="tab"  style={{textAlign:'center',fontSize:'15px',color:'#337ab7',backgroundColor: 'white'}}>
                                                    群圈
                                                </a>
                                            </li>
                                        </ul>
                                        <div id="myTabContent" className="tab-content">
                                            <div className="tab-pane fade in active" id="home">
                                                {trs}
                                            </div>
                                            <div className="tab-pane fade" id="ios">
                                                {grs}
                                            </div>
                                        </div>
                                    </div>
                                    <RightSlide/>
                                    <div className="clearfix"></div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade bs-example-modal-sm login-container"
                         tabIndex="-1"
                         role="dialog"
                         aria-labelledby="myLargeModalLabel"
                         aria-hidden="true"
                         ref='successModal'
                         data-keyboard="false"
                         style={{zIndex: 1045}}>
                        <div className="modal-dialog modal-sm"
                             style={{position: 'absolute', top: '30%', width: '50%', marginLeft: '25%'}}>
                            <div className="modal-content"
                                 style={{position: 'relative', width: '750px', padding: '40px'}}>

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
                         ref='successModal2'
                         data-keyboard="false"
                         style={{zIndex: 1045}}>
                        <div className="modal-dialog modal-sm"
                             style={{position: 'absolute', top: '30%', width: '50%', marginLeft: '25%'}}>
                            <div className="modal-content"
                                 style={{position: 'relative', width: '750px', padding: '40px'}}>

                                <div className="modal-body">
                                    <div className="modalEventDetail">
                                        {tmrs}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
        }else{
            this.initialData();
        }

        return contains;
    },
    componentDidMount:function () {
        $('#placeStr').selectpicker('refresh');
        $('#placeStr').selectpicker('show');
    }

});

const mapStateToProps = (state, ownProps) => {
    const props = {
        token: state.userInfo.accessToken,
    }
    return props
}
export default connect(mapStateToProps)(Event);


