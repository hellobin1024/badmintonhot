/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';

import '../../css/entry/modules/myEvents.css';
var ProxyQ = require('../../components/proxy/ProxyQ');

var MyEvents = React.createClass({

    initialData:function(){
        var url="/func/events/getMyEvents";
        var params={
            personId:this.state.personId
        };

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

    operate: function (ob) {
        var eventId=ob;
        var url="/func/events/deleteMyEvents";
        var params={
            eventId:eventId,
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
                        <tbody  key={i} className="event-table">
                            <tr><td><h4 style={{marginTop:'15px'}}><strong>{item.eventNum}:</strong></h4></td></tr>
                            <tr>
                                <td>名称：{item.eventName}</td>
                                <td>简介：{item.eventBrief}</td>
                                <td>时间：{item.eventTime}</td>
                            </tr>
                            <tr>
                                <td>地点：{item.eventAddr}</td>
                                <td>创建者：{item.eventManager}</td>
                                <td>成员：{item.eventMember}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style={{textAlign:'center'}}><a className="operate" onClick={operate.bind(ins,item.eventId)}>{item.operate}</a></td>
                                <td></td>
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

module.exports=MyEvents;