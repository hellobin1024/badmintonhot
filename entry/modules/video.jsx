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

var Video = React.createClass({


    getInitialState: function () {
        var token=this.props.token;
        return ({
            token:token
        });
    },
    initialData:function(){
        this.getAllVideos();
    },
    dateFormat:function (date) {//object时间转时间格式"yyyy-mm-dd hh:mm:ss"
        return (new Date(date)).toLocaleDateString() + " " + (new Date(date)).toLocaleTimeString();
    },


    getAllVideos:function () {

        var url = "/func/allow/getVideos";
        var param={
        }
        var ref = this;
        Proxy.query(
            'POST',
            url,
            param,
            null,
            function (res) {

                if(res.re==-1||res.re=="-1"){
                    alert(res.data);
                    //ref.initialData();
                }
                alert(res.data);
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
    },
    render:function() {
        var contains = null;

        var trs = [];
        var grs = [];
        var ref = this;
        trs.push(
            <div>
                <QnyVideo option={{
                    width:'600px',
                    height:'400px',
                    url:'http://114.215.99.2:8880/video/test.mp4',
                    type:'mp4',
                    poster:'/badmintonhot/video/testpic.png'
                }}/>

                <div> <span style={{color:'#000000',fontSize:'16px'}}>视频标题：</span></div>
                <div> <span style={{color:'#000000',fontSize:'16px'}}>视频简介：</span></div>


            </div>
        )



        contains =
            <div>
                <div className="banner-bottom">
                    <div className="container">
                        <div className="faqs-top-grids">
                            <div className="product-grids">
                                <div className="col-md-8 news_content">
                                    <div id="myTabContent" className="tab-content">
                                        <div className="tab-pane fade in active" id="home">
                                            {trs}
                                        </div>
                                    </div>
                                </div>
                                <RightSlide/>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        return contains;
    },

});

const mapStateToProps = (state, ownProps) => {
    const props = {
        token: state.userInfo.accessToken,
    }
    return props
}
export default connect(mapStateToProps)(Video);


