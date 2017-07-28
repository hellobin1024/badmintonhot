import React from 'react';
import {render} from 'react-dom';
var ProxyQ=require('../../components/proxy/ProxyQ.js');
var SyncStore = require('../../components/flux/stores/SyncStore');

import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import Heard from '../modules/Heard'

import Foot from '../modules/Foot'
import ContainSpace from '../modules/ContainSpace'
var MainPage =React.createClass({

    render:function () {
        var contains=null;
            contains=
                <div >
                    <ContainSpace/>
                </div>
            return contains;
        },
})
module.exports=MainPage;