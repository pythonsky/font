<template>
    <Card style="width:100%; margin-top:10px" id="channelSearchCard">
        <p slot="title">
            <!-- <Icon type="ios-film-outline"></Icon> -->
            <Icon type="funnel"></Icon>
            频道查询
        </p>
        <Row>
            <Input v-model="input" @on-change="handleSearch" placeholder="请输入频道名称或者频道id" style="width: 200px" />
            <span @click="handleSearch" style="margin: 0 10px;" ref="search"><Button type="primary" icon="search" >搜索</Button></span>
            <Button @click="reset" type="primary" icon="refresh">重置</Button>
        </Row>
        <Row class="margin-top-10 searchable-table-con1">
            <Table border :columns="columns" :data="tableData"></Table>
        </Row>
        <div style="margin: 10px 10px 20px 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="getTotle" :current.sync="current" :page-size="DefaultPageSize" @on-change="changePage" @on-page-size-change="pageSizeChange" show-sizer show-total :page-size-opts="pageSizeOpts" :placement="placement" ref="page"></Page>
            </div>
        </div>
    
    
    </Card>
</template>

<script>
import util from "@/libs/util.js";
export default {
  name: "channels",
  data() {
    return {
      input: "",
      DefaultPageSize: 10,
      current: 1,
      tableData: [],
      pageSizeOpts: [10, 20, 30, 50, 100, 500],
      placement: "top",
      columns: [
        {
          key: "频道名称",
          title: "频道名称"
        },
        {
          key: "频道ID",
          title: "频道ID"
        },
        {
          key: "频道类型",
          title: "频道类型"
        },
        {
          key: "组播信息",
          title: "组播信息"
        },
        {
          key: "播放地址",
          title: "播放地址",
          width: 310,
          render: (h, params) => {
            const row = params.row;
            const text = row["播放地址"];

            return h(
              "p",
              {
                props: {}
              },
              text +
                "&AUTHINFO=hEcQRKsVzykWOGchNbZ%2BQtq75ir0x%2FLqFvQn4WX1M4T9j8r0EGnjk8qaf2cEdzzAyx5QYUR5Vq5Wa9RKUWlPug%3D%3D&USERTOKEN=%2FPBuDa6rlCu6V3VHuPRQepTiCwaSNeRp"
            );
          }
        },
        {
          key: "原始码率",
          title: "原始码率",
          width: 90
        },
        {
          key: "转码码率",
          title: "转码码率"
        },
        {
          key: "主 设备",
          title: "主设备"
        },
        {
          key: "从 设备",
          title: "从设备"
        },
        {
          key: "重启次数",
          title: "重启次数"
        },
        {
          // key: '重启次数',
          title: "操作",
        render: (h, params) => {
            if(params.row['播放地址'].includes("local")){
              return "";
            }
            return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small',
                        icon:"play"
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                        click: () => {
                          if($("#videoPlayer").css("display")==="none"){
                            $("#videoPlayer").css("display", "block")
                          }
                          $("#channelPlayTitle").html(params.row['频道名称'])
                            this.$store.commit("setChannelPlayUrl","http://116.211.90.85:9901/"+params.row['频道ID']+"/playlist.m3u8?CONTENTID="+params.row['频道ID']+"&AUTHINFO=hEcQRKsVzykWOGchNbZ%2BQtq75ir0x%2FLqFvQn4WX1M4T9j8r0EGnjk8qaf2cEdzzAyx5QYUR5Vq5Wa9RKUWlPug%3D%3D&USERTOKEN=%2FPBuDa6rlCu6V3VHuPRQepTiCwaSNeRp");
                             window.channelPlayer.load(this.$store.state.app.channelPlayUrl)
                        }
                    }
                }, '播放'),
            ]);
        }
        }
      ],
      data: [],
      originData: []
    };
  },
  methods: {
    handleSearch() {
      let searchData = [];
      for (let i of this.originData) {
        // if (i['频道名称'].includes(this.input)||i['频道ID'].includes(this.input)){
        //     searchData.push(i)
        // }
        if (
          i["频道名称"].toLowerCase().indexOf(this.input.toLowerCase()) > -1 ||
          i["频道ID"].toLowerCase().indexOf(this.input.toLowerCase()) > -1
        ) {
          searchData.push(i);
        }
      }
      this.data = searchData;
      this.current = 1;
      this.tableData = this.data.slice(0, this.DefaultPageSize);
    },
    reset() {
      this.input = "";
      this.handleSearch();
    },
    changePage(clickPage) {
      this.tableData = this.data.slice(
        (clickPage - 1) * this.DefaultPageSize,
        clickPage * this.DefaultPageSize
      );
    },
    pageSizeChange(newPageSize) {
      this.tableData = this.data.slice(0, newPageSize);
      this.DefaultPageSize = newPageSize;
    },
    loadData() {
      let _self = this;
      util.ajax
        .get("/api/monitor/v1/channel", {
          params: {
            arg: this.input === "" ? "all" : this.input
          }
        })
        .then(function(response) {
          // console.log(response.data.data)
          if (response.data.code == 0) {
            _self.originData = response.data.data;
            _self.data = _self.originData;
            _self.tableData = _self.data.slice(0, _self.DefaultPageSize);
          } else {
            alert("服务器异常！");
          }
        });
    }
  },
  computed: {
    getTotle() {
      return this.data.length;
    }
  },
  mounted() {
    this.loadData();
    let _sefl = this;
    $(document).keydown(function(event) {
      if (event.keyCode == 13) {
        $(_sefl.$refs.search).click();
      }
    });
  }
};
</script>

<style>
#channelSearchCard .margin-top-10 {
  margin-top: 10px !important;
}
</style>
