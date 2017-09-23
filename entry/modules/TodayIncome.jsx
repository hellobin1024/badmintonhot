/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';
import '../../build/css/style.css';
var ProxyQ = require('../../components/proxy/ProxyQ');

var TodayIncome = React.createClass({

    initialData:function(){
        var url="/func/notices/getNoticesInfo";
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

        var mrs = [];
        var  incomeTable = [];
        var ins = this;
        if(data!==undefined && data!==null){

            data.map(function(item, i){
                incomeTable.push(
                    <tbody  key={i} className="competition-table">
                    <tr>
                        <td style={{marginTop:'15px'}}>
                            消息{i+1}&ensp; :&ensp;
                            <a data-pjax="true" onClick={ins.showNotice.bind(null, item)}>{item.title}</a>
                        </td>
                        <td>时间&ensp; :&ensp;{item.createTime}</td>
                        <td> </td>
                    </tr>
                    </tbody>
                );
            });

            if(this.state.modal!==null&&this.state.modal!==undefined){
                var array = this.state.modal;
                mrs.push(
                    <div >
                        <div className="notice" style={{textAlign: 'center'}} key='modal'>
                            <h2> 标题：{array.title} </h2>
                            <h2><span> 时间：</span>{array.createTime}</h2>
                        </div>
                        <div className="noticecontent">
                            <p><span>消息内容：</span>{array.contents}</p>
                        </div>
                    </div>

                )
            }

            mainContent=(
                <div id="competition" className="my-competition">
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

                                {incomeTable}

                            </table>
                        </div>
                    </div>



                </div>
            )



        }else{

            this.initialData();
        }

        return mainContent;
    },
});

module.exports=TodayIncome;


