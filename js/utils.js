//工具函数
// 获取请求参数，用户mock funtion来判断返回
function getParam(url) {
    console.log(url, '---->url');
    let param = {};
    if (typeof url !== 'string') {
        return new Error('function need a String type param');
    }

    url.split('?')[1]
        .split('&').forEach(item => {
            param[item.split('=')[0]] = item.split('=')[1];
        });
    return param;
}
// alert函数
function ylAlert(content,during) {
    during = during || 2;
    if(typeof during !== 'number') {
        return new Error('during need a Number type');
    }
    var alertBox = document.querySelector('.alertBox');
    alertBox.innerText  = String(content) ;
    alertBox.className = 'alertBox active';
    setTimeout(() => {
        alertBox.className =  'alertBox';
    }, (during+0.5)*1000);
}
