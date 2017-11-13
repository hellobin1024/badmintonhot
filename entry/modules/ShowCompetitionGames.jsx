/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';

import '../../css/entry/modules/myCompetition.css';
var ProxyQ = require('../../components/proxy/ProxyQ');

var ShowCompetitionGames = React.createClass({

    initialData:function(){
        var url="/func/competition/getBadmintonCompetitionGameListOfPerson";
        var params={
            personId:this.state.personId,
            competitionId:this.state.competitionId,
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
        var competitionId=null;
        if(this.props.personId!==undefined && this.props.personId){
            personId = this.props.personId;
            competitionId = this.props.competitionId;
        }
        return ({personId: personId, competitionId: competitionId,data:null});
    },

    render:function(){
        var mainContent = null;
        var data = this.state.data;

        var operate = this.operate;
        var competitionGamesTable = [];
        var ins = this;
        if(data!==undefined && data!==null){

            data.map(function(item, i){
                competitionGamesTable.push(
                    <tbody  key={i} className="competition-table">
                    <tr>
                        <td><h4 style={{marginTop:'15px'}}><strong>场次{i+1}</strong></h4></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>比赛项目：{item.gameTypeName}</td>
                        <td>开始时间：{item.startTime}</td>
                        <td>结束时间：{item.endTime}</td>
                    </tr>
                    <tr>
                        <td>对阵：{item.personNameA1}&nbsp;{item.personNameA2}&nbsp;VS&nbsp;{item.personNameB1}&nbsp;{item.personNameB2}</td>
                        {item.scoreA != null ?
                            <td>比&emsp;&emsp;分：{item.scoreA}&nbsp;:&nbsp;{item.scoreB}</td>:<td> </td>}
                        <td> </td>
                    </tr>
                    {/*<tr>*/}
                        {/*<td>扣杀得分：{item.gameTypeName}</td>*/}
                        {/*<td>发球得分：{item.startTime}</td>*/}
                        {/*<td>失误：{item.endTime}</td>*/}
                    {/*</tr>*/}
                    <tr>
                        <td></td>
                        <td></td>
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
                                    <th width="300"></th>
                                    <th width="300"></th>
                                    <th width="300"></th>
                                </tr>
                                </thead>
                                {competitionGamesTable}

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

module.exports=ShowCompetitionGames;


