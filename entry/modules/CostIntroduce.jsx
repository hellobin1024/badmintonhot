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
var CostIntroduce = React.createClass({
    paginationData:function (data,pageIndex) {
        let capacity=data.length;
        var slices=null;
        Page.getInitialDataIndex(4,capacity,pageIndex,function(ob){
                slices=data.slice(ob.begin,ob.end);
            }
        );
        return slices;
    },

    getInitialState: function () {
        return ({
            pageIndex: 0,
            isChange: false,
        });
    },

    render:function() {
        var contains = null;
        contains =
            <div className="banner-bottom">
                <div className="container">
                    <div className="faqs-top-grids">
                        <div className="product-grids">
                            <h1 style={{marginLeft:'35px',fontSize:'21px',color:'#303030'}}>收费标准</h1>
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
module.exports = CostIntroduce;
