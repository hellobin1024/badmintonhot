import React from 'react';
import {render} from 'react-dom';
import '../../css/entry/modules/venueInfo.css';
import {Link} from 'react-router';
import Bmap from '../../components/basic/Bmap'
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
                                    <Bmap option={{
                                        width:'300px',
                                        height:'250px',
                                        longitude:117.094643,
                                        latitude:36.687979,
                                        opt:true,
                                        opts:{   ///覆盖点信息窗口
                                            width : 200,     // 信息窗口宽度
                                            height: 100,     // 信息窗口高度
                                            title : "山东体育学院羽毛球馆" , // 信息窗口标题
                                        },
                                        optsInfo:'世纪大道10600号'}}/>
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
});
module.exports = VenueDetail;