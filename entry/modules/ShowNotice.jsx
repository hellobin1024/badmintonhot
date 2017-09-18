/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';

import '../../css/entry/modules/myCompetition.css';
var ProxyQ = require('../../components/proxy/ProxyQ');

var ShowNotice = React.createClass({

    initialData:function(){
        var url="/func/competition/getBadmintonCompetitionGameListOfPerson";
        var params={
            personId:this.state.personId,
            noticeId:this.state.noticeId,
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
        var noticeId=null;
        if(this.props.personId!==undefined && this.props.personId){
            personId = this.props.personId;
            noticeId = this.props.noticeId;
        }
        return ({personId: personId, noticeId: noticeId,data:null});
    },

    render:function(){
        var mainContent = null;
        var data = this.state.data;

        var showNotice = [];
        var ins = this;
        if(data!==undefined && data!==null){

            data.map(function(item, i){
                showNotice.push(
                    <tbody  key={i} className="competition-table">
                        <h4 style={{marginTop:'15px'}}><strong>标题：{item.title}</strong></h4><br></br>>
                        时间：{item.createTime}<br></br>
                        消息内容：{item.contents}
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
                                    <th width="300"></th>
                                    <th width="300"></th>
                                    <th width="300"></th>
                                </tr>
                                </thead>
                                {showNotice}

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

module.exports=ShowNotice;


