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

        var remark = $(createClass).find("input[name='remark']").val();
        var classTrainer = $('#classTrainer option:selected').val();
        var reg = new RegExp("^[0-9]*$");

        if (remark == "") {
            Tips.showTips('请填写课程要求~');
        }else {

            var url="/func/allow/createClass";
            var params={
                personId:this.state.personId,
                remark:remark,
                classTrainer:classTrainer,
                hasCoach:hasCoach
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
        var url="/func/allow/getAllTrainer";
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
                eventTrainerList.push(<option key={i} value={item.infoPersonInfo.personId}>{item.infoPersonInfo.perName}</option>);
            });


            mainContent=
                <div ref="createClass" className="c-block">
                    <div className="common-line">
                        <span className="common-label l-label">课程要求：</span>
                        <span>
                            <input type="text" name="remark" className="common-input" tabIndex="1"></input>
                        </span>

                        <span className="common-label r-label">联系电话：</span>
                        <span>

                           <input disabled="disabled" name="mobilePhone" defaultValue={this.state.data.mobilePhone} readOnly="true" maxLength="25" className="common-input"/>

                        </span>
                    </div>
                    <div className="common-line">
                        <div  style={{float:'left'}}>
                            <div style={{float:'left'}}>
                                <span className="common-label l-label" >是否指定教练</span>
                            </div>
                            <input type="checkbox"  style={{marginLeft:'30px',float:'left'}} name="Trainflag" id="Trainflag"  value="是否制定教练" onClick={this.test1} />
                        </div>
                        <div id="selectTrainer" style={{display:'none',float:'left'}}>
                            <span className="common-label l-label"  style={{marginLeft:'30px'}}>选择教练：</span>
                            <span>
                                <select className="common-input" style={{color:'#000000!important',width:'190px',lineHeight:'13px'}} id="classTrainer">
                                    <option value={-1}>请选择</option>
                                    {eventTrainerList}
                                </select>
                            </span>
                        </div>
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