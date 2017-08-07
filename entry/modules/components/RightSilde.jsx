import React from 'react';
import {render} from 'react-dom';

var RightSlide = React.createClass({


    getInitialState: function () {

        return ({});
    },


    render:function() {
        var contains = null;
        contains =
            <div className="col-md-4 product-right">
                    <div className="h-className">
                        <h5>推广</h5>
                        <img src={window.App.getResourceDeployPrefix()+"/images/TG.jpg"} style={{width: '100%'}}/>
                    </div>
                    <div className="h-className p-day">
                        <h5>新闻快讯</h5>
                        <label className="check"><a>【NBA】骑士又负勇士20+，夺冠希望渺茫</a></label>
                        <label className="check"><a>【足球】热烈庆贺皇马夺冠！</a></label>
                        <label className="check"><a>【羽毛球】林丹欲夺第二十个冠军</a></label>
                        <label className="check"><a>【羽毛球】中国混双小将异军突起成黑马！</a></label>
                        <label className="check"><a>【羽毛球】亚锦赛丨谌龙2-1林丹，国羽夺下三冠</a></label>
                        <label className="check"><a>【羽毛球】林丹：苏杯谁的状态更好，教练就让谁上</a></label>
                        <label className="check"><a>【羽毛球】亚锦赛丨鲁恺/黄雅琼夺冠！保持外战不败记录</a></label>
                    </div>
                    <div className="h-className">
                        <h5>技术文章</h5>
                        <label className="check"><a>【NBA】骑士又负勇士20+，夺冠希望渺茫</a></label>
                        <label className="check"><a>【足球】热烈庆贺皇马夺冠！</a></label>
                        <label className="check"><a>【羽毛球】林丹欲夺第二十个冠军</a></label>
                        <label className="check"><a>【羽毛球】中国混双小将异军突起成黑马！</a></label>
                        <label className="check"><a>【羽毛球】亚锦赛丨谌龙2-1林丹，国羽夺下三冠</a></label>
                        <label className="check"><a>【羽毛球】林丹：苏杯谁的状态更好，教练就让谁上</a></label>
                        <label className="check"><a>【羽毛球】亚锦赛丨鲁恺/黄雅琼夺冠！保持外战不败记录</a></label>
                    </div>
                    <div className="h-className p-day">
                        <h5>装备推荐</h5>
                        <img src={window.App.getResourceDeployPrefix()+"/images/TG2.jpg"} style={{width: '100%'}}/>
                    </div>

            </div>
        return contains;
    }
});
module.exports = RightSlide;