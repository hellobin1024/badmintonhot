/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';

import '../../css/entry/modules/myEvents.css';
var ProxyQ = require('../../components/proxy/ProxyQ');

var DemandClass = React.createClass({

    initialData:function(){
        var url="/func/allow/getMyCourseDemand";
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
        var demandId=ob;
        var url="/func/allow/deleteMyDemandClass";

        var params={
            personId:this.state.personId,
            demandId:demandId,
        };

        ProxyQ.query(
            'post',
            url,
            params,
            null,
            function(ob) {
                var reCode = ob.re;
                if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) { //操作失败
                    alert("操作失败");
                    return;
                }
                alert("操作成功");
                var data = this.state.data;
                data.splice(index,1);
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

        var operate = this.operate;
        var eventsTable = [];
        var ins = this;
        if(data!==undefined && data!==null){

            data.map(function(item, i){
                eventsTable.push(
                        <tbody  width="100%"  className="event-table" key={i}>
                            <tr>
                            <td><h4 style={{marginTop:'15px'}}><strong>{item.courseNum}:</strong></h4></td>

                           </tr>
                            <tr>
                            <td  style={{width:'50%'}} >状态：{item.status}</td>
                            <td  style={{width:'50%'}} >教练：{item.coach}</td>
                            </tr>

                            <tr>
                                <td colSpan={2} style={{width:'100%'}}>课程要求：{item.demandBrief}</td>
                            </tr>
                             <tr>
                            <td colSpan={2} style={{textAlign:'center'}} >
                                <a className="operate" onClick={operate.bind(ins,item.demandId,i)}>{item.operate}</a>
                            </td>
                            </tr>

                        </tbody>
                );
            });

            mainContent=
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

                                {eventsTable}

                            </table>
                        </div>
                    </div>
                </div>

        }else{

            this.initialData();
        }

        return mainContent;
    },
});

module.exports=DemandClass;


