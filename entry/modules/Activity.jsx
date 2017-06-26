/**
 * Created by dellbin on 2017/6/25.
 */
/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom'

var ProxyQ = require('../../components/proxy/ProxyQ')

var Activity = React.createClass({

    initialData:function(){
        var url="/func/group/getMyActivity";
        var params={
            personId:this.state.personId
        };

        ProxyQ.query(
            'post',
            url,
            params,
            null,
            function(ob) {
                var reCode = ob.reCode;
                if(reCode!==undefined && reCode!==null && (reCode ==1 || reCode =="1")) { //数据获取失败
                    return;
                }

                var data=ob.resList[0];
                var genderCode = data.genderCode;
                this.setState({genderCode:genderCode});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },

    getInitialState: function () {
        var personId = null;
        if(this.props.personId!==undefined && this.props.personId){
            personId = this.props.personId;
        }
        return ({personId: personId, data:null});
    },

    render:function(){
        var mainContent = null;
        var data = this.state.data;

        if(data!==undefined && data!==null){
            mainContent=
                <div>

                </div>
        }else{
            this.initialData();
        }

        returm(
            {mainContent}
        )
    },
});

module.exports=Activity;