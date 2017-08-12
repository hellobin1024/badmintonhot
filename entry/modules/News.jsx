import React from 'react';
import {render} from 'react-dom';

import {Link} from 'react-router';
import RightSlide from './components/RightSilde'
var Proxy = require('../../components/proxy/ProxyQ');
import PageNavigator from '../../components/basic/PageNavigator.jsx';

var Page = require('../../components/basic/Page');
var News = React.createClass({
    paginationData:function (data,pageIndex) {
        let capacity=data.length;
        var slices=null;
        var threshold = 8;
        Page.getInitialDataIndex(threshold,capacity,pageIndex,function(ob){
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
    dateFormat:function (date) {//object时间转时间格式"yyyy-mm-dd hh:mm:ss"
        return (new Date(date)).toLocaleDateString() + " " + (new Date(date)).toLocaleTimeString();
    },
    getNewsList:function () {
        var url = "/func/allow/getNewsList";
        var ref = this;
        var param={
        }
        Proxy.query(
            'POST',
            url,
            param,
            null,
            function (res) {
                var a = res.data;
                ref.setState({data:a});
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
    },
    initialData:function(){

       this.getNewsList();

    },
    render: function () {
        var contains = null;
        if(this.state.data!==null&&this.state.data!==undefined) {
            var data = this.paginationData(this.state.data, this.state.pageIndex);
            var len = this.state.data.length;
            var trs = [];
            var ref=this;
            data.map(function (item, i) {
                trs.push(
                    <div className="product-right-grids" key={i}>
                        <div className="product-right-top">
                            <div className="p-left">
                                <div className="p-right-img">
                                    <a style={{background:'url('+item.img+') no-repeat 0px 0px',backgroundSize: 'cover'}}></a>
                                </div>
                            </div>
                            <div className="p-right">
                                <div className="col-md-12 p-right-left" style={{paddingLeft: '30px'}}>
                                    <a href={"http://114.215.99.2:8880/news/"+item.newsNum+"/index.html"} target="_Blank">
                                        {item.title}
                                    </a>
                                    <div className="newsContain">
                                        <span className="icon-eye-open">{item.readCount + '  '}位看官</span>
                                        <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                                        <span className="icon-calendar">{ref.dateFormat(item.createTime)}</span>
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