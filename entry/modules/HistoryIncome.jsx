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
        var url="/func/pay/getPayFormListOfOutDate";
        const Today=new Date();
        var preDate = new Date(Today.getTime() - 24*60*60*1000); //前一天
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
                var sum1=0.00;
                var sum2=0.00;
                var pa=[];
                var pb=[];
                var k=1;
                var c=1;
                for (var i = 0; i < a.length; i++) {
                    if (a[i].useType == "1") {
                        sum1=(parseFloat(sum1)+parseFloat(a[i].payment)).toFixed(2);
                        a[i].num=k++;
                        pa.push(a[i]);
                    }
                    else{

                        sum2=sum2+a[i].payment;
                        a[i].num=c++;
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

    doSerachHistoryIncome: function (useType) {
        var date = document.getElementById("Date").value;
        var url = "/func/pay/getPayFormListOfOutDate";
        var params={
            selectime:date,
            useType:useType
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
                var sum1;
                var sum2;
                var pa=[];
                var pb=[];
                var k=1;
                var c=1;
                for (var i = 0; i < a.length; i++) {
                    if (a[i].useType == "1") {
                        sum1=parseFloat(sum1*1)+parseFloat(a[i].payment*1);
                        a[i].num=k++;
                        pa.push(a[i]);
                    }
                    else{

                        sum2=sum2+a[i].payment*1;
                        a[i].num=c++;
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
            var ars = [];
            var brs = [];
            var crs = [];
            var trs = [];
            var nrs = [];
            if (data.pa !== null && data.pa !== undefined) {

                data.pa.map(function (item, i) {
                    trs.push(
                        <tbody  key={i} className="event-table">

                        <tr><td><h4 style={{marginTop:'15px'}}><strong>购物收益{item.num}:</strong></h4></td></tr>
                        <tr>
                            <td>金额：{item.payment}元</td>
                            <td>{
                                item.payType == "1"?<span style={{fontSize:'14px',marginRight:'5px'}}>支付手段：微信</span>:
                                    <span style={{fontSize:'14px',marginRight:'5px'}}>支付手段：手机端</span>

                            }</td>
                            <td>时间：{item.payTimeStr}</td>
                        </tr>
                        </tbody>
                    )
                })

            }
            brs.push(
                <div>
                    <div id="event" className="my-event">
                        <div className="widget-container fluid-height">
                            <div className="widget-content padded clearfix">
                                <table className="table table-striped invoice-table">
                                    <thead className="table-head">
                                    <tr>
                                        <th width="300"></th>
                                        <th width="300"></th>
                                        <th width="300"></th>
                                    </tr>
                                    </thead>

                                    {trs}

                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span style={{color:'#000000',fontSize:'16px',marginLeft:'20px'}}>群活动历史总收益：{data.sum1}元</span>
                    </div>
                </div>
            )
            if (data.pb !== null && data.pb !== undefined) {
                data.pb.map(function (item, i) {
                    nrs.push(
                        <tbody  key={i} className="event-table">

                        <tr><td><h4 style={{marginTop:'15px'}}><strong>群活动收益{item.num}:</strong></h4></td></tr>
                        <tr>
                            <td>金额：{item.payment}元</td>
                            <td>{
                                item.payType == "1"?<span style={{fontSize:'14px',marginRight:'5px'}}>支付手段：微信</span>:
                                    <span style={{fontSize:'14px',marginRight:'5px'}}>支付手段：手机端</span>

                            }
                            </td>
                            <td>时间：{item.payTimeStr}</td>
                        </tr>

                        </tbody>
                    )
                })

            }

            crs.push(
                <div>
                    <div id="event" className="my-event">
                        <div className="widget-container fluid-height">
                            <div className="widget-content padded clearfix">
                                <table className="table table-striped invoice-table">
                                    <thead className="table-head">
                                    <tr>
                                        <th width="300"></th>
                                        <th width="300"></th>
                                        <th width="300"></th>
                                    </tr>
                                    </thead>

                                    {nrs}

                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span style={{color:'#000000',fontSize:'16px',marginLeft:'20px'}}>购物的历史总收益：{data.sum2}元</span>
                    </div>
                </div>
            )
            mainContent=
                <div>
                    <br> </br>
                    <div>
                        <ul id="myTab" className="nav nav-tabs">
                            <li className="active" id="events" >
                                <a href="#home"  data-toggle="tab" style={{textAlign:'center',fontSize:'15px',color: '#337ab7',backgroundColor: 'white'}}>
                                    购物
                                </a>
                            </li>
                            <li id="groups">
                                <a href="#ios"  data-toggle="tab"  style={{textAlign:'center',fontSize:'15px',color:'#337ab7',backgroundColor: 'white'}}>
                                    群活动
                                </a>
                            </li>
                        </ul>
                        <div id="myTabContent" className="tab-content">
                            <div className="tab-pane fade in active" id="home">
                                <br> </br>
                                <input style={{fontSize:'14px',width:'200px',height:'35px',marginLeft:'20px'}}
                                       type="date" id="Date" name="Date" > </input>
                                <button
                                    style={{fontSize:'14px',color:'#11a669',width:'50px',height:'35px',marginLeft:'20px'}}
                                    onClick={this.doSerachHistoryIncome.bind(ins,"1")} >搜索
                                </button>
                                {brs}
                            </div>
                            <div className="tab-pane fade" id="ios">
                                <br> </br>
                                <input style={{fontSize:'14px',width:'200px',height:'35px',marginLeft:'20px'}}
                                       type="date" id="Date" name="Date" > </input>
                                <button
                                    style={{fontSize:'14px',color:'#11a669',width:'50px',height:'35px',marginLeft:'20px'}}
                                    onClick={this.doSerachHistoryIncome.bind(ins,"2")} >搜索
                                </button>
                                {crs}
                            </div>
                        </div>
                    </div>
                </div>

        }
        else{

            this.initialData();
        }


        return mainContent;
    },
});

module.exports=TodayIncome;


