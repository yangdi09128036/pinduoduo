"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  computed: {
    userInfo() {
      return uni_modules_uniIdPages_common_store.store.userInfo;
    }
  },
  data() {
    return {
      allGoods: [],
      randomGoods: [],
      orderCounts: {
        1: 0,
        // 待付款
        2: 0,
        // 待分享
        3: 0,
        // 待发货
        4: 0,
        // 待收货
        5: 0
        // 评价
      }
    };
  },
  onLoad() {
    this.getGoods();
  },
  onShow() {
    this.getOrderCounts();
  },
  methods: {
    async getGoods() {
      try {
        const {
          result: {
            data
          }
        } = await common_vendor.nr.database().collection("mall-goods").get();
        this.allGoods = data || [];
        this.randomGoods = this.getRandomGoods(16);
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/user/user.vue:180", "获取商品数据失败:", err);
      }
    },
    getRandomGoods(count) {
      const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
      return shuffledGoods.slice(0, count);
    },
    getOrderCounts() {
      const counts = common_vendor.index.getStorageSync("orderCounts");
      if (counts) {
        this.orderCounts = counts;
      } else {
        this.fetchOrderCounts();
      }
    },
    async fetchOrderCounts() {
      if (!uni_modules_uniIdPages_common_store.store.userInfo || !uni_modules_uniIdPages_common_store.store.userInfo._id)
        return;
      try {
        const db = common_vendor.nr.database();
        const pendingPaymentResult = await db.collection("order").where({
          userId: uni_modules_uniIdPages_common_store.store.userInfo._id,
          paymentStatus: 0
        }).count();
        this.orderCounts[1] = pendingPaymentResult.result.total;
        const pendingShareResult = await db.collection("order").where({
          userId: uni_modules_uniIdPages_common_store.store.userInfo._id,
          paymentStatus: 1,
          shareStatus: 0
        }).count();
        this.orderCounts[2] = pendingShareResult.result.total;
        const pendingShippingResult = await db.collection("order").where({
          userId: uni_modules_uniIdPages_common_store.store.userInfo._id,
          paymentStatus: 1,
          shippingStatus: 0
        }).count();
        this.orderCounts[3] = pendingShippingResult.result.total;
        const pendingReceivingResult = await db.collection("order").where({
          userId: uni_modules_uniIdPages_common_store.store.userInfo._id,
          shippingStatus: 1,
          deliveryStatus: 0
        }).count();
        this.orderCounts[4] = pendingReceivingResult.result.total;
        const pendingReviewResult = await db.collection("order").where({
          userId: uni_modules_uniIdPages_common_store.store.userInfo._id,
          deliveryStatus: 1,
          review: db.command.exists(false)
        }).count();
        this.orderCounts[5] = pendingReviewResult.result.total;
        common_vendor.index.setStorageSync("orderCounts", this.orderCounts);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/user/user.vue:256", "获取订单数量失败:", error);
      }
    },
    navigateToProduct(item) {
      if (!item)
        return;
      common_vendor.index.setStorage({
        key: "currentProduct",
        data: item,
        success: () => {
          common_vendor.index.__f__("log", "at pages/user/user.vue:265", "商品信息存储成功", item);
        }
      });
      common_vendor.index.navigateTo({
        url: "../search/mall-details"
      });
    },
    navigateToAddress() {
      common_vendor.index.navigateTo({
        url: "/pages/address/address"
      });
    },
    viewAllOrders() {
      common_vendor.index.navigateTo({
        url: "/pages/user/order"
      });
    },
    navigateToOrder(type) {
      common_vendor.index.navigateTo({
        url: `/pages/user/order?type=${type}`
      });
    },
    goSet() {
      common_vendor.index.navigateTo({
        url: "/pages/user/set"
      });
    },
    navigateToFeature(feature) {
      const routes = {
        favor: "/pages/malls-manage/favor",
        wallet: "/pages/wallet/wallet",
        coupon: "/pages/coupon/coupon-list",
        history: "/pages/malls-manage/history",
        refund: "/pages/orders/refund-list"
      };
      common_vendor.index.navigateTo({
        url: routes[feature]
      });
    },
    goSet() {
      common_vendor.index.navigateTo({
        url: "/pages/user/set"
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
  return common_vendor.e({
    a: common_vendor.p({
      width: "100rpx",
      height: "100rpx"
    }),
    b: common_assets._imports_0$3,
    c: common_vendor.t($options.userInfo.username || "您的昵称"),
    d: common_assets._imports_1$2,
    e: common_vendor.t($options.userInfo.address && $options.userInfo.address.length > 6 ? $options.userInfo.address.substr(0, 6) + "..." : $options.userInfo.address || "收货地址"),
    f: common_vendor.o((...args) => $options.goSet && $options.goSet(...args)),
    g: common_assets._imports_2$3,
    h: common_assets._imports_3$1,
    i: common_vendor.o((...args) => $options.goSet && $options.goSet(...args)),
    j: common_vendor.o((...args) => $options.viewAllOrders && $options.viewAllOrders(...args)),
    k: common_assets._imports_4$1,
    l: $data.orderCounts[1] > 0
  }, $data.orderCounts[1] > 0 ? {
    m: common_vendor.t($data.orderCounts[1])
  } : {}, {
    n: common_vendor.o(($event) => $options.navigateToOrder("pending")),
    o: common_assets._imports_5,
    p: $data.orderCounts[2] > 0
  }, $data.orderCounts[2] > 0 ? {
    q: common_vendor.t($data.orderCounts[2])
  } : {}, {
    r: common_vendor.o(($event) => $options.navigateToOrder("share")),
    s: common_assets._imports_6,
    t: $data.orderCounts[3] > 0
  }, $data.orderCounts[3] > 0 ? {
    v: common_vendor.t($data.orderCounts[3])
  } : {}, {
    w: common_vendor.o(($event) => $options.navigateToOrder("shipping")),
    x: common_assets._imports_7,
    y: $data.orderCounts[4] > 0
  }, $data.orderCounts[4] > 0 ? {
    z: common_vendor.t($data.orderCounts[4])
  } : {}, {
    A: common_vendor.o(($event) => $options.navigateToOrder("receiving")),
    B: common_assets._imports_8,
    C: $data.orderCounts[5] > 0
  }, $data.orderCounts[5] > 0 ? {
    D: common_vendor.t($data.orderCounts[5])
  } : {}, {
    E: common_vendor.o(($event) => $options.navigateToOrder("review")),
    F: common_assets._imports_9,
    G: common_vendor.o(($event) => $options.navigateToFeature("favor")),
    H: common_assets._imports_2$2,
    I: common_vendor.o(($event) => $options.navigateToFeature("wallet")),
    J: common_assets._imports_2$3,
    K: common_vendor.o(($event) => $options.navigateToFeature("coupon")),
    L: common_assets._imports_11,
    M: common_vendor.o(($event) => $options.navigateToFeature("history")),
    N: common_assets._imports_12,
    O: common_vendor.o(($event) => $options.navigateToFeature("refund")),
    P: common_vendor.f($data.randomGoods, (item, index, i0) => {
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
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map
