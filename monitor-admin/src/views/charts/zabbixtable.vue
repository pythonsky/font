<template>
    <Card style="width:100%; margin-top:10px" id="channelSearchCard">
        <p slot="title">
            <!-- <Icon type="ios-film-outline"></Icon> -->
            <Icon type="funnel"></Icon>
            资源利用率
        </p>
        <Row>
            <Form :model="searchForm" :rules="formRules" inline ref="form" onsubmit="return false;">
                <DatePicker ref="time" start-date="" v-model="searchForm.input" type="datetimerange" placeholder="起始时间" style="width: 300px" format="yyyy-MM-dd HH:mm:ss"></DatePicker>
                <!-- <Input v-model="input" @on-change="handleSearch" placeholder="请输入频道名称或者频道id" style="width: 200px" /> -->
                <span @click="handleSearch" ref="search"><Button type="primary" icon="search" >搜索</Button></span>
                <!-- <span style="margin: 0 10px;"><Button @click="reset" type="primary" icon="refresh">重置</Button></span> -->
                <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
                <Button type="primary"  @click="exportExcel" icon="document-text" :disabled=disabled>下载表格数据</Button>
            </Form>
        </Row>
        <Row class="margin-top-10 searchable-table-con1">
            <Table border :columns="columns" :data="tableData" ref="tableExcel" :loading="loading"></Table>
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
    import table2excel from '@/libs/table2excel.js';
    var dateFormat = require('dateformat');
    export default {
        name: "zabbixtable",
        data() {
            return {
                // input: "",
                DefaultPageSize: 10,
                current: 1,
                tableData: [],
                pageSizeOpts: [10, 20, 30, 50, 100, 500],
                placement: "top",
                searchForm: {
                    input: []
                },
                formRules: {
                    input: {
                        required: true,
                        type:"array",
                        len: 2,
                        message: '请输入查询日期！',
                        trigger: 'change'
                    },
                },
                columns: [{
                        key: "province",
                        title: "省份"
                    },
                    {
                        key: "attribute",
                        title: "节点属性"
                    },
                    {
                        key: "group_number",
                        title: "Catch上线数量(台)",
                        "sortable": true,
                    },
                    {
                        key: "cdn",
                        title: "cdn能力（Gbps）",
                        "sortable": true,
                    },
                    {
                        key: "outcoming_max",
                        title: "*月*日峰值（Gbps)",
                        "sortable": true,
    
                    },
                    {
                        key: "utilization_ratio",
                        title: "资源峰值利用率(%)",
                        "sortable": true,
                    }
                ],
                data: [],
                loading: false,
                originData: [],
                startTime:'',
                endTime:''
            };
        },
        methods: {
            exportExcel() {
                this.$refs.tableExcel.exportCsv({
                    filename: this.excelFileName,   
                    columns:this.columns,
                    data: this.originData
                });
                // table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);
            },
            handleSearch() {
                this.loadData();
                let searchData = [];
                // for (let i of this.originData) {
                //     if (
                //         i["频道名称"].toLowerCase().indexOf(this.input.toLowerCase()) > -1 ||
                //         i["频道ID"].toLowerCase().indexOf(this.input.toLowerCase()) > -1
                //     ) {
                //         searchData.push(i);
                //     }
                // }
                this.data = searchData;
                this.current = 1;
                this.tableData = this.data.slice(0, this.DefaultPageSize);
            },
            reset() {
                this.input = "";
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
                // debugger
                // let input=this.input
                // this.$refs.form.validate((valid) => {
                //     debugger
                //     if (valid) {
                    if(this.$refs.time.value.length==0||this.$refs.time.value[0]==null){
                        this.$Message.warning('请选择时间段');
                        this.originData=[];
                        this.tableData = []
                        this.data = []
                        return
                    }
                        util.ajax.get("/api/monitor/v1/zabbix_table", {
                                params: {
                                    // startTime: _self.searchForm.input === "1" ? "all" : dateFormat(new Date(_self.searchForm.input[0]), "yyyy-mm-dd HH:MM:ss"),
                                    startTime:  dateFormat(new Date(_self.searchForm.input[0]), "yyyy-mm-dd HH:MM:ss"),
                                    // endTime: _self.searchForm.input === "1" ? "all" : dateFormat(new Date(_self.searchForm.input[1]), "yyyy-mm-dd HH:MM:ss"),
                                    endTime: dateFormat(new Date(_self.searchForm.input[1]), "yyyy-mm-dd HH:MM:ss"),
                                }
                            })
                            .then(function(response) {
                                // console.log(response.data.data)
                                if (response.data.code == 0) {
                                    _self.originData = response.data.data;
                                    _self.data = _self.originData;
                                    _self.tableData = _self.data.slice(0, _self.DefaultPageSize);
                                    _self.startTime=dateFormat(new Date(_self.searchForm.input[0]), "yyyy-mm-dd HH_M_ss")
                                    _self.endTime=dateFormat(new Date(_self.searchForm.input[1]), "yyyy-mm-dd HH_M_ss")
                                } else if (response.data.code == 1) {
                                    alert(response.data.msg);
                                }
                            });
                //     } else {
                //         debugger
                //         this.tableData = []
                //         this.data = []
                //         return;
                //     }
                // })
    
            }
        },
        computed: {
            getTotle() {
                return this.data.length;
            },
            disabled() {
                return this.originData.length === 0 ? true : false
            },
            excelFileName() {
                return this.startTime + "至" + this.endTime + "资源利用率统计"
            }
        },
        mounted() {
            // this.loadData();
            let _self = this;
            $(document).keydown(function(event) {
                if (event.keyCode == 13) {
                    $(_self.$refs.search).click();
                }
            });
            util.ajax.interceptors.request.use(function(config) {
                if (config.url.includes("/api/monitor/v1/zabbix_table")) {
                    _self.loading = true;
                }
                return config;
            });
            util.ajax.interceptors.response.use(function(config) {
                if (config.request.responseURL.includes("/api/monitor/v1/zabbix_table")) {
                    _self.loading = false;
                }
                return config;
            })
        }
    };
</script>

<style>
    
</style>

