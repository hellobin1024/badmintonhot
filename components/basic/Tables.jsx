/**
 * @by QD
 * 作为工作区table组件，带有增加和删除功能
 * 传入的数据参数 ：title={table标题}。。。{
        label:'成员名',
        id:'Name'
    }
 onDeleteRow={ this.onDeleteRow.bind(null) }删除
 onDeleteRow:function(row) {
        var products =[];
        products= this.state.data;
        products = products.filter((product) => {
            return product.memberName !== row[0];
        });

        this.setState({
            data: products
        });

    },
 onAddRow={ this.onAddRow.bind(null) }增加
 onAddRow:function(row) {
        var products =[];
        products= this.state.data;
        products.push(row);
        this.setState({
            data: products
        });

    },
data={data}表内数据以title内的id为对照
 {title.id1:xxx
  title.id2:xxx}
 */
import React from 'react';
import {render} from 'react-dom';
var SyncStore = require('../../components/flux/stores/SyncStore');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var MyTable=React.createClass ({

    // updata:function (data) {
    //   this.setState({data :data});
    // },

    getInitialState:function(){
        var data=null;
        var title=null;

        if(this.props.data!==undefined&&this.props.data!==null
            &&this.props.title!==undefined&&this.props.title!==null)
        {
            data = this.props.data;
            title = this.props.title;
        }

        return ({
            data: data,
            title: title
        });
    },

    render:function () {

        var title=this.state.title;

        var contains=null;
        var headerCols=[];
        title.map(function (item,i) {
            if(i==0) {
                headerCols.push(<TableHeaderColumn dataField={item.id} key={"header"+i} isKey={ true }>{item.label}</TableHeaderColumn>);
            }else{
                headerCols.push( <TableHeaderColumn dataField={item.id} key={"header"+i} >{item.label}</TableHeaderColumn>);
            }
        })

        contains=
            <BootstrapTable data={ this.props.data }
                            remote={ true }
                            selectRow={ { mode: 'radio' }}
                            deleteRow={ true }
                            insertRow ={true}
                            options={ {
                                onDeleteRow: this.props.onDeleteRow,
                                onAddRow: this.props.onAddRow
                            } } style={{padding: '15px'}}>
                {headerCols}
        </BootstrapTable>

        return contains;
    },
    componentWillReceiveProps(nextProps){
        if(nextProps!=null&&nextProps!==undefined){
            // if(nextProps.length!==this.props.data.length){
                this.setState({data:nextProps});
            // }
        }
    }
});
module.exports = MyTable;