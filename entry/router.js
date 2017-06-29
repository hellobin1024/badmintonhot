/**
 * Created by outstudio on 16/5/6.
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory,browserHistory, IndexRoute } from 'react-router';
import App from './modules/App.jsx';
import Login from './modules/Login';
import MainSection from './modules/MainSection.jsx';
import ckEditor from './modules/CKEditorWapper.jsx';
import MainPage from './modules/MainPage';
import PersonInfo from './modules/PersonInfo.jsx'
import AD from './adModel/adPage'
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
                    <Route path={window.App.getAppRoute() + "/ckedit"} component={ckEditor}/>
                    <Route path={window.App.getAppRoute() + "/events"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/newsContain"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/news"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/training"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/ad"} component={AD}/>

                    <Route path={window.App.getAppRoute() + "/personInfo"} component={PersonInfo}/>
                </Route>
            </Router>
        )
    }
}

export default AppRouter