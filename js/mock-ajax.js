/*******
 *
 *  当前文件js用于mock拦截ajax并模拟数据，正式接口时，请停止引入
 * 并修改相关逻辑 FIXME
 */

// 拦截ajax 设置
Mock.setup({
    timeout: '200 - 400'
});

// 1、登录接口 127.0.0.1:8085/login
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
// 2、 注册接口
Mock.mock(
    /127\.0\.0\.1:8085\/register/,
    'post',
    function({ url, type, body }) {
        console.log(body);
        return {
            code: 200,
            message: 'success'
        };
    }
);