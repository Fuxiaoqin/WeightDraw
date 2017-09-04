
var token = {sess_token:$_GET('sess_token')} 
var weightDraw = {
    signTime:0,//签到次数
    timer:0,//中奖名单轮播计数器
    degValue:0,//转盘旋转角度
    h:0,//中奖名单轮播移动的距离
    //获取访问总数
    getVisitCount:function(){
        $.getJSON(_ACTSHOST+'/weightDraw/Stat/accessCount?callback=?',token, function(data){
            $('.peopleCount').html(data.count);
        });   
    },
    //获取签到次数
    checkSign:function(){
        $.getJSON(_ACTSHOST+'/weightDraw/Sign/conTimes?callback=?',token, function(data){
            weightDraw.signTime = data.code == 200 || data.code == 201 ? data.sign_times : data.sign_times > 3 ? 3 : 0;
            $('.rate_line').attr('src','images/draw_' + weightDraw.signTime + '.png');  
        });    
    },
    //活动规则绑定动画
    actRule:function(){
        $('.rule').on('click',function(){
            weightDraw.popupFun('.rule_frame');
        }); 
        weightDraw.bindCloseBtn();
    },
    //获取活动相关信息//跳转分享页面
    getActData:function(){
        var act_id={act_id:$_GET('id'),sess_token:$_GET('sess_token')};
        $.getJSON(_ACTSHOST+'/weightDraw/Draw/actInfo?callback=?',act_id,function(data){
            //H5通知客户端显示分享按钮
            if(data.code!=200){
                toast2(data.msg);
                return;
            }
            if(data.data.state!=1){return;}
            var shareLink = data.data.link+ '&weightLotteryInApp=1';
            var share_url = {share_url: window.location.href};
            var shareTitle = data.data.title;
            var shareImages = data.data.images;
            var shareDescr = data.data.descr;
            var shareType = 'act_wdraw';

            //根据不同好享瘦app版本发送对应的客户端跳转协议
            myUserAgent(function(Version){
                if(Version == 2.1 && Version){
                    window.location.href = 'hxsapp://visible_share_btn|'+ shareTitle + '|' +shareLink + '|' + shareImages + '|' + shareDescr + '|' + shareType;
                }else if(Version >= 2.2 && Version <=2.6 && Version){
                    window.location.href = 'https://hxsapp_visible_share_btn#'+ shareTitle + '#' + shareLink + '#' + shareImages + '#' + shareDescr + '#' + shareType;
                }else if(Version > 2.6 && Version){
                    window.location.href = 'https://hxsapp_visible_act_share_btn#'+ shareTitle + '#' + shareLink + '#' + shareImages + '#' + shareDescr + '#' + shareType;
                }
            })
                     
            //qq分享
            $('#qqShareContent').attr('content',decodeURIComponent(shareTitle));
            $('#qqShareDes').attr('content','好享瘦APP  专享福利');
            $('#qqShareImg').attr('content',shareImages); 
            // wxShare(shareTitle,shareDescr,shareLink,shareImages);
            $.getJSON(_HOST+'/base/common/getWxShareJsApiSignature?callback=?', share_url ,function(data){   
            wxShare(decodeURIComponent(shareTitle), decodeURIComponent(shareDescr), shareLink, shareImages, data.data.appId, data.data.timestamp, data.data.noncestr, data.data.signature);

            //二次分享方法
            function wxShare(tit,describe,href,img,appid,timestamp,noncestr,signature){
                    wx.config({
                        debug: false,
                        appId: appid,
                        timestamp: timestamp, // 必填，生成签名的时间戳
                        nonceStr: noncestr, // 必填，生成签名的随机串
                        signature: signature,// 必填，签名，见附录1
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
            }
        })
        });   
    },
    //开始抽奖按钮绑定动画
    startRoll:function(){
        $('#go_roll').on( 'click', function(){
            if( $_GET('weightLotteryInApp') == 1 ){
                toast2('快来下载好享瘦参加活动吧！');
                setTimeout( function(){
                    window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.kufeng.hj.enjoy';
                }, 2000 )
                return false;
            }
            weightDraw.judgeState();
        });
    },
    // //概率
    // //生产环境不需要前端计算概率
    prizeRand:function() {
        var rand = parseInt( Math.floor(Math.random() * (100-1) + 1) );
        if (rand < 10){
            return 1;
        }
        else if ( rand < 20 ){
            return 2;
        }
        else if ( rand < 30 ) {
            return 4;
        }
        else if ( rand < 40 ) {
            return 5;
        }
        else if ( rand < 50 ) {
            return 6;
        }
        else {
            return 3;
        }
    },
    //判断返回码状态
    judgeState:function(){
        var actId={act_id:$_GET('id'),sess_token:$_GET('sess_token')};
        var actId={act_id:62};//测试用
        $.getJSON(_ACTSHOST + '/weightDraw/Draw/turn?callback=?', actId, function(data){
            // data.code= 606 ;//测试用
            data.code = 200;
            data.award_id = weightDraw.prizeRand();
            switch( Number( data.code ) ){
                case 401://未登录跳转登录页面
                window.location.href='https://hxsapp_showloginpage';
                break;          
                case 603://未中奖还剩余几次机会
                weightDraw.canRoll( 3, data );
                break;
                case 200://已中奖
                weightDraw.canRoll( Number(data.award_id), data );//可以旋转
                break;
                case 605://活动已结束
                toast2( data.msg.title );
                $('.page_1_foot').css('display', 'block');
                break;
                case 606://谢谢参与
                weightDraw.canRoll( 3, data );
                break;
                default://501缺乏参数,502获取数据失败，602还未达到抽奖标准，604活动还未开始，607机会已用完
                toast2( data.msg.title );
            }
        });  
    },
    //可以旋转
    canRoll:function(id,data){
        $('body').on('touchmove', prevent);
        $('#go_roll').off('click');
        switch(id){
            case 4:
                weightDraw.degValue += ( 360 - weightDraw.degValue%360 ) + 2490;
                setTimeout(function(){
                    $('.can_frame .awardImg img').attr( { src : 'images/dishini.png' } ).css( { 'width' : '3rem','margin-left':'-1.5rem' } );
                    $('.can_frame p:first').html( data.msg.title );
                    weightDraw.popClose('.can_frame');
                },12500);
                break;
            case 3:
                weightDraw.degValue += ( 360 - weightDraw.degValue%360 ) + 2430;
                if( data.code == 606 ){
                    setTimeout( function(){
                        weightDraw.popClose('.thanksP');  
                    }, 12500);
                }else{
                    setTimeout( function(){
                        $('.cannot_frame p:last span').html( data.draw_times + '次' );
                        weightDraw.popClose('.cannot_frame');  
                    }, 12500);
                }
                break;
            case 6:
                weightDraw.degValue += ( 360 - weightDraw.degValue%360 ) + 2370;
                setTimeout( function(){
                    $('.can_frame p:first').html( data.msg.title );
                    $('.can_frame .awardImg img').attr( { src : 'images/humidifier.png' } ).css( { 'width' : '3rem', 'margin-left' : '-1.5rem' } );
                    weightDraw.popClose('.can_frame');
                }, 12500);
                break;
            case 5:
                weightDraw.degValue += ( 360 - weightDraw.degValue%360 ) + 2250;
                setTimeout( function(){
                    $('.can_frame .awardImg img').attr( { 'src' : 'images/comfortU.png' } ).css( { 'width' : '6rem', 'margin-left' : '-3rem' } );
                    $('.can_frame p:first').html( data.msg.title );
                    weightDraw.popClose('.can_frame');
                }, 12500);
                break;
            case 1:
            case 2:
                $('body').off('touchmove', prevent);
                break;
        };
        var deg = 'rotate(' + weightDraw.degValue + 'deg' + ')';
        $('.roll_reward').css('transform', deg);
        $('.roll_ring').css('animation', 'quickroll 12s 1');
        setTimeout( function(){
            $('.roll_ring').css({
                'animation':'slowroll 30s infinite'
            });
        }, 12000);

    },
    //弹出框公用方法
    popupFun:function(sel){
        $('.frame').fadeIn(0);
        $(sel).fadeIn(0);
        $(sel).css('animation','bounceIn .8s 1 linear');
        $('body').on('touchmove', prevent);
    },
    //按钮关闭方法 
    closeBtn:function(sel){
        $('.frame').fadeOut(200);
        $('.child_frame').fadeOut(200);
        $('body').off('touchmove', prevent);   
    },
    bindClose:function(sel){
        $(sel).on('click',function(){
            weightDraw.closeBtn();
        });
    },
    bindCloseBtn:function(){
        weightDraw.bindClose('.close_btn');
        weightDraw.bindClose('.cannot_backbtn');
    },
    //复用弹出框和关闭框方法
    popClose:function(sel){
        weightDraw.popupFun(sel);
        weightDraw.bindCloseBtn();
        weightDraw.startRoll();
    },
    //获取中奖名单//中奖名单轮播
    winnerList:function(){
        $.getJSON( _ACTSHOST + '/weightDraw/Draw/winningList?callback=?', token, function(data){
            if( data.code == 201 ){ 
               $('.reward_list').html( '<li><p style="text-align:center;width:100%;margin-left:-.8rem">快行动起来吧，大奖等你来拿！</p></li>' ) ;
               return;
            }
            var list = data.data;
            // list.length = 3;//测试用
            var str = '';
            function loading( list ){
                $.each( list, function(i, msg){
                    str += '<li><p>' + msg.name + '</p><p>' + msg.draw + '</p><p>' + msg.award + '</p></li>'
                })  
            }
            if( list.length <= 5 ){
                $('.reward_list').css('height','');
                loading(list)
                $('.reward_list').html(str);  
                return;
            }

            var listData = list.slice(0,6);
            loading(listData);
            $('.reward_list').html(str);
            weightDraw.h = -$('.reward_list li:first').outerHeight();
            var hSlider = - weightDraw.h*5;
            $('.reward_list').css( 'height', hSlider + 'px' );
                weightDraw.timer = setInterval(function(){
                    str = '';
                    $('.reward_list li').animate( { top : weightDraw.h + 'px' }, 'slow' ); 
                    list = list.concat( list.splice(0, 1) );
                    listData = list.slice(0, 6);
                    loading(listData);
                    setTimeout( function(){
                        $('.reward_list').html(str);
                        $('.reward_list li').animate( { top : '' }, 'fast' );  
                    }, 1000)
                     
                }, 3000)
            
        })   
    }
}
  
window.onload=function(){
    if($_GET('weightLotteryInApp') == 1){
        $('.d_foot').css('display','block'); 
    }
    weightDraw.getActData();
    weightDraw.getVisitCount();
    weightDraw.checkSign(); 
    weightDraw.actRule();
    weightDraw.winnerList();
    weightDraw.startRoll();
    $('.d_foot .colse').click(function(){
        $('.mather_main').css({
            'padding-bottom' : 0
        })
        $(this).parents('div').hide();
    })
}
function prevent (e) {
　　e.preventDefault();
}
