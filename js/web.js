/***
 *  当前js用于书写4个公共 home ，card ，goods，已经bulletin 页面的公共js部分，
 *  额外加，小部分的不同功能的js，例如添加收藏，等
 *  例如登录，付款，等核心功能，将由单独的js文件完成
 */

console.log('web.js');
// 1、加入收藏功能
function _addFavorite(sURL, sTitle) {
    try {
        //IE
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            //Firefox
            window.sidebar.addPanel(sTitle, sURL, '');
        } catch (e) {
            ylAlert('您的浏览器不支持自动加入收藏，请手动设置！', '提示信息');
        }
    }
}
// 2、改变页面使用货币类型
! function() {

    var selectMoney = document.querySelector('#moneyChoose');

    selectMoney.onchange = function(e) {
        window.moneyType = this.value;
        console.log(window.moneyType);
    };
}();
// FIXME 验证货币改变
// document.querySelector('.personalCenter').onclick = function() {
//     alert(window.moneyType);
// };

// 3、监控esc，如果有弹出层，则退出
document.addEventListener('keydown', function(e) {
    if (e.code === 'Escape') {
        document.querySelector('body').style.overflow = 'auto';
        document.querySelector('.register').style.display = 'none';
        document.querySelector('.login').style.display = 'none';
    }
}, false);