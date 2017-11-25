import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import { connect } from 'react-redux';
import Calendar from './components/Calendar.jsx';
import VideoPlay from './VideoPlay.jsx';
import RightSlide from './components/RightSilde'
var Proxy = require('../../components/proxy/ProxyQ');

var VideoList = React.createClass({

    initialData:function(){
        this.getAllVideos();
    },

    getInitialState: function () {
        var token=this.props.token;
        return ({
            token:token,current:null
        });
    },

    dateFormat:function (date) {//object时间转时间格式"yyyy-mm-dd hh:mm:ss"
        return (new Date(date)).toLocaleDateString() + " " + (new Date(date)).toLocaleTimeString();
    },


    getAllVideos: function () {

        var url = "/func/allow/getvideolistbytype";
        var ref = this;
        var type = 1;
        var num = 10;
        var params = {
            type : type,
            num : num
        };
        Proxy.query(
            'POST',
            url,
            params,
            null,
            function (res) {
                var a = res.data;
                if(a!=""){
                    var as=[];
                    var bs=[];
                   for(var i=0;i<a.length;i++){
                       if(a[i].isVideo=="1"){
                           as.push(a[i]);
                       }else{
                           bs.push(a[i]);
                       }
                   }
                }
                a.video=as;
                a.audio=bs;
                ref.setState({videos: a});
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );

    },
    tabChange:function(tab,id){
        this.setState({current:tab});
        this.setState({id:id});
    },
    render:function() {
        var contains = null;
        var vrs=[];
        var crs=[];
        var ref = this;
        if ((this.state.videos !== null && this.state.videos !== undefined)) {
            var videos = this.state.videos;

            if (videos.video !== null && videos.video !== undefined) {
                vrs = [];
                videos.video.map(function (item, i) {
                    vrs.push(
                        <div key={i}>
                            <div style={{marginTop:'10px'}}>
                            <div style={{float:'left'}}>
                                <span> <img onClick={ref.tabChange.bind(this,'VideoPlay',item.id)} style={{width:'350px',cursor:'pointer'}} src={window.App.getResourceDeployPrefix()+"/images/video.png"} alt=""/>
                            </span>
                            </div>
                            <div style={{float:'left',width:"250px",marginLeft:'20px',fontSize:'13px'}}>
                            <div>视频标题：{item.name}</div>
                            <div>视频简介：{item.brief}</div>
                            <div>作者：{item.author}</div>
                            <div>浏览数：{item.browsecount}</div>
                            <div>收藏数：{item.collectcount}</div>
                            <div>分享数：{item.sharecount}</div>
                                <img  style={{width:'100px',cursor:'pointer'}} onClick={ref.tabChange.bind(this,'VideoPlay',item.id)} src={window.App.getResourceDeployPrefix()+"/images/video.jpg"} alt=""/>
                            </div>
                            <div className="clearfix"></div>
                            </div>
                        </div>
                    )
                })
            }
            if (videos.audio !== null && videos.audio !== undefined) {
                crs=[];
                videos.audio.map(function (item, i) {
                    crs.push(
                        <div key={i}>
                            <div style={{marginTop:'10px'}}>
                                <div style={{float:'left'}}>
                                <span> <img onClick={ref.tabChange.bind(this,'VideoPlay',item.id)} style={{width:'350px',cursor:'pointer'}} src={window.App.getResourceDeployPrefix()+"/images/video.png"} alt=""/>
                            </span>
                                </div>
                                <div style={{float:'left',width:"250px",marginLeft:'20px',fontSize:'13px'}}>
                                    <div>音频标题：{item.name}</div>
                                    <div>音频简介：{item.brief}</div>
                                    <div>作者：{item.author}</div>
                                    <div>浏览数：{item.browsecount}</div>
                                    <div>收藏数：{item.collectcount}</div>
                                    <div>分享数：{item.sharecount}</div>
                                    <img  style={{width:'85px',cursor:'pointer'}} onClick={ref.tabChange.bind(this,'VideoPlay',item.id)} src={window.App.getResourceDeployPrefix()+"/images/music.jpg"} alt=""/>

                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    )
                })
            }
            if(this.state.current =='VideoPlay'){
                var id=this.state.id;
                var personId=this.state.personId;
                contains=(
                    <VideoPlay  personId={personId} id={id}/>
                );
            }
            else {
                contains =
                    <div className="banner-bottom">
                        <div className="container" style={{backgroundColor:'#FFFFFF'}}>
                            <div className="faqs-top-grids">
                                <div className="product-grids">
                                    <div className="col-md-8 news_content">
                                        <ul id="myTab" className="nav nav-tabs">
                                            <li className="active" id="events" >
                                                <a href="#home"  data-toggle="tab" style={{textAlign:'center',fontSize:'15px',color: '#337ab7',backgroundColor: 'white'}}>
                                                    视频推荐
                                                </a>
                                            </li>
                                            <li id="groups">
                                                <a href="#ios"  data-toggle="tab"  style={{textAlign:'center',fontSize:'15px',color:'#337ab7',backgroundColor: 'white'}}>
                                                    音频推荐
                                                </a>
                                            </li>
                                        </ul>
                                        <div id="myTabContent" className="tab-content">
                                            <div className="tab-pane fade in active" id="home">
                                                <h1 style={{textAlign:'center',fontSize:'25px'}}>精彩视频</h1>
                                                {vrs}
                                            </div>
                                            <div className="tab-pane fade" id="ios">
                                                <h1 style={{textAlign:'center',fontSize:'25px'}}>精彩音频</h1>
                                                {crs}
                                            </div>
                                        </div>
                                    </div>
                                    <RightSlide/>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        }
        else {
            this.initialData();
        }

        return contains;
    }
});

const mapStateToProps = (state, ownProps) => {
    const props = {
        token: state.userInfo.accessToken,
    }
    return props
}
export default connect(mapStateToProps)(VideoList);


