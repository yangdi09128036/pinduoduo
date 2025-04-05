"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      username: "",
      mobile: "",
      address: ""
    };
  },
  onLoad() {
    this.loadUserInfo();
  },
  methods: {
    loadUserInfo() {
      const userInfo = uni_modules_uniIdPages_common_store.store.userInfo;
      common_vendor.index.__f__("log", "at pages/user/set.vue:53", "之前用户信息", userInfo);
      if (userInfo) {
        this.username = userInfo.username || "";
        this.mobile = userInfo.mobile || "";
        this.address = userInfo.address || "";
      }
    },
    async saveUserInfo() {
      if (!this.username || !this.mobile || !this.address) {
        common_vendor.index.showToast({
          title: "请填写完整信息",
          icon: "none"
        });
        return;
      }
      try {
        const db = common_vendor.nr.database();
        await db.collection("uni-id-users").doc(uni_modules_uniIdPages_common_store.store.userInfo._id).update({
          username: this.username,
          mobile: this.mobile,
          address: this.address
        });
        uni_modules_uniIdPages_common_store.store.userInfo = {
          ...uni_modules_uniIdPages_common_store.store.userInfo,
          username: this.username,
          mobile: this.mobile,
          address: this.address
        };
        common_vendor.index.__f__("log", "at pages/user/set.vue:83", "之后用户信息", uni_modules_uniIdPages_common_store.store.userInfo);
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/user/set.vue:93", "保存用户信息失败:", error);
        common_vendor.index.showToast({
          title: "保存失败，请重试",
          icon: "none"
        });
      }
    },
    handleBack() {
      common_vendor.index.navigateBack();
    },
    handleLogout() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.navigateTo({
              url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_id_pages_avatar2 = common_vendor.resolveComponent("uni-id-pages-avatar");
  _easycom_uni_id_pages_avatar2();
}
const _easycom_uni_id_pages_avatar = () => "../../uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar.js";
if (!Math) {
  _easycom_uni_id_pages_avatar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$4,
    b: common_vendor.o((...args) => $options.handleBack && $options.handleBack(...args)),
    c: common_vendor.p({
      width: "120rpx",
      height: "120rpx"
    }),
    d: $data.username,
    e: common_vendor.o(($event) => $data.username = $event.detail.value),
    f: $data.mobile,
    g: common_vendor.o(($event) => $data.mobile = $event.detail.value),
    h: $data.address,
    i: common_vendor.o(($event) => $data.address = $event.detail.value),
    j: common_vendor.o((...args) => $options.handleLogout && $options.handleLogout(...args)),
    k: common_vendor.o((...args) => $options.saveUserInfo && $options.saveUserInfo(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/set.js.map
