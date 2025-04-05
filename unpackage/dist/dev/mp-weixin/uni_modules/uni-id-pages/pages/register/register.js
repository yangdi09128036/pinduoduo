"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniIdPages_pages_register_validator = require("./validator.js");
const uni_modules_uniIdPages_common_loginPage_mixin = require("../../common/login-page.mixin.js");
require("../../common/store.js");
const common_assets = require("../../../../common/assets.js");
const uniIdCo = common_vendor.nr.importObject("uni-id-co");
const _sfc_main = {
  mixins: [uni_modules_uniIdPages_common_loginPage_mixin.mixin],
  data() {
    return {
      formData: {
        username: "",
        password: "",
        password2: ""
      },
      rules: uni_modules_uniIdPages_pages_register_validator.rules,
      focusUsername: false,
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
      uniIdCo.registerUser(this.formData).then((e) => {
        this.loginSuccess(e);
        common_vendor.index.showToast({
          title: "注册成功",
          icon: "success",
          duration: 2e3
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({
            url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
          });
        }, 2e3);
      }).catch((e) => {
        common_vendor.index.__f__("error", "at uni_modules/uni-id-pages/pages/register/register.vue:122", "注册失败：", e);
        let errorMessage = "注册失败，请重试";
        if (e.msg) {
          errorMessage = e.msg;
        }
        common_vendor.index.showToast({
          title: errorMessage,
          icon: "none",
          duration: 3e3
        });
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
    registerByEmail() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/register/register-by-email"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.o(($event) => $data.focusUsername = false),
    c: common_vendor.o(($event) => $data.formData.username = $event),
    d: common_vendor.p({
      focus: $data.focusUsername,
      inputBorder: false,
      placeholder: "请输入用户名",
      trim: "both",
      modelValue: $data.formData.username
    }),
    e: common_vendor.p({
      name: "username",
      required: true
    }),
    f: common_vendor.o(($event) => $data.focusPassword = false),
    g: common_vendor.o(($event) => $data.formData.password = $event),
    h: common_vendor.p({
      focus: $data.focusPassword,
      maxlength: "20",
      placeholder: "请输入" + (_ctx.config.passwordStrength == "weak" ? "6" : "8") + "-16位密码",
      type: "password",
      trim: "both",
      modelValue: $data.formData.password
    }),
    i: common_vendor.p({
      name: "password",
      required: true
    }),
    j: common_vendor.o(($event) => $data.focusPassword2 = false),
    k: common_vendor.o(($event) => $data.formData.password2 = $event),
    l: common_vendor.p({
      focus: $data.focusPassword2,
      maxlength: "20",
      placeholder: "再次输入密码",
      type: "password",
      trim: "both",
      modelValue: $data.formData.password2
    }),
    m: common_vendor.p({
      name: "password2",
      required: true
    }),
    n: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    o: common_vendor.o((...args) => $options.navigateBack && $options.navigateBack(...args)),
    p: common_vendor.sr("form", "9c5c69d0-0"),
    q: common_vendor.p({
      value: $data.formData,
      rules: $data.rules,
      ["validate-trigger"]: "submit",
      ["err-show-type"]: "toast"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-id-pages/pages/register/register.js.map
