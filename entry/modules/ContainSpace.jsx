import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css';
import '../../build/css/jquery-ui.css';
import '../../build/css/style.css';

var ContainSpace = React.createClass({

    render:function() {
        var contains = null;
        contains =
            <div className="banner-bottom">
                <div className="container">
                    <div className="banner-bottom-grids">
                        supnuevo
                    </div>
                </div>

            </div>
        return contains;
    },

});
module.exports = ContainSpace;