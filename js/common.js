;
//判断是否测试环境
var _HOST = '';
var _ACTHOST = '';
var _SHOST=''; //分享链接头部
var _ACTSHOST = 'http://act.hxsapp.com'; //固定http
if (window.location.href.indexOf('121.41.83.91') !== -1) {
    _HOST = 'http://121.41.83.91';
    _ACTHOST = 'http://121.41.83.91';
    _SHOST = 'http://app.hxsapp.com';
}else{
    //2.8版本 客户端随身听所需音频信息
    moreMyUserAgent(function(Version){
      if(Version >= 2.8 && Version){
        _HOST = 'https://app.hxsapp.com';
        _ACTHOST = 'https://act.hxsapp.com';
        _SHOST = 'https://app.hxsapp.com';
      }else{
        _HOST = 'https://app.hxsapp.com';
        _ACTHOST = 'https://act.hxsapp.com';
        _SHOST = 'https://app.hxsapp.com';
      }
    });
}

var modelIdfa = $_GET('model_idfa');
var CallBack = '?callback=?' + '&model_idfa=' + modelIdfa;

/**
 * [种cookie]
 */
$(function(){
    var sess_token = $_GET('sess_token');
    if (sess_token) {
        if ($.cookie('ci_session')) {
            $.removeCookie('ci_session', {path:'/'});
        }

        var date = new Date();
        date.setTime(date.getTime() + (86400 * 1000)); //sec秒
        $.cookie('ci_session', sess_token, { path: '/', expires: date });
    }
});
/**
 * [$_GET 从url取参数值]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function $_GET(key){
    var p = window.location.href.split('?'),
        v = '';
    if (p.length < 2) {
      return false;
    }

    p = p[1].split('&');
    p.map(function(item){
      var temp = item.split('=');
      if( temp[0] == key ){
      	if (temp.length > 2) {
      		for (var i in temp) {
      			if (i > 0) {
      				if (i > 1) {
      					v += ('=' + temp[i]);
      				}else{
      					v += temp[i];
      				}
      			}
      		}
      	}else{
      		v = temp[1];
      	}
      }
    });
    return v;
}
//判断页面是否加载完毕
function preLoading(id, fn){
    document.onreadystatechange = function(){
        if(document.readyState == 'complete' || document.readyState == 'loaded'){
            finish(fn);
        }
    }
    function finish(fn){
      setTimeout(function(){
        document.getElementById(id).style.display = 'none';
        $('html,body').css({
          height: 'auto',
          overflow: 'auto'
        });
        if(fn){
          fn();
        }
      },1000);
    }

  $('#' + id).on('touchstart',function(){
    return false;
  });
}
//模拟hover效果
function setHover(seletor, sClass, target) {

        if (!seletor) return;
        var sClass = sClass || 'hover';
        $(document).on('touchstart', seletor, function() {
            if (target == 'parent') {
                $(this).parent().addClass(sClass);
                hoverObj = {obj: $(this).parent(), class: sClass};
            } else if (target) {
                $(target).addClass(sClass);
                hoverObj = {obj: $(target), class: sClass};
            } else {
                $(this).addClass(sClass);
                hoverObj = {obj: $(this), class: sClass};
            }
        });

        var ua = window.navigator.userAgent;

        if (ua.indexOf('Android') != -1) {
            $(document).on('touchmove', seletor, function() {
                hoverObj.obj.removeClass(hoverObj.class);
            });
        }

        $(document).on('touchend', seletor, function() {
            hoverObj.obj.removeClass(hoverObj.class);
        });
    }
//根据时间戳生成的时间对象
  function changeTime(data1,type){
      function todub(nun){
          if(nun < 10){
               nun = '0' + nun;
          }
          return nun;
      }

      var date = data1;
      date = date.substring(0,19);
      date = date.replace(/-/g,'/');
      var timestamp = new Date(date).getTime();
      var d = new Date(timestamp);
      var data = '';
      console.log(date);
      if(type == '0'){
          data = (d.getFullYear()) + "年" +
         (todub(d.getMonth() + 1)) + "月" +
         (todub(d.getDate())) + "日";
      }else if(type== '1'){
         data = (todub(d.getMonth() + 1)) + "月" +
         (todub(d.getDate())) + "日" + (todub(d.getHours())) + ":" + (todub(d.getMinutes())) + ":" + (todub(d.getSeconds()));
      }
      return data;
  }



/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
//  //判断好享瘦版本
// var UserAgent = window.navigator.userAgent;
// function myUserAgent(fn, state){
//     var hxsVersion = '';
//     if(UserAgent){
//         var uaParameter = UserAgent.split('hxsapp-version-');
//         hxsVersion = parseFloat(uaParameter[uaParameter.length-1]);
//     }
//     if(fn){
//       fn(hxsVersion);
//     }
// }
 //判断好享瘦版本
var UserAgent = window.navigator.userAgent;
function myUserAgent(fn, state){
    var hxsVersion = '';
    if(UserAgent){
        var uaParameter = UserAgent.split('hxsapp-version-');
        hxsVersion = uaParameter[uaParameter.length-1];
        if(hxsVersion.length >=5){
            var arr = hxsVersion.split('.');
            hxsVersion = parseFloat(arr[0] + '.' + arr[1] + arr[2]);
        }else{
            hxsVersion = parseFloat(hxsVersion);
        }
    }
    // var hxsVersion = getHsxAppVersion()
    if(fn){
      fn(hxsVersion);
    }
}
//多位判断 如2.7.1
function moreMyUserAgent(fn, state){
    var hxsVersion = '';
    if(UserAgent){
        var uaParameter = UserAgent.split('hxsapp-version-');
        hxsVersion = uaParameter[uaParameter.length-1];
        if(hxsVersion.length >=5){
            var arr = hxsVersion.split('.');
            hxsVersion = parseFloat(arr[0] + '.' + arr[1] + arr[2]);
        }else{
            hxsVersion = parseFloat(hxsVersion);
        }
    }
    // var hxsVersion = getHsxAppVersion()
    if(fn){
      fn(hxsVersion);
    }
}
function getHsxAppVersion (){
  //获取版本号
  var UserAgent = window.navigator.userAgent;
  var windowLocation = window.location.href;
  var __version = UserAgent.split('hxsapp-version-')[1] ? UserAgent.split('hxsapp-version-')[1].split("&")[0] : "0.0.0";
  function __get_dian(str){
    var num = 0 ;
    for (var i = 0; i < str.length; i++) {
      if (str[i]== ".") {
        num ++;
      }
    }
    return num
  }

  //先补零操作
  //例如 2.10 ＝> 2.10.0
  //例如 2.10.1 不会补零操作

  if(__get_dian(__version) == 1 ){
    __version = __version + ".0"
  }
  return __version

}



function compareAppVersion (new_str,old_str){

  //new_str > old_str
  // compareVersionEle("2.10.0","2.9.0") ture

  if (typeof new_str != "string" || typeof old_str != "string" ) {
    console.log("参数类型必须微字符串：string ")
    return;
  }
  if ( new_str.indexOf(".") < 0 || old_str.indexOf(".") < 0  ) {
    console.log("版本号传入有错误")
    return;
  }

  function __get_dian(str){
    var num = 0 ;
    for (var i = 0; i < str.length; i++) {
      if (str[i]== ".") {
        num ++;
      }
    }
    return num
  }

  var __new_str = new_str;
  var __old_str = old_str;

  //先补零操作
  if(__get_dian(new_str) == 1 ){
    __new_str = new_str + ".0"
  }
  if(__get_dian(old_str) == 1 ){
    __old_str = old_str + ".0"
  }

  // debugger

  var new_str_split = __new_str.split(".");
  var old_str_split = __old_str.split(".");

  //比较第一位
  if (  new_str_split[0] ===  old_str_split[0] ) {

    //比较第二位
    if ( new_str_split[1] ===  old_str_split[1] ) {

      //比较第三位
      if ( parseInt(new_str_split[2]) >= parseInt( old_str_split[2]) ) {
       return true
      }else if ( parseInt(new_str_split[2]) < parseInt( old_str_split[2]) ) {
         return false
      }
    }else if ( parseInt(new_str_split[1]) > parseInt( old_str_split[1]) ) {
      return true
    }else if ( parseInt( new_str_split[1] ) < parseInt( old_str_split[1]) ) {
      return false
    }

  }else if ( parseInt(new_str_split[0]) > parseInt( old_str_split[0]) ) {
     return true
  }else if ( parseInt(new_str_split[0]) < parseInt( old_str_split[0]) ) {
     return false
  }

}
//2.5未登录状态调用登录框(接口返回401判断)
function showLoginPage(code, type, obj, msg){
  if(code == 401){
    myUserAgent(function(Version){
        if(Version && Version >= 2.5){
          window.location.href = 'https://hxsapp_showloginpage';
        }
    })
  }
  if(type){
    if(code != 401){
        msgTip(obj, msg);
    }
  }
}

//2.5未登录状态调用登录框(点击类)
function locationCheckSessToken(obj, type){
    var token = $_GET('sess_token');
    var locationType = window.location.search.indexOf('sess_token');
    if(token && token.length < 10 || (locationType != -1 && !token)){
        if(type){
          $(obj).show();
        }
        $(document).on('click', obj, function(){
          myUserAgent(function(Version){
            if(Version && Version >= 2.5){
              window.location.href = 'https://hxsapp_showloginpage';
            }
          })
          return false;
        });
    }
}

 //提示消息框
  function msgTip(obj, msg){
    if(!msg)return;
      var target = $(obj);
      //var width = $(obj).css()
      target.text(msg);
      target.css({
        'left':'50%',
        'marginLeft': - target.width()/2 - 16,
      })
      target.show();
      setTimeout(function(){
          target.hide();
      },1000);
  }
  function msgTip2(obj, msg){
    if(!msg)return;
      var target = $(obj);
      //var width = $(obj).css()
      target.text(msg);
      target.css({
        'left':'50%',
        'marginLeft': - target.width()/2 - 16,
      })
      target.show();
      setTimeout(function(){
          target.hide();
      },2500);
  }
  function toastTip(obj, msg, time){
      if(!msg)return;
      if(!time){time=1000};
        var target = $(obj);
        var sliceLength = 16;
        sliceRate = Math.ceil(msg.length/16);
        if(msg.length>sliceLength){
          var msg2='';
          for(var i=0;i<sliceRate;i++){
              msg2+=msg.slice(sliceLength*i,sliceLength*(i+1))+'<br>'
          }
          msg=msg2
        }
        target.html(msg);
        target.css({'left':'50%','marginLeft': -target.width()/2 -22})
        target.show();
        setTimeout(function(){
            target.hide();
        },time);
  }

  //字符串超出部分显示省略号
  function subStlength(str, maxLength, targetLength){
    if(str){
      var reg= /^[A-Za-z]+$/;
      var re =  /^[0-9a-zA-Z]*$/g;
      if (reg.test(str) || re.test(str)){
        if(str.length > 2 * maxLength )str = str.substring(0, 2 * targetLength) + '...';
      }else{
        if(str.length > maxLength )str = str.substring(0,targetLength) + '...';
      }

    }
      return str;
  }

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {

  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch(e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }

  var config = $.cookie = function (key, value, options) {

    // Write

    if (value !== undefined && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setTime(+t + days * 864e+5);
      }

      return (document.cookie = [
        encode(key), '=', stringifyCookieValue(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // Read

    var result = key ? undefined : {};

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie().
    var cookies = document.cookie ? document.cookie.split('; ') : [];

    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = parts.join('=');

      if (key && key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      }

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) === undefined) {
      return false;
    }

    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
  };

}));

//下载链接
var href = 'https://www.hxsapp.com/download';
//hxsDownload('.d_foot a');
//好享瘦down链接
function hxsDownload(obj,shareImg,objpadding){
    var ua = window.navigator.userAgent;
    var IsAndroid = new RegExp('Android').test(ua);
    var isAndroidQQ = new RegExp('Mobile MQQBrowser').test(ua);
    var MicroMessenger = new RegExp('MicroMessenger').test(ua);

    var isIos = new RegExp('iPhone').test(ua);
    var isIpad = new RegExp('iPad').test(ua);
    var isIosQQ = new RegExp(' QQ/').test(ua);
    if(isIos || isIpad){
        $(obj).attr('href','https://at.umeng.com/5viObq');
    }else if(IsAndroid){
        $(obj).attr('href','https://at.umeng.com/aCKnSD');
    }

    if((IsAndroid && isAndroidQQ && !MicroMessenger) || (isIos && isIosQQ) || (isIpad && isIosQQ)){
        $(obj).attr('href','https://www.hxsapp.com/download');
    }

    if($(shareImg).length >= 1){
      $.getJSON(_HOST + '/base/common/getAdListByType' + CallBack, {keywords: 'down_load_btn_ad'}, function(data){
        var data = data.data[0];

        if(!data.image){
          $(shareImg).hide();
          return false;
        }
        $(shareImg).css({
          width:parseInt(data.width)/2,
          height:parseInt(data.height)/2,
          background: 'url(' + data.image + ') left top no-repeat',
          'background-size': '100%',
          top: -parseInt(data.height)/2
        });

        $(shareImg).click(function(){
          window.location.href = data.link;
        });
        $(objpadding).css('padding-bottom',59 + parseInt(data.height)/2);
      })
    }
}

//二次分享
function wxSecShare(tit,describe,href,img){
    $('body').append('<script src="../common/jweixin-1.0.0.js"></script>');
    $('body').append('<script src="../common/qqShare.js"></script>');

    // QQ二次分享
    setShareInfo({
       title: tit,
       summary: describe,
       pic: img,
       url: href
    });

    // 微信二次分享
    $.getJSON(_HOST+'/base/common/getWxShareJsApiSignature?callback=?', {share_url: window.location.href} ,function(data){
      //console.log(data);
      wx.config({
          debug: false,
          appId: data.data.appId,
          timestamp: data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.data.noncestr, // 必填，生成签名的随机串
          signature: data.data.signature,// 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo','onMenuShareQZone']
      });
      wx.ready(function(){
          wx.onMenuShareTimeline({ //微信分享到朋友圈
              title: tit,
              link: href,
              imgUrl: img,
              success: function () {
              },
              cancel: function () {
              }
          });

          wx.onMenuShareAppMessage({ //微信分享给朋友
              title: tit,
              desc: describe,
              link: href,
              imgUrl: img,
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
              },
              cancel: function () {
              }
          });

          wx.onMenuShareQQ({//分享到qq
              title: tit,
              desc: describe,
              link: href,
              imgUrl: img,
              success: function () {
              },
              cancel: function () {
              }
          });

          wx.onMenuShareWeibo({//分享到qq微博
              title: tit,
              desc: describe,
              link: href,
              imgUrl: img,
              success: function () {
              },
              cancel: function () {
              }
          });

          wx.onMenuShareQZone({ //分享到qq空间
              title: tit,
              desc: describe,
              link: href,
              imgUrl: img,
              success: function () {
              },
              cancel: function () {
              }
          });
      });
    })
}

//埋点统计
//ua参数获取
function getUaparen(key){
    var p = window.navigator.userAgent;
    var v = '';
    p = p.split('&');
    p.map(function(item){
        var temp = item.split('-');
        if( temp[0] == key ){
            if (temp.length > 2) {
                for (var i in temp) {
                    if (i > 0) {
                        if (i > 1) {
                            v += ('-' + temp[i]);
                        }else{
                            v += temp[i];
                        }
                    }
                }
            }else{
                v = temp[1];
            }
        }
    });
    return v;
}

var newMobileSystem = getUaparen('mobile_system');
var newBrand = getUaparen('brand');
var newModel = getUaparen('model');
var newSystemResolution = getUaparen('system_resolution');
var newChannelNumber = getUaparen('channel_number');
var newVersionNumber = getUaparen('version_number');

var newNetworkEnvironment = getUaparen('network_environment');
var newLongitude = getUaparen('longitude');
var newLatitude = getUaparen('latitude');

var newRegisterId = getUaparen('register_id');
var newConversationId = getUaparen('conversation_id');
var newUserId = getUaparen('user_id');

var activityId = $_GET('id');
function buriedPoint(behavior, clickResults){
    var webtype='';
    moreMyUserAgent(function(Version){
        var MicroMessenger2 = new RegExp('MicroMessenger').test(UserAgent);
        var type = MicroMessenger2? '微信': '其他';
        if(Version){
            webtype='APP内已设置类型';
        }else{
            webtype=type;
        }
    });
    var json = {
        'one_web': '/',
        'two_web': '/',
        'three_web': '/',
        'columned': '/',
        'behavior': behavior,
        'click_results':clickResults,
        'access_occurred_type':'H5活动页面',
        'access_occurred_type_id': activityId,
        'statistical_type': '页面型',
        'previous_web_type': webtype,
        'mobile_system': newMobileSystem,
        'brand': newBrand,
        'model': newModel,
        'system_resolution': newSystemResolution,
        'channel_number': newChannelNumber,
        'version_number': newVersionNumber,
        'network_environment': newNetworkEnvironment,
        'longitude': newLongitude,
        'latitude': newLatitude,
        'register_id': newRegisterId,
        'conversation_id':newConversationId,
        'user_id': newUserId
    }
    $.getJSON('https://mars.hxsapp.com/h5' + CallBack, json, function(data){});
}