
import {$, getLocalStorage} from 'chimee-helper';
import chimeeLog from 'index';

const $domWrap = $('<div />').appendTo(document.body);
const $dom = $domWrap[0];
let _opened_run = 0;


// 模拟构造之
Object.assign(
  chimeeLog,
  {
    $domWrap,
    $dom,
    $config: {
    },
    _emit: {},
    $emit (act) {
      this._emit[act] = (this._emit[act] || 0) + 1;
    },
    _emitSync: {},
    $emitSync (act) {
      this._emitSync[act] = (this._emitSync[act] || 0) + 1;
    },
    $bumpToTop () { _opened_run++; }
  },
  chimeeLog.methods,
  chimeeLog.data
);

test('beforeCreate', () => {
  chimeeLog.sendLog('test');
  chimeeLog.beforeCreate({}, {});
  const logPostUrl = 'http://test.url';
  chimeeLog.beforeCreate({}, { logPostUrl, timeoutDelay: 30000});
  expect(chimeeLog.logPostUrl).toBe(logPostUrl); 
});

test('create', () => {
  chimeeLog.create();
  expect(chimeeLog.name).toBe('chimeeLog'); 

  // 测试复选框操作
  var evt = document.createEvent('Event');
  evt.initEvent('change',true,true);
  expect(getLocalStorage('auto_on')).toBe('');
  const iptEl = $domWrap.find('input[type="checkbox"]')[0];
  iptEl.checked = true;
  iptEl.dispatchEvent(evt);
  expect(getLocalStorage('auto_on')).toBe('1');

  iptEl.checked = false;
  iptEl.dispatchEvent(evt);
  expect(getLocalStorage('auto_on')).toBe('0');
});

test('writeLog', () =>{
  chimeeLog.open();
  expect(_opened_run).toBe(1);
  ['loadstart', 'timeupdate', 'durationchange'].forEach(type => {
    chimeeLog.writeLog({type});
    expect(chimeeLog.$txtEl.text().indexOf(type)).not.toBe(-1);
  });
});

test('closed', () =>{
  chimeeLog.close();
  expect(chimeeLog.$txtEl.text()).toBe('');
});

test('destroy', () =>{
  maskingImage(() => {
    chimeeLog.destroy();
    expect(chimeeLog._url.indexOf('destroy')).not.toBe(-1);
  });
});

test('sendLog', () => {
  maskingImage(() => {
    chimeeLog.sendLog('inited');
    expect(chimeeLog._url.indexOf('inited')).not.toBe(-1);

    let _snedParseFun_run = 0;
    chimeeLog.send_logtype2_log = (logtype, data) => {
      _snedParseFun_run ++;
      return data;
    };
    chimeeLog.sendLog('logtype2');
    expect(_snedParseFun_run).toBe(1);
    expect(chimeeLog._url.indexOf('logtype2')).not.toBe(-1);
  });
});

test('events.openLogPopup', () => {
  chimeeLog.close();
  expect(chimeeLog._hide).toBe(true);
  chimeeLog.events.openLogPopup.call(chimeeLog);
  expect(chimeeLog._hide).toBe(false);
  expect(_opened_run).toBe(2);
});

test('defaultEvents', () => {
    [
      'loadstart', 'abort', 'durationchange', 'loadedmetadata',
      'loadeddata', 'progress', 'canplay', 'canplaythrough',
      'pause', 'play', 'playing', 'emptied', 'ended', 'seeking',
      'seeked', 'stalled', 'suspend', 'timeupdate', 'waiting', 'error'
    ].forEach(type => {
      chimeeLog.events[type].call(chimeeLog,{ type });
      expect(chimeeLog.$txtEl.text().indexOf(type)).not.toBe(-1);
      expect(chimeeLog[`${type}Timestamp`]).not.toBe(undefined);
    });
});

test('timeout', done =>{
  chimeeLog.timeoutDelay = 50;
  maskingImage(() => {
    const _csl = chimeeLog.sendLog;
    chimeeLog.events.loadstart.call(chimeeLog, { type: 'loadstart' });
    chimeeLog.sendLog = type => {
      expect(type).toBe('timeout');
      done();
      chimeeLog.sendLog = _csl;
    };
  });
});

// 伪装Image构造
function maskingImage (cbk) {
  const _imgClass = window.Image;
  window.Image = class _Image{
    set src(url) {
      chimeeLog._url = url;
    }
  };
  cbk && cbk();
  window.Image = _imgClass;
}