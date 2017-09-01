;
//判断访问终端
var browser = {
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			qq: u.match(/\sQQ/i) == " qq" //是否QQ
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

function backToTop() {
	$(window).scroll(function() {
		if($(this).scrollTop() > 1000) {
			$('.backtop').fadeIn(200);
		} else {
			$('.backtop').fadeOut(200);
		}
	});
	var backShow = true;
	if(backShow){

	}
	$('.backtop').click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 1000);
	})
}

//随机出现微信号码和二维码
function randomNum(picId) {
	arrNum = ['111', '222', '333', '444', '555'];
	var numIndex = Math.floor((Math.random() * arrNum.length));
	var appendNum = arrNum[numIndex];

	picId.attr('src', 'images/qr/' + appendNum + '.jpg');
}

function rnd(n, m) {
	return parseInt(Math.random() * (m - n) + n);
}

//加url参数
function addURL() {
	var url = location.href; //获取url
	var timstamp = (new Date).valueOf(); //版本号
	if(url.indexOf("?") <= 0) {
		url = url + "?ts=" + timstamp;
		location.href = url;
	}
}

//单次运行
function once(fn, context) {
	var result;
	return function() {
		if(fn) {
			result = fn.apply(context || this, arguments);
			fn = null;
		}
		return result;
	};
}

//font-size
!function() {
	function e() {
		var e = document.documentElement.clientWidth,
			t = document.querySelector("html"),
			f = e / 20;
		window.fontSize = f;
		t.style.fontSize = f + "px"
	}
	e(), window.addEventListener("resize", e);
}();

//引入插件
function links(url) {
	var linkjs = document.createElement("script");
	linkjs.type = "text/javascript";
	linkjs.src = 'js/' + url;
	document.body.appendChild(linkjs);
}

//toast
var toast_once = true;
function toast(msg){
	if(toast_once){
		$("body").append(
			'<div id="toast_box" style="z-index: 999;background: #fff;position: fixed;width: 100%;height: 100%;display: none;left:0;top:0;opacity: 0.8;text-align:center">'
			+ '<p style="background-color: #333;width: 50%;padding: .6rem;color: #fff;border-radius: 1em;margin: 12rem auto auto auto;font-size:.75rem" id="toast_msg">'
			+ '</p>'
			+ '</div>'
		);
		toast_once = false;
	}
	$('#toast_box').fadeIn(500);
    setTimeout(function() {
        $('#toast_box').fadeOut(500);
    }, 1000);
	$('#toast_msg').text(msg);
}

//toast2
var toast_once = true;
function toast2(msg){
	if(toast_once){
		$("body").append(
			'<div id="toast_box" style="z-index: 999;background: #555;position: fixed;width: 100%;height: 100%;display: none;left:0;top:0;opacity: 0.8;text-align:center">'
			+ '<p style="background-color: #000;width: 50%;padding: .6rem;color: #fff;border-radius: 1em;margin: 12rem auto auto auto;font-size:.75rem" id="toast_msg">'
			+ '</p>'
			+ '</div>'
		);
		toast_once = false;
	}
	$('#toast_box').fadeIn(500);
    setTimeout(function() {
        $('#toast_box').fadeOut(500);
    }, 3000);
	$('#toast_msg').text(msg);
}
//截取字符串
function subStlength(str, maxLength, targetLength){
    if(str && str.length > maxLength )str = str.substring(0,targetLength) + '...';
    return str;
}

//性别验证
function sexValid(sex){

}