## 监控告警
更新时间: 2018-03-27 14:29:00

## zabbix_trigger_get_priority

### 描述
监控告警环形图各等级数量
### 请求方法
GET
### URI
`/api/monitor/v1/mzabbix/zabbix_trigger_get_priority `
### 示例
请求示例:
```
curl http://ip/api/monitor/v1/mzabbix/zabbix_trigger_get_priority
```
返回类型: **JSON**

返回示例:
```
{"code": 0, "data": {"一级故障": 1, "提示": 8, "二级故障": 2, "三级故障": 13}}
```

提示:
code:0 返回成功  code:1 zabbix服务出错  code:2 数据取不到  code:3 数据库问题  code:4 请求方式不正确  code:5 参数传入不正确  code:6 无法找到传入城市

## zabbix_trigger_priority_datas

### 描述
监控告警柱状图每天各等级数量
### 请求方法
GET
### URI
`/api/monitor/v1/mzabbix/zabbix_trigger_priority_datas`
### 示例
请求示例:
```
curl http://ip/api/monitor/v1/mzabbix/zabbix_trigger_priority_datas
```
返回类型: **JSON**

返回示例:
```
{"code": 0, "data": {"levleOne": [0, 0, 0, 0, 0, 1], "msg": [7, 7, 8, 9, 9, 8], "levleTwo": [1, 1, 1, 1, 0, 0], "levleThree": [13, 37, 15, 11, 9, 7], "time": ["2017-11-23", "2017-11-24", "2017-11-27", "2017-11-28", "2017-11-30", "2017-12-04"]}}
```

提示:
code:0 返回成功  code:1 zabbix服务出错  code:2 数据取不到  code:3 数据库问题  code:4 请求方式不正确  code:5 参数传入不正确  code:6 无法找到传入城市

## zabbix_trigger_get

### 描述
监控告警各项信息
### 请求方法
GET
### URI
`/api/monitor/v1/mzabbix/zabbix_trigger_get`
### 请求参数
| 参数 | 类型 | 必须? | 描述 |
| :----: | :----: | 	:-----: | 	:---- |
| city | String | 是 | 只能传北京、南京、广州，其他城市会报错 |
### 示例
请求示例:
```
curl http://ip/api/monitor/v1/mzabbix/zabbix_trigger_get?city=beijing
```
返回类型: **JSON**

返回示例:
```
{"code": 0, "data": [{"priority": "levleOne", "username": "刘佳", "lastchange": "2017-08-09 17:20:43", "name": "beijing_live_master_36.110.146.35", "duration": "117d9h28m10s", "telephone": "1832551552", "comments": "", "description": "beijing_live_master_36.110.146.35 直播切片转码任务为空"}, {"priority": "levleThree", "username": "赵永健", "lastchange": "2017-11-08 05:22:30", "name": "beijing_ceph_osd_36.110.146.154", "duration": "26d21h26m23s", "telephone": "1507550749", "comments": "", "description": "beijing_ceph_osd_36.110.146.154 无法访问"}, {"priority": "levleThree", "username": "赵永健", "lastchange": "2017-09-16 16:03:30", "name": "beijing_seven_new_106.39.160.38", "duration": "79d10h45m23s", "telephone": "1507550749", "comments": "", "description": "beijing_seven_new_106.39.160.38 无法访问"}, {"priority": "levleThree", "username": "赵永健", "lastchange": "2017-12-05 02:20:24", "name": "beijing_vod_36.110.146.122", "duration": "28m29s", "telephone": "1507550749", "comments": "", "description": "CPUCore0 温度超75度"}, {"priority": "levleThree", "username": "赵永健", "lastchange": "2017-12-05 02:19:55", "name": "beijing_vod_36.110.146.122", "duration": "28m58s", "telephone": "1507550749", "comments": "", "description": "CPUCore1 温度超75度"}, {"priority": "levleThree", "username": "赵永健", "lastchange": "2017-07-13 09:44:00", "name": "beijing_live_master_36.110.146.68", "duration": "144d17h4m53s", "telephone": "1507550749", "comments": "", "description": "beijing_live_master_36.110.146.68 无法访问"}, {"priority": "levleThree", "username": "赵永健", "lastchange": "2017-11-12 13:06:00", "name": "beijing_ceph_osd_36.110.146.175", "duration": "22d13h42m53s", "telephone": "1507550749", "comments": "", "description": "beijing_ceph_osd_36.110.146.175 无法访问"}, {"priority": "msg", "username": "赵强", "lastchange": "2017-11-06 09:56:37", "name": "beijing_ceph_osd_36.110.146.154", "duration": "28d16h52m16s", "telephone": "1832086222", "comments": "", "description": "Too many processes on beijing_ceph_osd_36.110.146.154"}, {"priority": "msg", "username": "赵强", "lastchange": "2017-11-06 09:30:40", "name": "beijing_ceph_osd_36.110.146.154", "duration": "28d17h18m13s", "telephone": "1832086222", "comments": "", "description": "Processor load is too high on beijing_ceph_osd_36.110.146.154"}, {"priority": "msg", "username": "赵强", "lastchange": "2017-11-06 09:24:45", "name": "beijing_ceph_osd_36.110.146.154", "duration": "28d17h24m8s", "telephone": "1832086222", "comments": "OS spends significant time waiting for I/O (input/output) operations. It could be indicator of performance issues with storage system.", "description": "Disk I/O is overloaded on beijing_ceph_osd_36.110.146.154"}, {"priority": "msg", "username": "赵强", "lastchange": "2017-11-29 05:29:46", "name": "beijing_seven_old_ 106.39.160.177", "duration": "5d21h19m7s", "telephone": "1832086222", "comments": "", "description": "磁盘剩余空间不足 20% on volume /"}, {"priority": "msg", "username": "赵强", "lastchange": "2017-11-12 12:51:45", "name": "beijing_ceph_osd_36.110.146.175", "duration": "22d13h57m8s", "telephone": "1832086222", "comments": "", "description": "Processor load is too high on beijing_ceph_osd_36.110.146.175"}, {"priority": "msg", "username": "赵强", "lastchange": "2017-11-12 12:46:50", "name": "beijing_ceph_osd_36.110.146.175", "duration": "22d14h2m3s", "telephone": "1832086222", "comments": "OS spends significant time waiting for I/O (input/output) operations. It could be indicator of performance issues with storage system.", "description": "Disk I/O is overloaded on beijing_ceph_osd_36.110.146.175"}]}
```

提示:
code:0 返回成功  code:1 zabbix服务出错  code:2 数据取不到  code:3 数据库问题  code:4 请求方式不正确  code:5 参数传入不正确  code:6 无法找到传入城市

## login

### 描述
登陆验证
### 请求方法
POST
### URI
`/api/monitor/v1/login`
### 请求参数
| 参数 | 类型 | 必须? | 描述 |
| :----: | :----: | 	:-----: | 	:---- |
| username | String | 是 | 用户名 |
| password | String | 是 | 密码 |
### 示例
请求示例:
```
curl -d "username=liutao&password=12sss3qwe" http://ip/api/monitor/v1/login
```
返回类型: **JSON**

返回示例:
```
{"msg": "Params Error", "code": -1}
```

提示:
code:0 返回成功  code:-1 参数错误  code:-2 认证失败  code:-3 请求方式不正确

## logout

### 描述
退出登陆
### 请求方法
GET
### URI
`/api/monitor/v1/logout`
### 示例
请求示例:
```
curl http://ip/api/monitor/v1/logout
```
返回类型: **JSON**

返回示例:
```
{"msg": "Params Error", "code": -1}
```

提示:
code:0 返回成功  code:-1 参数错误  code:-2 认证失败  code:-3 请求方式不正确

## zabbix_image

### 描述
zabbix汇总图片获取
### 请求方法
GET
### URI
`/api/monitor/v1/zabbix_image`
### 请求参数
| 参数 | 类型 | 必须? | 描述 |
| :----: | :----: | 	:-----: | 	:---- |
| graphid | Int | 是 | 每张图片都有一个指定id |
| period | Int | 是 | 获取多长时间的数据 |
| stime | String | 是 | 获取当前时间 |
| width | Int | 是 | 获取图片宽度 |
| height | Int | 是 | 获取图片高度 |
### 示例
请求示例:
```
curl http://ip/api/monitor/v1/mzabbix/zabbix_image?graphid=xx&period=xx&stime=xx&width=xx&height=xx
```
返回类型: **PNG**

提示:
 code:-3 请求方式不正确
 
## zabbix_quality

### 描述
质差率接口
### 请求方法
GET
### URI
`/api/monitor/v1/zabbix_quality`
### 示例
请求示例:
```
curl http://ip/api/monitor/v1/zabbix_quality
```
返回类型: **JSON**

返回示例:
```
{"code": 0, "data": []}
```

提示:
code:0 返回成功  code:1 zabbix服务出错  code:2 数据取不到

## zabbix_table

### 描述
zabbix企业报表
### 请求方法
GET
### URI
`/api/monitor/v1/zabbix_table`
### 请求参数
| 参数 | 类型 | 必须? | 描述 |
| :----: | :----: | 	:-----: | 	:---- |
| startTime | String | 是 | 起始时间 |
| endTime | String | 是 | 结束时间 |
### 示例
请求示例:
```
curl http://ip/api/monitor/v1/mzabbix/zabbix_table?startTime=2018-03-25/14:40:03&endTime=2018-03-26/14:45:00
```
返回类型: **JSON**

返回示例:
```
{"code": 0, "data": [{"province": "内蒙呼和浩特", "attribute": "省中心节点A", "cdn": 42, "group_number": 8, "outcoming_max": 7.58, "utilization_ratio": 5.54}, {"province": "内蒙通辽", "attribute": "省中心节点B", "cdn": 42, "group_number": 8, "outcoming_max": 4.74, "utilization_ratio": 8.86}, {"province": "山西太原", "attribute": "省中心节点A", "cdn": 48, "group_number": 9, "outcoming_max": 9.43, "utilization_ratio": 5.09}, {"province": "山西太原", "attribute": "省中心节点B", "cdn": 42, "group_number": 8, "outcoming_max": 4.52, "utilization_ratio": 9.29}, {"province": "湖北武汉", "attribute": "省中心节点A", "cdn": 42, "group_number": 8, "outcoming_max": 10.17, "utilization_ratio": 4.13}, {"province": "湖北武汉", "attribute": "省中心节点B", "cdn": 66, "group_number": 12, "outcoming_max": 10.21, "utilization_ratio": 6.46}, {"province": "西藏拉萨", "attribute": "省中心节点", "cdn": 42, "group_number": 8, "outcoming_max": 4.4, "utilization_ratio": 9.55}, {"province": "黑龙江哈尔滨", "attribute": "省中心节点A", "cdn": 42, "group_number": 13, "outcoming_max": 7.67, "utilization_ratio": 5.48}, {"province": "黑龙江哈尔滨", "attribute": "省中心节点B", "cdn": 60, "group_number": 11, "outcoming_max": 8.0, "utilization_ratio": 7.5}]}
```

提示:
code:0 返回成功  code:1 zabbix服务出错  code:-1 请求方式不正确  code:-2 缺少必传参数startTime code:-3 缺少必传参数endTime
