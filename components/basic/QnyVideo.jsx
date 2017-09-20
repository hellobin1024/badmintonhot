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
            preload: true,
            autoplay: false, // 如为 true，则视频将会自动播放
            poster:this.state.option.poster,//视频封面链接  '/badmintonhot/video/testpic.png'
            stretching:'none'
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