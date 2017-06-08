/**
 * Created by outstudio on 16/5/6.
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './modules/App.jsx';
import Login from './modules/Login';
import MainSection from './modules/MainSection.jsx';
import ckEditor from './modules/CKEditorWapper.jsx';
import MainPage from './modules/MainPage'
import {Component} from 'react'

class AppRouter extends Component {
    render() {

        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={MainPage}/>
                    <Route path={window.App.getAppRoute() + "/app"} component={MainPage}/>
                    <Route path={window.App.getAppRoute() + "/ckeditor"} component={ckEditor}/>
                    <Route path={window.App.getAppRoute() + "/login"} component={Login}/>
                    <Route path={window.App.getAppRoute() + "/changePassword.jsp"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/allCourseQuery"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/news"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/groupnews/grouptypenews_list.do"}
                           component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/person/stuinfo_personBasicInfoUpdateInit.do"}
                           component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/person/stuinfo_studentAllInfo.do"}
                           component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/person/stuinfo_allRewPunInfo.do"} data={"?userType=TS"}
                           component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/photomanage/showAllPhotoesForStu.do"}
                           component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/register/register_information.do"}
                           component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/healthyInfo/healthyInfo_medical_history_add_init.do"}
                           component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/greenway/grad/student_grad_greenway_add_applyinfoInit.do"}
                           component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/exemption/exemptionEnglishApplyInit.do"}
                           data={"?inputType=1"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/healthyInfo/healthyInfo_examine_form_download.do"}
                           component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/tutor/tutor_stu_apply_tutor_init.do"}
                           component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/cultivatenew/newCultivate_SchemeShow.do"}
                           component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/newCultivateAllCourseQueryPage"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/comminfoservice/link/systemGuideLinkInfoViewInit.do"}
                           component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/cultivatenew/newCultivate_selectCourseShow.do"}
                           component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/questionnaire/student_questionnaire_init.do"}
                           component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/diminishMain"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/trafficplan/trafficPlanInit.do"} component={MainSection}/>
                    <Route path={window.App.getAppRoute() + "/register/dormitory_apply.do"} component={MainSection}/>

                </Route>
            </Router>
        )
    }
}

export default AppRouter