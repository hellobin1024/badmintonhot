import React from 'react';
import {render} from 'react-dom';
import '../../css/entry/modules/venueInfo.css';
import {Link} from 'react-router';
var Proxy = require('../../components/proxy/ProxyQ');

var VenueDetail = React.createClass({


    getInitialState:function () {
        return({data:this.props.data});
    },

    render:function() {
        var contains = null;
        if(this.state.data!==null&&this.state.data!==undefined) {
            var data = this.state.data;
            contains =
                <div>
                    <div className="banner-bottom">
                        <div className="container">
                            <div className="faqs-top-grids">
                                <div className="product-grids">
                                    <h1 style={{textAlign: 'center', fontSize: '25px'}}>{data.name}</h1>
                                    <div className="venues" style={{minWidth:'600px'}}>
                                        <div className="venueDetail_left">
                                            <div>
                                                <img className="venueDetail_img" src="/images/w1.jpg"/>
                                            </div>
                                            <div>
                                                <p className="venueDetail_text">负责人：三生三世</p>
                                                <p className="venueDetail_text">联系电话：1121212</p>
                                                <p className="venueDetail_text">场馆地址：电动车动次打次动次打次炖菜的</p>
                                            </div>

                                        </div>
                                        <div className="venueDetail_right">
                                            <p className="venueDetail_text2">
                                                百度百科是百度公司推出的一部内容开放、自由的网络百科全书平台。其测试版于2006年4月20日上线，正式版在2008年4月21日发布，截至2017年4月，百度百科已经收录了超过1432万的词条，参与词条编辑的网友超过610万人，几乎涵盖了所有已知的知识领域。
                                            </p>
                                            <p className="venueDetail_text2">
                                                百度百科旨在创造一个涵盖各领域知识的中文信息收集平台。百度百科强调用户的参与和奉献精神，充分调动互联网用户的力量，汇聚上亿用户的头脑智慧，积极进行交流和分享。同时，百度百科实现与百度搜索、百度知道的结合，从不同的层次上满足用户对信息的需求。
                                            </p>
                                            <p className="venueDetail_text2">
                                                百度百科是百度公司推出的一部内容开放、自由的网络百科全书平台。其测试版于2006年4月20日上线，正式版在2008年4月21日发布，截至2017年4月，百度百科已经收录了超过1432万的词条，参与词条编辑的网友超过610万人，几乎涵盖了所有已知的知识领域。
                                            </p>
                                            <p className="venueDetail_text2">
                                                百度百科旨在创造一个涵盖各领域知识的中文信息收集平台。百度百科强调用户的参与和奉献精神，充分调动互联网用户的力量，汇聚上亿用户的头脑智慧，积极进行交流和分享。同时，百度百科实现与百度搜索、百度知道的结合，从不同的层次上满足用户对信息的需求。
                                            </p>
                                        </div>

                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="venueDetail_map" style={{padding: '30px 35px 0px 15px'}}>
                                        <div id="allmap" style={{minWidth:'300px',minHeight:'250px'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
        }else {
            <div>
                数据过期，请刷新！
            </div>
        }
        return contains;
    },
    componentDidMount:function () {
        // 百度地图API功能
        var map = new BMap.Map("allmap",{minZoom:10,maxZoom:15});
        var point = new BMap.Point(117.128081,36.658059)
        map.centerAndZoom(point,14);
        map.enableScrollWheelZoom(true);

        // 用经纬度设置地图中心点
        map.clearOverlays();
        var new_point = new BMap.Point(117.094643,36.687979);
        var marker = new BMap.Marker(new_point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.panTo(new_point);
        var opts = {
            width : 200,     // 信息窗口宽度
            height: 100,     // 信息窗口高度
            title : "海底捞王府井店" , // 信息窗口标题
            enableMessage:true,//设置允许信息窗发送短息
            message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
        }
        var infoWindow = new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts);  // 创建信息窗口对象
        marker.addEventListener("click", function(){
            map.openInfoWindow(infoWindow,new_point); //开启信息窗口
        });

    },

});
module.exports = VenueDetail;