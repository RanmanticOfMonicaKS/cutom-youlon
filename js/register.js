// 1、注册按钮 点击功能
function registerClick() {
    var registerBtn = document.querySelector('.registerBtn');
    var register = document.querySelector('.register');
    registerBtn.onclick = function() {
        register.style.display = 'block';
        document.querySelector('body').style.overflow = 'hidden';
        document.querySelector('.pws>input').value = '';

    };
    var closeBtn = document.querySelector('.register-close');
    closeBtn.addEventListener('click', function() {
        console.log(closeBtn);
        // alert('111');
        document.querySelector('body').style.overflow = 'auto';
        register.style.display = 'none';
    }, false);
    var chooseGiftCard = document.querySelector('.useGiftCard > .fa');
    chooseGiftCard.use = true;
    chooseGiftCard.onclick = function() {
        if (this.use) {
            this.className = 'fa';
            this.use = false;
        } else {
            this.className = 'fa fa-check';
            this.use = true;
        }

    };
}
registerClick();
// 2、查看密码
! function() {
    var visible = false;
    document.querySelector('.visible').onclick = function() {
        if (!visible) {
            document.querySelector('.register .pws > input ').type = 'text';
            visible = true;
        } else {
            document.querySelector('.register .pws > input').type = 'password';
            visible = false;
        }
    };
}();

// 3、验证填入信息
function checkInfo(email, password, sufNumber) {
    console.log('-------email-------');
    if (!/\w+@\w+\.\w+/g.test(email)) {
        return {
            result: false,
            message: '请输入正确的邮箱'
        };
    }
    if (!password) {
        return {
            result: false,
            message: '请填写密码'
        };
    }
    if (!sufNumber) {
        return {
            result: false,
            message: '请填写手机号'
        };
    }
    return {
        result: true,
        message: 'success'
    };
}

// 4、点击确认逻辑
function registerSubmit() {
    // 获取所有参数
    var email = document.querySelector('.email >input').value.trim();
    var password = document.querySelector('.register .pws >input').value.trim();
    var useGift = document.querySelector('.useGiftCard>.fa').use;
    var sufNumber = document.querySelector('.register .suf-number > input').value.trim();
    var preNumber = document.querySelector('.register #preNumber').value.trim();
    var phoneNumber = preNumber + '-' + sufNumber;
    var resultObj = checkInfo(email, password, sufNumber);
    console.log(resultObj, '---------->resultObj');
    if (!resultObj.result) {
        document.querySelector('.register-Submit .errBox').innerText = resultObj.message;
        document.querySelector('.register-Submit .errBox').style.display = 'inline-block';
        return;
    }
    document.querySelector('.register-Submit .errBox').style.display = 'none';

    console.log(phoneNumber, email, password, useGift);
    // TODO  AJAX
    ajax({
        url: 'http://127.0.0.1:8085/register',
        type: 'post',
        data: {
            email,
            password,
            phoneNumber,
            useGift
        },
        success: function(res) {
            if (res.indexOf('success') !== -1) {
                ylAlert('注册成功!', 3);
                document.querySelector('.register').style.display = 'none';
            }
        }
    });
}
document.querySelector('.register-Submit').onclick = function() {
    registerSubmit();
};