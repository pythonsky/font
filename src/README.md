## 监控接口模块V0.1.0

​	本模块为监控系统提供后台接口。

框架支持：

- django v1.11.4
- restframework
- python2.7 




#### docker

切换到当前dockerfile所在目录

生成镜像：

> ​	docker build -t monitor_api:v0.1.0 ./

运行镜像：

> ​	docker run -d -p 9004:9004 monitor_api:v0.1.0

#### 备注

需要端口：9004