import React from 'react';
import Footer from './Footer.jsx';
import {Link} from 'react-router';
import Nav from '../../components/basic/Nav.jsx';
import MENU from '../../data/menus.json';
import { connect } from 'react-redux';

var ProxyQ=require('../../components/proxy/ProxyQ.js');
var SyncStore = require('../../components/flux/stores/SyncStore');
var UserActions=require('../action/UserActions');
import '../../css/entry/modules/login.css'

var Login =React.createClass({

    login:function(){


        this.props.dispatch(UserActions.loginAction());


    },

    banner:function () {
            $(".bannerBtn li").each(function(index,element){
                $(this).on("mouseover",function(){
                    clearInterval(timer);
                    $(this).addClass("active").siblings().removeClass("active");
                    $("#silder_list li").eq(index).stop().animate({"opacity":"1"},2000).siblings().css({"opacity":"0"});
                });
                $(this).on("mouseout",function(){
                    autoplay();
                })
            });
            var timer = "";
            var _index = 0;
            function autoplay(){
                timer = setInterval(function(){
                    _index ++;
                    if(_index > 3){
                        _index = 0;
                    }
                    $(".bannerBtn li").eq(_index).addClass("active").siblings().removeClass("active");
                    $("#silder_list li").eq(_index).stop().animate({"opacity":"1"},1000).siblings().css({"opacity":"0"});
                },5000);
            }
            autoplay();
    },

    render:function(){
        const { login } = this.props
        return (
            <div>
                <Nav logo={"/images/school_logo.png"} data={MENU} isLogin={true}/>

                <div className="topbg"></div>
                <div className="banner" style={{overflow:'hidden'}} onload={this.banner()}>
                    <ul className="silder_list clearfix" id="silder_list" style={{width:'100%',height:'418px'}}>
                        <li className="silder_div_img" id="img0" style={{opacity: '0', background: 'url(/images/back1.png) 50% 50% no-repeat'}}></li>
                        <li className="silder_div_img" id="img1" style={{opacity: '0', background: 'url(/images/back2.png) 50% 50% no-repeat'}}></li>
                        <li className="silder_div_img" id="img2" style={{opacity: '1', background: 'url(/images/back3.png) 50% 50% no-repeat'}}></li>
                    </ul>
                    <ol className="bannerBtn">
                        <li className="active"></li>
                        <li></li>
                        <li></li>
                    </ol>
                    <div style={{width:'960px',height:'418px',position:'absolute',top:'0',left:'50%',marginLeft:'-480px',zIndex:'2'}}>
                        <div className="login_w" style={{width: '960px',height: '400px',position:'absolute',right:'0px',top:'50%',marginTop:'-210px'}}>

                            <input type="hidden" id="error"  />
                            <form name="form" id="form" >
                                <div className="login_div">
                                    <table className="div_tab" id="Wrap_searchbar">
                                        <tbody>
                                        <tr >
                                            <td>
                                                <div className="lgn_txt">登录研究生信息管理系统</div>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td>
                                                <div className="ipt_cn ">
                                                    <span id="strLoginName_SHOW" className="holderClass"></span>
                                                    <input className="Wrap_input_search"  id="login_strLoginName" name="login_strLoginName" tabIndex="1" placeholder="用户名" autoComplete="off" />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td id="passWord_tr">
                                                <div className="ipt_pwd">
                                                    <span id="strPassword_SHOW" className="holderClass"></span>
                                                    <input className="Wrap_input_search" type="password" id="login_strPassword" name="login_strPassword" tabIndex="2" placeholder="密码" autoComplete="off" />
                                                </div>
                                            </td>
                                        </tr>

                                        <tr >
                                            <td>
                                                <table id="tableVerify">
                                                <tbody>
                                                    <tr >
                                                        <td><span className="info" align='right'>验证码:  &nbsp;</span></td>
                                                        <td><input type="text" name="login_strVerify" id="login_strVerify"  /></td>
                                                        <td><img id="validateImage"  /></td>
                                                        <td ><a href="#" >换一张</a></td>
                                                    </tr>
                                                </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        <tr >
                                            <td>
                                                <Link to={window.App.getAppRoute() + "/app"}>
                                                    <button className="login-btn" onClick={this.login}>登录</button>
                                                </Link>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="tourist_txt2">
                                        <div className="tourist_txt" >
                                            <input type="checkbox" name="login_autoLoginCheckbox" value = '1' id="ALIASCHECK" />
                                            <span>记住密码</span>
                                        </div>
                                        <a  className="tourist_txt_rht">忘记密码</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        )
    }
});
export default connect()(Login);
// export default Login;