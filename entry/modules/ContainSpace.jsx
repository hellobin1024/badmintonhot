import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css';
import '../../build/css/jquery-ui.css';
import '../../build/css/style.css';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';
import RightSlide from './components/RightSilde'
import NewsFirst from './NewsFirst';
import EventsFirst from './EventsFirst';

var Proxy = require('../../components/proxy/ProxyQ');
var ContainSpace = React.createClass({
    initialData: function () {

        this.getAllCompetieionNews();
        if (this.props.token != null) {

            this.getAllCompetieion();
        }
        this.getRollingEvents();
        this.getHotVideos();
        this.getHomepageNews();
    },
    getInitialState: function () {
        var token = this.props.token;
        return ({token: token,});
    },
    dateFormat: function (date) {//object时间转时间格式"yyyy-mm-dd hh:mm:ss"
        return (new Date(date)).toLocaleDateString() + " " + (new Date(date)).toLocaleTimeString();
    },
    getAllCompetieionNews: function () {

        var url = "/func/allow/getAllCompetieionNews";
        var ref = this;
        var newType = "2";
        var params = {
            newsType: newType
        };
        Proxy.query(
            'POST',
            url,
            params,
            null,
            function (res) {
                var a = res.data;
                ref.setState({news: a});
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );

    },

    getRollingEvents: function () {

        var url = "/func/allow/getRollingEvents";
        var ref = this;
        var params = {};
        Proxy.query(
            'POST',
            url,
            params,
            null,
            function (res) {
                var a = res.data;
                ref.setState({events: a});
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );

    },

    getHomepageNews: function () {

        var url = "/func/allow/getHomepageNews";
        var ref = this;
        var params = {};
        Proxy.query(
            'POST',
            url,
            params,
            null,
            function (res) {
                var a = res.data;
                ref.setState({informations: a});
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );

    },

    getHotVideos: function () {

        var url = "/func/allow/getvideolistbytype";
        var ref = this;
        var type = 1;
        var num = 5;
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

    closeModel: function () {

        var successModal = this.refs['successModal'];
        $(successModal).modal('hide');


    },
    getAllCompetieion: function () {

        if (this.state.token !== null && this.state.token !== undefined) {

            var url = "/func/competition/getCanJoinBadmintonCompetitionInfoList";
            var ref = this;
            var params = {};
            Proxy.query(
                'POST',
                url,
                params,
                null,
                function (res) {
                    var a = res.data;
                    if(a!=="null") {
                        var competitionType2 = "";
                        for (var i = 0; i < a.length; i++) {
                            if (a[i].competitionType == "1") {
                                competitionType2 = "公开";
                            } else {

                                competitionType2 = "委托";
                            }
                            a[i].startTime = ref.dateFormat(a[i].startTime);
                            a[i].endTime = ref.dateFormat(a[i].endTime);

                            a[i].competitionType2 = competitionType2;
                        }

                        ref.setState({data: a});
                        var successModal = ref.refs['successModal'];
                        $(successModal).modal('show');

                    }
                },

                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }
            );
        }
    },

test:function (e) {


        /* Finding the drop down list that corresponds to the current section: */
        var dropDown = $(this).parent().next();

        /* Closing all other drop down sections, except the current one */
        $('.dropdown').not(dropDown).slideUp('slow');
        dropDown.slideToggle('slow');

        /* Preventing the default event (which would be to navigate the browser to the link's address) */
        e.preventDefault();

},
    render: function () {
        var contains = null;
        var trs = [];
        var prs = [];
        var vrs = [];
        var ref = this;
        if ((this.state.news !== null && this.state.news !== undefined)
            && (this.state.informations !== null && this.state.informations !== undefined)
            && (this.state.events !== null && this.state.events !== undefined)
            && (this.state.videos !== null && this.state.videos !== undefined)) {
            //赛事
            var data = this.state.data;
            if (data !== null && data !== undefined) {
                data.map(function (item, i) {
                    trs.push(
                        <div key={i}>
                            <div>
                                <div className="conStainbusiness">
                                    <h2 style={{
                                        marginTop: '5px',
                                        fontSize: '16px',
                                        color: '#252223',
                                        textAlign: 'center'
                                    }}>{item.competitionName}</h2>
                                </div>
                                <div className="constainValue">
                                    <p><span style={{fontSize: '16px', color: '#f5f5f5'}}>介绍：</span>{item.breif}<span
                                        style={{
                                            fontSize: '16px',
                                            color: '#f5f5f5',
                                            marginLeft: '5px'
                                        }}>主办方：</span>{item.hostUnit}
                                    </p>

                                    <p><span style={{fontSize: '16px', color: '#f5f5f5'}}>场地：</span> {item.unitName}
                                        <span
                                            style={{
                                                fontSize: '16px',
                                                color: '#f5f5f5',
                                                marginLeft: '5px'
                                            }}>类型：</span> {item.competitionType2}
                                    </p>

                                    <p><span
                                        style={{
                                            fontSize: '16px',
                                            color: '#f5f5f5'
                                        }}>时间：</span> {item.startTime}到{item.endTime}
                                    </p>
                                </div>
                                <div className="buy-me">
                                    <Link style={{fontSize: '17px', color: '#f5f5f5'}}
                                          onClick={ref.closeModel.bind(null)}
                                          to={window.App.getAppRoute() + "/ShowProject?competitionId=" + item.competitionId}>报名</Link>
                                </div>
                            </div>
                        </div>
                    )
                })
            }


            //新闻资讯
            var news = this.state.news;
            news.map(function (item, i) {
                prs.push(
                    <div key={i}>
                        <Link style={{marginTop: '5px'}}
                              to={window.App.getAppRoute() + "/competition"}>  {item.title}</Link>
                        <p>
                            <span style={{fontSize: '12px', color: '#cd4f7e'}}>介绍：</span>{item.brief}
                        </p>
                    </div>
                )
            })
            //新闻资讯
            var informations = this.state.informations;
            //活动
            var events = this.state.events;
            //视频
            var videos = this.state.videos;
            videos.map(function (item, i) {
                vrs.push(
                    <div key={i}>
                        <div className="td-grids">
                            <div className="col-xs-3 td-left">
                                <img src={window.App.getResourceDeployPrefix() + item.img} alt=""/>
                            </div>
                            <div className="col-xs-7 td-middle">
                                {/*<Link to={window.App.getAppRoute() + "/video"}>*/}
                                <a href="#">
                                    {item.title}
                                </a>
                                <p>{item.brief}</p>
                            </div>
                            <div className="col-xs-2 td-right">
                                <p></p>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                )
            })

            contains =
                <div className="banner-bottom">
                    <div className="container">
                        <div className="banner-bottom-grids">
                            <div className="col-md-4 banner-bottom-grid">

                                <div className="choose-info">
                                    <h4>资讯热点</h4>
                                </div>
                                <NewsFirst data={informations}/>
                                <div className="choose">
                                    <div className="choose-info">
                                        <h4>相关简介</h4>
                                    </div>
                                    <div className="choose-grids">
                                        <div className="choose-grids-info">
                                            <div className="choose-left">
                                                <span className="glyphicon glyphicon-globe" aria-hidden="true"></span>
                                            </div>
                                            <div className="choose-right">
                                                <Link to={window.App.getAppRoute() + "/trainerIntroduce"}>教练简介</Link>
                                                <p>浏览教练相关信息（教练履历，获奖荣誉，联系方式等）</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="choose-grids-info">
                                            <div className="choose-left">
                                                <span className="glyphicon glyphicon-globe" aria-hidden="true"></span>
                                            </div>
                                            <div className="choose-right">
                                                <Link to={window.App.getAppRoute() + "/venueIntro"}>场馆简介</Link>
                                                <p>浏览场馆相关信息（场馆地址，联系电话，场馆图片等）</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="choose-grids-info">
                                            <div className="choose-left">
                                                <span className="glyphicon glyphicon-globe" aria-hidden="true"></span>
                                            </div>
                                            <div className="choose-right">
                                                <Link to={window.App.getAppRoute() + "/CostIntroduce"}>收费标准</Link>
                                                <p>浏览收费相关信息（活动收费规则，课程收费规则等）</p>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 banner-bottom-grid">
                                <div className="choose-info">
                                    <h4>热卖推荐</h4>
                                </div>
                                <div className="banner-bottom-middle" style={{paddingTop: '14px'}}>
                                    <a href="products.html">
                                        <img src={window.App.getResourceDeployPrefix() + "/images/a2.jpg"} alt=""/>
                                        <div className="destinations-grid-info tours">
                                            <h5>Book your next Malaysia holiday!</h5>
                                            <p>Integer eget aliquam nibh. Donec blandit volutpat libero id lacinia</p>
                                            <p className="b-period">Book Period: Now - 7 September 2015 | Travel Period:
                                                Now
                                                - 31 October 2015 </p>
                                        </div>
                                    </a>
                                </div>
                                <div className="top-destinations-grids">
                                    <div className="top-destinations-info">
                                        <h4>最热视频</h4>
                                    </div>
                                    <div className="top-destinations-bottom">
                                        {vrs}
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4 banner-bottom-grid">
                                <div className="choose-info">
                                    <h4>赛事</h4>
                                </div>
                                <div className="banner-bottom-right" style={{paddingTop: '15px'}}>

                                    <img src={window.App.getResourceDeployPrefix() + "/images/a3.jpg"} alt=""/>
                                    <div className="destinations-grid-info tours">
                                        <h5>新一轮赛事信息</h5>
                                        {prs}
                                    </div>

                                </div>
                                <div className="news-grids">
                                    <div className="news-grids-info">
                                        <h4>最新活动</h4>
                                    </div>
                                    <div className="news-grids-bottom">
                                        <EventsFirst data={events}/>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="modal fade bs-example-modal-sm login-container"
                         tabIndex="-1"
                         role="dialog"
                         aria-labelledby="myLargeModalLabel"
                         aria-hidden="true"
                         ref='successModal'
                         data-keyboard="false"
                         style={{zIndex: 1045}}
                    >
                        <div className="modal-dialog modal-sm"
                             style={{
                                 position: 'absolute',
                                 top: '30%',
                                 width: '50%',
                                 marginLeft: '25%',
                                 borderBottom: '1px dotted #5B6873'
                             }}>
                            <div className="modal-content"
                                 style={{position: 'relative', width: '800px', padding: '40px'}}>

                                <div className="modal-body">
                                    <div className="modalEventDetail">
                                        {trs}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


        } else {
            this.initialData();
        }

        return contains;
    }
});
const mapStateToProps = (state, ownProps) => {
    const props = {
        token: state.userInfo.accessToken,
        loginName: state.userInfo.loginName,
        personId: state.userInfo.personId,
    }
    return props
}
export default connect(mapStateToProps)(ContainSpace);
