/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom'
import Header from '../modules/Heard.jsx';
import '../../css/entry/modules/myEvents.css'
import Calendar from '../../components/basic/Calendar.jsx';
var today=new Date().toLocaleDateString().replace("/", "-").replace("/", "-");

var ProxyQ = require('../../components/proxy/ProxyQ')

var Order = React.createClass({

    getUrlParam :function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    },
    getInitialState: function () {

        var product=parseInt(this.getUrlParam("product"));
        return({product:product,
        data:null})
    },
    initialData:function () {
        this.getClassInfo();
        this.getRelateMan();
    },
    getClassInfo:function () {
        var url="/func/allow/getClassByClassId";
        var params={
            id:this.state.product
        };

        ProxyQ.query(
            'post',
            url,
            params,
            null,
            function(ob) {
                var data=ob.resList;
                this.setState({data:data});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    getRelateMan:function () {
        var url="/func/relative/getMyRelative";
        ProxyQ.query(
            'get',
            url,
            null,
            null,
            function(ob) {
                var a=ob.resList;
                this.setState({relate:a});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    showModal:function () {
        var addNewManModal = this.refs['addNewManModal'];
        $(addNewManModal).modal('show');
    },
    //显示提示框，目前三个参数(txt：要显示的文本；time：自动关闭的时间（不设置的话默认1500毫秒）；status：默认0为错误提示，1为正确提示；)
    showTips:function(txt,time,status) {
        var htmlCon = '';
        if(txt != ''){
            if(status != 0 && status != undefined){
                htmlCon = '<div class="tipsBox" style="width:220px;padding:10px;background-color:#4AAF33;border-radius:4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;color:#fff;box-shadow:0 0 3px #ddd inset;-webkit-box-shadow: 0 0 3px #ddd inset;text-align:center;position:fixed;top:25%;left:50%;z-index:999999;margin-left:-120px;">'+txt+'</div>';
            }else{
                htmlCon = '<div class="tipsBox" style="width:220px;padding:10px;background-color:#D84C31;border-radius:4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;color:#fff;box-shadow:0 0 3px #ddd inset;-webkit-box-shadow: 0 0 3px #ddd inset;text-align:center;position:fixed;top:25%;left:50%;z-index:999999;margin-left:-120px;">'+txt+'</div>';
            }
            $('body').prepend(htmlCon);
            if(time == '' || time == undefined){
                time = 1500;
            }
            setTimeout(function(){ $('.tipsBox').remove(); },time);
        }
    },
    addNewMan:function () {
        var relativePersonInfo = this.refs.relativePersonInfo;
        var relatedName=$(relativePersonInfo).find("input[name='relatedName']").val();
        var relatedRealName=$(relativePersonInfo).find("input[name='relatedRealName']").val();
        var relatedDate=$(relativePersonInfo).find("input[name='birthdayDate']").val();
        var relativeSex = $('#relativeSex option:selected').val();

        if (relatedName == '') {
            this.showTips('请填写关联人的登录名~');
        } else if (relatedRealName == "") {
            this.showTips('请填写关联人的真实姓名~');
        } else if (relatedDate == "") {
            this.showTips('请选择出生日期~');
        } else if (relativeSex == "-1"||relativeSex == -1){
            this.showTips('请选择性别~');
        } else {

            var url = "/func/relative/addRelative";
            var params = {
                userName: relatedName,
                perName: relatedRealName,
                genderCode: relativeSex,
                perBirthday: relatedDate
            };

            ProxyQ.query(
                'post',
                url,
                params,
                null,
                function (ob) {
                    var a = ob.reCode;
                    var addNewManModal = this.refs['addNewManModal'];
                    $(addNewManModal).modal('hide');
                }.bind(this),
                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
    },
    classSignUp:function () {
        var store="";
        $("#d1 input:checkbox:checked").each(function (index, domEle) {
            store+=$(domEle).val()+",";
        });
        var url = "/func/allow/classMultiplySignUp";
        var params = {
            personId:store,
            classId:this.state.product
        };
        ProxyQ.query(
            'post',
            url,
            params,
            null,
            function (ob) {
                var reCode = ob.reCode;
                if(reCode!==undefined && reCode!==null && (reCode ==1 || reCode =="1")) { //操作失败
                    alert(ob.response);
                    return;
                }
                alert(ob.response);

            }.bind(this),
            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );


    },
    render:function(){
        var mainContent = null;
        if(this.state.product!==undefined && this.state.product!==null) {
            var data = this.state.data;
            var relate = this.state.relate;
            var path = this.props.route.path;
            var table = null;
            var lis = [];
            if (data !== undefined && data !== null && relate !== undefined && relate !== null) {
                table =
                    <div>
                        <table className="table table-striped invoice-table">
                            <thead className="table-head">
                            <tr>
                                <th width="300"></th>
                                <th width="300"></th>
                                <th width="300"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>课程名称:</td>
                                <td>{data.className}</td>
                                <td>开课教员:</td>
                                <td>{data.infoPersonInfo.perName}</td>
                            </tr>
                            <tr>
                                <td>课程时间:</td>
                                <td>{1}</td>
                                <td>课程地点:</td>
                                <td>{data.badmintonVenueUnit.name + ":" + data.badmintonVenueUnit.address}</td>
                            </tr>
                            <tr>
                                <td>课程计划招生:</td>
                                <td>{data.maxNumber}</td>
                                <td>课程现有人数:</td>
                                <td>{data.signNumber}</td>
                            </tr>
                            <tr>
                                <td style={{borderBottom: '1px solid #ddd'}}>课程简介:</td>
                                <td style={{borderBottom: '1px solid #ddd'}} colSpan={6}>{data.detail}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                relate.map(function (item, i) {
                    lis.push(
                        <div style={{width:'150px',float: 'left'}} key={'checkbox'+i}>
                            <div style={{float: 'left'}}><input type="checkbox" key={i} value={item.relatedPersonId}/></div>

                            <div style={{float: 'left'}}><span>{item.userName}</span></div>
                            <div className="clearfix"></div>
                        </div>
                    )
                })
            } else {
                this.initialData();
            }
            mainContent =
                <div>
                    <Header path={path}/>

                    <div id="pjax-container" className="person-container clearfix" style={{paddingTop: '25px'}}>
                        <div>
                            <div className="orderTitle">
                                <h2>您所选课程</h2>
                            </div>
                            {table}
                            <div className="orderTitle">
                                <h2>报名人员选择</h2>
                            </div>
                            <div id="d1" className="order-container">
                                    {lis}
                            </div>
                            <div style={{marginLeft: '78em'}}>
                                <p>以上没有您所需要的人员？<a onClick={this.showModal}>点此添加！</a></p>
                            </div>
                            <div className="orderSubmit">
                                <button style={{padding: '7px 20px 7px 20px'}} onClick={this.classSignUp}>报名</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade bs-example-modal-sm login-container"
                         tabIndex="-1"
                         role="dialog"
                         aria-labelledby="myLargeModalLabel"
                         aria-hidden="true"
                         ref='addNewManModal'
                         data-keyboard="false"
                         style={{zIndex: 1045}}
                    >
                        <div className="modal-dialog modal-sm"
                             style={{position: 'absolute', top: '30%', width: '50%', marginLeft: '25%'}}>
                            <div className="modal-content"
                                 style={{position: 'relative', width: '100%', padding: '40px'}}>

                                <div className="modal-body">
                                    <div className="modalEventDetail">

                                        <div ref="relativePersonInfo">
                                            <div className="article"
                                                 style={{textAlign: 'center', borderBottom: '1px dashed #CCCCCC'}}>
                                                <h2 className="font_15 text" style={{fontSize: 'medium'}}>添加关联人</h2>
                                            </div>

                                            <div>
                                                <div style={{marginTop: '25px'}}>
                                                    <div >
                                                        <label className="related_label">用户昵称（登录名）</label>
                                                        <div className="self_controls">
                                                            <input name="relatedName" defaultValue=""
                                                                   className="self_input"
                                                                   style={{width: '230px', fontSize: 'medium'}}/>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div style={{marginTop: '25px'}}>
                                                    <div>
                                                        <label className="related_label">真实姓名</label>
                                                        <div className="self_controls">
                                                            <input name="relatedRealName" defaultValue=""
                                                                   className="self_input"
                                                                   style={{width: '230px', fontSize: 'medium'}}/>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="clear">
                                                </div>
                                                <div style={{marginTop: '25px'}}>
                                                    <div>
                                                        <label className="related_label">性别</label>
                                                        <div className="self_controls">
                                                            <select style={{height: '35px'}} id="relativeSex">
                                                                <option value={-1}>请选择性别</option>
                                                                <option value={0}>男</option>
                                                                <option value={1}>女</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{marginTop: '25px'}}>
                                                    <div>
                                                        <label className="related_label">出生日期</label>
                                                        <div className="self_controls">
                                                   <span>
                                                       <Calendar data={today} ctrlName='birthdayDate'/>
                                                   </span>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="clear">
                                                </div>

                                                <div className="save_control" style={{
                                                    marginLeft: '44%',
                                                    marginTop: '20px',
                                                    marginBottom: '20px',
                                                    width: '100%'
                                                }}>
                                                    <button style={{padding: '5px 20px'}} onClick={this.addNewMan}>添加
                                                    </button>
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
        }else {
            mainContent=
                <div>
                <h1>数据出错，请重新尝试，抱歉！</h1>
            </div>
        }


        return mainContent;

    },

});

module.exports=Order;