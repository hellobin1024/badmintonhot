/**
 * Created by outstudio on 16/5/6.
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory,browserHistory, IndexRoute } from 'react-router';
import App from './modules/App.jsx';
import Login from './modules/Login';
import MainSection from './modules/MainSection.jsx';

import MainPage from './modules/MainPage';

import {Component} from 'react'

class AppRouter extends Component {
    render() {

        return (
            <Router history={hashHistory}>
                <Route path={window.App.getAppRoute()} component={App}>
                    <IndexRoute  component={Login}/>
                    <Route path={window.App.getAppRoute() + "/"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/login"} component={Login}/>
                    <Route path={window.App.getAppRoute() + "/main"} component={MainSection}/>

                </Route>
            </Router>
        )
    }
}

export default AppRouter