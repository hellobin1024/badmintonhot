/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';

import '../../css/entry/modules/myCompetition.css';
var ProxyQ = require('../../components/proxy/ProxyQ');

var MyRecordOfClass = React.createClass({

    initialData:function(){
        var url="/func/allow/getMyClassRecord";
        var params={
            classId:this.state.classId,
        };
         var ref=this;
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


    getInitialState: function () {
        var personId = null;
        var classId=null;
        if(this.props.personId!==undefined && this.props.personId){
            personId = this.props.personId;
            classId = this.props.classId;
        }
        return ({personId: personId, classId: classId,data:null});
    },

    render:function(){
        var mainContent = null;
        var data = this.state.data;
        var CLassTable = [];
        var ins = this;
        if(data!==undefined && data!==null){

            data.map(function(item, i){
                CLassTable.push(
                    <tbody  key={i} className="competition-table">
                    <tr>
                        <td><h4 style={{marginTop:'15px'}}><strong>场次{i+1}</strong></h4></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>课程名称：{item.courseName}</td>
                        <td>上课时间：{item.courseTime}</td>
                    </tr>
                    <tr>
                        <td>上课位置：{item.courseLocation}</td>
                        <td>上课内容：{item.courseContent}</td>
                    </tr>
                    </tbody>
                );
            });


            mainContent=
                <div id="competition" className="my-competition">
                    <div className="widget-container fluid-height">
                        <div className="widget-content padded clearfix">
                            <table className="table table-striped invoice-table">
                                <thead className="table-head">
                                <tr>
                                    <th width="500"></th>
                                    <th width="500"></th>
                                </tr>
                                </thead>
                                {CLassTable}

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

module.exports=MyRecordOfClass;


