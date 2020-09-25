// 拦截ajax 设置
Mock.setup({
    timeout: '200 - 400'
});

// 登录接口
Mock.mock(
    /127\.0\.0\.1:8085\/login/,
    'get',
    function({ url, type, body }) {
        var param = getParam(url);
        if (param.username === 'lilei' && param.password === '111' || param.username === 'lilei' &&

            param.token === 'abcdefg') {

            return {
                code: 200,
                data: {
                    message: 'success'
                }
            };

        } else {
            return JSON.stringify({
                code: 300,
                data: {
                    message: 'password or username is not correct'
                }
            });
        }
    }

);