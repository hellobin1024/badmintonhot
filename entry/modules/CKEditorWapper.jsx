/**
 * Created by dellbin on 2017/6/5.
 */
import React from 'react';
import {render} from 'react-dom';
import CKEditor from './CKEditor.jsx';
var ProxyQ = require('../../components/proxy/ProxyQ');

var CkEdit = React.createClass({

    getInitialState: function () {
        return ({content: 'content'});
    },

    updateContent:function(value) {
        this.setState({content:value})
    },

    onChange:function(value) {
        this.setState({content:value})
    },

    submit:function(){
        var content = this.state.content;
        var url="/func/auth/news_submit";

        content=content.replace("&amp;","&") //把被转义的字符替换回来
        content=content.replace("&lt;","<")
        console.log(content);
        alert(content);
        var params = {
            'editContent' :content
        };

        ProxyQ.queryHandle({
            type:'POST',
            url:url,
            params:JSON.stringify(params),
            dataType:null
        }).then((json)=> {
            var reCode = json.reCode;
            console.log(reCode);
        }).then((json)=>{

        }).catch((err)=> {
            console.error(this.props.url, status, err.toString());
        });
    },

    render:function() {
        return (
            <div style={{margin:'100px 100px 200px 100px'}}>
                <CKEditor value={this.props.value} onChange={this.onChange}/>

                <div>
                    <button onClick={this.submit} style={{marginLeft:'48%'}}>提交</button>
                </div>
            </div>
        );
    }
});
module.exports = CkEdit;