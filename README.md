﻿# [Demo演示 :blush:](https://fuxiaoqin.github.io/WeightDraw/index.html)
 
[![image](https://github.com/Fuxiaoqin/WeightDraw/blob/master/images/weight2.jpg?raw=true "点我演示效果")](https://fuxiaoqin.github.io/WeightDraw/index.html)

## 开发说明：
### 一、本demo各功能
#### 1.支持移动端、pc端
#### 2.支持一次分享、二次分享
#### 3.支持中奖名单轮播
#### 4.支持外部分享页进入后展示下载横幅
#### 5.支持PV人数展示
#### 6.如若想编辑本demo代码，拉取code，在dev分支下提交您的code，我会合并至master
就是这么简单

### 二、开发流程
#### 参数说明：
    signTime: 0,//签到次数
    timer: 0,//中奖名单轮播计数器
    degValue: 0,//转盘旋转角度
    h: 0,//中奖名单单条轮播移动的距离
    
#### 方法说明： 
##### 1.获取访问总数:getVisitCount()
    a.后台返回的数据需操作DOM放入页面
    b.$( '.peopleCount' ) 为展示pv人数的DOM
    c.data.count为后台返回的pv人数
 
##### 2.获取签到次数，根据签到次数展示不同的进度条：checkSign()
    a.根据后台返回的数据修改页面上三种进度条的图片
    b.signTime = 后台返回的data.sign_times
    c.$( '.rate_line' ) 为进度条img
  
##### 3.活动规则按钮绑定动画：actRule()
    a.$( '.rule' )为弹出活动规则的button
    b.popupFun()为弹出遮罩层的公用方法
    c.bindCloseBtn()为关闭遮罩层的公用方法
  
##### 4.获取活动相关信息，通知客户端调取分享按钮(一次分享)，二次分享传入参数：getActData()
    a.后台返回的data.data.state状态值：-1表示未开始，-2表示已结束，1表示正进行
    b.myUserAgent()为通知客户端调出分享按钮方法
    c.wxShare()为微信二次分享方法
  
##### 5.开始抽奖按钮绑定动画:startRoll()
    a.prizeRand()为随机生成中奖id，实际生成环境请求后台
    b.通过judgeState()判断后台返回的状态码，根据不同的状态码做不同的操作
    c.只有状态码为200和603、606时才可调用canRoll()旋转方法
  
##### 6.旋转方法(核心功能)：canRoll()  
    a.旋转过程中，阻止用户滑动屏幕，阻止用户再次点击抽奖按钮
    b.根据不同的award_id值计算不同的degValue值
    c.设置转盘的transform的值为：'rotate(' + _this.degValue + 'deg' + ')';
    d.同时设置转盘的灯逆时针旋转
  
##### 7.获取中奖名单并轮播: winnerList()
    a.$( '.reward_list' )为展示中奖名单的容器
    b.loading()将后台返回的数据循环之后拼在str字符串之后再植入页面方法
    c.如果后台返回的数据大于5条，则轮播展示

## 联系方式
- `Email`：xiaoqinfu@sina.com
