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

var VideoList = React.createClass({

    initialData:function(){
        this.getAllVideos();
    },

    getInitialState: function () {
        var token=this.props.token;
        return ({
            token:token
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
                ref.setState({videos: a});
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );

    },

    getAllLives: function () {

        var url = "/func/allow/getAllLives";
        var ref = this;
        var params = {};
        Proxy.query(
            'POST',
            url,
            params,
            null,
            function (res) {
                var a = res.data;
                ref.setState({lives: a});
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );

    },

    render:function() {
        var contains = null;

        var vrs = [];
        var lrs = [];
        var ref = this;
        if ((this.state.videos !== null && this.state.videos !== undefined)) {
            var videos = this.state.videos;
            if (videos !== null && videos !== undefined) {
                videos.map(function (item, i) {
                    vrs.push(
                        <div key={i}>
                            <a data-pjax="true" onClick={ins.tabChange.bind(this,'videoPlay',item.id)}>
                            <img src={window.App.getResourceDeployPrefix() + item.img} alt=""/>
                            <span>视频标题：{item.name}</span>
                            <span>视频简介：{item.brief}</span>
                            </a>
                        </div>
                    )
                })
            }

            var lives = this.state.lives;
            if (lives !== null && lives !== undefined) {
                lives.map(function (item, i) {
                    lrs.push(
                        <div key={i}>
                            <img src={window.App.getResourceDeployPrefix() + item.img} alt=""/>
                            <span>主播：{item.name}</span>
                            <span>标题：{item.brief}</span>
                        </div>
                    )
                })
            }


            contains =
                <div className="banner-bottom">
                    <div className="container">
                        <div className="faqs-top-grids">
                            <div className="product-grids">
                                                <h1 style={{textAlign:'center',fontSize:'25px'}}>正在直播</h1>
                                                {lrs}
                                                <h1 style={{textAlign:'center',fontSize:'25px'}}>精彩视频</h1>
                                                {vrs}

                            </div>
                        </div>
                    </div>
                </div>


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


