"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("./validator.js");
const uni_modules_uniIdPages_common_loginPage_mixin = require("../../common/login-page.mixin.js");
const uni_modules_uniIdPages_common_password = require("../../common/password.js");
const uniIdCo = common_vendor.nr.importObject("uni-id-co");
const _sfc_main = {
  mixins: [uni_modules_uniIdPages_common_loginPage_mixin.mixin],
  data() {
    return {
      formData: {
        email: "",
        nickname: "",
        password: "",
        password2: "",
        code: ""
      },
      rules: {
        email: {
          rules: [
            {
              required: true,
              errorMessage: "请输入邮箱"
            },
            {
              format: "email",
              errorMessage: "邮箱格式不正确"
            }
          ]
        },
        nickname: {
          rules: [
            {
              minLength: 3,
              maxLength: 32,
              errorMessage: "昵称长度在 {minLength} 到 {maxLength} 个字符"
            },
            {
              validateFunction: function(rule, value, data, callback) {
                if (/^1\d{10}$/.test(value) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
                  callback("昵称不能是：手机号或邮箱");
                }
                if (/^\d+$/.test(value)) {
                  callback("昵称不能为纯数字");
                }
                if (/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(value)) {
                  callback("昵称不能包含中文");
                }
                return true;
              }
            }
          ],
          label: "昵称"
        },
        ...uni_modules_uniIdPages_common_password.passwordMod.getPwdRules(),
        code: {
          rules: [
            {
              required: true,
              errorMessage: "请输入邮箱验证码"
            },
            {
              pattern: /^.{6}$/,
              errorMessage: "邮箱验证码不正确"
            }
          ]
        }
      },
      focusEmail: false,
      focusNickname: false,
      focusPassword: false,
      focusPassword2: false,
      logo: "/static/logo.png"
    };
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  onShow() {
  },
  methods: {
    /**
     * 触发表单提交
     */
    submit() {
      this.$refs.form.validate().then((res) => {
        if (this.needAgreements && !this.agree) {
          return this.$refs.agreements.popup(() => {
            this.submitForm(res);
          });
        }
        this.submitForm(res);
      }).catch((errors) => {
        let key = errors[0].key;
        key = key.replace(key[0], key[0].toUpperCase());
        this["focus" + key] = true;
      });
    },
    submitForm(params) {
      uniIdCo.registerUserByEmail(this.formData).then((e) => {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withpwd",
          complete: (e2) => {
          }
        });
      }).catch((e) => {
        common_vendor.index.__f__("log", "at uni_modules/uni-id-pages/pages/register/register-by-email.vue:163", e.message);
      });
    },
    navigateBack() {
      common_vendor.index.navigateBack();
    },
    toLogin() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    },
    registerByUserName() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/register/register"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_id_pages_email_form2 = common_vendor.resolveComponent("uni-id-pages-email-form");
  const _easycom_uni_id_pages_agreements2 = common_vendor.resolveComponent("uni-id-pages-agreements");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_id_pages_email_form2 + _easycom_uni_id_pages_agreements2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_id_pages_email_form = () => "../../components/uni-id-pages-email-form/uni-id-pages-email-form.js";
const _easycom_uni_id_pages_agreements = () => "../../components/uni-id-pages-agreements/uni-id-pages-agreements.js";
const _easycom_uni_forms = () => "../../../uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_id_pages_email_form + _easycom_uni_id_pages_agreements + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.logo,
    b: common_vendor.o(($event) => $data.focusEmail = false),
    c: common_vendor.o(($event) => $data.formData.email = $event),
    d: common_vendor.p({
      inputBorder: false,
      focus: $data.focusEmail,
      placeholder: "请输入邮箱",
      trim: "both",
      modelValue: $data.formData.email
    }),
    e: common_vendor.p({
      name: "email",
      required: true
    }),
    f: common_vendor.o(($event) => $data.focusNickname = false),
    g: common_vendor.o(($event) => $data.formData.nickname = $event),
    h: common_vendor.p({
      inputBorder: false,
      focus: $data.focusNickname,
      placeholder: "请输入用户昵称",
      trim: "both",
      modelValue: $data.formData.nickname
    }),
    i: common_vendor.p({
      name: "nickname"
    }),
    j: common_vendor.o(($event) => $data.focusPassword = false),
    k: common_vendor.o(($event) => $data.formData.password = $event),
    l: common_vendor.p({
      inputBorder: false,
      focus: $data.focusPassword,
      maxlength: "20",
      placeholder: "请输入" + (_ctx.config.passwordStrength == "weak" ? "6" : "8") + "-16位密码",
      type: "password",
      trim: "both",
      modelValue: $data.formData.password
    }),
    m: common_vendor.o(($event) => $data.formData.password = $event),
    n: common_vendor.p({
      name: "password",
      required: true,
      modelValue: $data.formData.password
    }),
    o: common_vendor.o(($event) => $data.focusPassword2 = false),
    p: common_vendor.o(($event) => $data.formData.password2 = $event),
    q: common_vendor.p({
      inputBorder: false,
      focus: $data.focusPassword2,
      placeholder: "再次输入密码",
      maxlength: "20",
      type: "password",
      trim: "both",
      modelValue: $data.formData.password2
    }),
    r: common_vendor.o(($event) => $data.formData.password2 = $event),
    s: common_vendor.p({
      name: "password2",
      required: true,
      modelValue: $data.formData.password2
    }),
    t: common_vendor.sr("shortCode", "7355cb2a-10,7355cb2a-9"),
    v: common_vendor.o(($event) => $data.formData.code = $event),
    w: common_vendor.p({
      email: $data.formData.email,
      type: "register",
      modelValue: $data.formData.code
    }),
    x: common_vendor.p({
      name: "code"
    }),
    y: common_vendor.sr("agreements", "7355cb2a-11,7355cb2a-0"),
    z: common_vendor.p({
      scope: "register"
    }),
    A: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    B: common_vendor.o((...args) => $options.navigateBack && $options.navigateBack(...args)),
    C: common_vendor.o((...args) => $options.registerByUserName && $options.registerByUserName(...args)),
    D: common_vendor.o((...args) => $options.toLogin && $options.toLogin(...args)),
    E: common_vendor.sr("form", "7355cb2a-0"),
    F: common_vendor.p({
      value: $data.formData,
      rules: $data.rules,
      ["validate-trigger"]: "submit",
      ["err-show-type"]: "toast"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-id-pages/pages/register/register-by-email.js.map
