/**
 * Created by liwei on 17/2/28.
 */
window.onload = function(){
    checkBox();
    deledateFuc();
};

//复选框
var checkBox = function(){
    var checkBoxList = document.getElementsByClassName('jd_check_box');
    for(var i = 0;i < checkBoxList.length; i++){
        checkBoxList[i].onclick = function(){
            var isChecked = this.getAttribute('checked');
            if(isChecked != null){
                this.removeAttribute('checked');
            }else{
                this.setAttribute('checked','');
            }
        }
    }
};

var up;
//删除的方法
var deledateFuc = function(){
    var deleteList = document.getElementsByClassName('delete_box');

    var win = document.getElementsByClassName('jd_win')[0];
    var winBox = document.getElementsByClassName('jd_win_box')[0];
    for(var i = 0;i < deleteList.length; i++){
        deleteList[i].onclick = function(){
            win.style.display = 'block';
            winBox.className = 'jd_win_box jumpout';

            var deleteObj = this;

            up = deleteObj.getElementsByClassName('delete_box_top')[0];

            up.style.transition = 'all 1s ease 0s';
            up.style.webkitTransition = 'all 1s ease 0s';

            up.style.transform = 'translateY(-5px) translateX(5px) rotate(45deg)';
            up.style.webkitTransform = 'translateY(-5px) translateX(5px) rotate(45deg)';
        }
    }

    winBox.getElementsByClassName('cancle')[0].onclick = function(){
        win.style.display = 'none';
        winBox.className = 'jd_win_box';

        if(up){
            up.style.transform = 'translateY(0px) translateX(0px) rotate(0deg)';
            up.style.webkitTransform = 'translateY(0px) translateX(0px) rotate(0deg)';
        }
    }
};