let environment = window.navigator.userAgent
    .match(/(Android)|(iPhone)|(SymbianOS)|(Windows Phone)|(iPad)|(iPod)/) ?
    'phone' :
    'web';

const webDom = document.querySelector('.web');
const phoneDom = document.querySelector('.phone');

/*****
 * 如果是web加载web.js 如果是phone 加载phone.js
 *
 */
if (environment === 'web') {
    window.environment = 'web';
    console.log('1111');
    webDom.style.display = 'block';
    const webJS = document.createElement('script');
    webJS.src = './js/web.js';
    document.querySelector('body').appendChild(webJS);
} else {
    console.log('222');
    window.environment = 'phone';
    phoneDom.style.display = 'block';
    const phoneJS = document.createElement('script');
    phoneJS.src = './js/phone.js';
    document.querySelector('body').appendChild(phoneJS);

}