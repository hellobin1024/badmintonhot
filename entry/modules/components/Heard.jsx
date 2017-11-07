import React from 'react';
import {render} from 'react-dom';
import '../../../build/css/JFFormStyle-1.css';
import '../../../build/css/jquery-ui.css';
import '../../../build/css/style.css';
import {Link} from 'react-router';
import { connect } from 'react-redux';
var UserActions=require('../../action/UserActions');

var ProxyQ = require('../../../components/proxy/ProxyQ');
var Heard = React.createClass({

    exit:function () {
        this.props.dispatch(UserActions.logoutAction());
    },

    getInitialState: function () {
        var path=this.props.path;
        var token = this.props.token;
        var loginName= this.props.loginName;
        var personId=this.props.personId;
        var loginState = false;
        if(token=='1' || token==1){ //先从flux获取登录状态
            var loginState = true;
        }

        if(loginState==false){ // 刷新时如果flux中登录状态丢失，从后台获取
            this.props.dispatch(UserActions.loginStateAction(path));
        }

        return({router:path, loginState:loginState, userName:loginName, personId:personId})
    },

    componentWillReceiveProps: function (props) {
        var path=props.path;
        var token = props.token;
        var loginName= props.loginName;
        var personId=props.personId;
        var loginState = false;
        if(token=='1' || token==1){
            var loginState = true;
        }
        this.setState({router:path, loginState:loginState, userName:loginName, personId:personId})
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
                                    <li className="call">18254888887</li>
                                </ul>
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                    <div className="nav-top">
                        <div className="top-nav">
                            <span className="menu"><img src={window.App.getResourceDeployPrefix()+"/images/menu.png"} alt="" /></span>
                            <ul className="nav1">
                                <li ref="main">
                                    <Link to={window.App.getAppRoute() + "/"}>
                                        首页
                                    </Link>
                                </li>
                                <li ref="news">
                                    <Link to={window.App.getAppRoute() + "/news"}>
                                        羽坛资讯
                                    </Link>
                                </li>
                                <li ref="events">
                                    <Link to={window.App.getAppRoute() + "/events"}>
                                        活动/群圈
                                    </Link>
                                </li>
                                <li ref="class">
                                    <Link to={window.App.getAppRoute() + "/class"}>
                                        课程培训
                                    </Link>
                                </li>
                                <li ref="video">
                                    <Link to={window.App.getAppRoute() + "/videolist"}>
                                        直播/视频
                                    </Link>
                                </li>
                                <li ref="mall">
                                    <Link to={window.App.getAppRoute() + "/mall"}>
                                        商城
                                    </Link>
                                </li>
                            </ul>
                            <div className="clearfix"> </div>
                        </div>

                        {this.state.loginState ?
                            <div className="user-info">
                                <span className="user-name">
                                    <Link to={window.App.getAppRoute() + "/personInfo"}>
                                        <i className='icon-user' style={{color: 'green'}}></i>
                                        <strong style={{marginLeft:'10px'}}>{this.state.userName}</strong>
                                    </Link>
                                </span>

                                <span className="logout" onClick={this.exit}>
                                    <i className='icon-off'></i>
                                    <Link to={window.App.getAppRoute() + "/main"}></Link>
                                </span>
                            </div>
                            :
                            <div className="dropdown-grids">
                                <div id="loginContainer">
                                    <Link to={window.App.getAppRoute() + "/login"}>
                                        <span>登录</span>
                                    </Link>
                                </div>
                            </div>
                        }

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
            case '':
                a = 'main';
                break;
            case 'newsContain':
                a = 'news';
                break
            default:
                break;
        }
        $(this.refs[a]).attr("class","active");

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

const mapStateToProps = (state, ownProps) => {
    const props = {
        token: state.userInfo.accessToken,
        loginName: state.userInfo.loginName,
        personId: state.userInfo.personId
    }
    return props
}
export default connect(mapStateToProps)(Heard);