import React from 'react';
import {render} from 'react-dom';
import '../../../build/css/JFFormStyle-1.css'
import '../../../build/css/jquery-ui.css'
import '../../../build/css/style.css'
var Foot = React.createClass({


    getInitialState: function () {
        var a=3;

        return ({});
    },


    render:function() {
        var contains = null;
        contains =
            <div className="footer-bottom-grids">
                <div className="container">
                    <div className="footer-bottom-top-grids">
                        <div className="col-md-4 footer-bottom-left">
                            <h4>APP下载</h4>
                            <div className="d-apps">
                                <ul>
                                    <li><a href="#"><img src={window.App.getResourceDeployPrefix()+"/images/app23.png"} alt="" /></a></li>
                                    <li><a href="#"><img src={window.App.getResourceDeployPrefix()+"/images/app3.png"} alt="" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 footer-bottom-left">
                            <h4>We Accept</h4>
                            <div className="a-cards">
                                <ul>
                                    <li><a href="#"><img src={window.App.getResourceDeployPrefix()+"/images/c1.png"} alt="" /></a></li>
                                    <li><a href="#"><img src={window.App.getResourceDeployPrefix()+"/images/c2.png"} alt="" /></a></li>
                                    <li><a href="#"><img src={window.App.getResourceDeployPrefix()+"/images/c3.png"} alt="" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 footer-bottom-left">
                            <h4>Follow Us</h4>
                            <div className="social">
                                <ul>
                                    <li><a href="#" className="facebook"> </a></li>
                                    <li><a href="#" className="facebook twitter"> </a></li>
                                    <li><a href="#" className="facebook chrome"> </a></li>
                                    <li><a href="#" className="facebook dribbble"> </a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="clearfix"> </div>
                        <div className="copyright">
                            <p>Copyright &copy; 2015.Company name All rights reserved.
                                <a target="_blank" href="http://www.cssmoban.com/">&#x7F51;&#x9875;&#x6A21;&#x677F;</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        return contains;
    }
});
module.exports = Foot;