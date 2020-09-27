// 1、 点击退出，退回到首页的同时，清除缓存
document.querySelector('.exitBtn').onclick = function() {
    window.localStorage.setItem('username', '');
    window.localStorage.setItem('token', '');
};

// 每次进入个人中心，通过index判断是我的订单，还是个人主页

! function() {
    var url = location.href;
    var param = getParam(url);
    if (!param.index) {
        param.index = '0';
    }
    personalCenterShow(parseInt(param.index));
}();

// 个人中心，不同菜单内容的变化
function personalCenterShow(index) {
    var menus = document.querySelectorAll('li.personalCenter-menu-item');
    for (var i = 0; i < menus.length; i++) {
        var menu = menus[i];
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    }

    menus[index].classList.add('active');
    // 右侧内容对应
    var mainRights = document.querySelectorAll('.main-right');
    // console.log(mainRights);
    for (var j = 0; j < mainRights.length; j++) {
        var mainRight = mainRights[j];
        // console.log(mainRight.style);
        mainRight.style.display = 'none';
    }
    mainRights[index].style.display = 'block';
}

// 左侧菜单栏 ，点击逻辑
tabSwitch('.personalCenter-menu', function(index) {
    personalCenterShow(index);
});


// 点击确认更新 ，弹出提示

ylConfirm('请您检查更改信息，是否确认更改', function() {
    alert('todo update');
}, function() {

});