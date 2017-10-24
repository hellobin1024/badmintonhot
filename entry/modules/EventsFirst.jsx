import React from 'react';
import {render} from 'react-dom';

import {Link} from 'react-router';


var EventsFirst = React.createClass({

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
                <div className="date-text" key={i}>
                    <Link to={window.App.getAppRoute() + "/events"}>
                        {item.startTimeStr}
                    </Link>
                    <p>{item.eventName}&nbsp; &nbsp;{item.eventBrief} </p>
                </div>
            )
        })

        return (
            <div id="design" className="date">
                <div id="cycler">
                    {els}
                </div>
            </div>
        )


    },
    componentDidMount:function() {
        function cycle($item, $cycler) {
            if ($item.length == 0) {
                $item = $('#cycler div:first');
            }
            setTimeout(cycle, 2000, $item.next(), $cycler);

            $item.slideUp(1000, function () {
                $item.appendTo($cycler).show();
            });

        }

        cycle($('#cycler div:first'), $('#cycler'));
    }

});
module.exports = EventsFirst;