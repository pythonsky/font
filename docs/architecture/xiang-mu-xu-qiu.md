## 2. 监控系统

#### 2.1 监控模块梳理

中国电信天翼高清CDN服务监控系统通过监控代理可以收集目标主机相关运行状态及相关业务状态扩展，主要功能模块有：

#### ![](/assets/import.png)2.2 基础监控功能需求

##### 2.2.1 CPU

###### **Nice time**

###### **Iowait time**

###### **System time**

###### **User time**

###### **Softirq time**

###### **Steal time**

###### **Interrupt time**

###### **Idle time**

###### **Context switches per second**

###### **1分钟内平均负载**

###### **5分钟内平均负载**

###### **15分钟内平均负载**

###### **总数探测**

###### **当前运行数探测**

#### 2.2.2 内存

###### 总量

###### 使用量

###### Swap使用量

#### 2.2.3 磁盘

磁盘自动发现

###### 各磁盘总量

###### 各磁盘使用量

#### 2.2.4 网络

网卡自动发现

各网卡读速度

各网卡写速度

服务器信息

/etc/passwd状态

重启时间

当前时间

Host name

最大文件打开数

Uname

uptime

#### 2.2.5 监控代理

存活状态

版本信息

#### 2.3 服务监控必要功能需求

#### 2.3.1 TCP状态

CLOSED

###### CLOSE\_WAIT

###### CLOSING

###### ESTABLISHED

###### FIN\_WAIT1

###### FIN\_WAIT2

###### LAST\_ACK

###### LISTEN

###### SYN\_RECV

###### SYN\_SEND

###### TIME\_WAIT

#### 2.3.2 IO状态

Average disk operations time

Average queue size

Average requests size

Await

Read from device per second

Read operations per second

Read requests merge per second

Utilization

Write operations per second

Write requests merge per second

Written to the device per second

#### 2.3.3 点播存储中心监控

active MON

###### Cluster health

###### Operation

###### OSD count

###### OSD in

###### OSD up

###### PG active

###### PG backfill

###### PG clean

###### PG creating

###### PG degraded

###### PG degraded percent

###### PG down

###### PG incomplete

###### PG inconsistent

###### PG peering

###### PG recovering

###### PG remapped

###### PG repair

###### PG replay

###### PG scrubbing

###### PG splitting

###### PG stale

###### PG total

###### PG wait-backfill

###### rados free space

###### rados total space

###### rados used space

###### Read Speed

###### Write Speed

#### 2.4 内容中心业务监控

#### 2.4.1 直播中心

###### 服务存活检查

###### 版本号获取

###### 频道列表

###### 频道状态

###### 一级M3U8监测

###### 二级M3U8监测

###### 频道实时监播

#### 2.4.2 点播转码中心

服务存活检查

版本号获取

当前转码任务列表

#### 2.4.3 直/点播源站

服务存活检查

版本号获取

频道M3U8检查

LVS状态

LVS有效连接数

LVS无效连接数

直播实时监播

点播查询预览

#### 2.4.4 中心缓存

服务存活检查

版本号获取

直播实时监播

#### 2.5 直播视频质量检测分析

M3U8连续性监测

PTS/DTS连续性监测

码率分析

PSNR

SSIM

#### 2.6 组播监控

UDP丢包分析

TS连续计数器分析

错误状态统计

#### 2.7 中心日志分析聚合处理

###### Kafka日志集群建设

###### 日志采集客户端

###### 客户端部署

###### 关键字过滤

###### 关键信息逻辑提取



