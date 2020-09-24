if (window.environment === 'web') {
    (function() {
        // web login  -login页面显示关闭
        var login = document.querySelector('.login');
        var loginBtn = document.querySelector('.login-btn');
        loginBtn.addEventListener('click', function() {
            document.querySelector('body').style.overflow = 'hidden';
            login.style.display = 'block';
        }, false);
        var colseBtn = document.querySelector('.close');
        colseBtn.addEventListener('click', function() {
            document.querySelector('body').style.overflow = 'auto';
            login.style.display = 'none';
        }, false);
        /* esc 退出 */
        document.addEventListener('keydown', function(e) {
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
        // 3、定义验证策略
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

        // 4、 登录功能

        var submitBtn = document.querySelector('.login-Submit');
        submitBtn.addEventListener('click', function() {
            let options = {};
            if (loginType === '1') {
                console.log('111');
                var username = document.querySelector('.idOrEmail>input').value;
                var password = document.querySelector('.pws>input').value;
                console.log(username, '---', password);
                options = { loginType: '1', username, password };
            } else {
                var preNumber = document.querySelector('#preNumber').value;
                var sufNumber = document.querySelector('.phone-number>input').value;
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
            // mock - demo
            Mock.setup({
                timeout: '200 - 400'
            });
            // 拦截ajax设置
            Mock.mock(
                /127\.0\.0\.1:8085\/login/,
                'get',
                function({ url, type, body }) {
                    console.log(url, '--->url');
                    console.log(type, '--->type');
                    console.log(body, '--->body');
                    return {
                        code: 200,
                        data: {
                            message: 'success'
                        }
                    };
                }

            );
            ajax({
                url: 'http://127.0.0.1:8085/login?username=lilei&password=111',
                method: 'GET',
                success: function(res) {
                    console.log(res, '------->');
                },
                error: function(err) {
                    console.log(err);
                }
            });
            var data = Mock.mock({
                'String|1-10': 'awesome'
            });
            console.log(data);
        });
    })();
} else {
    (function() {
        // TODO phone login
    })();
}