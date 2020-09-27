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
    let param = {};
    if (typeof url !== 'string') {
        return new Error('function need a String type param');
    }
    if (url.indexOf('?') === -1) {
        return param;
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
 * content 表示弹出内容
 * during 表示持续时间
 * @param {*} content
 * @param {*} yesFn 点是的函数
 * @param {* } noFn 点否的函数
 * @returns
 */
function ylConfirm(content, yesFn, noFn) {
    var yesBtn = document.querySelector('.yes-btn');
    var noBtn = document.querySelector('.no-btn');
    var confirmBoxInfo = document.querySelector('.confirmBox>.info');
    confirmBoxInfo.innerText = String(content);
    confirmBoxInfo.parentNode.className = 'confirmBox active';
    yesBtn.onclick = function() {
        document.querySelector('.confirmBox').classList.remove('active');
        if (typeof yesFn === 'function') {
            yesFn();
        }
    };
    noBtn.onclick = function() {
        document.querySelector('.confirmBox').classList.remove('active');
        if (typeof yesFn === 'function') {
            noFn();
        }
    };

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
 * selector 父容器css选择器
 * handler 后续需要进行的逻辑操作
 * @param {*} selector
 * @param {*} handler
 */
function tabSwitch(selector, handler) {
    var parent = document.querySelector(selector);
    parent.addEventListener('click', function(e) {
        var index = 0; // 位于navBar中的位置
        var target = e.target;
        if (!target) throw new Error('No such a dom,plz review');
        // 为目标添加active类名，并移遍历移除除掉兄弟节点带有active的类名
        var siblings = parent.children;
        for (var i = 0; i < siblings.length; i++) {
            var ele = siblings[i];
            ele.index = i;
            if (ele.classList.contains('active')) {
                ele.classList.remove('active');
            }
        }
        // 有嵌套多层时 如 ul > li > a
        if (target.tagName !== parent.children[0].tagName) {
            target.parentNode.classList.add('active');
            index = target.parentNode.index;
        } else {
            target.classList.add('active');
            index = target.index;
        }
        // if (parent.children[0].)

        //  后续处理函数 传入target
        if (typeof handler === 'function') {

            handler(index);
        }
    }, false);

}