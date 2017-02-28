/**
 * Created by liwei on 17/2/27.
 */
window.onload = function(){
    scrollLeft();
};

//左侧导航栏移动
var scrollLeft = function(){

    var contentBox = document.getElementsByClassName('jd_category')[0];
    var parentBox = contentBox.getElementsByClassName('jd_category_left')[0];
    var childBox = parentBox.getElementsByClassName('div jd_category_left_box')[0];

    var height = parentBox.offsetHeight;
    var topHeight = document.getElementsByClassName('jd_topBar')[0].offsetHeight;

    //
    var parentH = height - topHeight;
    var childH = childBox.offsetHeight;

    console.log(parentH);
    console.log(childH);

    var startY = 0;
    var endY = 0;
    var moveY = 0;
    var currentY = 0;

    //晃动的范围
    var upDownY = 150;

    //tap点击开始和结束的时间
    var startTime = 0,endTime = 0;
    var liList = childBox.getElementsByTagName('li');


    //加载过渡的动画
    var addTransition = function(){
        childBox.style.transition = "all .3s ease 0s";
        childBox.style.webkitTransition = "all .3s ease 0s";
    };

    //去过渡
    var removeTransition = function(){
        childBox.style.transition = "none";
        childBox.style.webkitTransition = "none";
    };

    //改变位置
    var setTransform = function(t){
        childBox.style.transform = "translateY("+t+"px)";
        childBox.style.webkitTransform = "translateY("+t+"px)";
    };

    childBox.addEventListener('touchstart',function(e){
        startY = e.touches[0].clientY;
        startTime = new Date().getTime();
    },false);

    childBox.addEventListener('touchmove',function(e){
        e.preventDefault();
        endY = e.touches[0].clientY;
        moveY = startY - endY;

        if(currentY - moveY < upDownY && currentY - moveY > (-(childH - parentH) - upDownY)){
            removeTransition();
            setTransform(currentY - moveY);
        }

    },false);

    childBox.addEventListener('touchend',function(e){
        console.log(e);
        if(!e){
            return;
        }
        //点击事件
        if(endTime - startTime < 150 && moveY == 0){
            for(var i = 0;i < liList.length;i++){
                liList[i].className = "";
                liList[i].index = i;
            };

            var li = e.target.parentNode;
            li.className = "now";

            var translateY = li.index * li.offsetHeight;
            if(translateY < childH - parentH){
                addTransition();
                setTransform(-translateY);
                currentY = -translateY;
            }else{
                addTransition();
                setTransform(-(childH - parentH));
                currentY = -(childH - parentH);
            };
        }

        endTime = new Date().getTime();
        //吸附效果
        addTransition();
        if((currentY - moveY) >= 0){
            setTransform(0);
            currentY = 0;
        }else if((currentY - moveY) <= -(childH - parentH)){
            setTransform(-(childH - parentH));
            currentY = -(childH - parentH);
        }else{
            currentY = currentY - moveY;
        };

        moveY = 0;
    },false);
};