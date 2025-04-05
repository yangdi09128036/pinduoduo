const {
  postRegister,
  preRegisterWithPassword
} = require('../../lib/utils/register');
const {
  verifyCaptcha
} = require('../../lib/utils/captcha');
const {
  CAPTCHA_SCENE
} = require('../../common/constants');

/**
 * 注册普通用户
 * @tutorial <url id="cuovka7hvlti1m3600o0" type="url" status="parsed" title="uniCloud" wc="629">https://uniapp.dcloud.net.cn/uniCloud/uni-id-pages.html#register-user</url> 
 * @param {Object} params
 * @param {String} params.username    用户名
 * @param {String} params.password    密码
 * @param {String} params.captcha     图形验证码
 * @param {String} params.nickname    昵称
 * @param {String} params.inviteCode  邀请码
 * @returns
 */
module.exports = async function (params = {}) {
  const schema = {
    username: 'username',
    password: 'password',
    captcha: {required: false, type: 'string'}, // 将 captcha 设置为非必填
    nickname: {
      required: false,
      type: 'nickname'
    },
    inviteCode: {
      required: false,
      type: 'string'
    }
  };
  this.middleware.validate(params, schema);
  const {
    username,
    password,
    nickname,
    captcha,
    inviteCode
  } = params;

  // 如果需要验证码校验，可以保留以下代码；否则可以注释掉或移除
  // await verifyCaptcha.call(this, {
  //   captcha,
  //   scene: CAPTCHA_SCENE.REGISTER
  // });

  const {
    user,
    extraData
  } = await preRegisterWithPassword.call(this, {
    user: {
      username
    },
    password
  });
  return postRegister.call(this, {
    user,
    extraData: {
      ...extraData,
      nickname
    },
    inviteCode
  });
};