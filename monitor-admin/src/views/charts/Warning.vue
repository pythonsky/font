<template>
  <div id="warning">
  
  
    <!-- <div style="margin:5px 10px 5px 5px; float:none"> -->
    <Row style="margin:5px 0px 5px 0px;" type="flex" justify="space-around" class="code-row-bg" :gutter="16">
      <!-- <div id="pie" style="width:calc(35% - 20px)"></div>
                  <div id="line" style="width:calc(65% - 20px)"></div> -->
      <Col :xs="24" :sm="24" :md="24" :lg="{ span: 8 }">
      <div id="pie" style="width:calc(100% - 10px)"></div>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="{ span: 16 }">
      <div id="line" style="width:calc(100% - 10px)"></div>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="{ span: 12 }">
      <cardImg :local="beijing" :title="beijingTitle"></cardImg>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="12">
      <cardImg :local="guangzhou" :title="guangzhouTitle"></cardImg>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="{ span: 12 }">
      <cardImg :local="nanjing" :title="nanjingTitle"></cardImg>
      </Col>
      <Col :xs="24" :sm="24" :md="24" :lg="12">
      <cardImg :local="epg" :title="epgTitle"></cardImg>
      </Col>
    </Row>
  
    <!-- </div> -->
  </div>
</template>

<script>
  import util from "@/libs/util.js";
  import Cookies from "js-cookie";
  import axios from "axios";
  import cardImg from "@/views/charts/Img.vue";
  var qs = require("qs");
  export default {
    name: "Warnings",
    components: {
      cardImg
    },
    data() {
      return {
        warningResize: null,
        warningChangeMenu:null,
        msg: "Warning!!!!!!!!!!!!!!!",
        nanjing: 'nanjing',
        beijing: 'beijing',
        guangzhou: 'guangzhou',
        epg: 'epg',
        nanjingTitle: "南京中心进出流量汇总",
        beijingTitle: "北京中心进出流量汇总",
        guangzhouTitle: "广州中心进出流量汇总",
        epgTitle: "EPG进出流量汇总"
      };
    },
    computed: {
      shrink() {
        return this.$store.state.app.shrink;
      }
    },
    methods: {
      getShrink: function() {
        return this.$store.state.app.shrink;
      },
    },
  
    beforeMount() {},
    mounted() {
      // 初次加载，自适应屏幕
  
      // var browserWidth = $(".single-page-con").width();
      // var browserHeight = $(".single-page-con").height();
      // if (browserWidth < 1200) {
      //   $("#pie").css("width", browserWidth - 10);
      //   // $("#pie").css("height", browserHeight * 0.38);
      //   $("#line").css("width", browserWidth - 10);
      //   // $("#line").css("height", browserHeight * 0.38);
      // } else {
      //   $("#pie").css("width", browserWidth * 0.35 - 10);
      //   // $("#pie").css("height", browserHeight * 0.38);
      //   $("#line").css("width", browserWidth * 0.62 - 10);
      //   // $("#line").css("height", browserHeight * 0.38);
      // }
      var s = this.$store.state.app.shrink;
      let _self = this;
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var lengend = ["一级故障", "二级故障", "三级故障", "提示"];
      var myChart = echarts.init(document.getElementById("pie"));
      var myChart2 = echarts.init(document.getElementById("line"));
      // 绘制图表
      // app.title = '环形图'
      util.ajax
        .get("/mzabbix/zabbix_trigger_get_priority")
        .then(function(response) {
          // console.log(response);
          var formatedata = [];
          if (response.data) {
            for (let i of lengend) {
              if (!response.data[i]) {
                response.data[i] = 0;
              }
              formatedata.push({
                name: i,
                value: response.data[i]
              });
            }
            var option = {
              // color: ["#db4452", "#e9573e", "#f7bc43", "#3cafdc"],
              color: ["#E45959", "#E97659", "#FFA059", "rgb(36, 158, 206)"],
              backgroundColor: "#dedede",
              title: {
                text: "当前故障占比环形图",
                left: "5%"
              },
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: "vertical",
                x: "5%",
                y: "13%",
                data: lengend
              },
              series: [{
                name: "故障级别-占比",
                type: "pie",
                radius: ["50%", "70%"],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: "center"
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: "30",
                      fontWeight: "bold"
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: formatedata
              }]
            };
  
            myChart.setOption(option);
          }
        })
        .catch(function(error) {
          alert("服务器异常");
          console.log(error);
        });
  
      // 折线图ajax
      util.ajax
        .get("/mzabbix/zabbix_trigger_priority_datas")
        .then(function(response) {
          // console.log(response);
          // 折现图
          var dataTotal = function() {
            var data = [];
            for (var i = 0; i < response.data.time.length; i++) {
              data.push(
                response.data.levleOne[i] +
                response.data.levleTwo[i] +
                response.data.levleThree[i] +
                response.data.msg[i]
              );
            }
            return data;
          };
          // console.log(dataTotal());
          var option2 = {
            color: ["#E45959", "#E97659", "#FFA059", "rgb(36, 158, 206)", "#28D704"],
            // color: ["#db4452", "#e9573e", "#f7bc43", "#3cafdc","#28D704"],
            backgroundColor: "#dcdcdc",
            title: {
              text: "告警分析",
              textStyle: {
                color: "#000",
                fontSize: 18,
                fontWeight: "bold"
              },
              subtext: "",
              subtextStyle: {
                color: "#afafaf"
              }
            },
            legend: {
              right: "30%",
              textStyle: {
                color: "#666",
                fontSize: 12
              },
              data: ["一级故障", "二级故障", "三级故障", "提示", "总次数"]
            },
            tooltip: {
              show: true,
              trigger: "axis",
              axisPointer: {
                type: "cross",
                crossStyle: {
                  color: "#afafaf"
                }
              }
            },
            toolbox: {
              right: 20,
              feature: {
                saveAsImage: {},
                restore: {},
                dataView: {},
                dataZoom: {},
                magicType: {
                  type: ["bar"]
                }
                // brush: {},
              }
            },
            grid: {
              left: 5,
              right: 20,
              top: 80,
              bottom: 50,
              containLabel: true
            },
            xAxis: {
              show: true,
              axisLabel: {
                interval: 0,
                rotate: -20,
                margin: 30,
                textStyle: {
                  color: "#706f71",
                  align: "center"
                }
              },
              axisTick: {
                alignWithLabel: true,
                lineStyle: {
                  color: "#706f71"
                }
              },
              data: response.data.time
            },
            yAxis: [{
                type: "value",
                name: "单项次数",
                nameTextStyle: {
                  color: "#706f71"
                },
                axisLabel: {
                  textStyle: {
                    color: "#706f71"
                  }
                },
                axisTick: {
                  alignWithLabel: true,
                  lineStyle: {
                    color: "#706f71"
                  }
                },
                splitLine: {
                  show: false
                }
              },
              {
                type: "value",
                name: "总次数",
                nameTextStyle: {
                  color: "#706f71"
                },
                axisLabel: {
                  textStyle: {
                    color: "#706f71"
                  }
                },
                axisTick: {
                  alignWithLabel: true,
                  lineStyle: {
                    color: "#706f71"
                  }
                },
                splitLine: {
                  show: false
                }
              }
            ],
            dataZoom: [{
                show: true,
                height: 20,
                bottom: 10,
                start: 10,
                end: 60,
                handleIcon: "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
                handleSize: "110%",
                handleStyle: {
                  color: "#d3dee5"
                },
                textStyle: {
                  color: "#000"
                },
                borderColor: "#90979c"
              },
              {
                type: "inside"
              }
            ],
            series: [{
                type: "bar",
                name: "一级故障",
                stack: "单项故障次数",
                data: response.data.levleOne,
                label: {
                  normal: {
                    show: false,
                    position: "insideTop",
                    offset: [0, 20],
                    textStyle: {
                      color: "#000"
                    }
                  },
                  emphasis: {
                    textStyle: {
                      color: "#fff"
                    }
                  }
                }
              },
              {
                type: "bar",
                name: "二级故障",
                stack: "单项故障次数",
                data: response.data.levleTwo,
                label: {
                  normal: {
                    show: false,
                    position: "insideTop",
                    offset: [0, 20],
                    textStyle: {
                      color: "#000"
                    }
                  },
                  emphasis: {
                    textStyle: {
                      color: "#fff"
                    }
                  }
                }
              },
              {
                type: "bar",
                name: "三级故障",
                stack: "单项故障次数",
                data: response.data.levleThree,
                label: {
                  normal: {
                    show: false,
                    position: "insideTop",
                    offset: [0, 20],
                    textStyle: {
                      color: "#000"
                    }
                  },
                  emphasis: {
                    textStyle: {
                      color: "#fff"
                    }
                  }
                }
              },
              {
                type: "bar",
                name: "提示",
                stack: "单项故障次数",
                data: response.data.msg,
                label: {
                  normal: {
                    show: false,
                    position: "insideTop",
                    offset: [0, 20],
                    textStyle: {
                      color: "#000"
                    }
                  },
                  emphasis: {
                    textStyle: {
                      color: "#fff"
                    }
                  }
                }
              },
              {
                type: "line",
                name: "总次数",
                stack: '总次数',
                yAxisIndex: 1,
                data: dataTotal(),
                label: {
                  normal: {
                    show: true,
                    position: "insideTop",
                    offset: [0, -30],
                    textStyle: {
                      color: "#666"
                    }
                  },
                  emphasis: {
                    textStyle: {
                      color: "#fff"
                    }
                  }
                },
                // symbol:'image://../imgs/point1.png',
                symbolSize: 8,
                itemStyle: {
                  normal: {
                    // "color": "#01B3D7",
                    barBorderRadius: 0,
                    label: {
                      show: false,
                      position: "top",
                      formatter: function(p) {
                        return p.value > 0 ? p.value : "";
                      }
                    }
                  }
                },
                lineStyle: {
                  normal: {
                    color: "#28D704",
                    width: 1
                  }
                }
              }
            ]
          };
  
          myChart2.setOption(option2);
        })
        .catch(function(error) {
          alert("服务器异常");
          console.log(error);
        });
  
      _self.warningChangeMenu = function() {
        var browserWidth = $(".single-page-con").width() - 20;
        var browserHeight = $(".single-page-con").height();
        if (!_self.shrink) {
          browserWidth = browserWidth - 140;
        } else {
          browserWidth = browserWidth + 140;
        }
        $("#warning").css("width", browserWidth);
        myChart.resize();
        myChart2.resize();
      }
      // 切换菜单触发重新适应屏幕事件
      $(window).bind("changemenu", _self.warningChangeMenu);
      this.warningResize = function warningResize() {
        var browserWidth = $(".single-page-con").width() - 20;
        $("#warning").css("width", browserWidth);
        myChart.resize();
        myChart2.resize();
      }
  
      $(window).bind('resize', this.warningResize);
    },
    beforeDestroy() {
      $(window).unbind('resize', this.warningResize)
      $(window).bind('changemenu', this.warningChangeMenu)
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #pie {
    width: 50px;
    height: 300px;
    float: left;
    padding: 20px 20px 10px 20px;
    margin: 5px;
    border-radius: 5px;
  }
  
  #line {
    padding: 20px 20px 10px 20px;
    width: 50px;
    height: 300px;
    float: left;
    margin: 5px;
    border-radius: 5px;
  }
  
  #grap {
    width: 100%;
    float: right;
    height: 650px;
    overflow: hidden;
  }
  
  #mapreduce {
    width: 100%;
    float: right;
    height: 850px;
    overflow: hidden;
  }
</style>
