import React from 'react';
import {render} from 'react-dom';
var ProxyQ=require('../../components/proxy/ProxyQ.js');
var SyncStore = require('../../components/flux/stores/SyncStore');

import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import Heard from '../modules/Heard'
import Banner from '../modules/Banner'
import Foot from '../modules/Foot'
import ContainSpace from '../modules/ContainSpace'
var MainPage =React.createClass({

    render:function () {
        var contains=null;

            contains=
                <div >
                    <Heard/>

                    <Banner/>

                    <div className="clearfix"> </div>


                    <div className="move-text">
                        <div className="marquee">欢迎来到"羽毛球热"</div>
                    </div>

                    <ContainSpace/>

                    <Foot/>
                </div>

            return contains;

        },

    componentDidMount: function() {

        $('.flexslider').flexslider({
            animation: "slide",
            start: function(slider){
                $('body').removeClass('loading');
            }
        });
        $('.marquee').marquee({ pauseOnHover: true });
    },

})
module.exports=MainPage;