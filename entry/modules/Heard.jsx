import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
var Heard = React.createClass({


    getInitialState: function () {
        $(window).load(function(){
            $('.flexslider').flexslider({
                animation: "slide",
                start: function(slider){
                    $('body').removeClass('loading');
                }
            });
            $( "span.menu" ).click(function() {
                $( "ul.nav1" ).slideToggle( 300, function() {
                    // Animation complete.
                });
            });

        });

        return ({

        });
    },


    render:function() {
        var contains = null;
        contains =
            <div className="header">
                <div className="container">
                    <div className="header-grids">
                        <div className="logo">
                            <h1><a  href="#">Badminton<span className="logo_span">Hot</span></a></h1>
                        </div>
                        <div className="header-dropdown">
                            <div className="emergency-grid">
                                <ul>
                                    <li>联系电话 : </li>
                                    <li className="call">+1 234 567 8901</li>
                                </ul>
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                    <div className="nav-top">
                        <div className="top-nav">
                            <span className="menu"><img src="images/menu.png" alt="" /></span>
                            <ul className="nav1">
                                <li className="active"><a href="#">首页</a></li>
                                <li><a href="#">咨询</a></li>
                                <li><a href="#">活动</a></li>
                                <li><a href="#">视频</a></li>
                                <li><a href="#">群圈</a></li>
                                <li><a href="#">TEST</a></li>
                                <li><a href="#">TEST</a></li>
                                <li><a href="#">TEST</a></li>
                            </ul>
                            <div className="clearfix"> </div>
                        </div>
                        <div className="dropdown-grids">
                            <div id="loginContainer"><a href="#" id="loginButton"><span>登录</span></a>
                                <div id="loginBox">
                                    <form id="loginForm">
                                        <div className="login-grids">
                                            <div className="login-grid-left">
                                                <fieldset id="body">
                                                    <fieldset>
                                                        <label for="email">Email Address</label>
                                                        <input type="text" name="email" id="email"/>
                                                    </fieldset>
                                                    <fieldset>
                                                        <label for="password">Password</label>
                                                        <input type="password" name="password" id="password"/>
                                                    </fieldset>
                                                    <input type="submit" id="login" value="Sign in"/>
                                                    <label for="checkbox">
                                                        <input type="checkbox" id="checkbox"/>
                                                        <i>Remember me</i>
                                                    </label>
                                                </fieldset>
                                                <span><a href="#">Forgot your password?</a></span>
                                                <div className="or-grid">
                                                    <p>OR</p>
                                                </div>
                                                <div className="social-sits">
                                                    <div className="facebook-button">
                                                        <a href="#">Connect with Facebook</a>
                                                    </div>
                                                    <div className="chrome-button">
                                                        <a href="#">Connect with Google</a>
                                                    </div>
                                                    <div className="button-bottom">
                                                        <p>New account? <a href="signup.html">Signup</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                </div>
        </div>;
        return contains;
    }
});
module.exports = Heard;