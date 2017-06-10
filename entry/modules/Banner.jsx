import React, { Component } from 'react';
import {render} from 'react-dom';
var Banner=React.createClass({

    componentDidMount: function () {
            $('.flexslider').flexslider({
                animation: "slide",
                directionNav: false,
                pauseOnAction: false,
                start: function (slider) {
                    $('body').removeClass('loading');
                }
            });



    },

    render: function () {
        var contains = null;
        contains =
                    <div className="flexslider" >
                        <ul className="slides">
                          <li>
                            <img src="images/test.jpg"/>
                        </li>
                            <li>
                                <img src="images/test1.jpg"/>
                            </li>
                            <li>
                                <img src="images/test2.jpg"/>
                            </li>
                        </ul>
                    </div>

        return contains;
    }
});
module.exports = Banner;
