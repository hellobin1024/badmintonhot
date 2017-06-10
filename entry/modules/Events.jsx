import React from 'react';
import {render} from 'react-dom';
import '../../build/css/style.css'
import RightSlide from '../../entry/modules/RightSilde'

var Event = React.createClass({


    getInitialState: function () {

        return ({});
    },

    showEventsDetail:function () {
        var successModal = this.refs['successModal'];
        $(successModal).modal('show');
    },
    closeModal:function () {
        var successModal = this.refs['successModal'];
        $(successModal).modal('hide');
    },

    render:function() {
        var contains = null;
        contains =
            <div>
            <div className="banner-bottom">
                <div className="container">
                    <div className="faqs-top-grids">
                        <div className="product-grids">
                            <div className="col-md-8 news_content">
                                <div className="basic">

                                    <div className="business">
                                        <h2>基础练习</h2>
                                        <p><span>地点：</span>山大软件园</p>
                                    </div>
                                    <div className="value">
                                        <p><span>组织者：</span>林丹</p>
                                    </div>
                                    <ul>
                                        <li><span>时间：</span> 2017-6-9</li>
                                        <li><span>报名：</span> Files</li>
                                        <li><span>简介：</span> 讲述了客服即可圣诞节副书记阿里看见的时刻</li>

                                    </ul>
                                    <div className="buy-me">
                                        <a onClick={this.showEventsDetail}>参加</a>
                                    </div>
                                </div>
                                <div className="basic">

                                    <div className="business">
                                        <h2>基础练习</h2>
                                        <p><span>地点：</span>山大软件园</p>
                                    </div>
                                    <div className="value">
                                        <p><span>组织者：</span>林丹</p>
                                    </div>
                                    <ul>
                                        <li><span>时间：</span> 2017-6-9</li>
                                        <li><span>报名：</span> Files</li>
                                        <li><span>简介：</span> 讲述了客服即可圣诞节副书记阿里看见的时刻</li>

                                    </ul>
                                    <div className="buy-me">
                                        <a href="#">参加</a>
                                    </div>
                                </div>
                                <div className="basic">

                                    <div className="business">
                                        <h2>基础练习</h2>
                                        <p><span>地点：</span>山大软件园</p>
                                    </div>
                                    <div className="value">
                                        <p><span>组织者：</span>林丹</p>
                                    </div>
                                    <ul>
                                        <li><span>时间：</span> 2017-6-9</li>
                                        <li><span>报名：</span> Files</li>
                                        <li><span>简介：</span> 讲述了客服即可圣诞节副书记阿里看见的时刻</li>

                                    </ul>
                                    <div className="buy-me">
                                        <a href="#">参加</a>
                                    </div>
                                </div>
                                <div className="basic">

                                    <div className="business">
                                        <h2>基础练习</h2>
                                        <p><span>地点：</span>山大软件园</p>
                                    </div>
                                    <div className="value">
                                        <p><span>组织者：</span>林丹</p>
                                    </div>
                                    <ul>
                                        <li><span>时间：</span> 2017-6-9</li>
                                        <li><span>报名：</span> Files</li>
                                        <li><span>简介：</span> 讲述了客服即可圣诞节副书记阿里看见的时刻</li>

                                    </ul>
                                    <div className="buy-me">
                                        <a href="#">参加</a>
                                    </div>
                                </div>
                                <div className="basic">

                                    <div className="business">
                                        <h2>基础练习</h2>
                                        <p><span>地点：</span>山大软件园</p>
                                    </div>
                                    <div className="value">
                                        <p><span>组织者：</span>林丹</p>
                                    </div>
                                    <ul>
                                        <li><span>时间：</span> 2017-6-9</li>
                                        <li><span>报名：</span> Files</li>
                                        <li><span>简介：</span> 讲述了客服即可圣诞节副书记阿里看见的时刻</li>

                                    </ul>
                                    <div className="buy-me">
                                        <a href="#">参加</a>
                                    </div>
                                </div>
                                <div className="basic">

                                    <div className="business">
                                        <h2>基础练习</h2>
                                        <p><span>地点：</span>山大软件园</p>
                                    </div>
                                    <div className="value">
                                        <p><span>组织者：</span>林丹</p>
                                    </div>
                                    <ul>
                                        <li><span>时间：</span> 2017-6-9</li>
                                        <li><span>报名：</span> Files</li>
                                        <li><span>简介：</span> 讲述了客服即可圣诞节副书记阿里看见的时刻</li>

                                    </ul>
                                    <div className="buy-me">
                                        <a href="#">参加</a>
                                    </div>
                                </div>
                                <div className="basic">

                                    <div className="business">
                                        <h2>基础练习</h2>
                                        <p><span>地点：</span>山大软件园</p>
                                    </div>
                                    <div className="value">
                                        <p><span>组织者：</span>林丹</p>
                                    </div>
                                    <ul>
                                        <li><span>时间：</span> 2017-6-9</li>
                                        <li><span>报名：</span> Files</li>
                                        <li><span>简介：</span> 讲述了客服即可圣诞节副书记阿里看见的时刻</li>

                                    </ul>
                                    <div className="buy-me">
                                        <a href="#">参加</a>
                                    </div>
                                </div>


                            </div>
                            <RightSlide/>
                            <div className="clearfix"> </div>
                        </div>
                    </div>
                </div>
            </div>
                <div className="modal fade bs-example-modal-sm login-container"
                     tabIndex="-1"
                     role="dialog"
                     aria-labelledby="myLargeModalLabel"
                     aria-hidden="true"
                     ref='successModal'
                     data-backdrop="static"
                     data-keyboard="false"
                     style={{zIndex:1045}}
                >
                    <div className="modal-dialog modal-sm"
                         style={{position: 'absolute', top: '30%', width: '50%', marginLeft: '25%'}}>
                        <div className="modal-content"
                             style={{position: 'relative', width: '100%', padding: '40px'}}>

                            <div className="modal-body">
                                <div className="modalEventDetail">
                                    <div style={{textAlign: 'center'}}>

                                        <div className="business">
                                            <h2>基础练习</h2>
                                            <p><span>地点：</span>山大软件园</p>
                                        </div>
                                        <div className="value">
                                            <p><span>组织者：</span>林丹</p>
                                        </div>
                                        <ul>
                                            <li><span>时间：</span> 2017-6-9</li>
                                            <li><span>参与者：</span> 赵四、刘能、谢大姐、谢广坤、谢飞机</li>
                                            <li><span>简介：</span> 讲述了客服即可圣诞节副书记阿里看见的时刻</li>
                                        </ul>
                                        <div className="buy-me">
                                            <a onClick={this.closeModal}>报名</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        return contains;

    }
});
module.exports = Event;