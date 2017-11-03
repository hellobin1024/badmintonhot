import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import QnyVideo from '../../components/basic/QnyVideo.jsx'
import { connect } from 'react-redux';
import Calendar from './components/Calendar.jsx';

import RightSlide from './components/RightSilde'
var Proxy = require('../../components/proxy/ProxyQ');

var VideoPlay = React.createClass({

    tabChange:function(tab,Id){
        this.setState({current:tab});
        this.setState({Id:Id});
    },
    initialData:function(){
        var url="/func/allow/getvideobyid";
        var params={
            id:this.state.id,
        };
        Proxy.query(
            'post',
            url,
            params,
            null,
            function(ob) {
                var data=ob;
                this.setState({data:data});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },

    getInitialState: function () {
        var id=null;
        if(this.props.id!==undefined && this.props.id){
            id = this.props.id;
        }
        return ({ id:id,data:null});
    },

    render:function(){
        var mainContent = null;
        var data = this.state.data;
        var video = [];
        if(data!==undefined && data!==null){


            video.push(
                <QnyVideo option={{
                        width:'600px',
                        height:'400px',
                        url:'http://114.215.99.2:8880/video/test.mp4',
                        type:'mp4',
                        poster:'/badmintonhot/video/testpic.png'
                    }}/>
            );

            mainContent=
                <div className="banner-bottom">
                    <div className="container">
                        <div className="faqs-top-grids">
                            <div className="product-grids">
                                <div className="col-md-8 news_content">
                                {video}
                                </div>
                                <RightSlide/>
                            </div>
                        </div>
                    </div>
                </div>

        }else{

            this.initialData();
        }

        return mainContent;
    },
});

const mapStateToProps = (state, ownProps) => {
    const props = {
        token: state.userInfo.accessToken,
    }
    return props
}
export default connect(mapStateToProps)(VideoPlay);


