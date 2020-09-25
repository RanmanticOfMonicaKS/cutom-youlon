console.log('web.js');
// 加入收藏功能
function _addFavorite(sURL, sTitle) {
    try {
        //IE
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            //Firefox
            window.sidebar.addPanel(sTitle, sURL, '');
        } catch (e) {
            alert('您的浏览器不支持自动加入收藏，请手动设置！', '提示信息');
        }
    }
}
// 改变页面使用货币类型
var select = document.querySelector('#moneyChoose');

select.onchange = function(e) {
    window.moneyType = this.value;
};
// FIXME 验证货币改变
// document.querySelector('.personalCenter').onclick = function() {
//     alert(window.moneyType);
// };