"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      searchPlaceholder: "请输入商品信息",
      allGoods: [],
      randomGoods: [],
      searchKeyword: "",
      // 用于绑定搜索框输入内容
      recentSearches: [],
      // 最近搜索记录
      searchSuggestions: []
      // 搜索发现的关键词
    };
  },
  onLoad() {
    this.getGoods();
    this.loadRecentSearches();
  },
  methods: {
    async getGoods() {
      try {
        const { result: { data } } = await common_vendor.nr.database().collection("mall-goods").get();
        this.allGoods = data || [];
        this.randomGoods = this.getRandomGoods(16);
        if (this.allGoods.length > 0) {
          this.searchPlaceholder = this.allGoods[Math.floor(Math.random() * this.allGoods.length)].keywords || "请输入商品信息";
        }
        this.generateSearchSuggestions();
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/search/search.vue:107", "获取商品数据失败:", err);
      }
    },
    getRandomGoods(count) {
      const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
      return shuffledGoods.slice(0, count);
    },
    generateSearchSuggestions() {
      const allKeywords = this.allGoods.flatMap((item) => item.keywords.split(","));
      const uniqueKeywords = [...new Set(allKeywords)];
      this.searchSuggestions = uniqueKeywords.slice(0, 16);
    },
    navBack() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    focusSearch() {
      this.searchKeyword = "";
    },
    handleSearch() {
      const keyword = this.searchKeyword.trim();
      if (!keyword) {
        common_vendor.index.showToast({
          title: "请输入搜索关键词",
          icon: "none"
        });
        return;
      }
      this.addRecentSearch(keyword);
      this.navigateToSearch(keyword);
    },
    navigateToSearchWithTag(keyword) {
      this.addRecentSearch(keyword);
      this.navigateToSearch(keyword);
    },
    addRecentSearch(keyword) {
      if (!this.recentSearches.includes(keyword)) {
        this.recentSearches.unshift(keyword);
        if (this.recentSearches.length > 10) {
          this.recentSearches.pop();
        }
        common_vendor.index.setStorageSync("recentSearches", this.recentSearches);
      }
    },
    navigateToSearch(keyword) {
      common_vendor.index.navigateTo({
        url: `/pages/search/mall-list?keyword=${encodeURIComponent(keyword)}`
      });
    },
    loadRecentSearches() {
      const savedSearches = common_vendor.index.getStorageSync("recentSearches") || [];
      this.recentSearches = [...savedSearches];
    },
    navigateToProduct(item) {
      if (!item)
        return;
      common_vendor.index.setStorage({
        key: "currentProduct",
        data: item,
        success: () => {
          common_vendor.index.__f__("log", "at pages/search/search.vue:169", "商品信息存储成功", item);
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
    d: common_vendor.o((...args) => $options.handleSearch && $options.handleSearch(...args)),
    e: $data.searchKeyword,
    f: common_vendor.o(($event) => $data.searchKeyword = $event.detail.value),
    g: common_assets._imports_2,
    h: common_vendor.o((...args) => $options.focusSearch && $options.focusSearch(...args)),
    i: common_assets._imports_1,
    j: common_vendor.o((...args) => $options.handleSearch && $options.handleSearch(...args)),
    k: $data.recentSearches.length > 0
  }, $data.recentSearches.length > 0 ? {
    l: common_vendor.f($data.recentSearches, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: index,
        c: common_vendor.o(($event) => $options.navigateToSearchWithTag(tag), index)
      };
    })
  } : {}, {
    m: common_vendor.f($data.searchSuggestions, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: index,
        c: common_vendor.o(($event) => $options.navigateToSearchWithTag(tag), index)
      };
    }),
    n: common_vendor.f($data.randomGoods, (item, index, i0) => {
      var _a;
      return {
        a: (_a = item.goods_thumb) == null ? void 0 : _a.fileID,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: common_vendor.t(item.total_sell_count),
        e: common_vendor.o(($event) => $options.navigateToProduct(item), index),
        f: index
      };
    }),
    o: $data.randomGoods.length === 0
  }, $data.randomGoods.length === 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map
