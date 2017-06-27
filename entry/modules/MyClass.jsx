/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom'

var ProxyQ = require('../../components/proxy/ProxyQ')

var Class = React.createClass({

    initialData:function(){
        // var url="/func/group/getMyGroup";
        // var params={
        //     personId:this.state.personId,
        // };
        //
        // ProxyQ.query(
        //     'post',
        //     url,
        //     params,
        //     null,
        //     function(ob) {
        //         var reCode = ob.reCode;
        //         if(reCode!==undefined && reCode!==null && (reCode ==1 || reCode =="1")) { //数据获取失败
        //             return;
        //         }
        //
        //         var data=ob.resList[0];
        //         var genderCode = data.genderCode;
        //         this.setState({data:data});
        //     }.bind(this),
        //     function(xhr, status, err) {
        //         console.error(this.props.url, status, err.toString());
        //     }.bind(this)
        // );
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

                                <tbody>
                                <tr>
                                    <td>课程名称:</td><td></td>
                                    <td>开课教员:</td><td></td>
                                </tr>
                                <tr>
                                    <td>课程时间:</td><td></td>
                                    <td>课程地点:</td><td></td>
                                </tr>
                                <tr>
                                    <td>课程计划招生:</td><td></td>
                                    <td>课程现有人数:</td><td></td>
                                </tr>
                                <tr>
                                    <td style={{borderBottom:'1px solid #ddd'}}>课程简介:</td>
                                    <td colSpan={3}></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


        return mainContent

    },
});

module.exports=Class;