import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css';
import '../../build/css/jquery-ui.css';
import '../../build/css/style.css';
import {Link} from 'react-router';
import { connect } from 'react-redux';
var UserActions=require('../action/UserActions');

var ProxyQ = require('../../components/proxy/ProxyQ');
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
        if(token=='0' || token==0){ //先从flux获取登录状态
            var loginState = true;
        }

        // if(loginState==false){ // 刷新时如果flux中登录状态丢失，从后台获取
        //     this.props.dispatch(UserActions.loginStateAction(path));
        // }

        return({router:path, loginState:loginState, userName:loginName, personId:personId})
    },

    componentWillReceiveProps: function (props) {
        var path=props.path;
        var token = props.token;
        var loginName= props.loginName;
        var personId=props.personId;
        var loginState = false;
        if(token=='0' || token==0){
            var loginState = true;
        }
        this.setState({router:path, loginState:loginState, userName:loginName, personId:personId})
    },

    render:function() {

        var contains = null;
        contains =
            <div className="header">
                <div className="container">
                    supnuevo
                </div>
        </div>;
        return contains;
    },
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