import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import '../../build/css/css/common.css'
import '../../build/css/css/animate.min.css'
import '../../build/css/css/indexSty.css'

var AdPage = React.createClass({

    getInitialState: function () {

        return ({});
    },



    render:function() {
        var contains = null;

            contains =
                <div>
                    <div>
                        <div className="leftBg"></div>

                        <div className="rightBg"></div>
                        <div className="content mr">
                            <div className="logo_ad">
                                <Link to={window.App.getAppRoute() + "/training"}>
                                    <img src="/images/img/home.png" />官网
                                </Link>
                            </div>

                            <div className="con_lf lf">
                                <div className="big_word">

                                </div>
                                <div className="btnCon">
                                        <img className="btnbg" src="/images/img/left_btn_bg.png"/>
                                        <Link to={window.App.getAppRoute() + "/adText"}>
                                            <div className="adText">
                                            <h2>这个夏天 加入我们吧！</h2>
                                            <p>
                                                运动热体育携手山东体育学院举行 “羽毛球夏令营” ，让孩子们感受到大学校园的氛围是我们的初衷，让孩子们快速的提高羽毛球技战术水平是我们的目标，让孩子们学会独立、学会拼搏是我们的希望！
                                            </p>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th colSpan={2} className="adText_th">夏令营安排</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="adText_td1">第一期</td>
                                                        <td className="adText_td2">7月03日—7月12日（已报满）</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="adText_td1">第二期</td>
                                                        <td className="adText_td2">7月17日—7月26日（招生中……）</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="adText_td1">第三期</td>
                                                        <td className="adText_td2">7月31日—8月09日（招生中……）</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="adText_td1">第四期</td>
                                                        <td className="adText_td2">8月14日—8月23日（招生中……）</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="adText_td1">学费</td>
                                                        <td className="adText_td2">每期2800元</td>
                                                    </tr>
                                                    <tr>

                                                        <td colSpan={2}>7:00-8:00早饭；8:40-11:40训练馆训练
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Link>
                                    <Link to={window.App.getAppRoute() + "/login?loginType=1&product=12"}>
                                        <img className="btn_arow" src="/images/img/left.png"/>
                                        <img className="btnWord" src="/images/img/btn_word.png"/>
                                    </Link>
                                </div>
                                <div className="house"><img src="/images/img/huose.png"/></div>
                            </div>

                            <div className="con_rf lf">
                                <div className="peoCon">
                                    <img className="peo" src="/images/img/peo.png"/>
                                    <img className="work" alt="挑工作" src="/images/img/qiuzhizhe.png"/>
                                </div>

                                <div className="peoBtn">
                                    <Link to={window.App.getAppRoute() + "/login?loginType=1&product=13"}>
                                        <img className="btnbg_rf" src="/images/img/rf_bg.png"/>
                                        <img className="btnWord_rf" alt="求职者" src="/images/img/tiao.png"/>
                                    </Link>
                                    <Link to={window.App.getAppRoute() + "/adText"}>
                                    <div className="adText1">
                                        <h2>我们让您的孩子更强大！</h2>
                                        <p>暑期班培训将会带给您
                                            1、激发孩子兴趣，提高运动能力与羽毛球技术
                                            2、提高勇气、拓展孩子的知识面、
                                            3、培养孩子坚韧不拔，永不放弃的奋斗精神、
                                            4、让孩子掌握最基础的自主生活与集体生活能力、培养团队精神
                                            5、认识新朋友，加强孩子的沟通能力，直接提升孩子的社交能力
                                        </p>
                                        <table>
                                            <thead>
                                            <tr>
                                                <th colSpan={2} className="adText_th">暑期班安排</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className="adText_td1">时间</td>
                                                <td className="adText_td2">2017年7月13日-2017年8月25日期间</td>
                                            </tr>
                                            <tr>
                                                <td className="adText_td1">课程</td>
                                                <td className="adText_td2">共计20课时，周一到周五，周末休息</td>
                                            </tr>
                                            <tr>
                                                <td className="adText_td1">时段</td>
                                                <td className="adText_td2">上午8:30—10:30||下午15:00—17:00</td>
                                            </tr>
                                            <tr>
                                                <td className="adText_td1">特色</td>
                                                <td className="adText_td2">学生自由选择时间，随到随学，学满20课时为准</td>
                                            </tr>
                                            <tr>
                                                <td className="adText_td1">福利</td>
                                                <td className="adText_td2">送一套训练服</td>
                                            </tr>
                                            <tr>
                                                <td className="adText_td1">学费</td>
                                                <td className="adText_td2">价格：1350元</td>
                                            </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                    </Link>
                                    <img className="btn_arow_rf" src="/images/img/rf.png"/>
                               </div>

                                <div className="big_word_rf"></div>

                            </div>
                            <div className="clearfix"> </div>
                        </div>

                    </div>
                    <div className="clearfix"> </div>

                </div>



        return contains;

    },
    componentDidMount:function () {

    }
});
module.exports = AdPage;