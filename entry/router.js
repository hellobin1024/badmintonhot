/**
 * Created by outstudio on 16/5/6.
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory,browserHistory, IndexRoute } from 'react-router';
import App from './modules/App.jsx';
import Login from './modules/Login';
import MainSection from './modules/MainSection.jsx';
import MainPage from './modules/MainPage'

import {Component} from 'react'

class AppRouter extends Component {
    render() {

        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute  component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/login"} component={Login}/>
                    <Route path={window.App.getAppRoute() + "/main"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/ckedit"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/events"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/newsContain"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/news"} component={MainSection}/>
                </Route>
            </Router>
        )
    }
}

export default AppRouter