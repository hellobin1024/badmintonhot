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
        if(this.state.event!==null&&this.state.event!==undefined){
            this.getAllLives();
        }else {
            this.getAllVideos();
        }
        if(this.state.group!==null&&this.state.group!==undefined) {
            this.getAllLives();
        }else {
            this.getAllVideos();
        }
    },
    dateFormat:function (date) {//object时间转时间格式"yyyy-mm-dd hh:mm:ss"
        return (new Date(date)).toLocaleDateString() + " " + (new Date(date)).toLocaleTimeString();
    },


    getAllVideos:function () {

        var url = "/func/allow/getVideos";//未登录
        var ref = this;
        Proxy.query(
            'POST',
            url,
            {},
            null,
            function (res) {
                var a = res.data;
                var costType2="";
                for (var i = 0; i < a.length; i++){
                    costType2= ref.getStandard(a[i].costType);
                    a[i].costType2=costType2;
                }
                if(res.re==1) {
                    ref.setState({video: a});
                }else{
                    ref.setState({video: 0});
                }

            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
    },
    getAllLives:function () {
        var url = "/func/allow/getLives";
        var ref = this;
        Proxy.query(
            'POST',
            url,
            {},
            null,
            function (res) {
                var a = res.data;
                if(res.re==1) {
                    ref.setState({live: a});
                }else{
                    ref.setState({live: 0});
                }
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
    },


    render:function() {
        var contains = null;

        if(this.state.event!==null&&this.state.event!==undefined
            &&this.state.group!==null&&this.state.group!==undefined) {
            var video = this.state.video;
            var live = this.state.live;
            var trs = [];
            var grs = [];
            var ref = this;
            if(video!=0) {
                video.map(function (item, i) {

                        trs.push(
                            <div className="basic_first" key={"video" + i}>
                            </div>
                        )
            })
            }
            else{
                trs.push(
                    <div>暂无数据！</div>
                )
            }
            if(live !=0) {
                live.map(function (item, i) {
                        grs.push(
                            <div className="basic_first" key={"live" + i}>
                            </div>
                        )
                })
            }
                  else {
                grs.push(
                    <div>暂无数据！</div>
                )
            }

            contains =
                <div>
                    <QnyVideo option={{
                        width:'600px',
                        height:'400px',
                        url:'/badmintonhot/video/test.mp4',
                        type:'mp4',
                        poster:'/badmintonhot/video/testpic.png'
                    }}/>
                    <div className="banner-bottom">
                        <div className="container">
                            <div className="faqs-top-grids">
                                <div className="product-grids">
                                    <div className="col-md-8 news_content">
                                        <div id="myTabContent" className="tab-content">
                                            <div className="tab-pane fade in active" id="home">
                                                {trs}
                                            </div>
                                            <div className="tab-pane fade" id="ios">
                                                {grs}
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

 }
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


