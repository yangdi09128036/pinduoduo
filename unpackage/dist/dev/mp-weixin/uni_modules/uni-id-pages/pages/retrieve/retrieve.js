"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniIdPages_common_loginPage_mixin = require("../../common/login-page.mixin.js");
const uniIdCo = common_vendor.nr.importObject("uni-id-co", {
  errorOptions: {
    type: "toast"
  }
});
const _sfc_main = {
  mixins: [uni_modules_uniIdPages_common_loginPage_mixin.mixin],
  data() {
    return {
      lock: false,
      focusPhone: true,
      focusPassword: false,
      focusPassword2: false,
      formData: {
        "phone": "",
        "code": "",
        "password": "",
        "password2": "",
        "captcha": ""
      },
      rules: {
        phone: {
          rules: [
            {
              required: true,
              errorMessage: "请输入手机号"
            },
            {
              pattern: /^1\d{10}$/,
              errorMessage: "手机号码格式不正确"
            }
          ]
        },
        code: {
          rules: [
            {
              required: true,
              errorMessage: "请输入短信验证码"
            },
            {
              pattern: /^.{6}$/,
              errorMessage: "请输入6位验证码"
            }
          ]
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: "请输入新密码"
            },
            {
              pattern: /^.{6,20}$/,
              errorMessage: "密码为6 - 20位"
            }
          ]
        },
        password2: {
          rules: [
            {
              required: true,
              errorMessage: "请确认密码"
            },
            {
              pattern: /^.{6,20}$/,
              errorMessage: "密码为6 - 20位"
            },
            {
              validateFunction: function(rule, value, data, callback) {
                if (value != data.password) {
                  callback("两次输入密码不一致");
                }
                return true;
              }
            }
          ]
        }
      },
      logo: "/static/logo.png"
    };
  },
  computed: {
    isPhone() {
      let reg_phone = /^1\d{10}$/;
      let isPhone = reg_phone.test(this.formData.phone);
      return isPhone;
    },
    isPwd() {
      let reg_pwd = /^.{6,20}$/;
      let isPwd = reg_pwd.test(this.formData.password);
      return isPwd;
    },
    isCode() {
      let reg_code = /^\d{6}$/;
      let isCode = reg_code.test(this.formData.code);
      return isCode;
    }
  },
  onLoad(event) {
    if (event && event.phoneNumber) {
      this.formData.phone = event.phoneNumber;
      if (event.lock) {
        this.lock = event.lock;
        this.focusPhone = true;
      }
    }
  },
  onReady() {
    if (this.formData.phone) {
      this.$refs.shortCode.start();
    }
    this.$refs.form.setRules(this.rules);
  },
  onShow() {
  },
  methods: {
    /**
     * 完成并提交
     */
    submit() {
      this.$refs.form.validate().then((res) => {
        let {
          "phone": mobile,
          "password": password,
          captcha,
          code
        } = this.formData;
        uniIdCo.resetPwdBySms({
          mobile,
          code,
          password,
          captcha
        }).then((e) => {
          common_vendor.index.navigateBack();
        }).catch((e) => {
          if (e.errCode == "uni-id-captcha-required") {
            this.$refs.popup.open();
          }
        }).finally((e) => {
          this.formData.captcha = "";
        });
      }).catch((errors) => {
        let key = errors[0].key;
        if (key == "code") {
          return this.$refs.shortCode.focusSmsCodeInput = true;
        }
        key = key.replace(key[0], key[0].toUpperCase());
        this["focus" + key] = true;
      });
    },
    retrieveByEmail() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email"
      });
    },
    backLogin() {
      common_vendor.index.redirectTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_id_pages_sms_form2 = common_vendor.resolveComponent("uni-id-pages-sms-form");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup_captcha2 = common_vendor.resolveComponent("uni-popup-captcha");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_id_pages_sms_form2 + _easycom_uni_forms2 + _easycom_uni_popup_captcha2)();
}
const _easycom_uni_easyinput = () => "../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_id_pages_sms_form = () => "../../components/uni-id-pages-sms-form/uni-id-pages-sms-form.js";
const _easycom_uni_forms = () => "../../../uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup_captcha = () => "../../../uni-captcha/components/uni-popup-captcha/uni-popup-captcha.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_id_pages_sms_form + _easycom_uni_forms + _easycom_uni_popup_captcha)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.logo,
    b: common_vendor.o(($event) => $data.focusPhone = false),
    c: common_vendor.o(($event) => $data.formData.phone = $event),
    d: common_vendor.p({
      focus: $data.focusPhone,
      disabled: $data.lock,
      type: "number",
      inputBorder: false,
      trim: "both",
      maxlength: "11",
      placeholder: "请输入手机号",
      modelValue: $data.formData.phone
    }),
    e: common_vendor.p({
      name: "phone"
    }),
    f: common_vendor.sr("shortCode", "80431190-4,80431190-3"),
    g: common_vendor.o(($event) => $data.formData.code = $event),
    h: common_vendor.p({
      phone: $data.formData.phone,
      type: "reset-pwd-by-sms",
      modelValue: $data.formData.code
    }),
    i: common_vendor.p({
      name: "code"
    }),
    j: common_vendor.o(($event) => $data.focusPassword = false),
    k: common_vendor.o(($event) => $data.formData.password = $event),
    l: common_vendor.p({
      focus: $data.focusPassword,
      type: "password",
      inputBorder: false,
      trim: "both",
      placeholder: "请输入新密码",
      modelValue: $data.formData.password
    }),
    m: common_vendor.p({
      name: "password"
    }),
    n: common_vendor.o(($event) => $data.focusPassword2 = false),
    o: common_vendor.o(($event) => $data.formData.password2 = $event),
    p: common_vendor.p({
      focus: $data.focusPassword2,
      type: "password",
      inputBorder: false,
      trim: "both",
      placeholder: "请再次输入新密码",
      modelValue: $data.formData.password2
    }),
    q: common_vendor.p({
      name: "password2"
    }),
    r: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    s: common_vendor.o((...args) => $options.retrieveByEmail && $options.retrieveByEmail(...args)),
    t: common_vendor.o((...args) => $options.backLogin && $options.backLogin(...args)),
    v: common_vendor.sr("form", "80431190-0"),
    w: common_vendor.p({
      value: $data.formData,
      ["err-show-type"]: "toast"
    }),
    x: common_vendor.sr("popup", "80431190-9"),
    y: common_vendor.o($options.submit),
    z: common_vendor.o(($event) => $data.formData.captcha = $event),
    A: common_vendor.p({
      scene: "reset-pwd-by-sms",
      modelValue: $data.formData.captcha
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-id-pages/pages/retrieve/retrieve.js.map
