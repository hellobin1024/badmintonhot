import React from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import '../../build/css/style.css'
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import RightSlide from './components/RightSilde'
import {Link} from 'react-router';
var Proxy = require('../../components/proxy/ProxyQ');
import PageNavigator from '../../components/basic/PageNavigator.jsx';
var Page = require('../../components/basic/Page');
var TrainIntroduce = React.createClass({
    paginationData:function (data,pageIndex) {
        let capacity=data.length;
        var slices=null;
        Page.getInitialDataIndex(4,capacity,pageIndex,function(ob){
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

    getInitialState: function () {
        return ({
            pageIndex: 0,
            isChange: false,
        });
    },
    initialData:function(){

        this.getAllTrainerIntroduce();

    },
    closeModal:function () {
        var successModal = this.refs['successModal'];
        $(successModal).modal('hide');
    },

    getAllTrainerIntroduce:function () {
        var url = "/func/allow/getAllTrainerIntroduce";
        var ref = this;
        var params={};
        Proxy.query(
            'post',
            url,
            params,
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

    render:function() {
        var contains = null;
        if(this.state.data!==null&&this.state.data!==undefined) {
            var data = this.paginationData(this.state.data, this.state.pageIndex);
            var len = this.state.data.length;
            var trs = [];
            var ref=this;

            data.map(function (item, i) {
                trs.push(
                    <div key={i}>
                        <div className="news_content_body clearfix"  style={{marginLeft:'10px',marginTop:'30px',float:'left',fontSize:'10px'}}>
                            <p>
                                  <img src={item.img}
                                     alt="" data-key="0" className="image-click" style={{paddingRight:'20px', width:'200px', height: '230px' }}/>


                            </p>
                            <p>
                                姓名: {item.name}
                            </p>
                            <p>
                                运动水平: {item.SportLevel}
                            </p>
                            <p>
                                教练水平: {item.CoachLevel}
                            </p>
                        </div>
                        <div  style={{float:'left',width:'50%',color:'#303030',fontSize:'14px',marginTop:'21px'}}>
                            <p>
                                {item.brief}
                            </p>
                        </div>
                        <div className="clearfix"/>
                    </div>



                )})

        }else{
            this.initialData();
        }

        contains =
            <div className="banner-bottom">
                <div className="container">
                    <div className="faqs-top-grids">
                        <div className="product-grids">
                            <h1 style={{marginLeft:'35px',fontSize:'21px',color:'#303030'}}>乒乓球教练一览</h1>
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
                    </div>

                </div>

            </div>
        return contains

    }

});
module.exports = TrainIntroduce;
