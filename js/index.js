/**
 * Created by liwei on 17/2/16.
 */

window.onload = function(){
    navBarAnimation();
    secondKill();
    scrollPic();
}

//头部导航栏渐变
var navBarAnimation = function(){
    //navBar
    var navBar = document.getElementsByClassName('jd_header_box')[0];
    //banner
    var banner = document.getElementsByClassName('jd_banner')[0];
    //banner的高度
    var bannerH = banner.offsetHeight;
    //监听滚动
    window.onscroll = function(){
        //距离顶部的高度
        var scrollH = document.body.scrollTop;
        if(scrollH > bannerH){
            navBar.style.background = "rgba(201,21,35,0.85)";
        }else{
            var op = scrollH/bannerH * 0.85;
            navBar.style.background = "rgba(201,21,35,"+op+")";
        }
    }
}

//秒杀倒计时
var secondKill = function(){
    //时间框的父控件
    var timeBox = document.getElementsByClassName('sk_time')[0];
    //时间控件的数组
    var timeList = timeBox.getElementsByClassName('num');

    var times = 6;
    var timer = setInterval(function(){
        times--;
        if (times < 0){
            times = 0;
            clearInterval(timer);
        }
        var h = Math.floor(times/60/60);
        var m = Math.floor(times/60%60);
        var s = times%60;

        timeList[0].innerHTML = h>10?Math.floor(h/10):0;
        timeList[1].innerHTML = h%10;

        timeList[2].innerHTML = m>10?Math.floor(m/10):0;
        timeList[3].innerHTML = m%10;

        timeList[4].innerHTML = s>10?Math.floor(s/10):0;
        timeList[5].innerHTML = s%10;

    },1000);

}

//轮播图
var scrollPic = function(){
    var banner = document.getElementsByClassName('jd_banner')[0];
    var imgBox = banner.getElementsByTagName('ul')[0];
    var pointBox = banner.getElementsByTagName('ul')[1];
    var pointList = pointBox.getElementsByTagName('li');
    var imgW = banner.offsetWidth;

    var index = 1;
    var timer;

    //添加过渡
    var addTransition = function(){
        imgBox.style.transition = "all 0.5s ease 0s";
        imgBox.style.webkitTransition = "all 0.5s ease 0s";
    }

    //清除过渡
    var removeTransition = function(){
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";
    }

    //改变位置
    var setTransform = function(t){
        imgBox.style.transform = 'translateX('+t+'px)';
        imgBox.style.webkitTransform = 'translateX('+t+'px)';
    }

    //控制小圆点
    var setPoint = function(){
        for(var i = 0;i<pointList.length;i++){
            pointList[i].className = "";
        }
        pointList[index - 1].className = "current";
    };

    //定时器
    timer = setInterval(function(){
        index++;
        addTransition();
        setTransform(-index*imgW);
    },1000);

    //重置位置
    var resetBox = function(){
        if(index>=9){
            index = 1;
        }else if(index<=0){
            index = 8;
        }
        removeTransition();
        setTransform(-index*imgW);
        setPoint();
    };
    //监听动画过渡完成
    imgBox.addEventListener('transitionend',function(){
        resetBox();
    },false);

    imgBox.addEventListener('webkitTransitionEnd',function(){
        resetBox();
    });

    //添加touch事件
    var startX = 0;
    var moveX = 0;
    var isMove = false;
    //touch开始
    imgBox.addEventListener("touchstart", function(event){
        event.preventDefault();
        isMove = false;
        clearInterval(timer);
        startX = event.touches[0].clientX;
        console.log("touchstart");
    },false);

    //touchmove
    imgBox.addEventListener('touchmove',function(event){
        event.preventDefault();
        isMove = true;
        moveX = event.touches[0].clientX - startX;
        setTransform(moveX-index *imgW);
        console.log("move");
    },false);

    //touch结束
    imgBox.addEventListener('touchend',function(event){
        if(isMove && Math.abs(moveX) > imgW / 3){
            if(moveX < 0){
                index++;
            }else if(moveX > 0){
                index--;
            }
        }
        //修复手动滑动到头尾出现空白区域
        if(index>=9){
            removeTransition();
            index = 1;
        }else if(index<=0){
            removeTransition();
            index = 8;
        }else{
            addTransition();
        }
        setTransform(-index*imgW);
        setPoint();
        timer = setInterval(function(){
            index++;
            addTransition();
            setTransform(-index*imgW);
        },1000)
    },false);
}








