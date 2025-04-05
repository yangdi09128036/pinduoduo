"use strict";
const common_vendor = require("../../../../common/vendor.js");
function debounce(func, wait) {
  let timer;
  wait = wait || 500;
  return function() {
    let context = this;
    let args = arguments;
    if (timer)
      clearTimeout(timer);
    let callNow = !timer;
    timer = setTimeout(() => {
      timer = null;
    }, wait);
    if (callNow)
      func.apply(context, args);
  };
}
const _sfc_main = {
  name: "uni-email-code-form",
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: {
    event: ["update:modelValue"],
    /**
     * 倒计时时长 s
     */
    count: {
      type: [String, Number],
      default: 60
    },
    /**
     * 邮箱
     */
    email: {
      type: [String],
      default: ""
    },
    /*
    	验证码类型，用于防止不同功能的验证码混用，目前支持的类型login登录、register注册、bind绑定邮箱、unbind解绑邮箱
    */
    type: {
      type: String,
      default() {
        return "register";
      }
    },
    /*
    	验证码输入框是否默认获取焦点
    */
    focusCaptchaInput: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      captcha: "",
      reverseNumber: 0,
      reverseTimer: null,
      modelValue: "",
      focusEmailCodeInput: false
    };
  },
  watch: {
    captcha(value, oldValue) {
      if (value.length == 4 && oldValue.length != 4) {
        this.start();
      }
    },
    modelValue(value) {
      this.$emit("input", value);
      this.$emit("update:modelValue", value);
    }
  },
  computed: {
    innerText() {
      if (this.reverseNumber == 0)
        return "获取邮箱验证码";
      return "重新发送(" + this.reverseNumber + "s)";
    }
  },
  created() {
    this.initClick();
  },
  methods: {
    getImageCaptcha(focus) {
      this.$refs.captcha.getImageCaptcha(focus);
    },
    initClick() {
      this.start = debounce(() => {
        if (this.reverseNumber != 0)
          return;
        this.sendMsg();
      });
    },
    sendMsg() {
      if (this.captcha.length != 4) {
        this.$refs.captcha.focusCaptchaInput = true;
        return common_vendor.index.showToast({
          title: "请先输入图形验证码",
          icon: "none",
          duration: 3e3
        });
      }
      if (!this.email)
        return common_vendor.index.showToast({
          title: "请输入邮箱",
          icon: "none",
          duration: 3e3
        });
      let reg_email = /@/;
      if (!reg_email.test(this.email))
        return common_vendor.index.showToast({
          title: "邮箱格式错误",
          icon: "none",
          duration: 3e3
        });
      const uniIdCo = common_vendor.nr.importObject("uni-id-co", {
        customUI: true
      });
      common_vendor.index.__f__("log", "at uni_modules/uni-id-pages/components/uni-id-pages-email-form/uni-id-pages-email-form.vue:144", "sendEmailCode", {
        "email": this.email,
        "scene": this.type,
        "captcha": this.captcha
      });
      uniIdCo.sendEmailCode({
        "email": this.email,
        "scene": this.type,
        "captcha": this.captcha
      }).then((result) => {
        common_vendor.index.showToast({
          title: "邮箱验证码发送成功",
          icon: "none",
          duration: 3e3
        });
        this.reverseNumber = Number(this.count);
        this.getCode();
      }).catch((e) => {
        if (e.code == "uni-id-invalid-mail-template") {
          this.modelValue = "123456";
          common_vendor.index.showToast({
            title: "已启动测试模式,详情【控制台信息】",
            icon: "none",
            duration: 3e3
          });
          common_vendor.index.__f__("warn", "at uni_modules/uni-id-pages/components/uni-id-pages-email-form/uni-id-pages-email-form.vue:169", e.message);
        } else {
          this.getImageCaptcha();
          this.captcha = "";
          common_vendor.index.showToast({
            title: e.message,
            icon: "none",
            duration: 3e3
          });
        }
      });
    },
    getCode() {
      if (this.reverseNumber == 0) {
        clearTimeout(this.reverseTimer);
        this.reverseTimer = null;
        return;
      }
      this.reverseNumber--;
      this.reverseTimer = setTimeout(() => {
        this.getCode();
      }, 1e3);
    }
  }
};
if (!Array) {
  const _easycom_uni_captcha2 = common_vendor.resolveComponent("uni-captcha");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_uni_captcha2 + _easycom_uni_easyinput2)();
}
const _easycom_uni_captcha = () => "../../../uni-captcha/components/uni-captcha/uni-captcha.js";
const _easycom_uni_easyinput = () => "../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_captcha + _easycom_uni_easyinput)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("captcha", "bcd6b47b-0"),
    b: common_vendor.o(($event) => $data.captcha = $event),
    c: common_vendor.p({
      focus: $props.focusCaptchaInput,
      scene: "send-email-code",
      modelValue: $data.captcha
    }),
    d: common_vendor.o(($event) => $data.focusEmailCodeInput = false),
    e: common_vendor.o(($event) => $data.modelValue = $event),
    f: common_vendor.p({
      focus: $data.focusEmailCodeInput,
      type: "number",
      inputBorder: false,
      maxlength: "6",
      placeholder: "请输入邮箱验证码",
      modelValue: $data.modelValue
    }),
    g: common_vendor.t($options.innerText),
    h: common_vendor.n($data.reverseNumber == 0 ? "inner-text-active" : ""),
    i: common_vendor.o((...args) => _ctx.start && _ctx.start(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bcd6b47b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-id-pages/components/uni-id-pages-email-form/uni-id-pages-email-form.js.map
