import React from 'react';
import {render} from 'react-dom';
import '../../css/entry/modules/home.css';
import '../../css/entry/modules/app.css';
var SyncStore = require('../../components/flux/stores/SyncStore');
var ProxyQ=require('../../components/proxy/ProxyQ');
var App =React.createClass({

    render:function(){

     return (
         <div className="total" style={{minHeight:"650px",marginTop:"0px",paddingBottom:"30px"}} >
             {this.props.children}
         </div>
     )}
});
export default App;