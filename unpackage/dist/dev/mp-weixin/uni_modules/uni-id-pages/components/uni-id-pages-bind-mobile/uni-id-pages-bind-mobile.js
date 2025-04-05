"use strict";
const common_vendor = require("../../../../common/vendor.js");
const db = common_vendor.nr.database();
db.collection("uni-id-users");
const uniIdCo = common_vendor.nr.importObject("uni-id-co");
const _sfc_main = {
  emits: ["success"],
  computed: {},
  data() {
    return {};
  },
  methods: {
    async beforeGetphonenumber() {
      return await new Promise((resolve, reject) => {
        common_vendor.index.showLoading({ mask: true });
        common_vendor.wx$1.checkSession({
          success() {
            resolve();
            common_vendor.index.hideLoading();
          },
          fail() {
            common_vendor.wx$1.login({
              success({
                code
              }) {
                common_vendor.nr.importObject("uni-id-co", {
                  customUI: true
                }).loginByWeixin({ code }).then((e) => {
                  resolve();
                }).catch((e) => {
                  common_vendor.index.__f__("log", "at uni_modules/uni-id-pages/components/uni-id-pages-bind-mobile/uni-id-pages-bind-mobile.vue:46", e);
                  reject();
                }).finally((e) => {
                  common_vendor.index.hideLoading();
                });
              },
              fail: (err) => {
                common_vendor.index.__f__("error", "at uni_modules/uni-id-pages/components/uni-id-pages-bind-mobile/uni-id-pages-bind-mobile.vue:53", err);
                reject();
              }
            });
          }
        });
      });
    },
    async bindMobileByMpWeixin(e) {
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        await this.beforeGetphonenumber();
        uniIdCo.bindMobileByMpWeixin(e.detail).then((e2) => {
          this.$emit("success");
        }).finally((e2) => {
          this.closeMe();
        });
      } else {
        this.closeMe();
      }
    },
    async open() {
      this.$refs.popup.open();
    },
    closeMe(e) {
      this.$refs.popup.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.closeMe && $options.closeMe(...args)),
    b: common_vendor.o((...args) => $options.bindMobileByMpWeixin && $options.bindMobileByMpWeixin(...args)),
    c: common_vendor.sr("popup", "e0127e04-0"),
    d: common_vendor.p({
      type: "bottom"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e0127e04"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-id-pages/components/uni-id-pages-bind-mobile/uni-id-pages-bind-mobile.js.map
