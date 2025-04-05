"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      currentTab: 0,
      searchPlaceholder: "请输入商品信息",
      categories: [],
      currentTabData: [],
      allGoods: [],
      banners: []
    };
  },
  onLoad() {
    this.getInitialData();
  },
  methods: {
    async getInitialData() {
      try {
        await Promise.all([this.getCategories(), this.getGoods(), this.getBanners()]);
        this.switchTab(0);
        if (this.allGoods.length > 0) {
          this.searchPlaceholder = this.allGoods[Math.floor(Math.random() * this.allGoods.length)].keywords || "请输入商品信息";
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/subsidy/subsidy.vue:84", "获取数据失败:", err);
      }
    },
    async getCategories() {
      try {
        const { result: { data } } = await common_vendor.nr.database().collection("mall-categories").get();
        this.categories = data || [];
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/subsidy/subsidy.vue:92", "获取分类数据失败:", err);
      }
    },
    async getGoods() {
      try {
        const { result: { data } } = await common_vendor.nr.database().collection("mall-goods").get();
        this.allGoods = data || [];
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/subsidy/subsidy.vue:100", "获取商品数据失败:", err);
      }
    },
    async getBanners() {
      try {
        const { result: { data } } = await common_vendor.nr.database().collection("banner").get();
        const bannerData = data[0] || {};
        this.banners = bannerData.banner_imgs.slice(0, 6).map((item) => item.fileID || item.url);
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/subsidy/subsidy.vue:109", "获取轮播图数据失败:", err);
      }
    },
    switchTab(index) {
      this.currentTab = index;
      const currentCategory = this.categories[index];
      if (!currentCategory)
        return;
      if (index === 0) {
        const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
        this.currentTabData = shuffledGoods.slice(0, 30);
      } else {
        this.currentTabData = this.allGoods.filter((item) => parseInt(item.category_id) === parseInt(
          currentCategory.sort
        ));
      }
    },
    navigateToSearch() {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    },
    navBack() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    navigateToProduct(item) {
      if (!item)
        return;
      common_vendor.index.setStorage({
        key: "currentProduct",
        data: item,
        success: () => {
          common_vendor.index.__f__("log", "at pages/subsidy/subsidy.vue:142", "商品信息存储成功", item);
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
    c: common_assets._imports_1,
    d: $data.searchPlaceholder,
    e: common_assets._imports_2,
    f: common_vendor.o((...args) => $options.navigateToSearch && $options.navigateToSearch(...args)),
    g: common_vendor.f($data.categories, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: index,
        c: $data.currentTab === index ? 1 : "",
        d: common_vendor.o(($event) => $options.switchTab(index), index)
      };
    }),
    h: common_vendor.f($data.banners, (banner, index, i0) => {
      return {
        a: banner,
        b: index
      };
    }),
    i: $data.currentTab !== null
  }, $data.currentTab !== null ? {
    j: common_vendor.f($data.currentTabData, (item, index, i0) => {
      var _a;
      return {
        a: (_a = item.goods_thumb) == null ? void 0 : _a.fileID,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: common_vendor.t(item.total_sell_count),
        e: index,
        f: common_vendor.o(($event) => $options.navigateToProduct(item), index)
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/subsidy/subsidy.js.map
