/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';

import '../../css/entry/modules/myCompetition.css';
var ProxyQ = require('../../components/proxy/ProxyQ');

var showCompetitionGames = React.createClass({

    initialData:function(){
        var url="/func/competition/getMyCompetition";
        var params={
            personId:this.state.personId,
            competitionId:this.state.competitionId
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

        var operate = this.operate;
        var competitionGamesTable = [];
        var ins = this;
        if(data!==undefined && data!==null){

            data.map(function(item, i){
                competitionGamesTable.push(
                    <tbody  key={i} className="competition-table">
                    <tr><td><h4 style={{marginTop:'15px'}}><strong>{item.competitionNum}:</strong></h4></td></tr>
                    <tr>
                        <td>比赛项目：{item.Project}</td>
                        <td>比赛时间：{item.competitionTime}</td>
                        <td>比赛地点：{item.competitionAddr}</td>
                    </tr>
                    <tr>
                        <td>我的队友：{item.Teammate}</td>
                        <td>我的对手：{item.Opponent1}&emsp;{item.Opponent2}</td>
                        <td>比分：{item.scoreA}:{item.scoreB}</td>
                    </tr>
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

module.exports=showCompetitionGames;


