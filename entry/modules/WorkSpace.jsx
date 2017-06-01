import React from 'react';
import {render} from 'react-dom';
import '../../css/entry/modules/mainSection.css';
import Brief from './Brief.jsx';
import Footer from './Footer.jsx';
import Nav from '../../components/basic/Nav.jsx';
import ScaleBar from '../../components/basic/ScaleBar.jsx';
import MENU from '../../data/menus.json';
import Scales from '../../data/scaleBar.json';
import Scrolls from '../../data/scrolls.json';
import StudentStatusInfo from '../../entry/modules/test'
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var ProxyQ=require('../../components/proxy/ProxyQ.js');
var SyncStore = require('../../components/flux/stores/SyncStore');

var WorkSpace =React.createClass({


    iframeLoad:function(evt)
        {
            var target=evt.target;
            //$("#mainFrame").context.documentElement.scrollHeight
            var height=null;
            height=target.contentDocument.body.scrollHeight;
            target.height=height;
            //height=document.body.scrollHeight;

        },
    fetch:function(){
        ProxyQ.query({
            headers:{
                "Authorization":"Bearer "+SyncStore.getToken(),
            },
            url:"/node/menue",
            data:{
                request:"getTopMenue"
            },

        }).then(function(json){

            this.setState({menueData:json})
            alert(a);
        }).catch(function(e){
            alert(e);
        })
    },

    getInitialState:function(){
        return ({menueData:null})
    },

    render :function(){
        var path=this.props.path==undefined?this.props.route.path:this.props.path;

        var ctrl;

        switch (path) {
            case App.getAppRoute() + "/app":
                ctrl =
                    <LetterOfCommitment/>

                break;
            case App.getAppRoute() + "/workspaceEnglishApply":
                ctrl =
                    <iframe style={{width:"100%",position:"relative"}} id="mainFrame"
                            frameBorder="0" scrolling="no" src={"/englishApply"} onLoad={this.iframeLoad}
                                     />
                break;
            case App.getAppRoute() + "/greenChannelApply":
                ctrl =
                    <GreenChannelApply/>
                break;
            case App.getAppRoute() + "/workspaceStudentStatusInfo":
                ctrl =
                    <StudentStatusInfo/>
                break;
            case App.getAppRoute() + "/englishApply":
                ctrl =
                    <EnglishApply/>
                break;
            case App.getAppRoute() + "/tripPlan":
                ctrl =
                    <TripPlan/>
                break;
            case App.getAppRoute() + "/anamnesis":
                ctrl =
                    <Anamnesis/>
                break;
            default:
                break;
        }

        if(this.state.menueData==undefined || this.state.menueData== null){
            this.fetch();
            return(<div></div>)
        }else{
            return (
                <div>
                    <Nav logo={Deploy.getResourceDeployPrefix()+"/"+"images/school_logo.png"} data={this.state.menueData}/>

                    <div className="topbg"></div>

                    <div className="keyNavigation">
                        <div className="top">
                            <div className="block">
                                <Brief data={['欢迎登陆山东大学数字迎新系统，请仔细阅读报道须知和各类通知,','并尽快选择下面的功能按要求完善相关信息和业务申请.']}/>
                            </div>
                        </div>
                        <div className="bottom">
                            <CommonFunction auto={true} />
                        </div>
                    </div>
                    <div style={{margin: "0px auto 0 auto",paddingBottom:"200px",width:"100%"}} className="baba">
                        <div ref="mainSection" className="mainSection"
                             style={{width:"1024px",marginLeft:"auto",marginRight:"auto"}}>

                            {ctrl}
                        </div>
                    </div>
                    <ScaleBar data={Scales}/>
                    <Footer/>
                </div>

            );
        }


    },

});
module.exports=WorkSpace;