"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_uniIdPages_common_password = require("../../../common/password.js");
const uni_modules_uniIdPages_common_store = require("../../../common/store.js");
const uni_modules_uniIdPages_config = require("../../../config.js");
const uniIdCo = common_vendor.nr.importObject("uni-id-co", {
  customUI: true
});
const _sfc_main = {
  name: "set-pwd.vue",
  data() {
    return {
      uniIdRedirectUrl: "",
      loginType: "",
      logo: "/static/logo.png",
      focusNewPassword: false,
      focusNewPassword2: false,
      allowSkip: false,
      formData: {
        code: "",
        captcha: "",
        newPassword: "",
        newPassword2: ""
      },
      rules: uni_modules_uniIdPages_common_password.passwordMod.getPwdRules("newPassword", "newPassword2")
    };
  },
  computed: {
    userInfo() {
      return uni_modules_uniIdPages_common_store.store.userInfo;
    }
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  onLoad(e) {
    var _a;
    this.uniIdRedirectUrl = e.uniIdRedirectUrl;
    this.loginType = e.loginType;
    if (uni_modules_uniIdPages_config.config.setPasswordAfterLogin && ((_a = uni_modules_uniIdPages_config.config.setPasswordAfterLogin) == null ? void 0 : _a.allowSkip)) {
      this.allowSkip = true;
    }
  },
  methods: {
    submit() {
      if (!/^\d{6}$/.test(this.formData.code)) {
        this.$refs.smsCode.focusSmsCodeInput = true;
        return common_vendor.index.showToast({
          title: "验证码格式不正确",
          icon: "none"
        });
      }
      this.$refs.form.validate().then((res) => {
        uniIdCo.setPwd({
          password: this.formData.newPassword,
          code: this.formData.code,
          captcha: this.formData.captcha
        }).then((e) => {
          common_vendor.index.showModal({
            content: "密码设置成功",
            showCancel: false,
            success: () => {
              uni_modules_uniIdPages_common_store.mutations.loginBack({
                uniIdRedirectUrl: this.uniIdRedirectUrl,
                loginType: this.loginType
              });
            }
          });
        }).catch((e) => {
          common_vendor.index.showModal({
            content: e.message,
            showCancel: false
          });
        });
      }).catch((e) => {
        if (e.errCode == "uni-id-captcha-required") {
          this.$refs.popup.open();
        } else {
          common_vendor.index.__f__("log", "at uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd.vue:117", e.errMsg);
        }
      }).finally((e) => {
        this.formData.captcha = "";
      });
    },
    skip() {
      uni_modules_uniIdPages_common_store.mutations.loginBack({
        uniIdRedirectUrl: this.uniIdRedirectUrl
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
const _easycom_uni_easyinput = () => "../../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../../uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_id_pages_sms_form = () => "../../../components/uni-id-pages-sms-form/uni-id-pages-sms-form.js";
const _easycom_uni_forms = () => "../../../../uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup_captcha = () => "../../../../uni-captcha/components/uni-popup-captcha/uni-popup-captcha.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_id_pages_sms_form + _easycom_uni_forms + _easycom_uni_popup_captcha)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.logo,
    b: common_vendor.o(($event) => $data.focusNewPassword = false),
    c: common_vendor.o(($event) => $data.formData.newPassword = $event),
    d: common_vendor.p({
      focus: $data.focusNewPassword,
      type: "password",
      inputBorder: false,
      placeholder: "请输入密码",
      modelValue: $data.formData.newPassword
    }),
    e: common_vendor.p({
      name: "newPassword"
    }),
    f: common_vendor.o(($event) => $data.focusNewPassword2 = false),
    g: common_vendor.o(($event) => $data.formData.newPassword2 = $event),
    h: common_vendor.p({
      focus: $data.focusNewPassword2,
      type: "password",
      inputBorder: false,
      placeholder: "请再次输入新密码",
      modelValue: $data.formData.newPassword2
    }),
    i: common_vendor.p({
      name: "newPassword2"
    }),
    j: common_vendor.sr("smsCode", "e5e1f63f-5,e5e1f63f-0"),
    k: common_vendor.o(($event) => $data.formData.code = $event),
    l: common_vendor.p({
      type: "set-pwd-by-sms",
      phone: $options.userInfo.mobile,
      modelValue: $data.formData.code
    }),
    m: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    n: $data.allowSkip
  }, $data.allowSkip ? {
    o: common_vendor.o((...args) => $options.skip && $options.skip(...args))
  } : {}, {
    p: common_vendor.sr("form", "e5e1f63f-0"),
    q: common_vendor.p({
      value: $data.formData,
      ["err-show-type"]: "toast"
    }),
    r: common_vendor.sr("popup", "e5e1f63f-6"),
    s: common_vendor.o($options.submit),
    t: common_vendor.o(($event) => $data.formData.captcha = $event),
    v: common_vendor.p({
      scene: "set-pwd-by-sms",
      modelValue: $data.formData.captcha
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e5e1f63f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd.js.map
