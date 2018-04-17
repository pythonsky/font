<template>
  <div class="" id="mapContainer" style="width:calc(100% );height:calc(100% );">
    <!-- <div id="map" v-bind:class="{ noFullScreen: !isFullScreen }">
                      <full-screen class="fullscreen" v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                    </div> -->
    <mapFullScreen class="fullscreen" v-model="isFullScreen" @on-change="fullscreenChange"></mapFullScreen>
    <div class="warningList">
      <warningList :datalist='data1' :columns='columns1' :loading='loading' v-on:changeCity="handleChangeCity"></warningList>
    </div>
    <audio id="paparazzi" src="/dist/warning.mp3" style="z-index:-1">
                    </audio>
  
    <Row style="margin:0px 0px 0px 0px;" type="flex" justify="space-around" class="code-row-bg">
      <!-- <div id="pie" style="width:calc(35% - 20px)"></div>
                                <div id="line" style="width:calc(65% - 20px)"></div> -->
      <Col :xs="24" :sm="24" :md="24" :lg="{ span: 24 }">
      <div id="map" style="width:calc(100% +20px);height:500px" v-bind:class="{ noFullScreen: !isFullScreen }">
        <!-- <full-screen class="fullscreen" v-model="isFullScreen" @on-change="fullscreenChange"></full-screen> -->
      </div>
      </Col>
  
    </Row>
  
  </div>
</template>

<script>
  import mapFullScreen from "../main-components/mapfullscreen.vue"
  import warningList from "./warningList.vue"
  import {
    TweenMax,
    Power2
  } from "gsap";
  import util from '@/libs/util.js';
  import axios from 'axios';
  import expandRow from './expand-row.vue';
  import {
    getOption
  } from "./mapForWarning.js"
  // import style from "jquery.mCustomScrollbar.css"
  export default {
    name: 'MapWarning',
    components: {
      mapFullScreen,
      warningList
    },
    data() {
      return {
        selected: "",
        mapResize: null,
        changemenu: null,
        loading: false,
        msg: 'mapingggggg',
        isFullScreen: false,
        columns1: [{
            type: 'expand',
            width: 25,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  row: params.row
                }
              })
            }
          }, {
            title: '主机',
            key: 'name',
            width: 168
          },
          {
            title: '指派人',
            key: 'username',
            width: 50
          },
          {
            title: '指派人电话',
            key: 'telephone',
            width: 120
          }
        ],
        data1: [],
        currentCity: "",
        timeTask: null,
        beijingWarning: [],
        nanjingWarning: [],
        guangzhouWarning: [],
        beijing_img: 'image://dist/warning_level1.png',
        nanjing_img: 'image://dist/warning_level1.png',
        guangzhou_img: 'image://dist/warning_level1.png',
  
      }
    },
    computed: {
      shrink() {
        return this.$store.state.app.shrink;
      }
    },
    methods: {
      getZhicha: function() {
        return util.ajax.get('/api/monitor/v1/zabbix_quality')
      },
      getAllWarning: function(beijingresp, nanjingresp, guangzhouresp) {
        let result = [];
        for (let i of beijingresp.data) {
          if (i.priority === "levleOne") {
            result.push(i)
          }
        }
        for (let i of nanjingresp.data) {
          if (i.priority === "levleOne") {
            result.push(i)
          }
        }
        for (let i of guangzhouresp.data) {
          if (i.priority === "levleOne") {
            result.push(i)
          }
        }
        for (let i of beijingresp.data) {
          if (i.priority === "levleTwo") {
            result.push(i)
          }
        }
        for (let i of nanjingresp.data) {
          if (i.priority === "levleTwo") {
            result.push(i)
          }
        }
        for (let i of guangzhouresp.data) {
          if (i.priority === "levleTwo") {
            result.push(i)
          }
        }
        for (let i of beijingresp.data) {
          if (i.priority === "levleThree") {
            result.push(i)
          }
        }
        for (let i of nanjingresp.data) {
          if (i.priority === "levleThree") {
            result.push(i)
          }
        }
        for (let i of guangzhouresp.data) {
          if (i.priority === "levleThree") {
            result.push(i)
          }
        }
        for (let i of beijingresp.data) {
          if (i.priority === "msg") {
            result.push(i)
          }
        }
        for (let i of nanjingresp.data) {
          if (i.priority === "msg") {
            result.push(i)
          }
        }
        for (let i of guangzhouresp.data) {
          if (i.priority === "msg") {
            result.push(i)
          }
        }
        return result;
      },
      handleChangeCity: function(newCity) {
        let _self = this;
        switch (newCity) {
          case "全部":
            axios.all([_self.getWarning('beijing'), _self.getWarning('nanjing'), _self.getWarning('guangzhou')])
              .then(axios.spread(function(beijingresp, nanjingresp, guangzhouresp) {
                _self.data1 = _self.getAllWarning(beijingresp, nanjingresp, guangzhouresp)
                _self.setWarningListStyle();
                _self.currentCity = "all"
              }))
            break;
          case "北京":
            _self.getWarning("beijing").then(function(response) {
              _self.data1 = response.data
              _self.currentCity = "beijing"
              _self.setWarningListStyle();
            })
            break;
          case "南京":
            _self.getWarning("nanjing").then(function(response) {
              _self.data1 = response.data
              _self.currentCity = "nanjing"
              _self.setWarningListStyle();
            })
            break;
          case "广州":
            _self.getWarning("guangzhou").then(function(response) {
              _self.data1 = response.data
              _self.currentCity = "guangzhou"
              _self.setWarningListStyle();
            })
            break;
          default:
            break;
  
        }
      },
      getShrink: function() {
        return this.$store.state.app.shrink;
      },
      fullscreenChange: function(isFullScreen) {
        // console.log(isFullScreen)
      },
      getWarning: function(city) {
        return util.ajax.get('/mzabbix/zabbix_trigger_get', {
          params: {
            city: city
          }
        })
      },
      audioWarning: function(count) {
        var song = $('audio').get(0);
        if (song) {
          song.loop = false
          if (count != 0 && song.paused) {
            song.play();
          } else
            song.pause();
        }
  
      },
      countWarning: function(resp) {
        var count = {};
        for (let i of resp.data) {
          if (i.priority == 'levleOne') {
            count['一级告警'] = count['一级告警'] != undefined ? count['一级告警'] + 1 : 1
          }
          if (i.priority == 'levleTwo') {
            count['二级告警'] = count['二级告警'] != undefined ? count['二级告警'] + 1 : 1
          }
          if (i.priority == 'levleThree') {
            count['三级告警'] = count['三级告警'] != undefined ? count['三级告警'] + 1 : 1
          }
          if (i.priority == 'msg') {
            count['提示'] = count['提示'] != undefined ? count['提示'] + 1 : 1
          }
        }
        return count;
      },
      setWarningListStyle: function() {
        var browser_height = $(".single-page-con").width() - 2
        var browser_height = $(".single-page-con").height() - 2
        let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
        isFullscreen = !!isFullscreen;
        if (isFullscreen) {
          browser_height = $("body").height()
        }
        $(".ivu-table-body").css("height", browser_height * 0.5);
        $(".ivu-table").css("height", browser_height * 0.5 + 32);
        // $(".ivu-table-body").css("max-height", browser_height * 0.5 + 32);
        $(".ivu-table-body").css("overflow", "hidden");
        $(".ivu-table-wrapper").css("height", browser_height * 0.5 + 32);
        $('.ivu-table-body').mCustomScrollbar({
          theme: "minimal-dark",
          scrollButtons: {
            enable: true,
            scrollType: "stepped"
          }
        });
      }
    },
    mounted() {
      require("jquery-mousewheel")($);
      require('malihu-custom-scrollbar-plugin')($);
      // $(".single-page-con ").mCustomScrollbar({
      //   theme: "minimal-dark",
      //   scrollButtons: {
      //     enable: true,
      //     scrollType: "stepped"
      //   }
      // });
  
      // var echarts = require('echarts')
      let _self = this
      util.ajax.interceptors.request.use(function(config) {
        _self.loading = true;
        return config;
      });
      util.ajax.interceptors.response.use(function(config) {
        if (config.request.responseURL.includes("/mzabbix/zabbix_trigger_get?city=")) {
          _self.loading = false;
        }
        return config;
      });
      // window.setInterval(function() {
      //   alertify.log("<h1>Error notification</h1>","error",0);
      // }, 60000);
  
      //获取三大内容中心告警数据
      axios.all([_self.getWarning('beijing'), _self.getWarning('nanjing'), _self.getWarning('guangzhou'), _self.getZhicha()])
        .then(axios.spread(function(beijingresp, nanjingresp, guangzhouresp, zhicharesp) {
          if (beijingresp.data.length != 0) {
            let tip = _self.countWarning(beijingresp)
            tip.name = "北京"
            if (tip["一级告警"] != undefined) {
              _self.beijing_img = 'image://dist/warning_level1.png'
            } else {
              _self.beijing_img = 'image://dist/warning_level2.png'
            }
            _self.beijingWarning.push(tip)
          }
          if (nanjingresp.data.length != 0) {
            let tip = _self.countWarning(nanjingresp)
            tip.name = "南京市"
            if (tip["一级告警"] != undefined) {
              _self.nanjing_img = 'image://dist/warning_level1.png'
            } else {
              _self.nanjing_img = 'image://dist/warning_level2.png'
            }
            _self.nanjingWarning.push(tip)
          }
          if (guangzhouresp.data.length != 0) {
            let tip = _self.countWarning(guangzhouresp)
            tip.name = "广州市"
            if (tip["一级告警"] != undefined) {
              _self.guangzhou_img = 'image://dist/warning_level1.png'
            } else {
              _self.guangzhou_img = 'image://dist/warning_level2.png'
            }
            _self.guangzhouWarning.push(tip)
          }
          var browser_width = $(".single-page-con").width() - 2
          var browser_height = $(".single-page-con").height()
          // $("#map").css("width", browser_width);
          $("#map").css("height", browser_height);
          $("#map").mCustomScrollbar({
            theme: "minimal-dark",
            scrollButtons: {
              enable: true,
              scrollType: "stepped"
            }
          });
          _self.currentCity = "all"
          _self.data1 = _self.getAllWarning(beijingresp, nanjingresp, guangzhouresp)
          _self.setWarningListStyle()
          //服务器地址
          var mapChart = echarts.init(document.getElementById('map'));
          var result = null
          util.logAjax.get('/api/log/v1/?Action=DescribeLinkData')
            .then(function(response) {
              var data = response.data
              data.xy["北京市"] = ["116.405285", "39.904989"]
              data.xy["北京"] = ["116.405285", "39.904989"]
              data.xy["广州市"] = ["113.280637", "23.125178"]
              data.xy["南京市"] = ["118.767413", "32.041544"]
              var option = getOption(data, _self, zhicharesp)
              mapChart.setOption(option);
              mapChart.component.tooltip.showTip({
                seriesIndex: 6,
                // name: '北京'
              })
              alertify.set({
                delay: 10000
              });
              let count = 0
              if (beijingresp.data.length != 0) {
                for (let i of beijingresp.data) {
                  if (i.priority == "levleOne") {
                    if ($("#map")[0]) {
                      alertify.log("<h3>北京一级告警</h3>机器：" + i.name + "</br>故障：" + i.description, "error");
                      count++
                    }
                  }
                }
  
              }
              if (nanjingresp.data.length != 0) {
                for (let i of nanjingresp.data) {
                  if (i.priority == "levleOne") {
                    if ($("#map")[0]) {
                      alertify.log("<h3>南京市一级告警</h3>机器：" + i.name + "</br>故障：" + i.description, "error");
                      count++
                    }
                  }
                }
              }
              if (guangzhouresp.data.length != 0) {
                for (let i of guangzhouresp.data) {
                  if (i.priority == "levleOne") {
                    if ($("#map")[0]) {
                      alertify.log("<h3>广州市一级告警</h3>机器：" + i.name + "</br>故障：" + i.description, "error");
                      count++
                    }
                  }
                }
              }
              _self.audioWarning(count)
            })
            .catch(function(error) {
              // alert("服务器异常")
              console.log(error);
            })
          // 获取legend选取状态
          var selected = null;
          var ecConfig = echarts.config
          mapChart.on(ecConfig.EVENT.LEGEND_SELECTED, function(param) {
            selected = param.selected;
            _self.selected = selected;
            if (!selected['告警']) {
              TweenMax.to($('.warningList'), 1, {
                opacity: 1,
                ease: Power3.easeInOut,
                css: {
                  left: -360
                }
              });
            } else {
              TweenMax.to($('.warningList'), 1, {
                opacity: 1,
                ease: Power3.easeInOut,
                css: {
                  left: 0
                }
              });
            }
          });
          mapChart.on('click', function(params) {
            var city = params.name;
            //选取告警lengend时，点击才会有效
            if (!selected || selected['告警']) {
              if (city === "北京" && _self.beijingWarning.length != 0 || city === "南京市" && _self.nanjingWarning.length != 0 || city === "广州市" && _self.guangzhouWarning.length != 0) {
                let param = ""
                switch (city) {
                  case '北京':
                    param = 'beijing'
                    break;
                  case '南京市':
                    param = 'nanjing'
                    break;
                  case '广州市':
                    param = 'guangzhou'
                    break;
                }
                if (city === "南京市") {
                  city = "南京"
                }
                if (city === "广州市") {
                  city = "广州"
                }
                _self.$store.commit("setCurrentCity", city)
                _self.getWarning(param).then(function(response) {
                  if (response.data.length != 0) {
                    _self.data1 = response.data
                    // _self.loading = false
                    _self.currentCity = param
                  }
                })
  
  
                _self.setWarningListStyle()
                // $(".ivu-table-body").mCustomScrollbar("update")
                TweenMax.to($('.warningList'), 1, {
                  opacity: 1,
                  ease: Power3.easeInOut,
                  css: {
                    left: 0,
                  }
                });
                TweenMax.to($('.ivu-card'), 0, {
                  opacity: 1,
                  ease: Power3.easeInOut,
                });
              }
            }
  
          });
          _self.changemenu = function() {
            var browserWidth = $(".single-page-con").width()
            var browserHeight = $(".single-page-con").height()
            if (!_self.shrink) {
              browserWidth = browserWidth - 140
            } else {
              browserWidth = browserWidth + 140
            }
            if ($("#map")) {
              $("#map").css("width", browserWidth);
              $("#map").css("height", browserHeight);
              mapChart.resize();
            }
          }
          $(window).bind('changemenu', _self.changemenu);
          _self.mapResize = function() {
            var browserHeight = $(".single-page-con").height();
            var browserWidth = $(".single-page-con").width();
            let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            isFullscreen = !!isFullscreen;
            if (isFullscreen) {
              browserHeight = $("body").height()
              browserWidth = $("body").width()
            }
            $("#map").css("height", browserHeight);
            $("#map").css("width", browserWidth);
            $("#mapContainer").css("height", browserHeight);
            $(".ivu-table-body").css("height", browserHeight * 0.5);
            $(".ivu-table").css("height", browserHeight * 0.5 + 32);
            // $(".ivu-table-body").css("max-height", browserHeight * 0.5 + 32);
            $(".ivu-table-body").css("overflow", "hidden");
            $(".ivu-table-wrapper").css("height", browserHeight * 0.5 + 32);
            mapChart.resize();
          }
          window.addEventListener('resize', _self.mapResize, false);
  
          _self.timeTask = setInterval(function() {
            refreshData();
          }, 60000);
  
          function refreshData() {
            if (!mapChart) {
              return;
            }
            axios.all([util.logAjax.get('/api/log/v1/?Action=DescribeLinkData'), _self.getWarning('beijing'), _self.getWarning('nanjing'), _self.getWarning('guangzhou'), _self.getZhicha()])
              .then(axios.spread(function(mapresp, beijingresp, nanjingresp, guangzhouresp, zhicharesp) {
                // debugger;
                // _self.loading = false;
                //更新数据
                // var mapresp={};
  
                if (_self.currentCity == 'all') {
                  _self.data1 = _self.getAllWarning(beijingresp, nanjingresp, guangzhouresp);
                }
                var option = mapChart.getOption();
                var data = mapresp.data
                data.xy["北京市"] = ["116.405285", "39.904989"]
                data.xy["广州市"] = ["113.280637", "23.125178"]
                data.xy["南京市"] = ["118.767413", "32.041544"]
                // 虚线
                // option.series[0].markLine.data = data.position
                // 经纬度
                let zhichaData = [];
                if (zhicharesp.data.code === 0 && zhicharesp.data.data.length != 0) {
                  for (let i of zhicharesp.data.data) {
                    zhichaData.push({
                      name: i.name,
                      zhicha: i.priority,
                      detail: i.datas,
                      itemStyle: {
                        normal: {
                          color: i.priority === "levleOne" ? 'red' : '#ff3249',
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
                          color: i.priority === "levleOne" ? 'red' : '#ff3249',
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
                option.series[0].data =zhichaData
                option.series[0].geoCoord = data.xy
                //直播 线路 和 涟漪圆圈
                // option.series[1].markLine.data = data.move_line.zhibo.beijing_line_zhibo
                // option.series[1].markPoint.data = data.move_line.zhibo.bj_line_end_zhibo
                // option.series[3].markLine.data = data.move_line.zhibo.nanjing_line_zhibo
                // option.series[3].markPoint.data = data.move_line.zhibo.nj_line_end_zhibo
                // option.series[5].markLine.data = data.move_line.zhibo.guangzhou_line_zhibo
                // option.series[5].markPoint.data = data.move_line.zhibo.gz_line_end_zhibo
                // // 点播 线路 和涟漪圆圈
                // option.series[2].markLine.data = data.move_line.dianbo.beijing_line_dianbo
                // option.series[2].markPoint.data = data.move_line.dianbo.bj_line_end_dianbo
                // option.series[4].markLine.data = data.move_line.dianbo.nanjing_line_dianbo
                // option.series[4].markPoint.data = data.move_line.dianbo.nj_line_end_dianbo
                // option.series[6].markLine.data = data.move_line.dianbo.guangzhou_line_dianbo
                // option.series[6].markPoint.data = data.move_line.dianbo.gz_line_end_dianbo
                option.legend.selected = selected || option.legend.selected
                mapChart.hideLoading();
                // 告警
                alertify.set({
                  delay: 10000
                });
                let count = 0;
                if (beijingresp.data.length != 0) {
                  let tip = _self.countWarning(beijingresp)
                  tip.name = "北京"
                  if (tip["一级告警"] != undefined) {
                    _self.beijing_img = 'image://dist/warning_level1.png'
                  } else {
                    _self.beijing_img = 'image://dist/warning_level2.png'
                  }
                  _self.beijingWarning[0] = tip
                  option.series[1].markPoint.data = _self.beijingWarning
                  option.series[1].markPoint.symbol = _self.beijing_img
                  if (_self.currentCity == 'beijing') {
                    _self.data1 = beijingresp.data
                  }
                  for (let i of beijingresp.data) {
                    if (i.priority == "levleOne") {
                      if ($("#map")[0] && (!selected || selected['告警'])) {
                        alertify.log("<h3>北京一级告警</h3>机器：" + i.name + "</br>故障：" + i.description, "error");
                        count++
                      }
                    }
                  }
                }
                if (nanjingresp.data.length != 0) {
                  let tip = _self.countWarning(nanjingresp)
                  tip.name = "南京市"
                  if (tip["一级告警"] != undefined) {
                    _self.nanjing_img = 'image://dist/warning_level1.png'
                  } else {
                    _self.nanjing_img = 'image://dist/warning_level2.png'
                  }
                  _self.nanjingWarning[0] = tip
                  option.series[2].markPoint.data = _self.nanjingWarning
                  option.series[2].markPoint.symbol = _self.nanjing_img
                  if (_self.currentCity == 'nanjing') {
                    _self.data1 = nanjingresp.data
                  }
                  for (let i of nanjingresp.data) {
                    if (i.priority == "levleOne") {
                      if ($("#map")[0] && (!selected || selected['告警'])) {
                        alertify.log("<h3>南京一级告警</h3>机器：" + i.name + "</br>故障：" + i.description, "error");
                        count++
                      }
                    }
                  }
                }
                if (guangzhouresp.data.length != 0) {
                  let tip = _self.countWarning(guangzhouresp)
                  tip.name = "广州市"
                  if (tip["一级告警"] != undefined) {
                    _self.guangzhou_img = 'image://dist/warning_level1.png'
                  } else {
                    _self.guangzhou_img = 'image://dist/warning_level2.png'
                  }
                  _self.guangzhouWarning[0] = tip
                  option.series[3].markPoint.symbol = _self.guangzhou_img
                  option.series[3].markPoint.data = _self.guangzhouWarning
                  if (_self.currentCity == 'guangzhou') {
                    _self.data1 = guangzhouresp.data
                  }
                  for (let i of guangzhouresp.data) {
                    if (i.priority == "levleOne") {
                      if ($("#map")[0] && (!selected || selected['告警'])) {
                        alertify.log("<h3>广州市一级告警</h3>机器：" + i.name + "</br>故障：" + i.description, "error");
                        count++
                      }
                    }
                  }
                }
                _self.audioWarning(count)
                mapChart.clear();
                mapChart.setOption(option);
                mapChart.resize();
              }))
          }
        }))
  
    },
    beforeDestroy() {
      clearInterval(this.timeTask)
      window.removeEventListener('resize', this.mapResize, false);
      $(window).unbind('changemenu', this.changemenu);
    },
  }
</script>

<style>
  .noFullScreen {
    margin: -9px -10px -20px -10px;
  }
  
  .fullscreen {
    position: absolute;
    z-index: 999;
    right: 30px;
    top: 30px;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
  
  .warningList {
    position: absolute;
    z-index: 999;
    left: 0px;
    top: 65px;
    width: 325px;
    height: 200px;
    padding: 0px;
    cursor: pointer;
  }
  
  #paparazzi {
    z-index: -1;
    width: 0px;
    height: 0px;
    top: -100px
  }
</style>
  