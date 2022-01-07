(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"pokemonBP","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var messages = {};

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 12:
/*!************************************************!*\
  !*** E:/my/pokemonBP/pokemonBP/style/flex.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 13:
/*!**************************************************!*\
  !*** E:/my/pokemonBP/pokemonBP/style/layout.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 3:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' &&
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"pokemonBP","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"pokemonBP","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"pokemonBP","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"pokemonBP","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 43:
/*!***********************************************!*\
  !*** E:/my/pokemonBP/pokemonBP/js/pokemon.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var pokemonData = __webpack_require__(/*! @/data/pokemonData.json */ 44);var
Pokemons = /*#__PURE__*/function () {
  function Pokemons(pkData) {_classCallCheck(this, Pokemons);
    this.pkData = pkData;
    this.pkByType = {};
    for (var name in pkData) {
      var pokemon = pkData[name];
      var types = pokemon.type;var _iterator = _createForOfIteratorHelper(
      types),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var type = _step.value;
          type = type.replace(' ', '');
          if (type == 0) continue;
          if (!this.pkByType[type]) {
            this.pkByType[type] = {};
          }
          this.pkByType[type][name] = pokemon;
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
    }
  }_createClass(Pokemons, [{ key: "getPkByType", value: function getPkByType(
    type) {
      if (type) {
        return this.pkByType[type];
      }
      return this.pkData;
    } }, { key: "getPkTypes", value: function getPkTypes()
    {
      return Object.keys(this.pkByType);
    } }, { key: "getPkByName", value: function getPkByName(
    name) {var _this = this;
      var pokemons = {};
      if (this.pkData[name]) {
        pokemons[name] = this.pkData[name];
        return pokemons;
      }
      var reg = new RegExp(name, 'g');
      Object.keys(this.pkData).forEach(function (n) {
        if (reg.test(n)) {
          polemons[n] = _this.pkData[n];
        }
      });
      return pokemons;
    } }]);return Pokemons;}();

// "妙蛙种子": {
//        "chinese_name": "妙蛙种子",
//        "id": 1,
//        "japanese_name": "フシギダネ",
//        "english_name": "Bulbasaur",
//        "height": "0.7",
//        "weight": "6.9",
//        "type": ["草", "毒"],
//        "ability": ["茂盛"],
//        "隐藏特性": ["叶绿素"],
//        "进化": "妙蛙草",
//        "进化等级": 16,
//        "属性相性": {
//            "一般": 1.0,
//            "格斗": 0.5,
//            "飞行": 2.0,
//            "毒": 1.0,
//            "地面": 1.0,
//            "岩石": 1.0,
//            "虫": 1.0,
//            "幽灵": 1.0,
//            "钢": 1.0,
//            "火": 2.0,
//            "水": 0.5,
//            "草": 0.25,
//            "电": 0.5,
//            "超能力": 2.0,
//            "冰": 2.0,
//            "龙": 1.0,
//            "恶": 1.0,
//            "妖精": 0.5
//        }
//    },
var pokemons = new Pokemons(pokemonData);var _default =
pokemons;exports.default = _default;

/***/ }),

/***/ 44:
/*!*******************************************************!*\
  !*** E:/my/pokemonBP/pokemonBP/data/pokemonData.json ***!
  \*******************************************************/
/*! exports provided: 妙蛙种子, 妙蛙草, 妙蛙花, 小火龙, 火恐龙, 喷火龙, 杰尼龟, 卡咪龟, 水箭龟, 绿毛虫, 铁甲蛹, 巴大蝶, 独角虫, 铁壳蛹, 大针蜂, 波波, 比比鸟, 大比鸟, 小拉达, 拉达, 烈雀, 大嘴雀, 阿柏蛇, 阿柏怪, 皮卡丘, 雷丘, 穿山鼠, 穿山王, 尼多兰, 尼多娜, 尼多后, 尼多朗, 尼多力诺, 尼多王, 皮皮, 皮可西, 六尾, 九尾, 胖丁, 胖可丁, 超音蝠, 大嘴蝠, 走路草, 臭臭花, 霸王花, 派拉斯, 派拉斯特, 毛球, 摩鲁蛾, 地鼠, 三地鼠, 喵喵, 猫老大, 可达鸭, 哥达鸭, 猴怪, 火暴猴, 卡蒂狗, 风速狗, 蚊香蝌蚪, 蚊香君, 蚊香泳士, 凯西, 勇基拉, 胡地, 腕力, 豪力, 怪力, 喇叭芽, 口呆花, 大食花, 玛瑙水母, 毒刺水母, 小拳石, 隆隆石, 隆隆岩, 小火马, 烈焰马, 呆呆兽, 呆壳兽, 小磁怪, 三合一磁怪, 大葱鸭, 嘟嘟, 嘟嘟利, 小海狮, 白海狮, 臭泥, 臭臭泥, 大舌贝, 刺甲贝, 鬼斯, 鬼斯通, 耿鬼, 大岩蛇, 催眠貘, 引梦貘人, 大钳蟹, 巨钳蟹, 霹雳电球, 顽皮雷弹, 蛋蛋, 椰蛋树, 卡拉卡拉, 嘎啦嘎啦, 飞腿郎, 快拳郎, 大舌头, 瓦斯弹, 双弹瓦斯, 独角犀牛, 钻角犀兽, 吉利蛋, 蔓藤怪, 袋兽, 墨海马, 海刺龙, 角金鱼, 金鱼王, 海星星, 宝石海星, 魔墙人偶, 飞天螳螂, 迷唇姐, 电击兽, 鸭嘴火兽, 凯罗斯, 肯泰罗, 鲤鱼王, 暴鲤龙, 拉普拉斯, 百变怪, 伊布, 水伊布, 雷伊布, 火伊布, 多边兽, 菊石兽, 多刺菊石兽, 化石盔, 镰刀盔, 化石翼龙, 卡比兽, 急冻鸟, 闪电鸟, 火焰鸟, 迷你龙, 哈克龙, 快龙, 超梦, 梦幻, 菊草叶, 月桂叶, 大竺葵, 火球鼠, 火岩鼠, 火暴兽, 小锯鳄, 蓝鳄, 大力鳄, 尾立, 大尾立, 咕咕, 猫头夜鹰, 芭瓢虫, 安瓢虫, 圆丝蛛, 阿利多斯, 叉字蝠, 灯笼鱼, 电灯怪, 皮丘, 皮宝宝, 宝宝丁, 波克比, 波克基古, 天然雀, 天然鸟, 咩利羊, 茸茸羊, 电龙, 美丽花, 玛力露, 玛力露丽, 树才怪, 蚊香蛙皇, 毽子草, 毽子花, 毽子棉, 长尾怪手, 向日种子, 向日花怪, 蜻蜻蜓, 乌波, 沼王, 太阳伊布, 月亮伊布, 黑暗鸦, 呆呆王, 梦妖, 未知图腾, 果然翁, 麒麟奇, 榛果球, 佛烈托斯, 土龙弟弟, 天蝎, 大钢蛇, 布鲁, 布鲁皇, 千针鱼, 巨钳螳螂, 壶壶, 赫拉克罗斯, 狃拉, 熊宝宝, 圈圈熊, 熔岩虫, 熔岩蜗牛, 小山猪, 长毛猪, 太阳珊瑚, 铁炮鱼, 章鱼桶, 信使鸟, 巨翅飞鱼, 盔甲鸟, 戴鲁比, 黑鲁加, 刺龙王, 小小象, 顿甲, 多边兽Ⅱ, 惊角鹿, 图图犬, 无畏小子, 战舞郎, 迷唇娃, 电击怪, 鸭嘴宝宝, 大奶罐, 幸福蛋, 雷公, 炎帝, 水君, 幼基拉斯, 沙基拉斯, 班基拉斯, 洛奇亚, 凤王, 时拉比, 木守宫, 森林蜥蜴, 蜥蜴王, 火稚鸡, 力壮鸡, 火焰鸡, 水跃鱼, 沼跃鱼, 巨沼怪, 土狼犬, 大狼犬, 蛇纹熊, 直冲熊, 刺尾虫, 甲壳茧, 狩猎凤蝶, 盾甲茧, 毒粉蛾, 莲叶童子, 莲帽小童, 乐天河童, 橡实果, 长鼻叶, 狡猾天狗, 傲骨燕, 大王燕, 长翅鸥, 大嘴鸥, 拉鲁拉丝, 奇鲁莉安, 沙奈朵, 溜溜糖球, 雨翅蛾, 蘑蘑菇, 斗笠菇, 懒人獭, 过动猿, 请假王, 土居忍士, 铁面忍者, 脱壳忍者, 咕妞妞, 吼爆弹, 爆音怪, 幕下力士, 铁掌力士, 露力丽, 朝北鼻, 向尾喵, 优雅猫, 勾魂眼, 大嘴娃, 可可多拉, 可多拉, 波士可多拉, 玛沙那, 恰雷姆, 落雷兽, 雷电兽, 正电拍拍, 负电拍拍, 电萤虫, 甜甜萤, 毒蔷薇, 溶食兽, 吞食兽, 利牙鱼, 巨牙鲨, 吼吼鲸, 吼鲸王, 呆火驼, 喷火驼, 煤炭龟, 跳跳猪, 噗噗猪, 晃晃斑, 大颚蚁, 超音波幼虫, 沙漠蜻蜓, 刺球仙人掌, 梦歌仙人掌, 青绵鸟, 七夕青鸟, 猫鼬斩, 饭匙蛇, 月石, 太阳岩, 泥泥鳅, 鲶鱼王, 龙虾小兵, 铁螯龙虾, 天秤偶, 念力土偶, 触手百合, 摇篮百合, 太古羽虫, 太古盔甲, 丑丑鱼, 美纳斯, 飘浮泡泡, 变隐龙, 怨影娃娃, 诅咒娃娃, 夜巡灵, 彷徨夜灵, 热带龙, 风铃铃, 阿勃梭鲁, 小果然, 雪童子, 冰鬼护, 海豹球, 海魔狮, 帝牙海狮, 珍珠贝, 猎斑鱼, 樱花鱼, 古空棘鱼, 爱心鱼, 宝贝龙, 甲壳龙, 暴飞龙, 铁哑铃, 金属怪, 巨金怪, 雷吉洛克, 雷吉艾斯, 雷吉斯奇鲁, 拉帝亚斯, 拉帝欧斯, 盖欧卡, 固拉多, 烈空坐, 基拉祈, 代欧奇希斯, 草苗龟, 树林龟, 土台龟, 小火焰猴, 猛火猴, 烈焰猴, 波加曼, 波皇子, 帝王拿波, 姆克儿, 姆克鸟, 姆克鹰, 大牙狸, 大尾狸, 圆法师, 音箱蟀, 小猫怪, 勒克猫, 伦琴猫, 含羞苞, 罗丝雷朵, 头盖龙, 战槌龙, 盾甲龙, 护城龙, 结草儿, 结草贵妇, 绅士蛾, 三蜜蜂, 蜂女王, 帕奇利兹, 泳圈鼬, 浮潜鼬, 樱花宝, 樱花儿, 无壳海兔, 海兔兽, 双尾怪手, 飘飘球, 随风球, 卷卷耳, 长耳兔, 梦妖魔, 乌鸦头头, 魅力喵, 东施喵, 铃铛响, 臭鼬噗, 坦克臭鼬, 铜镜怪, 青铜钟, 盆才怪, 魔尼尼, 小福蛋, 聒噪鸟, 花岩怪, 圆陆鲨, 尖牙陆鲨, 烈咬陆鲨, 小卡比兽, 利欧路, 路卡利欧, 沙河马, 河马兽, 钳尾蝎, 龙王蝎, 不良蛙, 毒骷蛙, 尖牙笼, 荧光鱼, 霓虹鱼, 小球飞鱼, 雪笠怪, 暴雪王, 玛狃拉, 自爆磁怪, 大舌舔, 超甲狂犀, 巨蔓藤, 电击魔兽, 鸭嘴炎兽, 波克基斯, 远古巨蜓, 叶伊布, 冰伊布, 天蝎王, 象牙猪, 多边兽Ｚ, 艾路雷朵, 大朝北鼻, 黑夜魔灵, 雪妖女, 洛托姆, 由克希, 艾姆利多, 亚克诺姆, 帝牙卢卡, 帕路奇亚, 席多蓝恩, 雷吉奇卡斯, 骑拉帝纳, 克雷色利亚, 霏欧纳, 玛纳霏, 达克莱伊, 谢米, 阿尔宙斯, 比克提尼, 藤藤蛇, 青藤蛇, 君主蛇, 暖暖猪, 炒炒猪, 炎武王, 水水獭, 双刃丸, 大剑鬼, 探探鼠, 小约克, 哈约克, 长毛狗, 扒手猫, 酷豹, 花椰猴, 花椰猿, 爆香猴, 爆香猿, 冷水猴, 冷水猿, 食梦梦, 梦梦蚀, 豆豆鸽, 咕咕鸽, 高傲雉鸡, 斑斑马, 雷电斑马, 石丸子, 地幔岩, 庞岩怪, 滚滚蝙蝠, 心蝙蝠, 螺钉地鼠, 龙头地鼠, 差不多娃娃, 搬运小匠, 铁骨土人, 修建老匠, 圆蝌蚪, 蓝蟾蜍, 蟾蜍王, 投摔鬼, 打击鬼, 虫宝包, 宝包茧, 保姆虫, 百足蜈蚣, 车轮球, 蜈蚣王, 木棉球, 风妖精, 百合根娃娃, 裙儿小姐, 野蛮鲈鱼, 黑眼鳄, 混混鳄, 流氓鳄, 火红不倒翁, 达摩狒狒, 沙铃仙人掌, 石居蟹, 岩殿居蟹, 滑滑小子, 头巾混混, 象征鸟, 哭哭面具, 死神棺, 原盖海龟, 肋骨海龟, 始祖小鸟, 始祖大鸟, 破破袋, 灰尘山, 索罗亚, 索罗亚克, 泡沫栗鼠, 奇诺栗鼠, 哥德宝宝, 哥德小童, 哥德小姐, 单卵细胞球, 双卵细胞球, 人造细胞卵, 鸭宝宝, 舞天鹅, 迷你冰, 多多冰, 双倍多多冰, 四季鹿, 萌芽鹿, 电飞鼠, 盖盖虫, 骑士蜗牛, 步哨鼠, 哎呀球菇, 败露球菇, 轻飘飘, 胖嘟嘟, 保姆曼波, 电电虫, 电蜘蛛, 种子铁球, 坚果哑铃, 齿轮儿, 齿轮组, 齿轮怪, 麻麻小鱼, 麻麻鳗, 麻麻鳗鱼王, 小灰怪, 大宇怪, 烛光灵, 灯火幽灵, 水晶灯火灵, 牙牙, 斧牙龙, 双斧战龙, 喷嚏熊, 冻原熊, 几何雪花, 小嘴蜗, 敏捷虫, 泥巴鱼, 功夫鼬, 师父鼬, 赤面龙, 泥偶小人, 泥偶巨人, 驹刀小兵, 劈斩司令, 爆炸头水牛, 毛头小鹰, 勇士雄鹰, 秃鹰丫头, 秃鹰娜, 熔蚁兽, 铁蚁, 单首龙, 双首暴龙, 三首恶龙, 燃烧虫, 火神蛾, 勾帕路翁, 代拉基翁, 毕力吉翁, 龙卷云, 雷电云, 莱希拉姆, 捷克罗姆, 土地云, 酋雷姆, 凯路迪欧, 美洛耶塔, 盖诺赛克特, 哈力栗, 胖胖哈力, 布里卡隆, 火狐狸, 长尾火狐, 妖火红狐, 呱呱泡蛙, 呱头蛙, 甲贺忍蛙, 掘掘兔, 掘地兔, 小箭雀, 火箭雀, 烈箭鹰, 粉蝶虫, 粉蝶蛹, 彩粉蝶, 小狮狮, 火炎狮, 花蓓蓓, 花叶蒂, 花洁夫人, 坐骑小羊, 坐骑山羊, 顽皮熊猫, 流氓熊猫, 多丽米亚, 妙喵, 超能妙喵, 独剑鞘, 双剑鞘, 坚盾剑怪, 粉香香, 芳香精, 绵绵泡芙, 胖甜妮, 好啦鱿, 乌贼王, 龟脚脚, 龟足巨铠, 垃垃藻, 毒藻龙, 铁臂枪虾, 钢炮臂虾, 伞电蜥, 光电伞蜥, 宝宝暴龙, 怪颚龙, 冰雪龙, 冰雪巨龙, 仙子伊布, 摔角鹰人, 咚咚鼠, 小碎钻, 黏黏宝, 黏美儿, 黏美龙, 钥圈儿, 小木灵, 朽木妖, 南瓜精, 南瓜怪人, 冰宝, 冰岩怪, 嗡蝠, 音波龙, 哲尔尼亚斯, 伊裴尔塔尔, 基格尔德, 蒂安希, 胡帕, 波尔凯尼恩, 木木枭, 投羽枭, 狙射树枭, 火斑喵, 炎热喵, 炽焰咆哮虎, 球球海狮, 花漾海狮, 西狮海壬, 小笃儿, 喇叭啄鸟, 铳嘴大鸟, 猫鼬少, 猫鼬探长, 强颚鸡母虫, 虫电宝, 锹农炮虫, 好胜蟹, 好胜毛蟹, 花舞鸟, 萌虻, 蝶结萌虻, 岩狗狗, 鬃岩狼人, 弱丁鱼, 好坏星, 超坏星, 泥驴仔, 重泥挽马, 滴蛛, 滴蛛霸, 伪螳草, 兰螳花, 睡睡菇, 灯罩夜菇, 夜盗火蜥, 焰后蜥, 童偶熊, 穿着熊, 甜竹竹, 甜舞妮, 甜冷美后, 花疗环环, 智挥猩, 投掷猴, 胆小虫, 具甲武者, 沙丘娃, 噬沙堡爷, 拳海参, 属性：空, 银伴战兽, 小陨星, 树枕尾熊, 爆焰龟兽, 托戈德玛尔, 谜拟Ｑ, 磨牙彩皮鱼, 老翁龙, 破破舵轮, 心鳞宝, 鳞甲龙, 杖尾鳞甲龙, 卡璞・鸣鸣, 卡璞・蝶蝶, 卡璞・哞哞, 卡璞・鳍鳍, 科斯莫古, 科斯莫姆, 索尔迦雷欧, 露奈雅拉, 虚吾伊德, 爆肌蚊, 费洛美螂, 电束木, 铁火辉夜, 纸御剑, 恶食大王, 奈克洛兹玛, 玛机雅娜, 玛夏多, 毒贝比, 四颚针龙, 垒磊石, 砰头小丑, 捷拉奥拉, 美录坦, 美录梅塔, 敲音猴, 啪咚猴, 轰擂金刚猩, 炎兔儿, 腾蹴小将, 闪焰王牌, 泪眼蜥, 变涩蜥, 千面避役, 贪心栗鼠, 藏饱栗鼠, 稚山雀, 蓝鸦, 钢铠鸦, 索侦虫, 天罩虫, 以欧路普, 偷儿狐, 狐大盗, 幼棉棉, 白蓬蓬, 毛辫羊, 毛毛角羊, 咬咬龟, 暴噬龟, 来电汪, 逐电犬, 小炭仔, 大炭车, 巨炭山, 啃果虫, 苹裹龙, 丰蜜龙, 沙包蛇, 沙螺蟒, 古月鸟, 刺梭鱼, 戽斗尖梭, 毒电婴, 颤弦蝾螈, 烧火蚣, 焚焰蚣, 拳拳蛸, 八爪武师, 来悲茶, 怖思壶, 迷布莉姆, 提布莉姆, 布莉姆温, 捣蛋小妖, 诈唬魔, 长毛巨魔, 堵拦熊, 喵头目, 魔灵珊瑚, 葱游兵, 踏冰人偶, 死神板, 小仙奶, 霜奶仙, 列阵兵, 啪嚓海胆, 雪吞虫, 雪绒蛾, 巨石丁, 冰砌鹅, 爱管侍, 莫鲁贝可, 铜象, 大王铜象, 雷鸟龙, 雷鸟海兽, 鳃鱼龙, 鳃鱼海兽, 铝钢龙, 多龙梅西亚, 多龙奇, 多龙巴鲁托, 苍响, 藏玛然特, 无极汰那, 熊徒弟, 武道熊师, 萨戮德, 雷吉艾勒奇, 雷吉铎拉戈, 雪暴马, 灵幽马, 蕾冠王, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"妙蛙种子\":{\"chinese_name\":\"妙蛙种子\",\"id\":1,\"japanese_name\":\"フシギダネ\",\"english_name\":\"Bulbasaur\",\"height\":\"0.7\",\"weight\":\"6.9\",\"type\":[\"草\",\"毒\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"叶绿素\"],\"进化\":\"妙蛙草\",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"妙蛙草\":{\"chinese_name\":\"妙蛙草\",\"id\":2,\"japanese_name\":\"フシギソウ\",\"english_name\":\"Ivysaur\",\"height\":\"1.0\",\"weight\":\"13.0\",\"type\":[\"草\",\"毒\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"叶绿素\"],\"进化\":\"妙蛙花\",\"进化等级\":32,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"妙蛙花\":{\"chinese_name\":\"妙蛙花\",\"id\":3,\"japanese_name\":\"フシギバナ\",\"english_name\":\"Venusaur\",\"height\":\"2.0\",\"weight\":\"100.0\",\"type\":[\"草\",\"毒\"],\"ability\":[\"茂盛\",\"厚脂肪\"],\"隐藏特性\":[\"叶绿素\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"小火龙\":{\"chinese_name\":\"小火龙\",\"id\":4,\"japanese_name\":\"ヒトカゲ\",\"english_name\":\"Charmander\",\"height\":\"0.6\",\"weight\":\"8.5\",\"type\":[\"火\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"太阳之力\"],\"进化\":\"火恐龙 \",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"火恐龙\":{\"chinese_name\":\"火恐龙\",\"id\":5,\"japanese_name\":\"リザード\",\"english_name\":\"Charmeleon\",\"height\":\"1.1\",\"weight\":\"19.0\",\"type\":[\"火\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"太阳之力\"],\"进化\":\"喷火龙 \",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"喷火龙\":{\"chinese_name\":\"喷火龙\",\"id\":6,\"japanese_name\":\"リザードン\",\"english_name\":\"Charizard\",\"height\":\"1.7\",\"weight\":\"90.5\",\"type\":[\"火\",\"飞行\",\"龙\"],\"ability\":[\"猛火\",\"硬爪\",\"日照\"],\"隐藏特性\":[\"太阳之力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.25,\"水\":1,\"草\":0.25,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":2,\"恶\":1,\"妖精\":1}},\"杰尼龟\":{\"chinese_name\":\"杰尼龟\",\"id\":7,\"japanese_name\":\"ゼニガメ\",\"english_name\":\"Squirtle\",\"height\":\"0.5\",\"weight\":\"9.0\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"雨盘\"],\"进化\":\"卡咪龟 \",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"卡咪龟\":{\"chinese_name\":\"卡咪龟\",\"id\":8,\"japanese_name\":\"カメール\",\"english_name\":\"Wartortle\",\"height\":\"1.0\",\"weight\":\"22.5\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"雨盘\"],\"进化\":\"水箭龟 \",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"水箭龟\":{\"chinese_name\":\"水箭龟\",\"id\":9,\"japanese_name\":\"カメックス\",\"english_name\":\"Blastoise\",\"height\":\"1.6\",\"weight\":\"85.5 \",\"type\":[\"水\"],\"ability\":[\"激流\",\"超级发射器\"],\"隐藏特性\":[\"雨盘\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"绿毛虫\":{\"chinese_name\":\"绿毛虫\",\"id\":10,\"japanese_name\":\"キャタピー\",\"english_name\":\"Caterpie\",\"height\":\"0.3\",\"weight\":\"2.9\",\"type\":[\"虫\"],\"ability\":[\"鳞粉\"],\"隐藏特性\":[\"逃跑\"],\"进化\":\"铁甲蛹 \",\"进化等级\":7,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"铁甲蛹\":{\"chinese_name\":\"铁甲蛹\",\"id\":11,\"japanese_name\":\"トランセル\",\"english_name\":\"Metapod\",\"height\":\"0.7\",\"weight\":\"9.9\",\"type\":[\"虫\"],\"ability\":[\"蜕皮\"],\"隐藏特性\":[],\"进化\":\"巴大蝶 \",\"进化等级\":10,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"巴大蝶\":{\"chinese_name\":\"巴大蝶\",\"id\":12,\"japanese_name\":\"バタフリー\",\"english_name\":\"Butterfree\",\"height\":\"1.1\",\"weight\":\"32.0\",\"type\":[\"虫\",\"飞行\"],\"ability\":[\"复眼\"],\"隐藏特性\":[\"有色眼镜\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"独角虫\":{\"chinese_name\":\"独角虫\",\"id\":13,\"japanese_name\":\"ビードル\",\"english_name\":\"Weedle\",\"height\":\"0.3\",\"weight\":\"3.2\",\"type\":[\"虫\",\"毒\"],\"ability\":[\"鳞粉\"],\"隐藏特性\":[\"逃跑\"],\"进化\":\"铁壳蛹 \",\"进化等级\":7,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"铁壳蛹\":{\"chinese_name\":\"铁壳蛹\",\"id\":14,\"japanese_name\":\"コクーン\",\"english_name\":\"Kakuna\",\"height\":\"0.6\",\"weight\":\"10.0\",\"type\":[\"虫\",\"毒\"],\"ability\":[\"蜕皮\"],\"隐藏特性\":[],\"进化\":\"大针蜂 \",\"进化等级\":10,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"大针蜂\":{\"chinese_name\":\"大针蜂\",\"id\":15,\"japanese_name\":\"スピアー\",\"english_name\":\"Beedrill\",\"height\":\"1.0\",\"weight\":\"29.5\",\"type\":[\"虫\",\"毒\"],\"ability\":[\"虫之预感\",\"适应力\"],\"隐藏特性\":[\"狙击手\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"波波\":{\"chinese_name\":\"波波\",\"id\":16,\"japanese_name\":\"ポッポ\",\"english_name\":\"Pidgey\",\"height\":\"0.3\",\"weight\":\"1.8\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"锐利目光\",\"蹒跚\"],\"隐藏特性\":[\"健壮胸肌\"],\"进化\":\"比比鸟 \",\"进化等级\":18,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"比比鸟\":{\"chinese_name\":\"比比鸟\",\"id\":17,\"japanese_name\":\"ピジョン\",\"english_name\":\"Pidgeotto\",\"height\":\"1.1\",\"weight\":\"30.0\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"锐利目光\",\"蹒跚\"],\"隐藏特性\":[\"健壮胸肌\"],\"进化\":\"大比鸟 \",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"大比鸟\":{\"chinese_name\":\"大比鸟\",\"id\":18,\"japanese_name\":\"ピジョット\",\"english_name\":\"Pidgeot\",\"height\":\"1.5\",\"weight\":\"39.5\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"锐利目光\",\"蹒跚\",\"无防守\"],\"隐藏特性\":[\"健壮胸肌\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"小拉达\":{\"chinese_name\":\"小拉达\",\"id\":19,\"japanese_name\":\"コラッタ\",\"english_name\":\"Rattata\",\"height\":\"0.3\",\"weight\":\"3.5\",\"type\":[\"一般\",\"恶\"],\"ability\":[\"逃跑\",\"毅力\",\"贪吃鬼\",\"活力\"],\"隐藏特性\":[\"活力\",\"厚脂肪\"],\"进化\":\"拉达 \",\"进化等级\":20,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"拉达\":{\"chinese_name\":\"拉达\",\"id\":20,\"japanese_name\":\"ラッタ\",\"english_name\":\"Raticate\",\"height\":\"0.7\",\"weight\":\"18.5\",\"type\":[\"一般\",\"恶\"],\"ability\":[\"逃跑\",\"毅力\",\"贪吃鬼\",\"活力\"],\"隐藏特性\":[\"活力\",\"厚脂肪\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"烈雀\":{\"chinese_name\":\"烈雀\",\"id\":21,\"japanese_name\":\"オニスズメ\",\"english_name\":\"Spearow\",\"height\":\"0.3\",\"weight\":\"2.0\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"锐利目光\"],\"隐藏特性\":[\"狙击手\"],\"进化\":\"大嘴雀 \",\"进化等级\":20,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"大嘴雀\":{\"chinese_name\":\"大嘴雀\",\"id\":22,\"japanese_name\":\"オニドリル\",\"english_name\":\"Fearow\",\"height\":\"1.2\",\"weight\":\"38.0\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"锐利目光\"],\"隐藏特性\":[\"狙击手\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"阿柏蛇\":{\"chinese_name\":\"阿柏蛇\",\"id\":23,\"japanese_name\":\"アーボ\",\"english_name\":\"Ekans\",\"height\":\"2.0\",\"weight\":\"6.9\",\"type\":[\"毒\"],\"ability\":[\"威吓\",\"蜕皮\"],\"隐藏特性\":[\"紧张感\"],\"进化\":\"阿柏怪 \",\"进化等级\":22,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"阿柏怪\":{\"chinese_name\":\"阿柏怪\",\"id\":24,\"japanese_name\":\"アーボック\",\"english_name\":\"Arbok\",\"height\":\"3.5\",\"weight\":\"65.0\",\"type\":[\"毒\"],\"ability\":[\"威吓\",\"蜕皮\"],\"隐藏特性\":[\"紧张感\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"皮卡丘\":{\"chinese_name\":\"皮卡丘\",\"id\":25,\"japanese_name\":\"ピカチュウ\",\"english_name\":\"Pikachu\",\"height\":\"0.4\",\"weight\":\"6.0\",\"type\":[\"电\"],\"ability\":[\"静电\",\"避雷针\"],\"隐藏特性\":[\"避雷针\"],\"进化\":\"雷丘\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"雷丘\":{\"chinese_name\":\"雷丘\",\"id\":26,\"japanese_name\":\"ライチュウ\",\"english_name\":\"Raichu\",\"height\":\"0.8\",\"weight\":\"30.0\",\"type\":[\"电\",\"超能力\"],\"ability\":[\"静电\",\"冲浪之尾\"],\"隐藏特性\":[\"避雷针\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"穿山鼠\":{\"chinese_name\":\"穿山鼠\",\"id\":27,\"japanese_name\":\"サンド\",\"english_name\":\"Sandshrew\",\"height\":\"0.6\",\"weight\":\"12.0\",\"type\":[\"地面\",\"冰\",\"钢\"],\"ability\":[\"沙隐\",\"雪隐\"],\"隐藏特性\":[\"拨沙\",\"拨雪\"],\"进化\":\"穿山王 \",\"进化等级\":22,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"穿山王\":{\"chinese_name\":\"穿山王\",\"id\":28,\"japanese_name\":\"サンドパン\",\"english_name\":\"Sandslash\",\"height\":\"1.0\",\"weight\":\"29.5\",\"type\":[\"地面\",\"冰\",\"钢\"],\"ability\":[\"沙隐\",\"雪隐\"],\"隐藏特性\":[\"拨沙\",\"拨雪\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"尼多兰\":{\"chinese_name\":\"尼多兰\",\"id\":29,\"japanese_name\":\"ニドラン♀\",\"english_name\":\"Nidoran♀\",\"height\":\"0.4\",\"weight\":\"7.0\",\"type\":[\"毒\"],\"ability\":[\"毒刺\",\"斗争心\"],\"隐藏特性\":[\"活力\"],\"进化\":\"尼多娜 \",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"尼多娜\":{\"chinese_name\":\"尼多娜\",\"id\":30,\"japanese_name\":\"ニドリーナ\",\"english_name\":\"Nidorina\",\"height\":\"0.8\",\"weight\":\"20.0\",\"type\":[\"毒\"],\"ability\":[\"毒刺\",\"斗争心\"],\"隐藏特性\":[\"活力\"],\"进化\":\"尼多后 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"尼多后\":{\"chinese_name\":\"尼多后\",\"id\":31,\"japanese_name\":\"ニドクイン\",\"english_name\":\"Nidoqueen\",\"height\":\"1.3\",\"weight\":\"60.0\",\"type\":[\"毒\",\"地面\"],\"ability\":[\"毒刺\",\"斗争心\"],\"隐藏特性\":[\"强行\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.25,\"地面\":2,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":1,\"电\":0,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"尼多朗\":{\"chinese_name\":\"尼多朗\",\"id\":32,\"japanese_name\":\"ニドラン♂\",\"english_name\":\"Nidoran♂\",\"height\":\"0.5\",\"weight\":\"9.0\",\"type\":[\"毒\"],\"ability\":[\"毒刺\",\"斗争心\"],\"隐藏特性\":[\"活力\"],\"进化\":\"尼多力诺 \",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"尼多力诺\":{\"chinese_name\":\"尼多力诺\",\"id\":33,\"japanese_name\":\"ニドリーノ\",\"english_name\":\"Nidorino\",\"height\":\"0.9\",\"weight\":\"19.5\",\"type\":[\"毒\"],\"ability\":[\"毒刺\",\"斗争心\"],\"隐藏特性\":[\"活力\"],\"进化\":\"尼多王 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"尼多王\":{\"chinese_name\":\"尼多王\",\"id\":34,\"japanese_name\":\"ニドキング\",\"english_name\":\"Nidoking\",\"height\":\"1.4\",\"weight\":\"62.0\",\"type\":[\"毒\",\"地面\"],\"ability\":[\"毒刺\",\"斗争心\"],\"隐藏特性\":[\"强行\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.25,\"地面\":2,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":1,\"电\":0,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"皮皮\":{\"chinese_name\":\"皮皮\",\"id\":35,\"japanese_name\":\"ピッピ\",\"english_name\":\"Clefairy\",\"height\":\"0.6\",\"weight\":\"7.5\",\"type\":[\"妖精\"],\"ability\":[\"迷人之躯\",\"魔法防守\"],\"隐藏特性\":[\"友情防守\"],\"进化\":\"皮可西\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"皮可西\":{\"chinese_name\":\"皮可西\",\"id\":36,\"japanese_name\":\"ピクシー\",\"english_name\":\"Clefable\",\"height\":\"1.3\",\"weight\":\"40.0\",\"type\":[\"妖精\"],\"ability\":[\"迷人之躯\",\"魔法防守\"],\"隐藏特性\":[\"纯朴\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"六尾\":{\"chinese_name\":\"六尾\",\"id\":37,\"japanese_name\":\"ロコン\",\"english_name\":\"Vulpix\",\"height\":\"0.6\",\"weight\":\"9.9\",\"type\":[\"火\",\"冰\"],\"ability\":[\"引火\",\"雪隐\"],\"隐藏特性\":[\"日照\",\"降雪\"],\"进化\":\"九尾\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"九尾\":{\"chinese_name\":\"九尾\",\"id\":38,\"japanese_name\":\"キュウコン\",\"english_name\":\"Ninetales\",\"height\":\"1.1\",\"weight\":\"19.9\",\"type\":[\"火\",\"冰\",\"妖精\"],\"ability\":[\"引火\",\"雪隐\"],\"隐藏特性\":[\"日照\",\"降雪\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"胖丁\":{\"chinese_name\":\"胖丁\",\"id\":39,\"japanese_name\":\"プリン\",\"english_name\":\"Jigglypuff\",\"height\":\"0.5\",\"weight\":\"5.5\",\"type\":[\"一般\",\"妖精\"],\"ability\":[\"迷人之躯\",\"好胜\"],\"隐藏特性\":[\"友情防守\"],\"进化\":\"胖可丁\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":0,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"胖可丁\":{\"chinese_name\":\"胖可丁\",\"id\":40,\"japanese_name\":\"プクリン\",\"english_name\":\"Wigglytuff\",\"height\":\"1.0\",\"weight\":\"12.0\",\"type\":[\"一般\",\"妖精\"],\"ability\":[\"迷人之躯\",\"好胜\"],\"隐藏特性\":[\"察觉\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":0,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"超音蝠\":{\"chinese_name\":\"超音蝠\",\"id\":41,\"japanese_name\":\"ズバット\",\"english_name\":\"Zubat\",\"height\":\"0.8\",\"weight\":\"7.5\",\"type\":[\"毒\",\"飞行\"],\"ability\":[\"精神力\"],\"隐藏特性\":[\"穿透\"],\"进化\":\"大嘴蝠 \",\"进化等级\":22,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":2,\"虫\":0.25,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"大嘴蝠\":{\"chinese_name\":\"大嘴蝠\",\"id\":42,\"japanese_name\":\"ゴルバット\",\"english_name\":\"Golbat\",\"height\":\"1.6\",\"weight\":\"55.0\",\"type\":[\"毒\",\"飞行\"],\"ability\":[\"精神力\"],\"隐藏特性\":[\"穿透\"],\"进化\":\"叉字蝠 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":2,\"虫\":0.25,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"走路草\":{\"chinese_name\":\"走路草\",\"id\":43,\"japanese_name\":\"ナゾノクサ\",\"english_name\":\"Oddish\",\"height\":\"0.5\",\"weight\":\"5.4\",\"type\":[\"草\",\"毒\"],\"ability\":[\"叶绿素\"],\"隐藏特性\":[\"逃跑\"],\"进化\":\"臭臭花 \",\"进化等级\":21,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"臭臭花\":{\"chinese_name\":\"臭臭花\",\"id\":44,\"japanese_name\":\"クサイハナ\",\"english_name\":\"Gloom\",\"height\":\"0.8\",\"weight\":\"8.6\",\"type\":[\"草\",\"毒\"],\"ability\":[\"叶绿素\"],\"隐藏特性\":[\"恶臭\"],\"进化\":\"霸王花\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"霸王花\":{\"chinese_name\":\"霸王花\",\"id\":45,\"japanese_name\":\"ラフレシア\",\"english_name\":\"Vileplume\",\"height\":\"1.2\",\"weight\":\"18.6\",\"type\":[\"草\",\"毒\"],\"ability\":[\"叶绿素\"],\"隐藏特性\":[\"孢子\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"派拉斯\":{\"chinese_name\":\"派拉斯\",\"id\":46,\"japanese_name\":\"パラス\",\"english_name\":\"Paras\",\"height\":\"0.3\",\"weight\":\"5.4\",\"type\":[\"虫\",\"草\"],\"ability\":[\"孢子\",\"干燥皮肤\"],\"隐藏特性\":[\"湿气\"],\"进化\":\"派拉斯特 \",\"进化等级\":24,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":4,\"毒\":2,\"地面\":0.25,\"岩石\":2,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":5,\"水\":0,\"草\":0.25,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"派拉斯特\":{\"chinese_name\":\"派拉斯特\",\"id\":47,\"japanese_name\":\"パラセクト\",\"english_name\":\"Parasect\",\"height\":\"1.0\",\"weight\":\"29.5\",\"type\":[\"虫\",\"草\"],\"ability\":[\"孢子\",\"干燥皮肤\"],\"隐藏特性\":[\"湿气\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":4,\"毒\":2,\"地面\":0.25,\"岩石\":2,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":5,\"水\":0,\"草\":0.25,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"毛球\":{\"chinese_name\":\"毛球\",\"id\":48,\"japanese_name\":\"コンパン\",\"english_name\":\"Venonat\",\"height\":\"1.0\",\"weight\":\"30.0\",\"type\":[\"虫\",\"毒\"],\"ability\":[\"复眼\",\"有色眼镜\"],\"隐藏特性\":[\"逃跑\"],\"进化\":\"摩魯蛾 \",\"进化等级\":31,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"摩鲁蛾\":{\"chinese_name\":\"摩鲁蛾\",\"id\":49,\"japanese_name\":\"モルフォン\",\"english_name\":\"Venomoth\",\"height\":\"1.5\",\"weight\":\"12.5\",\"type\":[\"虫\",\"毒\"],\"ability\":[\"鳞粉\",\"有色眼镜\"],\"隐藏特性\":[\"奇迹皮肤\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"地鼠\":{\"chinese_name\":\"地鼠\",\"id\":50,\"japanese_name\":\"ディグダ\",\"english_name\":\"Diglett\",\"height\":\"0.2\",\"weight\":\"0.8\",\"type\":[\"地面\",\"钢\"],\"ability\":[\"沙隐\",\"沙穴\",\"卷发\"],\"隐藏特性\":[\"沙之力\"],\"进化\":\"三地鼠 \",\"进化等级\":26,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"三地鼠\":{\"chinese_name\":\"三地鼠\",\"id\":51,\"japanese_name\":\"ダグトリオ\",\"english_name\":\"Dugtrio\",\"height\":\"0.7\",\"weight\":\"33.3\",\"type\":[\"地面\",\"钢\"],\"ability\":[\"沙隐\",\"沙穴\",\"卷发\"],\"隐藏特性\":[\"沙之力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"喵喵\":{\"chinese_name\":\"喵喵\",\"id\":52,\"japanese_name\":\"ニャース\",\"english_name\":\"Meowth\",\"height\":\"0.4\",\"weight\":\"4.2\",\"type\":[\"一般\",\"恶\",\"钢\"],\"ability\":[\"捡拾\",\"技术高手\",\"硬爪\"],\"隐藏特性\":[\"紧张感\",\"胆怯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"猫老大\":{\"chinese_name\":\"猫老大\",\"id\":53,\"japanese_name\":\"ペルシアン\",\"english_name\":\"Persian\",\"height\":\"1.0\",\"weight\":\"32.0\",\"type\":[\"一般\",\"恶\"],\"ability\":[\"柔软\",\"技术高手\",\"毛皮大衣\"],\"隐藏特性\":[\"紧张感\",\"胆怯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"可达鸭\":{\"chinese_name\":\"可达鸭\",\"id\":54,\"japanese_name\":\"コダック\",\"english_name\":\"Psyduck\",\"height\":\"0.8\",\"weight\":\"19.6\",\"type\":[\"水\"],\"ability\":[\"湿气\",\"无关天气\"],\"隐藏特性\":[\"悠游自如\"],\"进化\":\"哥达鸭 \",\"进化等级\":33,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"哥达鸭\":{\"chinese_name\":\"哥达鸭\",\"id\":55,\"japanese_name\":\"ゴルダック\",\"english_name\":\"Golduck\",\"height\":\"1.7\",\"weight\":\"76.6\",\"type\":[\"水\"],\"ability\":[\"湿气\",\"无关天气\"],\"隐藏特性\":[\"悠游自如\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"猴怪\":{\"chinese_name\":\"猴怪\",\"id\":56,\"japanese_name\":\"マンキー\",\"english_name\":\"Mankey\",\"height\":\"0.5\",\"weight\":\"28.0\",\"type\":[\"格斗\"],\"ability\":[\"干劲\",\"愤怒穴位\"],\"隐藏特性\":[\"不服输\"],\"进化\":\"火爆猴 \",\"进化等级\":28,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"火暴猴\":{\"chinese_name\":\"火暴猴\",\"id\":57,\"japanese_name\":\"オコリザル\",\"english_name\":\"Primeape\",\"height\":\"1.0\",\"weight\":\"32.0\",\"type\":[\"格斗\"],\"ability\":[\"干劲\",\"愤怒穴位\"],\"隐藏特性\":[\"不服输\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"卡蒂狗\":{\"chinese_name\":\"卡蒂狗\",\"id\":58,\"japanese_name\":\"ガーディ\",\"english_name\":\"Growlithe\",\"height\":\"0.7\",\"weight\":\"19.0\",\"type\":[\"火\"],\"ability\":[\"威吓\",\"引火\"],\"隐藏特性\":[\"正义之心\"],\"进化\":\"风速狗\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"风速狗\":{\"chinese_name\":\"风速狗\",\"id\":59,\"japanese_name\":\"ウインディ\",\"english_name\":\"Arcanine\",\"height\":\"1.9\",\"weight\":\"155.0\",\"type\":[\"火\"],\"ability\":[\"威吓\",\"引火\"],\"隐藏特性\":[\"正义之心\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"蚊香蝌蚪\":{\"chinese_name\":\"蚊香蝌蚪\",\"id\":60,\"japanese_name\":\"ニョロモ\",\"english_name\":\"Poliwag\",\"height\":\"0.6\",\"weight\":\"12.4\",\"type\":[\"水\"],\"ability\":[\"储水\",\"湿气\"],\"隐藏特性\":[\"悠游自如\"],\"进化\":\"蚊香君 \",\"进化等级\":25,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"蚊香君\":{\"chinese_name\":\"蚊香君\",\"id\":61,\"japanese_name\":\"ニョロゾ\",\"english_name\":\"Poliwhirl\",\"height\":\"1.0\",\"weight\":\"20.0\",\"type\":[\"水\"],\"ability\":[\"储水\",\"湿气\"],\"隐藏特性\":[\"悠游自如\"],\"进化\":\"蚊香泳士 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"蚊香泳士\":{\"chinese_name\":\"蚊香泳士\",\"id\":62,\"japanese_name\":\"ニョロボン\",\"english_name\":\"Poliwrath\",\"height\":\"1.3\",\"weight\":\"54.0\",\"type\":[\"水\",\"格斗\"],\"ability\":[\"储水\",\"湿气\"],\"隐藏特性\":[\"悠游自如\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":2,\"电\":2,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"凯西\":{\"chinese_name\":\"凯西\",\"id\":63,\"japanese_name\":\"ケーシィ\",\"english_name\":\"Abra\",\"height\":\"0.9\",\"weight\":\"19.5\",\"type\":[\"超能力\"],\"ability\":[\"同步\",\"精神力\"],\"隐藏特性\":[\"魔法防守\"],\"进化\":\"勇基拉 \",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"勇基拉\":{\"chinese_name\":\"勇基拉\",\"id\":64,\"japanese_name\":\"ユンゲラー\",\"english_name\":\"Kadabra\",\"height\":\"1.3\",\"weight\":\"56.5\",\"type\":[\"超能力\"],\"ability\":[\"同步\",\"精神力\"],\"隐藏特性\":[\"魔法防守\"],\"进化\":\"胡地 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"胡地\":{\"chinese_name\":\"胡地\",\"id\":65,\"japanese_name\":\"フーディン\",\"english_name\":\"Alakazam\",\"height\":\"=1\",\"weight\":\"48.0\",\"type\":[\"超能力\"],\"ability\":[\"同步\",\"精神力\",\"复制\"],\"隐藏特性\":[\"魔法防守\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"腕力\":{\"chinese_name\":\"腕力\",\"id\":66,\"japanese_name\":\"ワンリキー\",\"english_name\":\"Machop\",\"height\":\"0.8\",\"weight\":\"19.5\",\"type\":[\"格斗\"],\"ability\":[\"毅力\",\"无防守\"],\"隐藏特性\":[\"不屈之心\"],\"进化\":\"豪力 \",\"进化等级\":28,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"豪力\":{\"chinese_name\":\"豪力\",\"id\":67,\"japanese_name\":\"ゴーリキー\",\"english_name\":\"Machoke\",\"height\":\"1.5\",\"weight\":\"70.5\",\"type\":[\"格斗\"],\"ability\":[\"毅力\",\"无防守\"],\"隐藏特性\":[\"不屈之心\"],\"进化\":\"怪力 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"怪力\":{\"chinese_name\":\"怪力\",\"id\":68,\"japanese_name\":\"カイリキー\",\"english_name\":\"Machamp\",\"height\":\"1.6\",\"weight\":\"130.0\",\"type\":[\"格斗\"],\"ability\":[\"毅力\",\"无防守\"],\"隐藏特性\":[\"不屈之心\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"喇叭芽\":{\"chinese_name\":\"喇叭芽\",\"id\":69,\"japanese_name\":\"マダツボミ\",\"english_name\":\"Bellsprout\",\"height\":\"0.7\",\"weight\":\"4.0\",\"type\":[\"草\",\"毒\"],\"ability\":[\"叶绿素\"],\"隐藏特性\":[\"贪吃鬼\"],\"进化\":\"口呆花 \",\"进化等级\":21,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"口呆花\":{\"chinese_name\":\"口呆花\",\"id\":70,\"japanese_name\":\"ウツドン\",\"english_name\":\"Weepinbell\",\"height\":\"1.0\",\"weight\":\"6.4\",\"type\":[\"草\",\"毒\"],\"ability\":[\"叶绿素\"],\"隐藏特性\":[\"贪吃鬼\"],\"进化\":\"大食花 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"大食花\":{\"chinese_name\":\"大食花\",\"id\":71,\"japanese_name\":\"ウツボット\",\"english_name\":\"Victreebel\",\"height\":\"1.7\",\"weight\":\"15.5\",\"type\":[\"草\",\"毒\"],\"ability\":[\"叶绿素\"],\"隐藏特性\":[\"贪吃鬼\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"玛瑙水母\":{\"chinese_name\":\"玛瑙水母\",\"id\":72,\"japanese_name\":\"メノクラゲ\",\"english_name\":\"Tentacool\",\"height\":\"0.9\",\"weight\":\"45.5\",\"type\":[\"水\",\"毒\"],\"ability\":[\"恒净之躯\",\"污泥浆\"],\"隐藏特性\":[\"雨盘\"],\"进化\":\"毒刺水母 \",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":1,\"电\":2,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"毒刺水母\":{\"chinese_name\":\"毒刺水母\",\"id\":73,\"japanese_name\":\"ドククラゲ\",\"english_name\":\"Tentacruel\",\"height\":\"1.6\",\"weight\":\"55.0\",\"type\":[\"水\",\"毒\"],\"ability\":[\"恒净之躯\",\"污泥浆\"],\"隐藏特性\":[\"雨盘\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":1,\"电\":2,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"小拳石\":{\"chinese_name\":\"小拳石\",\"id\":74,\"japanese_name\":\"イシツブテ\",\"english_name\":\"Geodude\",\"height\":\"0.4\",\"weight\":\"20.0\",\"type\":[\"岩石\",\"地面\",\"电\"],\"ability\":[\"坚硬脑袋\",\"磁力\",\"结实\"],\"隐藏特性\":[\"沙隐\",\"电气皮肤\"],\"进化\":\"隆隆石 \",\"进化等级\":25,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.25,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":4,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"隆隆石\":{\"chinese_name\":\"隆隆石\",\"id\":75,\"japanese_name\":\"ゴローン\",\"english_name\":\"Graveler\",\"height\":\"1.0\",\"weight\":\"105.0\",\"type\":[\"岩石\",\"地面\",\"电\"],\"ability\":[\"坚硬脑袋\",\"磁力\",\"结实\"],\"隐藏特性\":[\"沙隐\",\"电气皮肤\"],\"进化\":\"隆隆岩 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.25,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":4,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"隆隆岩\":{\"chinese_name\":\"隆隆岩\",\"id\":76,\"japanese_name\":\"ゴローニャ\",\"english_name\":\"Golem\",\"height\":\"1.4\",\"weight\":\"300.0\",\"type\":[\"岩石\",\"地面\",\"电\"],\"ability\":[\"坚硬脑袋\",\"磁力\",\"结实\"],\"隐藏特性\":[\"沙隐\",\"电气皮肤\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.25,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":4,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"小火马\":{\"chinese_name\":\"小火马\",\"id\":77,\"japanese_name\":\"ポニータ\",\"english_name\":\"Ponyta\",\"height\":\"1.0\",\"weight\":\"30.0\",\"type\":[\"火\",\"超能力\"],\"ability\":[\"逃跑\",\"引火\",\"粉彩护幕\"],\"隐藏特性\":[\"火焰之躯\",\"危险预知\"],\"进化\":\"烈焰马 \",\"进化等级\":40,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"烈焰马\":{\"chinese_name\":\"烈焰马\",\"id\":78,\"japanese_name\":\"ギャロップ\",\"english_name\":\"Rapidash\",\"height\":\"1.7\",\"weight\":\"95.0\",\"type\":[\"火\",\"超能力\",\"妖精\"],\"ability\":[\"逃跑\",\"引火\",\"粉彩护幕\"],\"隐藏特性\":[\"火焰之躯\",\"危险预知\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"呆呆兽\":{\"chinese_name\":\"呆呆兽\",\"id\":79,\"japanese_name\":\"ヤドン\",\"english_name\":\"Slowpoke\",\"height\":\"1.2\",\"weight\":\"36.0\",\"type\":[\"水\",\"超能力\",\"\"],\"ability\":[\"迟钝\",\"我行我素\",\"贪吃鬼\"],\"隐藏特性\":[\"再生力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":0.5,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":1}},\"呆壳兽\":{\"chinese_name\":\"呆壳兽\",\"id\":80,\"japanese_name\":\"ヤドラン\",\"english_name\":\"Slowbro\",\"height\":\"1.6\",\"weight\":\"78.5\",\"type\":[\"水\",\"超能力\",\"毒\"],\"ability\":[\"迟钝\",\"我行我素\",\"硬壳盔甲\",\"速击\"],\"隐藏特性\":[\"再生力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":0.5,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":1}},\"小磁怪\":{\"chinese_name\":\"小磁怪\",\"id\":81,\"japanese_name\":\"コイル\",\"english_name\":\"Magnemite\",\"height\":\"0.3\",\"weight\":\"6.0\",\"type\":[\"电\",\"钢\"],\"ability\":[\"磁力\",\"结实\"],\"隐藏特性\":[\"分析\"],\"进化\":\"三合一磁怪 \",\"进化等级\":30,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.25,\"毒\":0,\"地面\":4,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.25,\"火\":2,\"水\":1,\"草\":0.5,\"电\":0.5,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"三合一磁怪\":{\"chinese_name\":\"三合一磁怪\",\"id\":82,\"japanese_name\":\"レアコイル\",\"english_name\":\"Magneton\",\"height\":\"1.0\",\"weight\":\"60.0\",\"type\":[\"电\",\"钢\"],\"ability\":[\"磁力\",\"结实\"],\"隐藏特性\":[\"分析\"],\"进化\":\"自爆磁怪 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.25,\"毒\":0,\"地面\":4,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.25,\"火\":2,\"水\":1,\"草\":0.5,\"电\":0.5,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"大葱鸭\":{\"chinese_name\":\"大葱鸭\",\"id\":83,\"japanese_name\":\"カモネギ\",\"english_name\":\"Farfetch'd\",\"height\":\"0.8\",\"weight\":\"15.0\",\"type\":[\"一般\",\"格斗\",\"飞行\",\"\"],\"ability\":[\"锐利目光\",\"不屈之心\",\"精神力\"],\"隐藏特性\":[\"不服输\",\"胆量\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"嘟嘟\":{\"chinese_name\":\"嘟嘟\",\"id\":84,\"japanese_name\":\"ドードー\",\"english_name\":\"Doduo\",\"height\":\"1.4\",\"weight\":\"39.2\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"逃跑\",\"早起\"],\"隐藏特性\":[\"蹒跚\"],\"进化\":\"嘟嘟利 \",\"进化等级\":31,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"嘟嘟利\":{\"chinese_name\":\"嘟嘟利\",\"id\":85,\"japanese_name\":\"ドードリオ\",\"english_name\":\"Dodrio\",\"height\":\"1.8\",\"weight\":\"85.2\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"逃跑\",\"早起\"],\"隐藏特性\":[\"蹒跚\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"小海狮\":{\"chinese_name\":\"小海狮\",\"id\":86,\"japanese_name\":\"パウワウ\",\"english_name\":\"Seel\",\"height\":\"1.1\",\"weight\":\"90.0\",\"type\":[\"水\"],\"ability\":[\"厚脂肪\",\"湿润之躯\"],\"隐藏特性\":[\"冰冻之躯\"],\"进化\":\"白海狮 \",\"进化等级\":34,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.25,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.25,\"龙\":1,\"恶\":1,\"妖精\":1}},\"白海狮\":{\"chinese_name\":\"白海狮\",\"id\":87,\"japanese_name\":\"ジュゴン\",\"english_name\":\"Dewgong\",\"height\":\"1.7\",\"weight\":\"120.0\",\"type\":[\"水\",\"冰\"],\"ability\":[\"厚脂肪\",\"湿润之躯\"],\"隐藏特性\":[\"冰冻之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.125,\"龙\":1,\"恶\":1,\"妖精\":1}},\"臭泥\":{\"chinese_name\":\"臭泥\",\"id\":88,\"japanese_name\":\"ベトベター\",\"english_name\":\"Grimer\",\"height\":\"0.9\",\"weight\":\"30.0\",\"type\":[\"毒\",\"恶\"],\"ability\":[\"恶臭\",\"黏着\",\"毒手\",\"贪吃鬼\"],\"隐藏特性\":[\"毒手\",\"化学之力\"],\"进化\":\"臭臭泥 \",\"进化等级\":38,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"臭臭泥\":{\"chinese_name\":\"臭臭泥\",\"id\":89,\"japanese_name\":\"ベトベトン\",\"english_name\":\"Muk\",\"height\":\"1.2\",\"weight\":\"30.0\",\"type\":[\"毒\",\"恶\"],\"ability\":[\"恶臭\",\"黏着\",\"毒手\",\"贪吃鬼\"],\"隐藏特性\":[\"毒手\",\"化学之力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"大舌贝\":{\"chinese_name\":\"大舌贝\",\"id\":90,\"japanese_name\":\"シェルダー\",\"english_name\":\"Shellder\",\"height\":\"0.3\",\"weight\":\"4.0\",\"type\":[\"水\"],\"ability\":[\"硬壳盔甲\",\"连续攻击\"],\"隐藏特性\":[\"防尘\"],\"进化\":\"刺甲贝\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"刺甲贝\":{\"chinese_name\":\"刺甲贝\",\"id\":91,\"japanese_name\":\"パルシェン\",\"english_name\":\"Cloyster\",\"height\":\"1.5\",\"weight\":\"132.5\",\"type\":[\"水\",\"冰\"],\"ability\":[\"硬壳盔甲\",\"连续攻击\"],\"隐藏特性\":[\"防尘\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.25,\"龙\":1,\"恶\":1,\"妖精\":1}},\"鬼斯\":{\"chinese_name\":\"鬼斯\",\"id\":92,\"japanese_name\":\"ゴース\",\"english_name\":\"Gastly\",\"height\":\"1.3\",\"weight\":\"0.1\",\"type\":[\"幽灵\",\"毒\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"鬼斯通 \",\"进化等级\":25,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.25,\"地面\":0,\"岩石\":1,\"虫\":0.25,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":0.5}},\"鬼斯通\":{\"chinese_name\":\"鬼斯通\",\"id\":93,\"japanese_name\":\"ゴースト\",\"english_name\":\"Haunter\",\"height\":\"1.6\",\"weight\":\"0.1\",\"type\":[\"幽灵\",\"毒\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"耿鬼 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.25,\"地面\":0,\"岩石\":1,\"虫\":0.25,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":0.5}},\"耿鬼\":{\"chinese_name\":\"耿鬼\",\"id\":94,\"japanese_name\":\"ゲンガー\",\"english_name\":\"Gengar\",\"height\":\"=1\",\"weight\":\"40.5\",\"type\":[\"幽灵\",\"毒\"],\"ability\":[\"诅咒之躯\",\"踩影\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.25,\"地面\":0,\"岩石\":1,\"虫\":0.25,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":0.5}},\"大岩蛇\":{\"chinese_name\":\"大岩蛇\",\"id\":95,\"japanese_name\":\"イワーク\",\"english_name\":\"Onix\",\"height\":\"8.8\",\"weight\":\"210.0\",\"type\":[\"岩石\",\"地面\"],\"ability\":[\"坚硬脑袋\",\"结实\"],\"隐藏特性\":[\"碎裂铠甲\"],\"进化\":\"大钢蛇\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.25,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":4,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"催眠貘\":{\"chinese_name\":\"催眠貘\",\"id\":96,\"japanese_name\":\"スリープ\",\"english_name\":\"Drowzee\",\"height\":\"1.0\",\"weight\":\"32.4\",\"type\":[\"超能力\"],\"ability\":[\"不眠\",\"预知梦\"],\"隐藏特性\":[\"精神力\"],\"进化\":\"引夢貘人 \",\"进化等级\":26,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"引梦貘人\":{\"chinese_name\":\"引梦貘人\",\"id\":97,\"japanese_name\":\"スリーパー\",\"english_name\":\"Hypno\",\"height\":\"1.6\",\"weight\":\"75.6\",\"type\":[\"超能力\"],\"ability\":[\"不眠\",\"预知梦\"],\"隐藏特性\":[\"精神力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"大钳蟹\":{\"chinese_name\":\"大钳蟹\",\"id\":98,\"japanese_name\":\"クラブ\",\"english_name\":\"Krabby\",\"height\":\"0.4\",\"weight\":\"6.5\",\"type\":[\"水\"],\"ability\":[\"怪力钳\",\"硬壳盔甲\"],\"隐藏特性\":[\"强行\"],\"进化\":\"巨钳蟹 \",\"进化等级\":28,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"巨钳蟹\":{\"chinese_name\":\"巨钳蟹\",\"id\":99,\"japanese_name\":\"キングラー\",\"english_name\":\"Kingler\",\"height\":\"1.3\",\"weight\":\"60.0\",\"type\":[\"水\"],\"ability\":[\"怪力钳\",\"硬壳盔甲\"],\"隐藏特性\":[\"强行\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"霹雳电球\":{\"chinese_name\":\"霹雳电球\",\"id\":100,\"japanese_name\":\"ビリリダマ\",\"english_name\":\"Voltorb\",\"height\":\"0.5\",\"weight\":\"10.4\",\"type\":[\"电\"],\"ability\":[\"隔音\",\"静电\"],\"隐藏特性\":[\"引爆\"],\"进化\":\"顽皮雷弹 \",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"顽皮雷弹\":{\"chinese_name\":\"顽皮雷弹\",\"id\":101,\"japanese_name\":\"マルマイン\",\"english_name\":\"Electrode\",\"height\":\"1.2\",\"weight\":\"66.6\",\"type\":[\"电\"],\"ability\":[\"隔音\",\"静电\"],\"隐藏特性\":[\"引爆\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"蛋蛋\":{\"chinese_name\":\"蛋蛋\",\"id\":102,\"japanese_name\":\"タマタマ\",\"english_name\":\"Exeggcute\",\"height\":\"0.4\",\"weight\":\"2.5\",\"type\":[\"草\",\"超能力\"],\"ability\":[\"叶绿素\"],\"隐藏特性\":[\"收获\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":4,\"幽灵\":2,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":0.5,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"椰蛋树\":{\"chinese_name\":\"椰蛋树\",\"id\":103,\"japanese_name\":\"ナッシー\",\"english_name\":\"Exeggutor\",\"height\":\"2.0\",\"weight\":\"120.0\",\"type\":[\"草\",\"超能力\",\"龙\"],\"ability\":[\"叶绿素\",\"察觉\"],\"隐藏特性\":[\"收获\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":4,\"幽灵\":2,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":0.5,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"卡拉卡拉\":{\"chinese_name\":\"卡拉卡拉\",\"id\":104,\"japanese_name\":\"カラカラ\",\"english_name\":\"Cubone\",\"height\":\"0.4\",\"weight\":\"6.5\",\"type\":[\"地面\"],\"ability\":[\"坚硬脑袋\",\"避雷针\"],\"隐藏特性\":[\"战斗盔甲\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"嘎啦嘎啦\":{\"chinese_name\":\"嘎啦嘎啦\",\"id\":105,\"japanese_name\":\"ガラガラ\",\"english_name\":\"Marowak\",\"height\":\"1.0\",\"weight\":\"45.0\",\"type\":[\"地面\",\"火\",\"幽灵\"],\"ability\":[\"坚硬脑袋\",\"避雷针\",\"诅咒之躯\",\"避雷针 \"],\"隐藏特性\":[\"战斗盔甲\",\"坚硬脑袋\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"飞腿郎\":{\"chinese_name\":\"飞腿郎\",\"id\":106,\"japanese_name\":\"サワムラー\",\"english_name\":\"Hitmonlee\",\"height\":\"1.5\",\"weight\":\"49.8\",\"type\":[\"格斗\"],\"ability\":[\"柔软\",\"舍身\"],\"隐藏特性\":[\"轻装\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"快拳郎\":{\"chinese_name\":\"快拳郎\",\"id\":107,\"japanese_name\":\"エビワラー\",\"english_name\":\"Hitmonchan\",\"height\":\"1.4\",\"weight\":\"50.2\",\"type\":[\"格斗\"],\"ability\":[\"锐利目光\",\"铁拳\"],\"隐藏特性\":[\"精神力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"大舌头\":{\"chinese_name\":\"大舌头\",\"id\":108,\"japanese_name\":\"ベロリンガ\",\"english_name\":\"Lickitung\",\"height\":\"1.2\",\"weight\":\"65.5\",\"type\":[\"一般\"],\"ability\":[\"我行我素\",\"迟钝\"],\"隐藏特性\":[\"无关天气\"],\"进化\":\"大舌舔 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"瓦斯弹\":{\"chinese_name\":\"瓦斯弹\",\"id\":109,\"japanese_name\":\"ドガース\",\"english_name\":\"Koffing\",\"height\":\"0.6\",\"weight\":\"1.0\",\"type\":[\"毒\"],\"ability\":[\"飘浮\",\"化学变化气体\"],\"隐藏特性\":[\"恶臭\"],\"进化\":\"双弹瓦斯 \",\"进化等级\":35,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"双弹瓦斯\":{\"chinese_name\":\"双弹瓦斯\",\"id\":110,\"japanese_name\":\"マタドガス\",\"english_name\":\"Weezing\",\"height\":\"1.2\",\"weight\":\"9.5\",\"type\":[\"毒\",\"妖精\"],\"ability\":[\"飘浮\",\"化学变化气体\"],\"隐藏特性\":[\"恶臭\",\"薄雾制造者\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"独角犀牛\":{\"chinese_name\":\"独角犀牛\",\"id\":111,\"japanese_name\":\"サイホーン\",\"english_name\":\"Rhyhorn\",\"height\":\"1.0\",\"weight\":\"115.0\",\"type\":[\"地面\",\"岩石\"],\"ability\":[\"避雷针\",\"坚硬脑袋\"],\"隐藏特性\":[\"舍身\"],\"进化\":\"钻角犀兽 \",\"进化等级\":42,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.25,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":4,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"钻角犀兽\":{\"chinese_name\":\"钻角犀兽\",\"id\":112,\"japanese_name\":\"サイドン\",\"english_name\":\"Rhydon\",\"height\":\"1.9\",\"weight\":\"120.0\",\"type\":[\"地面\",\"岩石\"],\"ability\":[\"避雷针\",\"坚硬脑袋\"],\"隐藏特性\":[\"舍身\"],\"进化\":\"超甲狂犀 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.25,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":4,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"吉利蛋\":{\"chinese_name\":\"吉利蛋\",\"id\":113,\"japanese_name\":\"ラッキー\",\"english_name\":\"Chansey\",\"height\":\"1.1\",\"weight\":\"34.6\",\"type\":[\"一般\"],\"ability\":[\"自然回复\",\"天恩\"],\"隐藏特性\":[\"治愈之心\"],\"进化\":\"幸福蛋\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"蔓藤怪\":{\"chinese_name\":\"蔓藤怪\",\"id\":114,\"japanese_name\":\"モンジャラ\",\"english_name\":\"Tangela\",\"height\":\"1.0\",\"weight\":\"35.0\",\"type\":[\"草\"],\"ability\":[\"叶绿素\",\"叶子防守\"],\"隐藏特性\":[\"再生力\"],\"进化\":\"巨蔓藤\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"袋兽\":{\"chinese_name\":\"袋兽\",\"id\":115,\"japanese_name\":\"ガルーラ\",\"english_name\":\"Kangaskhan\",\"height\":\"2.2\",\"weight\":\"=1\",\"type\":[\"一般\"],\"ability\":[\"早起\",\"胆量\",\"亲子爱\"],\"隐藏特性\":[\"精神力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"墨海马\":{\"chinese_name\":\"墨海马\",\"id\":116,\"japanese_name\":\"タッツー\",\"english_name\":\"Horsea\",\"height\":\"0.4\",\"weight\":\"8.0\",\"type\":[\"水\"],\"ability\":[\"悠游自如\",\"狙击手\"],\"隐藏特性\":[\"湿气\"],\"进化\":\"海刺龙 \",\"进化等级\":32,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"海刺龙\":{\"chinese_name\":\"海刺龙\",\"id\":117,\"japanese_name\":\"シードラ\",\"english_name\":\"Seadra\",\"height\":\"1.2\",\"weight\":\"25.0\",\"type\":[\"水\"],\"ability\":[\"毒刺\",\"狙击手\"],\"隐藏特性\":[\"湿气\"],\"进化\":\"刺龙王 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"角金鱼\":{\"chinese_name\":\"角金鱼\",\"id\":118,\"japanese_name\":\"トサキント\",\"english_name\":\"Goldeen\",\"height\":\"0.6\",\"weight\":\"15.0\",\"type\":[\"水\"],\"ability\":[\"悠游自如\",\"水幕\"],\"隐藏特性\":[\"避雷针\"],\"进化\":\"金鱼王 \",\"进化等级\":33,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"金鱼王\":{\"chinese_name\":\"金鱼王\",\"id\":119,\"japanese_name\":\"アズマオウ\",\"english_name\":\"Seaking\",\"height\":\"1.3\",\"weight\":\"39.0\",\"type\":[\"水\"],\"ability\":[\"悠游自如\",\"水幕\"],\"隐藏特性\":[\"避雷针\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"海星星\":{\"chinese_name\":\"海星星\",\"id\":120,\"japanese_name\":\"ヒトデマン\",\"english_name\":\"Staryu\",\"height\":\"0.8\",\"weight\":\"34.5\",\"type\":[\"水\"],\"ability\":[\"发光\",\"自然回复\"],\"隐藏特性\":[\"分析\"],\"进化\":\"宝石海星\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"宝石海星\":{\"chinese_name\":\"宝石海星\",\"id\":121,\"japanese_name\":\"スターミー\",\"english_name\":\"Starmie\",\"height\":\"1.1\",\"weight\":\"80.0\",\"type\":[\"水\",\"超能力\"],\"ability\":[\"发光\",\"自然回复\"],\"隐藏特性\":[\"分析\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":0.5,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":1}},\"魔墙人偶\":{\"chinese_name\":\"魔墙人偶\",\"id\":122,\"japanese_name\":\"バリヤード\",\"english_name\":\"Mr. Mime\",\"height\":\"1.3\",\"weight\":\"54.5\",\"type\":[\"超能力\",\"妖精\",\"冰\"],\"ability\":[\"隔音\",\"过滤\",\"干劲\",\"除障\"],\"隐藏特性\":[\"技术高手\",\"冰冻之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":1.5,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1.5,\"钢\":1.5,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":0,\"恶\":1,\"妖精\":1}},\"飞天螳螂\":{\"chinese_name\":\"飞天螳螂\",\"id\":123,\"japanese_name\":\"ストライク\",\"english_name\":\"Scyther\",\"height\":\"1.5\",\"weight\":\"56.0\",\"type\":[\"虫\",\"飞行\"],\"ability\":[\"虫之预感\",\"技术高手\"],\"隐藏特性\":[\"不屈之心\"],\"进化\":\"巨钳螳螂\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"迷唇姐\":{\"chinese_name\":\"迷唇姐\",\"id\":124,\"japanese_name\":\"ルージュラ\",\"english_name\":\"Jynx\",\"height\":\"1.4\",\"weight\":\"40.6\",\"type\":[\"冰\",\"超能力\"],\"ability\":[\"迟钝\",\"预知梦\"],\"隐藏特性\":[\"干燥皮肤\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":2,\"幽灵\":2,\"钢\":2,\"火\":2.5,\"水\":0,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":1}},\"电击兽\":{\"chinese_name\":\"电击兽\",\"id\":125,\"japanese_name\":\"エレブー\",\"english_name\":\"Electabuzz\",\"height\":\"1.1\",\"weight\":\"30.0\",\"type\":[\"电\"],\"ability\":[\"静电\"],\"隐藏特性\":[\"干劲\"],\"进化\":\"电击魔兽 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"鸭嘴火兽\":{\"chinese_name\":\"鸭嘴火兽\",\"id\":126,\"japanese_name\":\"ブーバー\",\"english_name\":\"Magmar\",\"height\":\"1.3\",\"weight\":\"44.5\",\"type\":[\"火\"],\"ability\":[\"火焰之躯\"],\"隐藏特性\":[\"干劲\"],\"进化\":\"鸭嘴炎兽 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"凯罗斯\":{\"chinese_name\":\"凯罗斯\",\"id\":127,\"japanese_name\":\"カイロス\",\"english_name\":\"Pinsir\",\"height\":\"1.5\",\"weight\":\"55.0\",\"type\":[\"虫\",\"飞行\"],\"ability\":[\"怪力钳\",\"破格\",\"飞行皮肤\"],\"隐藏特性\":[\"自信过度\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"肯泰罗\":{\"chinese_name\":\"肯泰罗\",\"id\":128,\"japanese_name\":\"ケンタロス\",\"english_name\":\"Tauros\",\"height\":\"1.4\",\"weight\":\"88.4\",\"type\":[\"一般\"],\"ability\":[\"威吓\",\"愤怒穴位\"],\"隐藏特性\":[\"强行\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"鲤鱼王\":{\"chinese_name\":\"鲤鱼王\",\"id\":129,\"japanese_name\":\"コイキング\",\"english_name\":\"Magikarp\",\"height\":\"0.9\",\"weight\":\"10.0\",\"type\":[\"水\"],\"ability\":[\"悠游自如\"],\"隐藏特性\":[\"胆怯\"],\"进化\":\"暴鲤龙 \",\"进化等级\":20,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"暴鲤龙\":{\"chinese_name\":\"暴鲤龙\",\"id\":130,\"japanese_name\":\"ギャラドス\",\"english_name\":\"Gyarados\",\"height\":\"6.5\",\"weight\":\"=1\",\"type\":[\"水\",\"飞行\",\"恶\"],\"ability\":[\"威吓\",\"破格\"],\"隐藏特性\":[\"自信过度\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":0,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"拉普拉斯\":{\"chinese_name\":\"拉普拉斯\",\"id\":131,\"japanese_name\":\"ラプラス\",\"english_name\":\"Lapras\",\"height\":\"2.5\",\"weight\":\"220.0\",\"type\":[\"水\",\"冰\"],\"ability\":[\"储水\",\"硬壳盔甲\"],\"隐藏特性\":[\"湿润之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":0,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.25,\"龙\":1,\"恶\":1,\"妖精\":1}},\"百变怪\":{\"chinese_name\":\"百变怪\",\"id\":132,\"japanese_name\":\"メタモン\",\"english_name\":\"Ditto\",\"height\":\"0.3\",\"weight\":\"4.0\",\"type\":[\"一般\"],\"ability\":[\"柔软\"],\"隐藏特性\":[\"变身者\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"伊布\":{\"chinese_name\":\"伊布\",\"id\":133,\"japanese_name\":\"イーブイ\",\"english_name\":\"Eevee\",\"height\":\"0.3\",\"weight\":\"6.5\",\"type\":[\"一般\"],\"ability\":[\"逃跑\",\"适应力\"],\"隐藏特性\":[\"危险预知\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"水伊布\":{\"chinese_name\":\"水伊布\",\"id\":134,\"japanese_name\":\"シャワーズ\",\"english_name\":\"Vaporeon\",\"height\":\"1.0\",\"weight\":\"29.0\",\"type\":[\"水\"],\"ability\":[\"储水\"],\"隐藏特性\":[\"湿润之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"雷伊布\":{\"chinese_name\":\"雷伊布\",\"id\":135,\"japanese_name\":\"サンダース\",\"english_name\":\"Jolteon\",\"height\":\"0.8\",\"weight\":\"24.5\",\"type\":[\"电\"],\"ability\":[\"蓄电\"],\"隐藏特性\":[\"飞毛腿\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"火伊布\":{\"chinese_name\":\"火伊布\",\"id\":136,\"japanese_name\":\"ブースター\",\"english_name\":\"Flareon\",\"height\":\"0.9\",\"weight\":\"25.0\",\"type\":[\"火\"],\"ability\":[\"引火\"],\"隐藏特性\":[\"毅力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"多边兽\":{\"chinese_name\":\"多边兽\",\"id\":137,\"japanese_name\":\"ポリゴン\",\"english_name\":\"Porygon\",\"height\":\"0.8\",\"weight\":\"36.5\",\"type\":[\"一般\"],\"ability\":[\"复制\",\"下载\"],\"隐藏特性\":[\"分析\"],\"进化\":\"多边兽Ⅱ\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"菊石兽\":{\"chinese_name\":\"菊石兽\",\"id\":138,\"japanese_name\":\"オムナイト\",\"english_name\":\"Omanyte\",\"height\":\"0.4\",\"weight\":\"7.5\",\"type\":[\"岩石\",\"水\"],\"ability\":[\"悠游自如\",\"硬壳盔甲\"],\"隐藏特性\":[\"碎裂铠甲\"],\"进化\":\"多刺菊石兽 \",\"进化等级\":40,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.25,\"水\":1,\"草\":4,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"多刺菊石兽\":{\"chinese_name\":\"多刺菊石兽\",\"id\":139,\"japanese_name\":\"オムスター\",\"english_name\":\"Omastar\",\"height\":\"1.0\",\"weight\":\"35.0\",\"type\":[\"岩石\",\"水\"],\"ability\":[\"悠游自如\",\"硬壳盔甲\"],\"隐藏特性\":[\"碎裂铠甲\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.25,\"水\":1,\"草\":4,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"化石盔\":{\"chinese_name\":\"化石盔\",\"id\":140,\"japanese_name\":\"カブト\",\"english_name\":\"Kabuto\",\"height\":\"0.5\",\"weight\":\"11.5\",\"type\":[\"岩石\",\"水\"],\"ability\":[\"悠游自如\",\"战斗盔甲\"],\"隐藏特性\":[\"碎裂铠甲\"],\"进化\":\"镰刀盔 \",\"进化等级\":40,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.25,\"水\":1,\"草\":4,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"镰刀盔\":{\"chinese_name\":\"镰刀盔\",\"id\":141,\"japanese_name\":\"カブトプス\",\"english_name\":\"Kabutops\",\"height\":\"1.3\",\"weight\":\"40.5\",\"type\":[\"岩石\",\"水\"],\"ability\":[\"悠游自如\",\"战斗盔甲\"],\"隐藏特性\":[\"碎裂铠甲\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.25,\"水\":1,\"草\":4,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"化石翼龙\":{\"chinese_name\":\"化石翼龙\",\"id\":142,\"japanese_name\":\"プテラ\",\"english_name\":\"Aerodactyl\",\"height\":\"=1\",\"weight\":\"=1\",\"type\":[\"岩石\",\"飞行\"],\"ability\":[\"坚硬脑袋\",\"压迫感\",\"硬爪\"],\"隐藏特性\":[\"紧张感\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0.5,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":1,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"卡比兽\":{\"chinese_name\":\"卡比兽\",\"id\":143,\"japanese_name\":\"カビゴン\",\"english_name\":\"Snorlax\",\"height\":\"2.1\",\"weight\":\"460.0\",\"type\":[\"一般\"],\"ability\":[\"免疫\",\"厚脂肪\"],\"隐藏特性\":[\"贪吃鬼\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":0.5,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"急冻鸟\":{\"chinese_name\":\"急冻鸟\",\"id\":144,\"japanese_name\":\"フリーザー\",\"english_name\":\"Articuno\",\"height\":\"1.7\",\"weight\":\"55.4\",\"type\":[\"冰\",\"飞行\",\"超能力\"],\"ability\":[\"压迫感\",\"好胜\"],\"隐藏特性\":[\"雪隐\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"闪电鸟\":{\"chinese_name\":\"闪电鸟\",\"id\":145,\"japanese_name\":\"サンダー\",\"english_name\":\"Zapdos\",\"height\":\"1.6\",\"weight\":\"52.6\",\"type\":[\"电\",\"飞行\",\"格斗\"],\"ability\":[\"压迫感\",\"不服输\"],\"隐藏特性\":[\"静电\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":0.5,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"火焰鸟\":{\"chinese_name\":\"火焰鸟\",\"id\":146,\"japanese_name\":\"ファイヤー\",\"english_name\":\"Moltres\",\"height\":\"2.0\",\"weight\":\"60.0\",\"type\":[\"火\",\"飞行\",\"恶\"],\"ability\":[\"压迫感\",\"怒火冲天\"],\"隐藏特性\":[\"火焰之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"迷你龙\":{\"chinese_name\":\"迷你龙\",\"id\":147,\"japanese_name\":\"ミニリュウ\",\"english_name\":\"Dratini\",\"height\":\"1.8\",\"weight\":\"3.3\",\"type\":[\"龙\"],\"ability\":[\"蜕皮\"],\"隐藏特性\":[\"神奇鳞片\"],\"进化\":\"哈克龙 \",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"哈克龙\":{\"chinese_name\":\"哈克龙\",\"id\":148,\"japanese_name\":\"ハクリュー\",\"english_name\":\"Dragonair\",\"height\":\"4.0\",\"weight\":\"16.5\",\"type\":[\"龙\"],\"ability\":[\"蜕皮\"],\"隐藏特性\":[\"神奇鳞片\"],\"进化\":\"快龙 \",\"进化等级\":55,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"快龙\":{\"chinese_name\":\"快龙\",\"id\":149,\"japanese_name\":\"カイリュー\",\"english_name\":\"Dragonite\",\"height\":\"2.2\",\"weight\":\"210.0\",\"type\":[\"龙\",\"飞行\"],\"ability\":[\"精神力\"],\"隐藏特性\":[\"多重鳞片\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.25,\"电\":1,\"超能力\":1,\"冰\":4,\"龙\":2,\"恶\":1,\"妖精\":2}},\"超梦\":{\"chinese_name\":\"超梦\",\"id\":150,\"japanese_name\":\"ミュウツー\",\"english_name\":\"Mewtwo\",\"height\":\"=1\",\"weight\":\"=1\",\"type\":[\"超能力\",\"格斗\"],\"ability\":[\"压迫感\",\"不屈之心\",\"不眠\"],\"隐藏特性\":[\"紧张感\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":2}},\"梦幻\":{\"chinese_name\":\"梦幻\",\"id\":151,\"japanese_name\":\"ミュウ\",\"english_name\":\"Mew\",\"height\":\"0.4\",\"weight\":\"4.0\",\"type\":[\"超能力\"],\"ability\":[\"同步\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"菊草叶\":{\"chinese_name\":\"菊草叶\",\"id\":152,\"japanese_name\":\"チコリータ\",\"english_name\":\"Chikorita\",\"height\":\"0.9\",\"weight\":\"6.4\",\"type\":[\"草\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"叶子防守\"],\"进化\":\"月桂叶 \",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"月桂叶\":{\"chinese_name\":\"月桂叶\",\"id\":153,\"japanese_name\":\"ベイリーフ\",\"english_name\":\"Bayleef\",\"height\":\"1.2\",\"weight\":\"15.8\",\"type\":[\"草\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"叶子防守\"],\"进化\":\"大竺葵 \",\"进化等级\":32,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"大竺葵\":{\"chinese_name\":\"大竺葵\",\"id\":154,\"japanese_name\":\"メガニウム\",\"english_name\":\"Meganium\",\"height\":\"1.8\",\"weight\":\"100.5\",\"type\":[\"草\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"叶子防守\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"火球鼠\":{\"chinese_name\":\"火球鼠\",\"id\":155,\"japanese_name\":\"ヒノアラシ\",\"english_name\":\"Cyndaquil\",\"height\":\"0.5\",\"weight\":\"7.9\",\"type\":[\"火\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"引火\"],\"进化\":\"火岩鼠 \",\"进化等级\":14,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"火岩鼠\":{\"chinese_name\":\"火岩鼠\",\"id\":156,\"japanese_name\":\"マグマラシ\",\"english_name\":\"Quilava\",\"height\":\"0.9\",\"weight\":\"19.0\",\"type\":[\"火\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"引火\"],\"进化\":\"火暴兽 \",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"火暴兽\":{\"chinese_name\":\"火暴兽\",\"id\":157,\"japanese_name\":\"バクフーン\",\"english_name\":\"Typhlosion\",\"height\":\"1.7\",\"weight\":\"79.5\",\"type\":[\"火\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"引火\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"小锯鳄\":{\"chinese_name\":\"小锯鳄\",\"id\":158,\"japanese_name\":\"ワニノコ\",\"english_name\":\"Totodile\",\"height\":\"0.6\",\"weight\":\"9.5\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"强行\"],\"进化\":\"蓝鳄 \",\"进化等级\":18,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"蓝鳄\":{\"chinese_name\":\"蓝鳄\",\"id\":159,\"japanese_name\":\"アリゲイツ\",\"english_name\":\"Croconaw\",\"height\":\"1.1\",\"weight\":\"25.0\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"强行\"],\"进化\":\"大力鳄 \",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"大力鳄\":{\"chinese_name\":\"大力鳄\",\"id\":160,\"japanese_name\":\"オーダイル\",\"english_name\":\"Feraligatr\",\"height\":\"2.3\",\"weight\":\"88.8\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"强行\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"尾立\":{\"chinese_name\":\"尾立\",\"id\":161,\"japanese_name\":\"オタチ\",\"english_name\":\"Sentret\",\"height\":\"0.8\",\"weight\":\"6.0\",\"type\":[\"一般\"],\"ability\":[\"逃跑\",\"锐利目光\"],\"隐藏特性\":[\"察觉\"],\"进化\":\"大尾立 \",\"进化等级\":15,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"大尾立\":{\"chinese_name\":\"大尾立\",\"id\":162,\"japanese_name\":\"オオタチ\",\"english_name\":\"Furret\",\"height\":\"1.8\",\"weight\":\"32.5\",\"type\":[\"一般\"],\"ability\":[\"逃跑\",\"锐利目光\"],\"隐藏特性\":[\"察觉\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"咕咕\":{\"chinese_name\":\"咕咕\",\"id\":163,\"japanese_name\":\"ホーホー\",\"english_name\":\"Hoothoot\",\"height\":\"0.7\",\"weight\":\"21.2\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"不眠\",\"锐利目光\"],\"隐藏特性\":[\"有色眼镜\"],\"进化\":\"猫头夜鹰 \",\"进化等级\":20,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"猫头夜鹰\":{\"chinese_name\":\"猫头夜鹰\",\"id\":164,\"japanese_name\":\"ヨルノズク\",\"english_name\":\"Noctowl\",\"height\":\"1.6\",\"weight\":\"40.8\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"不眠\",\"锐利目光\"],\"隐藏特性\":[\"有色眼镜\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"芭瓢虫\":{\"chinese_name\":\"芭瓢虫\",\"id\":165,\"japanese_name\":\"レディバ\",\"english_name\":\"Ledyba\",\"height\":\"1.0\",\"weight\":\"10.8\",\"type\":[\"虫\",\"飞行\"],\"ability\":[\"虫之预感\",\"早起\"],\"隐藏特性\":[\"胆怯\"],\"进化\":\"安瓢虫 \",\"进化等级\":18,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"安瓢虫\":{\"chinese_name\":\"安瓢虫\",\"id\":166,\"japanese_name\":\"レディアン\",\"english_name\":\"Ledian\",\"height\":\"1.4\",\"weight\":\"35.6\",\"type\":[\"虫\",\"飞行\"],\"ability\":[\"虫之预感\",\"早起\"],\"隐藏特性\":[\"铁拳\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"圆丝蛛\":{\"chinese_name\":\"圆丝蛛\",\"id\":167,\"japanese_name\":\"イトマル\",\"english_name\":\"Spinarak\",\"height\":\"0.5\",\"weight\":\"8.5\",\"type\":[\"虫\",\"毒\"],\"ability\":[\"虫之预感\",\"不眠\"],\"隐藏特性\":[\"狙击手\"],\"进化\":\"阿利多斯 \",\"进化等级\":22,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"阿利多斯\":{\"chinese_name\":\"阿利多斯\",\"id\":168,\"japanese_name\":\"アリアドス\",\"english_name\":\"Ariados\",\"height\":\"1.1\",\"weight\":\"33.5\",\"type\":[\"虫\",\"毒\"],\"ability\":[\"虫之预感\",\"不眠\"],\"隐藏特性\":[\"狙击手\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"叉字蝠\":{\"chinese_name\":\"叉字蝠\",\"id\":169,\"japanese_name\":\"クロバット\",\"english_name\":\"Crobat\",\"height\":\"1.8\",\"weight\":\"75.0\",\"type\":[\"毒\",\"飞行\"],\"ability\":[\"精神力\"],\"隐藏特性\":[\"穿透\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":2,\"虫\":0.25,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"灯笼鱼\":{\"chinese_name\":\"灯笼鱼\",\"id\":170,\"japanese_name\":\"チョンチー\",\"english_name\":\"Chinchou\",\"height\":\"0.5\",\"weight\":\"12.0\",\"type\":[\"水\",\"电\"],\"ability\":[\"蓄电\",\"发光\"],\"隐藏特性\":[\"储水\"],\"进化\":\"电灯怪 \",\"进化等级\":27,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.25,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"电灯怪\":{\"chinese_name\":\"电灯怪\",\"id\":171,\"japanese_name\":\"ランターン\",\"english_name\":\"Lanturn\",\"height\":\"1.2\",\"weight\":\"22.5\",\"type\":[\"水\",\"电\"],\"ability\":[\"蓄电\",\"发光\"],\"隐藏特性\":[\"储水\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.25,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"皮丘\":{\"chinese_name\":\"皮丘\",\"id\":172,\"japanese_name\":\"ピチュー\",\"english_name\":\"Pichu\",\"height\":\"0.3\",\"weight\":\"2.0\",\"type\":[\"电\"],\"ability\":[\"静电\"],\"隐藏特性\":[\"避雷针\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"皮宝宝\":{\"chinese_name\":\"皮宝宝\",\"id\":173,\"japanese_name\":\"ピィ\",\"english_name\":\"Cleffa\",\"height\":\"0.3\",\"weight\":\"3.0\",\"type\":[\"妖精\"],\"ability\":[\"迷人之躯\",\"魔法防守\"],\"隐藏特性\":[\"友情防守\"],\"进化\":\"皮皮\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"宝宝丁\":{\"chinese_name\":\"宝宝丁\",\"id\":174,\"japanese_name\":\"ププリン\",\"english_name\":\"Igglybuff\",\"height\":\"0.3\",\"weight\":\"1.0\",\"type\":[\"一般\",\"妖精\"],\"ability\":[\"迷人之躯\",\"好胜\"],\"隐藏特性\":[\"友情防守\"],\"进化\":\"胖丁\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":0,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"波克比\":{\"chinese_name\":\"波克比\",\"id\":175,\"japanese_name\":\"トゲピー\",\"english_name\":\"Togepi\",\"height\":\"0.3\",\"weight\":\"1.5\",\"type\":[\"妖精\"],\"ability\":[\"活力\",\"天恩\"],\"隐藏特性\":[\"超幸运\"],\"进化\":\"波克基古\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"波克基古\":{\"chinese_name\":\"波克基古\",\"id\":176,\"japanese_name\":\"トゲチック\",\"english_name\":\"Togetic\",\"height\":\"0.6\",\"weight\":\"3.2\",\"type\":[\"妖精\",\"飞行\"],\"ability\":[\"活力\",\"天恩\"],\"隐藏特性\":[\"超幸运\"],\"进化\":\"波克基斯\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":2,\"地面\":0,\"岩石\":2,\"虫\":0.25,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"天然雀\":{\"chinese_name\":\"天然雀\",\"id\":177,\"japanese_name\":\"ネイティ\",\"english_name\":\"Natu\",\"height\":\"0.2\",\"weight\":\"2.0\",\"type\":[\"超能力\",\"飞行\"],\"ability\":[\"同步\",\"早起\"],\"隐藏特性\":[\"魔法镜\"],\"进化\":\"天然鸟 \",\"进化等级\":25,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":0.5,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"天然鸟\":{\"chinese_name\":\"天然鸟\",\"id\":178,\"japanese_name\":\"ネイティオ\",\"english_name\":\"Xatu\",\"height\":\"1.5\",\"weight\":\"15.0\",\"type\":[\"超能力\",\"飞行\"],\"ability\":[\"同步\",\"早起\"],\"隐藏特性\":[\"魔法镜\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":0.5,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"咩利羊\":{\"chinese_name\":\"咩利羊\",\"id\":179,\"japanese_name\":\"メリープ\",\"english_name\":\"Mareep\",\"height\":\"0.6\",\"weight\":\"7.8\",\"type\":[\"电\"],\"ability\":[\"静电\"],\"隐藏特性\":[\"正电\"],\"进化\":\"茸茸羊 \",\"进化等级\":15,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"茸茸羊\":{\"chinese_name\":\"茸茸羊\",\"id\":180,\"japanese_name\":\"モココ\",\"english_name\":\"Flaaffy\",\"height\":\"0.8\",\"weight\":\"13.3\",\"type\":[\"电\"],\"ability\":[\"静电\"],\"隐藏特性\":[\"正电\"],\"进化\":\"电龙 \",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"电龙\":{\"chinese_name\":\"电龙\",\"id\":181,\"japanese_name\":\"デンリュウ\",\"english_name\":\"Ampharos\",\"height\":\"1.4\",\"weight\":\"61.5\",\"type\":[\"电\",\"龙\"],\"ability\":[\"静电\",\"破格\"],\"隐藏特性\":[\"正电\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.25,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"美丽花\":{\"chinese_name\":\"美丽花\",\"id\":182,\"japanese_name\":\"キレイハナ\",\"english_name\":\"Bellossom\",\"height\":\"0.4\",\"weight\":\"5.8\",\"type\":[\"草\"],\"ability\":[\"叶绿素\"],\"隐藏特性\":[\"治愈之心\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"玛力露\":{\"chinese_name\":\"玛力露\",\"id\":183,\"japanese_name\":\"マリル\",\"english_name\":\"Marill\",\"height\":\"0.4\",\"weight\":\"8.5\",\"type\":[\"水\",\"妖精\"],\"ability\":[\"厚脂肪\",\"大力士\"],\"隐藏特性\":[\"食草\"],\"进化\":\"玛力露丽\",\"进化等级\":18,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.25,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.25,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"玛力露丽\":{\"chinese_name\":\"玛力露丽\",\"id\":184,\"japanese_name\":\"マリルリ\",\"english_name\":\"Azumarill\",\"height\":\"0.8\",\"weight\":\"28.5\",\"type\":[\"水\",\"妖精\"],\"ability\":[\"厚脂肪\",\"大力士\"],\"隐藏特性\":[\"食草\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.25,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.25,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"树才怪\":{\"chinese_name\":\"树才怪\",\"id\":185,\"japanese_name\":\"ウソッキー\",\"english_name\":\"Sudowoodo\",\"height\":\"1.2\",\"weight\":\"38.0\",\"type\":[\"岩石\"],\"ability\":[\"结实\",\"坚硬脑袋\"],\"隐藏特性\":[\"胆怯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"蚊香蛙皇\":{\"chinese_name\":\"蚊香蛙皇\",\"id\":186,\"japanese_name\":\"ニョロトノ\",\"english_name\":\"Politoed\",\"height\":\"1.1\",\"weight\":\"33.9\",\"type\":[\"水\"],\"ability\":[\"储水\",\"湿气\"],\"隐藏特性\":[\"降雨\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"毽子草\":{\"chinese_name\":\"毽子草\",\"id\":187,\"japanese_name\":\"ハネッコ\",\"english_name\":\"Hoppip\",\"height\":\"0.4\",\"weight\":\"0.5\",\"type\":[\"草\",\"飞行\"],\"ability\":[\"叶绿素\",\"叶子防守\"],\"隐藏特性\":[\"穿透\"],\"进化\":\"毽子花 \",\"进化等级\":18,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":2,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":1,\"超能力\":1,\"冰\":4,\"龙\":1,\"恶\":1,\"妖精\":1}},\"毽子花\":{\"chinese_name\":\"毽子花\",\"id\":188,\"japanese_name\":\"ポポッコ\",\"english_name\":\"Skiploom\",\"height\":\"0.6\",\"weight\":\"1.0\",\"type\":[\"草\",\"飞行\"],\"ability\":[\"叶绿素\",\"叶子防守\"],\"隐藏特性\":[\"穿透\"],\"进化\":\"毽子棉 \",\"进化等级\":27,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":2,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":1,\"超能力\":1,\"冰\":4,\"龙\":1,\"恶\":1,\"妖精\":1}},\"毽子棉\":{\"chinese_name\":\"毽子棉\",\"id\":189,\"japanese_name\":\"ワタッコ\",\"english_name\":\"Jumpluff\",\"height\":\"0.8\",\"weight\":\"3.0\",\"type\":[\"草\",\"飞行\"],\"ability\":[\"叶绿素\",\"叶子防守\"],\"隐藏特性\":[\"穿透\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":2,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":1,\"超能力\":1,\"冰\":4,\"龙\":1,\"恶\":1,\"妖精\":1}},\"长尾怪手\":{\"chinese_name\":\"长尾怪手\",\"id\":190,\"japanese_name\":\"エイパム\",\"english_name\":\"Aipom\",\"height\":\"0.8\",\"weight\":\"11.5\",\"type\":[\"一般\"],\"ability\":[\"逃跑\",\"捡拾\"],\"隐藏特性\":[\"连续攻击\"],\"进化\":\"双尾怪手\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"向日种子\":{\"chinese_name\":\"向日种子\",\"id\":191,\"japanese_name\":\"ヒマナッツ\",\"english_name\":\"Sunkern\",\"height\":\"0.3\",\"weight\":\"1.8\",\"type\":[\"草\"],\"ability\":[\"叶绿素\",\"太阳之力\"],\"隐藏特性\":[\"早起\"],\"进化\":\"向日花怪\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"向日花怪\":{\"chinese_name\":\"向日花怪\",\"id\":192,\"japanese_name\":\"キマワリ\",\"english_name\":\"Sunflora\",\"height\":\"0.8\",\"weight\":\"8.5\",\"type\":[\"草\"],\"ability\":[\"叶绿素\",\"太阳之力\"],\"隐藏特性\":[\"早起\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"蜻蜻蜓\":{\"chinese_name\":\"蜻蜻蜓\",\"id\":193,\"japanese_name\":\"ヤンヤンマ\",\"english_name\":\"Yanma\",\"height\":\"1.2\",\"weight\":\"38.0\",\"type\":[\"虫\",\"飞行\"],\"ability\":[\"加速\",\"复眼\"],\"隐藏特性\":[\"察觉\"],\"进化\":\"远古巨蜓\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"乌波\":{\"chinese_name\":\"乌波\",\"id\":194,\"japanese_name\":\"ウパー\",\"english_name\":\"Wooper\",\"height\":\"0.4\",\"weight\":\"8.5\",\"type\":[\"水\",\"地面\"],\"ability\":[\"湿气\",\"储水\"],\"隐藏特性\":[\"纯朴\"],\"进化\":\"沼王 \",\"进化等级\":20,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"沼王\":{\"chinese_name\":\"沼王\",\"id\":195,\"japanese_name\":\"ヌオー\",\"english_name\":\"Quagsire\",\"height\":\"1.4\",\"weight\":\"75.0\",\"type\":[\"水\",\"地面\"],\"ability\":[\"湿气\",\"储水\"],\"隐藏特性\":[\"纯朴\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"太阳伊布\":{\"chinese_name\":\"太阳伊布\",\"id\":196,\"japanese_name\":\"エーフィ\",\"english_name\":\"Espeon\",\"height\":\"0.9\",\"weight\":\"26.5\",\"type\":[\"超能力\"],\"ability\":[\"同步\"],\"隐藏特性\":[\"魔法镜\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"月亮伊布\":{\"chinese_name\":\"月亮伊布\",\"id\":197,\"japanese_name\":\"ブラッキー\",\"english_name\":\"Umbreon\",\"height\":\"1.0\",\"weight\":\"27.0\",\"type\":[\"恶\"],\"ability\":[\"同步\"],\"隐藏特性\":[\"精神力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"黑暗鸦\":{\"chinese_name\":\"黑暗鸦\",\"id\":198,\"japanese_name\":\"ヤミカラス\",\"english_name\":\"Murkrow\",\"height\":\"0.5\",\"weight\":\"2.1\",\"type\":[\"恶\",\"飞行\"],\"ability\":[\"不眠\",\"超幸运\"],\"隐藏特性\":[\"恶作剧之心\"],\"进化\":\"乌鸦头头\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":0,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"呆呆王\":{\"chinese_name\":\"呆呆王\",\"id\":199,\"japanese_name\":\"ヤドキング\",\"english_name\":\"Slowking\",\"height\":\"2.0\",\"weight\":\"79.5\",\"type\":[\"水\",\"超能力\",\"毒\"],\"ability\":[\"迟钝\",\"我行我素\",\"怪药\"],\"隐藏特性\":[\"再生力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":0.5,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":1}},\"梦妖\":{\"chinese_name\":\"梦妖\",\"id\":200,\"japanese_name\":\"ムウマ\",\"english_name\":\"Misdreavus\",\"height\":\"0.7\",\"weight\":\"1.0\",\"type\":[\"幽灵\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"梦妖魔\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"未知图腾\":{\"chinese_name\":\"未知图腾\",\"id\":201,\"japanese_name\":\"アンノーン\",\"english_name\":\"Unown\",\"height\":\"0.5\",\"weight\":\"5.0\",\"type\":[\"超能力\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"果然翁\":{\"chinese_name\":\"果然翁\",\"id\":202,\"japanese_name\":\"ソーナンス\",\"english_name\":\"Wobbuffet\",\"height\":\"1.3\",\"weight\":\"28.5\",\"type\":[\"超能力\"],\"ability\":[\"踩影\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"麒麟奇\":{\"chinese_name\":\"麒麟奇\",\"id\":203,\"japanese_name\":\"キリンリキ\",\"english_name\":\"Girafarig\",\"height\":\"1.5\",\"weight\":\"41.5\",\"type\":[\"一般\",\"超能力\"],\"ability\":[\"精神力\",\"早起\"],\"隐藏特性\":[\"食草\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"榛果球\":{\"chinese_name\":\"榛果球\",\"id\":204,\"japanese_name\":\"クヌギダマ\",\"english_name\":\"Pineco\",\"height\":\"0.6\",\"weight\":\"7.2\",\"type\":[\"虫\"],\"ability\":[\"结实\"],\"隐藏特性\":[\"防尘\"],\"进化\":\"佛烈托斯 \",\"进化等级\":31,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"佛烈托斯\":{\"chinese_name\":\"佛烈托斯\",\"id\":205,\"japanese_name\":\"フォレトス\",\"english_name\":\"Forretress\",\"height\":\"1.2\",\"weight\":\"125.8\",\"type\":[\"虫\",\"钢\"],\"ability\":[\"结实\"],\"隐藏特性\":[\"防尘\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":1,\"毒\":0,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":4,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"土龙弟弟\":{\"chinese_name\":\"土龙弟弟\",\"id\":206,\"japanese_name\":\"ノコッチ\",\"english_name\":\"Dunsparce\",\"height\":\"1.5\",\"weight\":\"14.0\",\"type\":[\"一般\"],\"ability\":[\"天恩\",\"逃跑\"],\"隐藏特性\":[\"胆怯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"天蝎\":{\"chinese_name\":\"天蝎\",\"id\":207,\"japanese_name\":\"グライガー\",\"english_name\":\"Gligar\",\"height\":\"1.1\",\"weight\":\"64.8\",\"type\":[\"地面\",\"飞行\"],\"ability\":[\"怪力钳\",\"沙隐\"],\"隐藏特性\":[\"免疫\"],\"进化\":\"天蝎王\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":4,\"龙\":1,\"恶\":1,\"妖精\":1}},\"大钢蛇\":{\"chinese_name\":\"大钢蛇\",\"id\":208,\"japanese_name\":\"ハガネール\",\"english_name\":\"Steelix\",\"height\":\"9.2\",\"weight\":\"400.0\",\"type\":[\"钢\",\"地面\"],\"ability\":[\"坚硬脑袋\",\"结实\",\"沙之力\"],\"隐藏特性\":[\"强行\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.25,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":2,\"草\":1,\"电\":0,\"超能力\":0.5,\"冰\":1,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"布鲁\":{\"chinese_name\":\"布鲁\",\"id\":209,\"japanese_name\":\"ブルー\",\"english_name\":\"Snubbull\",\"height\":\"0.6\",\"weight\":\"7.8\",\"type\":[\"妖精\"],\"ability\":[\"威吓\",\"逃跑\"],\"隐藏特性\":[\"胆怯\"],\"进化\":\"布鲁皇 \",\"进化等级\":23,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"布鲁皇\":{\"chinese_name\":\"布鲁皇\",\"id\":210,\"japanese_name\":\"グランブル\",\"english_name\":\"Granbull\",\"height\":\"1.4\",\"weight\":\"48.7\",\"type\":[\"妖精\"],\"ability\":[\"威吓\",\"飞毛腿\"],\"隐藏特性\":[\"胆怯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"千针鱼\":{\"chinese_name\":\"千针鱼\",\"id\":211,\"japanese_name\":\"ハリーセン\",\"english_name\":\"Qwilfish\",\"height\":\"0.5\",\"weight\":\"3.9\",\"type\":[\"水\",\"毒\"],\"ability\":[\"毒刺\",\"悠游自如\"],\"隐藏特性\":[\"威吓\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":1,\"电\":2,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"巨钳螳螂\":{\"chinese_name\":\"巨钳螳螂\",\"id\":212,\"japanese_name\":\"ハッサム\",\"english_name\":\"Scizor\",\"height\":\"=1\",\"weight\":\"=1\",\"type\":[\"虫\",\"钢\"],\"ability\":[\"虫之预感\",\"技术高手\"],\"隐藏特性\":[\"轻金属\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":1,\"毒\":0,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":4,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"壶壶\":{\"chinese_name\":\"壶壶\",\"id\":213,\"japanese_name\":\"ツボツボ\",\"english_name\":\"Shuckle\",\"height\":\"0.6\",\"weight\":\"20.5\",\"type\":[\"虫\",\"岩石\"],\"ability\":[\"结实\",\"贪吃鬼\"],\"隐藏特性\":[\"唱反调\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":2,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"赫拉克罗斯\":{\"chinese_name\":\"赫拉克罗斯\",\"id\":214,\"japanese_name\":\"ヘラクロス\",\"english_name\":\"Heracross\",\"height\":\"=2\",\"weight\":\"=1\",\"type\":[\"虫\",\"格斗\"],\"ability\":[\"虫之预感\",\"毅力\",\"连续攻击\"],\"隐藏特性\":[\"自信过度\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":4,\"毒\":1,\"地面\":0.5,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"狃拉\":{\"chinese_name\":\"狃拉\",\"id\":215,\"japanese_name\":\"ニューラ\",\"english_name\":\"Sneasel\",\"height\":\"0.9\",\"weight\":\"28.0\",\"type\":[\"恶\",\"冰\"],\"ability\":[\"精神力\",\"锐利目光\"],\"隐藏特性\":[\"顺手牵羊\"],\"进化\":\"玛狃拉\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":4,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":2,\"幽灵\":0.5,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"熊宝宝\":{\"chinese_name\":\"熊宝宝\",\"id\":216,\"japanese_name\":\"ヒメグマ\",\"english_name\":\"Teddiursa\",\"height\":\"0.6\",\"weight\":\"8.8\",\"type\":[\"一般\"],\"ability\":[\"捡拾\",\"飞毛腿\"],\"隐藏特性\":[\"采蜜\"],\"进化\":\"圈圈熊 \",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"圈圈熊\":{\"chinese_name\":\"圈圈熊\",\"id\":217,\"japanese_name\":\"リングマ\",\"english_name\":\"Ursaring\",\"height\":\"1.8\",\"weight\":\"125.8\",\"type\":[\"一般\"],\"ability\":[\"毅力\",\"飞毛腿\"],\"隐藏特性\":[\"紧张感\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"熔岩虫\":{\"chinese_name\":\"熔岩虫\",\"id\":218,\"japanese_name\":\"マグマッグ\",\"english_name\":\"Slugma\",\"height\":\"0.7\",\"weight\":\"35.0\",\"type\":[\"火\"],\"ability\":[\"熔岩铠甲\",\"火焰之躯\"],\"隐藏特性\":[\"碎裂铠甲\"],\"进化\":\"熔岩蜗牛 \",\"进化等级\":38,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"熔岩蜗牛\":{\"chinese_name\":\"熔岩蜗牛\",\"id\":219,\"japanese_name\":\"マグカルゴ\",\"english_name\":\"Magcargo\",\"height\":\"0.8\",\"weight\":\"55.0\",\"type\":[\"火\",\"岩石\"],\"ability\":[\"熔岩铠甲\",\"火焰之躯\"],\"隐藏特性\":[\"碎裂铠甲\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":4,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.25,\"水\":4,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"小山猪\":{\"chinese_name\":\"小山猪\",\"id\":220,\"japanese_name\":\"ウリムー\",\"english_name\":\"Swinub\",\"height\":\"0.4\",\"weight\":\"6.5\",\"type\":[\"冰\",\"地面\"],\"ability\":[\"迟钝\",\"雪隐\"],\"隐藏特性\":[\"厚脂肪\"],\"进化\":\"长毛猪 \",\"进化等级\":33,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"长毛猪\":{\"chinese_name\":\"长毛猪\",\"id\":221,\"japanese_name\":\"イノムー\",\"english_name\":\"Piloswine\",\"height\":\"1.1\",\"weight\":\"55.8\",\"type\":[\"冰\",\"地面\"],\"ability\":[\"迟钝\",\"雪隐\"],\"隐藏特性\":[\"厚脂肪\"],\"进化\":\"象牙猪 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"太阳珊瑚\":{\"chinese_name\":\"太阳珊瑚\",\"id\":222,\"japanese_name\":\"サニーゴ\",\"english_name\":\"Corsola\",\"height\":\"0.6\",\"weight\":\"5.0\",\"type\":[\"水\",\"岩石\",\"幽灵\",\"\"],\"ability\":[\"活力\",\"自然回复\",\"碎裂铠甲\"],\"隐藏特性\":[\"再生力\",\"诅咒之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.25,\"水\":1,\"草\":4,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"铁炮鱼\":{\"chinese_name\":\"铁炮鱼\",\"id\":223,\"japanese_name\":\"テッポウオ\",\"english_name\":\"Remoraid\",\"height\":\"0.6\",\"weight\":\"12.0\",\"type\":[\"水\"],\"ability\":[\"活力\",\"狙击手\"],\"隐藏特性\":[\"心情不定\"],\"进化\":\"章鱼桶 \",\"进化等级\":25,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"章鱼桶\":{\"chinese_name\":\"章鱼桶\",\"id\":224,\"japanese_name\":\"オクタン\",\"english_name\":\"Octillery\",\"height\":\"0.9\",\"weight\":\"28.5\",\"type\":[\"水\"],\"ability\":[\"吸盘\",\"狙击手\"],\"隐藏特性\":[\"心情不定\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"信使鸟\":{\"chinese_name\":\"信使鸟\",\"id\":225,\"japanese_name\":\"デリバード\",\"english_name\":\"Delibird\",\"height\":\"0.9\",\"weight\":\"16.0\",\"type\":[\"冰\",\"飞行\"],\"ability\":[\"干劲\",\"活力\"],\"隐藏特性\":[\"不眠\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"巨翅飞鱼\":{\"chinese_name\":\"巨翅飞鱼\",\"id\":226,\"japanese_name\":\"マンタイン\",\"english_name\":\"Mantine\",\"height\":\"2.1\",\"weight\":\"220.0\",\"type\":[\"水\",\"飞行\"],\"ability\":[\"悠游自如\",\"储水\"],\"隐藏特性\":[\"水幕\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":1,\"电\":4,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"盔甲鸟\":{\"chinese_name\":\"盔甲鸟\",\"id\":227,\"japanese_name\":\"エアームド\",\"english_name\":\"Skarmory\",\"height\":\"1.7\",\"weight\":\"50.5\",\"type\":[\"钢\",\"飞行\"],\"ability\":[\"锐利目光\",\"结实\"],\"隐藏特性\":[\"碎裂铠甲\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0,\"地面\":0,\"岩石\":1,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":0.5,\"冰\":1,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"戴鲁比\":{\"chinese_name\":\"戴鲁比\",\"id\":228,\"japanese_name\":\"デルビル\",\"english_name\":\"Houndour\",\"height\":\"0.6\",\"weight\":\"10.8\",\"type\":[\"恶\",\"火\"],\"ability\":[\"早起\",\"引火\"],\"隐藏特性\":[\"紧张感\"],\"进化\":\"黑鲁加 \",\"进化等级\":24,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":1,\"幽灵\":0.5,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":0,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":1}},\"黑鲁加\":{\"chinese_name\":\"黑鲁加\",\"id\":229,\"japanese_name\":\"ヘルガー\",\"english_name\":\"Houndoom\",\"height\":\"=1\",\"weight\":\"=1\",\"type\":[\"恶\",\"火\"],\"ability\":[\"早起\",\"引火\",\"太阳之力\"],\"隐藏特性\":[\"紧张感\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":1,\"幽灵\":0.5,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":0,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":1}},\"刺龙王\":{\"chinese_name\":\"刺龙王\",\"id\":230,\"japanese_name\":\"キングドラ\",\"english_name\":\"Kingdra\",\"height\":\"1.8\",\"weight\":\"152.0\",\"type\":[\"水\",\"龙\"],\"ability\":[\"悠游自如\",\"狙击手\"],\"隐藏特性\":[\"湿气\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.25,\"水\":0.25,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":2,\"恶\":1,\"妖精\":2}},\"小小象\":{\"chinese_name\":\"小小象\",\"id\":231,\"japanese_name\":\"ゴマゾウ\",\"english_name\":\"Phanpy\",\"height\":\"0.5\",\"weight\":\"33.5\",\"type\":[\"地面\"],\"ability\":[\"捡拾\"],\"隐藏特性\":[\"沙隐\"],\"进化\":\"顿甲 \",\"进化等级\":25,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"顿甲\":{\"chinese_name\":\"顿甲\",\"id\":232,\"japanese_name\":\"ドンファン\",\"english_name\":\"Donphan\",\"height\":\"1.1\",\"weight\":\"120.0\",\"type\":[\"地面\"],\"ability\":[\"结实\"],\"隐藏特性\":[\"沙隐\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"多边兽Ⅱ\":{\"chinese_name\":\"多边兽Ⅱ\",\"id\":233,\"japanese_name\":\"ポリゴン２\",\"english_name\":\"Porygon2\",\"height\":\"0.6\",\"weight\":\"32.5\",\"type\":[\"一般\"],\"ability\":[\"复制\",\"下载\"],\"隐藏特性\":[\"分析\"],\"进化\":\"多边兽Ｚ\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"惊角鹿\":{\"chinese_name\":\"惊角鹿\",\"id\":234,\"japanese_name\":\"オドシシ\",\"english_name\":\"Stantler\",\"height\":\"1.4\",\"weight\":\"71.2\",\"type\":[\"一般\"],\"ability\":[\"威吓\",\"察觉\"],\"隐藏特性\":[\"食草\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"图图犬\":{\"chinese_name\":\"图图犬\",\"id\":235,\"japanese_name\":\"ドーブル\",\"english_name\":\"Smeargle\",\"height\":\"1.2\",\"weight\":\"58.0\",\"type\":[\"一般\"],\"ability\":[\"我行我素\",\"技术高手\"],\"隐藏特性\":[\"心情不定\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"无畏小子\":{\"chinese_name\":\"无畏小子\",\"id\":236,\"japanese_name\":\"バルキー\",\"english_name\":\"Tyrogue\",\"height\":\"0.7\",\"weight\":\"21.0\",\"type\":[\"格斗\"],\"ability\":[\"毅力\",\"不屈之心\"],\"隐藏特性\":[\"干劲\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"战舞郎\":{\"chinese_name\":\"战舞郎\",\"id\":237,\"japanese_name\":\"カポエラー\",\"english_name\":\"Hitmontop\",\"height\":\"1.4\",\"weight\":\"48.0\",\"type\":[\"格斗\"],\"ability\":[\"威吓\",\"技术高手\"],\"隐藏特性\":[\"不屈之心\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"迷唇娃\":{\"chinese_name\":\"迷唇娃\",\"id\":238,\"japanese_name\":\"ムチュール\",\"english_name\":\"Smoochum\",\"height\":\"0.4\",\"weight\":\"6.0\",\"type\":[\"冰\",\"超能力\"],\"ability\":[\"迟钝\",\"预知梦\"],\"隐藏特性\":[\"湿润之躯\"],\"进化\":\"迷唇姐 \",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":2,\"幽灵\":2,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":1}},\"电击怪\":{\"chinese_name\":\"电击怪\",\"id\":239,\"japanese_name\":\"エレキッド\",\"english_name\":\"Elekid\",\"height\":\"0.6\",\"weight\":\"23.5\",\"type\":[\"电\"],\"ability\":[\"静电\"],\"隐藏特性\":[\"干劲\"],\"进化\":\"电击兽 \",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"鸭嘴宝宝\":{\"chinese_name\":\"鸭嘴宝宝\",\"id\":240,\"japanese_name\":\"ブビィ\",\"english_name\":\"Magby\",\"height\":\"0.7\",\"weight\":\"21.4\",\"type\":[\"火\"],\"ability\":[\"火焰之躯\"],\"隐藏特性\":[\"干劲\"],\"进化\":\"鸭嘴火兽\",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"大奶罐\":{\"chinese_name\":\"大奶罐\",\"id\":241,\"japanese_name\":\"ミルタンク\",\"english_name\":\"Miltank\",\"height\":\"1.2\",\"weight\":\"75.5\",\"type\":[\"一般\"],\"ability\":[\"厚脂肪\",\"胆量\"],\"隐藏特性\":[\"食草\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":0.5,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"幸福蛋\":{\"chinese_name\":\"幸福蛋\",\"id\":242,\"japanese_name\":\"ハピナス\",\"english_name\":\"Blissey\",\"height\":\"1.5\",\"weight\":\"46.8\",\"type\":[\"一般\"],\"ability\":[\"自然回复\",\"天恩\"],\"隐藏特性\":[\"治愈之心\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"雷公\":{\"chinese_name\":\"雷公\",\"id\":243,\"japanese_name\":\"ライコウ\",\"english_name\":\"Raikou\",\"height\":\"1.9\",\"weight\":\"178.0\",\"type\":[\"电\"],\"ability\":[\"压迫感\"],\"隐藏特性\":[\"精神力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"炎帝\":{\"chinese_name\":\"炎帝\",\"id\":244,\"japanese_name\":\"エンテイ\",\"english_name\":\"Entei\",\"height\":\"2.1\",\"weight\":\"198.0\",\"type\":[\"火\"],\"ability\":[\"压迫感\"],\"隐藏特性\":[\"精神力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"水君\":{\"chinese_name\":\"水君\",\"id\":245,\"japanese_name\":\"スイクン\",\"english_name\":\"Suicune\",\"height\":\"2.0\",\"weight\":\"187.0\",\"type\":[\"水\"],\"ability\":[\"压迫感\"],\"隐藏特性\":[\"精神力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"幼基拉斯\":{\"chinese_name\":\"幼基拉斯\",\"id\":246,\"japanese_name\":\"ヨーギラス\",\"english_name\":\"Larvitar\",\"height\":\"0.6\",\"weight\":\"72.0\",\"type\":[\"岩石\",\"地面\"],\"ability\":[\"毅力\"],\"隐藏特性\":[\"沙隐\"],\"进化\":\"沙基拉斯 \",\"进化等级\":30,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.25,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":4,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"沙基拉斯\":{\"chinese_name\":\"沙基拉斯\",\"id\":247,\"japanese_name\":\"サナギラス\",\"english_name\":\"Pupitar\",\"height\":\"1.2\",\"weight\":\"152.0\",\"type\":[\"岩石\",\"地面\"],\"ability\":[\"蜕皮\"],\"隐藏特性\":[],\"进化\":\"班基拉斯 \",\"进化等级\":55,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.25,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":4,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"班基拉斯\":{\"chinese_name\":\"班基拉斯\",\"id\":248,\"japanese_name\":\"バンギラス\",\"english_name\":\"Tyranitar\",\"height\":\"=1\",\"weight\":\"=1\",\"type\":[\"岩石\",\"恶\"],\"ability\":[\"扬沙\"],\"隐藏特性\":[\"紧张感\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":4,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"洛奇亚\":{\"chinese_name\":\"洛奇亚\",\"id\":249,\"japanese_name\":\"ルギア\",\"english_name\":\"Lugia\",\"height\":\"5.2\",\"weight\":\"216.0\",\"type\":[\"超能力\",\"飞行\"],\"ability\":[\"压迫感\"],\"隐藏特性\":[\"多重鳞片\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":0.5,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"凤王\":{\"chinese_name\":\"凤王\",\"id\":250,\"japanese_name\":\"ホウオウ\",\"english_name\":\"Ho-Oh\",\"height\":\"3.8\",\"weight\":\"199.0\",\"type\":[\"火\",\"飞行\"],\"ability\":[\"压迫感\"],\"隐藏特性\":[\"再生力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"时拉比\":{\"chinese_name\":\"时拉比\",\"id\":251,\"japanese_name\":\"セレビィ\",\"english_name\":\"Celebi\",\"height\":\"0.6\",\"weight\":\"5.0\",\"type\":[\"超能力\",\"草\"],\"ability\":[\"自然回复\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":4,\"幽灵\":2,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":0.5,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"木守宫\":{\"chinese_name\":\"木守宫\",\"id\":252,\"japanese_name\":\"キモリ\",\"english_name\":\"Treecko\",\"height\":\"0.5\",\"weight\":\"5.0\",\"type\":[\"草\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"轻装\"],\"进化\":\"森林蜥蜴 \",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"森林蜥蜴\":{\"chinese_name\":\"森林蜥蜴\",\"id\":253,\"japanese_name\":\"ジュプトル\",\"english_name\":\"Grovyle\",\"height\":\"0.9\",\"weight\":\"21.6\",\"type\":[\"草\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"轻装\"],\"进化\":\"蜥蜴王 \",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"蜥蜴王\":{\"chinese_name\":\"蜥蜴王\",\"id\":254,\"japanese_name\":\"ジュカイン\",\"english_name\":\"Sceptile\",\"height\":\"1.7\",\"weight\":\"52.2\",\"type\":[\"草\",\"龙\"],\"ability\":[\"茂盛\",\"避雷针\"],\"隐藏特性\":[\"轻装\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":0.25,\"草\":0.25,\"电\":0,\"超能力\":1,\"冰\":4,\"龙\":2,\"恶\":1,\"妖精\":2}},\"火稚鸡\":{\"chinese_name\":\"火稚鸡\",\"id\":255,\"japanese_name\":\"アチャモ\",\"english_name\":\"Torchic\",\"height\":\"0.4\",\"weight\":\"2.5\",\"type\":[\"火\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"加速\"],\"进化\":\"力壮鸡 \",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"力壮鸡\":{\"chinese_name\":\"力壮鸡\",\"id\":256,\"japanese_name\":\"ワカシャモ\",\"english_name\":\"Combusken\",\"height\":\"0.9\",\"weight\":\"19.5\",\"type\":[\"火\",\"格斗\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"加速\"],\"进化\":\"火焰鸡 \",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":1}},\"火焰鸡\":{\"chinese_name\":\"火焰鸡\",\"id\":257,\"japanese_name\":\"バシャーモ\",\"english_name\":\"Blaziken\",\"height\":\"1.9\",\"weight\":\"52.0\",\"type\":[\"火\",\"格斗\"],\"ability\":[\"猛火\",\"加速\"],\"隐藏特性\":[\"加速\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":1}},\"水跃鱼\":{\"chinese_name\":\"水跃鱼\",\"id\":258,\"japanese_name\":\"ミズゴロウ\",\"english_name\":\"Mudkip\",\"height\":\"0.4\",\"weight\":\"7.6\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"湿气\"],\"进化\":\"沼跃鱼 \",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"沼跃鱼\":{\"chinese_name\":\"沼跃鱼\",\"id\":259,\"japanese_name\":\"ヌマクロー\",\"english_name\":\"Marshtomp\",\"height\":\"0.7\",\"weight\":\"28.0\",\"type\":[\"水\",\"地面\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"湿气\"],\"进化\":\"巨沼怪 \",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":1,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"巨沼怪\":{\"chinese_name\":\"巨沼怪\",\"id\":260,\"japanese_name\":\"ラグラージ\",\"english_name\":\"Swampert\",\"height\":\"1.5\",\"weight\":\"81.9\",\"type\":[\"水\",\"地面\"],\"ability\":[\"激流\",\"悠游自如\"],\"隐藏特性\":[\"湿气\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":1,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"土狼犬\":{\"chinese_name\":\"土狼犬\",\"id\":261,\"japanese_name\":\"ポチエナ\",\"english_name\":\"Poochyena\",\"height\":\"0.5\",\"weight\":\"13.6\",\"type\":[\"恶\"],\"ability\":[\"逃跑\",\"飞毛腿\"],\"隐藏特性\":[\"胆怯\"],\"进化\":\"大狼犬 \",\"进化等级\":18,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"大狼犬\":{\"chinese_name\":\"大狼犬\",\"id\":262,\"japanese_name\":\"グラエナ\",\"english_name\":\"Mightyena\",\"height\":\"1.0\",\"weight\":\"37.0\",\"type\":[\"恶\"],\"ability\":[\"威吓\",\"飞毛腿\"],\"隐藏特性\":[\"自信过度\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"蛇纹熊\":{\"chinese_name\":\"蛇纹熊\",\"id\":263,\"japanese_name\":\"ジグザグマ\",\"english_name\":\"Zigzagoon\",\"height\":\"0.4\",\"weight\":\"17.5\",\"type\":[\"一般\",\"恶\"],\"ability\":[\"捡拾\",\"贪吃鬼\"],\"隐藏特性\":[\"飞毛腿\"],\"进化\":\"直冲熊 \",\"进化等级\":20,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"直冲熊\":{\"chinese_name\":\"直冲熊\",\"id\":264,\"japanese_name\":\"マッスグマ\",\"english_name\":\"Linoone\",\"height\":\"0.5\",\"weight\":\"32.5\",\"type\":[\"一般\",\"恶\"],\"ability\":[\"捡拾\",\"贪吃鬼\"],\"隐藏特性\":[\"飞毛腿\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"刺尾虫\":{\"chinese_name\":\"刺尾虫\",\"id\":265,\"japanese_name\":\"ケムッソ\",\"english_name\":\"Wurmple\",\"height\":\"0.3\",\"weight\":\"3.6\",\"type\":[\"虫\"],\"ability\":[\"鳞粉\"],\"隐藏特性\":[\"逃跑\"],\"进化\":\"甲壳茧\",\"进化等级\":7,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"甲壳茧\":{\"chinese_name\":\"甲壳茧\",\"id\":266,\"japanese_name\":\"カラサリス\",\"english_name\":\"Silcoon\",\"height\":\"0.6\",\"weight\":\"10.0\",\"type\":[\"虫\"],\"ability\":[\"蜕皮\"],\"隐藏特性\":[],\"进化\":\"狩猎凤蝶 \",\"进化等级\":10,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"狩猎凤蝶\":{\"chinese_name\":\"狩猎凤蝶\",\"id\":267,\"japanese_name\":\"アゲハント\",\"english_name\":\"Beautifly\",\"height\":\"1.0\",\"weight\":\"28.4\",\"type\":[\"虫\",\"飞行\"],\"ability\":[\"虫之预感\"],\"隐藏特性\":[\"斗争心\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"盾甲茧\":{\"chinese_name\":\"盾甲茧\",\"id\":268,\"japanese_name\":\"マユルド\",\"english_name\":\"Cascoon\",\"height\":\"0.7\",\"weight\":\"11.5\",\"type\":[\"虫\"],\"ability\":[\"蜕皮\"],\"隐藏特性\":[],\"进化\":\"毒粉蛾 \",\"进化等级\":10,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"毒粉蛾\":{\"chinese_name\":\"毒粉蛾\",\"id\":269,\"japanese_name\":\"ドクケイル\",\"english_name\":\"Dustox\",\"height\":\"1.2\",\"weight\":\"31.6\",\"type\":[\"虫\",\"毒\"],\"ability\":[\"鳞粉\"],\"隐藏特性\":[\"复眼\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"莲叶童子\":{\"chinese_name\":\"莲叶童子\",\"id\":270,\"japanese_name\":\"ハスボー\",\"english_name\":\"Lotad\",\"height\":\"0.5\",\"weight\":\"2.6\",\"type\":[\"水\",\"草\"],\"ability\":[\"悠游自如\",\"雨盘\"],\"隐藏特性\":[\"我行我素\"],\"进化\":\"莲帽小童 \",\"进化等级\":14,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":0.25,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"莲帽小童\":{\"chinese_name\":\"莲帽小童\",\"id\":271,\"japanese_name\":\"ハスブレロ\",\"english_name\":\"Lombre\",\"height\":\"1.2\",\"weight\":\"32.5\",\"type\":[\"水\",\"草\"],\"ability\":[\"悠游自如\",\"雨盘\"],\"隐藏特性\":[\"我行我素\"],\"进化\":\"乐天河童 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":0.25,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"乐天河童\":{\"chinese_name\":\"乐天河童\",\"id\":272,\"japanese_name\":\"ルンパッパ\",\"english_name\":\"Ludicolo\",\"height\":\"1.5\",\"weight\":\"55.0\",\"type\":[\"水\",\"草\"],\"ability\":[\"悠游自如\",\"雨盘\"],\"隐藏特性\":[\"我行我素\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":0.25,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"橡实果\":{\"chinese_name\":\"橡实果\",\"id\":273,\"japanese_name\":\"タネボー\",\"english_name\":\"Seedot\",\"height\":\"0.5\",\"weight\":\"4.0\",\"type\":[\"草\"],\"ability\":[\"叶绿素\",\"早起\"],\"隐藏特性\":[\"顺手牵羊\"],\"进化\":\"长鼻叶 \",\"进化等级\":14,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"长鼻叶\":{\"chinese_name\":\"长鼻叶\",\"id\":274,\"japanese_name\":\"コノハナ\",\"english_name\":\"Nuzleaf\",\"height\":\"1.0\",\"weight\":\"28.0\",\"type\":[\"草\",\"恶\"],\"ability\":[\"叶绿素\",\"早起\"],\"隐藏特性\":[\"顺手牵羊\"],\"进化\":\"狡猾天狗 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":4,\"幽灵\":0.5,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":0,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"狡猾天狗\":{\"chinese_name\":\"狡猾天狗\",\"id\":275,\"japanese_name\":\"ダーテング\",\"english_name\":\"Shiftry\",\"height\":\"1.3\",\"weight\":\"59.6\",\"type\":[\"草\",\"恶\"],\"ability\":[\"叶绿素\",\"早起\"],\"隐藏特性\":[\"顺手牵羊\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":4,\"幽灵\":0.5,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":0,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"傲骨燕\":{\"chinese_name\":\"傲骨燕\",\"id\":276,\"japanese_name\":\"スバメ\",\"english_name\":\"Taillow\",\"height\":\"0.3\",\"weight\":\"2.3\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"毅力\"],\"隐藏特性\":[\"胆量\"],\"进化\":\"大王燕 \",\"进化等级\":22,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"大王燕\":{\"chinese_name\":\"大王燕\",\"id\":277,\"japanese_name\":\"オオスバメ\",\"english_name\":\"Swellow\",\"height\":\"0.7\",\"weight\":\"19.8\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"毅力\"],\"隐藏特性\":[\"胆量\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"长翅鸥\":{\"chinese_name\":\"长翅鸥\",\"id\":278,\"japanese_name\":\"キャモメ\",\"english_name\":\"Wingull\",\"height\":\"0.6\",\"weight\":\"9.5\",\"type\":[\"水\",\"飞行\"],\"ability\":[\"锐利目光\",\"湿润之躯\"],\"隐藏特性\":[\"雨盘\"],\"进化\":\"大嘴鸥 \",\"进化等级\":25,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":1,\"电\":4,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"大嘴鸥\":{\"chinese_name\":\"大嘴鸥\",\"id\":279,\"japanese_name\":\"ペリッパー\",\"english_name\":\"Pelipper\",\"height\":\"1.2\",\"weight\":\"28.0\",\"type\":[\"水\",\"飞行\"],\"ability\":[\"锐利目光\",\"降雨\"],\"隐藏特性\":[\"雨盘\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":1,\"电\":4,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"拉鲁拉丝\":{\"chinese_name\":\"拉鲁拉丝\",\"id\":280,\"japanese_name\":\"ラルトス\",\"english_name\":\"Ralts\",\"height\":\"0.4\",\"weight\":\"6.6\",\"type\":[\"超能力\",\"妖精\"],\"ability\":[\"同步\",\"复制\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"奇鲁莉安 \",\"进化等级\":20,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":2,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":0,\"恶\":1,\"妖精\":1}},\"奇鲁莉安\":{\"chinese_name\":\"奇鲁莉安\",\"id\":281,\"japanese_name\":\"キルリア\",\"english_name\":\"Kirlia\",\"height\":\"0.8\",\"weight\":\"20.2\",\"type\":[\"超能力\",\"妖精\"],\"ability\":[\"同步\",\"复制\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"沙奈朵 \",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":2,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":0,\"恶\":1,\"妖精\":1}},\"沙奈朵\":{\"chinese_name\":\"沙奈朵\",\"id\":282,\"japanese_name\":\"サーナイト\",\"english_name\":\"Gardevoir\",\"height\":\"1.6\",\"weight\":\"48.4\",\"type\":[\"超能力\",\"妖精\"],\"ability\":[\"同步\",\"复制\",\"妖精皮肤\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":2,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":0,\"恶\":1,\"妖精\":1}},\"溜溜糖球\":{\"chinese_name\":\"溜溜糖球\",\"id\":283,\"japanese_name\":\"アメタマ\",\"english_name\":\"Surskit\",\"height\":\"0.5\",\"weight\":\"1.7\",\"type\":[\"虫\",\"水\"],\"ability\":[\"悠游自如\"],\"隐藏特性\":[\"雨盘\"],\"进化\":\"雨翅蛾 \",\"进化等级\":22,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":0.5,\"草\":1,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"雨翅蛾\":{\"chinese_name\":\"雨翅蛾\",\"id\":284,\"japanese_name\":\"アメモース\",\"english_name\":\"Masquerain\",\"height\":\"0.8\",\"weight\":\"3.6\",\"type\":[\"虫\",\"飞行\"],\"ability\":[\"威吓\"],\"隐藏特性\":[\"紧张感\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"蘑蘑菇\":{\"chinese_name\":\"蘑蘑菇\",\"id\":285,\"japanese_name\":\"キノココ\",\"english_name\":\"Shroomish\",\"height\":\"0.4\",\"weight\":\"4.5\",\"type\":[\"草\"],\"ability\":[\"孢子\",\"毒疗\"],\"隐藏特性\":[\"飞毛腿\"],\"进化\":\"斗笠菇 \",\"进化等级\":23,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"斗笠菇\":{\"chinese_name\":\"斗笠菇\",\"id\":286,\"japanese_name\":\"キノガッサ\",\"english_name\":\"Breloom\",\"height\":\"1.2\",\"weight\":\"39.2\",\"type\":[\"草\",\"格斗\"],\"ability\":[\"孢子\",\"毒疗\"],\"隐藏特性\":[\"技术高手\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":4,\"毒\":2,\"地面\":0.5,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"懒人獭\":{\"chinese_name\":\"懒人獭\",\"id\":287,\"japanese_name\":\"ナマケロ\",\"english_name\":\"Slakoth\",\"height\":\"0.8\",\"weight\":\"24.0\",\"type\":[\"一般\"],\"ability\":[\"懒惰\"],\"隐藏特性\":[],\"进化\":\"过动猿 \",\"进化等级\":18,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"过动猿\":{\"chinese_name\":\"过动猿\",\"id\":288,\"japanese_name\":\"ヤルキモノ\",\"english_name\":\"Vigoroth\",\"height\":\"1.4\",\"weight\":\"46.5\",\"type\":[\"一般\"],\"ability\":[\"干劲\"],\"隐藏特性\":[],\"进化\":\"请假王 \",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"请假王\":{\"chinese_name\":\"请假王\",\"id\":289,\"japanese_name\":\"ケッキング\",\"english_name\":\"Slaking\",\"height\":\"2.0\",\"weight\":\"130.5\",\"type\":[\"一般\"],\"ability\":[\"懒惰\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"土居忍士\":{\"chinese_name\":\"土居忍士\",\"id\":290,\"japanese_name\":\"ツチニン\",\"english_name\":\"Nincada\",\"height\":\"0.5\",\"weight\":\"5.5\",\"type\":[\"虫\",\"地面\"],\"ability\":[\"复眼\"],\"隐藏特性\":[\"逃跑\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":0.5,\"地面\":0.5,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":2,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"铁面忍者\":{\"chinese_name\":\"铁面忍者\",\"id\":291,\"japanese_name\":\"テッカニン\",\"english_name\":\"Ninjask\",\"height\":\"0.8\",\"weight\":\"12.0\",\"type\":[\"虫\",\"飞行\"],\"ability\":[\"加速\"],\"隐藏特性\":[\"穿透\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"脱壳忍者\":{\"chinese_name\":\"脱壳忍者\",\"id\":292,\"japanese_name\":\"ヌケニン\",\"english_name\":\"Shedinja\",\"height\":\"0.8\",\"weight\":\"1.2\",\"type\":[\"虫\",\"幽灵\"],\"ability\":[\"神奇守护\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":2,\"毒\":0,\"地面\":0,\"岩石\":2,\"虫\":0,\"幽灵\":2,\"钢\":0,\"火\":2,\"水\":0,\"草\":0,\"电\":0,\"超能力\":0,\"冰\":0,\"龙\":0,\"恶\":2,\"妖精\":0}},\"咕妞妞\":{\"chinese_name\":\"咕妞妞\",\"id\":293,\"japanese_name\":\"ゴニョニョ\",\"english_name\":\"Whismur\",\"height\":\"0.6\",\"weight\":\"16.3\",\"type\":[\"一般\"],\"ability\":[\"隔音\"],\"隐藏特性\":[\"胆怯\"],\"进化\":\"吼爆弹 \",\"进化等级\":20,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"吼爆弹\":{\"chinese_name\":\"吼爆弹\",\"id\":294,\"japanese_name\":\"ドゴーム\",\"english_name\":\"Loudred\",\"height\":\"1.0\",\"weight\":\"40.5\",\"type\":[\"一般\"],\"ability\":[\"隔音\"],\"隐藏特性\":[\"胆量\"],\"进化\":\"爆音怪 \",\"进化等级\":40,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"爆音怪\":{\"chinese_name\":\"爆音怪\",\"id\":295,\"japanese_name\":\"バクオング\",\"english_name\":\"Exploud\",\"height\":\"1.5\",\"weight\":\"84.0\",\"type\":[\"一般\"],\"ability\":[\"隔音\"],\"隐藏特性\":[\"胆量\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"幕下力士\":{\"chinese_name\":\"幕下力士\",\"id\":296,\"japanese_name\":\"マクノシタ\",\"english_name\":\"Makuhita\",\"height\":\"1.0\",\"weight\":\"86.4\",\"type\":[\"格斗\"],\"ability\":[\"厚脂肪\",\"毅力\"],\"隐藏特性\":[\"强行\"],\"进化\":\"铁掌力士\",\"进化等级\":24,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"铁掌力士\":{\"chinese_name\":\"铁掌力士\",\"id\":297,\"japanese_name\":\"ハリテヤマ\",\"english_name\":\"Hariyama\",\"height\":\"2.3\",\"weight\":\"253.8\",\"type\":[\"格斗\"],\"ability\":[\"厚脂肪\",\"毅力\"],\"隐藏特性\":[\"强行\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"露力丽\":{\"chinese_name\":\"露力丽\",\"id\":298,\"japanese_name\":\"ルリリ\",\"english_name\":\"Azurill\",\"height\":\"0.2\",\"weight\":\"2.0\",\"type\":[\"一般\",\"妖精\"],\"ability\":[\"厚脂肪\",\"大力士\"],\"隐藏特性\":[\"食草\"],\"进化\":\"玛力露\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":0,\"钢\":2,\"火\":0.5,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"朝北鼻\":{\"chinese_name\":\"朝北鼻\",\"id\":299,\"japanese_name\":\"ノズパス\",\"english_name\":\"Nosepass\",\"height\":\"1.0\",\"weight\":\"97.0\",\"type\":[\"岩石\"],\"ability\":[\"结实\",\"磁力\"],\"隐藏特性\":[\"沙之力\"],\"进化\":\"大朝北鼻\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"向尾喵\":{\"chinese_name\":\"向尾喵\",\"id\":300,\"japanese_name\":\"エネコ\",\"english_name\":\"Skitty\",\"height\":\"0.6\",\"weight\":\"11.0\",\"type\":[\"一般\"],\"ability\":[\"迷人之躯\",\"一般皮肤\"],\"隐藏特性\":[\"奇迹皮肤\"],\"进化\":\"优雅猫\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"优雅猫\":{\"chinese_name\":\"优雅猫\",\"id\":301,\"japanese_name\":\"エネコロロ\",\"english_name\":\"Delcatty\",\"height\":\"1.1\",\"weight\":\"32.6\",\"type\":[\"一般\"],\"ability\":[\"迷人之躯\",\"一般皮肤\"],\"隐藏特性\":[\"奇迹皮肤\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"勾魂眼\":{\"chinese_name\":\"勾魂眼\",\"id\":302,\"japanese_name\":\"ヤミラミ\",\"english_name\":\"Sableye\",\"height\":\"0.5\",\"weight\":\"11.0\",\"type\":[\"恶\",\"幽灵\"],\"ability\":[\"锐利目光\",\"慢出\",\"魔法镜\"],\"隐藏特性\":[\"恶作剧之心\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":2}},\"大嘴娃\":{\"chinese_name\":\"大嘴娃\",\"id\":303,\"japanese_name\":\"クチート\",\"english_name\":\"Mawile\",\"height\":\"=1\",\"weight\":\"=1\",\"type\":[\"钢\",\"妖精\"],\"ability\":[\"怪力钳\",\"威吓\",\"大力士\"],\"隐藏特性\":[\"强行\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.25,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0,\"恶\":0.5,\"妖精\":0.5}},\"可可多拉\":{\"chinese_name\":\"可可多拉\",\"id\":304,\"japanese_name\":\"ココドラ\",\"english_name\":\"Aron\",\"height\":\"0.4\",\"weight\":\"60.0\",\"type\":[\"钢\",\"岩石\"],\"ability\":[\"结实\",\"坚硬脑袋\"],\"隐藏特性\":[\"重金属\"],\"进化\":\"可多拉 \",\"进化等级\":32,\"属性相性\":{\"一般\":0.25,\"格斗\":4,\"飞行\":0.25,\"毒\":0,\"地面\":4,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"可多拉\":{\"chinese_name\":\"可多拉\",\"id\":305,\"japanese_name\":\"コドラ\",\"english_name\":\"Lairon\",\"height\":\"0.9\",\"weight\":\"120.0\",\"type\":[\"钢\",\"岩石\"],\"ability\":[\"结实\",\"坚硬脑袋\"],\"隐藏特性\":[\"重金属\"],\"进化\":\"波士可多拉 \",\"进化等级\":42,\"属性相性\":{\"一般\":0.25,\"格斗\":4,\"飞行\":0.25,\"毒\":0,\"地面\":4,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"波士可多拉\":{\"chinese_name\":\"波士可多拉\",\"id\":306,\"japanese_name\":\"ボスゴドラ\",\"english_name\":\"Aggron\",\"height\":\"=1\",\"weight\":\"=1\",\"type\":[\"钢\",\"岩石\",\"\"],\"ability\":[\"结实\",\"坚硬脑袋\",\"过滤\"],\"隐藏特性\":[\"重金属\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1.5,\"飞行\":0.5,\"毒\":0,\"地面\":1.5,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":1.5,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"玛沙那\":{\"chinese_name\":\"玛沙那\",\"id\":307,\"japanese_name\":\"アサナン\",\"english_name\":\"Meditite\",\"height\":\"0.6\",\"weight\":\"11.2\",\"type\":[\"格斗\",\"超能力\"],\"ability\":[\"瑜伽之力\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"恰雷姆 \",\"进化等级\":37,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":2}},\"恰雷姆\":{\"chinese_name\":\"恰雷姆\",\"id\":308,\"japanese_name\":\"チャーレム\",\"english_name\":\"Medicham\",\"height\":\"1.3\",\"weight\":\"31.5\",\"type\":[\"格斗\",\"超能力\"],\"ability\":[\"瑜伽之力\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":2}},\"落雷兽\":{\"chinese_name\":\"落雷兽\",\"id\":309,\"japanese_name\":\"ラクライ\",\"english_name\":\"Electrike\",\"height\":\"0.6\",\"weight\":\"15.2\",\"type\":[\"电\"],\"ability\":[\"静电\",\"避雷针\"],\"隐藏特性\":[\"负电\"],\"进化\":\"雷电兽 \",\"进化等级\":26,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"雷电兽\":{\"chinese_name\":\"雷电兽\",\"id\":310,\"japanese_name\":\"ライボルト\",\"english_name\":\"Manectric\",\"height\":\"=1\",\"weight\":\"=1\",\"type\":[\"电\"],\"ability\":[\"静电\",\"避雷针\",\"威吓\"],\"隐藏特性\":[\"负电\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"正电拍拍\":{\"chinese_name\":\"正电拍拍\",\"id\":311,\"japanese_name\":\"プラスル\",\"english_name\":\"Plusle\",\"height\":\"0.4\",\"weight\":\"4.2\",\"type\":[\"电\"],\"ability\":[\"正电\"],\"隐藏特性\":[\"避雷针\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"负电拍拍\":{\"chinese_name\":\"负电拍拍\",\"id\":312,\"japanese_name\":\"マイナン\",\"english_name\":\"Minun\",\"height\":\"0.4\",\"weight\":\"4.2\",\"type\":[\"电\"],\"ability\":[\"负电\"],\"隐藏特性\":[\"蓄电\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"电萤虫\":{\"chinese_name\":\"电萤虫\",\"id\":313,\"japanese_name\":\"バルビート\",\"english_name\":\"Volbeat\",\"height\":\"0.7\",\"weight\":\"17.7\",\"type\":[\"虫\"],\"ability\":[\"发光\",\"虫之预感\"],\"隐藏特性\":[\"恶作剧之心\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"甜甜萤\":{\"chinese_name\":\"甜甜萤\",\"id\":314,\"japanese_name\":\"イルミーゼ\",\"english_name\":\"Illumise\",\"height\":\"0.6\",\"weight\":\"17.7\",\"type\":[\"虫\"],\"ability\":[\"迟钝\",\"有色眼镜\"],\"隐藏特性\":[\"恶作剧之心\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"毒蔷薇\":{\"chinese_name\":\"毒蔷薇\",\"id\":315,\"japanese_name\":\"ロゼリア\",\"english_name\":\"Roselia\",\"height\":\"0.3\",\"weight\":\"2.0\",\"type\":[\"草\",\"毒\"],\"ability\":[\"自然回复\",\"毒刺\"],\"隐藏特性\":[\"叶子防守\"],\"进化\":\"罗丝雷朵\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"溶食兽\":{\"chinese_name\":\"溶食兽\",\"id\":316,\"japanese_name\":\"ゴクリン\",\"english_name\":\"Gulpin\",\"height\":\"0.4\",\"weight\":\"10.3\",\"type\":[\"毒\"],\"ability\":[\"污泥浆\",\"黏着\"],\"隐藏特性\":[\"贪吃鬼\"],\"进化\":\"吞食兽 \",\"进化等级\":26,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"吞食兽\":{\"chinese_name\":\"吞食兽\",\"id\":317,\"japanese_name\":\"マルノーム\",\"english_name\":\"Swalot\",\"height\":\"1.7\",\"weight\":\"80.0\",\"type\":[\"毒\"],\"ability\":[\"污泥浆\",\"黏着\"],\"隐藏特性\":[\"贪吃鬼\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"利牙鱼\":{\"chinese_name\":\"利牙鱼\",\"id\":318,\"japanese_name\":\"キバニア\",\"english_name\":\"Carvanha\",\"height\":\"0.8\",\"weight\":\"20.8\",\"type\":[\"水\",\"恶\"],\"ability\":[\"粗糙皮肤\"],\"隐藏特性\":[\"加速\"],\"进化\":\"巨牙鲨 \",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":0,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"巨牙鲨\":{\"chinese_name\":\"巨牙鲨\",\"id\":319,\"japanese_name\":\"サメハダー\",\"english_name\":\"Sharpedo\",\"height\":\"1.8\",\"weight\":\"88.8\",\"type\":[\"水\",\"恶\"],\"ability\":[\"粗糙皮肤\",\"强壮之颚\"],\"隐藏特性\":[\"加速\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":0,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"吼吼鲸\":{\"chinese_name\":\"吼吼鲸\",\"id\":320,\"japanese_name\":\"ホエルコ\",\"english_name\":\"Wailmer\",\"height\":\"2.0\",\"weight\":\"130.0\",\"type\":[\"水\"],\"ability\":[\"水幕\",\"迟钝\"],\"隐藏特性\":[\"压迫感\"],\"进化\":\"吼鲸王 \",\"进化等级\":40,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"吼鲸王\":{\"chinese_name\":\"吼鲸王\",\"id\":321,\"japanese_name\":\"ホエルオー\",\"english_name\":\"Wailord\",\"height\":\"14.5\",\"weight\":\"398.0\",\"type\":[\"水\"],\"ability\":[\"水幕\",\"迟钝\"],\"隐藏特性\":[\"压迫感\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"呆火驼\":{\"chinese_name\":\"呆火驼\",\"id\":322,\"japanese_name\":\"ドンメル\",\"english_name\":\"Numel\",\"height\":\"0.7\",\"weight\":\"24.0\",\"type\":[\"火\",\"地面\"],\"ability\":[\"迟钝\",\"单纯\"],\"隐藏特性\":[\"我行我素\"],\"进化\":\"喷火驼 \",\"进化等级\":33,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":4,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"喷火驼\":{\"chinese_name\":\"喷火驼\",\"id\":323,\"japanese_name\":\"バクーダ\",\"english_name\":\"Camerupt\",\"height\":\"1.9\",\"weight\":\"220.0\",\"type\":[\"火\",\"地面\"],\"ability\":[\"熔岩铠甲\",\"坚硬岩石\",\"强行\"],\"隐藏特性\":[\"愤怒穴位 \"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1.5,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":3,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"煤炭龟\":{\"chinese_name\":\"煤炭龟\",\"id\":324,\"japanese_name\":\"コータス\",\"english_name\":\"Torkoal\",\"height\":\"0.5\",\"weight\":\"80.4\",\"type\":[\"火\"],\"ability\":[\"白色烟雾\",\"日照\"],\"隐藏特性\":[\"硬壳盔甲\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"跳跳猪\":{\"chinese_name\":\"跳跳猪\",\"id\":325,\"japanese_name\":\"バネブー\",\"english_name\":\"Spoink\",\"height\":\"0.7\",\"weight\":\"30.6\",\"type\":[\"超能力\"],\"ability\":[\"厚脂肪\",\"我行我素\"],\"隐藏特性\":[\"贪吃鬼\"],\"进化\":\"噗噗猪 \",\"进化等级\":32,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":0.5,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":1}},\"噗噗猪\":{\"chinese_name\":\"噗噗猪\",\"id\":326,\"japanese_name\":\"ブーピッグ\",\"english_name\":\"Grumpig\",\"height\":\"0.9\",\"weight\":\"71.5\",\"type\":[\"超能力\"],\"ability\":[\"厚脂肪\",\"我行我素\"],\"隐藏特性\":[\"贪吃鬼\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":0.5,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":1}},\"晃晃斑\":{\"chinese_name\":\"晃晃斑\",\"id\":327,\"japanese_name\":\"パッチール\",\"english_name\":\"Spinda\",\"height\":\"1.1\",\"weight\":\"5.0\",\"type\":[\"一般\"],\"ability\":[\"我行我素\",\"蹒跚\"],\"隐藏特性\":[\"唱反调\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"大颚蚁\":{\"chinese_name\":\"大颚蚁\",\"id\":328,\"japanese_name\":\"ナックラー\",\"english_name\":\"Trapinch\",\"height\":\"0.7\",\"weight\":\"15.0\",\"type\":[\"地面\"],\"ability\":[\"怪力钳\",\"沙穴\"],\"隐藏特性\":[\"强行\"],\"进化\":\"超音波幼虫 \",\"进化等级\":35,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"超音波幼虫\":{\"chinese_name\":\"超音波幼虫\",\"id\":329,\"japanese_name\":\"ビブラーバ\",\"english_name\":\"Vibrava\",\"height\":\"1.1\",\"weight\":\"15.3\",\"type\":[\"地面\",\"龙\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[\"飘浮\"],\"进化\":\"沙漠蜻蜓 \",\"进化等级\":45,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":4,\"龙\":2,\"恶\":1,\"妖精\":2}},\"沙漠蜻蜓\":{\"chinese_name\":\"沙漠蜻蜓\",\"id\":330,\"japanese_name\":\"フライゴン\",\"english_name\":\"Flygon\",\"height\":\"2.0\",\"weight\":\"82.0\",\"type\":[\"地面\",\"龙\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[\"飘浮\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":4,\"龙\":2,\"恶\":1,\"妖精\":2}},\"刺球仙人掌\":{\"chinese_name\":\"刺球仙人掌\",\"id\":331,\"japanese_name\":\"サボネア\",\"english_name\":\"Cacnea\",\"height\":\"0.4\",\"weight\":\"51.3\",\"type\":[\"草\"],\"ability\":[\"沙隐\"],\"隐藏特性\":[\"储水\"],\"进化\":\"梦歌仙人掌 \",\"进化等级\":32,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"梦歌仙人掌\":{\"chinese_name\":\"梦歌仙人掌\",\"id\":332,\"japanese_name\":\"ノクタス\",\"english_name\":\"Cacturne\",\"height\":\"1.3\",\"weight\":\"77.4\",\"type\":[\"草\",\"恶\"],\"ability\":[\"沙隐\"],\"隐藏特性\":[\"储水\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":4,\"幽灵\":0.5,\"钢\":1,\"火\":2,\"水\":0,\"草\":0.5,\"电\":0.5,\"超能力\":0,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"青绵鸟\":{\"chinese_name\":\"青绵鸟\",\"id\":333,\"japanese_name\":\"チルット\",\"english_name\":\"Swablu\",\"height\":\"0.4\",\"weight\":\"1.2\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"自然回复\"],\"隐藏特性\":[\"无关天气\"],\"进化\":\"七夕青鸟 \",\"进化等级\":35,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"七夕青鸟\":{\"chinese_name\":\"七夕青鸟\",\"id\":334,\"japanese_name\":\"チルタリス\",\"english_name\":\"Altaria\",\"height\":\"1.1\",\"weight\":\"20.6\",\"type\":[\"龙\",\"飞行\",\"妖精\"],\"ability\":[\"自然回复\",\"妖精皮肤\"],\"隐藏特性\":[\"无关天气\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":0,\"恶\":0.5,\"妖精\":2}},\"猫鼬斩\":{\"chinese_name\":\"猫鼬斩\",\"id\":335,\"japanese_name\":\"ザングース\",\"english_name\":\"Zangoose\",\"height\":\"1.3\",\"weight\":\"40.3\",\"type\":[\"一般\"],\"ability\":[\"免疫\"],\"隐藏特性\":[\"中毒激升\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"饭匙蛇\":{\"chinese_name\":\"饭匙蛇\",\"id\":336,\"japanese_name\":\"ハブネーク\",\"english_name\":\"Seviper\",\"height\":\"2.7\",\"weight\":\"52.5\",\"type\":[\"毒\"],\"ability\":[\"蜕皮\"],\"隐藏特性\":[\"穿透\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"月石\":{\"chinese_name\":\"月石\",\"id\":337,\"japanese_name\":\"ルナトーン\",\"english_name\":\"Lunatone\",\"height\":\"1.0\",\"weight\":\"168.0\",\"type\":[\"岩石\",\"超能力\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0.5,\"地面\":0,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"太阳岩\":{\"chinese_name\":\"太阳岩\",\"id\":338,\"japanese_name\":\"ソルロック\",\"english_name\":\"Solrock\",\"height\":\"1.2\",\"weight\":\"154.0\",\"type\":[\"岩石\",\"超能力\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0.5,\"地面\":0,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"泥泥鳅\":{\"chinese_name\":\"泥泥鳅\",\"id\":339,\"japanese_name\":\"ドジョッチ\",\"english_name\":\"Barboach\",\"height\":\"0.4\",\"weight\":\"1.9\",\"type\":[\"水\",\"地面\"],\"ability\":[\"迟钝\",\"危险预知\"],\"隐藏特性\":[\"湿润之躯\"],\"进化\":\"鲶鱼王 \",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":1,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"鲶鱼王\":{\"chinese_name\":\"鲶鱼王\",\"id\":340,\"japanese_name\":\"ナマズン\",\"english_name\":\"Whiscash\",\"height\":\"0.9\",\"weight\":\"23.6\",\"type\":[\"水\",\"地面\"],\"ability\":[\"迟钝\",\"危险预知\"],\"隐藏特性\":[\"湿润之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":1,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"龙虾小兵\":{\"chinese_name\":\"龙虾小兵\",\"id\":341,\"japanese_name\":\"ヘイガニ\",\"english_name\":\"Corphish\",\"height\":\"0.6\",\"weight\":\"11.5\",\"type\":[\"水\"],\"ability\":[\"怪力钳\",\"硬壳盔甲\"],\"隐藏特性\":[\"适应力\"],\"进化\":\"铁螯龙虾 \",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"铁螯龙虾\":{\"chinese_name\":\"铁螯龙虾\",\"id\":342,\"japanese_name\":\"シザリガー\",\"english_name\":\"Crawdaunt\",\"height\":\"1.1\",\"weight\":\"32.8\",\"type\":[\"水\",\"恶\"],\"ability\":[\"怪力钳\",\"硬壳盔甲\"],\"隐藏特性\":[\"适应力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":0,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"天秤偶\":{\"chinese_name\":\"天秤偶\",\"id\":343,\"japanese_name\":\"ヤジロン\",\"english_name\":\"Baltoy\",\"height\":\"0.5\",\"weight\":\"21.5\",\"type\":[\"地面\",\"超能力\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"念力土偶 \",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":0.5,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":0.5,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"念力土偶\":{\"chinese_name\":\"念力土偶\",\"id\":344,\"japanese_name\":\"ネンドール\",\"english_name\":\"Claydol\",\"height\":\"1.5\",\"weight\":\"108.0\",\"type\":[\"地面\",\"超能力\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":0.5,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":0.5,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"触手百合\":{\"chinese_name\":\"触手百合\",\"id\":345,\"japanese_name\":\"リリーラ\",\"english_name\":\"Lileep\",\"height\":\"1.0\",\"weight\":\"23.8\",\"type\":[\"岩石\",\"草\"],\"ability\":[\"吸盘\"],\"隐藏特性\":[\"引水\"],\"进化\":\"摇篮百合 \",\"进化等级\":40,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":0,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"摇篮百合\":{\"chinese_name\":\"摇篮百合\",\"id\":346,\"japanese_name\":\"ユレイドル\",\"english_name\":\"Cradily\",\"height\":\"1.5\",\"weight\":\"60.4\",\"type\":[\"岩石\",\"草\"],\"ability\":[\"吸盘\"],\"隐藏特性\":[\"引水\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":0,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"太古羽虫\":{\"chinese_name\":\"太古羽虫\",\"id\":347,\"japanese_name\":\"アノプス\",\"english_name\":\"Anorith\",\"height\":\"0.7\",\"weight\":\"12.5\",\"type\":[\"岩石\",\"虫\"],\"ability\":[\"战斗盔甲\"],\"隐藏特性\":[\"悠游自如\"],\"进化\":\"太古盔甲 \",\"进化等级\":40,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":2,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"太古盔甲\":{\"chinese_name\":\"太古盔甲\",\"id\":348,\"japanese_name\":\"アーマルド\",\"english_name\":\"Armaldo\",\"height\":\"1.5\",\"weight\":\"68.2\",\"type\":[\"岩石\",\"虫\"],\"ability\":[\"战斗盔甲\"],\"隐藏特性\":[\"悠游自如\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":2,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"丑丑鱼\":{\"chinese_name\":\"丑丑鱼\",\"id\":349,\"japanese_name\":\"ヒンバス\",\"english_name\":\"Feebas\",\"height\":\"0.6\",\"weight\":\"7.4\",\"type\":[\"水\"],\"ability\":[\"悠游自如\",\"迟钝\"],\"隐藏特性\":[\"适应力\"],\"进化\":\"美纳斯\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"美纳斯\":{\"chinese_name\":\"美纳斯\",\"id\":350,\"japanese_name\":\"ミロカロス\",\"english_name\":\"Milotic\",\"height\":\"6.2\",\"weight\":\"162.0\",\"type\":[\"水\"],\"ability\":[\"神奇鳞片\",\"好胜\"],\"隐藏特性\":[\"迷人之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"飘浮泡泡\":{\"chinese_name\":\"飘浮泡泡\",\"id\":351,\"japanese_name\":\"ポワルン\",\"english_name\":\"Castform\",\"height\":\"0.3\",\"weight\":\"0.8\",\"type\":[\"一般\",\"火 \",\"水 \",\"冰 \"],\"ability\":[\"阴晴不定\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"变隐龙\":{\"chinese_name\":\"变隐龙\",\"id\":352,\"japanese_name\":\"カクレオン\",\"english_name\":\"Kecleon\",\"height\":\"1.0\",\"weight\":\"22.0\",\"type\":[\"一般\"],\"ability\":[\"变色\"],\"隐藏特性\":[\"变幻自如\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"怨影娃娃\":{\"chinese_name\":\"怨影娃娃\",\"id\":353,\"japanese_name\":\"カゲボウズ\",\"english_name\":\"Shuppet\",\"height\":\"0.6\",\"weight\":\"2.3\",\"type\":[\"幽灵\"],\"ability\":[\"不眠\",\"察觉\"],\"隐藏特性\":[\"诅咒之躯\"],\"进化\":\"诅咒娃娃 \",\"进化等级\":37,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"诅咒娃娃\":{\"chinese_name\":\"诅咒娃娃\",\"id\":354,\"japanese_name\":\"ジュペッタ\",\"english_name\":\"Banette\",\"height\":\"=1\",\"weight\":\"=1\",\"type\":[\"幽灵\"],\"ability\":[\"不眠\",\"察觉\",\"恶作剧之心\"],\"隐藏特性\":[\"诅咒之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"夜巡灵\":{\"chinese_name\":\"夜巡灵\",\"id\":355,\"japanese_name\":\"ヨマワル\",\"english_name\":\"Duskull\",\"height\":\"0.8\",\"weight\":\"15.0\",\"type\":[\"幽灵\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[\"察觉\"],\"进化\":\"彷徨夜灵 \",\"进化等级\":37,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"彷徨夜灵\":{\"chinese_name\":\"彷徨夜灵\",\"id\":356,\"japanese_name\":\"サマヨール\",\"english_name\":\"Dusclops\",\"height\":\"1.6\",\"weight\":\"30.6\",\"type\":[\"幽灵\"],\"ability\":[\"压迫感\"],\"隐藏特性\":[\"察觉\"],\"进化\":\"黑夜魔灵 \",\"进化等级\":\"None\",\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"热带龙\":{\"chinese_name\":\"热带龙\",\"id\":357,\"japanese_name\":\"トロピウス\",\"english_name\":\"Tropius\",\"height\":\"2.0\",\"weight\":\"100.0\",\"type\":[\"草\",\"飞行\"],\"ability\":[\"叶绿素\",\"太阳之力\"],\"隐藏特性\":[\"收获\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":2,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":1,\"超能力\":1,\"冰\":4,\"龙\":1,\"恶\":1,\"妖精\":1}},\"风铃铃\":{\"chinese_name\":\"风铃铃\",\"id\":358,\"japanese_name\":\"チリーン\",\"english_name\":\"Chimecho\",\"height\":\"0.6\",\"weight\":\"1.0\",\"type\":[\"超能力\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"阿勃梭鲁\":{\"chinese_name\":\"阿勃梭鲁\",\"id\":359,\"japanese_name\":\"アブソル\",\"english_name\":\"Absol\",\"height\":\"1.2\",\"weight\":\"=1\",\"type\":[\"恶\"],\"ability\":[\"压迫感\",\"超幸运\",\"魔法镜\"],\"隐藏特性\":[\"正义之心\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"小果然\":{\"chinese_name\":\"小果然\",\"id\":360,\"japanese_name\":\"ソーナノ\",\"english_name\":\"Wynaut\",\"height\":\"0.6\",\"weight\":\"14.0\",\"type\":[\"超能力\"],\"ability\":[\"踩影\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"果然翁\",\"进化等级\":15,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"雪童子\":{\"chinese_name\":\"雪童子\",\"id\":361,\"japanese_name\":\"ユキワラシ\",\"english_name\":\"Snorunt\",\"height\":\"0.7\",\"weight\":\"16.8\",\"type\":[\"冰\"],\"ability\":[\"精神力\",\"冰冻之躯\"],\"隐藏特性\":[\"心情不定\"],\"进化\":\"冰鬼护\",\"进化等级\":42,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"冰鬼护\":{\"chinese_name\":\"冰鬼护\",\"id\":362,\"japanese_name\":\"オニゴーリ\",\"english_name\":\"Glalie\",\"height\":\"1.5\",\"weight\":\"256.5\",\"type\":[\"冰\"],\"ability\":[\"精神力\",\"冰冻之躯\",\"冰冻皮肤\"],\"隐藏特性\":[\"心情不定\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"海豹球\":{\"chinese_name\":\"海豹球\",\"id\":363,\"japanese_name\":\"タマザラシ\",\"english_name\":\"Spheal\",\"height\":\"0.8\",\"weight\":\"39.5\",\"type\":[\"冰\",\"水\"],\"ability\":[\"厚脂肪\",\"冰冻之躯\"],\"隐藏特性\":[\"迟钝\"],\"进化\":\"海魔狮 \",\"进化等级\":32,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.125,\"龙\":1,\"恶\":1,\"妖精\":1}},\"海魔狮\":{\"chinese_name\":\"海魔狮\",\"id\":364,\"japanese_name\":\"トドグラー\",\"english_name\":\"Sealeo\",\"height\":\"1.1\",\"weight\":\"87.6\",\"type\":[\"冰\",\"水\"],\"ability\":[\"厚脂肪\",\"冰冻之躯\"],\"隐藏特性\":[\"迟钝\"],\"进化\":\"帝牙海狮 \",\"进化等级\":44,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.125,\"龙\":1,\"恶\":1,\"妖精\":1}},\"帝牙海狮\":{\"chinese_name\":\"帝牙海狮\",\"id\":365,\"japanese_name\":\"トドゼルガ\",\"english_name\":\"Walrein\",\"height\":\"1.4\",\"weight\":\"150.6\",\"type\":[\"冰\",\"水\"],\"ability\":[\"厚脂肪\",\"冰冻之躯\"],\"隐藏特性\":[\"迟钝\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.125,\"龙\":1,\"恶\":1,\"妖精\":1}},\"珍珠贝\":{\"chinese_name\":\"珍珠贝\",\"id\":366,\"japanese_name\":\"パールル\",\"english_name\":\"Clamperl\",\"height\":\"0.4\",\"weight\":\"52.5\",\"type\":[\"水\"],\"ability\":[\"硬壳盔甲\"],\"隐藏特性\":[\"胆怯\"],\"进化\":\"猎斑鱼\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"猎斑鱼\":{\"chinese_name\":\"猎斑鱼\",\"id\":367,\"japanese_name\":\"ハンテール\",\"english_name\":\"Huntail\",\"height\":\"1.7\",\"weight\":\"27.0\",\"type\":[\"水\"],\"ability\":[\"悠游自如\"],\"隐藏特性\":[\"水幕\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"樱花鱼\":{\"chinese_name\":\"樱花鱼\",\"id\":368,\"japanese_name\":\"サクラビス\",\"english_name\":\"Gorebyss\",\"height\":\"1.8\",\"weight\":\"22.6\",\"type\":[\"水\"],\"ability\":[\"悠游自如\"],\"隐藏特性\":[\"湿润之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"古空棘鱼\":{\"chinese_name\":\"古空棘鱼\",\"id\":369,\"japanese_name\":\"ジーランス\",\"english_name\":\"Relicanth\",\"height\":\"1.0\",\"weight\":\"23.4\",\"type\":[\"水\",\"岩石\"],\"ability\":[\"悠游自如\",\"坚硬脑袋\"],\"隐藏特性\":[\"结实\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.25,\"水\":1,\"草\":4,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"爱心鱼\":{\"chinese_name\":\"爱心鱼\",\"id\":370,\"japanese_name\":\"ラブカス\",\"english_name\":\"Luvdisc\",\"height\":\"0.6\",\"weight\":\"8.7\",\"type\":[\"水\"],\"ability\":[\"悠游自如\"],\"隐藏特性\":[\"湿润之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"宝贝龙\":{\"chinese_name\":\"宝贝龙\",\"id\":371,\"japanese_name\":\"タツベイ\",\"english_name\":\"Bagon\",\"height\":\"0.6\",\"weight\":\"42.1\",\"type\":[\"龙\"],\"ability\":[\"坚硬脑袋\"],\"隐藏特性\":[\"强行\"],\"进化\":\"甲壳龙 \",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"甲壳龙\":{\"chinese_name\":\"甲壳龙\",\"id\":372,\"japanese_name\":\"コモルー\",\"english_name\":\"Shelgon\",\"height\":\"1.1\",\"weight\":\"110.5\",\"type\":[\"龙\"],\"ability\":[\"坚硬脑袋\"],\"隐藏特性\":[\"防尘\"],\"进化\":\"暴飞龙 \",\"进化等级\":50,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"暴飞龙\":{\"chinese_name\":\"暴飞龙\",\"id\":373,\"japanese_name\":\"ボーマンダ\",\"english_name\":\"Salamence\",\"height\":\"1.5\",\"weight\":\"102.6\",\"type\":[\"龙\",\"飞行\"],\"ability\":[\"威吓\",\"飞行皮肤\"],\"隐藏特性\":[\"自信过度\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.25,\"电\":1,\"超能力\":1,\"冰\":4,\"龙\":2,\"恶\":1,\"妖精\":2}},\"铁哑铃\":{\"chinese_name\":\"铁哑铃\",\"id\":374,\"japanese_name\":\"ダンバル\",\"english_name\":\"Beldum\",\"height\":\"0.6\",\"weight\":\"95.2\",\"type\":[\"钢\",\"超能力\"],\"ability\":[\"恒净之躯\"],\"隐藏特性\":[\"轻金属\"],\"进化\":\"金属怪 \",\"进化等级\":20,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":2,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.25,\"冰\":0.5,\"龙\":0.5,\"恶\":2,\"妖精\":0.5}},\"金属怪\":{\"chinese_name\":\"金属怪\",\"id\":375,\"japanese_name\":\"メタング\",\"english_name\":\"Metang\",\"height\":\"1.2\",\"weight\":\"202.5\",\"type\":[\"钢\",\"超能力\"],\"ability\":[\"恒净之躯\"],\"隐藏特性\":[\"轻金属\"],\"进化\":\"巨金怪 \",\"进化等级\":45,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":2,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.25,\"冰\":0.5,\"龙\":0.5,\"恶\":2,\"妖精\":0.5}},\"巨金怪\":{\"chinese_name\":\"巨金怪\",\"id\":376,\"japanese_name\":\"メタグロス\",\"english_name\":\"Metagross\",\"height\":\"1.6\",\"weight\":\"550.0\",\"type\":[\"钢\",\"超能力\"],\"ability\":[\"恒净之躯\",\"硬爪\"],\"隐藏特性\":[\"轻金属\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":2,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.25,\"冰\":0.5,\"龙\":0.5,\"恶\":2,\"妖精\":0.5}},\"雷吉洛克\":{\"chinese_name\":\"雷吉洛克\",\"id\":377,\"japanese_name\":\"レジロック\",\"english_name\":\"Regirock\",\"height\":\"1.7\",\"weight\":\"230.0\",\"type\":[\"岩石\"],\"ability\":[\"恒净之躯\"],\"隐藏特性\":[\"结实\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"雷吉艾斯\":{\"chinese_name\":\"雷吉艾斯\",\"id\":378,\"japanese_name\":\"レジアイス\",\"english_name\":\"Regice\",\"height\":\"1.8\",\"weight\":\"175.0\",\"type\":[\"冰\"],\"ability\":[\"恒净之躯\"],\"隐藏特性\":[\"冰冻之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"雷吉斯奇鲁\":{\"chinese_name\":\"雷吉斯奇鲁\",\"id\":379,\"japanese_name\":\"レジスチル\",\"english_name\":\"Registeel\",\"height\":\"1.9\",\"weight\":\"205.0\",\"type\":[\"钢\"],\"ability\":[\"恒净之躯\"],\"隐藏特性\":[\"轻金属\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"拉帝亚斯\":{\"chinese_name\":\"拉帝亚斯\",\"id\":380,\"japanese_name\":\"ラティアス\",\"english_name\":\"Latias\",\"height\":\"1.4\",\"weight\":\"40.0\",\"type\":[\"龙\",\"超能力\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":0.5,\"冰\":2,\"龙\":2,\"恶\":2,\"妖精\":2}},\"拉帝欧斯\":{\"chinese_name\":\"拉帝欧斯\",\"id\":381,\"japanese_name\":\"ラティオス\",\"english_name\":\"Latios\",\"height\":\"2.0\",\"weight\":\"60.0\",\"type\":[\"龙\",\"超能力\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":0.5,\"冰\":2,\"龙\":2,\"恶\":2,\"妖精\":2}},\"盖欧卡\":{\"chinese_name\":\"盖欧卡\",\"id\":382,\"japanese_name\":\"カイオーガ\",\"english_name\":\"Kyogre\",\"height\":\"4.5\",\"weight\":\"352.0\",\"type\":[\"水\"],\"ability\":[\"降雨\",\"始源之海\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"固拉多\":{\"chinese_name\":\"固拉多\",\"id\":383,\"japanese_name\":\"グラードン\",\"english_name\":\"Groudon\",\"height\":\"3.5\",\"weight\":\"950.0\",\"type\":[\"地面\",\"火\"],\"ability\":[\"日照\",\"终结之地\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"烈空坐\":{\"chinese_name\":\"烈空坐\",\"id\":384,\"japanese_name\":\"レックウザ\",\"english_name\":\"Rayquaza\",\"height\":\"7.0\",\"weight\":\"206.5\",\"type\":[\"龙\",\"飞行\"],\"ability\":[\"气闸\",\"德尔塔气流\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.25,\"电\":1,\"超能力\":1,\"冰\":4,\"龙\":2,\"恶\":1,\"妖精\":2}},\"基拉祈\":{\"chinese_name\":\"基拉祈\",\"id\":385,\"japanese_name\":\"ジラーチ\",\"english_name\":\"Jirachi\",\"height\":\"0.3\",\"weight\":\"1.1\",\"type\":[\"钢\",\"超能力\"],\"ability\":[\"天恩\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":2,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.25,\"冰\":0.5,\"龙\":0.5,\"恶\":2,\"妖精\":0.5}},\"代欧奇希斯\":{\"chinese_name\":\"代欧奇希斯\",\"id\":386,\"japanese_name\":\"デオキシス\",\"english_name\":\"Deoxys\",\"height\":\"1.7\",\"weight\":\"60.8\",\"type\":[\"超能力\"],\"ability\":[\"压迫感\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"草苗龟\":{\"chinese_name\":\"草苗龟\",\"id\":387,\"japanese_name\":\"ナエトル\",\"english_name\":\"Turtwig\",\"height\":\"0.4\",\"weight\":\"10.2\",\"type\":[\"草\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"硬壳盔甲\"],\"进化\":\"树林龟 \",\"进化等级\":18,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"树林龟\":{\"chinese_name\":\"树林龟\",\"id\":388,\"japanese_name\":\"ハヤシガメ\",\"english_name\":\"Grotle\",\"height\":\"1.1\",\"weight\":\"97.0\",\"type\":[\"草\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"硬壳盔甲\"],\"进化\":\"土台龟 \",\"进化等级\":32,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"土台龟\":{\"chinese_name\":\"土台龟\",\"id\":389,\"japanese_name\":\"ドダイトス\",\"english_name\":\"Torterra\",\"height\":\"2.2\",\"weight\":\"310.0\",\"type\":[\"草\",\"地面\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"硬壳盔甲\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":0.5,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":4,\"龙\":1,\"恶\":1,\"妖精\":1}},\"小火焰猴\":{\"chinese_name\":\"小火焰猴\",\"id\":390,\"japanese_name\":\"ヒコザル\",\"english_name\":\"Chimchar\",\"height\":\"0.5\",\"weight\":\"6.2\",\"type\":[\"火\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"铁拳\"],\"进化\":\"猛火猴 \",\"进化等级\":14,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"猛火猴\":{\"chinese_name\":\"猛火猴\",\"id\":391,\"japanese_name\":\"モウカザル\",\"english_name\":\"Monferno\",\"height\":\"0.9\",\"weight\":\"22.0\",\"type\":[\"火\",\"格斗\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"铁拳\"],\"进化\":\"烈焰猴 \",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":1}},\"烈焰猴\":{\"chinese_name\":\"烈焰猴\",\"id\":392,\"japanese_name\":\"ゴウカザル\",\"english_name\":\"Infernape\",\"height\":\"1.2\",\"weight\":\"55.0\",\"type\":[\"火\",\"格斗\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"铁拳\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":1}},\"波加曼\":{\"chinese_name\":\"波加曼\",\"id\":393,\"japanese_name\":\"ポッチャマ\",\"english_name\":\"Piplup\",\"height\":\"0.4\",\"weight\":\"5.2\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"不服输\"],\"进化\":\"波皇子\",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"波皇子\":{\"chinese_name\":\"波皇子\",\"id\":394,\"japanese_name\":\"ポッタイシ\",\"english_name\":\"Prinplup\",\"height\":\"0.8\",\"weight\":\"23.0\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"不服输\"],\"进化\":\"帝王拿波\",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"帝王拿波\":{\"chinese_name\":\"帝王拿波\",\"id\":395,\"japanese_name\":\"エンペルト\",\"english_name\":\"Empoleon\",\"height\":\"1.7\",\"weight\":\"84.5\",\"type\":[\"水\",\"钢\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"不服输\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.25,\"火\":1,\"水\":0.5,\"草\":1,\"电\":2,\"超能力\":0.5,\"冰\":0.25,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"姆克儿\":{\"chinese_name\":\"姆克儿\",\"id\":396,\"japanese_name\":\"ムックル\",\"english_name\":\"Starly\",\"height\":\"0.3\",\"weight\":\"2.0\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"锐利目光\"],\"隐藏特性\":[\"舍身\"],\"进化\":\"姆克鸟 \",\"进化等级\":14,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"姆克鸟\":{\"chinese_name\":\"姆克鸟\",\"id\":397,\"japanese_name\":\"ムクバード\",\"english_name\":\"Staravia\",\"height\":\"0.6\",\"weight\":\"15.5\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"威吓\"],\"隐藏特性\":[\"舍身\"],\"进化\":\"姆克鹰 \",\"进化等级\":34,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"姆克鹰\":{\"chinese_name\":\"姆克鹰\",\"id\":398,\"japanese_name\":\"ムクホーク\",\"english_name\":\"Staraptor\",\"height\":\"1.2\",\"weight\":\"24.9\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"威吓\"],\"隐藏特性\":[\"舍身\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"大牙狸\":{\"chinese_name\":\"大牙狸\",\"id\":399,\"japanese_name\":\"ビッパ\",\"english_name\":\"Bidoof\",\"height\":\"0.5\",\"weight\":\"20.0\",\"type\":[\"一般\"],\"ability\":[\"单纯\",\"纯朴\"],\"隐藏特性\":[\"心情不定\"],\"进化\":\"大尾狸 \",\"进化等级\":15,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"大尾狸\":{\"chinese_name\":\"大尾狸\",\"id\":400,\"japanese_name\":\"ビーダル\",\"english_name\":\"Bibarel\",\"height\":\"1.0\",\"weight\":\"31.5\",\"type\":[\"一般\",\"水\"],\"ability\":[\"单纯\",\"纯朴\"],\"隐藏特性\":[\"心情不定\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"圆法师\":{\"chinese_name\":\"圆法师\",\"id\":401,\"japanese_name\":\"コロボーシ\",\"english_name\":\"Kricketot\",\"height\":\"0.3\",\"weight\":\"2.2\",\"type\":[\"虫\"],\"ability\":[\"蜕皮\"],\"隐藏特性\":[\"逃跑\"],\"进化\":\"音箱蟀 \",\"进化等级\":10,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"音箱蟀\":{\"chinese_name\":\"音箱蟀\",\"id\":402,\"japanese_name\":\"コロトック\",\"english_name\":\"Kricketune\",\"height\":\"1.0\",\"weight\":\"25.5\",\"type\":[\"虫\"],\"ability\":[\"虫之预感\"],\"隐藏特性\":[\"技术高手\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"小猫怪\":{\"chinese_name\":\"小猫怪\",\"id\":403,\"japanese_name\":\"コリンク\",\"english_name\":\"Shinx\",\"height\":\"0.5\",\"weight\":\"9.5\",\"type\":[\"电\"],\"ability\":[\"斗争心\",\"威吓\"],\"隐藏特性\":[\"毅力\"],\"进化\":\"勒克猫 \",\"进化等级\":15,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"勒克猫\":{\"chinese_name\":\"勒克猫\",\"id\":404,\"japanese_name\":\"ルクシオ\",\"english_name\":\"Luxio\",\"height\":\"0.9\",\"weight\":\"30.5\",\"type\":[\"电\"],\"ability\":[\"斗争心\",\"威吓\"],\"隐藏特性\":[\"毅力\"],\"进化\":\"伦琴猫 \",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"伦琴猫\":{\"chinese_name\":\"伦琴猫\",\"id\":405,\"japanese_name\":\"レントラー\",\"english_name\":\"Luxray\",\"height\":\"1.4\",\"weight\":\"42.0\",\"type\":[\"电\"],\"ability\":[\"斗争心\",\"威吓\"],\"隐藏特性\":[\"毅力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"含羞苞\":{\"chinese_name\":\"含羞苞\",\"id\":406,\"japanese_name\":\"スボミー\",\"english_name\":\"Budew\",\"height\":\"0.2\",\"weight\":\"1.2\",\"type\":[\"草\",\"毒\"],\"ability\":[\"自然回复\",\"毒刺\"],\"隐藏特性\":[\"叶子防守\"],\"进化\":\"毒蔷薇\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"罗丝雷朵\":{\"chinese_name\":\"罗丝雷朵\",\"id\":407,\"japanese_name\":\"ロズレイド\",\"english_name\":\"Roserade\",\"height\":\"0.9\",\"weight\":\"14.5\",\"type\":[\"草\",\"毒\"],\"ability\":[\"自然回复\",\"毒刺\"],\"隐藏特性\":[\"技术高手\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"头盖龙\":{\"chinese_name\":\"头盖龙\",\"id\":408,\"japanese_name\":\"ズガイドス\",\"english_name\":\"Cranidos\",\"height\":\"0.9\",\"weight\":\"31.5\",\"type\":[\"岩石\"],\"ability\":[\"破格\"],\"隐藏特性\":[\"强行\"],\"进化\":\"战槌龙 \",\"进化等级\":30,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":null}},\"战槌龙\":{\"chinese_name\":\"战槌龙\",\"id\":409,\"japanese_name\":\"ラムパルド\",\"english_name\":\"Rampardos\",\"height\":\"1.6\",\"weight\":\"102.5\",\"type\":[\"岩石\"],\"ability\":[\"破格\"],\"隐藏特性\":[\"强行\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":null}},\"盾甲龙\":{\"chinese_name\":\"盾甲龙\",\"id\":410,\"japanese_name\":\"タテトプス\",\"english_name\":\"Shieldon\",\"height\":\"0.5\",\"weight\":\"57.0\",\"type\":[\"岩石\",\"钢\"],\"ability\":[\"结实\"],\"隐藏特性\":[\"隔音\"],\"进化\":\"护城龙 \",\"进化等级\":30,\"属性相性\":{\"一般\":0.25,\"格斗\":4,\"飞行\":0.25,\"毒\":0,\"地面\":4,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"护城龙\":{\"chinese_name\":\"护城龙\",\"id\":411,\"japanese_name\":\"トリデプス\",\"english_name\":\"Bastiodon\",\"height\":\"1.3\",\"weight\":\"149.5\",\"type\":[\"岩石\",\"钢\"],\"ability\":[\"结实\"],\"隐藏特性\":[\"隔音\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.25,\"格斗\":4,\"飞行\":0.25,\"毒\":0,\"地面\":4,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"结草儿\":{\"chinese_name\":\"结草儿\",\"id\":412,\"japanese_name\":\"ミノムッチ\",\"english_name\":\"Burmy\",\"height\":\"0.2\",\"weight\":\"3.4\",\"type\":[\"虫\"],\"ability\":[\"蜕皮\"],\"隐藏特性\":[\"防尘\"],\"进化\":\"结草贵妇\",\"进化等级\":20,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"结草贵妇\":{\"chinese_name\":\"结草贵妇\",\"id\":413,\"japanese_name\":\"ミノマダム\",\"english_name\":\"Wormadam\",\"height\":\"0.5\",\"weight\":\"6.5\",\"type\":[\"虫\",\"草\",\"地面\",\"钢\"],\"ability\":[\"危险预知\"],\"隐藏特性\":[\"防尘\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":4,\"毒\":2,\"地面\":0.25,\"岩石\":2,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":4,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"绅士蛾\":{\"chinese_name\":\"绅士蛾\",\"id\":414,\"japanese_name\":\"ガーメイル\",\"english_name\":\"Mothim\",\"height\":\"0.9\",\"weight\":\"23.3\",\"type\":[\"虫\",\"飞行\"],\"ability\":[\"虫之预感\"],\"隐藏特性\":[\"有色眼镜\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"三蜜蜂\":{\"chinese_name\":\"三蜜蜂\",\"id\":415,\"japanese_name\":\"ミツハニー\",\"english_name\":\"Combee\",\"height\":\"0.3\",\"weight\":\"5.5\",\"type\":[\"虫\",\"飞行\"],\"ability\":[\"采蜜\"],\"隐藏特性\":[\"活力\"],\"进化\":\"蜂女王 \",\"进化等级\":21,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"蜂女王\":{\"chinese_name\":\"蜂女王\",\"id\":416,\"japanese_name\":\"ビークイン\",\"english_name\":\"Vespiquen\",\"height\":\"1.2\",\"weight\":\"38.5\",\"type\":[\"虫\",\"飞行\"],\"ability\":[\"压迫感\"],\"隐藏特性\":[\"紧张感\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"帕奇利兹\":{\"chinese_name\":\"帕奇利兹\",\"id\":417,\"japanese_name\":\"パチリス\",\"english_name\":\"Pachirisu\",\"height\":\"0.4\",\"weight\":\"3.9\",\"type\":[\"电\"],\"ability\":[\"逃跑\",\"捡拾\"],\"隐藏特性\":[\"蓄电\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"泳圈鼬\":{\"chinese_name\":\"泳圈鼬\",\"id\":418,\"japanese_name\":\"ブイゼル\",\"english_name\":\"Buizel\",\"height\":\"0.7\",\"weight\":\"29.5\",\"type\":[\"水\"],\"ability\":[\"悠游自如\"],\"隐藏特性\":[\"水幕\"],\"进化\":\"浮潜鼬 \",\"进化等级\":26,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"浮潜鼬\":{\"chinese_name\":\"浮潜鼬\",\"id\":419,\"japanese_name\":\"フローゼル\",\"english_name\":\"Floatzel\",\"height\":\"1.1\",\"weight\":\"33.5\",\"type\":[\"水\"],\"ability\":[\"悠游自如\"],\"隐藏特性\":[\"水幕\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"樱花宝\":{\"chinese_name\":\"樱花宝\",\"id\":420,\"japanese_name\":\"チェリンボ\",\"english_name\":\"Cherubi\",\"height\":\"0.4\",\"weight\":\"3.3\",\"type\":[\"草\"],\"ability\":[\"叶绿素\"],\"隐藏特性\":[],\"进化\":\"樱花儿 \",\"进化等级\":25,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"樱花儿\":{\"chinese_name\":\"樱花儿\",\"id\":421,\"japanese_name\":\"チェリム\",\"english_name\":\"Cherrim\",\"height\":\"0.5\",\"weight\":\"9.3\",\"type\":[\"草\"],\"ability\":[\"花之礼\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"无壳海兔\":{\"chinese_name\":\"无壳海兔\",\"id\":422,\"japanese_name\":\"カラナクシ\",\"english_name\":\"Shellos\",\"height\":\"0.3\",\"weight\":\"6.3\",\"type\":[\"水\"],\"ability\":[\"黏着\",\"引水\"],\"隐藏特性\":[\"沙之力\"],\"进化\":\"海兔兽 \",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"海兔兽\":{\"chinese_name\":\"海兔兽\",\"id\":423,\"japanese_name\":\"トリトドン\",\"english_name\":\"Gastrodon\",\"height\":\"0.9\",\"weight\":\"29.9\",\"type\":[\"水\",\"地面\"],\"ability\":[\"黏着\",\"引水\"],\"隐藏特性\":[\"沙之力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"双尾怪手\":{\"chinese_name\":\"双尾怪手\",\"id\":424,\"japanese_name\":\"エテボース\",\"english_name\":\"Ambipom\",\"height\":\"1.2\",\"weight\":\"20.3\",\"type\":[\"一般\"],\"ability\":[\"技术高手\",\"捡拾\"],\"隐藏特性\":[\"连续攻击\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"飘飘球\":{\"chinese_name\":\"飘飘球\",\"id\":425,\"japanese_name\":\"フワンテ\",\"english_name\":\"Drifloon\",\"height\":\"0.4\",\"weight\":\"1.2\",\"type\":[\"幽灵\",\"飞行\"],\"ability\":[\"引爆\",\"轻装\"],\"隐藏特性\":[\"受热激升\"],\"进化\":\"随风球 \",\"进化等级\":28,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":2,\"虫\":0.25,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"随风球\":{\"chinese_name\":\"随风球\",\"id\":426,\"japanese_name\":\"フワライド\",\"english_name\":\"Drifblim\",\"height\":\"1.2\",\"weight\":\"15.0\",\"type\":[\"幽灵\",\"飞行\"],\"ability\":[\"引爆\",\"轻装\"],\"隐藏特性\":[\"受热激升\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":2,\"虫\":0.25,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"卷卷耳\":{\"chinese_name\":\"卷卷耳\",\"id\":427,\"japanese_name\":\"ミミロル\",\"english_name\":\"Buneary\",\"height\":\"0.4\",\"weight\":\"5.5\",\"type\":[\"一般\"],\"ability\":[\"逃跑\",\"笨拙\"],\"隐藏特性\":[\"柔软\"],\"进化\":\"长耳兔\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"长耳兔\":{\"chinese_name\":\"长耳兔\",\"id\":428,\"japanese_name\":\"ミミロップ\",\"english_name\":\"Lopunny\",\"height\":\"1.2\",\"weight\":\"33.3\",\"type\":[\"一般\",\"格斗\"],\"ability\":[\"迷人之躯\",\"笨拙\",\"胆量\"],\"隐藏特性\":[\"柔软\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"梦妖魔\":{\"chinese_name\":\"梦妖魔\",\"id\":429,\"japanese_name\":\"ムウマージ\",\"english_name\":\"Mismagius\",\"height\":\"0.9\",\"weight\":\"4.4\",\"type\":[\"幽灵\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"乌鸦头头\":{\"chinese_name\":\"乌鸦头头\",\"id\":430,\"japanese_name\":\"ドンカラス\",\"english_name\":\"Honchkrow\",\"height\":\"0.9\",\"weight\":\"27.3\",\"type\":[\"恶\",\"飞行\"],\"ability\":[\"不眠\",\"超幸运\"],\"隐藏特性\":[\"自信过度\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":0,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"魅力喵\":{\"chinese_name\":\"魅力喵\",\"id\":431,\"japanese_name\":\"ニャルマー\",\"english_name\":\"Glameow\",\"height\":\"0.5\",\"weight\":\"3.9\",\"type\":[\"一般\"],\"ability\":[\"柔软\",\"我行我素\"],\"隐藏特性\":[\"锐利目光\"],\"进化\":\"东施喵 \",\"进化等级\":38,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"东施喵\":{\"chinese_name\":\"东施喵\",\"id\":432,\"japanese_name\":\"ブニャット\",\"english_name\":\"Purugly\",\"height\":\"1.0\",\"weight\":\"43.8\",\"type\":[\"一般\"],\"ability\":[\"厚脂肪\",\"我行我素\"],\"隐藏特性\":[\"不服输\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":0.5,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"铃铛响\":{\"chinese_name\":\"铃铛响\",\"id\":433,\"japanese_name\":\"リーシャン\",\"english_name\":\"Chingling\",\"height\":\"0.2\",\"weight\":\"0.6\",\"type\":[\"超能力\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"风铃铃\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"臭鼬噗\":{\"chinese_name\":\"臭鼬噗\",\"id\":434,\"japanese_name\":\"スカンプー\",\"english_name\":\"Stunky\",\"height\":\"0.4\",\"weight\":\"19.2\",\"type\":[\"毒\",\"恶\"],\"ability\":[\"恶臭\",\"引爆\"],\"隐藏特性\":[\"锐利目光\"],\"进化\":\"坦克臭鼬 \",\"进化等级\":34,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":1}},\"坦克臭鼬\":{\"chinese_name\":\"坦克臭鼬\",\"id\":435,\"japanese_name\":\"スカタンク\",\"english_name\":\"Skuntank\",\"height\":\"1.0\",\"weight\":\"38.0\",\"type\":[\"毒\",\"恶\"],\"ability\":[\"恶臭\",\"引爆\"],\"隐藏特性\":[\"锐利目光\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":1}},\"铜镜怪\":{\"chinese_name\":\"铜镜怪\",\"id\":436,\"japanese_name\":\"ドーミラー\",\"english_name\":\"Bronzor\",\"height\":\"0.5\",\"weight\":\"60.5\",\"type\":[\"钢\",\"超能力\"],\"ability\":[\"飘浮\",\"耐热\"],\"隐藏特性\":[\"重金属\"],\"进化\":\"青铜钟 \",\"进化等级\":33,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0,\"地面\":0,\"岩石\":0.5,\"虫\":1,\"幽灵\":2,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.25,\"冰\":0.5,\"龙\":0.5,\"恶\":2,\"妖精\":0.5}},\"青铜钟\":{\"chinese_name\":\"青铜钟\",\"id\":437,\"japanese_name\":\"ドータクン\",\"english_name\":\"Bronzong\",\"height\":\"1.3\",\"weight\":\"187.0\",\"type\":[\"钢\",\"超能力\"],\"ability\":[\"飘浮\",\"耐热\"],\"隐藏特性\":[\"重金属\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0,\"地面\":0,\"岩石\":0.5,\"虫\":1,\"幽灵\":2,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.25,\"冰\":0.5,\"龙\":0.5,\"恶\":2,\"妖精\":0.5}},\"盆才怪\":{\"chinese_name\":\"盆才怪\",\"id\":438,\"japanese_name\":\"ウソハチ\",\"english_name\":\"Bonsly\",\"height\":\"0.5\",\"weight\":\"15.0\",\"type\":[\"岩石\"],\"ability\":[\"结实\",\"坚硬脑袋\"],\"隐藏特性\":[\"胆怯\"],\"进化\":\"树才怪\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":null}},\"魔尼尼\":{\"chinese_name\":\"魔尼尼\",\"id\":439,\"japanese_name\":\"マネネ\",\"english_name\":\"Mime Jr.\",\"height\":\"0.6\",\"weight\":\"13.0\",\"type\":[\"超能力\",\"妖精\"],\"ability\":[\"隔音\",\"过滤\"],\"隐藏特性\":[\"技术高手\"],\"进化\":\"魔墙人偶\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":1.5,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1.5,\"钢\":1.5,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":0,\"恶\":1,\"妖精\":1}},\"小福蛋\":{\"chinese_name\":\"小福蛋\",\"id\":440,\"japanese_name\":\"ピンプク\",\"english_name\":\"Happiny\",\"height\":\"0.6\",\"weight\":\"24.4\",\"type\":[\"一般\"],\"ability\":[\"自然回复\",\"天恩\"],\"隐藏特性\":[\"友情防守\"],\"进化\":\"吉利蛋\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"聒噪鸟\":{\"chinese_name\":\"聒噪鸟\",\"id\":441,\"japanese_name\":\"ペラップ\",\"english_name\":\"Chatot\",\"height\":\"0.5\",\"weight\":\"1.9\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"锐利目光\",\"蹒跚\"],\"隐藏特性\":[\"健壮胸肌\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"花岩怪\":{\"chinese_name\":\"花岩怪\",\"id\":442,\"japanese_name\":\"ミカルゲ\",\"english_name\":\"Spiritomb\",\"height\":\"1.0\",\"weight\":\"108.0\",\"type\":[\"幽灵\",\"恶\"],\"ability\":[\"压迫感\"],\"隐藏特性\":[\"穿透\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":2}},\"圆陆鲨\":{\"chinese_name\":\"圆陆鲨\",\"id\":443,\"japanese_name\":\"フカマル\",\"english_name\":\"Gible\",\"height\":\"0.7\",\"weight\":\"20.5\",\"type\":[\"龙\",\"地面\"],\"ability\":[\"沙隐\"],\"隐藏特性\":[\"粗糙皮肤\"],\"进化\":\"尖牙陆鲨 \",\"进化等级\":24,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":4,\"龙\":2,\"恶\":1,\"妖精\":2}},\"尖牙陆鲨\":{\"chinese_name\":\"尖牙陆鲨\",\"id\":444,\"japanese_name\":\"ガバイト\",\"english_name\":\"Gabite\",\"height\":\"1.4\",\"weight\":\"56.0\",\"type\":[\"龙\",\"地面\"],\"ability\":[\"沙隐\"],\"隐藏特性\":[\"粗糙皮肤\"],\"进化\":\"烈咬陆鲨 \",\"进化等级\":48,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":4,\"龙\":2,\"恶\":1,\"妖精\":2}},\"烈咬陆鲨\":{\"chinese_name\":\"烈咬陆鲨\",\"id\":445,\"japanese_name\":\"ガブリアス\",\"english_name\":\"Garchomp\",\"height\":\"1.9\",\"weight\":\"95.0\",\"type\":[\"龙\",\"地面\"],\"ability\":[\"沙隐\",\"沙之力\"],\"隐藏特性\":[\"粗糙皮肤\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":4,\"龙\":2,\"恶\":1,\"妖精\":2}},\"小卡比兽\":{\"chinese_name\":\"小卡比兽\",\"id\":446,\"japanese_name\":\"ゴンベ\",\"english_name\":\"Munchlax\",\"height\":\"0.6\",\"weight\":\"105.0\",\"type\":[\"一般\"],\"ability\":[\"捡拾\",\"厚脂肪\"],\"隐藏特性\":[\"贪吃鬼\"],\"进化\":\"卡比兽\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":0.5,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"利欧路\":{\"chinese_name\":\"利欧路\",\"id\":447,\"japanese_name\":\"リオル\",\"english_name\":\"Riolu\",\"height\":\"0.7\",\"weight\":\"20.2\",\"type\":[\"格斗\"],\"ability\":[\"不屈之心\",\"精神力\"],\"隐藏特性\":[\"恶作剧之心\"],\"进化\":\"路卡利欧\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"路卡利欧\":{\"chinese_name\":\"路卡利欧\",\"id\":448,\"japanese_name\":\"ルカリオ\",\"english_name\":\"Lucario\",\"height\":\"=1 \",\"weight\":\"=1\",\"type\":[\"格斗\",\"钢\"],\"ability\":[\"不屈之心\",\"精神力\",\"适应力\"],\"隐藏特性\":[\"正义之心\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":1,\"毒\":0,\"地面\":2,\"岩石\":0.25,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":0.5,\"恶\":0.5,\"妖精\":1}},\"沙河马\":{\"chinese_name\":\"沙河马\",\"id\":449,\"japanese_name\":\"ヒポポタス\",\"english_name\":\"Hippopotas\",\"height\":\"0.8\",\"weight\":\"49.5\",\"type\":[\"地面\"],\"ability\":[\"扬沙\"],\"隐藏特性\":[\"沙之力\"],\"进化\":\"河马兽 \",\"进化等级\":34,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"河马兽\":{\"chinese_name\":\"河马兽\",\"id\":450,\"japanese_name\":\"カバルドン\",\"english_name\":\"Hippowdon\",\"height\":\"2.0\",\"weight\":\"300.0\",\"type\":[\"地面\"],\"ability\":[\"扬沙\"],\"隐藏特性\":[\"沙之力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"钳尾蝎\":{\"chinese_name\":\"钳尾蝎\",\"id\":451,\"japanese_name\":\"スコルピ\",\"english_name\":\"Skorupi\",\"height\":\"0.8\",\"weight\":\"12.0\",\"type\":[\"毒\",\"虫\"],\"ability\":[\"战斗盔甲\",\"狙击手\"],\"隐藏特性\":[\"锐利目光\"],\"进化\":\"龙王蝎 \",\"进化等级\":40,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"龙王蝎\":{\"chinese_name\":\"龙王蝎\",\"id\":452,\"japanese_name\":\"ドラピオン\",\"english_name\":\"Drapion\",\"height\":\"1.3\",\"weight\":\"61.5\",\"type\":[\"毒\",\"恶\"],\"ability\":[\"战斗盔甲\",\"狙击手\"],\"隐藏特性\":[\"锐利目光\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":1}},\"不良蛙\":{\"chinese_name\":\"不良蛙\",\"id\":453,\"japanese_name\":\"グレッグル\",\"english_name\":\"Croagunk\",\"height\":\"0.7\",\"weight\":\"23.0\",\"type\":[\"毒\",\"格斗\"],\"ability\":[\"危险预知\",\"干燥皮肤\"],\"隐藏特性\":[\"毒手\"],\"进化\":\"毒骷蛙 \",\"进化等级\":37,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":0.5,\"地面\":2,\"岩石\":0.5,\"虫\":0.25,\"幽灵\":1,\"钢\":1,\"火\":1.25,\"水\":0,\"草\":0.5,\"电\":1,\"超能力\":4,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":1}},\"毒骷蛙\":{\"chinese_name\":\"毒骷蛙\",\"id\":454,\"japanese_name\":\"ドクロッグ\",\"english_name\":\"Toxicroak\",\"height\":\"1.3\",\"weight\":\"44.4\",\"type\":[\"毒\",\"格斗\"],\"ability\":[\"危险预知\",\"干燥皮肤\"],\"隐藏特性\":[\"毒手\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":0.5,\"地面\":2,\"岩石\":0.5,\"虫\":0.25,\"幽灵\":1,\"钢\":1,\"火\":1.25,\"水\":0,\"草\":0.5,\"电\":1,\"超能力\":4,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":1}},\"尖牙笼\":{\"chinese_name\":\"尖牙笼\",\"id\":455,\"japanese_name\":\"マスキッパ\",\"english_name\":\"Carnivine\",\"height\":\"1.4\",\"weight\":\"27.0\",\"type\":[\"草\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"荧光鱼\":{\"chinese_name\":\"荧光鱼\",\"id\":456,\"japanese_name\":\"ケイコウオ\",\"english_name\":\"Finneon\",\"height\":\"0.4\",\"weight\":\"7.0\",\"type\":[\"水\"],\"ability\":[\"悠游自如\",\"引水\"],\"隐藏特性\":[\"水幕\"],\"进化\":\"霓虹鱼 \",\"进化等级\":31,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"霓虹鱼\":{\"chinese_name\":\"霓虹鱼\",\"id\":457,\"japanese_name\":\"ネオラント\",\"english_name\":\"Lumineon\",\"height\":\"1.2\",\"weight\":\"24.0\",\"type\":[\"水\"],\"ability\":[\"悠游自如\",\"引水\"],\"隐藏特性\":[\"水幕\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"小球飞鱼\":{\"chinese_name\":\"小球飞鱼\",\"id\":458,\"japanese_name\":\"タマンタ\",\"english_name\":\"Mantyke\",\"height\":\"1.0\",\"weight\":\"65.0\",\"type\":[\"水\",\"飞行\"],\"ability\":[\"悠游自如\",\"储水\"],\"隐藏特性\":[\"水幕\"],\"进化\":\"巨翅飞鱼\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":1,\"电\":4,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"雪笠怪\":{\"chinese_name\":\"雪笠怪\",\"id\":459,\"japanese_name\":\"ユキカブリ\",\"english_name\":\"Snover\",\"height\":\"1.0\",\"weight\":\"50.5\",\"type\":[\"草\",\"冰\"],\"ability\":[\"降雪\"],\"隐藏特性\":[\"隔音\"],\"进化\":\"暴雪王 \",\"进化等级\":40,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":2,\"虫\":2,\"幽灵\":1,\"钢\":2,\"火\":4,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"暴雪王\":{\"chinese_name\":\"暴雪王\",\"id\":460,\"japanese_name\":\"ユキノオー\",\"english_name\":\"Abomasnow\",\"height\":\"=1\",\"weight\":\"=1\",\"type\":[\"草\",\"冰\"],\"ability\":[\"降雪\"],\"隐藏特性\":[\"隔音\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":2,\"虫\":2,\"幽灵\":1,\"钢\":2,\"火\":4,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"玛狃拉\":{\"chinese_name\":\"玛狃拉\",\"id\":461,\"japanese_name\":\"マニューラ\",\"english_name\":\"Weavile\",\"height\":\"1.1\",\"weight\":\"34.0\",\"type\":[\"恶\",\"冰\"],\"ability\":[\"压迫感\"],\"隐藏特性\":[\"顺手牵羊\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":4,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":2,\"幽灵\":0.5,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"自爆磁怪\":{\"chinese_name\":\"自爆磁怪\",\"id\":462,\"japanese_name\":\"ジバコイル\",\"english_name\":\"Magnezone\",\"height\":\"1.2\",\"weight\":\"180.0\",\"type\":[\"电\",\"钢\"],\"ability\":[\"磁力\",\"结实\"],\"隐藏特性\":[\"分析\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.25,\"毒\":0,\"地面\":4,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.25,\"火\":2,\"水\":1,\"草\":0.5,\"电\":0.5,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"大舌舔\":{\"chinese_name\":\"大舌舔\",\"id\":463,\"japanese_name\":\"ベロベルト\",\"english_name\":\"Lickilicky\",\"height\":\"1.7\",\"weight\":\"140.0\",\"type\":[\"一般\"],\"ability\":[\"我行我素\",\"迟钝\"],\"隐藏特性\":[\"无关天气\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"超甲狂犀\":{\"chinese_name\":\"超甲狂犀\",\"id\":464,\"japanese_name\":\"ドサイドン\",\"english_name\":\"Rhyperior\",\"height\":\"2.4\",\"weight\":\"282.8\",\"type\":[\"地面\",\"岩石\"],\"ability\":[\"避雷针\",\"坚硬岩石\"],\"隐藏特性\":[\"舍身\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1.5,\"飞行\":0.5,\"毒\":0.25,\"地面\":1.5,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1.5,\"火\":0.5,\"水\":3,\"草\":3,\"电\":0,\"超能力\":1,\"冰\":1.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"巨蔓藤\":{\"chinese_name\":\"巨蔓藤\",\"id\":465,\"japanese_name\":\"モジャンボ\",\"english_name\":\"Tangrowth\",\"height\":\"2.0\",\"weight\":\"128.6\",\"type\":[\"草\"],\"ability\":[\"叶绿素\",\"叶子防守\"],\"隐藏特性\":[\"再生力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"电击魔兽\":{\"chinese_name\":\"电击魔兽\",\"id\":466,\"japanese_name\":\"エレキブル\",\"english_name\":\"Electivire\",\"height\":\"1.8\",\"weight\":\"138.6\",\"type\":[\"电\"],\"ability\":[\"电气引擎\"],\"隐藏特性\":[\"干劲\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"鸭嘴炎兽\":{\"chinese_name\":\"鸭嘴炎兽\",\"id\":467,\"japanese_name\":\"ブーバーン\",\"english_name\":\"Magmortar\",\"height\":\"1.6\",\"weight\":\"68.0\",\"type\":[\"火\"],\"ability\":[\"火焰之躯\"],\"隐藏特性\":[\"干劲\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"波克基斯\":{\"chinese_name\":\"波克基斯\",\"id\":468,\"japanese_name\":\"トゲキッス\",\"english_name\":\"Togekiss\",\"height\":\"1.5\",\"weight\":\"38.0\",\"type\":[\"妖精\",\"飞行\"],\"ability\":[\"活力\",\"天恩\"],\"隐藏特性\":[\"超幸运\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":2,\"地面\":0,\"岩石\":2,\"虫\":0.25,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"远古巨蜓\":{\"chinese_name\":\"远古巨蜓\",\"id\":469,\"japanese_name\":\"メガヤンマ\",\"english_name\":\"Yanmega\",\"height\":\"1.9\",\"weight\":\"51.5\",\"type\":[\"虫\",\"飞行\"],\"ability\":[\"加速\",\"有色眼镜\"],\"隐藏特性\":[\"察觉\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"叶伊布\":{\"chinese_name\":\"叶伊布\",\"id\":470,\"japanese_name\":\"リーフィア\",\"english_name\":\"Leafeon\",\"height\":\"1.0\",\"weight\":\"25.5\",\"type\":[\"草\"],\"ability\":[\"叶子防守\"],\"隐藏特性\":[\"叶绿素\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"冰伊布\":{\"chinese_name\":\"冰伊布\",\"id\":471,\"japanese_name\":\"グレイシア\",\"english_name\":\"Glaceon\",\"height\":\"0.8\",\"weight\":\"25.9\",\"type\":[\"冰\"],\"ability\":[\"雪隐\"],\"隐藏特性\":[\"冰冻之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"天蝎王\":{\"chinese_name\":\"天蝎王\",\"id\":472,\"japanese_name\":\"グライオン\",\"english_name\":\"Gliscor\",\"height\":\"2.0\",\"weight\":\"42.5\",\"type\":[\"地面\",\"飞行\"],\"ability\":[\"怪力钳\",\"沙隐\"],\"隐藏特性\":[\"毒疗\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":4,\"龙\":1,\"恶\":1,\"妖精\":1}},\"象牙猪\":{\"chinese_name\":\"象牙猪\",\"id\":473,\"japanese_name\":\"マンムー\",\"english_name\":\"Mamoswine\",\"height\":\"2.5\",\"weight\":\"291.0\",\"type\":[\"冰\",\"地面\"],\"ability\":[\"迟钝\",\"雪隐\"],\"隐藏特性\":[\"厚脂肪\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"多边兽Ｚ\":{\"chinese_name\":\"多边兽Ｚ\",\"id\":474,\"japanese_name\":\"ポリゴンＺ\",\"english_name\":\"Porygon-Z\",\"height\":\"0.9\",\"weight\":\"34.0\",\"type\":[\"一般\"],\"ability\":[\"适应力\",\"下载\"],\"隐藏特性\":[\"分析\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"艾路雷朵\":{\"chinese_name\":\"艾路雷朵\",\"id\":475,\"japanese_name\":\"エルレイド\",\"english_name\":\"Gallade\",\"height\":\"1.6\",\"weight\":\"52.0\",\"type\":[\"超能力\",\"格斗\"],\"ability\":[\"不屈之心\",\"精神力\"],\"隐藏特性\":[\"正义之心\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":2}},\"大朝北鼻\":{\"chinese_name\":\"大朝北鼻\",\"id\":476,\"japanese_name\":\"ダイノーズ\",\"english_name\":\"Probopass\",\"height\":\"1.4\",\"weight\":\"340.0\",\"type\":[\"岩石\",\"钢\"],\"ability\":[\"结实\",\"磁力\"],\"隐藏特性\":[\"沙之力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.25,\"格斗\":4,\"飞行\":0.25,\"毒\":0,\"地面\":4,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"黑夜魔灵\":{\"chinese_name\":\"黑夜魔灵\",\"id\":477,\"japanese_name\":\"ヨノワール\",\"english_name\":\"Dusknoir\",\"height\":\"2.2\",\"weight\":\"106.6\",\"type\":[\"幽灵\"],\"ability\":[\"压迫感\"],\"隐藏特性\":[\"察觉\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"雪妖女\":{\"chinese_name\":\"雪妖女\",\"id\":478,\"japanese_name\":\"ユキメノコ\",\"english_name\":\"Froslass\",\"height\":\"1.3\",\"weight\":\"26.6\",\"type\":[\"冰\",\"幽灵\"],\"ability\":[\"雪隐\"],\"隐藏特性\":[\"诅咒之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":0.5,\"幽灵\":2,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":1}},\"洛托姆\":{\"chinese_name\":\"洛托姆\",\"id\":479,\"japanese_name\":\"ロトム\",\"english_name\":\"Rotom\",\"height\":\"0.3\",\"weight\":\"0.3\",\"type\":[\"电\",\"幽灵\",\"火\",\"水\",\"冰\",\"飞行\",\"草\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":0.5,\"毒\":0.5,\"地面\":0,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"由克希\":{\"chinese_name\":\"由克希\",\"id\":480,\"japanese_name\":\"ユクシー\",\"english_name\":\"Uxie\",\"height\":\"0.3\",\"weight\":\"0.3\",\"type\":[\"超能力\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"艾姆利多\":{\"chinese_name\":\"艾姆利多\",\"id\":481,\"japanese_name\":\"エムリット\",\"english_name\":\"Mesprit\",\"height\":\"0.3\",\"weight\":\"0.3\",\"type\":[\"超能力\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"亚克诺姆\":{\"chinese_name\":\"亚克诺姆\",\"id\":482,\"japanese_name\":\"アグノム\",\"english_name\":\"Azelf\",\"height\":\"0.3\",\"weight\":\"0.3\",\"type\":[\"超能力\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"帝牙卢卡\":{\"chinese_name\":\"帝牙卢卡\",\"id\":483,\"japanese_name\":\"ディアルガ\",\"english_name\":\"Dialga\",\"height\":\"5.4\",\"weight\":\"683.0\",\"type\":[\"钢\",\"龙\"],\"ability\":[\"压迫感\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"帕路奇亚\":{\"chinese_name\":\"帕路奇亚\",\"id\":484,\"japanese_name\":\"パルキア\",\"english_name\":\"Palkia\",\"height\":\"4.2\",\"weight\":\"336.0\",\"type\":[\"水\",\"龙\"],\"ability\":[\"压迫感\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.25,\"水\":0.25,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":2,\"恶\":1,\"妖精\":2}},\"席多蓝恩\":{\"chinese_name\":\"席多蓝恩\",\"id\":485,\"japanese_name\":\"ヒードラン\",\"english_name\":\"Heatran\",\"height\":\"1.7\",\"weight\":\"430.0\",\"type\":[\"火\",\"钢\"],\"ability\":[\"引火\"],\"隐藏特性\":[\"火焰之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0,\"地面\":4,\"岩石\":1,\"虫\":0.25,\"幽灵\":1,\"钢\":0.25,\"火\":0,\"水\":2,\"草\":0.25,\"电\":1,\"超能力\":0.5,\"冰\":0.25,\"龙\":0.5,\"恶\":1,\"妖精\":0.25}},\"雷吉奇卡斯\":{\"chinese_name\":\"雷吉奇卡斯\",\"id\":486,\"japanese_name\":\"レジギガス\",\"english_name\":\"Regigigas\",\"height\":\"3.7\",\"weight\":\"420.0\",\"type\":[\"一般\"],\"ability\":[\"慢启动\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"骑拉帝纳\":{\"chinese_name\":\"骑拉帝纳\",\"id\":487,\"japanese_name\":\"ギラティナ\",\"english_name\":\"Giratina\",\"height\":\"4.5\",\"weight\":\"750.0\",\"type\":[\"幽灵\",\"龙\"],\"ability\":[\"压迫感\",\"飘浮\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":2,\"妖精\":2}},\"克雷色利亚\":{\"chinese_name\":\"克雷色利亚\",\"id\":488,\"japanese_name\":\"クレセリア\",\"english_name\":\"Cresselia\",\"height\":\"1.5\",\"weight\":\"85.6\",\"type\":[\"超能力\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"霏欧纳\":{\"chinese_name\":\"霏欧纳\",\"id\":489,\"japanese_name\":\"フィオネ\",\"english_name\":\"Phione\",\"height\":\"0.4\",\"weight\":\"3.1\",\"type\":[\"水\"],\"ability\":[\"湿润之躯\"],\"隐藏特性\":[],\"进化\":\"玛纳霏\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"玛纳霏\":{\"chinese_name\":\"玛纳霏\",\"id\":490,\"japanese_name\":\"マナフィ\",\"english_name\":\"Manaphy\",\"height\":\"0.3\",\"weight\":\"1.4\",\"type\":[\"水\"],\"ability\":[\"湿润之躯\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"达克莱伊\":{\"chinese_name\":\"达克莱伊\",\"id\":491,\"japanese_name\":\"ダークライ\",\"english_name\":\"Darkrai\",\"height\":\"1.5\",\"weight\":\"50.5\",\"type\":[\"恶\"],\"ability\":[\"梦魇\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"谢米\":{\"chinese_name\":\"谢米\",\"id\":492,\"japanese_name\":\"シェイミ\",\"english_name\":\"Shaymin\",\"height\":\"0.2\",\"weight\":\"2.1\",\"type\":[\"草\",\"飞行\"],\"ability\":[\"自然回复\",\"天恩\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"阿尔宙斯\":{\"chinese_name\":\"阿尔宙斯\",\"id\":493,\"japanese_name\":\"アルセウス\",\"english_name\":\"Arceus\",\"height\":\"3.2\",\"weight\":\"320.0\",\"type\":[\"一般\"],\"ability\":[\"多属性\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"比克提尼\":{\"chinese_name\":\"比克提尼\",\"id\":494,\"japanese_name\":\"ビクティニ\",\"english_name\":\"Victini\",\"height\":\"0.4\",\"weight\":\"4.0\",\"type\":[\"超能力\",\"火\"],\"ability\":[\"胜利之星\",\"\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":1,\"幽灵\":2,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":0.5}},\"藤藤蛇\":{\"chinese_name\":\"藤藤蛇\",\"id\":495,\"japanese_name\":\"ツタージャ\",\"english_name\":\"Snivy\",\"height\":\"0.6\",\"weight\":\"8.1\",\"type\":[\"草\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"唱反调\"],\"进化\":\"青藤蛇\",\"进化等级\":17,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"青藤蛇\":{\"chinese_name\":\"青藤蛇\",\"id\":496,\"japanese_name\":\"ジャノビー\",\"english_name\":\"Servine\",\"height\":\"0.8\",\"weight\":\"16.0\",\"type\":[\"草\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"唱反调\"],\"进化\":\"君主蛇\",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"君主蛇\":{\"chinese_name\":\"君主蛇\",\"id\":497,\"japanese_name\":\"ジャローダ\",\"english_name\":\"Serperior\",\"height\":\"3.3\",\"weight\":\"63.0\",\"type\":[\"草\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"唱反调\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"暖暖猪\":{\"chinese_name\":\"暖暖猪\",\"id\":498,\"japanese_name\":\"ポカブ\",\"english_name\":\"Tepig\",\"height\":\"0.5\",\"weight\":\"9.9\",\"type\":[\"火\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"厚脂肪\"],\"进化\":\"炒炒猪\",\"进化等级\":17,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.25,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.25,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"炒炒猪\":{\"chinese_name\":\"炒炒猪\",\"id\":499,\"japanese_name\":\"チャオブー\",\"english_name\":\"Pignite\",\"height\":\"1.0\",\"weight\":\"55.0\",\"type\":[\"火\",\"格斗\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"厚脂肪\"],\"进化\":\"炎武王\",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":0.25,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":0.25,\"龙\":1,\"恶\":0.5,\"妖精\":1}},\"炎武王\":{\"chinese_name\":\"炎武王\",\"id\":500,\"japanese_name\":\"エンブオー\",\"english_name\":\"Emboar\",\"height\":\"1.6\",\"weight\":\"150.0\",\"type\":[\"火\",\"格斗\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"舍身\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":1}},\"水水獭\":{\"chinese_name\":\"水水獭\",\"id\":501,\"japanese_name\":\"ミジュマル\",\"english_name\":\"Oshawott\",\"height\":\"0.5\",\"weight\":\"5.9\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"硬壳盔甲\"],\"进化\":\"双刃丸\",\"进化等级\":17,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"双刃丸\":{\"chinese_name\":\"双刃丸\",\"id\":502,\"japanese_name\":\"フタチマル\",\"english_name\":\"Dewott\",\"height\":\"0.8\",\"weight\":\"24.5\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"硬壳盔甲\"],\"进化\":\"大剑鬼\",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"大剑鬼\":{\"chinese_name\":\"大剑鬼\",\"id\":503,\"japanese_name\":\"ダイケンキ\",\"english_name\":\"Samurott\",\"height\":\"1.5\",\"weight\":\"94.6\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"硬壳盔甲\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"探探鼠\":{\"chinese_name\":\"探探鼠\",\"id\":504,\"japanese_name\":\"ミネズミ\",\"english_name\":\"Patrat\",\"height\":\"0.5\",\"weight\":\"11.6\",\"type\":[\"一般\"],\"ability\":[\"逃跑\",\"锐利目光\"],\"隐藏特性\":[\"分析\"],\"进化\":\"步哨鼠\",\"进化等级\":20,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"小约克\":{\"chinese_name\":\"小约克\",\"id\":506,\"japanese_name\":\"ヨーテリー\",\"english_name\":\"Lillipup\",\"height\":\"0.4\",\"weight\":\"4.1\",\"type\":[\"一般\"],\"ability\":[\"干劲\",\"捡拾\"],\"隐藏特性\":[\"逃跑\"],\"进化\":\"哈约克\",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"哈约克\":{\"chinese_name\":\"哈约克\",\"id\":507,\"japanese_name\":\"ハーデリア\",\"english_name\":\"Herdier\",\"height\":\"0.9\",\"weight\":\"14.7\",\"type\":[\"一般\"],\"ability\":[\"威吓\",\"拨沙\"],\"隐藏特性\":[\"胆量\"],\"进化\":\"长毛狗\",\"进化等级\":32,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"长毛狗\":{\"chinese_name\":\"长毛狗\",\"id\":508,\"japanese_name\":\"ムーランド\",\"english_name\":\"Stoutland\",\"height\":\"1.2\",\"weight\":\"61.0\",\"type\":[\"一般\"],\"ability\":[\"威吓\",\"拨沙\"],\"隐藏特性\":[\"胆量\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"扒手猫\":{\"chinese_name\":\"扒手猫\",\"id\":509,\"japanese_name\":\"チョロネコ\",\"english_name\":\"Purrloin\",\"height\":\"0.4\",\"weight\":\"10.1\",\"type\":[\"恶\"],\"ability\":[\"柔软\",\"轻装\"],\"隐藏特性\":[\"恶作剧之心\"],\"进化\":\"酷豹\",\"进化等级\":20,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"酷豹\":{\"chinese_name\":\"酷豹\",\"id\":510,\"japanese_name\":\"レパルダス\",\"english_name\":\"Liepard\",\"height\":\"1.1\",\"weight\":\"37.5\",\"type\":[\"恶\"],\"ability\":[\"柔软\",\"轻装\"],\"隐藏特性\":[\"恶作剧之心\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"花椰猴\":{\"chinese_name\":\"花椰猴\",\"id\":511,\"japanese_name\":\"ヤナップ\",\"english_name\":\"Pansage\",\"height\":\"0.6\",\"weight\":\"10.5\",\"type\":[\"草\"],\"ability\":[\"贪吃鬼\"],\"隐藏特性\":[\"茂盛\"],\"进化\":\"花椰猿\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"花椰猿\":{\"chinese_name\":\"花椰猿\",\"id\":512,\"japanese_name\":\"ヤナッキー\",\"english_name\":\"Simisage\",\"height\":\"1.1\",\"weight\":\"30.5\",\"type\":[\"草\"],\"ability\":[\"贪吃鬼\"],\"隐藏特性\":[\"茂盛\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"爆香猴\":{\"chinese_name\":\"爆香猴\",\"id\":513,\"japanese_name\":\"バオップ\",\"english_name\":\"Pansear\",\"height\":\"0.6\",\"weight\":\"11.0\",\"type\":[\"火\"],\"ability\":[\"贪吃鬼\"],\"隐藏特性\":[\"猛火\"],\"进化\":\"爆香猿\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"爆香猿\":{\"chinese_name\":\"爆香猿\",\"id\":514,\"japanese_name\":\"バオッキー\",\"english_name\":\"Simisear\",\"height\":\"1.0\",\"weight\":\"28.0\",\"type\":[\"火\"],\"ability\":[\"贪吃鬼\"],\"隐藏特性\":[\"猛火\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"冷水猴\":{\"chinese_name\":\"冷水猴\",\"id\":515,\"japanese_name\":\"ヒヤップ\",\"english_name\":\"Panpour\",\"height\":\"0.6\",\"weight\":\"13.5\",\"type\":[\"水\"],\"ability\":[\"贪吃鬼\"],\"隐藏特性\":[\"激流\"],\"进化\":\"冷水猿\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"冷水猿\":{\"chinese_name\":\"冷水猿\",\"id\":516,\"japanese_name\":\"ヒヤッキー\",\"english_name\":\"Simipour\",\"height\":\"1.0\",\"weight\":\"29.0\",\"type\":[\"水\"],\"ability\":[\"贪吃鬼\"],\"隐藏特性\":[\"激流\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"食梦梦\":{\"chinese_name\":\"食梦梦\",\"id\":517,\"japanese_name\":\"ムンナ\",\"english_name\":\"Munna\",\"height\":\"0.6\",\"weight\":\"23.3\",\"type\":[\"超能力\"],\"ability\":[\"预知梦\",\"同步\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"梦梦蚀\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"梦梦蚀\":{\"chinese_name\":\"梦梦蚀\",\"id\":518,\"japanese_name\":\"ムシャーナ\",\"english_name\":\"Musharna\",\"height\":\"1.1\",\"weight\":\"60.5\",\"type\":[\"超能力\"],\"ability\":[\"预知梦\",\"同步\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"豆豆鸽\":{\"chinese_name\":\"豆豆鸽\",\"id\":519,\"japanese_name\":\"マメパト\",\"english_name\":\"Pidove\",\"height\":\"0.3\",\"weight\":\"2.1\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"健壮胸肌\",\"超幸运\"],\"隐藏特性\":[\"斗争心\"],\"进化\":\"咕咕鸽\",\"进化等级\":21,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"咕咕鸽\":{\"chinese_name\":\"咕咕鸽\",\"id\":520,\"japanese_name\":\"ハトーボー\",\"english_name\":\"Tranquill\",\"height\":\"0.6\",\"weight\":\"15.0\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"健壮胸肌\",\"超幸运\"],\"隐藏特性\":[\"斗争心\"],\"进化\":\"高傲雉鸡\",\"进化等级\":32,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"高傲雉鸡\":{\"chinese_name\":\"高傲雉鸡\",\"id\":521,\"japanese_name\":\"ケンホロウ\",\"english_name\":\"Unfezant\",\"height\":\"1.2\",\"weight\":\"29.0\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"健壮胸肌\",\"超幸运\"],\"隐藏特性\":[\"斗争心\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"斑斑马\":{\"chinese_name\":\"斑斑马\",\"id\":522,\"japanese_name\":\"シママ\",\"english_name\":\"Blitzle|\",\"height\":\"0.8\",\"weight\":\"29.8\",\"type\":[\"电\"],\"ability\":[\"避雷针\",\"电气引擎\"],\"隐藏特性\":[\"食草\"],\"进化\":\"雷电斑马\",\"进化等级\":27,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"雷电斑马\":{\"chinese_name\":\"雷电斑马\",\"id\":523,\"japanese_name\":\"ゼブライカ\",\"english_name\":\"Zebstrika\",\"height\":\"1.6\",\"weight\":\"79.5\",\"type\":[\"电\"],\"ability\":[\"避雷针\",\"电气引擎\"],\"隐藏特性\":[\"食草\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"石丸子\":{\"chinese_name\":\"石丸子\",\"id\":524,\"japanese_name\":\"ダンゴロ\",\"english_name\":\"Roggenrola\",\"height\":\"0.4\",\"weight\":\"18.0\",\"type\":[\"岩石\"],\"ability\":[\"结实\",\"碎裂铠甲\"],\"隐藏特性\":[\"沙之力\"],\"进化\":\"地幔岩\",\"进化等级\":25,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":null}},\"地幔岩\":{\"chinese_name\":\"地幔岩\",\"id\":525,\"japanese_name\":\"ガントル\",\"english_name\":\"Boldore\",\"height\":\"0.9\",\"weight\":\"102.0\",\"type\":[\"岩石\"],\"ability\":[\"结实\",\"碎裂铠甲\"],\"隐藏特性\":[\"沙之力\"],\"进化\":\"庞岩怪\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":null}},\"庞岩怪\":{\"chinese_name\":\"庞岩怪\",\"id\":526,\"japanese_name\":\"ギガイアス\",\"english_name\":\"Gigalith\",\"height\":\"1.7\",\"weight\":\"260.0\",\"type\":[\"岩石\"],\"ability\":[\"结实\",\"扬沙\"],\"隐藏特性\":[\"沙之力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"滚滚蝙蝠\":{\"chinese_name\":\"滚滚蝙蝠\",\"id\":527,\"japanese_name\":\"コロモリ\",\"english_name\":\"Woobat\",\"height\":\"0.4\",\"weight\":\"2.1\",\"type\":[\"超能力\",\"飞行\"],\"ability\":[\"纯朴\",\"笨拙\"],\"隐藏特性\":[\"单纯\"],\"进化\":\"心蝙蝠\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":0.5,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"心蝙蝠\":{\"chinese_name\":\"心蝙蝠\",\"id\":528,\"japanese_name\":\"ココロモリ\",\"english_name\":\"Swoobat\",\"height\":\"0.9\",\"weight\":\"10.5\",\"type\":[\"超能力\",\"飞行\"],\"ability\":[\"纯朴\",\"笨拙\"],\"隐藏特性\":[\"单纯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":0.5,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"螺钉地鼠\":{\"chinese_name\":\"螺钉地鼠\",\"id\":529,\"japanese_name\":\"モグリュー\",\"english_name\":\"Drilbur\",\"height\":\"0.3\",\"weight\":\"8.5\",\"type\":[\"地面\"],\"ability\":[\"拨沙\",\"沙之力\"],\"隐藏特性\":[\"破格\"],\"进化\":\"龙头地鼠\",\"进化等级\":31,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"龙头地鼠\":{\"chinese_name\":\"龙头地鼠\",\"id\":530,\"japanese_name\":\"ドリュウズ\",\"english_name\":\"Excadrill\",\"height\":\"0.7\",\"weight\":\"40.4\",\"type\":[\"地面\",\"钢\"],\"ability\":[\"拨沙\",\"沙之力\"],\"隐藏特性\":[\"破格\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.25,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":2,\"草\":1,\"电\":0,\"超能力\":0.5,\"冰\":1,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"差不多娃娃\":{\"chinese_name\":\"差不多娃娃\",\"id\":531,\"japanese_name\":\"タブンネ\",\"english_name\":\"Audino\",\"height\":\"1.1\",\"weight\":\"31.0\",\"type\":[\"一般\",\"妖精\"],\"ability\":[\"治愈之心\",\"再生力\"],\"隐藏特性\":[\"笨拙\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":0,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"搬运小匠\":{\"chinese_name\":\"搬运小匠\",\"id\":532,\"japanese_name\":\"ドッコラー\",\"english_name\":\"Timburr\",\"height\":\"0.6\",\"weight\":\"12.5\",\"type\":[\"格斗\"],\"ability\":[\"毅力\",\"强行\"],\"隐藏特性\":[\"铁拳\"],\"进化\":\"铁骨土人\",\"进化等级\":25,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"铁骨土人\":{\"chinese_name\":\"铁骨土人\",\"id\":533,\"japanese_name\":\"ドテッコツ\",\"english_name\":\"Gurdurr\",\"height\":\"1.2\",\"weight\":\"40.0\",\"type\":[\"格斗\"],\"ability\":[\"毅力\",\"强行\"],\"隐藏特性\":[\"铁拳\"],\"进化\":\"修建老匠\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"修建老匠\":{\"chinese_name\":\"修建老匠\",\"id\":534,\"japanese_name\":\"ローブシン\",\"english_name\":\"Conkeldurr\",\"height\":\"1.4\",\"weight\":\"87.0\",\"type\":[\"格斗\"],\"ability\":[\"毅力\",\"强行\"],\"隐藏特性\":[\"铁拳\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"圆蝌蚪\":{\"chinese_name\":\"圆蝌蚪\",\"id\":535,\"japanese_name\":\"オタマロ\",\"english_name\":\"Tympole\",\"height\":\"0.5\",\"weight\":\"4.5\",\"type\":[\"水\"],\"ability\":[\"悠游自如\",\"湿润之躯\"],\"隐藏特性\":[\"储水\"],\"进化\":\"蓝蟾蜍\",\"进化等级\":25,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"蓝蟾蜍\":{\"chinese_name\":\"蓝蟾蜍\",\"id\":536,\"japanese_name\":\"ガマガル\",\"english_name\":\"Palpitoad\",\"height\":\"0.8\",\"weight\":\"17.0\",\"type\":[\"水\",\"地面\"],\"ability\":[\"悠游自如\",\"湿润之躯\"],\"隐藏特性\":[\"储水\"],\"进化\":\"蟾蜍王\",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"蟾蜍王\":{\"chinese_name\":\"蟾蜍王\",\"id\":537,\"japanese_name\":\"ガマゲロゲ\",\"english_name\":\"Seismitoad\",\"height\":\"1.5\",\"weight\":\"62.0\",\"type\":[\"水\",\"地面\"],\"ability\":[\"悠游自如\",\"毒手\"],\"隐藏特性\":[\"储水\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":4,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"投摔鬼\":{\"chinese_name\":\"投摔鬼\",\"id\":538,\"japanese_name\":\"ナゲキ\",\"english_name\":\"Throh\",\"height\":\"1.3\",\"weight\":\"55.5\",\"type\":[\"格斗\"],\"ability\":[\"毅力\",\"精神力\"],\"隐藏特性\":[\"破格\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"打击鬼\":{\"chinese_name\":\"打击鬼\",\"id\":539,\"japanese_name\":\"ダゲキ\",\"english_name\":\"Sawk\",\"height\":\"1.4\",\"weight\":\"51.0\",\"type\":[\"格斗\"],\"ability\":[\"结实\",\"精神力\"],\"隐藏特性\":[\"破格\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"虫宝包\":{\"chinese_name\":\"虫宝包\",\"id\":540,\"japanese_name\":\"クルミル\",\"english_name\":\"Sewaddle\",\"height\":\"0.3\",\"weight\":\"2.5\",\"type\":[\"虫\",\"草\"],\"ability\":[\"虫之预感\",\"叶绿素\"],\"隐藏特性\":[\"防尘\"],\"进化\":\"宝包茧\",\"进化等级\":20,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":4,\"毒\":2,\"地面\":0.25,\"岩石\":2,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":4,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"宝包茧\":{\"chinese_name\":\"宝包茧\",\"id\":541,\"japanese_name\":\"クルマユ\",\"english_name\":\"Swadloon\",\"height\":\"0.5\",\"weight\":\"7.3\",\"type\":[\"虫\",\"草\"],\"ability\":[\"叶子防守\",\"叶绿素\"],\"隐藏特性\":[\"防尘\"],\"进化\":\"保姆虫\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":4,\"毒\":2,\"地面\":0.25,\"岩石\":2,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":4,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"保姆虫\":{\"chinese_name\":\"保姆虫\",\"id\":542,\"japanese_name\":\"ハハコモリ\",\"english_name\":\"Leavanny\",\"height\":\"1.2\",\"weight\":\"20.5\",\"type\":[\"虫\",\"草\"],\"ability\":[\"虫之预感\",\"叶绿素\"],\"隐藏特性\":[\"防尘\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":4,\"毒\":2,\"地面\":0.25,\"岩石\":2,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":4,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"百足蜈蚣\":{\"chinese_name\":\"百足蜈蚣\",\"id\":543,\"japanese_name\":\"フシデ\",\"english_name\":\"Venipede\",\"height\":\"0.4\",\"weight\":\"5.3\",\"type\":[\"虫\",\"毒\"],\"ability\":[\"毒刺\",\"虫之预感\"],\"隐藏特性\":[\"加速\"],\"进化\":\"车轮球\",\"进化等级\":22,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"车轮球\":{\"chinese_name\":\"车轮球\",\"id\":544,\"japanese_name\":\"ホイーガ\",\"english_name\":\"Whirlipede\",\"height\":\"1.2\",\"weight\":\"58.5\",\"type\":[\"虫\",\"毒\"],\"ability\":[\"毒刺\",\"虫之预感\"],\"隐藏特性\":[\"加速\"],\"进化\":\"蜈蚣王\",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"蜈蚣王\":{\"chinese_name\":\"蜈蚣王\",\"id\":545,\"japanese_name\":\"ペンドラー\",\"english_name\":\"Scolipede\",\"height\":\"2.5\",\"weight\":\"200.5\",\"type\":[\"虫\",\"毒\"],\"ability\":[\"毒刺\",\"虫之预感\"],\"隐藏特性\":[\"加速\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"木棉球\":{\"chinese_name\":\"木棉球\",\"id\":546,\"japanese_name\":\"モンメン\",\"english_name\":\"Cottonee\",\"height\":\"0.3\",\"weight\":\"0.6\",\"type\":[\"草\",\"妖精\"],\"ability\":[\"恶作剧之心\",\"穿透\"],\"隐藏特性\":[\"叶绿素\"],\"进化\":\"风妖精\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":4,\"地面\":0.5,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"风妖精\":{\"chinese_name\":\"风妖精\",\"id\":547,\"japanese_name\":\"エルフーン\",\"english_name\":\"Whimsicott\",\"height\":\"0.7\",\"weight\":\"6.6\",\"type\":[\"草\",\"妖精\"],\"ability\":[\"恶作剧之心\",\"穿透\"],\"隐藏特性\":[\"叶绿素\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":4,\"地面\":0.5,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"百合根娃娃\":{\"chinese_name\":\"百合根娃娃\",\"id\":548,\"japanese_name\":\"チュリネ\",\"english_name\":\"Petilil\",\"height\":\"0.5\",\"weight\":\"6.6\",\"type\":[\"草\"],\"ability\":[\"叶绿素\",\"我行我素\"],\"隐藏特性\":[\"叶子防守\"],\"进化\":\"裙儿小姐\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"裙儿小姐\":{\"chinese_name\":\"裙儿小姐\",\"id\":549,\"japanese_name\":\"ドレディア\",\"english_name\":\"Lilligant\",\"height\":\"1.1\",\"weight\":\"16.3\",\"type\":[\"草\"],\"ability\":[\"叶绿素\",\"我行我素\"],\"隐藏特性\":[\"叶子防守\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"野蛮鲈鱼\":{\"chinese_name\":\"野蛮鲈鱼\",\"id\":550,\"japanese_name\":\"バスラオ\",\"english_name\":\"Basculin\",\"height\":\"1.0\",\"weight\":\"18.0\",\"type\":[\"水\"],\"ability\":[\"舍身\",\"适应力\",\"坚硬脑袋\"],\"隐藏特性\":[\"破格\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"黑眼鳄\":{\"chinese_name\":\"黑眼鳄\",\"id\":551,\"japanese_name\":\"メグロコ\",\"english_name\":\"Sandile\",\"height\":\"0.7\",\"weight\":\"15.2\",\"type\":[\"地面\",\"恶\"],\"ability\":[\"威吓\",\"自信过度\"],\"隐藏特性\":[\"愤怒穴位\"],\"进化\":\"混混鳄\",\"进化等级\":29,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":0,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"混混鳄\":{\"chinese_name\":\"混混鳄\",\"id\":552,\"japanese_name\":\"ワルビル\",\"english_name\":\"Krokorok\",\"height\":\"1.0\",\"weight\":\"33.4\",\"type\":[\"地面\",\"恶\"],\"ability\":[\"威吓\",\"自信过度\"],\"隐藏特性\":[\"愤怒穴位\"],\"进化\":\"流氓鳄\",\"进化等级\":40,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":0,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"流氓鳄\":{\"chinese_name\":\"流氓鳄\",\"id\":553,\"japanese_name\":\"ワルビアル\",\"english_name\":\"Krookodile\",\"height\":\"1.5\",\"weight\":\"96.3\",\"type\":[\"地面\",\"恶\"],\"ability\":[\"威吓\",\"自信过度\"],\"隐藏特性\":[\"愤怒穴位\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":0,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"火红不倒翁\":{\"chinese_name\":\"火红不倒翁\",\"id\":554,\"japanese_name\":\"ダルマッカ\",\"english_name\":\"Darumaka\",\"height\":\"0.6\",\"weight\":\"37.5\",\"type\":[\"火\",\"冰\"],\"ability\":[\"活力\"],\"隐藏特性\":[\"精神力\"],\"进化\":\"达摩狒狒\",\"进化等级\":35,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"达摩狒狒\":{\"chinese_name\":\"达摩狒狒\",\"id\":555,\"japanese_name\":\"ヒヒダルマ\",\"english_name\":\"Darmanitan\",\"height\":\"1.3\",\"weight\":\"92.9\",\"type\":[\"火\",\"超能力\",\"冰\"],\"ability\":[\"强行\",\"达摩模式\",\"一猩一意\"],\"隐藏特性\":[\"达摩模式\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"沙铃仙人掌\":{\"chinese_name\":\"沙铃仙人掌\",\"id\":556,\"japanese_name\":\"マラカッチ\",\"english_name\":\"Maractus\",\"height\":\"1.0\",\"weight\":\"28.0\",\"type\":[\"草\"],\"ability\":[\"储水\",\"叶绿素\"],\"隐藏特性\":[\"引水\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"石居蟹\":{\"chinese_name\":\"石居蟹\",\"id\":557,\"japanese_name\":\"イシズマイ\",\"english_name\":\"Dwebble\",\"height\":\"0.3\",\"weight\":\"14.5\",\"type\":[\"虫\",\"岩石\"],\"ability\":[\"结实\",\"硬壳盔甲\"],\"隐藏特性\":[\"碎裂铠甲\"],\"进化\":\"岩殿居蟹\",\"进化等级\":34,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":2,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"岩殿居蟹\":{\"chinese_name\":\"岩殿居蟹\",\"id\":558,\"japanese_name\":\"イワパレス\",\"english_name\":\"Crustle\",\"height\":\"1.4\",\"weight\":\"200.0\",\"type\":[\"虫\",\"岩石\"],\"ability\":[\"结实\",\"硬壳盔甲\"],\"隐藏特性\":[\"碎裂铠甲\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":2,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"滑滑小子\":{\"chinese_name\":\"滑滑小子\",\"id\":559,\"japanese_name\":\"ズルッグ\",\"english_name\":\"Scraggy\",\"height\":\"0.6\",\"weight\":\"11.8\",\"type\":[\"恶\",\"格斗\"],\"ability\":[\"蜕皮\",\"自信过度\"],\"隐藏特性\":[\"威吓\"],\"进化\":\"头巾混混\",\"进化等级\":39,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.25,\"妖精\":4}},\"头巾混混\":{\"chinese_name\":\"头巾混混\",\"id\":560,\"japanese_name\":\"ズルズキン\",\"english_name\":\"Scrafty\",\"height\":\"1.1\",\"weight\":\"30.0\",\"type\":[\"恶\",\"格斗\"],\"ability\":[\"蜕皮\",\"自信过度\"],\"隐藏特性\":[\"威吓\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.25,\"妖精\":4}},\"象征鸟\":{\"chinese_name\":\"象征鸟\",\"id\":561,\"japanese_name\":\"シンボラー\",\"english_name\":\"Sigilyph\",\"height\":\"1.4\",\"weight\":\"14.0\",\"type\":[\"超能力\",\"飞行\"],\"ability\":[\"奇迹皮肤\",\"魔法防守\"],\"隐藏特性\":[\"有色眼镜\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":0.5,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"哭哭面具\":{\"chinese_name\":\"哭哭面具\",\"id\":562,\"japanese_name\":\"デスマス\",\"english_name\":\"Yamask\",\"height\":\"0.5\",\"weight\":\"1.5\",\"type\":[\"幽灵\",\"地面\"],\"ability\":[\"木乃伊\",\"游魂\"],\"隐藏特性\":[],\"进化\":\"死神棺\",\"进化等级\":34,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"死神棺\":{\"chinese_name\":\"死神棺\",\"id\":563,\"japanese_name\":\"デスカーン\",\"english_name\":\"Cofagrigus\",\"height\":\"1.7\",\"weight\":\"76.5\",\"type\":[\"幽灵\"],\"ability\":[\"木乃伊\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"原盖海龟\":{\"chinese_name\":\"原盖海龟\",\"id\":564,\"japanese_name\":\"プロトーガ\",\"english_name\":\"Tirtouga\",\"height\":\"0.7\",\"weight\":\"16.5\",\"type\":[\"水\",\"岩石\"],\"ability\":[\"坚硬岩石\",\"结实\"],\"隐藏特性\":[\"悠游自如\"],\"进化\":\"肋骨海龟\",\"进化等级\":37,\"属性相性\":{\"一般\":0.5,\"格斗\":1.5,\"飞行\":0.5,\"毒\":0.5,\"地面\":1.5,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.25,\"水\":1,\"草\":3,\"电\":1.5,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"肋骨海龟\":{\"chinese_name\":\"肋骨海龟\",\"id\":565,\"japanese_name\":\"アバゴーラ\",\"english_name\":\"Carracosta\",\"height\":\"1.2\",\"weight\":\"81.0\",\"type\":[\"水\",\"岩石\"],\"ability\":[\"坚硬岩石\",\"结实\"],\"隐藏特性\":[\"悠游自如\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1.5,\"飞行\":0.5,\"毒\":0.5,\"地面\":1.5,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.25,\"水\":1,\"草\":3,\"电\":1.5,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"始祖小鸟\":{\"chinese_name\":\"始祖小鸟\",\"id\":566,\"japanese_name\":\"アーケン\",\"english_name\":\"Archen\",\"height\":\"0.5\",\"weight\":\"9.5\",\"type\":[\"岩石\",\"飞行\"],\"ability\":[\"软弱\"],\"隐藏特性\":[],\"进化\":\"始祖大鸟\",\"进化等级\":37,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0.5,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":1,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"始祖大鸟\":{\"chinese_name\":\"始祖大鸟\",\"id\":567,\"japanese_name\":\"アーケオス\",\"english_name\":\"Archeops\",\"height\":\"1.4\",\"weight\":\"32.0\",\"type\":[\"岩石\",\"飞行\"],\"ability\":[\"软弱\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0.5,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":1,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"破破袋\":{\"chinese_name\":\"破破袋\",\"id\":568,\"japanese_name\":\"ヤブクロン\",\"english_name\":\"Trubbish\",\"height\":\"0.6\",\"weight\":\"31.0\",\"type\":[\"毒\"],\"ability\":[\"恶臭\",\"黏着\"],\"隐藏特性\":[\"引爆\"],\"进化\":\"灰尘山\",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"灰尘山\":{\"chinese_name\":\"灰尘山\",\"id\":569,\"japanese_name\":\"ダストダス\",\"english_name\":\"Garbodor\",\"height\":\"1.9\",\"weight\":\"107.3\",\"type\":[\"毒\"],\"ability\":[\"恶臭\",\"碎裂铠甲\"],\"隐藏特性\":[\"引爆\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"索罗亚\":{\"chinese_name\":\"索罗亚\",\"id\":570,\"japanese_name\":\"ゾロア\",\"english_name\":\"Zorua\",\"height\":\"0.7\",\"weight\":\"12.5\",\"type\":[\"恶\"],\"ability\":[\"幻觉\"],\"隐藏特性\":[],\"进化\":\"索罗亚克\",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"索罗亚克\":{\"chinese_name\":\"索罗亚克\",\"id\":571,\"japanese_name\":\"ゾロアーク\",\"english_name\":\"Zoroark\",\"height\":\"1.6\",\"weight\":\"81.1\",\"type\":[\"恶\"],\"ability\":[\"幻觉\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"泡沫栗鼠\":{\"chinese_name\":\"泡沫栗鼠\",\"id\":572,\"japanese_name\":\"チラーミィ\",\"english_name\":\"Minccino\",\"height\":\"0.4\",\"weight\":\"5.8\",\"type\":[\"一般\"],\"ability\":[\"迷人之躯\",\"技术高手\"],\"隐藏特性\":[\"连续攻击\"],\"进化\":\"奇诺栗鼠\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"奇诺栗鼠\":{\"chinese_name\":\"奇诺栗鼠\",\"id\":573,\"japanese_name\":\"チラチーノ\",\"english_name\":\"Cinccino\",\"height\":\"0.5\",\"weight\":\"7.5\",\"type\":[\"一般\"],\"ability\":[\"迷人之躯\",\"技术高手\"],\"隐藏特性\":[\"连续攻击\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"哥德宝宝\":{\"chinese_name\":\"哥德宝宝\",\"id\":574,\"japanese_name\":\"ゴチム\",\"english_name\":\"Gothita\",\"height\":\"0.4\",\"weight\":\"5.8\",\"type\":[\"超能力\"],\"ability\":[\"察觉\",\"好胜\"],\"隐藏特性\":[\"踩影\"],\"进化\":\"哥德小童\",\"进化等级\":32,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"哥德小童\":{\"chinese_name\":\"哥德小童\",\"id\":575,\"japanese_name\":\"ゴチミル\",\"english_name\":\"Gothorita\",\"height\":\"0.7\",\"weight\":\"18.0\",\"type\":[\"超能力\"],\"ability\":[\"察觉\",\"好胜\"],\"隐藏特性\":[\"踩影\"],\"进化\":\"哥德小姐\",\"进化等级\":41,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"哥德小姐\":{\"chinese_name\":\"哥德小姐\",\"id\":576,\"japanese_name\":\"ゴチルゼル\",\"english_name\":\"Gothitelle\",\"height\":\"1.5\",\"weight\":\"44.0\",\"type\":[\"超能力\"],\"ability\":[\"察觉\",\"好胜\"],\"隐藏特性\":[\"踩影\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"单卵细胞球\":{\"chinese_name\":\"单卵细胞球\",\"id\":577,\"japanese_name\":\"ユニラン\",\"english_name\":\"Solosis\",\"height\":\"0.3\",\"weight\":\"1.0\",\"type\":[\"超能力\"],\"ability\":[\"防尘\",\"魔法防守\"],\"隐藏特性\":[\"再生力\"],\"进化\":\"双卵细胞球\",\"进化等级\":32,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"双卵细胞球\":{\"chinese_name\":\"双卵细胞球\",\"id\":578,\"japanese_name\":\"ダブラン\",\"english_name\":\"Duosion\",\"height\":\"0.6\",\"weight\":\"8.0\",\"type\":[\"超能力\"],\"ability\":[\"防尘\",\"魔法防守\"],\"隐藏特性\":[\"再生力\"],\"进化\":\"人造细胞卵\",\"进化等级\":41,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"人造细胞卵\":{\"chinese_name\":\"人造细胞卵\",\"id\":579,\"japanese_name\":\"ランクルス\",\"english_name\":\"Reuniclus\",\"height\":\"1.0\",\"weight\":\"20.1\",\"type\":[\"超能力\"],\"ability\":[\"防尘\",\"魔法防守\"],\"隐藏特性\":[\"再生力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"鸭宝宝\":{\"chinese_name\":\"鸭宝宝\",\"id\":580,\"japanese_name\":\"コアルヒー\",\"english_name\":\"Ducklett\",\"height\":\"0.5\",\"weight\":\"5.5\",\"type\":[\"水\",\"飞行\"],\"ability\":[\"锐利目光\",\"健壮胸肌\"],\"隐藏特性\":[\"湿润之躯\"],\"进化\":\"舞天鹅\",\"进化等级\":35,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":1,\"电\":4,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"舞天鹅\":{\"chinese_name\":\"舞天鹅\",\"id\":581,\"japanese_name\":\"スワンナ\",\"english_name\":\"Swanna\",\"height\":\"1.3\",\"weight\":\"24.2\",\"type\":[\"水\",\"飞行\"],\"ability\":[\"锐利目光\",\"健壮胸肌\"],\"隐藏特性\":[\"湿润之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":1,\"电\":4,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"迷你冰\":{\"chinese_name\":\"迷你冰\",\"id\":582,\"japanese_name\":\"バニプッチ\",\"english_name\":\"Vanillite\",\"height\":\"0.4\",\"weight\":\"5.7\",\"type\":[\"冰\"],\"ability\":[\"冰冻之躯\",\"雪隐\"],\"隐藏特性\":[\"碎裂铠甲\"],\"进化\":\"多多冰\",\"进化等级\":35,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"多多冰\":{\"chinese_name\":\"多多冰\",\"id\":583,\"japanese_name\":\"バニリッチ\",\"english_name\":\"Vanillish\",\"height\":\"1.1\",\"weight\":\"41.0\",\"type\":[\"冰\"],\"ability\":[\"冰冻之躯\",\"雪隐\"],\"隐藏特性\":[\"碎裂铠甲\"],\"进化\":\"双倍多多冰\",\"进化等级\":47,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"双倍多多冰\":{\"chinese_name\":\"双倍多多冰\",\"id\":584,\"japanese_name\":\"バイバニラ\",\"english_name\":\"Vanilluxe\",\"height\":\"1.3\",\"weight\":\"57.5\",\"type\":[\"冰\"],\"ability\":[\"冰冻之躯\",\"降雪\"],\"隐藏特性\":[\"碎裂铠甲\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"四季鹿\":{\"chinese_name\":\"四季鹿\",\"id\":585,\"japanese_name\":\"シキジカ\",\"english_name\":\"Deerling\",\"height\":\"0.6\",\"weight\":\"19.5\",\"type\":[\"一般\",\"草\"],\"ability\":[\"叶绿素\",\"食草\"],\"隐藏特性\":[\"天恩\"],\"进化\":\"萌芽鹿\",\"进化等级\":34,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":0,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"萌芽鹿\":{\"chinese_name\":\"萌芽鹿\",\"id\":586,\"japanese_name\":\"メブキジカ\",\"english_name\":\"Sawsbuck\",\"height\":\"1.9\",\"weight\":\"92.5\",\"type\":[\"一般\",\"草\"],\"ability\":[\"叶绿素\",\"食草\"],\"隐藏特性\":[\"天恩\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":0,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"电飞鼠\":{\"chinese_name\":\"电飞鼠\",\"id\":587,\"japanese_name\":\"エモンガ\",\"english_name\":\"Emolga\",\"height\":\"0.4\",\"weight\":\"5.0\",\"type\":[\"电\",\"飞行\"],\"ability\":[\"静电\"],\"隐藏特性\":[\"电气引擎\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":0.5,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":0.5,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"盖盖虫\":{\"chinese_name\":\"盖盖虫\",\"id\":588,\"japanese_name\":\"カブルモ\",\"english_name\":\"Karrablast\",\"height\":\"0.5\",\"weight\":\"5.9\",\"type\":[\"虫\"],\"ability\":[\"虫之预感\",\"蜕皮\"],\"隐藏特性\":[\"无防守\"],\"进化\":\"骑士蜗牛\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"骑士蜗牛\":{\"chinese_name\":\"骑士蜗牛\",\"id\":589,\"japanese_name\":\"シュバルゴ\",\"english_name\":\"Escavalier\",\"height\":\"1.0\",\"weight\":\"33.0\",\"type\":[\"虫\",\"钢\"],\"ability\":[\"虫之预感\",\"硬壳盔甲\"],\"隐藏特性\":[\"防尘\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":1,\"毒\":0,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":4,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"步哨鼠\":{\"chinese_name\":\"步哨鼠\",\"id\":505,\"japanese_name\":\"ミルホッグ\",\"english_name\":\"Watchog\",\"height\":\"1.1\",\"weight\":\"27.0\",\"type\":[\"一般\"],\"ability\":[\"发光\",\"锐利目光\"],\"隐藏特性\":[\"分析\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"哎呀球菇\":{\"chinese_name\":\"哎呀球菇\",\"id\":590,\"japanese_name\":\"タマゲタケ\",\"english_name\":\"Foongus\",\"height\":\"0.2\",\"weight\":\"1.0\",\"type\":[\"草\",\"毒\"],\"ability\":[\"孢子\"],\"隐藏特性\":[\"再生力\"],\"进化\":\"败露球菇\",\"进化等级\":39,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"败露球菇\":{\"chinese_name\":\"败露球菇\",\"id\":591,\"japanese_name\":\"モロバレル\",\"english_name\":\"Amoonguss\",\"height\":\"0.6\",\"weight\":\"10.5\",\"type\":[\"草\",\"毒\"],\"ability\":[\"孢子\"],\"隐藏特性\":[\"再生力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"轻飘飘\":{\"chinese_name\":\"轻飘飘\",\"id\":592,\"japanese_name\":\"プルリル\",\"english_name\":\"Frillish\",\"height\":\"1.2\",\"weight\":\"33.0\",\"type\":[\"水\",\"幽灵\"],\"ability\":[\"储水\",\"诅咒之躯\"],\"隐藏特性\":[\"湿气\"],\"进化\":\"胖嘟嘟\",\"进化等级\":40,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":1}},\"胖嘟嘟\":{\"chinese_name\":\"胖嘟嘟\",\"id\":593,\"japanese_name\":\"ブルンゲル\",\"english_name\":\"Jellicent\",\"height\":\"2.2\",\"weight\":\"135.0\",\"type\":[\"水\",\"幽灵\"],\"ability\":[\"储水\",\"诅咒之躯\"],\"隐藏特性\":[\"湿气\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":0.5,\"火\":0.5,\"水\":0,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":1}},\"保姆曼波\":{\"chinese_name\":\"保姆曼波\",\"id\":594,\"japanese_name\":\"ママンボウ\",\"english_name\":\"Alomomola\",\"height\":\"1.2\",\"weight\":\"31.6\",\"type\":[\"水\"],\"ability\":[\"治愈之心\",\"湿润之躯\"],\"隐藏特性\":[\"再生力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"电电虫\":{\"chinese_name\":\"电电虫\",\"id\":595,\"japanese_name\":\"バチュル\",\"english_name\":\"Joltik\",\"height\":\"0.1\",\"weight\":\"0.6\",\"type\":[\"虫\",\"电\"],\"ability\":[\"复眼\",\"紧张感\"],\"隐藏特性\":[\"虫之预感\"],\"进化\":\"电蜘蛛\",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"电蜘蛛\":{\"chinese_name\":\"电蜘蛛\",\"id\":596,\"japanese_name\":\"デンチュラ\",\"english_name\":\"Galvantula\",\"height\":\"0.8\",\"weight\":\"14.3\",\"type\":[\"虫\",\"电\"],\"ability\":[\"复眼\",\"紧张感\"],\"隐藏特性\":[\"虫之预感\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"种子铁球\":{\"chinese_name\":\"种子铁球\",\"id\":597,\"japanese_name\":\"テッシード\",\"english_name\":\"Ferroseed\",\"height\":\"0.6\",\"weight\":\"18.8\",\"type\":[\"草\",\"钢\"],\"ability\":[\"铁刺\"],\"隐藏特性\":[\"铁刺\"],\"进化\":\"坚果哑铃\",\"进化等级\":40,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":1,\"毒\":0,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":4,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":0.5,\"冰\":1,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"坚果哑铃\":{\"chinese_name\":\"坚果哑铃\",\"id\":598,\"japanese_name\":\"ナットレイ\",\"english_name\":\"Ferrothorn\",\"height\":\"1.0\",\"weight\":\"110.0\",\"type\":[\"草\",\"钢\"],\"ability\":[\"铁刺\"],\"隐藏特性\":[\"危险预知\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":1,\"毒\":0,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":4,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":0.5,\"冰\":1,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"齿轮儿\":{\"chinese_name\":\"齿轮儿\",\"id\":599,\"japanese_name\":\"ギアル\",\"english_name\":\"Klink\",\"height\":\"0.3\",\"weight\":\"21.0\",\"type\":[\"钢\"],\"ability\":[\"正电\",\"负电\"],\"隐藏特性\":[\"恒净之躯\"],\"进化\":\"齿轮组\",\"进化等级\":38,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"齿轮组\":{\"chinese_name\":\"齿轮组\",\"id\":600,\"japanese_name\":\"ギギアル\",\"english_name\":\"Klang\",\"height\":\"0.6\",\"weight\":\"51.0\",\"type\":[\"钢\"],\"ability\":[\"正电\",\"负电\"],\"隐藏特性\":[\"恒净之躯\"],\"进化\":\"齿轮怪\",\"进化等级\":49,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"齿轮怪\":{\"chinese_name\":\"齿轮怪\",\"id\":601,\"japanese_name\":\"ギギギアル\",\"english_name\":\"Klinklang\",\"height\":\"0.6\",\"weight\":\"81.0\",\"type\":[\"钢\"],\"ability\":[\"正电\",\"负电\"],\"隐藏特性\":[\"恒净之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"麻麻小鱼\":{\"chinese_name\":\"麻麻小鱼\",\"id\":602,\"japanese_name\":\"シビシラス\",\"english_name\":\"Tynamo\",\"height\":\"0.2\",\"weight\":\"0.3\",\"type\":[\"电\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"麻麻鳗\",\"进化等级\":39,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":0,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"麻麻鳗\":{\"chinese_name\":\"麻麻鳗\",\"id\":603,\"japanese_name\":\"シビビール\",\"english_name\":\"Eelektrik\",\"height\":\"1.2\",\"weight\":\"22.0\",\"type\":[\"电\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"麻麻鳗鱼王\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":0,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"麻麻鳗鱼王\":{\"chinese_name\":\"麻麻鳗鱼王\",\"id\":604,\"japanese_name\":\"シビルドン\",\"english_name\":\"Eelektross\",\"height\":\"2.1\",\"weight\":\"80.5\",\"type\":[\"电\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":0,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"小灰怪\":{\"chinese_name\":\"小灰怪\",\"id\":605,\"japanese_name\":\"リグレー\",\"english_name\":\"Elgyem\",\"height\":\"0.5\",\"weight\":\"9.0\",\"type\":[\"超能力\"],\"ability\":[\"心灵感应\",\"同步\"],\"隐藏特性\":[\"分析\"],\"进化\":\"大宇怪\",\"进化等级\":42,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"大宇怪\":{\"chinese_name\":\"大宇怪\",\"id\":606,\"japanese_name\":\"オーベム\",\"english_name\":\"Beheeyem\",\"height\":\"1.0\",\"weight\":\"34.5\",\"type\":[\"超能力\"],\"ability\":[\"心灵感应\",\"同步\"],\"隐藏特性\":[\"分析\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"烛光灵\":{\"chinese_name\":\"烛光灵\",\"id\":607,\"japanese_name\":\"ヒトモシ\",\"english_name\":\"Litwick\",\"height\":\"0.3\",\"weight\":\"3.1\",\"type\":[\"幽灵\",\"火\"],\"ability\":[\"引火\",\"火焰之躯\"],\"隐藏特性\":[\"<!--踩影-->穿透\"],\"进化\":\"灯火幽灵\",\"进化等级\":41,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":2,\"虫\":0.25,\"幽灵\":2,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":0.5}},\"灯火幽灵\":{\"chinese_name\":\"灯火幽灵\",\"id\":608,\"japanese_name\":\"ランプラー\",\"english_name\":\"Lampent\",\"height\":\"0.6\",\"weight\":\"13.0\",\"type\":[\"幽灵\",\"火\"],\"ability\":[\"引火\",\"火焰之躯\"],\"隐藏特性\":[\"<!--踩影-->穿透\"],\"进化\":\"水晶灯火灵\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":2,\"虫\":0.25,\"幽灵\":2,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":0.5}},\"水晶灯火灵\":{\"chinese_name\":\"水晶灯火灵\",\"id\":609,\"japanese_name\":\"シャンデラ\",\"english_name\":\"Chandelure\",\"height\":\"1.0\",\"weight\":\"34.3\",\"type\":[\"幽灵\",\"火\"],\"ability\":[\"引火\",\"火焰之躯\"],\"隐藏特性\":[\"<!--踩影-->穿透\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":2,\"虫\":0.25,\"幽灵\":2,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":0.5}},\"牙牙\":{\"chinese_name\":\"牙牙\",\"id\":610,\"japanese_name\":\"キバゴ\",\"english_name\":\"Axew\",\"height\":\"0.6\",\"weight\":\"18.0\",\"type\":[\"龙\"],\"ability\":[\"斗争心\",\"破格\"],\"隐藏特性\":[\"紧张感\"],\"进化\":\"斧牙龙\",\"进化等级\":38,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"斧牙龙\":{\"chinese_name\":\"斧牙龙\",\"id\":611,\"japanese_name\":\"オノンド\",\"english_name\":\"Fraxure\",\"height\":\"1.0\",\"weight\":\"36.0\",\"type\":[\"龙\"],\"ability\":[\"斗争心\",\"破格\"],\"隐藏特性\":[\"紧张感\"],\"进化\":\"双斧战龙\",\"进化等级\":48,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"双斧战龙\":{\"chinese_name\":\"双斧战龙\",\"id\":612,\"japanese_name\":\"オノノクス\",\"english_name\":\"Haxorus\",\"height\":\"1.8\",\"weight\":\"105.5\",\"type\":[\"龙\"],\"ability\":[\"斗争心\",\"破格\"],\"隐藏特性\":[\"紧张感\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"喷嚏熊\":{\"chinese_name\":\"喷嚏熊\",\"id\":613,\"japanese_name\":\"クマシュン\",\"english_name\":\"Cubchoo\",\"height\":\"0.5\",\"weight\":\"8.5\",\"type\":[\"冰\"],\"ability\":[\"雪隐\",\"拨雪\"],\"隐藏特性\":[\"胆怯\"],\"进化\":\"冻原熊\",\"进化等级\":37,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"冻原熊\":{\"chinese_name\":\"冻原熊\",\"id\":614,\"japanese_name\":\"ツンベアー\",\"english_name\":\"Beartic\",\"height\":\"2.6\",\"weight\":\"260.0\",\"type\":[\"冰\"],\"ability\":[\"雪隐\",\"拨雪\"],\"隐藏特性\":[\"悠游自如\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"几何雪花\":{\"chinese_name\":\"几何雪花\",\"id\":615,\"japanese_name\":\"フリージオ\",\"english_name\":\"Cryogonal\",\"height\":\"1.1\",\"weight\":\"148.0\",\"type\":[\"冰\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"小嘴蜗\":{\"chinese_name\":\"小嘴蜗\",\"id\":616,\"japanese_name\":\"チョボマキ\",\"english_name\":\"Shelmet\",\"height\":\"0.4\",\"weight\":\"7.7\",\"type\":[\"虫\"],\"ability\":[\"湿润之躯\",\"硬壳盔甲\"],\"隐藏特性\":[\"防尘\"],\"进化\":\"敏捷虫\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"敏捷虫\":{\"chinese_name\":\"敏捷虫\",\"id\":617,\"japanese_name\":\"アギルダー\",\"english_name\":\"Accelgor\",\"height\":\"0.8\",\"weight\":\"25.3\",\"type\":[\"虫\"],\"ability\":[\"湿润之躯\",\"黏着\"],\"隐藏特性\":[\"轻装\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"泥巴鱼\":{\"chinese_name\":\"泥巴鱼\",\"id\":618,\"japanese_name\":\"マッギョ\",\"english_name\":\"Stunfisk\",\"height\":\"0.7\",\"weight\":\"11.0\",\"type\":[\"地面\",\"电\",\"钢\"],\"ability\":[\"静电\",\"柔软\",\"拟态\"],\"隐藏特性\":[\"沙隐\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"功夫鼬\":{\"chinese_name\":\"功夫鼬\",\"id\":619,\"japanese_name\":\"コジョフー\",\"english_name\":\"Mienfoo\",\"height\":\"0.9\",\"weight\":\"20.0\",\"type\":[\"格斗\"],\"ability\":[\"精神力\",\"再生力\"],\"隐藏特性\":[\"舍身\"],\"进化\":\"师父鼬\",\"进化等级\":50,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"师父鼬\":{\"chinese_name\":\"师父鼬\",\"id\":620,\"japanese_name\":\"コジョンド\",\"english_name\":\"Mienshao\",\"height\":\"1.4\",\"weight\":\"35.5\",\"type\":[\"格斗\"],\"ability\":[\"精神力\",\"再生力\"],\"隐藏特性\":[\"舍身\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"赤面龙\":{\"chinese_name\":\"赤面龙\",\"id\":621,\"japanese_name\":\"クリムガン\",\"english_name\":\"Druddigon\",\"height\":\"1.6\",\"weight\":\"139.0\",\"type\":[\"龙\"],\"ability\":[\"粗糙皮肤\",\"强行\"],\"隐藏特性\":[\"破格\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"泥偶小人\":{\"chinese_name\":\"泥偶小人\",\"id\":622,\"japanese_name\":\"ゴビット\",\"english_name\":\"Golett\",\"height\":\"1.0\",\"weight\":\"92.0\",\"type\":[\"地面\",\"幽灵\"],\"ability\":[\"铁拳\",\"笨拙\"],\"隐藏特性\":[\"无防守\"],\"进化\":\"泥偶巨人\",\"进化等级\":43,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.25,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"泥偶巨人\":{\"chinese_name\":\"泥偶巨人\",\"id\":623,\"japanese_name\":\"ゴルーグ\",\"english_name\":\"Golurk\",\"height\":\"2.8\",\"weight\":\"330.0\",\"type\":[\"地面\",\"幽灵\"],\"ability\":[\"铁拳\",\"笨拙\"],\"隐藏特性\":[\"无防守\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.25,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"驹刀小兵\":{\"chinese_name\":\"驹刀小兵\",\"id\":624,\"japanese_name\":\"コマタナ\",\"english_name\":\"Pawniard\",\"height\":\"0.5\",\"weight\":\"10.2\",\"type\":[\"恶\",\"钢\"],\"ability\":[\"不服输\",\"精神力\"],\"隐藏特性\":[\"压迫感\"],\"进化\":\"劈斩司令\",\"进化等级\":52,\"属性相性\":{\"一般\":0.5,\"格斗\":4,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":0.5,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0,\"冰\":0.5,\"龙\":0.5,\"恶\":0.5,\"妖精\":1}},\"劈斩司令\":{\"chinese_name\":\"劈斩司令\",\"id\":625,\"japanese_name\":\"キリキザン\",\"english_name\":\"Bisharp\",\"height\":\"1.6\",\"weight\":\"70.0\",\"type\":[\"恶\",\"钢\"],\"ability\":[\"不服输\",\"精神力\"],\"隐藏特性\":[\"压迫感\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":4,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":0.5,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0,\"冰\":0.5,\"龙\":0.5,\"恶\":0.5,\"妖精\":1}},\"爆炸头水牛\":{\"chinese_name\":\"爆炸头水牛\",\"id\":626,\"japanese_name\":\"バッフロン\",\"english_name\":\"Bouffalant\",\"height\":\"1.6\",\"weight\":\"94.6\",\"type\":[\"一般\"],\"ability\":[\"舍身\",\"食草\"],\"隐藏特性\":[\"隔音\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"毛头小鹰\":{\"chinese_name\":\"毛头小鹰\",\"id\":627,\"japanese_name\":\"ワシボン\",\"english_name\":\"Rufflet\",\"height\":\"0.5\",\"weight\":\"10.5\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"锐利目光\",\"强行\"],\"隐藏特性\":[\"活力\"],\"进化\":\"勇士雄鹰\",\"进化等级\":54,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"勇士雄鹰\":{\"chinese_name\":\"勇士雄鹰\",\"id\":628,\"japanese_name\":\"ウォーグル\",\"english_name\":\"Braviary\",\"height\":\"1.5\",\"weight\":\"41.0\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"锐利目光\",\"强行\"],\"隐藏特性\":[\"不服输\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"秃鹰丫头\":{\"chinese_name\":\"秃鹰丫头\",\"id\":629,\"japanese_name\":\"バルチャイ\",\"english_name\":\"Vullaby\",\"height\":\"0.5\",\"weight\":\"9.0\",\"type\":[\"恶\",\"飞行\"],\"ability\":[\"健壮胸肌\",\"防尘\"],\"隐藏特性\":[\"碎裂铠甲\"],\"进化\":\"秃鹰娜\",\"进化等级\":54,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":0,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"秃鹰娜\":{\"chinese_name\":\"秃鹰娜\",\"id\":630,\"japanese_name\":\"バルジーナ\",\"english_name\":\"Mandibuzz\",\"height\":\"1.2\",\"weight\":\"39.5\",\"type\":[\"恶\",\"飞行\"],\"ability\":[\"健壮胸肌\",\"防尘\"],\"隐藏特性\":[\"碎裂铠甲\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":0,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"熔蚁兽\":{\"chinese_name\":\"熔蚁兽\",\"id\":631,\"japanese_name\":\"クイタラン\",\"english_name\":\"Heatmor\",\"height\":\"1.4\",\"weight\":\"58.0\",\"type\":[\"火\"],\"ability\":[\"贪吃鬼\",\"引火\"],\"隐藏特性\":[\"白色烟雾\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"铁蚁\":{\"chinese_name\":\"铁蚁\",\"id\":632,\"japanese_name\":\"アイアント\",\"english_name\":\"Durant\",\"height\":\"0.3\",\"weight\":\"33.0\",\"type\":[\"虫\",\"钢\"],\"ability\":[\"虫之预感\",\"活力\"],\"隐藏特性\":[\"懒惰\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":1,\"毒\":0,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":4,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"单首龙\":{\"chinese_name\":\"单首龙\",\"id\":633,\"japanese_name\":\"モノズ\",\"english_name\":\"Deino\",\"height\":\"0.8\",\"weight\":\"17.3\",\"type\":[\"恶\",\"龙\"],\"ability\":[\"活力\"],\"隐藏特性\":[],\"进化\":\"双首暴龙\",\"进化等级\":50,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":0,\"冰\":2,\"龙\":2,\"恶\":0.5,\"妖精\":4}},\"双首暴龙\":{\"chinese_name\":\"双首暴龙\",\"id\":634,\"japanese_name\":\"ジヘッド\",\"english_name\":\"Zweilous\",\"height\":\"1.4\",\"weight\":\"50.0\",\"type\":[\"恶\",\"龙\"],\"ability\":[\"活力\"],\"隐藏特性\":[],\"进化\":\"三首恶龙\",\"进化等级\":64,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":0,\"冰\":2,\"龙\":2,\"恶\":0.5,\"妖精\":4}},\"三首恶龙\":{\"chinese_name\":\"三首恶龙\",\"id\":635,\"japanese_name\":\"サザンドラ\",\"english_name\":\"Hydreigon\",\"height\":\"1.8\",\"weight\":\"160.0\",\"type\":[\"恶\",\"龙\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":0,\"冰\":2,\"龙\":2,\"恶\":0.5,\"妖精\":4}},\"燃烧虫\":{\"chinese_name\":\"燃烧虫\",\"id\":636,\"japanese_name\":\"メラルバ\",\"english_name\":\"Larvesta\",\"height\":\"1.1\",\"weight\":\"28.8\",\"type\":[\"虫\",\"火\"],\"ability\":[\"火焰之躯\"],\"隐藏特性\":[\"虫之预感\"],\"进化\":\"火神蛾\",\"进化等级\":59,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":2,\"草\":0.25,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"火神蛾\":{\"chinese_name\":\"火神蛾\",\"id\":637,\"japanese_name\":\"ウルガモス\",\"english_name\":\"Volcarona\",\"height\":\"1.6\",\"weight\":\"46.0\",\"type\":[\"虫\",\"火\"],\"ability\":[\"火焰之躯\"],\"隐藏特性\":[\"虫之预感\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":2,\"草\":0.25,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"勾帕路翁\":{\"chinese_name\":\"勾帕路翁\",\"id\":638,\"japanese_name\":\"コバルオン\",\"english_name\":\"Cobalion\",\"height\":\"2.1\",\"weight\":\"250.0\",\"type\":[\"钢\",\"格斗\"],\"ability\":[\"正义之心\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":1,\"毒\":0,\"地面\":2,\"岩石\":0.25,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":0.5,\"恶\":0.5,\"妖精\":1}},\"代拉基翁\":{\"chinese_name\":\"代拉基翁\",\"id\":639,\"japanese_name\":\"テラキオン\",\"english_name\":\"Terrakion\",\"height\":\"1.9\",\"weight\":\"260.0\",\"type\":[\"岩石\",\"格斗\"],\"ability\":[\"正义之心\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"毕力吉翁\":{\"chinese_name\":\"毕力吉翁\",\"id\":640,\"japanese_name\":\"ビリジオン\",\"english_name\":\"Virizion\",\"height\":\"2.0\",\"weight\":\"200.0\",\"type\":[\"草\",\"格斗\"],\"ability\":[\"正义之心\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":4,\"毒\":2,\"地面\":0.5,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"龙卷云\":{\"chinese_name\":\"龙卷云\",\"id\":641,\"japanese_name\":\"トルネロス\",\"english_name\":\"Tornadus\",\"height\":\"=1\",\"weight\":\"63.0\",\"type\":[\"飞行\"],\"ability\":[\"恶作剧之心\",\"再生力\"],\"隐藏特性\":[\"不服输\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"雷电云\":{\"chinese_name\":\"雷电云\",\"id\":642,\"japanese_name\":\"ボルトロス\",\"english_name\":\"Thundurus\",\"height\":\"=1\",\"weight\":\"65.0\",\"type\":[\"电\",\"飞行\"],\"ability\":[\"恶作剧之心\",\"蓄电\"],\"隐藏特性\":[\"不服输\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":0.5,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":0.5,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"莱希拉姆\":{\"chinese_name\":\"莱希拉姆\",\"id\":643,\"japanese_name\":\"レシラム\",\"english_name\":\"Reshiram\",\"height\":\"3.2\",\"weight\":\"330.0\",\"type\":[\"龙\",\"火\"],\"ability\":[\"涡轮火焰\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.25,\"水\":1,\"草\":0.25,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":2,\"恶\":1,\"妖精\":1}},\"捷克罗姆\":{\"chinese_name\":\"捷克罗姆\",\"id\":644,\"japanese_name\":\"ゼクロム\",\"english_name\":\"Zekrom\",\"height\":\"2.9\",\"weight\":\"345.0\",\"type\":[\"龙\",\"电\"],\"ability\":[\"兆级电压\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.25,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"土地云\":{\"chinese_name\":\"土地云\",\"id\":645,\"japanese_name\":\"ランドロス\",\"english_name\":\"Landorus\",\"height\":\"=1\",\"weight\":\"68.0\",\"type\":[\"地面\",\"飞行\"],\"ability\":[\"沙之力\",\"威吓\"],\"隐藏特性\":[\"强行\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":0,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":4,\"龙\":1,\"恶\":1,\"妖精\":1}},\"酋雷姆\":{\"chinese_name\":\"酋雷姆\",\"id\":646,\"japanese_name\":\"キュレム\",\"english_name\":\"Kyurem\",\"height\":\"=1\",\"weight\":\"=1\",\"type\":[\"龙\",\"冰\"],\"ability\":[\"压迫感\",\"兆级电压\",\"涡轮火焰\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":2,\"恶\":1,\"妖精\":2}},\"凯路迪欧\":{\"chinese_name\":\"凯路迪欧\",\"id\":647,\"japanese_name\":\"ケルディオ\",\"english_name\":\"Keldeo\",\"height\":\"1.4\",\"weight\":\"48.5\",\"type\":[\"水\",\"格斗\"],\"ability\":[\"正义之心\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"美洛耶塔\":{\"chinese_name\":\"美洛耶塔\",\"id\":648,\"japanese_name\":\"メロエッタ\",\"english_name\":\"Meloetta\",\"height\":\"0.6\",\"weight\":\"6.5\",\"type\":[\"一般\",\"超能力\",\"格斗\"],\"ability\":[\"天恩\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"盖诺赛克特\":{\"chinese_name\":\"盖诺赛克特\",\"id\":649,\"japanese_name\":\"ゲノセクト\",\"english_name\":\"Genesect\",\"height\":\"1.5\",\"weight\":\"82.5\",\"type\":[\"虫\",\"钢\"],\"ability\":[\"下载\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":1,\"毒\":0,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":4,\"水\":1,\"草\":0.25,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"哈力栗\":{\"chinese_name\":\"哈力栗\",\"id\":650,\"japanese_name\":\"ハリマロン\",\"english_name\":\"Chespin\",\"height\":\"0.4\",\"weight\":\"9.0\",\"type\":[\"草\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"防弹\"],\"进化\":\"胖胖哈力\",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"胖胖哈力\":{\"chinese_name\":\"胖胖哈力\",\"id\":651,\"japanese_name\":\"ハリボーグ\",\"english_name\":\"Quilladin\",\"height\":\"0.7\",\"weight\":\"29.0\",\"type\":[\"草\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"防弹\"],\"进化\":\"布里卡隆 \",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"布里卡隆\":{\"chinese_name\":\"布里卡隆\",\"id\":652,\"japanese_name\":\"ブリガロン\",\"english_name\":\"Chesnaught\",\"height\":\"1.6\",\"weight\":\"90.0\",\"type\":[\"草\",\"格斗\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"防弹\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":4,\"毒\":2,\"地面\":0.5,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"火狐狸\":{\"chinese_name\":\"火狐狸\",\"id\":653,\"japanese_name\":\"フォッコ\",\"english_name\":\"Fennekin\",\"height\":\"0.4\",\"weight\":\"9.4\",\"type\":[\"火\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"魔术师\"],\"进化\":\"长尾火狐\",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"长尾火狐\":{\"chinese_name\":\"长尾火狐\",\"id\":654,\"japanese_name\":\"テールナー\",\"english_name\":\"Braixen\",\"height\":\"1.0\",\"weight\":\"14.5\",\"type\":[\"火\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"魔术师\"],\"进化\":\"妖火红狐\",\"进化等级\":36,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"妖火红狐\":{\"chinese_name\":\"妖火红狐\",\"id\":655,\"japanese_name\":\"マフォクシー\",\"english_name\":\"Delphox\",\"height\":\"1.5\",\"weight\":\"39.0\",\"type\":[\"火\",\"超能力\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"魔术师\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":1,\"幽灵\":2,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":0.5}},\"呱呱泡蛙\":{\"chinese_name\":\"呱呱泡蛙\",\"id\":656,\"japanese_name\":\"ケロマツ\",\"english_name\":\"Froakie\",\"height\":\"0.3\",\"weight\":\"7.0\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"变幻自如\"],\"进化\":\"呱头蛙\",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"呱头蛙\":{\"chinese_name\":\"呱头蛙\",\"id\":657,\"japanese_name\":\"ゲコガシラ\",\"english_name\":\"Frogadier\",\"height\":\"0.6\",\"weight\":\"10.9\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"变幻自如\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"甲贺忍蛙\":{\"chinese_name\":\"甲贺忍蛙\",\"id\":658,\"japanese_name\":\"ゲッコウガ\",\"english_name\":\"Greninja\",\"height\":\"1.5\",\"weight\":\"40.0\",\"type\":[\"水\",\"恶\"],\"ability\":[\"激流\",\"\",\"牵绊变身\"],\"隐藏特性\":[\"变幻自如\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":0,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"掘掘兔\":{\"chinese_name\":\"掘掘兔\",\"id\":659,\"japanese_name\":\"ホルビー\",\"english_name\":\"Bunnelby\",\"height\":\"0.4\",\"weight\":\"5.0\",\"type\":[\"一般\"],\"ability\":[\"捡拾\",\"颊囊\"],\"隐藏特性\":[\"大力士\"],\"进化\":\"掘地兔\",\"进化等级\":20,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"掘地兔\":{\"chinese_name\":\"掘地兔\",\"id\":660,\"japanese_name\":\"ホルード\",\"english_name\":\"Diggersby\",\"height\":\"1.0\",\"weight\":\"42.4\",\"type\":[\"一般\",\"地面\"],\"ability\":[\"捡拾\",\"颊囊\"],\"隐藏特性\":[\"大力士\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"小箭雀\":{\"chinese_name\":\"小箭雀\",\"id\":661,\"japanese_name\":\"ヤヤコマ\",\"english_name\":\"Fletchling\",\"height\":\"0.3\",\"weight\":\"1.7\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"健壮胸肌\"],\"隐藏特性\":[\"疾风之翼\"],\"进化\":\"火箭雀\",\"进化等级\":17,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"火箭雀\":{\"chinese_name\":\"火箭雀\",\"id\":662,\"japanese_name\":\"ヒノヤコマ\",\"english_name\":\"Fletchinder\",\"height\":\"0.7\",\"weight\":\"16.0\",\"type\":[\"火\",\"飞行\"],\"ability\":[\"火焰之躯\"],\"隐藏特性\":[\"疾风之翼\"],\"进化\":\"烈箭鹰\",\"进化等级\":35,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"烈箭鹰\":{\"chinese_name\":\"烈箭鹰\",\"id\":663,\"japanese_name\":\"ファイアロー\",\"english_name\":\"Talonflame\",\"height\":\"1.2\",\"weight\":\"24.5\",\"type\":[\"火\",\"飞行\"],\"ability\":[\"火焰之躯\"],\"隐藏特性\":[\"疾风之翼\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"粉蝶虫\":{\"chinese_name\":\"粉蝶虫\",\"id\":664,\"japanese_name\":\"コフキムシ\",\"english_name\":\"Scatterbug\",\"height\":\"0.3\",\"weight\":\"2.5\",\"type\":[\"虫\"],\"ability\":[\"鳞粉\",\"复眼\"],\"隐藏特性\":[\"友情防守\"],\"进化\":\"粉蝶蛹\",\"进化等级\":9,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"粉蝶蛹\":{\"chinese_name\":\"粉蝶蛹\",\"id\":665,\"japanese_name\":\"コフーライ\",\"english_name\":\"Spewpa\",\"height\":\"0.3\",\"weight\":\"8.4\",\"type\":[\"虫\"],\"ability\":[\"蜕皮\"],\"隐藏特性\":[\"友情防守\"],\"进化\":\"彩粉蝶\",\"进化等级\":12,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"彩粉蝶\":{\"chinese_name\":\"彩粉蝶\",\"id\":666,\"japanese_name\":\"ビビヨン\",\"english_name\":\"Vivillon\",\"height\":\"1.2\",\"weight\":\"17.0\",\"type\":[\"虫\",\"飞行\"],\"ability\":[\"鳞粉\",\"复眼\"],\"隐藏特性\":[\"友情防守\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"小狮狮\":{\"chinese_name\":\"小狮狮\",\"id\":667,\"japanese_name\":\"シシコ\",\"english_name\":\"Litleo\",\"height\":\"0.6\",\"weight\":\"13.5\",\"type\":[\"火\",\"一般\"],\"ability\":[\"斗争心\",\"紧张感\"],\"隐藏特性\":[\"自信过度\"],\"进化\":\"火炎狮\",\"进化等级\":35,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"火炎狮\":{\"chinese_name\":\"火炎狮\",\"id\":668,\"japanese_name\":\"カエンジシ \",\"english_name\":\"Pyroar\",\"height\":\"1.5\",\"weight\":\"81.5\",\"type\":[\"火\",\"一般\"],\"ability\":[\"斗争心\",\"紧张感\"],\"隐藏特性\":[\"自信过度\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"花蓓蓓\":{\"chinese_name\":\"花蓓蓓\",\"id\":669,\"japanese_name\":\"フラベベ\",\"english_name\":\"Flabébé\",\"height\":\"0.1\",\"weight\":\"0.1\",\"type\":[\"妖精\"],\"ability\":[\"花幕 \"],\"隐藏特性\":[\"共生\"],\"进化\":\"花叶蒂\",\"进化等级\":19,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"花叶蒂\":{\"chinese_name\":\"花叶蒂\",\"id\":670,\"japanese_name\":\"フラエッテ\",\"english_name\":\"Floette\",\"height\":\"0.2\",\"weight\":\"0.9\",\"type\":[\"妖精\"],\"ability\":[\"花幕\",\"花幕 \"],\"隐藏特性\":[\"共生\"],\"进化\":\"花洁夫人\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"花洁夫人\":{\"chinese_name\":\"花洁夫人\",\"id\":671,\"japanese_name\":\"フラージェス\",\"english_name\":\"Florges\",\"height\":\"1.1\",\"weight\":\"10.0\",\"type\":[\"妖精\"],\"ability\":[\"花幕\",\"花幕 \"],\"隐藏特性\":[\"共生\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"坐骑小羊\":{\"chinese_name\":\"坐骑小羊\",\"id\":672,\"japanese_name\":\"メェークル\",\"english_name\":\"Skiddo\",\"height\":\"0.9\",\"weight\":\"31.0\",\"type\":[\"草\"],\"ability\":[\"食草\"],\"隐藏特性\":[\"草之毛皮\"],\"进化\":\"坐骑山羊\",\"进化等级\":32,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"坐骑山羊\":{\"chinese_name\":\"坐骑山羊\",\"id\":673,\"japanese_name\":\"ゴーゴート\",\"english_name\":\"Gogoat\",\"height\":\"1.7\",\"weight\":\"91.0\",\"type\":[\"草\"],\"ability\":[\"食草\"],\"隐藏特性\":[\"草之毛皮\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"顽皮熊猫\":{\"chinese_name\":\"顽皮熊猫\",\"id\":674,\"japanese_name\":\"ヤンチャム\",\"english_name\":\"Pancham\",\"height\":\"0.6\",\"weight\":\"8.0\",\"type\":[\"格斗\"],\"ability\":[\"铁拳\",\"破格\"],\"隐藏特性\":[\"胆量\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"流氓熊猫\":{\"chinese_name\":\"流氓熊猫\",\"id\":675,\"japanese_name\":\"ゴロンダ\",\"english_name\":\"Pangoro\",\"height\":\"2.1\",\"weight\":\"136.0\",\"type\":[\"格斗\",\"恶\"],\"ability\":[\"铁拳\",\"破格\"],\"隐藏特性\":[\"胆量\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.25,\"妖精\":4}},\"多丽米亚\":{\"chinese_name\":\"多丽米亚\",\"id\":676,\"japanese_name\":\"トリミアン\",\"english_name\":\"Furfrou\",\"height\":\"1.2\",\"weight\":\"28.0\",\"type\":[\"一般\"],\"ability\":[\"毛皮大衣\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"妙喵\":{\"chinese_name\":\"妙喵\",\"id\":677,\"japanese_name\":\"ニャスパー\",\"english_name\":\"Espurr\",\"height\":\"0.3\",\"weight\":\"3.5\",\"type\":[\"超能力\"],\"ability\":[\"锐利目光\",\"穿透\"],\"隐藏特性\":[\"我行我素\"],\"进化\":\"超能妙喵\",\"进化等级\":25,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"超能妙喵\":{\"chinese_name\":\"超能妙喵\",\"id\":678,\"japanese_name\":\"ニャオニクス\",\"english_name\":\"Meowstic\",\"height\":\"0.6\",\"weight\":\"8.5\",\"type\":[\"超能力\"],\"ability\":[\"锐利目光\",\"穿透\"],\"隐藏特性\":[\"恶作剧之心\",\"好胜\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"独剑鞘\":{\"chinese_name\":\"独剑鞘\",\"id\":679,\"japanese_name\":\"ヒトツキ\",\"english_name\":\"Honedge\",\"height\":\"0.8\",\"weight\":\"2.0\",\"type\":[\"钢\",\"幽灵\"],\"ability\":[\"无防守\"],\"隐藏特性\":[],\"进化\":\"双剑鞘\",\"进化等级\":35,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.25,\"幽灵\":2,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":2,\"妖精\":0.5}},\"双剑鞘\":{\"chinese_name\":\"双剑鞘\",\"id\":680,\"japanese_name\":\"ニダンギル\",\"english_name\":\"Doublade\",\"height\":\"0.8\",\"weight\":\"4.5\",\"type\":[\"钢\",\"幽灵\"],\"ability\":[\"无防守\"],\"隐藏特性\":[],\"进化\":\"坚盾剑怪\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.25,\"幽灵\":2,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":2,\"妖精\":0.5}},\"坚盾剑怪\":{\"chinese_name\":\"坚盾剑怪\",\"id\":681,\"japanese_name\":\"ギルガルド\",\"english_name\":\"Aegislash\",\"height\":\"1.7\",\"weight\":\"53.0\",\"type\":[\"钢\",\"幽灵\"],\"ability\":[\"战斗切换\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.25,\"幽灵\":2,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":2,\"妖精\":0.5}},\"粉香香\":{\"chinese_name\":\"粉香香\",\"id\":682,\"japanese_name\":\"シュシュプ\",\"english_name\":\"Spritzee\",\"height\":\"0.2\",\"weight\":\"0.5\",\"type\":[\"妖精\"],\"ability\":[\"治愈之心\"],\"隐藏特性\":[\"芳香幕\"],\"进化\":\"芳香精\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"芳香精\":{\"chinese_name\":\"芳香精\",\"id\":683,\"japanese_name\":\"フレフワン\",\"english_name\":\"Aromatisse\",\"height\":\"0.8\",\"weight\":\"15.5\",\"type\":[\"妖精\"],\"ability\":[\"治愈之心\"],\"隐藏特性\":[\"芳香幕\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"绵绵泡芙\":{\"chinese_name\":\"绵绵泡芙\",\"id\":684,\"japanese_name\":\"ペロッパフ\",\"english_name\":\"Swirlix\",\"height\":\"0.4\",\"weight\":\"3.5\",\"type\":[\"妖精\"],\"ability\":[\"甜幕\"],\"隐藏特性\":[\"轻装\"],\"进化\":\"胖甜妮\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"胖甜妮\":{\"chinese_name\":\"胖甜妮\",\"id\":685,\"japanese_name\":\"ペロリーム\",\"english_name\":\"Slurpuff\",\"height\":\"0.8\",\"weight\":\"5.0\",\"type\":[\"妖精\"],\"ability\":[\"甜幕\"],\"隐藏特性\":[\"轻装\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"好啦鱿\":{\"chinese_name\":\"好啦鱿\",\"id\":686,\"japanese_name\":\"マーイーカ\",\"english_name\":\"Inkay\",\"height\":\"0.4\",\"weight\":\"3.5\",\"type\":[\"恶\",\"超能力\"],\"ability\":[\"唱反调\",\"吸盘\"],\"隐藏特性\":[\"穿透 \"],\"进化\":\"乌贼王\",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":4,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":2}},\"乌贼王\":{\"chinese_name\":\"乌贼王\",\"id\":687,\"japanese_name\":\"カラマネロ\",\"english_name\":\"Malamar\",\"height\":\"1.5\",\"weight\":\"47.0\",\"type\":[\"恶\",\"超能力\"],\"ability\":[\"唱反调\",\"吸盘\"],\"隐藏特性\":[\"穿透\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":4,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":2}},\"龟脚脚\":{\"chinese_name\":\"龟脚脚\",\"id\":688,\"japanese_name\":\"カメテテ\",\"english_name\":\"Binacle\",\"height\":\"0.5\",\"weight\":\"31.0\",\"type\":[\"岩石\",\"水\"],\"ability\":[\"硬爪\",\"狙击手\"],\"隐藏特性\":[\"顺手牵羊\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.25,\"水\":1,\"草\":4,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"龟足巨铠\":{\"chinese_name\":\"龟足巨铠\",\"id\":689,\"japanese_name\":\"ガメノデス\",\"english_name\":\"Barbaracle\",\"height\":\"1.3\",\"weight\":\"96.0\",\"type\":[\"岩石\",\"水\"],\"ability\":[\"硬爪\",\"狙击手\"],\"隐藏特性\":[\"顺手牵羊\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.25,\"水\":1,\"草\":4,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"垃垃藻\":{\"chinese_name\":\"垃垃藻\",\"id\":690,\"japanese_name\":\"クズモー\",\"english_name\":\"Skrelp\",\"height\":\"0.5\",\"weight\":\"7.3\",\"type\":[\"毒\",\"水\"],\"ability\":[\"毒刺\",\"毒手\"],\"隐藏特性\":[\"适应力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":1,\"电\":2,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"毒藻龙\":{\"chinese_name\":\"毒藻龙\",\"id\":691,\"japanese_name\":\"ドラミドロ\",\"english_name\":\"Dragalge\",\"height\":\"1.8\",\"weight\":\"81.5\",\"type\":[\"毒\",\"龙\"],\"ability\":[\"毒刺\",\"毒手\"],\"隐藏特性\":[\"适应力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":1}},\"铁臂枪虾\":{\"chinese_name\":\"铁臂枪虾\",\"id\":692,\"japanese_name\":\"ウデッポウ\",\"english_name\":\"Clauncher\",\"height\":\"0.5\",\"weight\":\"8.3\",\"type\":[\"水\"],\"ability\":[\"超级发射器\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"钢炮臂虾\":{\"chinese_name\":\"钢炮臂虾\",\"id\":693,\"japanese_name\":\"ブロスター\",\"english_name\":\"Clawitzer\",\"height\":\"1.3\",\"weight\":\"35.3\",\"type\":[\"水\"],\"ability\":[\"超级发射器\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"伞电蜥\":{\"chinese_name\":\"伞电蜥\",\"id\":694,\"japanese_name\":\"エリキテル\",\"english_name\":\"Helioptile\",\"height\":\"0.5\",\"weight\":\"6.0\",\"type\":[\"电\",\"一般\"],\"ability\":[\"干燥皮肤\",\"沙隐\"],\"隐藏特性\":[\"太阳之力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":0.5,\"火\":1.25,\"水\":0,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"光电伞蜥\":{\"chinese_name\":\"光电伞蜥\",\"id\":695,\"japanese_name\":\"エレザード\",\"english_name\":\"Heliolisk\",\"height\":\"1.0\",\"weight\":\"21.0\",\"type\":[\"电\",\"一般\"],\"ability\":[\"干燥皮肤\",\"沙隐\"],\"隐藏特性\":[\"太阳之力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":0.5,\"火\":1.25,\"水\":0,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"宝宝暴龙\":{\"chinese_name\":\"宝宝暴龙\",\"id\":696,\"japanese_name\":\"チゴラス\",\"english_name\":\"Tyrunt\",\"height\":\"0.8\",\"weight\":\"26.0\",\"type\":[\"岩石\",\"龙\"],\"ability\":[\"强壮之颚\"],\"隐藏特性\":[\"结实\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.25,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"怪颚龙\":{\"chinese_name\":\"怪颚龙\",\"id\":697,\"japanese_name\":\"ガチゴラス\",\"english_name\":\"Tyrantrum\",\"height\":\"2.5\",\"weight\":\"270.0\",\"type\":[\"岩石\",\"龙\"],\"ability\":[\"强壮之颚\"],\"隐藏特性\":[\"坚硬脑袋\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.25,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"冰雪龙\":{\"chinese_name\":\"冰雪龙\",\"id\":698,\"japanese_name\":\"アマルス\",\"english_name\":\"Amaura\",\"height\":\"1.3\",\"weight\":\"25.2\",\"type\":[\"岩石\",\"冰\"],\"ability\":[\"冰冻皮肤\"],\"隐藏特性\":[\"降雪\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":4,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":4,\"火\":1,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"冰雪巨龙\":{\"chinese_name\":\"冰雪巨龙\",\"id\":699,\"japanese_name\":\"アマルルガ \",\"english_name\":\"Aurorus\",\"height\":\"2.7\",\"weight\":\"225.0\",\"type\":[\"岩石\",\"冰\"],\"ability\":[\"冰冻皮肤\"],\"隐藏特性\":[\"降雪\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":4,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":4,\"火\":1,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"仙子伊布\":{\"chinese_name\":\"仙子伊布\",\"id\":700,\"japanese_name\":\"ニンフィア\",\"english_name\":\"Sylveon\",\"height\":\"1.0\",\"weight\":\"23.5\",\"type\":[\"妖精\"],\"ability\":[\"迷人之躯\"],\"隐藏特性\":[\"妖精皮肤\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"摔角鹰人\":{\"chinese_name\":\"摔角鹰人\",\"id\":701,\"japanese_name\":\"ルチャブル\",\"english_name\":\"Hawlucha\",\"height\":\"0.8\",\"weight\":\"21.5\",\"type\":[\"格斗\",\"飞行\"],\"ability\":[\"柔软\",\"轻装\"],\"隐藏特性\":[\"破格\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0,\"岩石\":1,\"虫\":0.25,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":2,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"咚咚鼠\":{\"chinese_name\":\"咚咚鼠\",\"id\":702,\"japanese_name\":\"デデンネ\",\"english_name\":\"Dedenne\",\"height\":\"0.2\",\"weight\":\"2.2\",\"type\":[\"电\",\"妖精\"],\"ability\":[\"颊囊\",\"捡拾 \"],\"隐藏特性\":[\"正电\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":0.5,\"毒\":2,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"小碎钻\":{\"chinese_name\":\"小碎钻\",\"id\":703,\"japanese_name\":\"メレシー\",\"english_name\":\"Carbink\",\"height\":\"0.3\",\"weight\":\"5.7\",\"type\":[\"岩石\",\"妖精\"],\"ability\":[\"恒净之躯\"],\"隐藏特性\":[\"结实\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":4,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"黏黏宝\":{\"chinese_name\":\"黏黏宝\",\"id\":704,\"japanese_name\":\"ヌメラ\",\"english_name\":\"Goomy\",\"height\":\"0.3\",\"weight\":\"2.8\",\"type\":[\"龙\"],\"ability\":[\"食草\",\"湿润之躯\"],\"隐藏特性\":[\"黏滑\"],\"进化\":\"黏美儿\",\"进化等级\":40,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"黏美儿\":{\"chinese_name\":\"黏美儿\",\"id\":705,\"japanese_name\":\"ヌメイル\",\"english_name\":\"Sliggoo\",\"height\":\"0.8\",\"weight\":\"17.5\",\"type\":[\"龙\"],\"ability\":[\"食草\",\"湿润之躯\"],\"隐藏特性\":[\"黏滑\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"黏美龙\":{\"chinese_name\":\"黏美龙\",\"id\":706,\"japanese_name\":\"ヌメルゴン\",\"english_name\":\"Goodra\",\"height\":\"2.0\",\"weight\":\"150.5\",\"type\":[\"龙\"],\"ability\":[\"食草\",\"湿润之躯\"],\"隐藏特性\":[\"黏滑\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"钥圈儿\":{\"chinese_name\":\"钥圈儿\",\"id\":707,\"japanese_name\":\"クレッフィ\",\"english_name\":\"Klefki\",\"height\":\"0.2\",\"weight\":\"3.0\",\"type\":[\"钢\",\"妖精\"],\"ability\":[\"恶作剧之心\"],\"隐藏特性\":[\"魔术师\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.25,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0,\"恶\":0.5,\"妖精\":0.5}},\"小木灵\":{\"chinese_name\":\"小木灵\",\"id\":708,\"japanese_name\":\"ボクレー\",\"english_name\":\"Phantump\",\"height\":\"0.4\",\"weight\":\"7.0\",\"type\":[\"幽灵\",\"草\"],\"ability\":[\"自然回复\",\"察觉\"],\"隐藏特性\":[\"收获\"],\"进化\":\"朽木妖\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":1,\"虫\":1,\"幽灵\":2,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"朽木妖\":{\"chinese_name\":\"朽木妖\",\"id\":709,\"japanese_name\":\"オーロット\",\"english_name\":\"Trevenant\",\"height\":\"1.5\",\"weight\":\"71.0\",\"type\":[\"幽灵\",\"草\"],\"ability\":[\"自然回复\",\"察觉\"],\"隐藏特性\":[\"收获\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":1,\"虫\":1,\"幽灵\":2,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"南瓜精\":{\"chinese_name\":\"南瓜精\",\"id\":710,\"japanese_name\":\"バケッチャ\",\"english_name\":\"Pumpkaboo\",\"height\":\"=1\",\"weight\":\"=1\",\"type\":[\"幽灵\",\"草\"],\"ability\":[\"捡拾\",\"察觉\"],\"隐藏特性\":[\"不眠\"],\"进化\":\"南瓜怪人\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":1,\"虫\":1,\"幽灵\":2,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"南瓜怪人\":{\"chinese_name\":\"南瓜怪人\",\"id\":711,\"japanese_name\":\"パンプジン\",\"english_name\":\"Gourgeist\",\"height\":\"=1\",\"weight\":\"=1\",\"type\":[\"幽灵\",\"草\"],\"ability\":[\"捡拾\",\"察觉\"],\"隐藏特性\":[\"不眠\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":1,\"虫\":1,\"幽灵\":2,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"冰宝\":{\"chinese_name\":\"冰宝\",\"id\":712,\"japanese_name\":\"カチコール\",\"english_name\":\"Bergmite\",\"height\":\"1.0\",\"weight\":\"99.5\",\"type\":[\"冰\"],\"ability\":[\"我行我素\",\"冰冻之躯\"],\"隐藏特性\":[\"结实\"],\"进化\":\"冰岩怪\",\"进化等级\":37,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"冰岩怪\":{\"chinese_name\":\"冰岩怪\",\"id\":713,\"japanese_name\":\"クレベース\",\"english_name\":\"Avalugg\",\"height\":\"2.0\",\"weight\":\"505.0\",\"type\":[\"冰\"],\"ability\":[\"我行我素\",\"冰冻之躯\"],\"隐藏特性\":[\"结实\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"嗡蝠\":{\"chinese_name\":\"嗡蝠\",\"id\":714,\"japanese_name\":\"オンバット\",\"english_name\":\"Noibat\",\"height\":\"0.5\",\"weight\":\"8.0\",\"type\":[\"飞行\",\"龙\"],\"ability\":[\"察觉\",\"穿透\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"音波龙\",\"进化等级\":48,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.25,\"电\":1,\"超能力\":1,\"冰\":4,\"龙\":2,\"恶\":1,\"妖精\":2}},\"音波龙\":{\"chinese_name\":\"音波龙\",\"id\":715,\"japanese_name\":\"オンバーン\",\"english_name\":\"Noivern\",\"height\":\"1.5\",\"weight\":\"85.0\",\"type\":[\"飞行\",\"龙\"],\"ability\":[\"察觉\",\"穿透\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.25,\"电\":1,\"超能力\":1,\"冰\":4,\"龙\":2,\"恶\":1,\"妖精\":2}},\"哲尔尼亚斯\":{\"chinese_name\":\"哲尔尼亚斯\",\"id\":716,\"japanese_name\":\"ゼルネアス\",\"english_name\":\"Xerneas\",\"height\":\"3.0\",\"weight\":\"215.0\",\"type\":[\"妖精\"],\"ability\":[\"妖精气场\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"伊裴尔塔尔\":{\"chinese_name\":\"伊裴尔塔尔\",\"id\":717,\"japanese_name\":\"イベルタル\",\"english_name\":\"Yveltal\",\"height\":\"5.8\",\"weight\":\"203.0\",\"type\":[\"恶\",\"飞行\"],\"ability\":[\"暗黑气场\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":0,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"基格尔德\":{\"chinese_name\":\"基格尔德\",\"id\":718,\"japanese_name\":\"ジガルデ\",\"english_name\":\"Zygarde\",\"height\":\"\",\"weight\":\"\",\"type\":[\"0\",\"龙\",\"地面\"],\"ability\":[\"气场破坏\",\"群聚变形\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":4,\"龙\":2,\"恶\":1,\"妖精\":2}},\"蒂安希\":{\"chinese_name\":\"蒂安希\",\"id\":719,\"japanese_name\":\"ディアンシー\",\"english_name\":\"Diancie\",\"height\":\"0.7\",\"weight\":\"8.8\",\"type\":[\"岩石\",\"妖精\"],\"ability\":[\"恒净之躯\",\"魔法镜\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":4,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"胡帕\":{\"chinese_name\":\"胡帕\",\"id\":720,\"japanese_name\":\"フーパ\",\"english_name\":\"Hoopa\",\"height\":\"0.5\",\"weight\":\"9.0\",\"type\":[\"超能力\",\"幽灵\",\"恶\"],\"ability\":[\"魔术师\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":4,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":4,\"妖精\":1}},\"波尔凯尼恩\":{\"chinese_name\":\"波尔凯尼恩\",\"id\":721,\"japanese_name\":\"ボルケニオン\",\"english_name\":\"Volcanion\",\"height\":\"1.7\",\"weight\":\"195.0\",\"type\":[\"火\",\"水\"],\"ability\":[\"储水\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.25,\"火\":0.25,\"水\":0,\"草\":1,\"电\":2,\"超能力\":1,\"冰\":0.25,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"木木枭\":{\"chinese_name\":\"木木枭\",\"id\":722,\"japanese_name\":\"モクロー\",\"english_name\":\"Rowlet\",\"height\":\"0.3\",\"weight\":\"1.5\",\"type\":[\"草\",\"飞行\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"远隔\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":2,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.25,\"电\":1,\"超能力\":1,\"冰\":4,\"龙\":1,\"恶\":1,\"妖精\":1}},\"投羽枭\":{\"chinese_name\":\"投羽枭\",\"id\":723,\"japanese_name\":\"フクスロー\",\"english_name\":\"Dartrix\",\"height\":\"0.7\",\"weight\":\"16.0\",\"type\":[\"草\",\"飞行\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"远隔\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":null,\"格斗\":null,\"飞行\":null,\"毒\":null,\"地面\":null,\"岩石\":null,\"虫\":null,\"幽灵\":null,\"钢\":null,\"火\":null,\"水\":null,\"草\":null,\"电\":null,\"超能力\":null,\"冰\":null,\"龙\":null,\"恶\":null,\"妖精\":null}},\"狙射树枭\":{\"chinese_name\":\"狙射树枭\",\"id\":724,\"japanese_name\":\"ジュナイパー\",\"english_name\":\"Decidueye\",\"height\":\"1.6\",\"weight\":\"36.6\",\"type\":[\"草\",\"幽灵\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"远隔\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":null,\"格斗\":null,\"飞行\":null,\"毒\":null,\"地面\":null,\"岩石\":null,\"虫\":null,\"幽灵\":null,\"钢\":null,\"火\":null,\"水\":null,\"草\":null,\"电\":null,\"超能力\":null,\"冰\":null,\"龙\":null,\"恶\":null,\"妖精\":null}},\"火斑喵\":{\"chinese_name\":\"火斑喵\",\"id\":725,\"japanese_name\":\"ニャビー\",\"english_name\":\"Litten\",\"height\":\"0.4\",\"weight\":\"4.3\",\"type\":[\"火\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"威吓\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"炎热喵\":{\"chinese_name\":\"炎热喵\",\"id\":726,\"japanese_name\":\"ニャヒート\",\"english_name\":\"Torracat\",\"height\":\"0.7\",\"weight\":\"25.0\",\"type\":[\"火\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"威吓\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"炽焰咆哮虎\":{\"chinese_name\":\"炽焰咆哮虎\",\"id\":727,\"japanese_name\":\"ガオガエン\",\"english_name\":\"Incineroar\",\"height\":\"1.8\",\"weight\":\"83.0\",\"type\":[\"火\",\"恶\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"威吓\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":1,\"幽灵\":0.5,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":0,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":1}},\"球球海狮\":{\"chinese_name\":\"球球海狮\",\"id\":728,\"japanese_name\":\"アシマリ\",\"english_name\":\"Popplio \",\"height\":\"0.4\",\"weight\":\"7.5\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"湿润之声\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"花漾海狮\":{\"chinese_name\":\"花漾海狮\",\"id\":729,\"japanese_name\":\"オシャマリ\",\"english_name\":\"Brionne\",\"height\":\"0.6\",\"weight\":\"17.5\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"湿润之声\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"西狮海壬\":{\"chinese_name\":\"西狮海壬\",\"id\":730,\"japanese_name\":\"アシレーヌ\",\"english_name\":\"Primarina\",\"height\":\"1.8\",\"weight\":\"44.0\",\"type\":[\"水\",\"妖精\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"湿润之声\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"小笃儿\":{\"chinese_name\":\"小笃儿\",\"id\":731,\"japanese_name\":\"ツツケラ\",\"english_name\":\"Pikipek\",\"height\":\"0.3\",\"weight\":\"1.2\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"锐利目光\",\"连续攻击\"],\"隐藏特性\":[\"捡拾\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"喇叭啄鸟\":{\"chinese_name\":\"喇叭啄鸟\",\"id\":732,\"japanese_name\":\"ケララッパ\",\"english_name\":\"Trumbeak\",\"height\":\"0.6\",\"weight\":\"14.8\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"锐利目光\",\"连续攻击\"],\"隐藏特性\":[\"捡拾\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":null,\"格斗\":null,\"飞行\":null,\"毒\":null,\"地面\":null,\"岩石\":null,\"虫\":null,\"幽灵\":null,\"钢\":null,\"火\":null,\"水\":null,\"草\":null,\"电\":null,\"超能力\":null,\"冰\":null,\"龙\":null,\"恶\":null,\"妖精\":null}},\"铳嘴大鸟\":{\"chinese_name\":\"铳嘴大鸟\",\"id\":733,\"japanese_name\":\"ドデカバシ\",\"english_name\":\"Toucannon\",\"height\":\"1.1\",\"weight\":\"26.0\",\"type\":[\"一般\",\"飞行\"],\"ability\":[\"锐利目光\",\"连续攻击\"],\"隐藏特性\":[\"强行\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":null,\"格斗\":null,\"飞行\":null,\"毒\":null,\"地面\":null,\"岩石\":null,\"虫\":null,\"幽灵\":null,\"钢\":null,\"火\":null,\"水\":null,\"草\":null,\"电\":null,\"超能力\":null,\"冰\":null,\"龙\":null,\"恶\":null,\"妖精\":null}},\"猫鼬少\":{\"chinese_name\":\"猫鼬少\",\"id\":734,\"japanese_name\":\"ヤングース\",\"english_name\":\"Yungoos\",\"height\":\"0.4\",\"weight\":\"6.0\",\"type\":[\"一般\"],\"ability\":[\"蹲守\",\"强壮之颚\"],\"隐藏特性\":[\"适应力\"],\"进化\":\"猫鼬探长\",\"进化等级\":20,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"猫鼬探长\":{\"chinese_name\":\"猫鼬探长\",\"id\":735,\"japanese_name\":\"デカグース\",\"english_name\":\"Gumshoos\",\"height\":\"0.7\",\"weight\":\"14.2\",\"type\":[\"一般\"],\"ability\":[\"蹲守\",\"强壮之颚\"],\"隐藏特性\":[\"适应力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"强颚鸡母虫\":{\"chinese_name\":\"强颚鸡母虫\",\"id\":736,\"japanese_name\":\"アゴジムシ\",\"english_name\":\"Grubbin\",\"height\":\"0.4\",\"weight\":\"4.4\",\"type\":[\"虫\"],\"ability\":[\"虫之预感\"],\"隐藏特性\":[],\"进化\":\"虫电宝\",\"进化等级\":20,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"虫电宝\":{\"chinese_name\":\"虫电宝\",\"id\":737,\"japanese_name\":\"デンヂムシ\",\"english_name\":\"Charjabug\",\"height\":\"0.5\",\"weight\":\"10.5\",\"type\":[\"虫\",\"电\"],\"ability\":[\"蓄电池\"],\"隐藏特性\":[],\"进化\":\"锹农炮虫\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"锹农炮虫\":{\"chinese_name\":\"锹农炮虫\",\"id\":738,\"japanese_name\":\"クワガノン\",\"english_name\":\"Vikavolt\",\"height\":\"1.5\",\"weight\":\"45.0\",\"type\":[\"虫\",\"电\"],\"ability\":[\"飘浮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"好胜蟹\":{\"chinese_name\":\"好胜蟹\",\"id\":739,\"japanese_name\":\"マケンカニ\",\"english_name\":\"Crabrawler\",\"height\":\"0.6\",\"weight\":\"7.0\",\"type\":[\"格斗\"],\"ability\":[\"怪力钳\",\"铁拳\"],\"隐藏特性\":[\"愤怒穴位\"],\"进化\":\"好胜毛蟹\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"好胜毛蟹\":{\"chinese_name\":\"好胜毛蟹\",\"id\":740,\"japanese_name\":\"ケケンカニ\",\"english_name\":\"Crabominable\",\"height\":\"1.7\",\"weight\":\"180.0\",\"type\":[\"格斗\",\"冰\"],\"ability\":[\"怪力钳\",\"铁拳\"],\"隐藏特性\":[\"愤怒穴位\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"花舞鸟\":{\"chinese_name\":\"花舞鸟\",\"id\":741,\"japanese_name\":\"オドリドリ\",\"english_name\":\"Oricorio\",\"height\":\"0.6\",\"weight\":\"3.4\",\"type\":[\"火\",\"飞行\",\"电\",\"超能力\",\"幽灵\"],\"ability\":[\"舞者\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":4,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.25,\"电\":2,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"萌虻\":{\"chinese_name\":\"萌虻\",\"id\":742,\"japanese_name\":\"アブリー\",\"english_name\":\"Cutiefly\",\"height\":\"0.1\",\"weight\":\"0.2\",\"type\":[\"虫\",\"妖精\"],\"ability\":[\"采蜜\",\"鳞粉\"],\"隐藏特性\":[\"甜幕\"],\"进化\":\"蝶结萌虻\",\"进化等级\":25,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"蝶结萌虻\":{\"chinese_name\":\"蝶结萌虻\",\"id\":743,\"japanese_name\":\"アブリボン\",\"english_name\":\"Ribombee\",\"height\":\"0.2\",\"weight\":\"0.5\",\"type\":[\"虫\",\"妖精\"],\"ability\":[\"采蜜\",\"鳞粉\"],\"隐藏特性\":[\"甜幕\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"岩狗狗\":{\"chinese_name\":\"岩狗狗\",\"id\":744,\"japanese_name\":\"イワンコ\",\"english_name\":\"Rockruff\",\"height\":\"0.5\",\"weight\":\"9.2\",\"type\":[\"岩石\"],\"ability\":[\"锐利目光\",\"干劲\",\"我行我素\"],\"隐藏特性\":[\"不屈之心\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"鬃岩狼人\":{\"chinese_name\":\"鬃岩狼人\",\"id\":745,\"japanese_name\":\"ルガルガン\",\"english_name\":\"Lycanroc\",\"height\":\"0.8\",\"weight\":\"25.0\",\"type\":[\"岩石\"],\"ability\":[\"锐利目光\",\"拨沙\",\"干劲\",\"硬爪\"],\"隐藏特性\":[\"不屈之心\",\"无防守\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"弱丁鱼\":{\"chinese_name\":\"弱丁鱼\",\"id\":746,\"japanese_name\":\"ヨワシ\",\"english_name\":\"Wishiwashi\",\"height\":\"0.2\",\"weight\":\"0.3\",\"type\":[\"水\"],\"ability\":[\"鱼群\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"好坏星\":{\"chinese_name\":\"好坏星\",\"id\":747,\"japanese_name\":\"ヒドイデ\",\"english_name\":\"Mareanie\",\"height\":\"0.4\",\"weight\":\"8.0\",\"type\":[\"毒\",\"水\"],\"ability\":[\"不仁不义\",\"柔软\"],\"隐藏特性\":[\"再生力\"],\"进化\":\"超坏星\",\"进化等级\":38,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":1,\"电\":2,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"超坏星\":{\"chinese_name\":\"超坏星\",\"id\":748,\"japanese_name\":\"ドヒドイデ\",\"english_name\":\"Toxapex\",\"height\":\"0.7\",\"weight\":\"14.5\",\"type\":[\"毒\",\"水\"],\"ability\":[\"不仁不义\",\"柔软\"],\"隐藏特性\":[\"再生力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":1,\"电\":2,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"泥驴仔\":{\"chinese_name\":\"泥驴仔\",\"id\":749,\"japanese_name\":\"ドロバンコ\",\"english_name\":\"Mudbray\",\"height\":\"1.0\",\"weight\":\"110.0\",\"type\":[\"地面\"],\"ability\":[\"我行我素\",\"持久力\"],\"隐藏特性\":[\"精神力\"],\"进化\":\"重泥挽马\",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"重泥挽马\":{\"chinese_name\":\"重泥挽马\",\"id\":750,\"japanese_name\":\"バンバドロ\",\"english_name\":\"Mudsdale\",\"height\":\"2.5\",\"weight\":\"920.0\",\"type\":[\"地面\"],\"ability\":[\"我行我素\",\"持久力\"],\"隐藏特性\":[\"精神力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"滴蛛\":{\"chinese_name\":\"滴蛛\",\"id\":751,\"japanese_name\":\"シズクモ\",\"english_name\":\"Dewpider\",\"height\":\"0.3\",\"weight\":\"4.0\",\"type\":[\"水\",\"虫\"],\"ability\":[\"水泡\"],\"隐藏特性\":[\"储水\"],\"进化\":\"滴蛛霸\",\"进化等级\":22,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":0.5,\"草\":1,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"滴蛛霸\":{\"chinese_name\":\"滴蛛霸\",\"id\":752,\"japanese_name\":\"オニシズクモ\",\"english_name\":\"Araquanid\",\"height\":\"1.8\",\"weight\":\"82.0\",\"type\":[\"水\",\"虫\"],\"ability\":[\"水泡\"],\"隐藏特性\":[\"储水\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":0.5,\"草\":1,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"伪螳草\":{\"chinese_name\":\"伪螳草\",\"id\":753,\"japanese_name\":\"カリキリ\",\"english_name\":\"Fomantis\",\"height\":\"0.3\",\"weight\":\"1.5\",\"type\":[\"草\"],\"ability\":[\"叶子防守\"],\"隐藏特性\":[\"唱反调\"],\"进化\":\"兰螳花\",\"进化等级\":34,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"兰螳花\":{\"chinese_name\":\"兰螳花\",\"id\":754,\"japanese_name\":\"ラランテス\",\"english_name\":\"Lurantis\",\"height\":\"0.9\",\"weight\":\"18.5\",\"type\":[\"草\"],\"ability\":[\"叶子防守\"],\"隐藏特性\":[\"唱反调\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"睡睡菇\":{\"chinese_name\":\"睡睡菇\",\"id\":755,\"japanese_name\":\"ネマシュ\",\"english_name\":\"Morelull\",\"height\":\"0.2\",\"weight\":\"1.5\",\"type\":[\"草\",\"妖精\"],\"ability\":[\"发光\",\"孢子\"],\"隐藏特性\":[\"雨盘\"],\"进化\":\"燈罩夜菇\",\"进化等级\":24,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":4,\"地面\":0.5,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"灯罩夜菇\":{\"chinese_name\":\"灯罩夜菇\",\"id\":756,\"japanese_name\":\"マシェード\",\"english_name\":\"Shiinotic\",\"height\":\"1.0\",\"weight\":\"11.5\",\"type\":[\"草\",\"妖精\"],\"ability\":[\"发光\",\"孢子\"],\"隐藏特性\":[\"雨盘\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":4,\"地面\":0.5,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"夜盗火蜥\":{\"chinese_name\":\"夜盗火蜥\",\"id\":757,\"japanese_name\":\"ヤトウモリ\",\"english_name\":\"Salandit\",\"height\":\"0.6\",\"weight\":\"4.8\",\"type\":[\"毒\",\"火\"],\"ability\":[\"腐蚀\"],\"隐藏特性\":[\"迟钝\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":4,\"岩石\":2,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.25,\"电\":1,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.25}},\"焰后蜥\":{\"chinese_name\":\"焰后蜥\",\"id\":758,\"japanese_name\":\"エンニュート\",\"english_name\":\"Salazzle\",\"height\":\"1.2\",\"weight\":\"22.2\",\"type\":[\"毒\",\"火\"],\"ability\":[\"腐蚀\"],\"隐藏特性\":[\"迟钝\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":4,\"岩石\":2,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.25,\"电\":1,\"超能力\":2,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.25}},\"童偶熊\":{\"chinese_name\":\"童偶熊\",\"id\":759,\"japanese_name\":\"ヌイコグマ\",\"english_name\":\"Stufful\",\"height\":\"0.5\",\"weight\":\"6.8\",\"type\":[\"一般\",\"格斗\"],\"ability\":[\"毛茸茸\",\"笨拙\"],\"隐藏特性\":[\"迷人之躯\"],\"进化\":\"穿着熊\",\"进化等级\":27,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"穿着熊\":{\"chinese_name\":\"穿着熊\",\"id\":760,\"japanese_name\":\"キテルグマ\",\"english_name\":\"Bewear\",\"height\":\"2.1\",\"weight\":\"135.0\",\"type\":[\"一般\",\"格斗\"],\"ability\":[\"毛茸茸\",\"笨拙\"],\"隐藏特性\":[\"紧张感\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"甜竹竹\":{\"chinese_name\":\"甜竹竹\",\"id\":761,\"japanese_name\":\"アマカジ\",\"english_name\":\"Bounsweet\",\"height\":\"0.3\",\"weight\":\"3.2\",\"type\":[\"草\"],\"ability\":[\"叶子防守\",\"迟钝\"],\"隐藏特性\":[\"甜幕\"],\"进化\":\"甜舞妮\",\"进化等级\":18,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"甜舞妮\":{\"chinese_name\":\"甜舞妮\",\"id\":762,\"japanese_name\":\"アママイコ\",\"english_name\":\"Steenee\",\"height\":\"0.7\",\"weight\":\"16.0\",\"type\":[\"草\"],\"ability\":[\"叶子防守\",\"迟钝\"],\"隐藏特性\":[\"甜幕\"],\"进化\":\"甜冷美后\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"甜冷美后\":{\"chinese_name\":\"甜冷美后\",\"id\":763,\"japanese_name\":\"アマージョ\",\"english_name\":\"Tsareena\",\"height\":\"1.2\",\"weight\":\"21.4\",\"type\":[\"草\"],\"ability\":[\"叶子防守\",\"女王的威严\"],\"隐藏特性\":[\"甜幕\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"花疗环环\":{\"chinese_name\":\"花疗环环\",\"id\":764,\"japanese_name\":\"キュワワー\",\"english_name\":\"Comfey\",\"height\":\"0.1\",\"weight\":\"0.3\",\"type\":[\"妖精\"],\"ability\":[\"花幕\",\"先行治疗\"],\"隐藏特性\":[\"自然回复\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"智挥猩\":{\"chinese_name\":\"智挥猩\",\"id\":765,\"japanese_name\":\"ヤレユータン\",\"english_name\":\"Oranguru\",\"height\":\"1.5\",\"weight\":\"76.0\",\"type\":[\"一般\",\"超能力\"],\"ability\":[\"精神力\",\"心灵感应\"],\"隐藏特性\":[\"共生\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"投掷猴\":{\"chinese_name\":\"投掷猴\",\"id\":766,\"japanese_name\":\"ナゲツケサル\",\"english_name\":\"Passimian\",\"height\":\"2.0\",\"weight\":\"82.8\",\"type\":[\"格斗\"],\"ability\":[\"接球手\"],\"隐藏特性\":[\"不服输\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"胆小虫\":{\"chinese_name\":\"胆小虫\",\"id\":767,\"japanese_name\":\"コソクムシ\",\"english_name\":\"Wimpod\",\"height\":\"0.5\",\"weight\":\"12.0\",\"type\":[\"虫\",\"水\"],\"ability\":[\"跃跃欲逃\"],\"隐藏特性\":[],\"进化\":\"具甲武者\",\"进化等级\":30,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":0.5,\"草\":1,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"具甲武者\":{\"chinese_name\":\"具甲武者\",\"id\":768,\"japanese_name\":\"グソクムシャ\",\"english_name\":\"Golisopod\",\"height\":\"2.0\",\"weight\":\"108.0\",\"type\":[\"虫\",\"水\"],\"ability\":[\"危险回避\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":0.5,\"草\":1,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"沙丘娃\":{\"chinese_name\":\"沙丘娃\",\"id\":769,\"japanese_name\":\"スナバァ\",\"english_name\":\"Sandygast\",\"height\":\"0.5\",\"weight\":\"70.0\",\"type\":[\"幽灵\",\"地面\"],\"ability\":[\"遇水凝固\"],\"隐藏特性\":[\"沙隐\"],\"进化\":\"噬沙堡爷\",\"进化等级\":42,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.25,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"噬沙堡爷\":{\"chinese_name\":\"噬沙堡爷\",\"id\":770,\"japanese_name\":\"シロデスナ\",\"english_name\":\"Palossand\",\"height\":\"1.3\",\"weight\":\"250.0\",\"type\":[\"幽灵\",\"地面\"],\"ability\":[\"遇水凝固\"],\"隐藏特性\":[\"沙隐\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.25,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"拳海参\":{\"chinese_name\":\"拳海参\",\"id\":771,\"japanese_name\":\"ナマコブシ\",\"english_name\":\"Pyukumuku\",\"height\":\"0.3\",\"weight\":\"1.2\",\"type\":[\"水\"],\"ability\":[\"飞出的内在物 \"],\"隐藏特性\":[\"纯朴\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"属性：空\":{\"chinese_name\":\"属性：空\",\"id\":772,\"japanese_name\":\"タイプ：ヌル\",\"english_name\":\"Type: Null\",\"height\":\"1.9\",\"weight\":\"120.5\",\"type\":[\"一般\"],\"ability\":[\"战斗盔甲\"],\"隐藏特性\":[],\"进化\":\"银伴战兽\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"银伴战兽\":{\"chinese_name\":\"银伴战兽\",\"id\":773,\"japanese_name\":\"シルヴァディ\",\"english_name\":\"Silvally\",\"height\":\"2.3\",\"weight\":\"100.5\",\"type\":[\"一般\"],\"ability\":[\"ＡＲ系统\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"小陨星\":{\"chinese_name\":\"小陨星\",\"id\":774,\"japanese_name\":\"メテノ\",\"english_name\":\"Minior\",\"height\":\"0.3\",\"weight\":\"40.0\",\"type\":[\"岩石\",\"飞行\"],\"ability\":[\"界限盾壳\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0.5,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":1,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"树枕尾熊\":{\"chinese_name\":\"树枕尾熊\",\"id\":775,\"japanese_name\":\"ネッコアラ\",\"english_name\":\"Komala\",\"height\":\"0.4\",\"weight\":\"19.9\",\"type\":[\"一般\"],\"ability\":[\"绝对睡眠\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"爆焰龟兽\":{\"chinese_name\":\"爆焰龟兽\",\"id\":776,\"japanese_name\":\"バクガメス\",\"english_name\":\"Turtonator\",\"height\":\"2.0\",\"weight\":\"212.0\",\"type\":[\"火\",\"龙\"],\"ability\":[\"硬壳盔甲\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.25,\"水\":1,\"草\":0.25,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":2,\"恶\":1,\"妖精\":1}},\"托戈德玛尔\":{\"chinese_name\":\"托戈德玛尔\",\"id\":777,\"japanese_name\":\"トゲデマル\",\"english_name\":\"Togedemaru\",\"height\":\"0.3\",\"weight\":\"3.3\",\"type\":[\"电\",\"钢\"],\"ability\":[\"铁刺\",\"避雷针\"],\"隐藏特性\":[\"结实\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.25,\"毒\":0,\"地面\":4,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.25,\"火\":2,\"水\":1,\"草\":0.5,\"电\":0,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"谜拟Ｑ\":{\"chinese_name\":\"谜拟Ｑ\",\"id\":778,\"japanese_name\":\"ミミッキュ\",\"english_name\":\"Mimikyu\",\"height\":\"0.2\",\"weight\":\"0.7\",\"type\":[\"幽灵\",\"妖精\"],\"ability\":[\"画皮\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":0.25,\"幽灵\":2,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":1,\"妖精\":1}},\"磨牙彩皮鱼\":{\"chinese_name\":\"磨牙彩皮鱼\",\"id\":779,\"japanese_name\":\"ハギギシリ\",\"english_name\":\"Bruxish\",\"height\":\"0.9\",\"weight\":\"19.0\",\"type\":[\"水\",\"超能力\"],\"ability\":[\"鲜艳之躯\",\"强壮之颚\"],\"隐藏特性\":[\"奇迹皮肤\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":0.5,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":1}},\"老翁龙\":{\"chinese_name\":\"老翁龙\",\"id\":780,\"japanese_name\":\"ジジーロン\",\"english_name\":\"Drampa\",\"height\":\"3.0\",\"weight\":\"185.0\",\"type\":[\"一般\",\"龙\"],\"ability\":[\"怒火冲天\",\"食草\"],\"隐藏特性\":[\"无关天气\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"破破舵轮\":{\"chinese_name\":\"破破舵轮\",\"id\":781,\"japanese_name\":\"ダダリン\",\"english_name\":\"Dhelmise\",\"height\":\"3.9\",\"weight\":\"210.0\",\"type\":[\"幽灵\",\"草\"],\"ability\":[\"钢能力者\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":1,\"虫\":1,\"幽灵\":2,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"心鳞宝\":{\"chinese_name\":\"心鳞宝\",\"id\":782,\"japanese_name\":\"ジャラコ\",\"english_name\":\"Jangmo-o\",\"height\":\"0.6\",\"weight\":\"29.7\",\"type\":[\"龙\"],\"ability\":[\"防弹\",\"隔音\"],\"隐藏特性\":[\"防尘\"],\"进化\":\"鳞甲龙\",\"进化等级\":35,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"鳞甲龙\":{\"chinese_name\":\"鳞甲龙\",\"id\":783,\"japanese_name\":\"ジャランゴ\",\"english_name\":\"Hakamo-o\",\"height\":\"1.2\",\"weight\":\"47.0\",\"type\":[\"龙\",\"格斗\"],\"ability\":[\"防弹\",\"隔音\"],\"隐藏特性\":[\"防尘\"],\"进化\":\"杖尾鳞甲龙\",\"进化等级\":45,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":2,\"恶\":0.5,\"妖精\":4}},\"杖尾鳞甲龙\":{\"chinese_name\":\"杖尾鳞甲龙\",\"id\":784,\"japanese_name\":\"ジャラランガ\",\"english_name\":\"Kommo-o\",\"height\":\"1.6\",\"weight\":\"78.2\",\"type\":[\"龙\",\"格斗\"],\"ability\":[\"防弹\",\"隔音\"],\"隐藏特性\":[\"防尘\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":2,\"恶\":0.5,\"妖精\":4}},\"卡璞・鸣鸣\":{\"chinese_name\":\"卡璞・鸣鸣\",\"id\":785,\"japanese_name\":\"カプ・コケコ\",\"english_name\":\"Tapu Koko\",\"height\":\"1.8\",\"weight\":\"20.5\",\"type\":[\"电\",\"妖精\"],\"ability\":[\"电气制造者\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":0.5,\"毒\":2,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"卡璞・蝶蝶\":{\"chinese_name\":\"卡璞・蝶蝶\",\"id\":786,\"japanese_name\":\"カプ・テテフ\",\"english_name\":\"Tapu Lele\",\"height\":\"1.2\",\"weight\":\"18.6\",\"type\":[\"超能力\",\"妖精\"],\"ability\":[\"精神制造者\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":null,\"格斗\":null,\"飞行\":null,\"毒\":null,\"地面\":null,\"岩石\":null,\"虫\":null,\"幽灵\":null,\"钢\":null,\"火\":null,\"水\":null,\"草\":null,\"电\":null,\"超能力\":null,\"冰\":null,\"龙\":null,\"恶\":null,\"妖精\":null}},\"卡璞・哞哞\":{\"chinese_name\":\"卡璞・哞哞\",\"id\":787,\"japanese_name\":\"カプ・ブルル\",\"english_name\":\"Tapu Bulu\",\"height\":\"1.9\",\"weight\":\"45.5\",\"type\":[\"草\",\"妖精\"],\"ability\":[\"青草制造者\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":null,\"格斗\":null,\"飞行\":null,\"毒\":null,\"地面\":null,\"岩石\":null,\"虫\":null,\"幽灵\":null,\"钢\":null,\"火\":null,\"水\":null,\"草\":null,\"电\":null,\"超能力\":null,\"冰\":null,\"龙\":null,\"恶\":null,\"妖精\":null}},\"卡璞・鳍鳍\":{\"chinese_name\":\"卡璞・鳍鳍\",\"id\":788,\"japanese_name\":\"カプ・レヒレ\",\"english_name\":\"Tapu Fini\",\"height\":\"1.3\",\"weight\":\"21.2\",\"type\":[\"水\",\"妖精\"],\"ability\":[\"薄雾制造者\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":null,\"格斗\":null,\"飞行\":null,\"毒\":null,\"地面\":null,\"岩石\":null,\"虫\":null,\"幽灵\":null,\"钢\":null,\"火\":null,\"水\":null,\"草\":null,\"电\":null,\"超能力\":null,\"冰\":null,\"龙\":null,\"恶\":null,\"妖精\":null}},\"科斯莫古\":{\"chinese_name\":\"科斯莫古\",\"id\":789,\"japanese_name\":\"コスモッグ\",\"english_name\":\"Cosmog\",\"height\":\"0.2\",\"weight\":\"0.1\",\"type\":[\"超能力\"],\"ability\":[\"纯朴\"],\"隐藏特性\":[],\"进化\":\"科斯莫姆\",\"进化等级\":43,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"科斯莫姆\":{\"chinese_name\":\"科斯莫姆\",\"id\":790,\"japanese_name\":\"コスモウム\",\"english_name\":\"Cosmoem\",\"height\":\"0.1\",\"weight\":\"999.9\",\"type\":[\"超能力\"],\"ability\":[\"结实\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"索尔迦雷欧\":{\"chinese_name\":\"索尔迦雷欧\",\"id\":791,\"japanese_name\":\"ソルガレオ\",\"english_name\":\"Solgaleo\",\"height\":\"3.4\",\"weight\":\"230.0\",\"type\":[\"超能力\",\"钢\"],\"ability\":[\"金属防护\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":1,\"幽灵\":2,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.25,\"冰\":0.5,\"龙\":0.5,\"恶\":2,\"妖精\":0.5}},\"露奈雅拉\":{\"chinese_name\":\"露奈雅拉\",\"id\":792,\"japanese_name\":\"ルナアーラ\",\"english_name\":\"Lunala\",\"height\":\"4.0\",\"weight\":\"120.0\",\"type\":[\"超能力\",\"幽灵\"],\"ability\":[\"幻影防守\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":4,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":4,\"妖精\":1}},\"虚吾伊德\":{\"chinese_name\":\"虚吾伊德\",\"id\":793,\"japanese_name\":\"ウツロイド\",\"english_name\":\"Nihilego\",\"height\":\"1.2\",\"weight\":\"55.5\",\"type\":[\"岩石\",\"毒\"],\"ability\":[\"异兽提升\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0.25,\"地面\":4,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"爆肌蚊\":{\"chinese_name\":\"爆肌蚊\",\"id\":794,\"japanese_name\":\"マッシブーン\",\"english_name\":\"Buzzwole\",\"height\":\"2.4\",\"weight\":\"333.6\",\"type\":[\"虫\",\"格斗\"],\"ability\":[\"异兽提升\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":4,\"毒\":1,\"地面\":0.5,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"费洛美螂\":{\"chinese_name\":\"费洛美螂\",\"id\":795,\"japanese_name\":\"フェローチェ\",\"english_name\":\"Pheromosa\",\"height\":\"1.8\",\"weight\":\"25.0\",\"type\":[\"虫\",\"格斗\"],\"ability\":[\"异兽提升\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":4,\"毒\":1,\"地面\":0.5,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"电束木\":{\"chinese_name\":\"电束木\",\"id\":796,\"japanese_name\":\"デンジュモク\",\"english_name\":\"Xurkitree\",\"height\":\"3.8\",\"weight\":\"100.0\",\"type\":[\"电\"],\"ability\":[\"异兽提升\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"铁火辉夜\":{\"chinese_name\":\"铁火辉夜\",\"id\":797,\"japanese_name\":\"テッカグヤ\",\"english_name\":\"Celesteela\",\"height\":\"9.2\",\"weight\":\"999.9\",\"type\":[\"钢\",\"飞行\"],\"ability\":[\"异兽提升\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0,\"地面\":0,\"岩石\":1,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":0.5,\"冰\":1,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"纸御剑\":{\"chinese_name\":\"纸御剑\",\"id\":798,\"japanese_name\":\"カミツルギ\",\"english_name\":\"Kartana\",\"height\":\"0.3\",\"weight\":\"0.1\",\"type\":[\"草\",\"钢\"],\"ability\":[\"异兽提升\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":1,\"毒\":0,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":4,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":0.5,\"冰\":1,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"恶食大王\":{\"chinese_name\":\"恶食大王\",\"id\":799,\"japanese_name\":\"アクジキング\",\"english_name\":\"Guzzlord\",\"height\":\"5.5\",\"weight\":\"888.0\",\"type\":[\"恶\",\"龙\"],\"ability\":[\"异兽提升\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":0,\"冰\":2,\"龙\":2,\"恶\":0.5,\"妖精\":4}},\"奈克洛兹玛\":{\"chinese_name\":\"奈克洛兹玛\",\"id\":800,\"japanese_name\":\"ネクロズマ\",\"english_name\":\"Necrozma\",\"height\":\"2.4\",\"weight\":\"230.0\",\"type\":[\"超能力\",\"钢\",\"幽灵\",\"龙\"],\"ability\":[\"棱镜装甲\",\"脑核之力\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"玛机雅娜\":{\"chinese_name\":\"玛机雅娜\",\"id\":801,\"japanese_name\":\"マギアナ\",\"english_name\":\"Magearna\",\"height\":\"1.0\",\"weight\":\"80.5\",\"type\":[\"钢\",\"妖精\"],\"ability\":[\"魂心\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.25,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0,\"恶\":0.5,\"妖精\":0.5}},\"玛夏多\":{\"chinese_name\":\"玛夏多\",\"id\":802,\"japanese_name\":\"マーシャドー\",\"english_name\":\"Marshadow\",\"height\":\"0.7\",\"weight\":\"22.2\",\"type\":[\"格斗\",\"幽灵\"],\"ability\":[\"技术高手\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":2,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":0.25,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":2}},\"毒贝比\":{\"chinese_name\":\"毒贝比\",\"id\":803,\"japanese_name\":\"ベベノム\",\"english_name\":\"Poipole\",\"height\":\"0.6\",\"weight\":\"1.8\",\"type\":[\"毒\"],\"ability\":[\"异兽提升\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"四颚针龙\":{\"chinese_name\":\"四颚针龙\",\"id\":804,\"japanese_name\":\"アーゴヨン\",\"english_name\":\"Naganadel\",\"height\":\"3.6\",\"weight\":\"150.0\",\"type\":[\"毒\",\"龙\"],\"ability\":[\"异兽提升\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":1}},\"垒磊石\":{\"chinese_name\":\"垒磊石\",\"id\":805,\"japanese_name\":\"ツンデツンデ\",\"english_name\":\"Stakataka\",\"height\":\"5.5\",\"weight\":\"820.0\",\"type\":[\"岩石\",\"钢\"],\"ability\":[\"异兽提升\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.25,\"格斗\":4,\"飞行\":0.25,\"毒\":0,\"地面\":4,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"砰头小丑\":{\"chinese_name\":\"砰头小丑\",\"id\":806,\"japanese_name\":\"ズガドーン\",\"english_name\":\"Blacephalon\",\"height\":\"1.8\",\"weight\":\"13.0\",\"type\":[\"火\",\"幽灵\"],\"ability\":[\"异兽提升\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":2,\"虫\":0.25,\"幽灵\":2,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":0.5}},\"捷拉奥拉\":{\"chinese_name\":\"捷拉奥拉\",\"id\":807,\"japanese_name\":\"ゼラオラ\",\"english_name\":\"Zeraora\",\"height\":\"1.5\",\"weight\":\"44.5\",\"type\":[\"电\"],\"ability\":[\"蓄电\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"美录坦\":{\"chinese_name\":\"美录坦\",\"id\":808,\"japanese_name\":\"メルタン\",\"english_name\":\"Meltan\",\"height\":\"0.2\",\"weight\":\"8.0\",\"type\":[\"钢\"],\"ability\":[\"磁力\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"美录梅塔\":{\"chinese_name\":\"美录梅塔\",\"id\":809,\"japanese_name\":\"メルメタル\",\"english_name\":\"Melmetal\",\"height\":\"2.5\",\"weight\":\"800.0\",\"type\":[\"钢\"],\"ability\":[\"铁拳\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"敲音猴\":{\"chinese_name\":\"敲音猴\",\"id\":810,\"japanese_name\":\"サルノリ\",\"english_name\":\"Grookey\",\"height\":\"0.3\",\"weight\":\"5.0\",\"type\":[\"草\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"青草制造者\"],\"进化\":\"啪咚猴\",\"进化等级\":16,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"啪咚猴\":{\"chinese_name\":\"啪咚猴\",\"id\":811,\"japanese_name\":\"バチンキー\",\"english_name\":\"Thwackey\",\"height\":\"0.7\",\"weight\":\"14.0\",\"type\":[\"草\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"青草制造者\"],\"进化\":\"轰擂金刚猩\",\"进化等级\":35,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"轰擂金刚猩\":{\"chinese_name\":\"轰擂金刚猩\",\"id\":812,\"japanese_name\":\"ゴリランダー\",\"english_name\":\"Rillaboom\",\"height\":\"2.1\",\"weight\":\"90.0\",\"type\":[\"草\"],\"ability\":[\"茂盛\"],\"隐藏特性\":[\"青草制造者\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"炎兔儿\":{\"chinese_name\":\"炎兔儿\",\"id\":813,\"japanese_name\":\"ヒバニー\",\"english_name\":\"Scorbunny\",\"height\":\"0.3\",\"weight\":\"4.5\",\"type\":[\"火\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"自由者\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"腾蹴小将\":{\"chinese_name\":\"腾蹴小将\",\"id\":814,\"japanese_name\":\"ラビフット\",\"english_name\":\"Raboot\",\"height\":\"0.6\",\"weight\":\"9.0\",\"type\":[\"火\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"自由者\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"闪焰王牌\":{\"chinese_name\":\"闪焰王牌\",\"id\":815,\"japanese_name\":\"エースバーン\",\"english_name\":\"Cinderace\",\"height\":\"1.4\",\"weight\":\"33.0\",\"type\":[\"火\"],\"ability\":[\"猛火\"],\"隐藏特性\":[\"自由者\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":2,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"泪眼蜥\":{\"chinese_name\":\"泪眼蜥\",\"id\":816,\"japanese_name\":\"メッソン\",\"english_name\":\"Sobble\",\"height\":\"0.3\",\"weight\":\"4.0\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"狙击手\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"变涩蜥\":{\"chinese_name\":\"变涩蜥\",\"id\":817,\"japanese_name\":\"ジメレオン\",\"english_name\":\"Drizzile\",\"height\":\"0.7\",\"weight\":\"11.5\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"狙击手\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"千面避役\":{\"chinese_name\":\"千面避役\",\"id\":818,\"japanese_name\":\"インテレオン\",\"english_name\":\"Inteleon\",\"height\":\"1.9\",\"weight\":\"45.2\",\"type\":[\"水\"],\"ability\":[\"激流\"],\"隐藏特性\":[\"狙击手\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"贪心栗鼠\":{\"chinese_name\":\"贪心栗鼠\",\"id\":819,\"japanese_name\":\"ホシガリス\",\"english_name\":\"Skwovet\",\"height\":\"0.3\",\"weight\":\"2.5\",\"type\":[\"一般\"],\"ability\":[\"颊囊\"],\"隐藏特性\":[\"贪吃鬼\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"藏饱栗鼠\":{\"chinese_name\":\"藏饱栗鼠\",\"id\":820,\"japanese_name\":\"ヨクバリス\",\"english_name\":\"Greedent\",\"height\":\"0.6\",\"weight\":\"6.0\",\"type\":[\"一般\"],\"ability\":[\"颊囊\"],\"隐藏特性\":[\"贪吃鬼\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"稚山雀\":{\"chinese_name\":\"稚山雀\",\"id\":821,\"japanese_name\":\"ココガラ\",\"english_name\":\"Rookidee\",\"height\":\"0.2\",\"weight\":\"1.8\",\"type\":[\"飞行\"],\"ability\":[\"锐利目光\",\"紧张感\"],\"隐藏特性\":[\"健壮胸肌\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"蓝鸦\":{\"chinese_name\":\"蓝鸦\",\"id\":822,\"japanese_name\":\"アオガラス\",\"english_name\":\"Corvisquire\",\"height\":\"0.8\",\"weight\":\"16.0\",\"type\":[\"飞行\"],\"ability\":[\"锐利目光\",\"紧张感\"],\"隐藏特性\":[\"健壮胸肌\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":0.5,\"电\":2,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"钢铠鸦\":{\"chinese_name\":\"钢铠鸦\",\"id\":823,\"japanese_name\":\"アーマーガア\",\"english_name\":\"Corviknight\",\"height\":\"2.2\",\"weight\":\"75.0\",\"type\":[\"飞行\",\"钢\"],\"ability\":[\"压迫感\",\"紧张感\"],\"隐藏特性\":[\"镜甲\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":1,\"飞行\":0.5,\"毒\":0,\"地面\":0,\"岩石\":1,\"虫\":0.25,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.25,\"电\":2,\"超能力\":0.5,\"冰\":1,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"索侦虫\":{\"chinese_name\":\"索侦虫\",\"id\":824,\"japanese_name\":\"サッチムシ\",\"english_name\":\"Blipbug\",\"height\":\"0.4\",\"weight\":\"8.0\",\"type\":[\"虫\"],\"ability\":[\"虫之预感\",\"复眼\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"天罩虫\":{\"chinese_name\":\"天罩虫\",\"id\":825,\"japanese_name\":\"レドームシ\",\"english_name\":\"Dottler\",\"height\":\"0.4\",\"weight\":\"19.5\",\"type\":[\"虫\",\"超能力\"],\"ability\":[\"虫之预感\",\"复眼\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"以欧路普\":{\"chinese_name\":\"以欧路普\",\"id\":826,\"japanese_name\":\"イオルブ\",\"english_name\":\"Orbeetle\",\"height\":\"0.4\",\"weight\":\"40.8\",\"type\":[\"虫\",\"超能力\"],\"ability\":[\"虫之预感\",\"察觉\"],\"隐藏特性\":[\"心灵感应\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":2,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"偷儿狐\":{\"chinese_name\":\"偷儿狐\",\"id\":827,\"japanese_name\":\"クスネ\",\"english_name\":\"Nickit\",\"height\":\"0.6\",\"weight\":\"8.9\",\"type\":[\"恶\"],\"ability\":[\"逃跑\",\"轻装\"],\"隐藏特性\":[\"蹲守\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"狐大盗\":{\"chinese_name\":\"狐大盗\",\"id\":828,\"japanese_name\":\"フォクスライ\",\"english_name\":\"Thievul\",\"height\":\"1.2\",\"weight\":\"19.9\",\"type\":[\"恶\"],\"ability\":[\"逃跑\",\"轻装\"],\"隐藏特性\":[\"蹲守\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"幼棉棉\":{\"chinese_name\":\"幼棉棉\",\"id\":829,\"japanese_name\":\"ヒメンカ\",\"english_name\":\"Gossifleur\",\"height\":\"0.4\",\"weight\":\"2.2\",\"type\":[\"草\"],\"ability\":[\"棉絮\",\"再生力\"],\"隐藏特性\":[\"孢子\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"白蓬蓬\":{\"chinese_name\":\"白蓬蓬\",\"id\":830,\"japanese_name\":\"ワタシラガ\",\"english_name\":\"Eldegoss\",\"height\":\"0.5\",\"weight\":\"2.5\",\"type\":[\"草\"],\"ability\":[\"棉絮\",\"再生力\"],\"隐藏特性\":[\"孢子\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":null,\"格斗\":null,\"飞行\":null,\"毒\":null,\"地面\":null,\"岩石\":null,\"虫\":null,\"幽灵\":null,\"钢\":null,\"火\":null,\"水\":null,\"草\":null,\"电\":null,\"超能力\":null,\"冰\":null,\"龙\":null,\"恶\":null,\"妖精\":null}},\"毛辫羊\":{\"chinese_name\":\"毛辫羊\",\"id\":831,\"japanese_name\":\"ウールー\",\"english_name\":\"Wooloo\",\"height\":\"0.6\",\"weight\":\"6.0\",\"type\":[\"一般\"],\"ability\":[\"毛茸茸\",\"逃跑\"],\"隐藏特性\":[\"防弹\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"毛毛角羊\":{\"chinese_name\":\"毛毛角羊\",\"id\":832,\"japanese_name\":\"バイウールー\",\"english_name\":\"Dubwool\",\"height\":\"1.3\",\"weight\":\"43.0\",\"type\":[\"一般\"],\"ability\":[\"毛茸茸\",\"不屈之心\"],\"隐藏特性\":[\"防弹\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"咬咬龟\":{\"chinese_name\":\"咬咬龟\",\"id\":833,\"japanese_name\":\"カムカメ\",\"english_name\":\"Chewtle\",\"height\":\"0.3\",\"weight\":\"8.5\",\"type\":[\"水\"],\"ability\":[\"强壮之颚\",\"硬壳盔甲\"],\"隐藏特性\":[\"悠游自如\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"暴噬龟\":{\"chinese_name\":\"暴噬龟\",\"id\":834,\"japanese_name\":\"カジリガメ\",\"english_name\":\"Drednaw\",\"height\":\"1.0\",\"weight\":\"115.5\",\"type\":[\"水\",\"岩石\"],\"ability\":[\"强壮之颚\",\"硬壳盔甲\"],\"隐藏特性\":[\"悠游自如\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.25,\"水\":1,\"草\":4,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"来电汪\":{\"chinese_name\":\"来电汪\",\"id\":835,\"japanese_name\":\"ワンパチ\",\"english_name\":\"Yamper\",\"height\":\"0.3\",\"weight\":\"13.5\",\"type\":[\"电\"],\"ability\":[\"捡球\"],\"隐藏特性\":[\"胆怯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":null,\"格斗\":null,\"飞行\":null,\"毒\":null,\"地面\":null,\"岩石\":null,\"虫\":null,\"幽灵\":null,\"钢\":null,\"火\":null,\"水\":null,\"草\":null,\"电\":null,\"超能力\":null,\"冰\":null,\"龙\":null,\"恶\":null,\"妖精\":null}},\"逐电犬\":{\"chinese_name\":\"逐电犬\",\"id\":836,\"japanese_name\":\"パルスワン\",\"english_name\":\"Boltund\",\"height\":\"1.0\",\"weight\":\"34.0\",\"type\":[\"电\"],\"ability\":[\"强壮之颚\"],\"隐藏特性\":[\"好胜\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"小炭仔\":{\"chinese_name\":\"小炭仔\",\"id\":837,\"japanese_name\":\"タンドン\",\"english_name\":\"Rolycoly\",\"height\":\"0.3\",\"weight\":\"12.0\",\"type\":[\"岩石\"],\"ability\":[\"蒸汽机\",\"耐热\"],\"隐藏特性\":[\"引火\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.25,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"大炭车\":{\"chinese_name\":\"大炭车\",\"id\":838,\"japanese_name\":\"トロッゴン\",\"english_name\":\"Carkol\",\"height\":\"1.1\",\"weight\":\"78.0\",\"type\":[\"岩石\",\"火\"],\"ability\":[\"蒸汽机\",\"火焰之躯\"],\"隐藏特性\":[\"引火\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":4,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0,\"水\":4,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"巨炭山\":{\"chinese_name\":\"巨炭山\",\"id\":839,\"japanese_name\":\"セキタンザン\",\"english_name\":\"Coalossal\",\"height\":\"2.8\",\"weight\":\"310.5\",\"type\":[\"岩石\",\"火\"],\"ability\":[\"蒸汽机\",\"火焰之躯\"],\"隐藏特性\":[\"引火\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":4,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0,\"水\":4,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"啃果虫\":{\"chinese_name\":\"啃果虫\",\"id\":840,\"japanese_name\":\"カジッチュ\",\"english_name\":\"Applin\",\"height\":\"0.2\",\"weight\":\"0.5\",\"type\":[\"草\",\"龙\"],\"ability\":[\"熟成\",\"贪吃鬼\"],\"隐藏特性\":[\"防弹\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":0.25,\"草\":0.25,\"电\":0.25,\"超能力\":1,\"冰\":4,\"龙\":2,\"恶\":1,\"妖精\":2}},\"苹裹龙\":{\"chinese_name\":\"苹裹龙\",\"id\":841,\"japanese_name\":\"アップリュー\",\"english_name\":\"Flapple\",\"height\":\"0.3\",\"weight\":\"1.0\",\"type\":[\"草\",\"龙\"],\"ability\":[\"熟成\",\"贪吃鬼\"],\"隐藏特性\":[\"活力\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":0.25,\"草\":0.25,\"电\":0.25,\"超能力\":1,\"冰\":4,\"龙\":2,\"恶\":1,\"妖精\":2}},\"丰蜜龙\":{\"chinese_name\":\"丰蜜龙\",\"id\":842,\"japanese_name\":\"タルップル\",\"english_name\":\"Appletun\",\"height\":\"0.4\",\"weight\":\"13.0\",\"type\":[\"草\",\"龙\"],\"ability\":[\"熟成\",\"贪吃鬼\"],\"隐藏特性\":[\"厚脂肪\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":2,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":0.25,\"草\":0.25,\"电\":0.25,\"超能力\":1,\"冰\":4,\"龙\":2,\"恶\":1,\"妖精\":2}},\"沙包蛇\":{\"chinese_name\":\"沙包蛇\",\"id\":843,\"japanese_name\":\"スナヘビ\",\"english_name\":\"Silicobra\",\"height\":\"2.2\",\"weight\":\"7.6\",\"type\":[\"地面\"],\"ability\":[\"吐沙\",\"蜕皮\"],\"隐藏特性\":[\"沙隐\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"沙螺蟒\":{\"chinese_name\":\"沙螺蟒\",\"id\":844,\"japanese_name\":\"サダイジャ\",\"english_name\":\"Sandaconda\",\"height\":\"3.8\",\"weight\":\"65.5\",\"type\":[\"地面\"],\"ability\":[\"吐沙\",\"蜕皮\"],\"隐藏特性\":[\"沙隐\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":1,\"妖精\":1}},\"古月鸟\":{\"chinese_name\":\"古月鸟\",\"id\":845,\"japanese_name\":\"ウッウ\",\"english_name\":\"Cramorant\",\"height\":\"0.8\",\"weight\":\"18.0\",\"type\":[\"飞行\",\"水\"],\"ability\":[\"一口导弹\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":0,\"岩石\":2,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":1,\"电\":4,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"刺梭鱼\":{\"chinese_name\":\"刺梭鱼\",\"id\":846,\"japanese_name\":\"サシカマス\",\"english_name\":\"Arrokuda\",\"height\":\"0.5\",\"weight\":\"1.0\",\"type\":[\"水\"],\"ability\":[\"悠游自如\"],\"隐藏特性\":[\"螺旋尾鳍\"],\"进化\":\"戽斗尖梭 \",\"进化等级\":26,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"戽斗尖梭\":{\"chinese_name\":\"戽斗尖梭\",\"id\":847,\"japanese_name\":\"カマスジョー\",\"english_name\":\"Barraskewda\",\"height\":\"1.3\",\"weight\":\"30.0\",\"type\":[\"水\"],\"ability\":[\"悠游自如\"],\"隐藏特性\":[\"螺旋尾鳍\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"毒电婴\":{\"chinese_name\":\"毒电婴\",\"id\":848,\"japanese_name\":\"エレズン\",\"english_name\":\"Toxel\",\"height\":\"0.4\",\"weight\":\"11.0\",\"type\":[\"电\",\"毒\"],\"ability\":[\"胆怯\",\"静电\"],\"隐藏特性\":[\"笨拙\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":0.5,\"毒\":0.5,\"地面\":4,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":0.5,\"电\":0.5,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"颤弦蝾螈\":{\"chinese_name\":\"颤弦蝾螈\",\"id\":849,\"japanese_name\":\"ストリンダー\",\"english_name\":\"Toxtricity\",\"height\":\"1.6\",\"weight\":\"40.0\",\"type\":[\"电\",\"毒\"],\"ability\":[\"庞克摇滚\",\"正电\",\"负电\"],\"隐藏特性\":[\"技术高手\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":0.5,\"毒\":0.5,\"地面\":4,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":0.5,\"电\":0.5,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"烧火蚣\":{\"chinese_name\":\"烧火蚣\",\"id\":850,\"japanese_name\":\"ヤクデ\",\"english_name\":\"Sizzlipede\",\"height\":\"0.7\",\"weight\":\"1.0\",\"type\":[\"火\",\"虫\"],\"ability\":[\"引火\",\"白色烟雾\"],\"隐藏特性\":[\"火焰之躯\"],\"进化\":\"焚焰蚣\",\"进化等级\":28,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":2,\"草\":0.25,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"焚焰蚣\":{\"chinese_name\":\"焚焰蚣\",\"id\":851,\"japanese_name\":\"マルヤクデ\",\"english_name\":\"Centiskorch\",\"height\":\"3.0\",\"weight\":\"120.0\",\"type\":[\"火\",\"虫\"],\"ability\":[\"引火\",\"白色烟雾\"],\"隐藏特性\":[\"火焰之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":4,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":0,\"水\":2,\"草\":0.25,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":0.5}},\"拳拳蛸\":{\"chinese_name\":\"拳拳蛸\",\"id\":852,\"japanese_name\":\"タタッコ\",\"english_name\":\"Clobbopus\",\"height\":\"0.6\",\"weight\":\"4.0\",\"type\":[\"格斗\"],\"ability\":[\"柔软\"],\"隐藏特性\":[\"技术高手\"],\"进化\":\"八爪武师\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"八爪武师\":{\"chinese_name\":\"八爪武师\",\"id\":853,\"japanese_name\":\"オトスパス\",\"english_name\":\"Grapploct\",\"height\":\"1.6\",\"weight\":\"39.0\",\"type\":[\"格斗\"],\"ability\":[\"柔软\"],\"隐藏特性\":[\"技术高手\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"来悲茶\":{\"chinese_name\":\"来悲茶\",\"id\":854,\"japanese_name\":\"ヤバチャ\",\"english_name\":\"Sinistea\",\"height\":\"0.1\",\"weight\":\"0.2\",\"type\":[\"幽灵\"],\"ability\":[\"碎裂铠甲\"],\"隐藏特性\":[\"诅咒之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"怖思壶\":{\"chinese_name\":\"怖思壶\",\"id\":855,\"japanese_name\":\"ポットデス\",\"english_name\":\"Polteageist\",\"height\":\"0.2\",\"weight\":\"0.4\",\"type\":[\"幽灵\"],\"ability\":[\"碎裂铠甲\"],\"隐藏特性\":[\"诅咒之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"迷布莉姆\":{\"chinese_name\":\"迷布莉姆\",\"id\":856,\"japanese_name\":\"ミブリム\",\"english_name\":\"Hatenna\",\"height\":\"0.4\",\"weight\":\"3.4\",\"type\":[\"超能力\"],\"ability\":[\"治愈之心\",\"危险预知\"],\"隐藏特性\":[\"魔法镜\"],\"进化\":\"提布莉姆\",\"进化等级\":32,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"提布莉姆\":{\"chinese_name\":\"提布莉姆\",\"id\":857,\"japanese_name\":\"テブリム\",\"english_name\":\"Hattrem\",\"height\":\"0.6\",\"weight\":\"4.8\",\"type\":[\"超能力\"],\"ability\":[\"治愈之心\",\"危险预知\"],\"隐藏特性\":[\"魔法镜\"],\"进化\":\"布莉姆温 \",\"进化等级\":42,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"布莉姆温\":{\"chinese_name\":\"布莉姆温\",\"id\":858,\"japanese_name\":\"ブリムオン\",\"english_name\":\"Hatterene\",\"height\":\"2.1\",\"weight\":\"5.1\",\"type\":[\"超能力\",\"妖精\"],\"ability\":[\"治愈之心\",\"危险预知\"],\"隐藏特性\":[\"魔法镜\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.25,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":2,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":0,\"恶\":1,\"妖精\":1}},\"捣蛋小妖\":{\"chinese_name\":\"捣蛋小妖\",\"id\":859,\"japanese_name\":\"ベロバー\",\"english_name\":\"Impidimp\",\"height\":\"0.4\",\"weight\":\"5.5\",\"type\":[\"恶\",\"妖精\"],\"ability\":[\"恶作剧之心\",\"察觉\"],\"隐藏特性\":[\"顺手牵羊\"],\"进化\":\"诈唬魔\",\"进化等级\":32,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0.5,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":0,\"恶\":0.25,\"妖精\":2}},\"诈唬魔\":{\"chinese_name\":\"诈唬魔\",\"id\":860,\"japanese_name\":\"ギモー\",\"english_name\":\"Morgrem\",\"height\":\"0.8\",\"weight\":\"12.5\",\"type\":[\"恶\",\"妖精\"],\"ability\":[\"恶作剧之心\",\"察觉\"],\"隐藏特性\":[\"顺手牵羊\"],\"进化\":\"长毛巨魔 \",\"进化等级\":42,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0.5,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":0,\"恶\":0.25,\"妖精\":2}},\"长毛巨魔\":{\"chinese_name\":\"长毛巨魔\",\"id\":861,\"japanese_name\":\"オーロンゲ\",\"english_name\":\"Grimmsnarl\",\"height\":\"1.5\",\"weight\":\"61.0\",\"type\":[\"恶\",\"妖精\"],\"ability\":[\"恶作剧之心\",\"察觉\"],\"隐藏特性\":[\"顺手牵羊\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":0.5,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":0,\"恶\":0.25,\"妖精\":2}},\"堵拦熊\":{\"chinese_name\":\"堵拦熊\",\"id\":862,\"japanese_name\":\"タチフサグマ\",\"english_name\":\"Obstagoon\",\"height\":\"1.6\",\"weight\":\"46.0\",\"type\":[\"恶\",\"一般\"],\"ability\":[\"舍身\",\"毅力\"],\"隐藏特性\":[\"不服输\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":4,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"喵头目\":{\"chinese_name\":\"喵头目\",\"id\":863,\"japanese_name\":\"ニャイキング\",\"english_name\":\"Perrserker\",\"height\":\"0.8\",\"weight\":\"28.0\",\"type\":[\"钢\"],\"ability\":[\"战斗盔甲\",\"硬爪\"],\"隐藏特性\":[\"钢之意志\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"魔灵珊瑚\":{\"chinese_name\":\"魔灵珊瑚\",\"id\":864,\"japanese_name\":\"サニゴーン\",\"english_name\":\"Cursola\",\"height\":\"1.0\",\"weight\":\"0.4\",\"type\":[\"幽灵\"],\"ability\":[\"碎裂铠甲\"],\"隐藏特性\":[\"灭亡之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"葱游兵\":{\"chinese_name\":\"葱游兵\",\"id\":865,\"japanese_name\":\"ネギガナイト\",\"english_name\":\"Sirfetch'd\",\"height\":\"0.8\",\"weight\":\"117.0\",\"type\":[\"格斗\"],\"ability\":[\"不屈之心\"],\"隐藏特性\":[\"胆量\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"踏冰人偶\":{\"chinese_name\":\"踏冰人偶\",\"id\":866,\"japanese_name\":\"バリコオル\",\"english_name\":\"Mr. Rime\",\"height\":\"1.5\",\"weight\":\"58.2\",\"type\":[\"冰\",\"超能力\"],\"ability\":[\"蹒跚\",\"除障\"],\"隐藏特性\":[\"冰冻之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":2,\"幽灵\":2,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":1,\"恶\":2,\"妖精\":1}},\"死神板\":{\"chinese_name\":\"死神板\",\"id\":867,\"japanese_name\":\"デスバーン\",\"english_name\":\"Runerigus\",\"height\":\"1.6\",\"weight\":\"66.6\",\"type\":[\"地面\",\"幽灵\"],\"ability\":[\"游魂\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.25,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":2,\"草\":2,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}},\"小仙奶\":{\"chinese_name\":\"小仙奶\",\"id\":868,\"japanese_name\":\"マホミル\",\"english_name\":\"Milcery\",\"height\":\"0.2\",\"weight\":\"0.3\",\"type\":[\"妖精\"],\"ability\":[\"甜幕\"],\"隐藏特性\":[\"芳香幕\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"霜奶仙\":{\"chinese_name\":\"霜奶仙\",\"id\":869,\"japanese_name\":\"マホイップ\",\"english_name\":\"Alcremie\",\"height\":\"0.3\",\"weight\":\"0.5\",\"type\":[\"妖精\"],\"ability\":[\"甜幕\"],\"隐藏特性\":[\"芳香幕\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"列阵兵\":{\"chinese_name\":\"列阵兵\",\"id\":870,\"japanese_name\":\"タイレーツ\",\"english_name\":\"Falinks\",\"height\":\"3.0\",\"weight\":\"62.0\",\"type\":[\"格斗\"],\"ability\":[\"战斗盔甲\"],\"隐藏特性\":[\"不服输\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"啪嚓海胆\":{\"chinese_name\":\"啪嚓海胆\",\"id\":871,\"japanese_name\":\"バチンウニ\",\"english_name\":\"Pincurchin\",\"height\":\"0.3\",\"weight\":\"1.0\",\"type\":[\"电\"],\"ability\":[\"避雷针\"],\"隐藏特性\":[\"电气制造者\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"雪吞虫\":{\"chinese_name\":\"雪吞虫\",\"id\":872,\"japanese_name\":\"ユキハミ\",\"english_name\":\"Snom\",\"height\":\"0.3\",\"weight\":\"3.8\",\"type\":[\"冰\",\"虫\"],\"ability\":[\"鳞粉\"],\"隐藏特性\":[\"冰鳞粉\"],\"进化\":\"雪绒蛾\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":4,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":4,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"雪绒蛾\":{\"chinese_name\":\"雪绒蛾\",\"id\":873,\"japanese_name\":\"モスノウ\",\"english_name\":\"Frosmoth\",\"height\":\"1.3\",\"weight\":\"42.0\",\"type\":[\"冰\",\"虫\"],\"ability\":[\"鳞粉\"],\"隐藏特性\":[\"冰鳞粉\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":0.5,\"岩石\":4,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":4,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"巨石丁\":{\"chinese_name\":\"巨石丁\",\"id\":874,\"japanese_name\":\"イシヘンジン\",\"english_name\":\"Stonjourner\",\"height\":\"2.5\",\"weight\":\"520.0\",\"type\":[\"岩石\"],\"ability\":[\"能量点\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":0.5,\"水\":2,\"草\":2,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"冰砌鹅\":{\"chinese_name\":\"冰砌鹅\",\"id\":875,\"japanese_name\":\"コオリッポ\",\"english_name\":\"Eiscue\",\"height\":\"1.4\",\"weight\":\"89.0\",\"type\":[\"冰\"],\"ability\":[\"结冻头\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"爱管侍\":{\"chinese_name\":\"爱管侍\",\"id\":876,\"japanese_name\":\"イエッサン\",\"english_name\":\"Indeedee\",\"height\":\"0.9\",\"weight\":\"28.0\",\"type\":[\"超能力\",\"一般\"],\"ability\":[\"精神力\",\"同步\",\"我行我素\"],\"隐藏特性\":[\"精神制造者\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":2,\"幽灵\":0,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"莫鲁贝可\":{\"chinese_name\":\"莫鲁贝可\",\"id\":877,\"japanese_name\":\"モルペコ\",\"english_name\":\"Morpeko\",\"height\":\"0.3\",\"weight\":\"3.0\",\"type\":[\"电\",\"恶\"],\"ability\":[\"饱了又饿\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":2,\"幽灵\":0.5,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"铜象\":{\"chinese_name\":\"铜象\",\"id\":878,\"japanese_name\":\"ゾウドウ\",\"english_name\":\"Cufant\",\"height\":\"1.2\",\"weight\":\"100.0\",\"type\":[\"钢\"],\"ability\":[\"强行\"],\"隐藏特性\":[\"重金属\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"大王铜象\":{\"chinese_name\":\"大王铜象\",\"id\":879,\"japanese_name\":\"ダイオウドウ\",\"english_name\":\"Copperajah\",\"height\":\"3.0\",\"weight\":\"650.0\",\"type\":[\"钢\"],\"ability\":[\"强行\"],\"隐藏特性\":[\"重金属\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":2,\"水\":1,\"草\":0.5,\"电\":1,\"超能力\":0.5,\"冰\":0.5,\"龙\":0.5,\"恶\":1,\"妖精\":0.5}},\"雷鸟龙\":{\"chinese_name\":\"雷鸟龙\",\"id\":880,\"japanese_name\":\"パッチラゴン\",\"english_name\":\"Dracozolt\",\"height\":\"1.8\",\"weight\":\"190.0\",\"type\":[\"电\",\"龙\"],\"ability\":[\"蓄电\",\"活力\"],\"隐藏特性\":[\"拨沙\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"雷鸟海兽\":{\"chinese_name\":\"雷鸟海兽\",\"id\":881,\"japanese_name\":\"パッチルドン\",\"english_name\":\"Arctozolt\",\"height\":\"2.3\",\"weight\":\"150.0\",\"type\":[\"电\",\"冰\"],\"ability\":[\"蓄电\",\"静电\"],\"隐藏特性\":[\"拨雪\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":2,\"水\":1,\"草\":1,\"电\":0,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"鳃鱼龙\":{\"chinese_name\":\"鳃鱼龙\",\"id\":882,\"japanese_name\":\"ウオノラゴン\",\"english_name\":\"Dracovish\",\"height\":\"2.3\",\"weight\":\"215.0\",\"type\":[\"水\",\"龙\"],\"ability\":[\"储水\",\"强壮之颚\"],\"隐藏特性\":[\"拨沙\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":0.25,\"水\":0,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":2,\"恶\":1,\"妖精\":2}},\"鳃鱼海兽\":{\"chinese_name\":\"鳃鱼海兽\",\"id\":883,\"japanese_name\":\"ウオチルドン\",\"english_name\":\"Arctovish\",\"height\":\"2.0\",\"weight\":\"175.0\",\"type\":[\"水\",\"冰\"],\"ability\":[\"储水\",\"冰冻之躯\"],\"隐藏特性\":[\"拨雪\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":0,\"草\":2,\"电\":2,\"超能力\":1,\"冰\":0.25,\"龙\":1,\"恶\":1,\"妖精\":1}},\"铝钢龙\":{\"chinese_name\":\"铝钢龙\",\"id\":884,\"japanese_name\":\"ジュラルドン\",\"english_name\":\"Duraludon\",\"height\":\"1.8\",\"weight\":\"40.0\",\"type\":[\"钢\",\"龙\"],\"ability\":[\"轻金属\",\"重金属\"],\"隐藏特性\":[\"坚毅\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0.5,\"格斗\":2,\"飞行\":0.5,\"毒\":0,\"地面\":2,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":0.5,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"多龙梅西亚\":{\"chinese_name\":\"多龙梅西亚\",\"id\":885,\"japanese_name\":\"ドラメシヤ\",\"english_name\":\"Dreepy\",\"height\":\"0.5\",\"weight\":\"2.0\",\"type\":[\"龙\",\"幽灵\"],\"ability\":[\"恒净之躯\",\"穿透\"],\"隐藏特性\":[\"诅咒之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":2,\"妖精\":2}},\"多龙奇\":{\"chinese_name\":\"多龙奇\",\"id\":886,\"japanese_name\":\"ドロンチ\",\"english_name\":\"Drakloak\",\"height\":\"1.4\",\"weight\":\"11.0\",\"type\":[\"龙\",\"幽灵\"],\"ability\":[\"恒净之躯\",\"穿透\"],\"隐藏特性\":[\"诅咒之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":2,\"妖精\":2}},\"多龙巴鲁托\":{\"chinese_name\":\"多龙巴鲁托\",\"id\":887,\"japanese_name\":\"ドラパルト\",\"english_name\":\"Dragapult\",\"height\":\"3.0\",\"weight\":\"50.0\",\"type\":[\"龙\",\"幽灵\"],\"ability\":[\"恒净之躯\",\"穿透\"],\"隐藏特性\":[\"诅咒之躯\"],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":2,\"妖精\":2}},\"苍响\":{\"chinese_name\":\"苍响\",\"id\":888,\"japanese_name\":\"ザシアン\",\"english_name\":\"Zacian\",\"height\":\"2.8\",\"weight\":\"110.0\",\"type\":[\"妖精\",\"\",\"钢\"],\"ability\":[\"不挠之剑\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":2,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":2,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":0,\"恶\":0.5,\"妖精\":1}},\"藏玛然特\":{\"chinese_name\":\"藏玛然特\",\"id\":889,\"japanese_name\":\"ザマゼンタ\",\"english_name\":\"Zamazenta\",\"height\":\"2.9\",\"weight\":\"210.0\",\"type\":[\"格斗\",\"\",\"钢\"],\"ability\":[\"不屈之盾\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"无极汰那\":{\"chinese_name\":\"无极汰那\",\"id\":890,\"japanese_name\":\"ムゲンダイナ\",\"english_name\":\"Eternatus\",\"height\":\"20.0\",\"weight\":\"950.0\",\"type\":[\"毒\",\"龙\"],\"ability\":[\"压迫感\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":1,\"毒\":0.5,\"地面\":2,\"岩石\":1,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.25,\"电\":0.5,\"超能力\":2,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":1}},\"熊徒弟\":{\"chinese_name\":\"熊徒弟\",\"id\":891,\"japanese_name\":\"ダクマ\",\"english_name\":\"Kubfu\",\"height\":\"0.6\",\"weight\":\"12.0\",\"type\":[\"格斗\"],\"ability\":[\"精神力\"],\"隐藏特性\":[],\"进化\":\"武道熊師\",\"进化等级\":\"None\",\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":0.5,\"幽灵\":1,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":2,\"冰\":1,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"武道熊师\":{\"chinese_name\":\"武道熊师\",\"id\":892,\"japanese_name\":\"ウーラオス\",\"english_name\":\"Urshifu\",\"height\":\"1.9\",\"weight\":\"105.0\",\"type\":[\"格斗\",\"恶\",\"水\"],\"ability\":[\"无形拳\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":1,\"地面\":1,\"岩石\":0.5,\"虫\":1,\"幽灵\":0.5,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":0,\"冰\":1,\"龙\":1,\"恶\":0.25,\"妖精\":4}},\"萨戮德\":{\"chinese_name\":\"萨戮德\",\"id\":893,\"japanese_name\":\"ザルード\",\"english_name\":\"Zarude\",\"height\":\"1.8\",\"weight\":\"70.0\",\"type\":[\"恶\",\"草\"],\"ability\":[\"叶子防守\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":4,\"幽灵\":0.5,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":0,\"冰\":2,\"龙\":1,\"恶\":0.5,\"妖精\":2}},\"雷吉艾勒奇\":{\"chinese_name\":\"雷吉艾勒奇\",\"id\":894,\"japanese_name\":\"レジエレキ\",\"english_name\":\"Regieleki\",\"height\":\"1.2\",\"weight\":\"145.0\",\"type\":[\"电\"],\"ability\":[\"电晶体\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":0.5,\"毒\":1,\"地面\":2,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":0.5,\"火\":1,\"水\":1,\"草\":1,\"电\":0.5,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":1,\"妖精\":1}},\"雷吉铎拉戈\":{\"chinese_name\":\"雷吉铎拉戈\",\"id\":895,\"japanese_name\":\"レジドラゴ\",\"english_name\":\"Regidrago\",\"height\":\"2.1\",\"weight\":\"200.0\",\"type\":[\"龙\"],\"ability\":[\"龙颚\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":1,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":1,\"虫\":1,\"幽灵\":1,\"钢\":1,\"火\":0.5,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":1,\"冰\":2,\"龙\":2,\"恶\":1,\"妖精\":2}},\"雪暴马\":{\"chinese_name\":\"雪暴马\",\"id\":896,\"japanese_name\":\"ブリザポス\",\"english_name\":\"Glastrier\",\"height\":\"2.2\",\"weight\":\"800.0\",\"type\":[\"冰\"],\"ability\":[\"苍白嘶鸣\",\"\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":2,\"飞行\":1,\"毒\":1,\"地面\":1,\"岩石\":2,\"虫\":1,\"幽灵\":1,\"钢\":2,\"火\":2,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":0.5,\"龙\":1,\"恶\":1,\"妖精\":1}},\"灵幽马\":{\"chinese_name\":\"灵幽马\",\"id\":897,\"japanese_name\":\"レイスポス\",\"english_name\":\"Spectrier\",\"height\":\"2.0\",\"weight\":\"44.5\",\"type\":[\"幽灵\"],\"ability\":[\"漆黑嘶鸣\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":0,\"格斗\":0,\"飞行\":1,\"毒\":0.5,\"地面\":1,\"岩石\":1,\"虫\":0.5,\"幽灵\":2,\"钢\":1,\"火\":1,\"水\":1,\"草\":1,\"电\":1,\"超能力\":1,\"冰\":1,\"龙\":1,\"恶\":2,\"妖精\":1}},\"蕾冠王\":{\"chinese_name\":\"蕾冠王\",\"id\":898,\"japanese_name\":\"バドレックス\",\"english_name\":\"Calyrex\",\"height\":\"1.1\",\"weight\":\"7.7\",\"type\":[\"超能力\",\"草\",\"冰\",\"幽灵\"],\"ability\":[\"紧张感\",\"人马一体\"],\"隐藏特性\":[],\"进化\":\"None\",\"进化等级\":null,\"属性相性\":{\"一般\":1,\"格斗\":0.5,\"飞行\":2,\"毒\":2,\"地面\":0.5,\"岩石\":1,\"虫\":4,\"幽灵\":2,\"钢\":1,\"火\":2,\"水\":0.5,\"草\":0.5,\"电\":0.5,\"超能力\":0.5,\"冰\":2,\"龙\":1,\"恶\":2,\"妖精\":1}}}");

/***/ }),

/***/ 5:
/*!********************************************!*\
  !*** E:/my/pokemonBP/pokemonBP/pages.json ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map