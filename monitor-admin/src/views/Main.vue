<style lang="less">
@import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
         <!-- 播放器 -->
          <div id="videoPlayer" style="position:fixed;left:calc(50% - 215px);top:calc(50% - 175px); z-index:999999999;display:none">
                    <!-- <div id="videoPlayerHeader" style="height:30px">
                        <span class="videoSpan" style="float:left;display:inline-block;">播放</span>
                        <span class="videoSpan" style="float:right;display:inline-block">x</span>
                    </div> -->
                    <Card style="width:100%; margin-top:0px" id="12">
                       
                        <p slot="title" > <Icon type="play" style="margin:5px 5px 5px 0px"></Icon><span id="channelPlayTitle">播放</span></p>
                            <!-- <a href="#" slot="extra" style="margin-right:10px">
                            <Icon type="minus"></Icon>
                            </a> -->
                            <a href="#" slot="extra" @click="closePlayer">
                            <Icon type="close-round"></Icon>
                            <!-- 收起 -->
                            </a>
                            <div id="wrapper"></div>
                     </Card>
                </div>
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu
                :shrink="shrink"
                @on-change="handleSubmenuChange"
                :theme="menuTheme"
                :before-push="beforePush"
                :open-names="openedSubmenuArr"
                :menu-list="menuList">
                <div slot="top" class="logo-con">
                    <img v-show="shrink"  src="../images/tianyilogo-mini.png" key="max-logo" />
                    <img v-show="!shrink" src="../images/tianyilogo.png" key="min-logo" />
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <!-- <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen> -->
                    <a target="view_window" href="http://new.monitor.ctzcdn.com/zabbix/" style="margin-right:5px;margin-top:5px;">省中心监控</a>
                    <a target="view_window" href="http://monitor.ctzcdn.com/zabbix/">内容中心监控</a>
                    <lock-screen></lock-screen>
                    <!-- <message-tip v-model="mesCount"></message-tip> -->
                    <theme-switch></theme-switch>

                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <!-- <DropdownItem name="ownSpace">个人中心</DropdownItem> -->
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">

              
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
import shrinkableMenu from "./main-components/shrinkable-menu/shrinkable-menu.vue";
import tagsPageOpened from "./main-components/tags-page-opened.vue";
import breadcrumbNav from "./main-components/breadcrumb-nav.vue";
import fullScreen from "./main-components/fullscreen.vue";
import lockScreen from "./main-components/lockscreen/lockscreen.vue";
import messageTip from "./main-components/message-tip.vue";
import themeSwitch from "./main-components/theme-switch/theme-switch.vue";
import Cookies from "js-cookie";
import util from "@/libs/util.js";
import channalPlay from "./videos/channelPlay.js"

export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
    lockScreen,
    messageTip,
    themeSwitch
  },
  data() {
    return {
      // shrink: this.$store.state.app.shrink,
      userName: "",
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr
    };
  },
  computed: {
    menuList() {
      return this.$store.state.app.menuList;
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatorPath() {
      return localStorage.avatorImgPath;
    },
    cachePage() {
      return this.$store.state.app.cachePage;
    },
    lang() {
      return this.$store.state.app.lang;
    },
    menuTheme() {
      return this.$store.state.app.menuTheme;
    },
    mesCount() {
      return this.$store.state.app.messageCount;
    },
    shrink() {
      return this.$store.state.app.shrink;
    }
  },
  methods: {
    closePlayer(){
      if(window.channelPlayer){
        window.channelPlayer.pause();
        window.channelPlayer.__dispatcher.kernel.videoKernel.hlsKernel.stopLoad()
        $("#videoPlayer").css("display", "none")
      }

    },
    init() {
      let pathArr = util.setCurrentPath(this, this.$route.name);
      this.$store.commit("updateMenulist");
      if (pathArr.length >= 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.userName = Cookies.get("user");
      let messageCount = 3;
      this.messageCount = messageCount.toString();
      this.checkTag(this.$route.name);
      this.$store.commit("setMessageCount", 3);
    },
    toggleClick() {
      // this.shrink = !this.shrink;
      this.$store.commit("setShrink");
      $(window).trigger("changemenu");
    },
    handleClickUserDropdown(name) {
      if (name === "ownSpace") {
        util.openNewPage(this, "ownspace_index");
        this.$router.push({
          name: "ownspace_index"
        });
      } else if (name === "loginout") {
        // 退出登录
        this.$store.commit("logout", this);
        this.$store.commit("clearOpenedSubmenu");
        this.$router.push({
          name: "login"
        });
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true;
        }
      });
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        );
      }
    },
    handleSubmenuChange(val) {
      // console.log(val)
    },
    beforePush(name) {
      if (name === "accesstest_index") {
        return false;
      } else {
        return true;
      }
    },
    fullscreenChange(isFullScreen) {
      // console.log(isFullScreen);
    }
  },
  watch: {
    $route(to) {
      this.$store.commit("setCurrentPageName", to.name);
      let pathArr = util.setCurrentPath(this, to.name);
      if (pathArr.length > 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    },
    lang() {
      util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
    }
  },
  mounted() {
    this.init();
    channalPlay()
    console.dir(window.channelPlayer)
    // window.channelPlayer.load("http://192.168.1.10:8081//00000110240311_1/playlist.m3u8?CONTENTID=00000110240311_1&AUTHINFO=hEcQRKsVzykWOGchNbZ%2BQtq75ir0x%2FLqFvQn4WX1M4T9j8r0EGnjk8qaf2cEdzzAyx5QYUR5Vq5Wa9RKUWlPug%3D%3D&USERTOKEN=%2FPBuDa6rlCu6V3VHuPRQepTiCwaSNeRp")
    // window.channelPlayer.load(this.$store.state.app.channelPlayUrl)
    
  },
  created() {
    // 显示打开的页面的列表
    this.$store.commit("setOpenedList");
  }
};
</script>

<style>
.videoSpan {
  margin: 5px 5px 5px 5px;
}
#videoPlayer .ivu-card-body{
    padding:0px !important;
}
#videoPlayer .ivu-card-head{
    cursor: move;
    padding:6px 10px !important;
    /* background-color: hsla(0, 0%, 88%, 0.911) !important */
}
#videoPlayer .ivu-card-extra{
    right: 14px !important;
    top: 10px !important;
}
</style>

