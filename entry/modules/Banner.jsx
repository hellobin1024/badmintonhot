import React, { Component } from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'

var Banner=React.createClass({

    componentDidMount: function () {
            $('.flexslider').flexslider({
                animation: "slide",
                start: function (slider) {
                    $('body').removeClass('loading');
                }
            });
    },

    render: function () {
        var contains = null;
        contains =

                    <div className="flexslider" directionNav={false}>
                        <ul className="slides">
                            <li>
                                <img src="/images/test.jpg" alt=""/>
                            </li>
                            <li>
                                <img src="/images/test1.jpg" alt=""/>
                            </li>
                            <li>
                                <img src="/images/test2.jpg" alt=""/>
                            </li>
                        </ul>
                    </div>

        return contains;
    }
});
module.exports = Banner;
