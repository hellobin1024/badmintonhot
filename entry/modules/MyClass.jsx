/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';
import MyRecordOfClass from './MyRecordOfClass.jsx';
import '../../css/entry/modules/myEvents.css';
var ProxyQ = require('../../components/proxy/ProxyQ');

var MyCLass = React.createClass({

    initialData:function(){
        var url="/func/allow/getMyClass";
        var params={
            personId:this.state.personId
        };

        ProxyQ.query(
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
                this.setState({data:data});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },

    operate: function (ob,index) {
        var memberId=ob;
        var url="/func/allow/deleteMyClass";
        var params={
            memberId:memberId,
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
                alert("操作成功!")
                var data = this.state.data;
                data.splice(index,1);
                this.setState({data:data});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    tabChange:function(tab,Id){
        this.setState({current:tab});
        this.setState({classId:Id});
    },
    getInitialState: function () {
        var personId = null;
        if(this.props.personId!==undefined && this.props.personId){
            personId = this.props.personId;
        }
        return ({personId: personId, data:null,current:null});
    },

    render:function(){
        var mainContent = null;
        var data = this.state.data;
        var operate = this.operate;
        var ClassTable = [];
        var ins = this;
        if(data!==undefined && data!==null){

            data.map(function(item, i){
                ClassTable.push(

                        <tbody key={i} className="event-table">
                        <tr>
                            <td>课程名称:  <span
                                style={{fontSize:'14px',marginRight:'5px',textDecoration:'underline',cursor:'pointer'}}
                                onClick={ins.tabChange.bind(this,'MyRecordOfClass',item.classId)}>{item.cLassName}</span></td>
                            <td>开课教员: {item.cLassCreateName}</td>
                        </tr>
                        <tr>
                            <td >课程时间: {item.classtime}</td>
                            <td>课程地点: {item.classAddr}</td>
                        </tr>
                        <tr>
                            <td>课程计划招生: {item.maxNumber}</td>
                            <td>课程现有人数: {item.signNumber}</td>
                        </tr>
                        <tr>
                            <td style={{borderBottom:'1px solid #ddd'}}>课程简介: {item.classbrief}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>上课人: {item.classPerName}</td>
                            <td>报名人: {item.classCreName}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td style={{TextAlign:'center'}} ><a className="operate" onClick={operate.bind(ins,item.memberId,i)}>{item.operate}</a></td>
                        </tr>
                        </tbody>

                );
            });
            if(this.state.current =='MyRecordOfClass'){
                var classId=this.state.classId;
                var personId=this.state.personId;
                mainContent=(
                    <MyRecordOfClass  personId={personId} classId={classId}/>
                );
            }
            else {
                mainContent =
                    <div id="event" className="my-event">
                        <div className="widget-container fluid-height">
                            <div className="widget-content padded clearfix">
                                <table className="table table-striped invoice-table">
                                    <thead className="table-head">
                                    <tr>
                                        <th width="300"></th>
                                        <th width="300"></th>
                                    </tr>
                                    </thead>
                                    {ClassTable}
                                </table>
                            </div>
                        </div>
                    </div>
            }

        }else{

            this.initialData();
        }

        return mainContent;
    },
});

module.exports=MyCLass;