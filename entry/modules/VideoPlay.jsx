import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import QnyVideo from '../../components/basic/QnyVideo.jsx'
import { connect } from 'react-redux';
import Calendar from './components/Calendar.jsx';

import RightSlide from './components/RightSilde'
var Proxy = require('../../components/proxy/ProxyQ');

var VideoPlay = React.createClass({

    tabChange:function(tab,Id){
        this.setState({current:tab});
        this.setState({Id:Id});
    },
    initialData:function(){
        var url="/func/allow/getvideobyid";
        var params={
            Id:this.state.Id,
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
        var Id=null;
        Id = this.props.Id;
        return ({ Id: Id,data:null});
    },


    render:function(){
        var mainContent = null;
        var data = this.state.data;
        var video = [];
        if(data!==undefined && data!==null){

            data.map(function(item, i){
                video.push(
                    <tbody  key={i} className="competition-table">
                    <QnyVideo option={{
                        width:'600px',
                        height:'400px',
                        url:'http://114.215.99.2:8880/video/videoNum/test.mp4',
                        type:'mp4',
                        poster:'/badmintonhot/video/testpic.png'
                    }}/>
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
                                {video}

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

const mapStateToProps = (state, ownProps) => {
    const props = {
        token: state.userInfo.accessToken,
    }
    return props
}
export default connect(mapStateToProps)(VideoPlay);


