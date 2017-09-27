/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom';
import '../../build/css/style.css';
var ProxyQ = require('../../components/proxy/ProxyQ');
var SyncStore = require('../../components/flux/stores/SyncStore');
var UserActions=require('../action/UserActions');
var TodayIncome = React.createClass({

    initialData:function(){
        var url="/func/pay/getPayFormListOfToday";
        var params={

        };

        ProxyQ.query(
            'post',
            url,
            params,
            null,
            function(ob) {
                var reCode = ob.re;
                if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) { //数据获取失败
                    return;
                }
                var a=ob.data;
                var sum1=0;
                var sum2=0;
                var pa=[];
                var pb=[];
                for (var i = 0; i < a.length; i++) {
                    if (a[i].useType == "1") {
                       sum1=sum1+a[i].payment;
                        pa.push(a[i]);
                    }
                    else{

                        sum2=sum2+a[i].payment;
                        pb.push(a[i]);
                    }
                }
                var p={};
                p.sum1=sum1;
                p.sum2=sum2;
                p.pa=pa;
                p.pb=pb;
                this.setState({data:p});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    viewSwitch:function(ob){
        var view=ob;
        this.setState({view:view});
    },
    getInitialState: function () {
        var personId = null;
        if(this.props.personId!==undefined && this.props.personId){
            personId = this.props.personId;
        }
        return ({view:'all',personId: personId, data:null});
    },

    render:function(){
        var mainContent = null;
        var data = this.state.data;
        var view =this.state.view;
        var ins = this;
        if(data!==undefined && data!==null){
            var nrs = [];
            var trs = [];

            switch(view) {
                case 'all':

                    mainContent = (
                        <div>
                            <span className="common-label l-label" style={{cursor:'pointer'}} onClick={ins.viewSwitch.bind(null,'shopDetail')}>详细：</span>
                        <div ref="createEvent" className="c-block">
                            <div className="common-line">
                                <span className="common-label l-label">群活动今日总收益：{data.sum1}元</span><span>
                        </span>

                                <span className="common-label r-label">购物的今日总收益：{data.sum2}元</span>
                        <span>
                        </span>
                            </div>
                        </div>
                        </div>)
                    break;
                case 'shopDetail':
                    if (data.pa !== null && data.pa !== undefined) {

                        data.pa.map(function (item, i) {
                            trs.push(
                               <div>
                                   <span style={{fontSize:'14px',marginRight:'5px'}}>金额：{item.payment}</span>
                                   {
                                       item.payType == "1"?<span style={{fontSize:'14px',marginRight:'5px'}}>微信</span>:
                                           <span style={{fontSize:'14px',marginRight:'5px'}}>手机端</span>

                                   }
                                   <span style={{fontSize:'14px',marginRight:'5px'}}>时间：{item.payTimeStr}</span>
                               </div>
                            )
                        })

                    }
                    mainContent = (
                  <div>
                      <span className="common-label l-label" style={{cursor:'pointer'}} onClick={ins.viewSwitch.bind(this,'all')}>汇总：</span>
                      <span className="common-label l-label" style={{cursor:'pointer'}} onClick={ins.viewSwitch.bind(this,'groupDetail')}>群活动：</span>
                        <div ref="createEvent" className="c-block">
                            <div className="common-line">
                                <span className="common-label l-label">购物：{trs}</span>
                            </div>
                        </div>
                  </div>)
                    break;
                case 'groupDetail':
                    if (data.pb !== null && data.pb !== undefined) {

                        data.pb.map(function (item, i) {
                            nrs.push(
                                <div>
                                    <span style={{fontSize:'14px',marginRight:'5px'}}>金额：{item.payment}</span>
                                    {
                                        item.payType == "1"?<span style={{fontSize:'14px',marginRight:'5px'}}>微信</span>:
                                            <span style={{fontSize:'14px',marginRight:'5px'}}>手机端</span>

                                    }


                                    <span style={{fontSize:'14px',marginRight:'5px'}}>时间：{item.payTimeStr}</span>

                                </div>
                            )
                        })

                    }

                    mainContent = (
                        <div>
                            <span className="common-label l-label" onClick={ins.viewSwitch.bind(this,'all')}>汇总：</span>
                            <span className="common-label l-label" onClick={ins.viewSwitch.bind(this,'shopDetail')}>花销：</span>
                            <div ref="createEvent" className="c-block">
                                <div className="common-line">
                                    <span className="common-label l-label">群活动：{nrs}</span>
                                </div>
                            </div>
                        </div>)
                    break;

            }
        }else{

            this.initialData();
        }


        return mainContent;
    },
});

module.exports=TodayIncome;


