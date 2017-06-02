import React from 'react';
import {render} from 'react-dom';

var config=require('../../config.json');
import '../../css/entry/modules/mainSection.css';
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
                case App.getAppRoute() + "/app":
                    ctrl =
                        <div>qqq</div>
                    break;
                case App.getAppRoute() + "/englishApply":
                    ctrl = <iframe style={{width:"100%",position:"relative"}} id="mainFrame"
                            frameBorder="0" scrolling="no" src={"/englishApply"} onLoad={this.iframeLoad}
                    />
                    break;
                case App.getAppRoute() + "/news":
                    //ctrl = <News query={{
                    //                         url:"/bsuims/reactPageDataRequest.do",
                    //                        params:{
                    //                            reactPageName:"groupNewsReactPage",
                    //                            reactActionName:"listTypeNewsUseReact"
                    //                        }
                    //                     }}
                    //             auto={true}/>;
                    label = "新闻查询业务";
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

        //remove breadcrumb by zyy,yeah i am so native



        return (
            <div style={{margin: "0px auto 0 auto",paddingBottom:"200px",width:"100%"}} className="baba">
                <div ref="mainSection" className="mainSection"
                     style={{display:"none",width:"1024px",marginLeft:"auto",marginRight:"auto"}}>

                    {ctrl}
                </div>
            </div>
        );


    },
    componentDidMount: function() {
        //TodoStore.addChangeListener(this._onChange);
        $(this.refs["mainSection"]).slideDown(300);
    },
    componentWillUnmount: function() {
        //TODO:emit change
        $(this.refs["mainSection"]).slideUp(300);
        //TodoStore.removeChangeListener(this._onChange);
    }
});
module.exports = MainSection;