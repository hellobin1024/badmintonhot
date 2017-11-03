/*BY QD

 <LiveTele option={{
url:'rtmp://pili-live-rtmp.sportshot.cn/sportshot/001',
bufferTime:2,
startLevel:0
                                        }}/>
 */
import React from 'react';
import {render} from 'react-dom';

import { connect } from 'react-redux';

var Proxy = require('../proxy/ProxyQ');


var Live$Video = React.createClass({


    getInitialState: function () {

        var option = this.props.option;
        return ({
            option:option
        })
    },



    render:function() {


        return (
            <div>
                <div id="player"></div>
            </div>
        );
    },
    componentDidMount:function () {
        var player = new Clappr.Player({
            source: this.state.option.url,
            width:this.state.option.width,
            height:this.state.option.height,
            parentId: "#player",
            // autoPlay: true,//自动播放
            playbackNotSupportedMessage:"Please try on a different browser！",//播放失败时反馈
            // watermark: "http://url/img.png",//水印
            // position: 'top-right',//水印位置
            //watermarkLink: "http://example.net/",//水印链接
            // poster: 'http://url/img.png',//视频封面
            plugins: {'playback': [RTMP]},
            rtmpConfig: {
                swfPath: '/RTMP.swf',
                scaling:'stretch',
                playbackType: 'live',
                bufferTime: this.state.option.bufferTime,//在开始播放媒体之前要缓冲多久
                startLevel: this.state.option.startLevel,//初始质量水平指数
                switchRules: {
                    "SufficientBandwidthRule": {
                        "bandwidthSafetyMultiple": 1.15,//带宽安全倍数
                        "minDroppedFps": 2//最小掉帧
                    },
                    "InsufficientBufferRule": {
                        "minBufferLength": 2
                    },
                    "DroppedFramesRule": {
                        "downSwitchByOne": 10,
                        "downSwitchByTwo": 20,
                        "downSwitchToZero": 24
                    },
                    "InsufficientBandwidthRule": {
                        "bitrateMultiplier": 1.15
                    }
                }
            },
        });
    }

});

const mapStateToProps = (state, ownProps) => {
    const props = {
        token: state.userInfo.accessToken,
    }
    return props
}
export default connect(mapStateToProps)(Live$Video);


