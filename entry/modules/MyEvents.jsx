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

        var eventsTable = [];
        if(data!==undefined && data!==null){

            data.map(function(item, i){
                eventsTable.push(
                    <div key={i} className="event-table">
                        <table >
                            <tbody>
                            <tr>
                                <td>活动名称:</td><td>{item.eventName}</td>
                                <td>活动简介:</td><td>{item.eventBrief}</td>
                            </tr>
                            <tr>
                                <td>活动时间:</td><td>{item.eventTime}</td>
                                <td>活动地点:</td><td>{item.eventAddr}</td>
                            </tr>
                            <tr>
                                <td>活动发起者:</td><td>{item.eventManager}</td>
                                <td>活动成员:</td><td>{item.eventMember}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                );
            });

            mainContent=
                <div>
                    {eventsTable}
                </div>
        }else{

            this.initialData();
        }

        return mainContent;
    },
});

module.exports=MyEvents;