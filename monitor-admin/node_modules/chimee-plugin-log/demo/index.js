Chimee.install(chimeePluginControlbar);
Chimee.install(chimeePluginLog);

const player = new Chimee({
  // 业务标识
  business_id:'livecloud',

  // 播放地址
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  // 直播:live 点播：vod
  isLive: false,
  // 编解码容器
  box: 'native',
  // dom容器
  wrapper: '#wrapper',
  plugin: [chimeePluginControlbar.name, chimeePluginLog.name],
  // video
  autoplay: true,
  controls: true
});

if(player.chimeeLog){
  const btnsBoxEl = document.querySelector('#btns');
  const _opened = ()=>{
    btnsBoxEl.innerHTML = '<a href="###" onclick="player.chimeeLog.open()">Open the log panel.</a>'
  };
  _opened();
  player.chimeeLog.on('popupClose', _opened);
  player.chimeeLog.on('popupOpen', ()=>{
    btnsBoxEl.innerHTML = '<a href="###" onclick="player.chimeeLog.close()">Close the log panel.</a>'
  });
}