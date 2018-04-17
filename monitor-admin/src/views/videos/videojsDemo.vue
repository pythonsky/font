<template>
<div style="width:100%; ">
    <!-- <remotejs src="https://cdn.bootcss.com/videojs-contrib-hls/5.12.2/videojs-contrib-hls.js"></remotejs> -->
    <!-- <remotejs src="https://cdn.jsdelivr.net/npm/videojs-flash@2/dist/videojs-flash.min.js"></remotejs> -->
    <video id=example-video width=600 height=300 class="video-js vjs-default-skin" controls>
  <source
     src="http://live.aishang.ctlcdn.com/00000110240276_1/playlist.m3u8?CONTENTID=00000110240276_1&AUTHINFO=hEcQRKsVzykWOGchNbZ%2BQtq75ir0x%2FLqFvQn4WX1M4T9j8r0EGnjk8qaf2cEdzzAyx5QYUR5Vq5Wa9RKUWlPug%3D%3D&USERTOKEN=%2FPBuDa6rlCu6V3VHuPRQepTiCwaSNeRp"
     type="application/x-mpegURL">
      <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="http://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video
            </a>
        </p>
    </video>
</div>

</template>
<script>
// require("node_modules/vue-video-player/src/custom-theme.css");
require("node_modules/video.js/dist/video-js.css");
// require("video.js");
import videojs from "node_modules/video.js/dist/video.js"
require('videojs-flash');
import * as HLS from 'videojs-contrib-hls';
// import { videoPlayer } from "vue-video-player";
import remotejs from "../common-components/remotejs.vue"
 export default {
     components: {
       remotejs
     },
    data() {
      return {
      }
     
    },
    mounted() {
        videojs.options.flash.swf = 'node_modules/videojs-swf/dist/video-js.swf';
        var player = videojs('example-video',{techOrder: ['flash', 'html5']});
        player.play();
    },
    computed: {
      
    },
    methods: {
        
    }
  }
console.log(1);
</script>
<style>

</style>

