import React from 'react';
import {render} from 'react-dom';
import '../../css/entry/modules/venueInfo.css';
import VenueInfoDetail from '../modules/VenueDetail';

var Proxy = require('../../components/proxy/ProxyQ');

var VenueIntro = React.createClass({

    getVenues:function () {
        var url = "/func/node/getMaintainedVenue";
        var param={};
        var ref = this;
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
    getInitialState:function () {

        this.getVenues();
        return ({venue:'venue'})
    },
    changePage:function (data) {
        this.setState({
            venue:'detail',
            detail:data
        })
    },
    render:function() {
        var contains = null;
        if(this.state.data!==null&&this.state.data!==undefined) {

            switch (this.state.venue){
                case 'venue':
                    var data = this.state.data;
                    var trs = [];
                    var ref = this;
                    data.map(function (item,i) {
                        trs.push( <div className="venue" key={i}>
                                <div>
                                    <img className="venue_img" src="/images/w1.jpg" onClick={ref.changePage.bind(null,item)}/>
                                </div>
                                <div>
                                    <span className="venue_name">{item.name}</span>
                                </div>

                            </div>
                        )
                    });
                    contains =
                        <div>
                            <div className="banner-bottom">
                                <div className="container">
                                    <div className="faqs-top-grids">
                                        <div className="product-grids">
                                            <h1 style={{textAlign:'center',fontSize:'25px'}}>场馆介绍</h1>
                                            <div className="venues">
                                                <div className="venue">
                                                    <div>
                                                        <img className="venue_img" src="/images/w1.jpg"/>
                                                    </div>
                                                    <div>
                                                        <span className="venue_name">name</span>
                                                    </div>

                                                </div>
                                                {trs}

                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ;
                    break;
                case 'detail':
                    contains = <VenueInfoDetail data={this.state.detail}/>;
                    break;
            }
        }

        return contains;
    },


});
module.exports = VenueIntro;