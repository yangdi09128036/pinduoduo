"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniIdPages_common_loginPage_mixin = require("../../common/login-page.mixin.js");
const common_assets = require("../../../../common/assets.js");
const uniIdCo = common_vendor.nr.importObject("uni-id-co", {
  errorOptions: {
    type: "toast"
  }
});
const _sfc_main = {
  mixins: [uni_modules_uniIdPages_common_loginPage_mixin.mixin],
  data() {
    return {
      password: "",
      username: "",
      focusUsername: false,
      focusPassword: false,
      logo: "/static/logo.png"
    };
  },
  onShow() {
  },
  methods: {
    toRetrievePwd() {
      common_vendor.index.showToast({
        icon: "error",
        title: "该功能暂未实现"
      });
    },
    pwdLogin() {
      if (!this.username.length) {
        this.focusUsername = true;
        return common_vendor.index.showToast({
          title: "请输入用户名",
          icon: "none",
          duration: 3e3
        });
      }
      if (!this.password.length) {
        this.focusPassword = true;
        return common_vendor.index.showToast({
          title: "请输入密码",
          icon: "none",
          duration: 3e3
        });
      }
      if (this.needAgreements && !this.agree) {
        return this.$refs.agreements.popup(this.pwdLogin);
      }
      let data = {
        password: this.password
      };
      if (/^1\d{10}$/.test(this.username)) {
        data.mobile = this.username;
      } else if (/@/.test(this.username)) {
        data.email = this.username;
      } else {
        data.username = this.username;
      }
      uniIdCo.login(data).then((e) => {
        this.loginSuccess(e);
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "success",
          duration: 1e3
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }, 1e3);
      }).catch((e) => {
        common_vendor.index.__f__("error", "at uni_modules/uni-id-pages/pages/login/login-withpwd.vue:117", "登录失败：", e);
        let errorMessage = "登录失败，请重试";
        if (e.errCode === "uni-id-captcha-required") {
          errorMessage = "需要验证码登录，请稍后重试";
        } else if (e.message) {
          errorMessage = e.message;
        }
        common_vendor.index.showToast({
          title: errorMessage,
          icon: "none",
          duration: 3e3
        });
      });
    },
    toRegister() {
      common_vendor.index.navigateTo({
        url: this.config.isAdmin ? "/uni_modules/uni-id-pages/pages/register/register-admin" : "/uni_modules/uni-id-pages/pages/register/register",
        fail(e) {
          common_vendor.index.__f__("error", "at uni_modules/uni-id-pages/pages/login/login-withpwd.vue:139", e);
        }
      });
    },
    wechat() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
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
  return common_vendor.e({
    a: common_assets._imports_0,
    b: common_vendor.o(($event) => $data.focusUsername = false),
    c: common_vendor.o(($event) => $data.username = $event),
    d: common_vendor.p({
      focus: $data.focusUsername,
      inputBorder: false,
      placeholder: "请输入用户名",
      trim: "all",
      modelValue: $data.username
    }),
    e: common_vendor.p({
      name: "username"
    }),
    f: common_vendor.o(($event) => $data.focusPassword = false),
    g: common_vendor.o(($event) => $data.password = $event),
    h: common_vendor.p({
      focus: $data.focusPassword,
      clearable: true,
      type: "password",
      inputBorder: false,
      placeholder: "请输入密码",
      trim: "all",
      modelValue: $data.password
    }),
    i: common_vendor.p({
      name: "password"
    }),
    j: common_vendor.o((...args) => $options.pwdLogin && $options.pwdLogin(...args)),
    k: !_ctx.config.isAdmin
  }, !_ctx.config.isAdmin ? {
    l: common_vendor.o((...args) => $options.toRetrievePwd && $options.toRetrievePwd(...args))
  } : {}, {
    m: common_vendor.t(_ctx.config.isAdmin ? "注册管理员账号" : "注册账号"),
    n: common_vendor.o((...args) => $options.toRegister && $options.toRegister(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-id-pages/pages/login/login-withpwd.js.map
