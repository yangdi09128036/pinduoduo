"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      refreshing: false,
      searchPlaceholder: "请输入商品信息",
      searchKeyword: "",
      allGoods: [],
      matchedGoods: [],
      randomGoods: []
    };
  },
  onLoad(options) {
    if (options.keyword) {
      this.searchKeyword = decodeURIComponent(options.keyword);
      this.searchGoods();
    } else {
      this.getRandomGoods();
    }
  },
  methods: {
    async onPullDownRefresh() {
      this.refreshing = true;
      await this.searchGoods();
      this.refreshing = false;
    },
    async getGoods() {
      try {
        const { result: { data } } = await common_vendor.nr.database().collection("mall-goods").get();
        this.allGoods = data || [];
        if (this.allGoods.length > 0) {
          this.searchPlaceholder = this.allGoods[Math.floor(Math.random() * this.allGoods.length)].keywords || "请输入商品信息";
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/search/mall-list.vue:109", "获取商品数据失败:", err);
      }
    },
    async searchGoods() {
      await this.getGoods();
      this.matchedGoods = this.allGoods.filter(
        (item) => item.keywords && item.keywords.split("").some((char) => this.searchKeyword.includes(char))
      );
      if (this.matchedGoods.length === 0) {
        this.getRandomGoods(10);
      }
    },
    getRandomGoods(count = 10) {
      const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
      this.randomGoods = shuffledGoods.slice(0, count);
    },
    navBack() {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    },
    navigateToSearch() {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    },
    navigateToProduct(item) {
      if (!item)
        return;
      common_vendor.index.setStorage({
        key: "currentProduct",
        data: item,
        success: () => {
          common_vendor.index.__f__("log", "at pages/search/mall-list.vue:142", "商品信息存储成功", item);
        }
      });
      common_vendor.index.navigateTo({
        url: "../search/mall-details"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$4,
    b: common_vendor.o((...args) => $options.navBack && $options.navBack(...args)),
    c: $data.searchPlaceholder,
    d: $data.searchKeyword,
    e: common_vendor.o(($event) => $data.searchKeyword = $event.detail.value),
    f: common_assets._imports_2,
    g: common_vendor.o((...args) => $options.navigateToSearch && $options.navigateToSearch(...args)),
    h: common_assets._imports_1,
    i: common_vendor.o((...args) => $options.searchGoods && $options.searchGoods(...args)),
    j: $data.matchedGoods.length > 0
  }, $data.matchedGoods.length > 0 ? {
    k: common_vendor.f($data.matchedGoods, (item, index, i0) => {
      var _a;
      return {
        a: (_a = item.goods_thumb) == null ? void 0 : _a.fileID,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: common_vendor.t(item.total_sell_count),
        e: common_vendor.o(($event) => $options.navigateToProduct(item), index),
        f: index
      };
    })
  } : {
    l: common_vendor.f($data.randomGoods, (item, index, i0) => {
      var _a;
      return {
        a: (_a = item.goods_thumb) == null ? void 0 : _a.fileID,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: common_vendor.t(item.total_sell_count),
        e: common_vendor.o(($event) => $options.navigateToProduct(item), index),
        f: index
      };
    })
  }, {
    m: $data.refreshing,
    n: common_vendor.o((...args) => $options.onPullDownRefresh && $options.onPullDownRefresh(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/mall-list.js.map
