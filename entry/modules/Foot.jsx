import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
var Foot = React.createClass({


    getInitialState: function () {
        var a=3;

        return ({});
    },




    render:function() {
        var contains = null;
        contains =
            <div className="footer-bottom-grids">
                <div className="container">
                    <div className="footer-bottom-top-grids">
                        <div className="col-md-4 footer-bottom-left">
                            <h4>supnuevo</h4>
                        </div>
                        <div className="clearfix"> </div>
                        <div className="copyright">
                            <p>Copyright &copy; 2015.Company name All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        return contains;
    }
});
module.exports = Foot;