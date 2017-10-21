import React from 'react';
import {render} from 'react-dom';
// var QnyVideo = require('../../components/basic/QnyVideo');
import QnyVideo from '../../components/basic/QnyVideo';
var Video = React.createClass({


    render: function () {
        var contains = null;
        contains =
            <div>
                <b>RTMP</b>
                <QnyVideo option={{
                    width:'600px',
                    height:'400px',
                    url:'http://114.215.99.2:8880/video/test.mp4',
                    type:'mp4',
                    poster:'/badmintonhot/video/testpic.png'
                }}/>
            </div>


        return contains;
    },


});

module.exports = Video;