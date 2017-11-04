import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import LiveTele from '../../components/basic/LiveTele.jsx'
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
            id:this.state.id,
        };
        Proxy.query(
            'post',
            url,
            params,
            null,
            function(ob) {
                var data=ob;
                this.setState({data:data});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },

    getInitialState: function () {
        var id=null;
        if(this.props.id!==undefined && this.props.id){
            id = this.props.id;
        }
        return ({ id:id,data:null});
    },

    render:function(){
        var mainContent = null;
        var data = this.state.data;
        var video = [];
        var videodetail = [];
        var dis=[];
        if(data!==undefined && data!==null){
            video.push(
                <LiveTele option={{
                    url:'http://114.215.99.2:8880/video/test.mp4',
                    width:'600px',
                    height:'400px',
                    bufferTime:2,
                    startLevel:0
            }}/>
            );
            videodetail = [];
            var vide= data.video;
            if(vide!==undefined && vide!==null){
             videodetail.push(
             <div>
                    <div style={{float:'left',marginLeft:'20px',fontSize:'13px',charset:"utf-8" }}>
                        <div>
                        <span>视频标题：{vide.name}</span>

                        <span>视频简介：{vide.brief}</span>

                        <span>作者：{vide.author}</span>
                        </div>
                        <div>
                        <span>浏览数：{vide.browsecount}</span>

                        <span>收藏数：{vide.collectcount}</span>

                        <span>分享数：{vide.sharecount}</span>
                        </div>
                    </div>
                    <div className="clearfix"></div>
             </div>
            ) }
            dis.push(
                <div>
                    <div> {video}</div>
                    <div>  {videodetail}</div>

                </div>
            );
            mainContent=
                <div className="banner-bottom">
                    <div className="container">
                        <div className="faqs-top-grids">
                            <div className="product-grids">
                                <div className="col-md-8 news_content">
                                {dis}
                                </div>
                                <RightSlide/>
                            </div>
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


