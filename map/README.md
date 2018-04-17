## 监控前端页面模块V0.1.0

​	本模块为监控系统前段页面模块。


#### docker

切换到当前dockerfile所在目录

生成镜像：

> ​	docker build -t monitor_front:v0.1.0 ./

运行镜像：

> ​	docker run -d -p 9005:9005   monitor_front:v0.1.0

#### 记录日志并运行镜像;

创建日志文件

> mkdir log

> cd log

> touch access.log

> touch error.log

运行镜像：

> cd ..

> docker run -d -p 9005:9005   v $PWD/log:/var/log/nginx monitor_front:v0.1.0

> tail -f log/access.log

#### 备注：

需要端口9005

日志文件为log/access.log 和 log/error.log

访问地址 http://localhost:9005/map/


