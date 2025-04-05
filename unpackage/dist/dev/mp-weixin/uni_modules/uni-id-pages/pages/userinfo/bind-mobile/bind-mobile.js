"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../../common/store.js");
const _sfc_main = {
  data() {
    return {
      formData: {
        mobile: "",
        code: "",
        captcha: ""
      },
      focusMobile: true,
      logo: "/static/logo.png"
    };
  },
  computed: {
    tipText() {
      return `验证码已通过短信发送至 ${this.formData.mobile}。密码为6 - 20位`;
    }
  },
  onLoad(event) {
  },
  onReady() {
  },
  methods: {
    /**
     * 完成并提交
     */
    submit() {
      if (!/^1\d{10}$/.test(this.formData.mobile)) {
        this.focusMobile = true;
        return common_vendor.index.showToast({
          title: "手机号码格式不正确",
          icon: "none",
          duration: 3e3
        });
      }
      if (!/^\d{6}$/.test(this.formData.code)) {
        this.$refs.smsForm.focusSmsCodeInput = true;
        return common_vendor.index.showToast({
          title: "验证码格式不正确",
          icon: "none",
          duration: 3e3
        });
      }
      const uniIdCo = common_vendor.nr.importObject("uni-id-co");
      uniIdCo.bindMobileBySms(this.formData).then((e) => {
        common_vendor.index.showToast({
          title: e.errMsg,
          icon: "none",
          duration: 3e3
        });
        this.getOpenerEventChannel();
        uni_modules_uniIdPages_common_store.mutations.setUserInfo(this.formData);
        common_vendor.index.navigateBack();
      }).catch((e) => {
        common_vendor.index.__f__("log", "at uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile.vue:84", e);
        if (e.errCode == "uni-id-captcha-required") {
          this.$refs.popup.open();
        }
      }).finally((e) => {
        this.formData.captcha = "";
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_id_pages_sms_form2 = common_vendor.resolveComponent("uni-id-pages-sms-form");
  const _easycom_uni_popup_captcha2 = common_vendor.resolveComponent("uni-popup-captcha");
  (_easycom_uni_easyinput2 + _easycom_uni_id_pages_sms_form2 + _easycom_uni_popup_captcha2)();
}
const _easycom_uni_easyinput = () => "../../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_id_pages_sms_form = () => "../../../components/uni-id-pages-sms-form/uni-id-pages-sms-form.js";
const _easycom_uni_popup_captcha = () => "../../../../uni-captcha/components/uni-popup-captcha/uni-popup-captcha.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_id_pages_sms_form + _easycom_uni_popup_captcha)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.logo,
    b: common_vendor.o(($event) => $data.focusMobile = false),
    c: common_vendor.o(($event) => $data.formData.mobile = $event),
    d: common_vendor.p({
      clearable: true,
      focus: $data.focusMobile,
      type: "number",
      inputBorder: false,
      maxlength: "11",
      placeholder: "请输入手机号",
      modelValue: $data.formData.mobile
    }),
    e: common_vendor.sr("smsForm", "45d0c046-1"),
    f: common_vendor.o(($event) => $data.formData.code = $event),
    g: common_vendor.p({
      type: "bind-mobile-by-sms",
      phone: $data.formData.mobile,
      modelValue: $data.formData.code
    }),
    h: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    i: common_vendor.sr("popup", "45d0c046-2"),
    j: common_vendor.o($options.submit),
    k: common_vendor.o(($event) => $data.formData.captcha = $event),
    l: common_vendor.p({
      scene: "bind-mobile-by-sms",
      modelValue: $data.formData.captcha
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile.js.map
