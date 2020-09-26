/**
 *
 * =========================================== 公用辅助函数  ====================
 */


/**
 *
 *
 * @param {*} url
 * @returns
 */
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
/**
 * content 表示弹出内容
 * during 表示持续时间
 * @param {*} content
 * @param {*} during
 * @returns
 */
function ylAlert(content, during) {
    during = during || 2;
    if (typeof during !== 'number') {
        return new Error('during need a Number type');
    }
    var alertBox = document.querySelector('.alertBox');
    alertBox.innerText = String(content);
    alertBox.className = 'alertBox active';
    setTimeout(() => {
        alertBox.className = 'alertBox';
    }, (during + 0.5) * 1000);
}

/**
 * 将一个元素插入到特定元素后面
 * newElement 要插入的元素
 * targetElement 被插入的元素
 * @param {*} newElement
 * @param {*} targetElement
 */
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}
/**
 * tab栏切换通用元素
 * selector css选择器
 * handler 后续需要进行的逻辑操作
 * @param {*} selector
 * @param {*} handler
 */
function tabSwitch(selector, handler) {

    var target = document.querySelector(selector);
    if (!target) throw new Error('No such a dom,plz review');
    // 为目标添加active类名，并移遍历移除除掉兄弟节点带有active的类名
    var siblings = target.parentNode.children;
    for (var ele in siblings) {
        if (ele.classList.contains('active')) {
            ele.classList.remove('active');
        }
    }
    target.classList.add('active');
    // eslint-disable-next-line no-constant-condition
    if (typeof handler === 'function') {

        handler();
    }

}