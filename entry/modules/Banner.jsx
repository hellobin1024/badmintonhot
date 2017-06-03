import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
var Banner = React.createClass({


    getInitialState: function () {

        return ({});
    },


    render:function() {
        var contains = null;
        contains =
        <div>
            <section className="slider2">
                <div className="flexslider">
                    <ul className="slides">
                        <li>
                            <div className="slider-info">
                                <img src="/images/test.jpg" alt=""/>
                            </div>
                        </li>
                        <li>
                            <div className="slider-info">
                                <img src="/images/test1.jpg" alt=""/>
                            </div>
                        </li>
                        <li>
                            <div className="slider-info">
                                <img src="/images/test2.jpg" alt=""/>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
        return contains;
    }
});
module.exports = Banner;