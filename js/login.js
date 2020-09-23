console.log(document.querySelector('.sendCheckCode').innerText);
if (window.environment === 'web') {
    (function () {
        // web login  -login页面显示关闭
        var login = document.querySelector('.login');
        var loginBtn = document.querySelector('.login-btn');
        loginBtn.addEventListener('click', function () {
            document.querySelector('body').style.overflow = 'hidden';
            login.style.display = 'block';
        }, false);
        var colseBtn = document.querySelector('.close');
        colseBtn.addEventListener('click', function () {
            document.querySelector('body').style.overflow = 'auto';
            login.style.display = 'none';
        }, false);
        /* esc 退出 */
        document.addEventListener('keydown', function (e) {
            if (e.code === 'Escape') {
                document.querySelector('body').style.overflow = 'auto';

                login.style.display = 'none';
            }
        }, false);

        // 2、 登录方式样式切换
        //登录方式
        var loginType = '1';
        var usernameBtn = document.querySelector('.username-login');
        var phoneBtn = document.querySelector('.phone-login');
        //邮箱用户名登录
        usernameBtn.addEventListener('click', function () {
            document.querySelector('.login-layout-username').style.display = 'block';
            document.querySelector('.login-layout-phone').style.display = 'none';
            this.className = 'username-login click active';
            this.nextElementSibling.className = 'phone-login click';
            loginType = '1';
        }, false);
        // 手机号登录
        phoneBtn.addEventListener('click', function () {
            document.querySelector('.login-layout-username').style.display = 'none';
            document.querySelector('.login-layout-phone').style.display = 'block';

            this.className = 'phone-login click active';
            this.previousElementSibling.className = 'username-login click';
            loginType = '2';
        }, false);
        // 3、 登录功能

        var submitBtn = document.querySelector('.login-Submit');
        submitBtn.addEventListener('click', function () {
            if (loginType === '1') {

                var username = document.querySelector('.idOrEmail>input').value;
                var password = document.querySelector('.pws>input').value;
                console.log(username, '---', password);
                // TODO
            } else {
                console.log('phone-login');
                //TODO
            }
        });
    })();
} else {
    (function () {

    })();
}