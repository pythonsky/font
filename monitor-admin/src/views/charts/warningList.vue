<template>
<div class="card" id="warningListCard">

  <Card :bordered="false" :padding=0>
    <p slot="title">告警列表</p>
    <!-- <a href="#" slot="extra" @click.prevent="changeLimit">
      <Icon type="ios-loop-strong"></Icon>
      刷新
    </a> -->
     <radio-group slot="extra" v-model="city" type="button" size="small" style="margin-right:15px" @on-change="handleChange">
        <radio label="全部"></radio>
        <radio label="北京"></radio>
        <radio label="南京"></radio>
        <radio label="广州"></radio>
    </radio-group>
     <!-- <i-switch slot="extra" size="large" style="margin-right:15px" :disabled="disabled" :value="switchValue">
        <span slot="open">全部</span>
        <span slot="close">部分</span>
    </i-switch> -->
    <a href="#" slot="extra" @click=close>
      <Icon type="close-round"></Icon>
      <!-- 收起 -->
    </a>
      
    <Table :columns="columns" :data="datalist" :row-class-name="rowClassName" :height="height" :size="size" :loading="loading"></Table>
  </Card>
</div>
</template>
<script>
import TweenMax from 'gsap'
export default {
  props: {
    columns: {
      type: Array,
      default () {
        return [];
      }
    },
    datalist: {
      type: Array,
      default () {
        return [];
      }
    },
    loading:{
      type:Boolean,
      default () {
        return false;
      }
    }
  },
  components: {},
  data() {
    return {
      // city:"南京",
      height: 550,
      size: "small",
      props: ['columns1', 'datalist','loading'],
    };
  },
  computed: {
     city:{
      get:function(){
        return this.$store.state.app.currentCity;
      },
      set:function(newValue){
        this.$store.commit('setCurrentCity',newValue);
      }
    },
  },
  methods: {
   
    handleChange(newValue){
      // console.log("changevalue"+newValue)
      this.$emit("changeCity",newValue)
    },
    rowClassName(row, index) {
      if (row.priority == 'levleTwo') {
        return 'level2';
      } else if (row.priority == "levleThree") {
        return 'level3';
      }
      else if (row.priority == "levleOne") {
        return 'level1';
      }
      else if (row.priority == "msg") {
        return 'level4';
      }

    },
    close() {
      TweenMax.to($('.warningList')[0] || $('#warningListCard'), 1, {
        ease: Power3.easeInOut,
        css: {
          position: "absolute",
          left: -360
        }
      });
    }
  },
  watch: {},
  mounted() {},
  created() {}
};
</script>
<style >


#warningListCard .ivu-card-head {
  background: #262626 !important;
  padding: 8px 8px !important
}
#warningListCard .ivu-card-head p{
  color:white !important;
}
.ivu-table .level1 td {
  background: #E45959;
  color: #734d00 ;
}

.ivu-table .level2 td {
  background-color: #E97659;
  color: #734d00;
}
.ivu-table .level3 td {
  background-color:#FFA059;
  /* color: #cf7534; */
  color: #734d00;
}
.ivu-table .level4 td {
  background-color: rgb(36, 158, 206);
  color: #734d00;
}

#warningListCard .ivu-card-extra {
  right: 9px !important;
  top: 9px !important;
}
#warningListCard .ivu-card {
  background: none !important;
  border:none
}
/* #warningListCard .ivu-table-header{
  background: none !important
} */
#warningListCard .ivu-table-header{
    background: #262626 !important;
}
#warningListCard .ivu-table,.ivu-table-body{
  background: none !important
}
#warningListCard .ivu-table th{
  background: #262626 !important;
  color: white;
}
#warningListCard .ivu-table-wrapper{
  border: none !important;
}
#warningListCard .ivu-table:after,#warningListCard  .ivu-table:before{
  background: none !important;
}
#warningListCard .ivu-table-cell{
  padding-left:5px !important;
  padding-right:5px !important;
}
#warningListCard .ivu-radio-group-button .ivu-radio-wrapper {
    color: #eaecf2;
    cursor: pointer;
    background: #281f1f;
}

#warningListCard .ivu-radio-group-button.ivu-radio-group-small .ivu-radio-wrapper {
    height: 18px;
    line-height: 18px;
    padding: 0 10px;
    font-size: 10px;
}
</style>


