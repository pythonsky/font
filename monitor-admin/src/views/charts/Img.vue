<template>
   <Card style="width:100%; margin-top:10px">
        <p slot="title">
            <!-- <Icon type="ios-film-outline"></Icon> -->
            <Icon type="arrow-graph-up-right"></Icon>
            {{title}}
        </p>
        <span slot="extra" style="margin-right:5px"><Icon type="clock"></Icon></span>
        
         <Select v-model="hour" slot="extra" size="small" style="width:80px">
             <Option v-for="item in periodList" :value="item.value" :key="item.value">{{ item.label }}</Option>
         </Select>
        <img v-bind:src="getImgUrl(local,hour,imgWidth,imgHeight)" ref="img">
    </Card>
</template>
<script>
import util from "@/libs/util.js";
export default {
  name: "cardImg",
  data() {
      return {
         size: "small",
         props: ['title','local'],
         baseUrl: util.ajaxUrl,
         imgWidth:800,
         imgHeight:200,
         timeTask:null,
         hour:1,
         periodList:[
             {value:1,label:"一小时"},
             {value:2,label:"两小时"},
             {value:6,label:"六小时"},
             {value:24,label:"一天"},
             {value:48,label:"两天"},
             {value:24*7,label:"七天"},
             {value:24*30,label:"一个月"},
             {value:24*30*6,label:"六个月"},
             {value:24*30*12,label:"一年"},
         ]
      }
  },
  methods:{
    h2s(hour) {
      return 3600 * hour;
    },
    getImgUrl(local, period, width, height) {
      const graphid = {
        beijing: 2360,
        nanjing: 2412,
        guangzhou: 4745,
        epg: 14547
      };
      //参数错返回北京的graphid
      return this.baseUrl +"/api/monitor/v1/zabbix_image?graphid=" +graphid[local] + "&period=" +this.h2s(period) +"&width=" +width +"&height=" +height
      ;
    }
  },
  mounted(){
      var _self=this
      this.timeTask=setInterval(function(){
        _self.$refs.img.setAttribute("src",_self.getImgUrl(_self.local,_self.hour,_self.imgWidth,_self.imgHeight)+"&v="+Math.random())
      },5000)
     
  },
  beforeDestroy(){
     clearInterval(this.timeTask)
  },
  props: {
    local: {
      type: String,
      default() {
        return "beijing"
      }
    },
    title:{
        type:String,
        default(){
            return "北京中心流量汇总"
        }
    }
  }
};
</script>
<style>
img{
width:100%;
height:120%;
}
</style>
