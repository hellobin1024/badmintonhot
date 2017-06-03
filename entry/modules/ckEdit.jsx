import React from 'react';
import {render} from 'react-dom';
var CKEditor = require('react-ckeditor-wrapper');
var CkEdit = React.createClass({


    getInitialState: function () {

        return ({content: 'content'});
    },
    updateContent:function(value) {
        this.setState({content:value})
    },

    render:function() {
        return (
            <div>
                ddddd
                <CKEditor
                    value={this.state.content}
                    onChange={this.updateContent.bind(this)} />
            </div>
        );
    }
});
module.exports = CkEdit;