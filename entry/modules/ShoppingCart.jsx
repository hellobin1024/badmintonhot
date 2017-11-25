import React from 'react';
import {render} from 'react-dom';

import {Link} from 'react-router';
import RightSlide from './components/RightSilde'
var Proxy = require('../../components/proxy/ProxyQ');
import PageNavigator from '../../components/basic/PageNavigator.jsx';

var Page = require('../../components/basic/Page');
var ShoppingCart = React.createClass({
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

    getInitialState: function () {
        var personId = null;
        if(this.props.personId!==undefined && this.props.personId){
            personId = this.props.personId;
        }
        return ({personId: personId, data:null,current:null,pageIndex: 0,
            isChange: false});
    },
    dateFormat:function (date) {//object时间转时间格式"yyyy-mm-dd hh:mm:ss"
        return (new Date(date)).toLocaleDateString() + " " + (new Date(date)).toLocaleTimeString();
    },
    getShoppingCart:function () {
        var url = "/func/allow/getGoodsCartList";
        var ref=this;
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
    doCancelMallCart: function (id,index) {
        var id=id;
        var Str="你确定要删除该商品么？";
        var ref=this;
        if(window.confirm(Str)) {

            var url = "/func/allow/deleteMallCart";
            var params = {
                id:id,
            };

            Proxy.query(
                'post',
                url,
                params,
                null,
                function (ob) {
                    var reCode = ob.re;
                    if (reCode !== undefined && reCode !== null && (reCode == -1 || reCode == "-1")) {
                        alert(ob.data);
                        return;
                    }
                    var data = this.state.data;
                    data.splice(index,1);
                    this.setState({data:data});


                    alert.showTips("删除成功！");
                }.bind(this),
                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }else{
            return;
        }
    },
    initialData:function(){

        this.getShoppingCart();

    },
    render: function () {
        var contains = null;
        var doCancelMallCart = this.doCancelMallCart;
        if(this.state.data!==null&&this.state.data!==undefined) {
            var data = this.paginationData(this.state.data, this.state.pageIndex);
            var len = this.state.data.length;
            var trs = [];
            var ref=this;
            data.map(function (item, i) {

                trs.push(

                        <tbody key={i} className="group-table"style={{backgroundColor:"#FFFFFF"}}>
                        <tr>
                            <td >
                            <div className="p-left" style={{width:'100%',height:'100%'}}>
                                <div className="p-right-img">
                                    <a style={{background:'url('+item.img+') no-repeat 0px 0px',backgroundSize: 'cover'}}></a>
                                </div>
                            </div>
                            </td>
                            <td>
                                <span  style={{textAlign:'center'}}>
                              {item.name}
                                </span>
                            </td>
                            <td >
                                <span  style={{textAlign:'center'}}>
                                  {item.price}
                                </span>
                            </td>

                            <td >
                                <span  style={{textAlign:'center'}}>
                                   {item.salesNumber}
                                </span>
                            </td>
                            <td >
                                <span  style={{extAlign:'center'}}>
                                    {item.sum}
                                </span>
                            </td>
                            <td style={{textAlign:'left'}}>
                               <span  onClick={ref.doCancelMallCart.bind(ref,item.id,i)}
                                      style={{textAlign:'center',fontSize:'14px',marginRight:'5px',textDecoration:'underline',cursor:'pointer',color:'#054c61'}}>
                                  删除
                                </span>
                            </td>
                        </tr>
                    </tbody>
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
                            <div >
                               <h1 style={{textAlign:'center',fontSize:'20px',color: '#434d59'}}>我的购物车 &nbsp; </h1>
                                <table className="table table-striped invoice-table">
                                    <thead className="table-head">
                                    <tr>
                                        <th width="350">商品照片</th>
                                        <th width="150">商品</th>
                                        <th width="150">单价</th>
                                        <th width="150">数量</th>
                                        <th width="150">金额</th>
                                        <th width="150">操作</th>
                                    </tr>
                                    </thead>
                                    {trs}
                                </table>
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
                                <div>
                                    <a  style={{textAlign:'right',fontSize:'24px',color:'#1b58d3',marginLeft:'90%'}}>结算</a>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>


        return contains


    }

});
module.exports = ShoppingCart;