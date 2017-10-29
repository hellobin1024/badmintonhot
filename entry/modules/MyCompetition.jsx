/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';
import ShowCompetitionGames from './ShowCompetitionGames.jsx';
import '../../css/entry/modules/myCompetition.css';
var ProxyQ = require('../../components/proxy/ProxyQ');

var MyCompetition = React.createClass({

    tabChange:function(tab,Id){
        this.setState({current:tab});
        this.setState({competitionId:Id});
    },

    initialData:function(){
        var url="/func/competition/getMyBadmintonCompetitionInfoList";
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
        return ({personId: personId, data:null,current:null});
    },

    render:function(){
        var mainContent = null;
        var data = this.state.data;


        var operate = this.operate;
        var competitionsTable = [];
        var ins = this;
        if(data!==undefined && data!==null){

            data.map(function(item, i){
                competitionsTable.push(
                    <tbody  key={i} className="competition-table">
                    <tr>
                        <td><h4 style={{marginTop:'15px'}}><strong>比赛{i+1}</strong></h4></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><a data-pjax="true" onClick={ins.tabChange.bind(this,'showCompetitionGames',item.competitionId)}>比赛名称：{item.competitionName}</a></td>
                        {/*<td>比赛名称：{item.competitionName}</td>*/}
                        <td>比赛时间：{item.startTime}</td>
                        <td>主办方：{item.hostUnit}</td>
                    </tr>
                    </tbody>
                );
            });

            if(this.state.current =='showCompetitionGames'){
                var competitionId=this.state.competitionId;
                var personId=this.state.personId;
                mainContent=(
                    <ShowCompetitionGames  personId={personId} competitionId={competitionId}/>
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

                            {competitionsTable}

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

module.exports=MyCompetition;


