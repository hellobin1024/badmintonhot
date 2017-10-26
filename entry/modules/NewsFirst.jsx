import React from 'react';
import {render} from 'react-dom';

import {Link} from 'react-router';

var NewsFirst = React.createClass({

    getInitialState:function () {
        var data = this.props.data;
        return ({
           data:data
        });
    },

    initialData:function(){


    },
    render: function () {
        var data = this.state.data;
        var els = [];
        data.map(function (item, i) {
            els.push(
                <li className="button" key={i}><a href="#">{item.title}</a>
                    {i == 0 ?
                        <li className="dropdown active">
                            <Link to={window.App.getAppRoute() + "/news"}>
                                <div className="destinations-grid">
                                    <img src={window.App.getResourceDeployPrefix() + item.img} alt=""/>
                                </div>
                                <div className="destinations-grid-info">
                                    <div className="destinations-hotel">{item.brief}</div>
                                    <br> </br>
                                </div>
                            </Link>
                        </li> :
                        <li className="dropdown">
                            <Link to={window.App.getAppRoute() + "/news"}>
                                <div className="destinations-grid">
                                    <img src={window.App.getResourceDeployPrefix() + item.img} alt=""/>
                                </div>
                                <div className="destinations-grid-info">
                                    <div className="destinations-hotel">{item.brief}</div>
                                    <div className="destinations-price"></div>
                                    <div className="clearfix"></div>
                                </div>
                            </Link>
                        </li>
                    }
                </li>

            )
        })

        return (
            <div className="destinations" style={{paddingTop: '15px'}}>
                <ul>
                    {els}
                </ul>
            </div>

        )


    },
    componentDidMount:function() {
        $(document).ready(function () {
            /* This code is executed after the DOM has been completely loaded */

            /* Changing thedefault easing effect - will affect the slideUp/slideDown methods: */
            $.easing.def = "easeOutBounce";

            /* Binding a click event handler to the links: */
            $('li.button a').click(function (e) {

                /* Finding the drop down list that corresponds to the current section: */
                var dropDown = $(this).parent().next();

                /* Closing all other drop down sections, except the current one */
                $('.dropdown').not(dropDown).slideUp('slow');
                dropDown.slideToggle('slow');

                /* Preventing the default event (which would be to navigate the browser to the link's address) */
                e.preventDefault();
            })

        });
    }

});
module.exports = NewsFirst;