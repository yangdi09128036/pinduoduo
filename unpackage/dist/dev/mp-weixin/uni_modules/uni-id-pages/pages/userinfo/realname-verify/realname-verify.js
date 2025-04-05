"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_uniIdPages_common_loginPage_mixin = require("../../../common/login-page.mixin.js");
const uni_modules_uniIdPages_common_store = require("../../../common/store.js");
const common_assets = require("../../../../../common/assets.js");
common_vendor.nr.importObject("uni-id-co");
const tempFrvInfoKey = "uni-id-pages-temp-frv";
const _sfc_main = {
  mixins: [uni_modules_uniIdPages_common_loginPage_mixin.mixin],
  data() {
    return {
      realName: "",
      idCard: "",
      certifyId: "",
      verifyFail: false,
      verifyFailCode: 0,
      verifyFailTitle: "",
      verifyFailContent: ""
    };
  },
  computed: {
    userInfo() {
      return uni_modules_uniIdPages_common_store.store.userInfo;
    },
    certifyIdNext() {
      return Boolean(this.realName) && Boolean(this.idCard) && (this.needAgreements && this.agree);
    },
    isCertify() {
      return this.userInfo.realNameAuth && this.userInfo.realNameAuth.authStatus === 2;
    },
    isDev() {
      return true;
    }
  },
  onLoad() {
    const tempFrvInfo = common_vendor.index.getStorageSync(tempFrvInfoKey);
    if (tempFrvInfo) {
      this.realName = tempFrvInfo.realName;
      this.idCard = tempFrvInfo.idCard;
    }
  },
  methods: {
    async getCertifyId() {
      if (!this.certifyIdNext)
        return;
      return common_vendor.index.showModal({
        content: "暂不支持实名认证",
        showCancel: false
      });
    },
    startFacialRecognitionVerify() {
    },
    async getFrvAuthResult() {
      const uniIdCo2 = common_vendor.nr.importObject("uni-id-co", {
        customUI: true
      });
      try {
        common_vendor.index.showLoading({
          title: "验证中...",
          mask: false
        });
        const res = await uniIdCo2.getFrvAuthResult({
          certifyId: this.certifyId
        });
        const {
          errCode,
          ...rest
        } = res;
        if (this.verifyFailContent) {
          common_vendor.index.__f__("log", "at uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify.vue:216", `[frv-debug] 客户端刷脸失败，由实人认证服务查询具体原因，原因：${this.verifyFailContent}`);
        }
        common_vendor.index.showModal({
          content: "实名认证成功",
          showCancel: false,
          success: () => {
            uni_modules_uniIdPages_common_store.mutations.setUserInfo({
              realNameAuth: rest
            });
            this.verifyFail = false;
          }
        });
        common_vendor.index.removeStorage({
          key: tempFrvInfoKey
        });
      } catch (e) {
        this.verifyFail = true;
        this.verifyFailTitle = e.errMsg;
        common_vendor.index.__f__("error", "at uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify.vue:236", JSON.stringify(e));
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    retry() {
      if (this.verifyFailCode !== 10013) {
        this.getCertifyId();
      } else {
        this.verifyFail = false;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_id_pages_agreements2 = common_vendor.resolveComponent("uni-id-pages-agreements");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_id_pages_agreements2)();
}
const _easycom_uni_list_item = () => "../../../../uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni-list/components/uni-list/uni-list.js";
const _easycom_uni_easyinput = () => "../../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../../uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../../uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_id_pages_agreements = () => "../../../components/uni-id-pages-agreements/uni-id-pages-agreements.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_id_pages_agreements)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.isCertify
  }, $options.isCertify ? {
    b: common_vendor.p({
      title: "姓名",
      rightText: $options.userInfo.realNameAuth.realName
    }),
    c: common_vendor.p({
      title: "身份证号码",
      rightText: $options.userInfo.realNameAuth.identity
    })
  } : common_vendor.e({
    d: $data.verifyFail
  }, $data.verifyFail ? common_vendor.e({
    e: common_assets._imports_0$1,
    f: common_vendor.t($data.verifyFailTitle),
    g: common_vendor.t($data.verifyFailContent),
    h: $data.verifyFailCode !== 10013
  }, $data.verifyFailCode !== 10013 ? {
    i: common_vendor.o((...args) => $options.retry && $options.retry(...args))
  } : {
    j: common_vendor.o((...args) => $options.retry && $options.retry(...args))
  }, {
    k: $options.isDev
  }, $options.isDev ? {} : {}) : {
    l: common_vendor.o(($event) => $data.realName = $event),
    m: common_vendor.p({
      placeholder: "姓名",
      clearable: false,
      modelValue: $data.realName
    }),
    n: common_vendor.p({
      name: "realName"
    }),
    o: common_vendor.o(($event) => $data.idCard = $event),
    p: common_vendor.p({
      placeholder: "身份证号码",
      clearable: false,
      modelValue: $data.idCard
    }),
    q: common_vendor.p({
      name: "idCard"
    }),
    r: common_vendor.sr("agreements", "1457479c-8"),
    s: common_vendor.p({
      scope: "realNameVerify"
    }),
    t: !$options.certifyIdNext,
    v: common_vendor.o((...args) => $options.getCertifyId && $options.getCertifyId(...args))
  }));
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify.js.map
