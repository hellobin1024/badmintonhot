import React from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import RightSlide from './components/RightSilde'
var Proxy = require('../../components/proxy/ProxyQ');
import PageNavigator from '../../components/basic/PageNavigator.jsx';
var Tips = require('../../components/basic/Tips');
var Page = require('../../components/basic/Page');
var Mall = React.createClass({
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
    previousCb:function (index,isChange) { //向前跳页
        this.setState({pageIndex:index,isChange:isChange});
    },

    pageCb:function(index,isChange) { //进入指定页的列表
        this.setState({pageIndex:index,isChange:isChange});
    },
    nextCb:function(index,isChange){ //向后跳页,isChange为true
        this.setState({pageIndex:index,isChange:isChange});
    },
    getInitialState:function () {
        var personId=null;
        if(this.props.personId!==undefined && this.props.personId){
            personId = this.props.personId;
        }
        return (
        {
            personId: personId,
            pageIndex: 0,
            isChange: false,
        });
    },
    dateFormat:function (date) {//object时间转时间格式"yyyy-mm-dd hh:mm:ss"
        return (new Date(date)).toLocaleDateString() + " " + (new Date(date)).toLocaleTimeString();
    },
    getGoodsList:function () {
        var url = "/func/allow/getGoodsList";
        var ref = this;
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
    initialData:function(){

        this.getGoodsList();

    },

    addShoppingCart:function(item){

    if(this.props.token!=null){

        var mallShop = this.refs['mallShop'];
        var number = $(mallShop).find("input[name='number']").val();
        if(number==""){
            number=1;
        }
        if(number>item.inventoryNumber){
            Tips.showTips("库存不足~");
            return;
        }
        var url = "/func/allow/addMallShopCart";
        var ref = this;
        var param={

            goodsId:item.id,
            number:parseInt(number),
        }
        Proxy.query(
            'POST',
            url,
            param,
            null,
            function (res) {
                var reCode = res.re;
                if(reCode!==undefined && reCode!==null && (reCode ==-1 || reCode =="-1")) { //操作失败
                    alert("购买失败");
                    return;
                }
                var a=ref.state.data;
                for(var i=0;i<a.length;i++){

                    if(a[i].id=item.id){
                        var b=a[i].inventoryNumber;
                        var c=b-number;
                        a[i].inventoryNumber=c;
                        break;
                    }
                }
                ref.setState({data:a});
                alert("加入购物车成功");
            },

            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        );
        }else{
            Tips.showTips("请登录~");
        }

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
                    <div className="product-right-grids" key={i} ref="mallShop"  >
                        <div className="product-right-top">
                            <div className="p-left">
                                <div className="p-right-img">
                                    <a style={{background:'url('+item.img+') no-repeat 0px 0px',backgroundSize: 'cover'}}></a>
                                </div>
                            </div>
                            <div className="p-right"  >
                                <div className="col-md-12 p-right-left"  style={{paddingLeft: '30px'}}>
                                        {item.name}
                                    <div className="newsContain">
                                        <span >价格：{item.price + '  '}</span>
                                        <span >销量：{item.salesVolume + '  '}</span>
                                        <span >库存：{item.inventoryNumber + '  '}</span>
                                    </div>
                                    <p>{item.brief}</p>
                                    <br/>
                                    <span> 数量：<input type="text" size="5" title="请输入购买量" name="number" placeholder="1"/></span>
                                    <br/>
                                    <span>
                                        <span>
                                        <button style={{fontSize: '17px', color: '#129736'}} >购买</button>
                                        </span>
                                        <span> </span>
                                        <span  style={{mariginLeft:'10px'}}>
                                        <button style={{fontSize: '17px', color: '#129736'}} onClick={ref.addShoppingCart.bind(null,item)}>加入购物车</button>
                                        </span>
                                    </span>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="clearfix"></div>
                        </div>

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
                                <Link to={window.App.getAppRoute() + "/ShoppingCart"}>
                                    <h1 style={{textAlign:'right',fontSize:'20px',color: '#0c89d2'}}>我的购物车 &nbsp; </h1>
                                </Link>
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
const mapStateToProps = (state, ownProps) => {
    const props = {
        token: state.userInfo.accessToken,
    }
    return props
}
export default connect(mapStateToProps)(Mall);