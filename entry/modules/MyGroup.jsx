/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';

import '../../css/entry/modules/myGroup.css';
var ProxyQ = require('../../components/proxy/ProxyQ');

var MyGroup = React.createClass({

    initialData:function(){
        var url="/func/allow/getMyGroups";
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
                if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) { //数据获取为空
                    alert("获取失败");
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

    operate: function (ob,flag,index) {
        var groupId=ob;
        if(flag=="delete"){
            var url="/func/allow/deleteMyGroups";
        }else{
            var url="/func/allow/quitGroups";
        }
        var params={
            groupId:groupId,
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
        var groupIdTable = [];
        var ins = this;
        if(data!==undefined && data!==null){

            data.map(function(item, i){
                groupIdTable.push(
                    <tbody  key={i} className="group-table">
                    <tr><td><h4 style={{marginTop:'15px'}}><strong>{item.groupNum}:</strong></h4></td></tr>
                    <tr>
                        <td>名称：{item.groupName}</td>
                        <td>简介：{item.groupBrief}</td>
                        <td>时间：{item.creatTime}</td>
                    </tr>
                    <tr>
                        <td>备注：{item.remark}</td>
                        <td>创建者：{item.groupManager}</td>
                        <td>成员：{item.groupMember}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style={{textAlign:'center'}}><a className="operate" onClick={operate.bind(ins,item.groupId,item.flag,i)}>{item.operate}</a></td>
                        <td></td>
                    </tr>
                    </tbody>
                );
            });

            mainContent=
                <div id="group" className="m-group">
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

                                {groupIdTable}

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

module.exports=MyGroup;