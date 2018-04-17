// expand-row.vue
<style >
    .expand-row{
        /*margin-bottom: 6px;*/
    }
    .ivu-table-expanded-cell{
      background: gray !important;
      color: white !important;
      padding: 10px 60px 10px 10px !important;
      /*border: 1px solid black !important;*/
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="6">
                <span class="expand-key">告警时间: </span>
            </Col>
            <Col span="18">
                <span class="expand-value">{{ row.lastchange}}</span>
            </Col>
        </Row>
        <Row class="expand-row">
            <Col span="6">
                <span class="expand-key">持续时间: </span>
            </Col>
            <Col span="18">
                <span class="expand-value">{{ row.duration }}</span>
            </Col>
        </Row>
        <Row class="expand-row">
            <Col span="6">
                <span class="expand-key">描述: </span>
            </Col>
            <Col span="18">
                <span class="expand-value">{{ row.description }}</span>
            </Col>
        </Row>
        <Row class="expand-row">
            <Col span="6">
                <span class="expand-key">注释: </span>
            </Col>
            <Col span="18">
                <span class="expand-value">{{ row.comments }}</span>
            </Col>
        </Row>

    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
