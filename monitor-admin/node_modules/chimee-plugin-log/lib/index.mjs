
/**
 * chimee-plugin-log v0.0.4
 * (c) 2017 huzunjie
 * Released under MIT
 */

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

import _Object$keys from 'babel-runtime/core-js/object/keys';
import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
import { deepAssign, formatDate, getLocalStorage, isUrl, setLocalStorage, uuid } from 'chimee-helper';
import popupFactory from 'chimee-plugin-popup';

__$styleInject(".chimee-log{padding:2px;box-shadow:0 1px 4px rgba(0,0,0,.6)}.chimee-log label{margin-left:10px;font-weight:100;font-size:12px}.chimee-log label input{vertical-align:middle;display:inline;width:auto;padding:0;margin:0}.chimee-log vs-pp-body{padding:3px}.chimee-log textarea{display:block;width:100%;height:200px;margin:-3px;border:1px solid hsla(0,0%,100%,.5);background-color:hsla(0,0%,100%,.9)}", undefined);

/** 日志插件(可以在实例化播放器时，通过重置部分参数，达成相应业务需求)
 * @param {String} logPostUrl 打点上报地址，默认为 undefined ，如果传入则将日志上报到该地址
 * @param {Object} events 可以重置事件绑定，自定义日志时机，也可以通过 methods 的 write_eventName_log或send_eventName_log 来进行输出或上报日志数据加工
*/

// 存储页面开启时间，测试本地存储兼容性
var pageLoadedTimestamp = new Date().getTime().toString();
setLocalStorage('_chimee_t', pageLoadedTimestamp);
var supportLS = getLocalStorage('_chimee_t') === pageLoadedTimestamp;

// 为日志相关事件实现基本的日志输出绑定
var defaultEvents = function () {
  for (var _len = arguments.length, evs = Array(_len), _key = 0; _key < _len; _key++) {
    evs[_key] = arguments[_key];
  }

  var rets = {};
  evs.forEach(function (evType) {
    rets[evType] = function (e) {
      var _this = this;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      this.writeLog(e);
      // 打点
      var box = this.box,
          type = this.type,
          src = this.src;
      var waitingNum = this._waiting_num,
          currentTime = this.currentTime,
          _is_seek = this._is_seek,
          isSeek = _is_seek === undefined ? false : _is_seek,
          _is_play = this._is_play,
          isPlay = _is_play === undefined ? false : _is_play,
          playingTimestamp = this.playingTimestamp,
          loadstartTimestamp = this.loadstartTimestamp,
          waitingTimestamp = this.waitingTimestamp;

      switch (evType) {
        case 'loadstart':
          this.sendLog(evType, { box: box, type: type, src: src });
          // 30秒后没加载完毕则认为超时
          this._ls_timeout = setTimeout(function () {
            _this.sendLog('timeout', { src: src });
          }, this.timeoutDelay);
          this._total_waiting_time = 0;
          break;
        case 'seeking':
          this._is_seek = true;
          break;
        case 'play':
          this._is_play = true;
          break;
        case 'pause':
          this.sendLog(evType, { src: src, currentTime: currentTime });
          break;
        case 'canplay':
          clearTimeout(this._ls_timeout);
          var canplayTime = this.canplayTimestamp;
          this.sendLog(evType, { src: src, currentTime: currentTime, waitingNum: waitingNum, waitingTime: canplayTime - (loadstartTimestamp || waitingTimestamp || canplayTime) });
          break;
        case 'playing':
          clearTimeout(this._ls_timeout);
          var waitingTime = playingTimestamp - (loadstartTimestamp || waitingTimestamp || playingTimestamp);
          this._total_waiting_time += waitingTime;
          this.sendLog(evType, {
            src: src,
            // 等待次数，0 为首次加载
            waitingNum: waitingNum,
            // 通过 currentTime 位置
            currentTime: currentTime,
            // 是否seek导致的缓冲
            isSeek: isSeek,
            isPlay: isPlay,
            // 等待时长
            waitingTime: waitingTime
          });
          this.loadstartTimestamp = 0;
          this.waitingTimestamp = 0;
          this._is_seek = false;
          this._is_play = false;
          break;
        case 'ended':
          this.sendLog(evType, { src: src, waitingNum: waitingNum, totalWaitingTime: this._total_waiting_time });
          break;
        case 'waiting':
          this._waiting_num++;
          this.sendLog(evType, {
            src: src,
            waitingNum: waitingNum,
            currentTime: currentTime,
            // 是否seek导致的缓冲
            isSeek: isSeek,
            isPlay: isPlay
          });
          break;
        case 'error':
          this.sendLog(evType, { src: src, args: args });
          break;
      }
    };
  });
  return rets;
}('loadstart', // 客户端开始请求数据
'abort', // 用户主动终止下载
'durationchange', // 视频时长变化（video通过metadata拿到长度值 this.duration）
'loadedmetadata', // 播放器获取到metadata
'loadeddata', // 首帧加载完毕
'progress', // 正在下载数据
'canplay', // 可播放的，缓冲未必充分
'canplaythrough', // 缓冲足够，可以播放了
'pause', // 暂停
'play', // 播放
'playing', // 已切换到播放状态
'emptied', // 媒体列表为空
'ended', // 媒体列表播放完毕
'seeking', // 播放位置跳转，寻找关键帧中
'seeked', // 关键帧寻找完毕
'stalled', // 浏览器尝试获取媒体数据，但数据不可用
'suspend', // 当浏览器刻意不获取媒体数据时（比如播放中video被销毁）
'timeupdate', // 播放的进度变化 this.currentTime
'waiting', // 等待下一帧缓冲
'error' // 异常
);

// 生产log组件对应的 PluginConfig
var index = popupFactory({
  name: 'chimeeLog',
  className: 'chimee-log',
  title: '日志信息' + (supportLS ? '<label><input type="checkbox">下次自动打开</label>' : ''),
  body: '<textarea>Chimee logs:</textarea>',
  offset: '0',
  width: '400px',
  hide: true,
  autoFocus: false,
  logPostUrl: undefined, // 日志上报地址，不填写则不上报
  beforeCreate: function beforeCreate(_, option) {
    if (isUrl(option.logPostUrl)) {
      this.logPostUrl = option.logPostUrl;
    }
    if (option.timeoutDelay) {
      this.timeoutDelay = option.timeoutDelay;
    }
  },
  create: function create() {
    this.logBase.ver = this.VERSION;
    var $wrap = this.$domWrap;
    this.$txtEl = $wrap.find('textarea');
    // 如果当前环境支持本地存储，则给予用户记住打开状态的复选框
    if (supportLS) {
      var lsKey = 'auto_on';
      // 下次自动打开日志展示窗口
      var autoOn = getLocalStorage(lsKey) === '1';
      $wrap.find('input[type="checkbox"]').on('change', function (e) {
        setLocalStorage(lsKey, +this.checked);
      })[0].checked = autoOn;
      // 告诉父组件是否create后开启
      this._hide = !autoOn;
    }
    this.writeLog({ type: 'ready' });
    this.$emitSync('logPluginCreate');
  },
  destroy: function destroy() {
    clearTimeout(this._ls_timeout);
    this.$emitSync('logPluginDestroy');
    this.sendLog('destroy');
  },

  // 播放器初始化完毕
  inited: function inited() {
    // this.writeLog({type: 'inited'});
    // this.sendLog('inited');
  },
  closed: function closed() {
    this.$txtEl.text('');
  },
  opened: function opened() {
    this.$bumpToTop();
  },

  methods: {
    writeLog: function writeLog(event) {
      var logName = event.type;
      // 记录事件发生的时间戳
      this[logName + 'Timestamp'] = +new Date();

      // 模态窗为隐藏状态则停止输出
      if (this._hide) return;

      var logData = void 0;
      var logWriteFunName = 'write_' + logName + '_log';
      if (this[logWriteFunName]) {
        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        logData = this[logWriteFunName](logName, args);
      }
      var logText = this.$txtEl.text() + '\n[' + formatDate(new Date(this[logName + 'Timestamp']), 'yyyy-MM-dd hh:mm:ss.i') + '] ' + logName + ' ' + (logData !== undefined ? _JSON$stringify(logData) : '');
      var txtEl = this.$txtEl.text(logText)[0];
      txtEl.scrollTop = txtEl.scrollHeight;
    },

    // 定义loadstart要打印出的日志信息
    write_loadstart_log: function write_loadstart_log(logName) {
      var box = this.box,
          type = this.type,
          src = this.src;

      return { box: box, type: type, src: src };
    },

    // 定义loadstart要打印出的日志信息
    write_durationchange_log: function write_durationchange_log() {
      var duration = this.duration;
      return { duration: duration };
    },

    // 定义loadstart要打印出的日志信息
    write_timeupdate_log: function write_timeupdate_log() {
      var currentTime = this.currentTime;
      return { currentTime: currentTime };
    },


    // 得到 inited 时要上报的日志
    send_inited_log: function send_inited_log() {
      /* chimee 构建：
      pro - protocol
      box - box
      type - type
      src - src
      uid - cookie
      ver - chimee 版本
      _t - 时间戳
      _r - 随机数
      */
      var box = this.box,
          type = this.type,
          src = this.src,
          ctrs = this.controls,
          loop = this.loop;

      return { pro: location.protocol, box: box, type: type, src: src, ctrs: ctrs, loop: loop };
    },


    // 发送日志到服务端
    sendLog: function sendLog(logType, data) {
      var logPostUrl = this.logPostUrl;
      // 未设置上报地址则什么也不干
      if (!logPostUrl) return;
      var logData = deepAssign(data || {}, this.logBase);

      var logParseFunName = 'send_' + logType + '_log';
      if (this[logParseFunName]) {
        deepAssign(logData, this[logParseFunName](logType, logData));
      }
      deepAssign(logData, {
        evt: logType,
        _t: +new Date(),
        _r: Math.random()
      });
      // console.log(logType, ' logData:', logData);
      var logQuerys = [];
      _Object$keys(logData).forEach(function (key) {
        return logQuerys.push(encodeURIComponent(key) + '=' + encodeURIComponent(logData[key]));
      });

      // 上报打点
      var img = new Image();
      img.onload = img.onerror = function (e) {
        img = null;
      };
      img.src = logPostUrl + '?' + logQuerys.join('&');
    }
  },
  events: deepAssign(defaultEvents, {
    openLogPopup: function openLogPopup() {
      this.open();
    }
  }),
  // 以下为日志上报处理相关逻辑
  data: {
    timeoutDelay: 3e4,
    pageLoadedTimestamp: pageLoadedTimestamp,
    // 缓冲次数
    _waiting_num: 0,
    _total_waiting_time: 0,
    logBase: {
      uid: function (uid) {
        if (!uid) {
          uid = uuid();
          setLocalStorage('_chimee_uid', uid);
        }
        return uid;
      }(getLocalStorage('_chimee_uid')),
      ref: location.href
    }
  },
  computed: {
    type: function type() {
      return this.$videoConfig.isLive ? 'live' : 'vod';
    }
  }
});

export default index;
