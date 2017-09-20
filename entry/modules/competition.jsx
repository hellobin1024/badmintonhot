import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { browserHistory ,hashHistory} from 'react-router';
import RightSlide from './components/RightSilde'
var Proxy = require('../../components/proxy/ProxyQ');

var Competieion = React.createClass({


    getInitialState: function () {
        var token=this.props.token;
        var personId=this.props.personId;

        if(this.props.personId!==undefined && this.props.personId!==null){
            personId = this.props.personId;
        }
        return ({
            token:token,personId:personId
        });
    },
    initialData:function(){

        this.getAllCompetieion();

    },
    dateChange:function (date) {
        switch (date){
            case 1:
                date='一';
                break
            case 2:
                date='二';
                break
            case 3:
                date='三';
                break
            case 4:
                date='四';
                break
            case 5:
                date='五';
                break
            case 6:
                date='六';
                break
            case 7:
                date='七';
                break
        }
        return date;
    },
    closeModal:function () {
        var successModal = this.refs['successModal'];
        $(successModal).modal('hide');
    },

    getAllCompetieion:function () {
        if (this.props.token != null) {

            var url = "/func/competition/getCanJoinBadmintonCompetitionInfoList";
            var ref = this;
            var params = {};
            Proxy.query(
                'POST',
                url,
                params,
                null,
                function (res) {
                    var a = res.data;
                    var competitionType2 = "";
                    for (var i = 0; i < a.length; i++) {
                        if (a[i].competitionType == "1") {
                            competitionType2 = "公开";
                        } else {

                            competitionType2 = "委托";
                        }
                        a[i].startTime = ref.dateFormat(a[i].startTime);
                        a[i].endTime = ref.dateFormat(a[i].endTime);

                        a[i].competitionType2 = competitionType2;
                    }
                    ref.setState({data: a});
                },

                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }
            );
        } else {

              alert("尚未登录！");
        }


    }
    ,
    dateFormat:function (date) {//object时间转时间格式"yyyy-mm-dd hh:mm:ss"
        return (new Date(date)).toLocaleDateString() + " " + (new Date(date)).toLocaleTimeString();
    },
    render:function() {
        var contains = null;
        if(this.state.data!==null&&this.state.data!==undefined) {
            var data = this.state.data;
            var trs = [];
            var ref = this;
            data.map(function (item,i) {
                trs.push(
                    <div key={i}>
                        <div className="basic" >

                            <div className="business">
                                <h2>{item.competitionName}</h2>
                                <p><span>介绍：</span>{item.breif}</p>
                            </div>
                            <div className="value">
                                <p><span>主办人：</span>{item.hostUnit}</p>
                            </div>
                            <ul>
                                <li><span>场地：</span> {item.unitName}</li>
                                <li><span>时间：</span> {item.startTime}到{item.endTime}</li>
                                <li><span>类型：</span> {item.competitionType2}</li>
                            </ul>
                            <div className="buy-me">
                                <Link to={window.App.getAppRoute() + "/ShowProject?competitionId="+item.competitionId} >报名</Link>
                            </div>
                        </div>
                    </div>
                )

            })
            contains =
                <div>
                    <div className="banner-bottom">
                        <div className="container">
                            <div className="faqs-top-grids">
                                <div className="product-grids">
                                    <div className="col-md-8 news_content">
                                        {trs}
                                        <div className="clearfix"></div>
                                    </div>
                                    <RightSlide/>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>





                </div>
        }else{
            this.initialData();
        }
        return contains;

    },
    componentDidMount:function () {
        $(document).click(function () {
            $('.clockpicker').clockpicker()
                .find('input').change(function(){
                // TODO: time changed
                console.log(this.value);
            });
            $('#demo-input').clockpicker({
                autoclose: true
            });
        })
    }

});

const mapStateToProps = (state, ownProps) => {
    const props = {
        token: state.userInfo.accessToken,
        personId:state.userInfo.personId,
    }
    return props
}
export default connect(mapStateToProps)(Competieion);


