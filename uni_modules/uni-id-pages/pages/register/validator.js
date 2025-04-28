import passwordMod from '@/uni_modules/uni-id-pages/common/password.js';

export default {
    "username": {
        "rules": [
            {
                required: true,
                errorMessage: '请输入用户名',
            },
            {
                minLength: 2,
                maxLength: 14,
                errorMessage: '用户名长度在 {minLength} 到 {maxLength} 个字符',
            },
            {
                validateFunction: function(rule, value, data, callback) {
                    // 用户名不能包含中文
                    if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value)) {
                        callback('用户名不能包含中文');
                    }
                    return true;
                }
            }
        ],
        "label": "用户名"
    },
    "password": {
        "rules": [
            {
                required: true,
                errorMessage: '请输入密码',
            },
            {
                minLength: 6,
                maxLength: 20,
                errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
            },
            {
                validateFunction: function(rule, value, data, callback) {
                    // 密码不能包含中文
                    if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value)) {
                        callback('密码不能包含中文');
                    }
                    return true;
                }
            }
        ],
        "label": "密码"
    },
    "password2": {
        "rules": [
            {
                required: true,
                errorMessage: '请再次输入密码',
            },
            {
                minLength: 6,
                maxLength: 20,
                errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
            },
            {
                validateFunction: function(rule, value, data, callback) {
                    // 密码不能包含中文
                    if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value)) {
                        callback('密码不能包含中文');
                    }
                    // 密码两次输入必须一致
                    if (value !== data.password) {
                        callback('两次输入的密码不一致');
                    }
                    return true;
                }
            }
        ],
        "label": "确认密码"
    }
};