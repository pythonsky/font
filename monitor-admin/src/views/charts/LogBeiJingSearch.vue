<template>
   <div id="kibanadiv" style="">
      <iframe id="kibana" src="http://116.211.90.85:9900/app/kibana#/discover?_g=()" frameborder="0" scrolling="yes" ></iframe>
    </div>
</template>
<script>
export default {
  name:"LogBeiJing",
  mounted() {
    var browserWidth = $(".single-page-con").width();
    $("iframe").width(browserWidth + 180);
    $(window).resize(() => {
      var browserWidth = $(".single-page-con").width();
      $("iframe").width(browserWidth + 180);
    });
  }
};
</script>
<style scoped>
#kibana {
  left: -180px;
  position: absolute;
}
#kibanadiv {
  width: 100%;
  height: 100%;
}
iframe {
  height: 100%;
  margin-top: -10px;
  /* padding-bottom: 10px; */
}
</style>
