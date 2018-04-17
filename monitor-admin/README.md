### 监控系统前端界面

#### 基于iView Admin v1.2.0



[![](https://img.shields.io/travis/iview/iview-admin.svg?style=flat-square)](https://travis-ci.org/iview/iview-admin)
[![vue](https://img.shields.io/badge/vue-2.5.2-brightgreen.svg?style=flat-square)](https://github.com/vuejs/vue)
[![iview ui](https://img.shields.io/badge/iview-2.7.2-brightgreen.svg?style=flat-square)](https://github.com/iview/iview)



## Install
```bush
// install dependencies
npm install
```
## Run
### Development
```bush
npm run dev
```
### 
### docker部署



> 本项目依赖node环境,依赖node包管理工具npm

安装依赖

> npm install

打包生成production环境代码

> npm run build



切换到当前dockerfile所在目录

生成镜像：

> ​	docker build -t monitor_admin:v0.1.0 ./

运行镜像：

> ​	docker run -d -p 9005:9005  -v $PWD/dist:/monitor/admin monitor_admin:v0.1.0

以后每次更新代码之后不需要重新build镜像，而只需要重新执行命令：npm run build

#### 记录日志并运行镜像;

创建日志文件

> mkdir log

> cd log

> touch access.log

> touch error.log

运行镜像：

> cd ..

> docker run -d -p 9005:9005 -v $PWD/dist:/monitor/admin  -v $PWD/log:/var/log/nginx monitor_admin:v0.1.0

> tail -f log/access.log

#### 备注：

需要端口9005

日志文件为log/access.log 和 log/error.log

访问地址 http://localhost:9005/