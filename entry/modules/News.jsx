import React from 'react';
import {render} from 'react-dom';

import {Link} from 'react-router';
import RightSlide from '../../entry/modules/RightSilde'
var Proxy = require('../../components/proxy/ProxyQ');
import PageNavigator from '../../components/basic/PageNavigator.jsx';

var Page = require('../../components/basic/Page');
var News = React.createClass({
    paginationData:function (data,pageIndex) {
        let capacity=data.length;
        var slices=null;
        Page.getInitialDataIndex(8,capacity,pageIndex,function(ob){
                slices=data.slice(ob.begin,ob.end);
            }
        );
        return slices;
    },
    previousCb:function (index,isChange) { //向前跳页
        this.setState({pageIndex:index,isChange:isChange});
    },

    pageCb:function(index,isChange) { //进入指定页的列表
        this.setState({pageIndex:index,isChange:isChange});
    },
    nextCb:function(index,isChange){ //向后跳页,isChange为true
        this.setState({pageIndex:index,isChange:isChange});
    },
    getInitialState:function () {
        return ({
            pageIndex: 0,
            isChange: false,
        });
    },
    getNewsTheme:function () {
        var url = "/func/auth/getNewsTheme";
        var ref = this;
        Proxy.query(
            'GET',
            url,
            null,
            null,
            function (res) {
                var a = res.resList;
                ref.setState({data:a});
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
    },
    initialData:function(){

       this.getNewsTheme();

    },
    render: function () {
        var contains = null;
        if(this.state.data!==null&&this.state.data!==undefined) {
            var data = this.paginationData(this.state.data, this.state.pageIndex);
            var len = this.state.data.length;
            var trs = [];
            data.map(function (item, i) {
                trs.push(
                    <div className="product-right-grids" key={i}>
                        <div className="product-right-top">
                            <div className="p-left">
                                <div className="p-right-img">
                                    <a style={{background:'url('+item.themeImg+') no-repeat 0px 0px',backgroundSize: 'cover'}}></a>
                                </div>
                            </div>
                            <div className="p-right">
                                <div className="col-md-12 p-right-left" style={{paddingLeft: '30px'}}>
                                    <Link to={window.App.getAppRoute() + "/newsContain?id="+item.themeId}>
                                        {item.title}
                                    </Link>
                                    <div className="newsContain">
                                        <span className="icon-eye-open">{item.readCount + '  '}位看官</span>
                                        <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                                        <span className="icon-calendar">{item.creatTime + 1 + '月' + 22 + '日'}</span>
                                    </div>
                                    <p>{item.brief}</p>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                )
            })
        }else{
            this.initialData();
        }
            contains =
                <div className="banner-bottom">
                    <div className="container">
                        <div className="faqs-top-grids">
                            <div className="product-grids">
                                <div className="col-md-8 product-left">
                                    {trs}
                                    <PageNavigator
                                    capacity={len}
                                    threshold={5}
                                    pageIndex={this.state.pageIndex}
                                    pageBegin={1}
                                    previousCb={this.previousCb}
                                    pageCb={this.pageCb}
                                    nextCb={this.nextCb}
                                    isChange={this.state.isChange}
                                    paginate={Page}
                                    />
                                    <div className="product-right-grids">
                                        <div className="product-right-top">
                                            <div className="p-left">
                                                <div className="p-right-img">
                                                    <Link to={window.App.getAppRoute() + "/newsContain"}
                                                          style={{
                                                              background: 'url(../images/ZX1.jpg) no-repeat 0px 0px',
                                                              backgroundSize: 'cover'
                                                          }}>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="p-right">
                                                <div className="col-md-12 p-right-left" style={{paddingLeft: '30px'}}>
                                                    <Link to={window.App.getAppRoute() + "/newsContain"}>
                                                        得网前者得天下丨混双不起球的四大套路
                                                    </Link>
                                                    <div className="newsContain">
                                                        <span className="icon-eye-open">{22 + '  '}位看官</span>
                                                        <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                                                        <span className="icon-calendar">{1 + '月' + 22 + '日'}</span>
                                                    </div>
                                                    <p>他们是苏杯的胜负手，打破了“鲁雅”组合外战不败神话</p>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                    <div className="product-right-grids">
                                        <div className="product-right-top">
                                            <div className="p-left">
                                                <div className="p-right-img">
                                                    <Link to={window.App.getAppRoute() + "/newsContain"}
                                                          style={{
                                                              background: 'url(../images/ZX2.jpg) no-repeat 0px 0px',
                                                              backgroundSize: 'cover'
                                                          }}>
                                                    </Link></div>
                                            </div>
                                            <div className="p-right">
                                                <div className="col-md-12 p-right-left" style={{paddingLeft: '30px'}}>
                                                    <Link to={window.App.getAppRoute() + "/newsContain"}>
                                                        专访：扛下苏杯硬仗+中国特色口头禅=东北爷们李俊慧
                                                    </Link>
                                                    <div className="newsContain">
                                                        <span className="icon-eye-open">{22 + '  '}位看官</span>
                                                        <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                                                        <span className="icon-calendar">{1 + '月' + 22 + '日'}</span>
                                                    </div>
                                                    <p>从排骨到钢条，爱羽客独家专访中国男双运动员李俊慧。</p>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                    <div className="product-right-grids">
                                        <div className="product-right-top">
                                            <div className="p-left">
                                                <div className="p-right-img">
                                                    <Link to={window.App.getAppRoute() + "/newsContain"}
                                                          style={{
                                                              background: 'url(../images/ZX3.jpg) no-repeat 0px 0px',
                                                              backgroundSize: 'cover'
                                                          }}>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="p-right">
                                                <div className="col-md-12 p-right-left" style={{paddingLeft: '30px'}}>
                                                    <Link to={window.App.getAppRoute() + "/newsContain"}>
                                                        业余双打守网前，如何预防对手勾对角？
                                                    </Link>
                                                    <div className="newsContain">
                                                        <span className="icon-eye-open">{22 + '  '}位看官</span>
                                                        <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                                                        <span className="icon-calendar">{1 + '月' + 22 + '日'}</span>
                                                    </div>
                                                    <p>守网前，被对方勾对角直接得分的情况并不少见。</p>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                    <div className="product-right-grids">
                                        <div className="product-right-top">
                                            <div className="p-left">
                                                <div className="p-right-img">
                                                    <Link to={window.App.getAppRoute() + "/newsContain"}
                                                          style={{
                                                              background: 'url(../images/ZX4.jpg) no-repeat 0px 0px',
                                                              backgroundSize: 'cover'
                                                          }}>
                                                    </Link></div>
                                            </div>
                                            <div className="p-right">
                                                <div className="col-md-12 p-right-left" style={{paddingLeft: '30px'}}>
                                                    <Link to={window.App.getAppRoute() + "/newsContain"}>
                                                        日羽协“特赦”桃田贤斗，或7月征战国际赛场
                                                    </Link>
                                                    <div className="newsContain">
                                                        <span className="icon-eye-open">{22 + '  '}位看官</span>
                                                        <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                                                        <span className="icon-calendar">{1 + '月' + 22 + '日'}</span>
                                                    </div>
                                                    <p>日本网友盼望桃田贤斗早日回归赛场，抗衡中国羽毛球队。</p>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                    <div className="product-right-grids">
                                        <div className="product-right-top">
                                            <div className="p-left">
                                                <div className="p-right-img">
                                                    <Link to={window.App.getAppRoute() + "/newsContain"}
                                                          style={{
                                                              background: 'url(../images/ZX5.jpg) no-repeat 0px 0px',
                                                              backgroundSize: 'cover'
                                                          }}>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="p-right">
                                                <div className="col-md-12 p-right-left" style={{paddingLeft: '30px'}}>
                                                    <Link to={window.App.getAppRoute() + "/newsContain"}>
                                                        “黄金双左手”丨如何爆冷世界第一
                                                    </Link>
                                                    <div className="newsContain">
                                                        <span className="icon-eye-open">{22 + '  '}位看官</span>
                                                        <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                                                        <span className="icon-calendar">{1 + '月' + 22 + '日'}</span>
                                                    </div>
                                                    <p>能力上限低于对手，却靠配合+球路的合理化以弱胜强。</p>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                    <div className="product-right-grids">
                                        <div className="product-right-top">
                                            <div className="p-left">
                                                <div className="p-right-img">
                                                    <Link to={window.App.getAppRoute() + "/newsContain"}
                                                          style={{
                                                              background: 'url(../images/ZX6.jpg) no-repeat 0px 0px',
                                                              backgroundSize: 'cover'
                                                          }}>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="p-right">
                                                <div className="col-md-12 p-right-left" style={{paddingLeft: '30px'}}>
                                                    <Link to={window.App.getAppRoute() + "/newsContain"}>
                                                        预防打球抽筋，这5招你必须知道！
                                                    </Link>
                                                    <div className="newsContain">
                                                        <span className="icon-eye-open">{22 + '  '}位看官</span>
                                                        <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                                                        <span className="icon-calendar">{1 + '月' + 22 + '日'}</span>
                                                    </div>
                                                    <p>教你几招，轻松预防抽筋。</p>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                </div>
                                <RightSlide/>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
        

        return contains


    }

});
module.exports = News;