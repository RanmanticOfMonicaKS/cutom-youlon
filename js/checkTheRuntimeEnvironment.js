let environment = window.navigator.userAgent
    .match(/(Android)|(iPhone)|(SymbianOS)|(Windows Phone)|(iPad)|(iPod)/) ?
    'phone' :
    'web';

const webDom = document.querySelector('.web');
const phoneDom = document.querySelector('.phone');
environment === 'web' ?
    webDom.style.display = 'block' :
    phoneDom.style.display = 'block';