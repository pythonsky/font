<template>
    <Card style="width:100%; margin-top:10px" id="channelSearchCard">
        <p slot="title">
            <!-- <Icon type="ios-film-outline"></Icon> -->
            <Icon type="funnel"></Icon>
            设备查询
        </p>
        <Row>
            <Input v-model="input" @on-change="handleSearch" placeholder="请输入直播设备IP或点播设备IP" style="width: 200px" />
            <span @click="handleSearch" style="margin: 0 10px;" ref="search"><Button type="primary" icon="search" >搜索</Button></span>
            <Button @click="reset" type="primary" icon="refresh">重置</Button>
        </Row>
        <Row class="margin-top-10 searchable-table-con1">
            <Table border :columns="columns" :data="tableData" :loading="loading"></Table>
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
        name: 'SP_search',
        data() {
            return {
                input: "",
                loading: false,
                DefaultPageSize: 10,
                current: 1,
                tableData: [],
                pageSizeOpts: [10, 20, 30, 50, 100, 500],
                placement: "top",
                columns: [{
                        key: '设备IP',
                        title: '设备IP',
    
                    }, {
                        key: '设备类型',
                        title: '设备类型'
                    },
                    {
                        key: '设备状态',
                        title: '设备状态'
                    },
                    {
                        key: '服务类型',
                        title: '服务类型'
                    },
                    {
                        key: '设备锁',
                        title: '设备锁',
                    },
                    {
                        key: '运行频道',
                        title: '运行频道',
                    },
                    {
                        key: '软件版本',
                        title: '软件版本',
                    },
    
    
                ],
                data: [],
                originData: []
            }
        },
        methods: {
            handleSearch() {
                let searchData = []
                for (let i of this.originData) {
                    // if (i['频道名称'].includes(this.input)||i['频道ID'].includes(this.input)){
                    //     searchData.push(i)
                    // }
                    if (i['设备IP'].toLowerCase().indexOf(this.input.toLowerCase()) > -1) {
                        searchData.push(i)
                    }
                }
                this.data = searchData
                this.current = 1
                this.tableData = this.data.slice(0, this.DefaultPageSize)
            },
            reset() {
                this.input = ""
                this.handleSearch()
            },
            changePage(clickPage) {
                this.tableData = this.data.slice((clickPage - 1) * this.DefaultPageSize, clickPage * this.DefaultPageSize)
            },
            pageSizeChange(newPageSize) {
                this.tableData = this.data.slice(0, newPageSize)
                this.DefaultPageSize = newPageSize
            },
            loadData() {
                let _self = this
                util.ajax.get('/api/monitor/v1/device', {
                    params: {
                        arg: this.input === "" ? "all" : this.input
                    }
                }).then(function(response) {
                    // console.log(response.data.data)
                    if (response.data.code == 0) {
                        _self.originData = response.data.data
                        _self.data = _self.originData
                        _self.tableData = _self.data.slice(0, _self.DefaultPageSize)
                    } else {
                        // alert("服务器异常！")
                    }
                })
            }
        },
        computed: {
            getTotle() {
                return this.data.length
            },
        },
        mounted() {
            let _self = this
            util.ajax.interceptors.request.use(function(config) {
                if (config.url.includes("/api/monitor/v1/device")) {
                    _self.loading = true;
                }
                return config;
            });
            util.ajax.interceptors.response.use(function(config) {
                if (config.request.responseURL.includes("/api/monitor/v1/device")) {
                    _self.loading = false;
                }
                return config;
            })
            this.loadData()
            $(document).keydown(function(event) {
                if (event.keyCode == 13) {
                    $(_self.$refs.search).click()
                }
            })
    
    
    
        }
    
    }
</script>

<style>
    #channelSearchCard .margin-top-10 {
        margin-top: 10px !important;
    }
</style>
