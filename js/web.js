console.log('web.js');
console.log(window.google);
// 兼容google加入收藏


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