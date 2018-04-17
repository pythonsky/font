export  function getOption(data,_self,zhicharesp) {

    let zhichaData=[];
    if(zhicharesp.data.code===0&&zhicharesp.data.data.length!=0){
        for(let i of zhicharesp.data.data){
                zhichaData.push({
                    name:i.name,
                    zhicha:i.priority,
                    detail:i.datas,
                    itemStyle: {
                                normal: {
                                    color: i.priority==="levleOne"?'red':'#ff3249',
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: '#fff',
                                            fontSize: 15
                                        }
                                    }
                                },
                                emphasis: { // 也是选中样式
                                    borderWidth: 1,
                                    borderColor: 'yellow',
                                    color: i.priority==="levleOne"?'red':'#ff3249',
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: 'white'
                                        },
                                    }
                                }
                            },
                })
        }


    }
    var option = {
        backgroundColor: '#1b1b1b',
        // color: ['gold', 'aqua', 'lime'],
        title: {
            text: '天翼高清告警和进出流量差',
            subtext: '数据中心监控',
            x: 'center',
            y: 25,
            textStyle: {
                color: '#fff',
                fontSize: 20
            }
        },
        tooltip: {
            // trigger: 'item',
            trigger: 'item',
            formatter:function (params, ticket, callback) {
                let res = "<h2 style='color:yellow;''>" + params.data.name + '进出流量差:</h2>';
                if (params.data['zhicha']) {
                    let title=params.data['zhicha']==="levleOne"?"带宽进出相差大于500M":"带宽进出相差大于200M"
                    let head="<h3>当前进出流量差:" + title + '</h3>';
                    res += head;
                    res +="<table border='1px white'><tr>"
                    res +="<th>主机</th><th>告警时间</th><th>描述</th></tr>"
                    let detail=params.data.detail;
                    if (params.data.detail.length>10){
                        detail=params.data.detail.slice(0,10);
                    }
                    for(let i of detail){
                        res +="<tr><td>"+i.name+"</td><td>"+i.lastchange+"</td><td>"+i.description+"</td></tr>"
                    }
                    if (params.data.detail.length>10){
                        res+="<tr ><td  colspan='3' style='text-align:center'>...</td></tr>"
                    }
                    res +="</table>"
                }else{
                    res += "当前进出流量差:" + "暂无" + '</br>';
                }
                return res;
            }
        },
        color: [
            // 'rgb(130, 251, 11)',
            // '#CC6600',
            // 'rgb(130, 251, 11)',
            // '#CC6600',
            // 'rgb(130, 251, 11)',
            // '#CC6600',
            'red'
            
        ],
        legend: {
            // orient: 'horizontal',
            orient: 'vertical',
            x: '10',
            y: "10",
            itemGap: 5,
            selectedMode: 'multiple',
            // backgroundColor: 'black',
            selected: {
                // '北京中心直播': true,
                // '北京中心点播': true,
                // '南京中心直播': true,
                // '南京中心点播': true,
                // '广州中心直播': true,
                // '广州中心点播': true,
                '告警': true,
                // '机房':true
            },
            data: ['告警'],
            textStyle: {
                color: '#fff'
            }
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center',
            feature: {
                mark: {
                    show: false
                },
                dataView: {
                    show: false,
                    readOnly: false
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        // dataRange: {
        //     x: 'left',
        //     y: 'bottom',
        //     orient: 'horizontal',
        //     // min: data.max_min_value[0].min,
        //     itemHeight: 10,
        //     itemWidth: 10,
        //     min: 0,
        //     // max: data.max_min_value[0].max,
        //     max: 55000,
        //     calculable: true,
        //     color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        series: [{
                name: '全国',
                type: 'map',
                roam: true,
                hoverable: true,
                mapType: 'china',
                itemStyle: {
                    normal: {
                        label: {
                            show: true
                        },
                        borderColor: 'rgba(100,149,237,1)',
                        borderWidth: 0.5,
                        areaStyle: {
                            color: '#1b1b1b'
                        }
                    },
                    emphasis:{
                        label: {
                            show: true
                        },
                        borderColor: 'rgba(100,149,237,1)',
                        borderWidth: 0.5,
                        areaStyle: {
                            color: '#1b1b1b'
                        },
                    }
                },
                tooltip: {
                    show: true,
                    formatter: '{c}'
                },
                show: true,
                // data:[],
                data:zhichaData,
                // data: [{
                //     name: '广东',
                //     zhicha:10000,
                //     itemStyle: {
                //         normal: {
                //             color: 'red',
                //             label: {
                //                 show: true,
                //                 textStyle: {
                //                     color: '#fff',
                //                     fontSize: 15
                //                 }
                //             }
                //         },
                //         emphasis: { // 也是选中样式
                //             borderWidth: 2,
                //             borderColor: 'yellow',
                //             areaColor: '#cd5c5c',
                //             label: {
                //                 show: true,
                //                 textStyle: {
                //                     color: 'white'
                //                 },
                //             }
                //         }
                //     },

                // }],
                geoCoord: data.xy,
            },

            {
                name: '告警',
                type: 'map',
                mapType: 'china',
                data: [],
                tooltip: {
                    trigger: 'item',
                    zlevel: 2,
                    // position:[100,100],
                    formatter: function (params, ticket, callback) {
                        // console.log(params)
                        var res = "<h3 style='color:red;''>" + params.data.name + '告警:</h3>';
                        if (params.data['一级告警']) {
                            res += "一级告警:" + params.data['一级告警'] + '次</br>';
                        }
                        if (params.data['二级告警']) {
                            res += "二级告警:" + params.data['二级告警'] + '次</br>';
                        }
                        if (params.data['三级告警']) {
                            res += "三级告警:" + params.data['三级告警'] + '次</br>';
                        }
                        if (params.data['提示']) {
                            res += "提示:" + params.data['提示'] + '次</br>';
                        }
                        // setTimeout(function() {
                        //   // 仅为了模拟异步回调
                        //   callback(ticket, res);
                        // }, 300)
                        return res;
                    }
                },
                markPoint: {
                    // large:true,
                    symbol: _self.beijing_img,
                    symbolSize: 20,
                    effect: {
                        show: true,
                        shadowBlur: 1
                    },
                    data: _self.beijingWarning
                }
            },
            // 南京告警
            {
                name: '告警',
                type: 'map',
                mapType: 'china',
                data: [],
                tooltip: {
                    trigger: 'item',
                    zlevel: 2,
                    // position:[100,100],
                    formatter: function (params, ticket, callback) {
                        // console.log(params)
                        var res = "<h3 style='color:red;''>" + params.data.name + '告警:</h3>';
                        if (params.data['一级告警']) {
                            res += "一级告警:" + params.data['一级告警'] + '次</br>';
                        }
                        if (params.data['二级告警']) {
                            res += "二级告警:" + params.data['二级告警'] + '次</br>';
                        }
                        if (params.data['三级告警']) {
                            res += "三级告警:" + params.data['三级告警'] + '次</br>';
                        }
                        if (params.data['提示']) {
                            res += "提示:" + params.data['提示'] + '次</br>';
                        }
                        return res;
                    }
                },
                markPoint: {
                    // large:true,
                    symbol: _self.nanjing_img,
                    symbolSize: 20,
                    effect: {
                        show: true,
                        shadowBlur: 1
                    },
                    data: _self.nanjingWarning
                }
            },
            // 广州告警
            {
                name: '告警',
                type: 'map',
                mapType: 'china',
                data: [],
                tooltip: {
                    trigger: 'item',
                    zlevel: 2,
                    // position:[100,100],
                    formatter: function (params, ticket, callback) {
                        // console.log(params)
                        var res = "<h3 style='color:red;''>" + params.data.name + '告警:</h3>';
                        if (params.data['一级告警']) {
                            res += "一级告警:" + params.data['一级告警'] + '次</br>';
                        }
                        if (params.data['二级告警']) {
                            res += "二级告警:" + params.data['二级告警'] + '次</br>';
                        }
                        if (params.data['三级告警']) {
                            res += "三级告警:" + params.data['三级告警'] + '次</br>';
                        }
                        if (params.data['提示']) {
                            res += "提示:" + params.data['提示'] + '次</br>';
                        }
                        return res;
                    }
                },
                markPoint: {
                    // large:true,
                    symbol: _self.guangzhou_img,
                    symbolSize: 20,
                    effect: {
                        show: true,
                        shadowBlur: 1
                    },
                    data: _self.guangzhouWarning
                }
            },
               
        ]
    };
    return option;
}