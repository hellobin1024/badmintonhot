/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';
import ShowNotice from '../modules/ShowNotice.jsx';
import '../../css/entry/modules/myCompetition.css';
var ProxyQ = require('../../components/proxy/ProxyQ');

var MyNotices = React.createClass({

    tabChange:function(tab,Id){
        this.setState({current:tab});
        this.setState({noticeId:Id});
    },

    initialData:function(){
        var url="/func/notices/getNoticesListOfPerson";
        //var url="/func/competition/getMyBadmintonCompetitionInfoList";
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


        var  noticesTable = [];
        var ins = this;
        if(data!==undefined && data!==null){

            data.map(function(item, i){
                noticesTable.push(
                    <tbody  key={i} >
                    <tr>
                            <h3 style={{marginTop:'15px'}}>
                                消息{i+1}&ensp; :&ensp;
                                <a data-pjax="true" onClick={ins.tabChange.bind(this,'showNotice',item.noticeId)}>{item.competitionName}</a>
                            </h3>
                    </tr>
                    </tbody>
                );
            });

            if(this.state.current ==='showNotice'){
                var noticeId=this.state.noticeId;
                var personId=this.state.personId;
                mainContent=(
                    <ShowNotice  personId={personId} noticeId={noticeId}/>
                );
            }
            else{
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

                                    {noticesTable}

                                </table>
                            </div>
                        </div>
                    </div>
                )}



        }else{

            this.initialData();
        }

        return mainContent;
    },
});

module.exports=MyNotices;


