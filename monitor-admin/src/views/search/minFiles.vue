<template>
    <Card style="width:100%; margin-top:10px" id="channelSearchCard">
        <p slot="title">
            <!-- <Icon type="ios-film-outline"></Icon> -->
            <Icon type="funnel"></Icon>
            小文件查询
        </p>
        <Row>
            <Form :model="searchForm" :rules="formRules" inline ref="form"  onsubmit="return false;" >
                <FormItem prop="input">
                    <Input v-model="searchForm.input"  placeholder="请输入内容ID或内容名称" style="width: 200px" />
                </FormItem>
                <span @click="handleSearch" style="margin: 0 10px;" ref="search"><Button type="primary" icon="search" >搜索</Button></span>
                <Button @click="reset" type="primary" icon="refresh">重置</Button>
            </Form>
        </Row>
        <Row class="searchable-table-con1">
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
        name:'minFiles',
        data() {
            return {
                loading:false,
                searchForm: {
                    input: ""
                },
                formRules: {
                    input: [{
                        required: true,
                        message: '请输入查询条件！',
                        trigger: 'blur'
                    }],
                },
                DefaultPageSize: 10,
                current: 1,
                tableData: [],
                pageSizeOpts: [10, 20, 30, 50, 100, 500],
                placement: "top",
                columns: [{
                        key: '节目名称',
                        title: '节目名称'
                    }, {
                        key: '内容ID',
                        title: '内容ID'
                    }, {
                        key: 'CMSID',
                        title: 'CMSID',
                        render: (h, params) => {
                            const row = params.row;
                            // const text = row['CMSID']
                            return h('p', {
                                props: {}
                            }, row['CMSID'] ? row['CMSID'] : "暂无")
                        }
                    },
    
                    {
                        key: '注入时间',
                        title: '注入时间',
                    },
                    {
                        key: '播放地址',
                        title: '播放地址',
                    },
                    {
                        key: '热    度',
                        title: '热度',
                    },
                ],
                data: [],
                originData: []
            }
        },
        methods: {
            handleSearch() {
                this.current = 1
                this.loadData()
            },
            reset() {
                this.searchForm.input = ""
                // this.handleSearch()
                this.tableData = []
                this.data=[]
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
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        util.ajax.get('/api/monitor/v1/little', {
                            params: {
                                arg: this.searchForm.input.trim()
                            }
                        }).then(function(response) {
                            // console.log(response.data.data)
                            if (response.data.code === 0 || response.data.code === -1) {
                                _self.originData = response.data.data
                                _self.data = _self.originData
                                _self.tableData = _self.data.slice(0, _self.DefaultPageSize)
                            } else {
                                alert("服务器异常！")
                            }
                        })
                    }else{
                        this.tableData=[]
                        this.data=[]
                        return;
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
            // this.loadData()
            let _self = this
            util.ajax.interceptors.request.use(function(config) {
               if (config.url.includes("/api/monitor/v1/little")) {
                    _self.loading = true;
                }
                return config;
            });
            util.ajax.interceptors.response.use(function(config) {
                if (config.request.responseURL.includes("/api/monitor/v1/little")) {
                    _self.loading = false;
                }
                return config;
            })
            $(document).keydown(function(event) {
                if (event.keyCode == 13  ) {
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
