import React from 'react';
import {render} from 'react-dom';
import '../../css/entry/modules/newContain.css'
import RightSlide from './components/RightSilde'
var Proxy = require('../../components/proxy/ProxyQ');

var NewsContain = React.createClass({


    getInitialState: function () {
        var id=this.getUrlParam('id');
        this.getNewsContain(id);
        return ({
            themeId:id,
        });
    },

    //获取url中的参数
    getUrlParam :function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        // var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        var r = window.location.href.substr(window.location.href.indexOf('?')+1).match(reg);
        if (r != null) return unescape(r[2]); return null; //返回参数值
    },

    getNewsContain:function (id) {
        var url = "/func/allow/getNewsContent";
        var param={
            id:id
        }
        var ref = this;
        Proxy.query(
            'POST',
            url,
            param,
            null,
            function (res) {
                var a = res.resList;
                ref.setState({data:a});
                var exam = document.getElementById("news_content_add");
                exam.innerHTML += a.content;
            },
            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );

    },

    render:function() {
        var contains = null;
        if(this.state.data!==null&&this.state.data!==undefined) {
            var data = this.state.data;
            var title = data.badmintonNewsTheme.title;
            contains =
                <div className="banner-bottom">
                    <div className="container">
                        <div className="faqs-top-grids">
                            <div className="product-grids">
                                <div className="col-md-8 news_content">
                                    <h1>泰国赛丨因达农险胜队友，国羽混双小将夺冠</h1>
                                    <h1>{title}</h1>
                                    <div className="news_info clearfix">

                                    <span className="news_from">
                                        来源: 爱羽客羽毛球网
                                    </span>
                                        <span className="news_date">
                                        2017-06-04 20:17:00
                                    </span>
                                        <div className="clearfix"></div>
                                    </div>

                                    <div className="news_content_body clearfix">
                                        <div id="news_content_add">

                                        </div>

                                        <p>
                                            北京时间6月4日，在2017年泰国羽毛球公开赛上，印尼组合波莉/拉哈尤夺得女双冠军，因达农夺得女单冠军，印度普拉尼斯2-1逆转乔纳坦男单夺冠，国羽
                                            <span>何济庭/杜玥</span>
                                            夺得混双冠军。
                                        </p>
                                        <p>
                                            <strong>女双：波莉/拉哈尤（印尼）2-0（21-12、21-12）伽芮恰伦/穆恩旺（泰国）</strong>
                                        </p>
                                        <p>
                                            <img src="http://img2.aiyuke.com/upload/2017/06/04/17060414320621456.jpg"
                                                 alt="" data-key="0" className="image-click"/></p>
                                        <p>
                                            在里约奥运周期后，印尼女双选手波莉开始与新搭档组合参赛，今年上半年与普拉蒂普塔合作参赛，但成绩一直不佳，此次波莉与拉哈尤搭档，打入泰国黄金赛决赛。对手泰国组合伽芮恰伦/穆恩
                                            <span style={{lineHeight: 1.5}}>旺世界排名第42位。</span>
                                        </p>
                                        <p>
                                            <img src="http://img2.aiyuke.com/upload/2017/06/04/17060414321382123.jpg"
                                                 alt="" data-key="1" className="image-click"/></p>
                                        <p>
                                            首局，印尼组合在落后情况下，逐渐追平并反超比分，15-12后，波莉/拉哈尤连得6分，以21-12拿下第一局。第二局，印尼组合一路领先，21-12拿下最后的胜利。
                                        </p>
                                        <p>
                                            <span
                                                style={{lineHeight: 1.5}}><strong>女单：因达农2-1（21-18、12-21、21-16）布桑兰</strong></span>
                                        </p>
                                        <p>
                                        <span style={{lineHeight: 1.5}}>
                                            <strong>
                                                <img
                                                    src="http://img2.aiyuke.com/upload/2017/06/04/17060417403619581.jpg"
                                                    alt="" data-key="2" className="image-click"/>
                                                <br/>
                                            </strong>
                                        </span>
                                        </p>
                                        <p>
                                            <span style={{lineHeight: 1.5}}>泰国一姐因达农目前世界排名第8，布桑兰世界排名第13。首局因达农21-18拿下，次局布桑兰21-12顽强扳回一局。</span>
                                        </p>
                                        <p>
                                            <span style={{lineHeight: 1.5}}>决胜局双方打的十分激烈，双方一度战至10平。间歇后，因达农开</span>
                                            <span style={{lineHeight: 1.5}}>始提速进攻，逐渐以14-10拉开比分，并以21-16拿下了决胜局。</span>
                                        </p>
                                        <p>
                                        <span style={{lineHeight: 1.5}}>
                                            <strong>男双：安格里亚万/哈迪安托（印尼）2-0（21-16、21-16）拉斐尔/卡斯巴尔（德国）</strong>
                                        </span>
                                        </p>
                                        <p>
                                            <strong>男单：普拉尼斯（印度）2-1(17-21、21-18、21-19)乔纳坦（印尼）</strong>
                                        </p>
                                        <p>
                                            <strong>
                                                <img
                                                    src="http://img2.aiyuke.com/upload/2017/06/04/17060419031722280.jpg"
                                                    alt="" data-key="3" className="image-click"/>
                                                <br/>
                                            </strong>
                                        </p>
                                        <p>
                                            <span style={{lineHeight: 1.5}}>首局双方打的十分焦灼，但在关键分上乔纳坦更胜一筹，普拉尼斯网前抽球出界，乔纳坦20-17拿到局点，并以21-17拿下了第一局。随后普拉尼斯21-18扳回一局。</span>
                                        </p>
                                        <p>
                                            <span style={{lineHeight: 1.5}}>决胜局双方</span>
                                            <span style={{lineHeight: 1.5}}>依旧很焦灼战至19平，随着乔纳坦杀球下网，普拉尼斯20-19拿到赛点，并以21-19拿下了最终的胜利。</span>
                                        </p>
                                        <p>
                                        <span style={{lineHeight: 1.5}}>
                                            <strong>混双：吴顺发/赖洁敏（大马）1-2（13-21、21-16、12-21）何济庭/杜玥（中国）</strong>
                                        </span>
                                        </p>
                                        <p>
                                        <span style={{lineHeight: 1.5}}>
                                            <strong>
                                                <img
                                                    src="http://img2.aiyuke.com/upload/2017/06/04/17060420164521790.jpg"
                                                    alt="" data-key="4" className="image-click"/>
                                                <br/>
                                            </strong>
                                        </span>
                                        </p>
                                        <p>
                                            <span style={{lineHeight: 1.5}}>首局吴顺发/赖洁敏失误较多，何济庭/杜玥12-5大比分领跑，21-13轻松拿下第一局。随后大马组合21-16扳回一局，决胜局国羽小将组合15-8大比分领先，21-12拿下了胜利。</span>
                                        </p>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="news_footer">
                                        <i className="news_end"></i>
                                        <div className="news_author">
                                            来源: 爱羽客羽毛球网
                                            作者: 爱羽客大毛
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <RightSlide/>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
        }
        return contains;
    }
});
module.exports = NewsContain;