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
                if(data!=""||data!=null){
                var urlb="/func/allow/getvideorecommendlist";
                var id=data.video.id;
                var paramsb={
                     id:id,
                };
                Proxy.query(
                    'post',
                    urlb,
                    paramsb,
                    null,
                    function(ob) {
                        this.state.data.commendlist=ob.data;
                        this.setState({data:data});
                    }.bind(this),
                    function(xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }.bind(this)
                );

                }

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
    videoSwitch:function (item) {
        var id=item.id;
        this.setState({id:id});
        this.setState({data:null});
    },
    render:function(){
        var mainContent = null;
        var data = this.state.data;
        var video = [];
        var recommed=[];
        var ref=this;
        if(data!==undefined && data!==null){
            var vide= data.video;
            video.push(
                vide.isVideo=="1"?
                <div>
                    <span style={{color:'#29440d',fontSize:"18px"}}>精彩视频</span>
                    <LiveTele option={{
                    url:'http://114.215.99.2:8880/video/test.mp4',
                    width:'600px',
                    height:'400px',
                    bufferTime:2,
                    startLevel:0
                 }}/>
                    <div style={{color:'#000000'}}>
                    <span style={{color:'#000000'}}>视频标题：</span> {vide.name}&nbsp;&nbsp;&nbsp;
                    <span style={{color:'#000000'}}>视频简介：</span> {vide.brief}&nbsp;&nbsp;&nbsp;
                    <span style={{color:'#000000'}}>作者：</span> {vide.author}&nbsp;&nbsp;&nbsp;
                        </div>
                    <div>
                    <span style={{color:'#000000'}}>浏览数：</span>{vide.browsecount}&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{color:'#000000'}}>收藏数：</span>{vide.collectcount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{color:'#000000'}}>分享数：</span>{vide.sharecount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </div>:
                    <div>
                    <span style={{color:'#29440d',fontSize:"18px"}}>精彩音频</span>
                    <LiveTele option={{
                    url:'http://114.215.99.2:8880/video/a.mp3',
                    width:'600px',
                    height:'400px',
                    bufferTime:2,
                    startLevel:0
                 }}/>
                        <div>
                            <span style={{color:'#000000'}}>音频标题：</span> {vide.name}&nbsp;&nbsp;&nbsp;
                            <span style={{color:'#000000'}}>音频简介：</span> {vide.brief}&nbsp;&nbsp;&nbsp;
                            <span style={{color:'#000000'}}>作者：</span> {vide.author}&nbsp;&nbsp;&nbsp;
                        </div>
                        <div>
                            <span style={{color:'#000000'}}>浏览数：</span>{vide.browsecount}&nbsp;&nbsp;&nbsp;&nbsp;
                            <span style={{color:'#000000'}}>收藏数：</span>{vide.collectcount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span style={{color:'#000000'}}>分享数：</span>{vide.sharecount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
            );
            if(data.commendlist!==undefined && data.commendlist!==null){
                recommed=[];
                data.commendlist.map(function (item, i) {
                    recommed.push(
                        item.isVideo=="1"?
                        <div style={{display:'inline',float:'left',marginLeft:"5px",width:'200px',height:'220px'}}>
                            <div>
                            <span>
               <img  style={{width:'200px',cursor:'pointer'}} src={window.App.getResourceDeployPrefix()+"/images/video.png"} onClick={ref.videoSwitch.bind(null, item)}alt=""/>
                            </span>
                            </div>
                            <div>
                                <span style={{color:'#29440d'}}>视频标题：</span> {item.name}
                            </div>
                            <div>
                                <span style={{color:'#29440d'}}>视频简介：</span> {item.brief}
                            </div>
                       </div>
                    : <div style={{display:'inline',float:'left',marginLeft:"5px",width:'200px',height:'220px'}}>
                            <div>
                            <span>
               <img  style={{width:'200px',cursor:'pointer'}} src={window.App.getResourceDeployPrefix()+"/images/video.png"} onClick={ref.videoSwitch.bind(null, item)}alt=""/>
                            </span>
                            </div>
                            <div>
                                <span style={{color:'#29440d'}}>音频标题：</span> {item.name}
                            </div>
                            <div>
                                <span style={{color:'#29440d'}}>音频简介：</span> {item.brief}
                            </div>
                        </div>
                    )
                })
            }
            mainContent=
                <div className="banner-bottom">
                    <div className="container" style={{backgroundColor:'#FFFFFF'}}>
                        <div className="faqs-top-grids">
                            <div className="product-grids">
                                <div className="col-md-8 news_content">
                                    {video}
                                    <div  style={{marginTop:'30px'}}>
                                    <span style={{color:'#29440d',fontSize:"20px"}}>推荐资源</span>
                                        <div style={{marginTop:'10px'}} >
                                    {recommed}
                                        </div>
                                    </div>
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


