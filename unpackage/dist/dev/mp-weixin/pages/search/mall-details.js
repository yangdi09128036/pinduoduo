"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      goodsInfo: null,
      isLoading: true,
      showBuyPopup: false,
      quantity: 1,
      isFavorite: false,
      successMessage: "",
      errorMessage: ""
    };
  },
  async onLoad(options) {
    await this.loadGoodsInfo(options);
    await this.checkFavoriteStatus();
    common_vendor.index.__f__("log", "at pages/search/mall-details.vue:179", "Initial userInfo:", uni_modules_uniIdPages_common_store.store.userInfo);
    await this.addToHistory();
  },
  onShow() {
    const paymentSuccess = common_vendor.index.getStorageSync("paymentSuccess");
    if (paymentSuccess) {
      common_vendor.index.removeStorageSync("paymentSuccess");
      common_vendor.index.showToast({
        title: "支付成功",
        icon: "success"
      });
      this.hidePopup();
    }
  },
  computed: {
    userInfo() {
      return uni_modules_uniIdPages_common_store.store.userInfo;
    }
  },
  methods: {
    async loadGoodsInfo(options) {
      this.isLoading = true;
      try {
        if (options && options.id) {
          const db = common_vendor.nr.database();
          const result = await db.collection("mall-goods").doc(options.id).get();
          if (result.result.data && result.result.data.length > 0) {
            this.goodsInfo = result.result.data[0];
          }
        } else {
          const goodsInfo = common_vendor.index.getStorageSync("currentProduct");
          if (goodsInfo) {
            this.goodsInfo = goodsInfo;
          }
        }
        common_vendor.index.__f__("log", "at pages/search/mall-details.vue:220", "商品详情页数据", this.goodsInfo);
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/search/mall-details.vue:222", "获取商品信息失败:", e);
      } finally {
        this.isLoading = false;
      }
    },
    async checkFavoriteStatus() {
      if (!uni_modules_uniIdPages_common_store.store.userInfo || !this.goodsInfo)
        return;
      common_vendor.index.__f__("log", "at pages/search/mall-details.vue:230", "用户id", uni_modules_uniIdPages_common_store.store.userInfo._id);
      common_vendor.index.__f__("log", "at pages/search/mall-details.vue:231", "商品id", this.goodsInfo._id);
      const db = common_vendor.nr.database();
      const favorCollection = db.collection("favor");
      const result = await favorCollection.where({
        userId: uni_modules_uniIdPages_common_store.store.userInfo._id,
        productId: this.goodsInfo._id
      }).get();
      this.isFavorite = result.result.data.length > 0;
    },
    async addToHistory() {
      if (!this.goodsInfo || !uni_modules_uniIdPages_common_store.store.userInfo) {
        common_vendor.index.__f__("warn", "at pages/search/mall-details.vue:244", "商品信息或用户信息为空，无法记录到历史浏览");
        return;
      }
      const db = common_vendor.nr.database();
      const historyCollection = db.collection("history");
      try {
        const queryResult = await historyCollection.where({
          userId: uni_modules_uniIdPages_common_store.store.userInfo._id,
          productId: this.goodsInfo._id
        }).get();
        if (queryResult.result.data.length === 0) {
          await historyCollection.add({
            userId: uni_modules_uniIdPages_common_store.store.userInfo._id,
            productId: this.goodsInfo._id
          });
          common_vendor.index.__f__("log", "at pages/search/mall-details.vue:265", "商品已记录到历史浏览");
        } else {
          common_vendor.index.__f__("log", "at pages/search/mall-details.vue:267", "商品已存在于历史浏览中");
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/search/mall-details.vue:270", "记录商品到历史浏览失败", error);
      }
    },
    async toggleFavorite() {
      if (!uni_modules_uniIdPages_common_store.store.userInfo || !this.goodsInfo) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return;
      }
      if (this.isFavorite) {
        await this.removeFromFavorites();
      } else {
        await this.addToFavorites();
      }
      this.isFavorite = !this.isFavorite;
    },
    async addToFavorites() {
      const db = common_vendor.nr.database();
      const favorTable = db.collection("favor");
      try {
        await favorTable.add({
          userId: uni_modules_uniIdPages_common_store.store.userInfo._id,
          productId: this.goodsInfo._id
        });
        this.successMessage = "收藏成功";
        this.errorMessage = "";
        common_vendor.index.showToast({
          title: this.successMessage,
          icon: "success"
        });
      } catch (error) {
        this.errorMessage = error.message || "收藏失败，请检查网络";
        this.successMessage = "";
        common_vendor.index.showToast({
          title: this.errorMessage,
          icon: "none"
        });
      }
    },
    async removeFromFavorites() {
      const db = common_vendor.nr.database();
      const favorTable = db.collection("favor");
      try {
        await favorTable.where({
          userId: uni_modules_uniIdPages_common_store.store.userInfo._id,
          productId: this.goodsInfo._id
        }).remove();
        this.successMessage = "取消收藏成功";
        this.errorMessage = "";
        common_vendor.index.showToast({
          title: this.successMessage,
          icon: "success"
        });
      } catch (error) {
        this.errorMessage = error.message || "取消收藏失败，请检查网络";
        this.successMessage = "";
        common_vendor.index.showToast({
          title: this.errorMessage,
          icon: "none"
        });
      }
    },
    maskPhone(phone) {
      if (!phone)
        return "";
      return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
    showPopup() {
      this.showBuyPopup = true;
    },
    hidePopup() {
      this.showBuyPopup = false;
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    async handlePayment() {
      if (!this.userInfo) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return;
      }
      const paymentData = {
        amount: (this.goodsInfo.group_price || this.goodsInfo.price) * this.quantity,
        username: this.userInfo.username,
        mobile: this.userInfo.mobile,
        avatar: this.userInfo.avatar_file.url || "/static/avatar-default.png",
        productId: this.goodsInfo._id,
        productName: this.goodsInfo.name,
        productImage: this.goodsInfo.goods_thumb.fileID,
        quantity: this.quantity,
        userId: this.userInfo._id
      };
      common_vendor.index.__f__("log", "at pages/search/mall-details.vue:380", "支付数据", paymentData);
      common_vendor.index.setStorageSync("paymentData", paymentData);
      const db = common_vendor.nr.database();
      const orderCollection = db.collection("order");
      try {
        const orderResult = await orderCollection.add({
          userId: this.userInfo._id,
          productId: [this.goodsInfo._id],
          // 使用数组格式，与favor页面保持一致
          productName: this.goodsInfo.name,
          productImage: this.goodsInfo.goods_thumb.fileID,
          quantity: this.quantity,
          amount: paymentData.amount,
          paymentStatus: 0,
          shareStatus: 0,
          shippingStatus: 0,
          deliveryStatus: 0,
          reviewStatus: 0
        });
        common_vendor.index.__f__("log", "at pages/search/mall-details.vue:403", "orderResult", orderResult);
        if (orderResult && orderResult.result && orderResult.result.id) {
          common_vendor.index.setStorageSync("currentOrderIds", [orderResult.result.id]);
          common_vendor.index.__f__("log", "at pages/search/mall-details.vue:408", "orderResult.id", orderResult.result.id);
          common_vendor.index.navigateTo({
            url: "/pages/wallet/pay"
          });
        } else {
          common_vendor.index.__f__("error", "at pages/search/mall-details.vue:413", "订单创建成功，但未返回有效的 orderResult");
          common_vendor.index.showToast({
            title: "创建订单失败，请重试",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/search/mall-details.vue:420", "创建订单失败:", error);
        common_vendor.index.showToast({
          title: "创建订单失败，请重试",
          icon: "none"
        });
      }
    },
    convertToBannerArray(bannerImg) {
      if (typeof bannerImg === "object" && bannerImg !== null && !Array.isArray(bannerImg)) {
        return [bannerImg];
      } else {
        return bannerImg || [];
      }
    },
    navBack() {
      common_vendor.index.navigateBack();
    },
    goSet() {
      common_vendor.index.navigateTo({
        url: "/pages/user/set"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isLoading
  }, $data.isLoading ? {} : $data.goodsInfo ? common_vendor.e({
    c: common_assets._imports_0$4,
    d: common_vendor.o((...args) => $options.navBack && $options.navBack(...args)),
    e: common_vendor.f($options.convertToBannerArray($data.goodsInfo.goods_banner_imgs), (item, index, i0) => {
      return {
        a: item.url,
        b: index
      };
    }),
    f: common_vendor.t($data.goodsInfo.price),
    g: $data.goodsInfo.is_on_sale
  }, $data.goodsInfo.is_on_sale ? {
    h: common_vendor.t(($data.goodsInfo.price * 1.2).toFixed(2))
  } : {}, {
    i: common_vendor.t($data.goodsInfo.name),
    j: common_vendor.t($data.goodsInfo.total_sell_count || "2068"),
    k: $data.goodsInfo.is_hot || $data.goodsInfo.is_new || $data.goodsInfo.is_best
  }, $data.goodsInfo.is_hot || $data.goodsInfo.is_new || $data.goodsInfo.is_best ? common_vendor.e({
    l: $data.goodsInfo.is_hot
  }, $data.goodsInfo.is_hot ? {} : {}, {
    m: $data.goodsInfo.is_new
  }, $data.goodsInfo.is_new ? {} : {}, {
    n: $data.goodsInfo.is_best
  }, $data.goodsInfo.is_best ? {} : {}) : {}, {
    o: common_vendor.f($options.convertToBannerArray($data.goodsInfo.goods_banner_imgs), (item, index, i0) => {
      return {
        a: item.url,
        b: index
      };
    }),
    p: common_vendor.t($data.isFavorite ? "❤️" : "🤍"),
    q: common_vendor.o((...args) => $options.toggleFavorite && $options.toggleFavorite(...args)),
    r: common_vendor.o((...args) => $options.showPopup && $options.showPopup(...args)),
    s: $data.showBuyPopup
  }, $data.showBuyPopup ? {
    t: common_vendor.o((...args) => $options.hidePopup && $options.hidePopup(...args))
  } : {}, {
    v: common_vendor.o((...args) => $options.hidePopup && $options.hidePopup(...args)),
    w: common_vendor.p({
      type: "checkbox-filled",
      color: "#67c23a",
      size: "16"
    }),
    x: $options.userInfo
  }, $options.userInfo ? {
    y: common_assets._imports_1$2,
    z: common_vendor.t($options.userInfo.username),
    A: common_vendor.t($options.maskPhone($options.userInfo.mobile)),
    B: common_vendor.t($options.userInfo.address),
    C: common_vendor.p({
      type: "right",
      size: "30",
      color: "#999"
    }),
    D: common_vendor.o((...args) => $options.goSet && $options.goSet(...args))
  } : {}, {
    E: $data.goodsInfo.goods_thumb.fileID,
    F: common_vendor.t($data.goodsInfo.group_price || $data.goodsInfo.price),
    G: common_vendor.t($data.goodsInfo.name),
    H: common_vendor.o((...args) => $options.decreaseQuantity && $options.decreaseQuantity(...args)),
    I: common_vendor.t($data.quantity),
    J: common_vendor.o((...args) => $options.increaseQuantity && $options.increaseQuantity(...args)),
    K: common_assets._imports_2$2,
    L: common_vendor.t(($data.goodsInfo.group_price || $data.goodsInfo.price) * $data.quantity),
    M: common_vendor.o((...args) => $options.handlePayment && $options.handlePayment(...args)),
    N: $data.showBuyPopup ? 1 : ""
  }) : {}, {
    b: $data.goodsInfo
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/mall-details.js.map
