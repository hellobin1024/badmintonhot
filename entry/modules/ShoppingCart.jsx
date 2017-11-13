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
        return ({personId: personId, data:null,current:null});
    },
    dateFormat:function (date) {//object时间转时间格式"yyyy-mm-dd hh:mm:ss"
        return (new Date(date)).toLocaleDateString() + " " + (new Date(date)).toLocaleTimeString();
    },
    getShoppingCart:function () {
        var url = "/func/allow/getShoppingCartByPersonId";
        var param={
            personId:this.state.personId
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
    initialData:function(){

        this.getShoppingCart();

    },
    render: function () {
        var contains = null;
        if(this.state.data!==null&&this.state.data!==undefined) {
            var data = this.paginationData(this.state.data, this.state.pageIndex);
            var len = this.state.data.length;
            var trs = [];
            var ref=this;
            data.map(function (item, i) {
                trs.push(
                    <div className="product-right-grids" key={i}>
                        {item.name}
                    </div>
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
                            <div className="col-md-8 product-left">
                                    <h1 style={{textAlign:'center',fontSize:'20px',color: '#434d59'}}>我的购物车 &nbsp; </h1>
                                {trs}
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
                            </div>
                            <RightSlide/>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>


        return contains


    }

});
module.exports = ShoppingCart;