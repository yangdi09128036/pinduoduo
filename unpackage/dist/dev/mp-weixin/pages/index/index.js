"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      currentTab: 0,
      searchPlaceholder: "请输入商品信息",
      categories: [],
      allGoods: [],
      currentTabData: [],
      placeholderProducts: [],
      specialItems: [
        {
          image: "/static/clock.png",
          text: "限时秒杀",
          url: "/pages/special/clock"
        },
        {
          image: "/static/recharge.png",
          text: "充值中心",
          url: "/pages/special/recharge"
        },
        {
          image: "/static/turntable.png",
          text: "现金大转盘",
          url: "/pages/special/turntable"
        },
        {
          image: "/static/sale.png",
          text: "9块9特卖",
          url: "/pages/special/sale"
        },
        {
          image: "/static/money.png",
          text: "现金红包",
          url: "/pages/special/money"
        }
      ],
      sections: [
        {
          title: "百亿补贴",
          image: "/static/subsidy.png",
          url: "/pages/subsidy/subsidy"
        },
        {
          title: "多多买菜",
          image: "/static/vegetables.png",
          url: "/pages/buy-vegetables/buy-vegetables"
        }
      ],
      pageNumber: 1,
      pageSize: 100,
      scrollHeight: "calc(100vh - 240rpx)",
      isRefreshing: false,
      cacheKey: "homePageData",
      cacheExpiration: 5 * 60 * 1e6,
      // 5分钟
      userInfoChecked: false,
      userInfoComplete: false,
      // 新增：标记用户信息是否完整
      isDataLoaded: false
      // 新增：标记数据是否已加载
    };
  },
  async onLoad() {
    common_vendor.index.getSystemInfo({
      success: (res) => {
        this.scrollHeight = `calc(100vh - ${res.statusBarHeight}px - 240rpx)`;
      }
    });
    await this.checkUserInfoSync();
    await this.getInitialData();
  },
  onShow() {
    if (this.userInfoChecked && !this.userInfoComplete) {
      this.checkUserInfo(true);
    }
  },
  methods: {
    // 新增：同步检查用户信息的方法
    async checkUserInfoSync() {
      common_vendor.index.__f__("log", "at pages/index/index.vue:159", "开始同步检查用户信息");
      if (!uni_modules_uniIdPages_common_store.store.hasLogin) {
        common_vendor.index.__f__("log", "at pages/index/index.vue:163", "用户未登录，跳过信息检查");
        this.userInfoChecked = true;
        return;
      }
      let attempts = 0;
      const maxAttempts = 10;
      while (!uni_modules_uniIdPages_common_store.store.userInfo && attempts < maxAttempts) {
        common_vendor.index.__f__("log", "at pages/index/index.vue:173", `等待用户信息加载，尝试 ${attempts + 1}/${maxAttempts}`);
        await new Promise((resolve) => setTimeout(resolve, 300));
        attempts++;
      }
      this.userInfoChecked = true;
      if (!uni_modules_uniIdPages_common_store.store.userInfo) {
        common_vendor.index.__f__("log", "at pages/index/index.vue:182", "用户信息加载超时或不存在");
        this.userInfoComplete = false;
        return;
      }
      common_vendor.index.__f__("log", "at pages/index/index.vue:187", "检查用户信息:", uni_modules_uniIdPages_common_store.store.userInfo);
      const hasMobile = !!uni_modules_uniIdPages_common_store.store.userInfo.mobile && uni_modules_uniIdPages_common_store.store.userInfo.mobile.trim() !== "";
      const hasAddress = !!uni_modules_uniIdPages_common_store.store.userInfo.address && uni_modules_uniIdPages_common_store.store.userInfo.address.trim() !== "";
      common_vendor.index.__f__("log", "at pages/index/index.vue:192", "用户信息检查结果:", {
        hasMobile,
        hasAddress
      });
      this.userInfoComplete = hasMobile && hasAddress;
      if (!this.userInfoComplete) {
        common_vendor.index.__f__("log", "at pages/index/index.vue:200", "用户信息不完整，需要补充");
        common_vendor.index.showToast({
          title: "请完善手机与收货地址",
          icon: "none",
          duration: 2e3
        });
        setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/pages/user/set"
          });
        }, 2e3);
      } else {
        common_vendor.index.__f__("log", "at pages/index/index.vue:214", "用户信息已完整");
      }
    },
    // 保留原有方法，但主要用于onShow时的检查
    checkUserInfo(silent = false) {
      if (!uni_modules_uniIdPages_common_store.store.hasLogin) {
        common_vendor.index.__f__("log", "at pages/index/index.vue:222", "用户未登录，跳过信息检查");
        return;
      }
      const userInfo = uni_modules_uniIdPages_common_store.store.userInfo;
      if (!userInfo) {
        common_vendor.index.__f__("log", "at pages/index/index.vue:228", "用户信息不存在，跳过信息检查");
        return;
      }
      common_vendor.index.__f__("log", "at pages/index/index.vue:232", "检查用户信息:", JSON.stringify(userInfo));
      const hasMobile = !!userInfo.mobile && userInfo.mobile.trim() !== "";
      const hasAddress = !!userInfo.address && userInfo.address.trim() !== "";
      common_vendor.index.__f__("log", "at pages/index/index.vue:237", "用户信息检查结果:", {
        hasMobile,
        hasAddress
      });
      this.userInfoComplete = hasMobile && hasAddress;
      if (this.userInfoComplete) {
        common_vendor.index.__f__("log", "at pages/index/index.vue:245", "用户信息已完整");
        return true;
      } else {
        common_vendor.index.__f__("log", "at pages/index/index.vue:248", "用户信息不完整，需要补充");
        if (!silent) {
          common_vendor.index.showToast({
            title: "请完善手机与收货地址",
            icon: "none",
            duration: 2e3
          });
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/user/set"
            });
          }, 2e3);
        }
        return false;
      }
    },
    async getInitialData() {
      try {
        const cachedData = this.getCachedData();
        if (cachedData) {
          this.setPageData(cachedData);
        } else {
          await this.fetchAndCacheData();
        }
        this.switchTab(0);
        this.isDataLoaded = true;
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:279", "初始化数据失败:", err);
        this.isDataLoaded = false;
        throw err;
      }
    },
    getCachedData() {
      const cachedData = common_vendor.index.getStorageSync(this.cacheKey);
      if (cachedData && Date.now() - cachedData.timestamp < this.cacheExpiration) {
        return cachedData.data;
      }
      return null;
    },
    async fetchAndCacheData() {
      try {
        const {
          result
        } = await common_vendor.nr.callFunction({
          name: "getHomePageData",
          data: {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
          }
        });
        if (result.success) {
          this.setPageData(result.data);
          this.cacheData(result.data);
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:310", "获取数据失败:", err);
        throw err;
      }
    },
    setPageData(data) {
      this.categories = data.categories || [];
      this.allGoods = data.goods || [];
      if (this.allGoods.length > 0) {
        this.searchPlaceholder = this.allGoods[Math.floor(Math.random() * this.allGoods.length)].keywords || "请输入商品信息";
      }
    },
    cacheData(data) {
      common_vendor.index.setStorageSync(this.cacheKey, {
        timestamp: Date.now(),
        data
      });
    },
    switchTab(index) {
      this.currentTab = index;
      const currentCategory = this.categories[index];
      if (!currentCategory)
        return;
      if (index === 0) {
        const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
        this.currentTabData = shuffledGoods.slice(0, this.pageSize);
        this.placeholderProducts = shuffledGoods.slice(this.pageSize - 80, this.pageSize + 5);
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
    navigateToPage(url) {
      common_vendor.index.navigateTo({
        url
      });
    },
    navigateToSection(index) {
      const section = this.sections[index];
      if (section) {
        common_vendor.index.navigateTo({
          url: section.url
        });
      }
    },
    navigateToProduct(item) {
      if (!item)
        return;
      common_vendor.index.setStorage({
        key: "currentProduct",
        data: item,
        success: () => {
          common_vendor.index.__f__("log", "at pages/index/index.vue:367", "商品信息存储成功", item);
        }
      });
      common_vendor.index.navigateTo({
        url: "../search/mall-details"
      });
    },
    onRefresh() {
      common_vendor.index.__f__("log", "at pages/index/index.vue:376", "正在刷新...");
      this.isRefreshing = true;
      this.fetchAndCacheData().then(() => {
        this.switchTab(this.currentTab);
        this.isRefreshing = false;
      }).catch((error) => {
        common_vendor.index.__f__("error", "at pages/index/index.vue:382", "刷新失败:", error);
        this.isRefreshing = false;
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_1,
    b: $data.searchPlaceholder,
    c: common_assets._imports_2,
    d: common_vendor.o((...args) => $options.navigateToSearch && $options.navigateToSearch(...args)),
    e: common_vendor.f($data.categories, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: index,
        c: $data.currentTab === index ? 1 : "",
        d: common_vendor.o(($event) => $options.switchTab(index), index)
      };
    }),
    f: $data.currentTab === 0
  }, $data.currentTab === 0 ? {
    g: common_vendor.f($data.specialItems, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.text),
        c: index,
        d: common_vendor.o(($event) => $options.navigateToPage(item.url), index)
      };
    }),
    h: common_vendor.f($data.sections, (sectionData, sectionIndex, i0) => {
      return {
        a: sectionData.image,
        b: common_vendor.t(sectionData.title),
        c: common_vendor.f($data.placeholderProducts.slice(sectionIndex * 4, (sectionIndex + 1) * 4), (product, productIndex, i1) => {
          var _a;
          return {
            a: (_a = product.goods_thumb) == null ? void 0 : _a.fileID,
            b: common_vendor.t(product.price),
            c: productIndex
          };
        }),
        d: sectionIndex,
        e: common_vendor.o(($event) => $options.navigateToSection(sectionIndex), sectionIndex)
      };
    })
  } : {}, {
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
  } : {}, {
    k: $data.scrollHeight,
    l: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    m: $data.isRefreshing
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
