import React from 'react';
import {render} from 'react-dom';
/**
 * @by QD
 * 作为工作区tab页组件
 * 传入的数据data以menus.json为模板
 */
var Tab=React.createClass({

    getInitialState:function(){
        var data=null;
        var data$initialed=false;
        if(this.props.data!==undefined&&this.props.data!==null)
        {
            data = this.props.data;
            data$initialed=true;
        }
        else
            data$initialed=false;

        return ({data: data});
    },
    render:function(){
        if(this.state.data!==undefined&&this.state.data!==null){
            var lis = new Array();
            var oneTab = new Array();
            this.state.data.map(function(first,i) {
                var twoTab = new Array();
                if(first.sub[0].sub!==undefined&&first.sub[0].sub!==null) {
                    var lis_2 = new Array();

                    first.sub.map(function (second, j) {
                         lis_2.push(
                             <li key={"tabSed"+j}>
                                 <a href={"#"+first.route} tabindex="-1" data-toggle="tab">{second.label}</a>
                             </li>
                         )
                        })
                    twoTab.push(
                        <ul className="dropdown-menu" role="menu" aria-labelledby="myTabDrop1">
                            {lis_2}
                        </ul>
                    )
                    oneTab.push(
                        <li className="dropdown" key={"tabFir"+i}>
                            <a href="#" id="myTabDrop1" className="dropdown-toggle"
                               data-toggle="dropdown">
                                Java
                                <b className="caret"></b>
                                {twoTab}
                            </a>
                        </li>
                    )
                }else {
                    oneTab.push(
                        <li key={"tabFir"+i}>
                            <a href={"#"+first.route} data-toggle="tab">{first.label}</a>
                        </li>
                    )
                }
            });
            lis.push(
                <ul id="myTab" className="nav nav-tabs"
                    style={{float:'none', paddingTop: '5px', paddingLeft: '0px'}}>
                    {oneTab}
                </ul>
            )
            return (
                <div>
                    <div className="workspace_tab">
                        {lis}
                    </div>
                    <div id="myTabContent" className="tab-content">
                        <div className="tab-pane fade in active" id="home">
                        </div>
                        <div className="tab-pane fade" id="ios">
                        </div>
                    </div>
                </div>
            )
        }
        return(
            <div>tab
                <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade in active" id="home">
                        <p>Tutorials Point is a place for beginners in all technical areas.
                            This website covers most of the latest technoligies and explains
                            each of the technology with simple examples. You also have a
                            <b>tryit</b> editor, wherein you can edit your code and
                            try out different possibilities of the examples.</p>
                    </div>
                    <div className="tab-pane fade" id="ios">
                        <p>iOS is a mobile operating system developed and distributed by Apple
                            Inc. Originally released in 2007 for the iPhone, iPod Touch, and
                            Apple TV. iOS is derived from OS X, with which it shares the
                            Darwin foundation. iOS is Apple's mobile version of the
                            OS X operating system used on Apple computers.</p>
                    </div>
                </div>

            </div>
        )
    }
})
module.exports = Tab;