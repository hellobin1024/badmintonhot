import React, { Component } from 'react';
import {render} from 'react-dom';



var Banner=React.createClass({

    componentDidMount: function () {
        $('#myCarousel').carousel({
            interval: 2000
        })
    },

    render: function () {
        var contains = null;
        contains =
            <div id="myCarousel" className="carousel slide">
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                    <li data-target="#myCarousel" data-slide-to="3"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="item active">
                        <img src={window.App.getResourceDeployPrefix()+"/images/test.jpg"} alt="First slide"/>
                    </div>
                    <div className="item">
                        <img src={window.App.getResourceDeployPrefix()+"/images/test3.jpg"} alt="Fourth slide"/>
                    </div>
                    <div className="item">
                        <img src={window.App.getResourceDeployPrefix()+"/images/test1.jpg"} alt="Second slide"/>
                    </div>
                    <div className="item">
                        <img src={window.App.getResourceDeployPrefix()+"/images/test2.jpg"} alt="Third slide"/>
                    </div>

                </div>
            </div>

        return contains;
    }
});
module.exports = Banner;
