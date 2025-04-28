// 导入配置
import config from '@/uni_modules/uni-id-pages/config.js';

const { passwordStrength } = config;

// 密码强度表达式
const passwordRules = {
  // 密码必须为6-14位数字、字母和特殊符号的组合
  medium: /^(?![\u4e00-\u9fa5]+)[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{6,14}$/,
};

const ERROR = {
  normal: {
    noPwd: '请输入密码',
    noRePwd: '再次输入密码',
    rePwdErr: '两次输入密码不一致'
  },
  passwordStrengthError: {
    medium: '密码必须为6-14位数字、字母和特殊符号的组合，不能包含中文'
  }
};

function validPwd(password) {
  // 强度校验
  if (passwordStrength && passwordRules[passwordStrength]) {
    if (!new RegExp(passwordRules[passwordStrength]).test(password)) {
      return ERROR.passwordStrengthError[passwordStrength];
    }
  }
  return true;
}

function getPwdRules(pwdName = 'password', rePwdName = 'password2') {
  const rules = {};
  rules[pwdName] = {
    rules: [
      {
        required: true,
        errorMessage: ERROR.normal.noPwd,
      },
      {
        validateFunction: function (rule, value, data, callback) {
          const checkRes = validPwd(value);
          if (checkRes !== true) {
            callback(checkRes);
          }
          return true;
        }
      }
    ]
  };

  if (rePwdName) {
    rules[rePwdName] = {
      rules: [
        {
          required: true,
          errorMessage: ERROR.normal.noRePwd,
        },
        {
          validateFunction: function (rule, value, data, callback) {
            if (value != data[pwdName]) {
              callback(ERROR.normal.rePwdErr);
            }
            return true;
          }
        }
      ]
    };
  }
  return rules;
}

export default {
  ERROR,
  validPwd,
  getPwdRules
};