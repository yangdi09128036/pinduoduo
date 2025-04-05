"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onLoad() {
  },
  methods: {
    cancel() {
      common_vendor.index.navigateBack();
    },
    nextStep() {
      common_vendor.index.showModal({
        content: "已经仔细阅读注销提示，知晓可能带来的后果，并确认要注销",
        complete: (e) => {
          if (e.confirm) {
            const uniIdco = common_vendor.nr.importObject("uni-id-co");
            uniIdco.closeAccount().then((e2) => {
              common_vendor.index.showToast({
                title: "注销成功",
                duration: 3e3
              });
              common_vendor.index.removeStorageSync("uni_id_token");
              common_vendor.index.setStorageSync("uni_id_token_expired", 0);
              common_vendor.index.navigateTo({
                url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
              });
            });
          } else {
            common_vendor.index.navigateBack();
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.nextStep && $options.nextStep(...args)),
    b: common_vendor.o((...args) => $options.cancel && $options.cancel(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate.js.map
