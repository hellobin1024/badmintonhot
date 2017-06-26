import React from 'react';
import {render} from 'react-dom';





var adPage = React.createClass({

    getInitialState: function () {

        return ({});
    },



    render:function() {
        var contains = null;

            contains =
                <div>
                    <div className="leftBg"></div>
                    <div className="rightBg"></div>
                    <div className="content mr">
                        <div className="logo_ad">
                            <a href="http://down.admin5.com">
                                <img src="/images/img/logo.png"/>
                            </a>
                        </div>

                        <div className="con_lf lf">
                            <div className="big_word">
                                <img alt="大企业，大能量" src="/images/img/big_word.png"/>
                            </div>
                            <div className="btnCon">
                                <a href="http://down.admin5.com">
                                <img className="btnbg" src="/images/img/left_btn_bg.png"/>
                                    <img className="btn_arow" src="/images/img/left.png"/>
                                        <img className="btnWord" src="/images/img/btn_word.png"/>
                            </a></div>
                            <div className="house"><img src="/images/img/huose.png"/></div>
                        </div>

                        <div className="con_rf lf">
                            <div className="peoCon">
                                <img className="peo" src="/images/img/peo.png"/>
                                    <img className="work" alt="挑工作" src="/images/img/tiao.png"/>
                            </div>
                            <div className="peoBtn"><a href="http://down.admin5.com">
                                <img className="btnbg_rf" src="/images/img/rf_bg.png"/>
                                    <img className="btnWord_rf" alt="求职者" src="/images/img/qiuzhizhe.png"/>
                                        <img className="btn_arow_rf" src="/images/img/rf.png"/>
                            </a></div>
                            <div className="big_word_rf"><img alt="小白领，大作为" src="/images/img/right_word.png"/></div>

                        </div>
                    </div>

                </div>



        return contains;

    },
    componentDidMount:function () {

    }
});
module.exports = adPage;