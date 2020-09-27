if (window.environment === 'web') {
    //登录方式
    var loginType = '1';
    mainWeb();
} else {
    mainPhone();
}
// 更改登录状态
function switchLogin() {
    var ylUserName = document.querySelector('.login-btn');
    ylUserName.className = 'yl-username';
    ylUserName.innerText = window.localStorage.getItem('username');
    ylUserName.style.color = '#E9512E';
    // 移除点击登录
    ylUserName.onclick = null;
    console.dir(ylUserName);
    // 允许滚动
    document.querySelector('body').style.overflow = 'auto';
    document.querySelector('.login').style.display = 'none';
    // 移除监听enter发送login请求
    console.dir(document);
    document.onkeydown = null;
    // 添加退出功能按钮
    var exitBtn = document.createElement('span');
    exitBtn.className = 'exitBtn click';
    exitBtn.innerText = '退出';
    var user = document.querySelector('.yl-username');
    insertAfter(exitBtn, user);
    exitBtn.onclick = function() {
        window.localStorage.setItem('token', '');
        window.localStorage.setItem('username', '');
        user.innerText = '登录';
        user.style.color = '#666';
        user.className = 'click login-btn';
        this.style.display = 'none';
        loginHandler();
    };
}
// 定义验证策略
const strategy = (options) => {
    const { loginType } = options;
    if (!loginType) throw Error('give me a loginType');
    if (loginType === '1') {
        const { username } = options;
        const { password } = options;
        if (!username) return { result: false, message: '请输入用户名/邮箱' };
        if (!password) return { result: false, message: '请输入密码' };
        return { result: true, message: 'success' };
    } else {
        const { preNumber, sufNumber } = options;
        if (!preNumber) return { result: false, message: '请添加区号' };
        if (!sufNumber) return { result: false, message: '请添加号码' };
        return { result: true, message: 'success' };
    }
};

// 自动登录
function mainWeb() {

    var username = window.localStorage.getItem('username');
    var token = window.localStorage.getItem('token');
    if (!username || !token) {
        loginHandler();
        return; // 第一次打开并不需要自动登录提示
    }
    ajax({
        url: 'http://127.0.0.1:8085/login?username=' + username + '&token=' + token,
        method: 'GET',
        success: function(res) {
            console.log(res);
            if (res.indexOf('success') !== -1) {

                switchLogin();

            } else {
                ylAlert('自动登录失败，请手动登录', 2);
                loginHandler();
            }
        },
        error: function(e) {
            ylAlert('自动登录失败，请手动登录', 2);
            loginHandler();
        }
    });
}
// 登录验证和发送逻辑
function submitHandler() {
    let options = {};
    if (loginType === '1') {
        console.log('111');
        var username = document.querySelector('.idOrEmail>input').value;
        var password = document.querySelector('.pws>input').value;
        console.log(username, '---', password);
        options = { loginType: '1', username, password };
    } else {
        var preNumber = document.querySelector('#preNumber').value;
        var sufNumber = document.querySelector('.suf-number>input').value;
        options = { preNumber, sufNumber, loginType: '2' };
    }
    const { result, message } = strategy(options);
    var errBox = document.querySelector('.errBox');
    if (!result) {
        errBox.innerText = message;
        errBox.style.display = 'block';
        return;
    }
    errBox.style.display = 'none';
    // TODO AJAX

    ajax({
        url: 'http://127.0.0.1:8085/login?username=lilei&password=111',
        method: 'GET',
        success: function(res) {

            // FIXME  根据真实接口修改判断条件
            if (res.indexOf('success') !== -1) {
                ylAlert('登录成功', 2);
                // FIXME username 或登录缓存信息由接口返回
                document.querySelector('.login').style.display = 'none';
                window.localStorage.setItem('username', 'lilei');
                window.localStorage.setItem('token', 'abcdefg');
                // TODO 后台返回的token存入下次登录先判断token和用户名，给后台，实现自动登录
                switchLogin();
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

// 手动登录后续逻辑
function loginHandler() {
    // web login  -login页面显示关闭
    var login = document.querySelector('.login');
    var loginBtn = document.querySelector('.login-btn');
    loginBtn.onclick = function() {
        console.log(window.moneyType);

        document.querySelector('body').style.overflow = 'hidden';
        login.style.display = 'block';
        document.querySelector('.pws>input').value = '';
        // enter键控制登录
        document.onkeydown = function(e) {
            console.log(e.code);
            if (e.code === 'Enter' && document.querySelector('.login-Submit')) {
                submitHandler();
            }
        };
    };
    var colseBtn = document.querySelector('.login-close');
    colseBtn.addEventListener('click', function() {
        document.querySelector('body').style.overflow = 'auto';
        login.style.display = 'none';
    }, false);


    // 2、 登录方式样式切换
    var usernameBtn = document.querySelector('.username-login');
    var phoneBtn = document.querySelector('.phone-login');
    //邮箱用户名登录
    usernameBtn.addEventListener('click', function() {
        document.querySelector('.login-layout-username').style.display = 'block';
        document.querySelector('.login-layout-phone').style.display = 'none';
        this.className = 'username-login click active';
        this.nextElementSibling.className = 'phone-login click';
        loginType = '1';
    }, false);
    // 手机号登录
    phoneBtn.addEventListener('click', function() {
        document.querySelector('.login-layout-username').style.display = 'none';
        document.querySelector('.login-layout-phone').style.display = 'block';

        this.className = 'phone-login click active';
        this.previousElementSibling.className = 'username-login click';
        loginType = '2';
    }, false);


    // 4、 登录功能

    var submitBtn = document.querySelector('.login-Submit');
    submitBtn.onclick = submitHandler;
}

//手机端登录逻辑
function mainPhone() {
    console.log('phone-login');
}


/**
  mock - demo
 * ajax拦截
 *
 *
 */