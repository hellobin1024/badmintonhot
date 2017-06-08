import React from 'react';
import {render} from 'react-dom';

var config=require('../../config.json');
import '../../css/entry/modules/mainSection.css';
import News from '../../entry/modules/News'
import Heard from '../modules/Heard'
import Banner from '../modules/Banner'
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
var SyncActions = require('../../components/flux/actions/SyncActions');


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
        if(path!==undefined&&path!==null)
        {
            var route = this.state.route;
            if (route.length != 1)
                route.splice(0, 1);
            route.push(path);
            switch(path)
            {
                case App.getAppRoute() + "/news":
                    ctrl =<News/>
                    break;
                case App.getAppRoute() + "/newCultivateAllCourseQueryPage":
                    //ctrl = <AllCourseQuery/>;
                    label = "课程查询业务";
                    break;
                case App.getAppRoute() + "/diminishMain":
                    //ctrl = <DiminishMain/>;
                    label = "制定培养计划";
                    break;
                default:
                    break;
            }
        }

        return (
            <div>
                <Heard/>

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
            </div>

        );


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