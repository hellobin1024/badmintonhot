import React from 'react';
import {render} from 'react-dom';

/*
* 百度地图 by QD
* <Bmap  option={....}/>
* option={
* width,宽度(必填)
* height,高度(必填)
* minZoom,最小查看范围
* maxZoom,最大查看范围
* centerLon,地图中心坐标经度
* centerLat,地图中心坐标维度
* zoom,起始查看范围
* longitude,定点经度(必填)
* latitude,定点维度(必填)
* opt，是否需要弹窗true/false
* opts = {   ///覆盖点信息窗口
            width : 200,     // 信息窗口宽度
            height: 100,     // 信息窗口高度
            title : "海底捞王府井店" , // 信息窗口标题
        }
*
* optsInfo,//信息窗口信息
*
*
* */
var Bmap = React.createClass({


    getInitialState:function () {
        var option = this.props.option;
        if(option.centerLon==null||option.centerLat==null){
            option.centerLon=117.128081;
            option.centerLat=36.658059;
        }
        if(option.zoom==null){
            option.zoom=14;
        }
        if(option.minZoom==null||option.maxZoom==null){
            option.minZoom=10;
            option.maxZoom=15;
        }
        return({option:option});
    },

    render:function() {
        var option = this.state.option;
        return (
                <div>

                    <div  style={{padding: '30px 35px 0px 15px'}}>
                        <div id="allmap" style={{minWidth:option.width,minHeight:option.height}}></div>
                    </div>
                </div>



        )},
    componentDidMount:function () {
        var option = this.state.option;
        // 百度地图API功能
        var map = new BMap.Map("allmap",{minZoom:option.minZoom,maxZoom:option.maxZoom});
        var point = new BMap.Point(option.centerLon,option.centerLat);
        map.centerAndZoom(point,option.zoom);
        map.enableScrollWheelZoom(true);

        // 用经纬度设置地图中心点
        map.clearOverlays();
        var new_point = new BMap.Point(option.longitude,option.latitude);
        var marker = new BMap.Marker(new_point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.panTo(new_point);
        if(option.opt) {
            var opts = option.opts;
            var optsInfo = option.optsInfo;
            var infoWindow = new BMap.InfoWindow(optsInfo, opts);  // 创建信息窗口对象
            marker.addEventListener("click", function () {
                map.openInfoWindow(infoWindow, new_point); //开启信息窗口
            });
        }
    },

});
module.exports = Bmap;