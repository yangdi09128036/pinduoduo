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
      tabs: ["全部", "待付款", "待分享", "待发货", "待收货", "评价"],
      currentTab: 0,
      orderList: {
        0: [],
        // 全部
        1: [],
        // 待付款
        2: [],
        // 待分享
        3: [],
        // 待发货
        4: [],
        // 待收货
        5: []
        // 评价
      },
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
      },
      randomGoods: [],
      // 推荐商品列表
      reviewContent: "",
      // 评价内容
      currentOrderForReview: null,
      // 当前要评价的订单
      shareCountdown: 5,
      // 分享倒计时
      shareTimer: null
      // 分享倒计时定时器
    };
  },
  onLoad(options) {
    if (options.type) {
      const typeMap = {
        "pending": 1,
        "share": 2,
        "shipping": 3,
        "receiving": 4,
        "review": 5
      };
      this.currentTab = typeMap[options.type] || 0;
    }
    this.loadOrderData();
    this.getRandomGoods();
  },
  onShow() {
    this.loadOrderData();
  },
  onUnload() {
    if (this.shareTimer) {
      clearInterval(this.shareTimer);
    }
  },
  methods: {
    async loadOrderData() {
      try {
        if (!this.userInfo || !this.userInfo._id) {
          common_vendor.index.showToast({
            title: "请先登录",
            icon: "none"
          });
          return;
        }
        const db = common_vendor.nr.database();
        for (let i = 1; i <= 5; i++) {
          this.orderCounts[i] = 0;
        }
        let query = {
          userId: this.userInfo._id
        };
        switch (this.currentTab) {
          case 1:
            query.paymentStatus = 0;
            break;
          case 2:
            query.paymentStatus = 1;
            query.shareStatus = 0;
            break;
          case 3:
            query.paymentStatus = 1;
            query.shippingStatus = 0;
            break;
          case 4:
            query.shippingStatus = 1;
            query.deliveryStatus = 0;
            break;
          case 5:
            query.deliveryStatus = 1;
            query.review = db.command.exists(true);
            break;
        }
        const result = await db.collection("order").where(query).orderBy("createdAt", "desc").get();
        if (result.result.data) {
          this.orderList[this.currentTab] = result.result.data;
          if (this.currentTab === 3 && this.orderList[this.currentTab].length > 0) {
            this.orderList[this.currentTab].forEach((order) => {
              if (order.shippingStatus === 0) {
                this.startAutoShipping(order);
              }
            });
          }
        } else {
          this.orderList[this.currentTab] = [];
        }
        if (this.currentTab === 0) {
          const allResult = await db.collection("order").where({
            userId: this.userInfo._id
          }).orderBy("createdAt", "desc").get();
          if (allResult.result.data) {
            this.orderList[0] = allResult.result.data;
          } else {
            this.orderList[0] = [];
          }
        }
        await this.getOrderCounts();
        common_vendor.index.setStorageSync("orderCounts", this.orderCounts);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/user/order.vue:329", "加载订单数据失败:", error);
        common_vendor.index.showToast({
          title: "加载订单数据失败",
          icon: "none"
        });
      }
    },
    async getOrderCounts() {
      try {
        const db = common_vendor.nr.database();
        const queries = [
          // 待付款
          db.collection("order").where({
            userId: this.userInfo._id,
            paymentStatus: 0
          }).count(),
          // 待分享
          db.collection("order").where({
            userId: this.userInfo._id,
            paymentStatus: 1,
            shareStatus: 0
          }).count(),
          // 待发货
          db.collection("order").where({
            userId: this.userInfo._id,
            paymentStatus: 1,
            shippingStatus: 0
          }).count(),
          // 待收货
          db.collection("order").where({
            userId: this.userInfo._id,
            shippingStatus: 1,
            deliveryStatus: 0
          }).count(),
          // 已评价
          db.collection("order").where({
            userId: this.userInfo._id,
            deliveryStatus: 1,
            review: db.command.exists(true)
          }).count()
        ];
        const results = await Promise.all(queries);
        for (let i = 0; i < results.length; i++) {
          this.orderCounts[i + 1] = results[i].result.total;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/user/order.vue:386", "获取订单数量失败:", error);
      }
    },
    async getRandomGoods() {
      try {
        const { result } = await common_vendor.nr.database().collection("mall-goods").limit(8).get();
        this.randomGoods = this.shuffleArray(result.data || []);
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/user/order.vue:394", "获取商品数据失败:", err);
      }
    },
    shuffleArray(array) {
      if (!Array.isArray(array)) {
        return [];
      }
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    },
    getOrderStatus(order) {
      if (order.paymentStatus === 0)
        return "待付款";
      if (order.paymentStatus === 1 && order.shareStatus === 0)
        return "待分享";
      if (order.paymentStatus === 1 && order.shippingStatus === 0)
        return "待发货";
      if (order.shippingStatus === 1 && order.deliveryStatus === 0)
        return "待收货";
      if (order.deliveryStatus === 1 && !order.review)
        return "待评价";
      return "已完成";
    },
    switchTab(index) {
      this.currentTab = index;
      this.loadOrderData();
      common_vendor.index.__f__("log", "at pages/user/order.vue:419", `切换到选项卡 ${index}，数据:`, this.orderList[index]);
    },
    handleSwiperChange(e) {
      this.currentTab = e.detail.current;
      this.loadOrderData();
      common_vendor.index.__f__("log", "at pages/user/order.vue:424", `切换到选项卡 ${this.currentTab}，数据:`, this.orderList[this.currentTab]);
    },
    async goToPay(order) {
      var _a;
      const paymentData = {
        amount: order.amount,
        userId: this.userInfo._id,
        username: this.userInfo.username,
        mobile: this.userInfo.mobile,
        avatar: ((_a = this.userInfo.avatar_file) == null ? void 0 : _a.path) || "/static/avatar-default.png",
        productId: order.productId,
        productName: order.productName,
        productImage: order.productImage,
        quantity: order.quantity
      };
      common_vendor.index.setStorageSync("paymentData", paymentData);
      common_vendor.index.setStorageSync("currentOrderIds", [order._id]);
      common_vendor.index.navigateTo({
        url: "/pages/wallet/pay"
      });
    },
    async cancelOrder(order) {
      try {
        const db = common_vendor.nr.database();
        await db.collection("order").doc(order._id).update({
          paymentStatus: 2
          // 取消状态
        });
        common_vendor.index.showToast({
          title: "订单已取消",
          icon: "success"
        });
        this.loadOrderData();
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/user/order.vue:456", "取消订单失败:", error);
        common_vendor.index.showToast({
          title: "取消订单失败",
          icon: "none"
        });
      }
    },
    shareOrderWithDelay(order) {
      this.shareCountdown = 3;
      this.$refs.sharePopup.open();
      this.shareTimer = setInterval(() => {
        this.shareCountdown--;
        if (this.shareCountdown <= 0) {
          clearInterval(this.shareTimer);
          this.$refs.sharePopup.close();
          this.shareOrder(order);
        }
      }, 1e3);
    },
    async shareOrder(order) {
      try {
        const db = common_vendor.nr.database();
        await db.collection("order").doc(order._id).update({
          shareStatus: 1
          // 已分享状态
        });
        common_vendor.index.showToast({
          title: "分享成功",
          icon: "success"
        });
        this.loadOrderData();
        setTimeout(async () => {
          try {
            await db.collection("order").doc(order._id).update({
              shippingStatus: 1
              // 已发货状态
            });
            common_vendor.index.__f__("log", "at pages/user/order.vue:496", "订单自动发货成功:", order._id);
            this.loadOrderData();
          } catch (error) {
            common_vendor.index.__f__("error", "at pages/user/order.vue:499", "自动发货失败:", error);
          }
        }, 3e3);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/user/order.vue:503", "分享订单失败:", error);
        common_vendor.index.showToast({
          title: "分享失败",
          icon: "none"
        });
      }
    },
    async confirmReceipt(order) {
      try {
        const db = common_vendor.nr.database();
        await db.collection("order").doc(order._id).update({
          deliveryStatus: 1
          // 已收货状态
        });
        this.showReviewPopup(order);
        this.loadOrderData();
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/user/order.vue:522", "确认收货失败:", error);
        common_vendor.index.showToast({
          title: "确认收货失败",
          icon: "none"
        });
      }
    },
    showReviewPopup(order) {
      this.currentOrderForReview = order;
      this.reviewContent = "";
      if (this.$refs.reviewPopup) {
        this.$refs.reviewPopup.open();
      } else {
        common_vendor.index.__f__("error", "at pages/user/order.vue:536", "评价弹窗组件不存在");
        common_vendor.index.showToast({
          title: "评价功能暂时不可用",
          icon: "none"
        });
      }
    },
    hideReviewPopup() {
      if (this.$refs.reviewPopup) {
        this.$refs.reviewPopup.close();
      }
      this.currentOrderForReview = null;
      this.reviewContent = "";
    },
    async submitReview() {
      if (!this.reviewContent.trim()) {
        common_vendor.index.showToast({
          title: "请输入评价内容",
          icon: "none"
        });
        return;
      }
      try {
        const db = common_vendor.nr.database();
        await db.collection("order").doc(this.currentOrderForReview._id).update({
          review: this.reviewContent,
          updatedAt: (/* @__PURE__ */ new Date()).getTime()
        });
        common_vendor.index.showToast({
          title: "评价成功",
          icon: "success"
        });
        this.hideReviewPopup();
        this.loadOrderData();
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/user/order.vue:572", "提交评价失败:", error);
        common_vendor.index.showToast({
          title: "提交评价失败",
          icon: "none"
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
          common_vendor.index.navigateTo({
            url: "../search/mall-details"
          });
        }
      });
    },
    navigateBack() {
      common_vendor.index.switchTab({
        url: "/pages/user/user"
      });
    },
    handleScroll() {
    },
    startAutoShipping(order) {
      setTimeout(async () => {
        try {
          const db = common_vendor.nr.database();
          await db.collection("order").doc(order._id).update({
            shippingStatus: 1
            // 已发货状态
          });
          common_vendor.index.__f__("log", "at pages/user/order.vue:607", "订单自动发货成功:", order._id);
          this.loadOrderData();
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/user/order.vue:610", "自动发货失败:", error);
        }
      }, 5e3);
    },
    navigateToProductDetails(productId) {
      if (!productId) {
        common_vendor.index.showToast({
          title: "商品信息不完整",
          icon: "none"
        });
        return;
      }
      common_vendor.index.__f__("log", "at pages/user/order.vue:625", "跳转商品详情页的商品id", productId);
      const db = common_vendor.nr.database();
      db.collection("mall-goods").doc(productId).get().then((res) => {
        common_vendor.index.__f__("log", "at pages/user/order.vue:628", "跳转商品详情页的商品数据", res.result.data[0]);
        if (res.result.data) {
          common_vendor.index.setStorage({
            key: "currentProduct",
            data: res.result.data[0],
            success: () => {
              common_vendor.index.navigateTo({
                url: "../search/mall-details"
              });
            }
          });
        } else {
          common_vendor.index.showToast({
            title: "商品不存在或已下架",
            icon: "none"
          });
        }
      }).catch((err) => {
        common_vendor.index.__f__("error", "at pages/user/order.vue:646", "获取商品详情失败:", err);
        common_vendor.index.showToast({
          title: "获取商品详情失败",
          icon: "none"
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$4,
    b: common_vendor.o((...args) => $options.navigateBack && $options.navigateBack(...args)),
    c: common_vendor.f($data.tabs, (tab, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab),
        b: $data.currentTab === index
      }, $data.currentTab === index ? {} : {}, {
        c: index,
        d: "tab" + index,
        e: $data.currentTab === index ? 1 : "",
        f: common_vendor.o(($event) => $options.switchTab(index), index)
      });
    }),
    d: "tab" + $data.currentTab,
    e: common_vendor.o((...args) => $options.handleScroll && $options.handleScroll(...args)),
    f: common_vendor.f($data.tabs, (tab, index, i0) => {
      return common_vendor.e({
        a: $data.orderList[index] && $data.orderList[index].length > 0 && $data.currentTab !== 5
      }, $data.orderList[index] && $data.orderList[index].length > 0 && $data.currentTab !== 5 ? {
        b: common_vendor.f($data.orderList[index], (order, orderIndex, i1) => {
          return common_vendor.e({
            a: common_vendor.t($options.getOrderStatus(order)),
            b: order.productImage,
            c: common_vendor.t(order.productName),
            d: common_vendor.t(order.description),
            e: common_vendor.t(order.quantity),
            f: common_vendor.t(order.amount),
            g: common_vendor.o(($event) => $options.navigateToProductDetails(order.productId), orderIndex)
          }, $data.currentTab === 0 ? common_vendor.e({
            h: order.paymentStatus === 0
          }, order.paymentStatus === 0 ? {
            i: common_vendor.o(($event) => $options.cancelOrder(order), orderIndex),
            j: common_vendor.o(($event) => $options.goToPay(order), orderIndex)
          } : order.paymentStatus === 1 && order.shareStatus === 0 ? {
            l: common_vendor.o(($event) => $options.cancelOrder(order), orderIndex),
            m: common_vendor.o(($event) => $options.shareOrderWithDelay(order), orderIndex)
          } : order.shippingStatus === 1 && order.deliveryStatus === 0 ? {
            o: common_vendor.o(($event) => $options.confirmReceipt(order), orderIndex)
          } : {}, {
            k: order.paymentStatus === 1 && order.shareStatus === 0,
            n: order.shippingStatus === 1 && order.deliveryStatus === 0
          }) : $data.currentTab === 1 ? {
            p: common_vendor.o(($event) => $options.cancelOrder(order), orderIndex),
            q: common_vendor.o(($event) => $options.goToPay(order), orderIndex)
          } : $data.currentTab === 2 ? {
            r: common_vendor.o(($event) => $options.cancelOrder(order), orderIndex),
            s: common_vendor.o(($event) => $options.shareOrderWithDelay(order), orderIndex)
          } : $data.currentTab === 4 ? {
            t: common_vendor.o(($event) => $options.confirmReceipt(order), orderIndex)
          } : {}, {
            v: orderIndex
          });
        }),
        c: common_assets._imports_1$4,
        d: $data.currentTab === 0,
        e: $data.currentTab === 1,
        f: $data.currentTab === 2,
        g: $data.currentTab === 4
      } : {}, $data.currentTab === 5 ? common_vendor.e({
        h: $data.orderList[index] && $data.orderList[index].length > 0
      }, $data.orderList[index] && $data.orderList[index].length > 0 ? {
        i: common_vendor.f($data.orderList[index], (order, orderIndex, i1) => {
          return {
            a: order.productImage,
            b: common_vendor.t(order.productName),
            c: common_vendor.t(order.review),
            d: common_vendor.t(order.quantity),
            e: common_vendor.t(order.amount),
            f: common_vendor.o(($event) => $options.navigateToProductDetails(order.productId), orderIndex),
            g: orderIndex
          };
        }),
        j: common_assets._imports_2$4
      } : {
        k: common_assets._imports_3$2
      }) : {}, {
        l: !$data.orderList[index] || $data.orderList[index].length === 0
      }, !$data.orderList[index] || $data.orderList[index].length === 0 ? {
        m: common_assets._imports_3$2
      } : {}, $data.currentTab !== 0 && $data.currentTab !== 5 ? {
        n: common_vendor.f($data.randomGoods, (item, index2, i1) => {
          var _a;
          return {
            a: (_a = item.goods_thumb) == null ? void 0 : _a.fileID,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: common_vendor.t(item.total_sell_count),
            e: common_vendor.o(($event) => $options.navigateToProduct(item), index2),
            f: index2
          };
        })
      } : {}, {
        o: index
      });
    }),
    g: $data.currentTab === 5,
    h: $data.currentTab !== 0 && $data.currentTab !== 5,
    i: $data.currentTab,
    j: common_vendor.o((...args) => $options.handleSwiperChange && $options.handleSwiperChange(...args)),
    k: common_vendor.o((...args) => $options.hideReviewPopup && $options.hideReviewPopup(...args)),
    l: $data.reviewContent,
    m: common_vendor.o(($event) => $data.reviewContent = $event.detail.value),
    n: common_vendor.o((...args) => $options.submitReview && $options.submitReview(...args)),
    o: common_vendor.sr("reviewPopup", "3c8bc312-0"),
    p: common_vendor.p({
      type: "bottom"
    }),
    q: common_vendor.t($data.shareCountdown),
    r: common_vendor.sr("sharePopup", "3c8bc312-1"),
    s: common_vendor.p({
      type: "center"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/order.js.map
