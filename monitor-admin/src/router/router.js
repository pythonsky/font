import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

// export const preview = {
//     path: '/preview',
//     name: 'preview',
//     component: resolve => { require(['@/views/form/article-publish/preview.vue'], resolve); }
// };

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/charts/map.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        // { path: 'order/:order_id', title: '订单详情', name: 'order_info', component: resolve => { require(['@/views/advanced-router/component/order-info.vue'], resolve); } },  // 用于展示动态路由
        // { path: 'shopping', title: '购物详情', name: 'shopping', component: resolve => { require(['@/views/advanced-router/component/shopping-info.vue'], resolve); } },  // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [

    {
        path: '/charts',
        icon: 'alert-circled',
        title: '告警/流量',
        name: 'charts',
        component: Main,
        children: [
            { path: 'Warning', icon: 'stats-bars',title: '统计', name: 'Warning', component: resolve => { require(['@/views/charts/Warning.vue'], resolve); } },
            { path: 'MapWarning', icon: 'pinpoint', title: '告警/进出流量差', name: 'MapWarning', component: resolve => { require(['@/views/charts/mapForWarning.vue'], resolve); } },
           
        ]
    },
    {
        path: '/log',
        icon: 'document-text',
        title: '日志',
        name: 'log',
        component: Main,
        children: [
            { path: 'logGuangZhou',icon:"chevron-right", title: '广州日志图表', name: 'logGuangZhou', component: resolve => { require(['@/views/charts/LogGuangZhou.vue'], resolve); } },
            { path: 'logGuangZhouSearch',icon:"chevron-right", title: '广州日志查询', name: 'logGuangZhouSearch', component: resolve => { require(['@/views/charts/LogGuangZhouSearch.vue'], resolve); } },
            { path: 'LogBeiJing',icon:"chevron-right", title: '北京日志图表', name: 'LogBeiJing', component: resolve => { require(['@/views/charts/LogBeiJing.vue'], resolve); } },
            { path: 'LogBeiJingSearch',icon:"chevron-right", title: '北京日志查询', name: 'LogBeiJingSearch', component: resolve => { require(['@/views/charts/LogBeiJingSearch.vue'], resolve); } },
            { path: 'LogHeiLongJiang',icon:"chevron-right", title: '黑龙江日志图表', name: 'LogHeiLongJiang', component: resolve => { require(['@/views/charts/LogHeiLongJiang.vue'], resolve); } },
        ]
    },
    // {
    //     path: '/videos',
    //     icon: 'videocamera',
    //     title: '视频',
    //     name: 'videos',
    //     component: Main,
    //     children: [
    //         // { path: 'play',icon:"chevron-right", title: '播放', name: 'videoPlay', component: resolve => { require(['@/views/videos/videojsDemo.vue'], resolve); } },
    //         { path: 'live',icon:"chevron-right", title: '播放测试', name: 'videoPlaylive', component: resolve => { require(['@/views/videos/chimeeDemo.vue'], resolve); } },
           
    //     ]
    // },
    {
        path: '/baobiao',
        icon: 'connection-bars',
        title: '报表',
        name: 'baobiao',
        component: Main,
        children: [{
            path: 'zabbixtable',
            icon: 'pie-graph',
            title: '资源利用率',
            name: 'zabbixtable',
            component: resolve => {
                require(['@/views/charts/zabbixtable.vue'], resolve);
            }
        }, ]
    },
    {
        path: '/search',
        icon: 'search',
        title: '内容查询',
        name: 'search',
        component: Main,
         children: [{
                 path: 'channels',
                 icon: "chevron-right",
                 title: '频道查询',
                 name: 'channels',
                 component: resolve => {
                     require(['@/views/search/channels.vue'], resolve);
                 }
             },
             {
                 path: 'minFiles',
                 icon: "chevron-right",
                 title: '小文件查询',
                 name: 'minFiles',
                 component: resolve => {
                     require(['@/views/search/minFiles.vue'], resolve);
                 }
             },
             {
                 path: 'maxFiles',
                 icon: "chevron-right",
                 title: '大文件查询',
                 name: 'maxFiles',
                 component: resolve => {
                     require(['@/views/search/maxFiles.vue'], resolve);
                 }
             },
             {
                 path: 'devSearch',
                 icon: "chevron-right",
                 title: '设备查询',
                 name: 'devSearch',
                 component: resolve => {
                     require(['@/views/search/devSearch.vue'], resolve);
                 }
             },
             {
                 path: 'SP_search',
                 icon: "chevron-right",
                 title: 'SP查询',
                 name: 'SP_search',
                 component: resolve => {
                     require(['@/views/search/SP_search.vue'], resolve);
                 }
             },

         ]

    },
    // {
    //     path: '/map',
    //     icon: 'ios-monitor',
    //     title: '直播点播监控',
    //     name: 'map',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '直播点播监控', name: 'map_index', component: resolve => { require(['@/views/charts/Map.vue'], resolve); } }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    // preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
