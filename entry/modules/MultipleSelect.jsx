import React from 'react';
import {render} from 'react-dom';


var MultipleSelect = React.createClass({

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
                    <option key={i} value={i+1}>{item}</option>

            )
        })

        return (
            <div>
                <select  id="placeStr" className="selectpicker show-tick form-control" multiple data-live-search="true">
                {els}
                </select>
            </div>

        )


    },
    componentDidMount:function() {
        $('#placeStr').selectpicker('refresh');
        $('#placeStr').selectpicker('show');
    }

});
module.exports = MultipleSelect;