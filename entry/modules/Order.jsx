/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom'
import Header from '../modules/Heard.jsx';
var ProxyQ = require('../../components/proxy/ProxyQ')

var Order = React.createClass({

    render:function(){
        var mainContent = null;
        var path=this.props.route.path;


        mainContent=
            <div>
                <Header path={path}/>

                <div id="pjax-container" className="person-container clearfix" style={{paddingTop: '25px'}}>
                    dddd
                </div>
            </div>



        return mainContent

    },
});

module.exports=Order;