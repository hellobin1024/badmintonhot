import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import {Link} from 'react-router';
var Heard = React.createClass({

    getInitialState: function () {
        var path=this.props.path;
        return({router:path})
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
                                <li ref="main">
                                    <Link to={window.App.getAppRoute() + "/main"}>
                                        首页
                                    </Link>
                                </li>
                                <li ref="news">
                                    <Link to={window.App.getAppRoute() + "/news"}>
                                        资讯
                                    </Link>
                                </li>
                                <li ref="events">
                                    <Link to={window.App.getAppRoute() + "/events"}>
                                        活动
                                    </Link>
                                </li>
                                <li ref="video"><a href="#">视频</a></li>
                                <li ref="group"><a href="#">直播</a></li>
                                <li ref="group"><a href="#">商城</a></li>
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
                                                        <label for="email">登录名</label>
                                                        <input type="text" name="email" id="email"/>
                                                    </fieldset>
                                                    <fieldset>
                                                        <label for="password">密码</label>
                                                        <input type="password" name="password" id="password"/>
                                                    </fieldset>
                                                    <input type="submit" id="login" value="登录"/>
                                                    <label for="checkbox">
                                                        <input type="checkbox" id="checkbox"/>
                                                        <span style={{float:'left',padding:'5px'}}>记住密码</span>
                                                    </label>
                                                </fieldset>
                                                <span><a href="#">忘记密码?</a></span>
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
                                                        <i>新人报道? </i><a href="#">注册</a>
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
    },
    componentDidMount(){
        $( "span.menu" ).click(function() {
            $("ul.nav1").slideToggle(300, function () {
                // Animation complete.

            });
        });
        //顶部tab高亮与路由同步
        $("ul.nav1").click(function (e) {
            $("ul.nav1 li").each(function () {
                $(this).attr('class','')
            })
            $(e.target.parentNode).attr('class', 'active');
        });
        var element=this.state.router;
        var a=element.substring(1,element.length);
        switch (a){
            case 'newsContain':
                a = 'news';
                break
            default:
                break
        }
        $(this.refs[a]).attr("class","active")

        $("#loginButton").click(function() {
            var button = $('#loginButton');
            var box = $('#loginBox');
            var form = $('#loginForm');
            button.removeAttr('href');
            button.mouseup(function(login) {
                box.toggle();
                button.toggleClass('active');
            });
            form.mouseup(function() {
                return false;
            });
            $(this).mouseup(function(login) {
                if(!($(login.target).parent('#loginButton').length > 0)) {
                    button.removeClass('active');
                    box.hide();
                }
            });
        });
    }
});
module.exports = Heard;