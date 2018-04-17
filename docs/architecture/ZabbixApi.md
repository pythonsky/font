接口url  http://ip/zabbix/api\_jsonrpc.php



Content-Type:application/json



\`\`\`

{

   "jsonrpc": "2.0",

   "method": "user.login",

   "params": {

   "user": "\*\*\*",

   "password": "\*\*\*\*"

},

"id": 0

}

\`\`\`

返回结果

\`\`\`

{"jsonrpc":"2.0","result":"ad4850656fc325d2958e93b52eca02c5","id":0}

\`\`\`



获取主机分组信息

\`\`\`

{

    "jsonrpc": "2.0",

    "method": "hostgroup.get",

    "params": {

        "output": \[

            "groupid",

            "name"

        \]

    },

    "auth": "8e93b52eca02c5",

    "id": 1

}

\`\`\`

host.get方法获取单个主机组下所有的主机ID

\`\`\`



{

    "jsonrpc": "2.0",

    "method": "host.get",

    "params": {

        "output": \[

            "hostid",

            "name"

        \],

        "groupids": "2"

    },

    "auth": "ad4850656fc325d2958e93b52eca02c5",

    "id": 1

}

\`\`\`

获取指定主机的监控项

\`\`\`

{

    "jsonrpc": "2.0",

    "method": "item.get",

    "params": {

        "output": \[

            "itemids",

            "key\_"

        \],

        "hostids": "10374"

    },

    "auth": "ad4850656fc325d2958e93b52eca02c5",

    "id": 1

}

\`\`\`

查找某个监控项的ID

\`\`\`

{

    "jsonrpc": "2.0",

    "method": "item.get",

    "params": {

        "output":  "itemids",  

         "search":{"key\_":"ceph.rados\_used"},

        "hostids": "10374"

    },

    "auth": "ad4850656fc325d2958e93b52eca02c5",

    "id": 1

}

\`\`\`

history.get方法获取单个监控项的历史数据



\`\`\`

{

    "jsonrpc": "2.0",

    "method": "history.get",

    "params": {

        "output":  "extend",  

        "itemids":"46223",

         "history":3,

        "hostids": "10374",

       "limit":10

    },

    "auth": "ad4850656fc325d2958e93b52eca02c5",

    "id": 1

}

\`\`\`

history.get方法获取单个监控项某个时间段的历史数据



\`\`\`

{

    "jsonrpc": "2.0",

    "method": "history.get",

    "params": {

        "output":  "extend",  

        "itemids":"46223",

         "history":3,

        "hostids": "10374",

        "time\_from":"1491450000",

        "time\_till":"1491461334"

       

    },

    "auth": "ad4850656fc325d2958e93b52eca02c5",

    "id": 1

}

\`\`\`

获取所有有问题的机器

\`\`\`

{

    "jsonrpc": "2.0",

    "method": "trigger.get",

    "params": {

        "output": \[

            "triggerid",

            "description",

            "priority"

        \],

 "filter": {

              "value": 1

               },

       "expandData":"hostname",

       "sortfield": "priority",

       "sortorder": "DESC"

    },

    "auth": "\*\*\*",

    "id": 1

}



\`\`\`

获取所有主机数

\`\`\`

{

       "jsonrpc": "2.0",

      "method": "host.get",

     "params": {

     "output": \[

      "hostids",

       "name"

          \],

      },

 "auth": "ad4850656fc325d2958e93b52eca02c5",

     "id": 1

   }

\`\`\`

获取所有停用的主机

\`\`\`

{

"jsonrpc": "2.0",

"method": "host.get",

"params": {

"output": "extend",

"filter":{

"status":"1"

}

},

"auth": "ad4850656fc325d2958e93b52eca02c5",

"id": 1

}

\`\`\`

监控项已启用数量

\`\`\`

{

        "jsonrpc": "2.0",

        "method": "item.get",

        "params": {

            "output":  \["hostids","key\_"\]



        },

        "auth": "ad4850656fc325d2958e93b52eca02c5",

        "id": 1

    };

\`\`\`

监控项禁用数量

\`\`\`

{

        "jsonrpc": "2.0",

        "method": "item.get",

        "params": {

            "output": "extend",

            "filter":{

                "status": 1

            }

        },

        "auth": "ad4850656fc325d2958e93b52eca02c5",

        "id": 1

    };

\`\`\`

监控不支持数量

\`\`\`

{

        "jsonrpc": "2.0",

        "method": "item.get",

        "params": {

            "output": "extend",

            "filter":{

                "status": 3

            }

        },

        "auth": "ad4850656fc325d2958e93b52eca02c5",

        "id": 1

    };



\`\`\`

触发器正常启动数量

\`\`\`

{

        "jsonrpc": "2.0",

        "method": "trigger.get",

        "params": {

            "output": "extend",

            "filter":{

                "status": 0,

                "value": 0

            }

        },

        "auth": "ad4850656fc325d2958e93b52eca02c5",

        "id": 1

    };

\`\`\`

触发器问题启动数量

\`\`\`

{

        "jsonrpc": "2.0",

        "method": "trigger.get",

        "params": {

            "output": "extend",

            "filter":{

                "status": 0,

                "value": 1

            },

            "expandDescription":"true",

            "expandExpression":"true",

            "expandComment":"true"

        },

        "auth": "ad4850656fc325d2958e93b52eca02c5",

        "id": 1

    };

\`\`\`

触发器禁用数量

\`\`\`

{

        "jsonrpc": "2.0",

        "method": "trigger.get",

        "params": {

            "output": "extend",

            "filter":{

                "status": 1

            }

        },

        "auth": "ad4850656fc325d2958e93b52eca02c5",

        "id": 1

    };

\`\`\`

用户数量值

\`\`\`

{

                      "jsonrpc": "2.0",

                      "method": "user.get",

                      "params": {

                          "output": "extend"

                      },

                       "auth": "ad4850656fc325d2958e93b52eca02c5",

                      "id": 1

                  };



\`\`\`

用户数量细节

\`\`\`

{

            "jsonrpc": "2.0",

            "method": "user.get",

            "params": {

            "output": "extend",

                "filter":{

              "type": "1"

             }

            },

            "auth": "ad4850656fc325d2958e93b52eca02c5",

            "id": 1

        };

\`\`\`

获取所有群组信息

\`\`\`

 {

    "jsonrpc": "2.0",

    "method": "hostgroup.get",

    "params": {

        "output":  "extend"

        

    },

    "auth": "ad4850656fc325d2958e93b52eca02c5",

    "id": 1

}

\`\`\`

\`\`\`

单个itemid项历史数据

\`\`\`

 

{

    "jsonrpc": "2.0",

    "method": "history.get",

    "params": {

        "output": "extend",

        "history": 0,

        "itemids": "29292",

        "sortfield": "clock",

        "sortorder": "DESC",

        "limit": 1000

    },

     "auth": "ad4850656fc325d2958e93b52eca02c5",

    "id": 1

}



\#\#\#history参数中有0,1,2,3,4表示：float,string,log,integer,text



获取可视别名和主机名

\`\`\`

{

    "jsonrpc": "2.0",

    "method": "history.get",

    "params": {

        "selectHosts"：\['name','host'\],

    },

    "auth": "ad4850656fc325d2958e93b52eca02c5",

    "id": 1

}

\`\`\`

