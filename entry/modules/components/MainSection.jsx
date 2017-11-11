import React from 'react';
import {render} from 'react-dom';

var config=require('../../../config.json');
import '../../../css/entry/modules/mainSection.css';
import News from '../../../entry/modules/News'
import Heard from '../components/Heard'
import Banner from '../components/Banner'
import Foot from '../components/Foot'
import Events from '../../modules/Events'
import TrainerIntroduce from '../../modules/TrainerIntroduce.jsx';
import CostIntroduce from '../../modules/CostIntroduce.jsx';
import Competieion from '../Competieion.jsx';
import ShowProject from '../../modules/ShowProject.jsx';
import VideoList from '../VideoList.jsx';
import Main from './MainPage'
import Class from '../Class'
import Mall from '../Mall'
import ShoppingCart from '../ShoppingCart'
import NewsContain from '../../modules/NewsContain'
import Login from '../components/Login';
import VenueIntro from '../../modules/VenueIntro'
import VenueDetail from '../../modules/VenueDetail'
import '../../../build/css/JFFormStyle-1.css'
import '../../../build/css/jquery-ui.css'
import '../../../build/css/style.css'
var SyncActions = require('../../../components/flux/actions/SyncActions');


var MainSection = React.createClass({
    iframeLoad:function(evt)
    {
        var target=evt.target;
        //$("#mainFrame").context.documentElement.scrollHeight
        var height=null;
        height=target.contentDocument.body.scrollHeight;
        target.height=height;
        //height=document.body.scrollHeight;
    },
    getInitialState: function () {
        var route = new Array();
        route.push(undefined);
        return ({route: route});
    },

    render:function(){
        var path=this.props.route.path;
        var ctrl;
        var breadcrumb;
        var label;
        var data=this.props.route.data;
        var contains=null;
        if(path!==undefined&&path!==null)
        {
            var route = this.state.route;
            if (route.length != 1)
                route.splice(0, 1);
            route.push(path);
            switch(path)
            {
                case App.getAppRoute() + "/":
                    ctrl =<Main/>
                    break;
                case App.getAppRoute() + "/news":
                    ctrl =<News/>
                    break;
                case App.getAppRoute() + "/events":
                    ctrl =<Events/>
                    break;
                case App.getAppRoute() + "/main":
                    ctrl =<Main/>
                    break;
                case App.getAppRoute() + "/newsContain":
                    ctrl =<NewsContain/>
                    break;
                case App.getAppRoute() + "/class":
                    ctrl =<Class/>
                    break;
                case App.getAppRoute() + "/trainerIntroduce":
                    ctrl =<TrainerIntroduce/>
                    break;
                case App.getAppRoute() + "/CostIntroduce":
                    ctrl =<CostIntroduce/>
                    break;
                case App.getAppRoute() + "/venueIntro":
                    ctrl =<VenueIntro/>
                    break;
                case App.getAppRoute() + "/competition":
                    ctrl =<Competieion/>
                    break;
                case App.getAppRoute() + "/ShowProject":
                    ctrl =<ShowProject/>
                    break;
                case App.getAppRoute() + "/videolist":
                    ctrl =<VideoList/>
                    break;
                case App.getAppRoute() + "/mall":
                    ctrl =<Mall/>
                    break;
                case App.getAppRoute() + "/ShoppingCart":
                    ctrl =<ShoppingCart/>
                    break;
                default:
                    break;
            }


        }else{
            ctrl = <Main/>
            path = '/main'
        }
        contains =

            <div>
                <Heard path={path}/>

                <Banner/>

                <div className="clearfix"> </div>


                <div className="move-text">
                    <div className="marquee">欢迎来到"羽毛球热"</div>
                </div>

                <div style={{margin: "0px auto 0 auto",width:"100%"}} className="baba">
                    <div ref="mainSection" className="mainSection"
                         style={{display:"none",marginLeft:"auto",marginRight:"auto"}}>

                        {ctrl}
                    </div>
                </div>
                <Foot/>
            </div>


        //remove breadcrumb by zyy,yeah i am so native

        return contains;

    },
    componentDidMount: function() {
        //TodoStore.addChangeListener(this._onChange);
        $(this.refs["mainSection"]).slideDown(300);
        $('.marquee').marquee({ pauseOnHover: true });
    },
    componentWillUnmount: function() {
        //TODO:emit change
        $(this.refs["mainSection"]).slideUp(300);
        //TodoStore.removeChangeListener(this._onChange);
    }
});
module.exports = MainSection;