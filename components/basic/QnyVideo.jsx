/*

 <QnyVideo option={{
width:'600px',
height:'400px',
url:'/badmintonhot/video/test.mp4',
type:'mp4',
poster:'/badmintonhot/video/testpic.png'
                                        }}/>
 */
import React from 'react';
import {render} from 'react-dom';

var QnyVideo = React.createClass({


    getInitialState: function () {
        var option = this.props.option;
        return ({
            option:option
        })
    },
    componentDidMount:function () {
        var options = {
            controls: true,
            width:this.state.option.width,//'600px'
            height:this.state.option.height,//'400px'
            // url: 'http://og9dz2jqu.cvoda.com/Zmlyc3R2b2RiOm9jZWFucy0xLm1wNA==_q00000001.m3u8',
            url:this.state.option.url,//'/badmintonhot/video/test.mp4'
            type:this.state.option.type,//'mp4'
            //preload: true,//取值：auto, metadata 或 none，用于设置视频是否会自动加载。
            autoplay: false, // 如为 true，则视频将会自动播放
            poster:this.state.option.poster,//视频封面链接  '/badmintonhot/video/testpic.png'
            stretching:'none'   //letterbox：表示视频将会适配窗口，保持视频比例，可能产生黑边；
                                // panscan： 表示视频将会保持纵横比例，填满窗口，多余视频被切掉；
                                // fitwindow： 表示不保持视频比例，仅填满窗口，可能会变形；
                                // none： 表示使用视频真实大小。
            //loop:	取值：true 或 false。指定视频是否循环播放。
        };
        var player = new QiniuPlayer('demo-video', options);

    },
    render: function () {
        var contains = null;
        contains =
            <div>
                <video id="demo-video" className="video-js vjs-big-play-centered"></video>
            </div>


        return contains;
    },


});

module.exports = QnyVideo;