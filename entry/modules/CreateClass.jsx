/**
 * Created by dellbin on 2017/6/27.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';
import Calendar from '../../components/basic/Calendar.jsx';
import '../../css/entry/modules/create.css';
var Tips = require('../../components/basic/Tips');

var today=new Date().toLocaleDateString().replace("/", "-").replace("/", "-");
var ProxyQ = require('../../components/proxy/ProxyQ');

var CreateEvent = React.createClass({

    doSave: function () {
        var createClass = this.refs['createClass'];
        var hasCoach="";
        if(document.getElementById("Trainflag").checked){

            hasCoach="1";
        }
        else{

            hasCoach="0";
        }

        var demandBrief=document.getElementById("demandBrief").value;
        //var deadline=$(createClass).find("input[name='deadline']").val();
        var classTrainer = $('#classTrainer option:selected').val();
        var reg = new RegExp("^[0-9]*$");

        if (demandBrief == "") {
            Tips.showTips('请填写课程要求~');
        }else {

            var url="/func/allow/createClass";
            var params={
                demandBrief:demandBrief,
                coachId:classTrainer,
                hasCoach:hasCoach

            };
            ProxyQ.query(
                'post',
                url,
                params,
                null,
                function(ob) {
                    var reCode = ob.re;
                    if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) { //操作失败

                        return;
                    }
                   alert("创建成功！");
                }.bind(this),
                function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
    },

    initialData:function(){
        var url="/func/allow/getAllTrainer";


        ProxyQ.query(
            'get',
            url,
            null,
            null,
            function(ob) {
                var reCode = ob.re;
                if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) { //数据获取失败

                    return;
                }
                var data=ob.data;
                this.setState({data:data});
                $("#Trainflag").prop('checked',false);
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    test:function () {
        $('#startTime').timepicker();
        $('#endTime').timepicker();
    },
    getInitialState: function () {
        var personId = null;
        if(this.props.personId!==undefined && this.props.personId){
            personId = this.props.personId;
        }
        return ({personId: personId, data:null});
    },
    test1:function(){
        if(document.getElementById("Trainflag").checked)
        {
            $("#selectTrainer").attr("style","display:block");

        }else{
            $("#selectTrainer").attr("style","display: none");


        }
    },
    render:function(){
        var mainContent = null;
        var data = this.state.data;
        var eventTrainerList = [];

        if(data!==undefined && data!==null){

            var data2=data.b;

            data2.map(function(item, i){
                eventTrainerList.push(<option key={i} value={item.trainerId}>{item.infoPersonInfo.perNum}</option>);
            });


            mainContent=
                <div ref="createClass" className="c-block">
                    <div className="common-line" style={{height:'40px'}}>
                        {/*<div  style={{float:'left',width:'250px'}}>
                        <span style={{float:'left'}} className="common-label l-label">最后期限：</span>
                        <span  style={{float:'left'}}>
                         <Calendar data={today} ctrlName='deadline'/>
                        </span>
                        </div>*/}

                        <div  style={{float:'left',width:'270px'}}>
                            <div  style={{float:'left',width:'80px'}}>
                                <span className="common-label l-label"  style={{float:'left'}}>联系电话：</span>
                            </div>
                        <span  style={{float:'left'}}>
                           <input style={{float:'left'}} disabled="disabled" name="mobilePhone" defaultValue={this.state.data.mobilePhone} readOnly="true" maxLength="25" className="common-input"/>
                        </span>
                        </div>
                    </div>
                    <div className="common-line" style={{height:'40px'}}>
                        <div  style={{float:'left',width:'225px'}}>
                            <div style={{float:'left'}}>
                                <span className="common-label l-label" >是否指定教练</span>
                            </div>
                            <input type="checkbox"  style={{marginLeft:'30px',float:'left'}}  name="Trainflag" id="Trainflag"  value="是否制定教练" onClick={this.test1} />
                        </div>
                        <div id="selectTrainer" style={{float:'left',display: 'none'}}>
                            <span  className="common-label l-label"  style={{marginLeft:'30px',float:'left'}}>选择教练：</span>
                            <span  style={{float:'left'}}>
                                <select className="common-input" style={{color:'#000000!important',width:'190px',lineHeight:'16px'}} id="classTrainer">
                                    {eventTrainerList}
                                </select>
                            </span>
                        </div>
                    </div>
                    <div className="common-line">
                        <span className="common-label l-label" >课程要求：</span>
                    </div>
                    <div className="common-line">
                        <textarea id="demandBrief"  style={{fontSize:'14px'}}name="demandBrief" cols="80" rows="6"></textarea>


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