"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      historyItems: [],
      selectedItems: [],
      isAllSelected: false,
      isLoading: false,
      page: 1,
      pageSize: 10
    };
  },
  computed: {
    totalPrice() {
      return this.historyItems.filter((item) => this.selectedItems.includes(item._id)).reduce((total, item) => total + item.price, 0).toFixed(2);
    },
    userInfo() {
      return uni_modules_uniIdPages_common_store.store.userInfo;
    }
  },
  onLoad() {
    this.loadhistoryItems();
  },
  methods: {
    async loadhistoryItems() {
      try {
        if (!this.userInfo || !this.userInfo._id) {
          common_vendor.index.showToast({
            title: "请先登录",
            icon: "none"
          });
          return;
        }
        this.isLoading = true;
        const db = common_vendor.nr.database();
        const historyResult = await db.collection("history").where({
          userId: this.userInfo._id
        }).skip((this.page - 1) * this.pageSize).limit(this.pageSize).get();
        if (historyResult.result.data.length === 0) {
          this.isLoading = false;
          if (this.page === 1) {
            this.historyItems = [];
          }
          return;
        }
        const productIds = historyResult.result.data.map((history) => history.productId);
        const productsResult = await db.collection("mall-goods").where({
          _id: db.command.in(productIds)
        }).get();
        const newItems = productsResult.result.data;
        this.historyItems = this.page === 1 ? newItems : [...this.historyItems, ...newItems];
        this.page++;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/malls-manage/history.vue:140", "加载历史商品失败:", error);
        common_vendor.index.showToast({
          title: "加载历史商品失败",
          icon: "none"
        });
      } finally {
        this.isLoading = false;
      }
    },
    loadMoreItems() {
      if (!this.isLoading) {
        this.loadhistoryItems();
      }
    },
    toggleSelect(item) {
      const index = this.selectedItems.indexOf(item._id);
      if (index === -1) {
        this.selectedItems.push(item._id);
      } else {
        this.selectedItems.splice(index, 1);
      }
      this.isAllSelected = this.selectedItems.length === this.historyItems.length;
    },
    toggleSelectAll() {
      if (this.isAllSelected) {
        this.selectedItems = [];
      } else {
        this.selectedItems = this.historyItems.map((item) => item._id);
      }
      this.isAllSelected = !this.isAllSelected;
    },
    async handleCheckout() {
      var _a;
      if (this.selectedItems.length === 0) {
        common_vendor.index.showToast({
          title: "请选择商品",
          icon: "none"
        });
        return;
      }
      const selectedProducts = this.historyItems.filter((item) => this.selectedItems.includes(item._id));
      const totalAmount = parseFloat(this.totalPrice);
      const paymentData = {
        amount: totalAmount,
        username: this.userInfo.username,
        mobile: this.userInfo.mobile,
        avatar: ((_a = this.userInfo.avatar_file) == null ? void 0 : _a.path) || "/static/avatar-default.png",
        userId: this.userInfo._id,
        productId: this.selectedItems,
        productName: selectedProducts.map((p) => p.name).join(", "),
        productImage: selectedProducts[0].goods_thumb.fileID,
        quantity: this.selectedItems.length
      };
      common_vendor.index.setStorageSync("paymentData", paymentData);
      try {
        const db = common_vendor.nr.database();
        const orderIds = [];
        for (const itemId of this.selectedItems) {
          const product = this.historyItems.find((item) => item._id === itemId);
          if (product) {
            const orderResult = await db.collection("order").add({
              userId: this.userInfo._id,
              productId: [itemId],
              // 单个商品ID
              productName: product.name,
              productImage: product.goods_thumb.fileID,
              amount: product.price,
              quantity: 1,
              // 每个订单只包含一个商品
              paymentStatus: 0,
              shareStatus: 0,
              shippingStatus: 0,
              deliveryStatus: 0,
              reviewStatus: 0
            });
            orderIds.push(orderResult.result.id);
          }
        }
        paymentData.orderIds = orderIds;
        common_vendor.index.setStorageSync("paymentData", paymentData);
        common_vendor.index.setStorageSync("currentOrderIds", orderIds);
        common_vendor.index.navigateTo({
          url: "/pages/wallet/pay"
        });
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/malls-manage/history.vue:231", "创建订单失败:", error);
        common_vendor.index.showToast({
          title: "创建订单失败，请重试",
          icon: "none"
        });
      }
    },
    navBack() {
      common_vendor.index.switchTab({
        url: "/pages/user/user"
      });
    },
    goToProductDetail(productId) {
      common_vendor.index.navigateTo({
        url: `/pages/search/mall-details?id=${productId}`
      });
    },
    async removehistoryItem(itemId) {
      try {
        const db = common_vendor.nr.database();
        await db.collection("history").where({
          userId: this.userInfo._id,
          productId: itemId
        }).remove();
        this.historyItems = this.historyItems.filter((item) => item._id !== itemId);
        this.selectedItems = this.selectedItems.filter((id) => id !== itemId);
        common_vendor.index.showToast({
          title: "已移除历史",
          icon: "success"
        });
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/malls-manage/history.vue:264", "移除历史失败:", error);
        common_vendor.index.showToast({
          title: "移除历史失败，请重试",
          icon: "none"
        });
      }
    },
    goShopping() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_icons2 + _easycom_uni_load_more2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$4,
    b: common_vendor.o((...args) => $options.navBack && $options.navBack(...args)),
    c: common_vendor.t($data.isAllSelected ? "取消全选" : "全选"),
    d: common_vendor.o((...args) => $options.toggleSelectAll && $options.toggleSelectAll(...args)),
    e: $data.historyItems.length === 0
  }, $data.historyItems.length === 0 ? {
    f: common_assets._imports_1$3,
    g: common_vendor.o((...args) => $options.goShopping && $options.goShopping(...args))
  } : {
    h: common_vendor.f($data.historyItems, (item, k0, i0) => {
      return common_vendor.e({
        a: $data.selectedItems.includes(item._id)
      }, $data.selectedItems.includes(item._id) ? {} : {}, {
        b: $data.selectedItems.includes(item._id) ? 1 : "",
        c: common_vendor.o(($event) => $options.toggleSelect(item), item._id),
        d: item.goods_thumb.fileID,
        e: common_vendor.o(($event) => $options.goToProductDetail(item._id), item._id),
        f: common_vendor.t(item.name),
        g: common_vendor.t(item.price.toFixed(2)),
        h: item.original_price
      }, item.original_price ? {
        i: common_vendor.t(item.original_price.toFixed(2))
      } : {}, {
        j: item.is_hot
      }, item.is_hot ? {} : {}, {
        k: item.is_new
      }, item.is_new ? {} : {}, {
        l: item.is_best
      }, item.is_best ? {} : {}, {
        m: common_vendor.o(($event) => $options.goToProductDetail(item._id), item._id),
        n: "bfb7e6c0-0-" + i0,
        o: common_vendor.o(($event) => $options.removehistoryItem(item._id), item._id),
        p: item._id
      });
    }),
    i: common_vendor.p({
      type: "trash",
      size: "20",
      color: "#999"
    })
  }, {
    j: $data.isLoading
  }, $data.isLoading ? {
    k: common_vendor.p({
      status: "loading"
    })
  } : {}, {
    l: common_vendor.o((...args) => $options.loadMoreItems && $options.loadMoreItems(...args)),
    m: $data.historyItems.length > 0
  }, $data.historyItems.length > 0 ? {
    n: common_vendor.t($options.totalPrice),
    o: common_vendor.t($data.selectedItems.length),
    p: common_vendor.o((...args) => $options.handleCheckout && $options.handleCheckout(...args)),
    q: $data.selectedItems.length === 0
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/malls-manage/history.js.map
