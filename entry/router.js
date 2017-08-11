/**
 * Created by outstudio on 16/5/6.
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory,browserHistory, IndexRoute } from 'react-router';
import App from './modules/components/App.jsx';
import Login from './modules/components/Login';
import MainSection from './modules/components/MainSection.jsx';
import MainPage from './modules/components/MainPage';
import PersonInfo from './modules/PersonInfo.jsx';
import AD from './adModel/adPage'
import AdText from './adModel/adText'
import Order from './modules/Order'
import {Component} from 'react'

class AppRouter extends Component {
    render() {

        return (
            <Router history={hashHistory}>
                <Route path={window.App.getAppRoute()} component={App}>
                    <IndexRoute  component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/login"} component={Login}/>
                    <Route path={window.App.getAppRoute() + "/main"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/events"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/newsContain"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/news"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/class"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/ad"} component={AD}/>
                    <Route path={window.App.getAppRoute() + "/adText"} component={AdText}/>
                    <Route path={window.App.getAppRoute() + "/order"} component={Order}/>
                    <Route path={window.App.getAppRoute() + "/personInfo"} component={PersonInfo}/>
                    <Route path={window.App.getAppRoute() + "/trainerIntroduce"} component={MainSection}/>
                </Route>
            </Router>
        )
    }
}

export default AppRouter