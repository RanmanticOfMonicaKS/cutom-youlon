// 1、 点击退出，退回到首页的同时，清除缓存
document.querySelector('.exitBtn').onclick = function() {
    window.localStorage.setItem('username', '');
    window.localStorage.setItem('token', '');
};