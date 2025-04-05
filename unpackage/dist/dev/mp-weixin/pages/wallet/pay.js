"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const _sfc_main = {
  data() {
    return {
      paymentData: {
        amount: 0,
        username: "",
        avatar: "",
        productId: "",
        productName: "",
        productImage: "",
        quantity: 1
      },
      selectedMethod: 0,
      paymentMethods: [
        {
          name: "农业银行储蓄卡(0270)",
          icon: "/static/bank-icons/abc.png"
        },
        {
          name: "四川农信储蓄卡(2128)",
          icon: "/static/bank-icons/sc.png"
        },
        {
          name: "农业银行储蓄卡(0073)",
          icon: "/static/bank-icons/abc.png"
        }
      ]
    };
  },
  onLoad() {
    common_vendor.index.__f__("log", "at pages/wallet/pay.vue:78", "用户信息:", uni_modules_uniIdPages_common_store.store.userInfo);
    const paymentData = common_vendor.index.getStorageSync("paymentData");
    if (paymentData) {
      this.paymentData = paymentData;
      common_vendor.index.__f__("log", "at pages/wallet/pay.vue:82", "支付数据", this.paymentData);
    }
    const avatar = uni_modules_uniIdPages_common_store.store.userInfo.avatar_file.url;
    this.paymentData.avatar = avatar;
  },
  methods: {
    maskPhone(phone) {
      if (!phone)
        return "";
      if (phone.length === 11) {
        return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
      }
      return phone;
    },
    selectPaymentMethod(index) {
      this.selectedMethod = index;
    },
    async handleConfirmPayment() {
      const db = common_vendor.nr.database();
      const orderIds = common_vendor.index.getStorageSync("currentOrderIds") || [];
      common_vendor.index.__f__("log", "at pages/wallet/pay.vue:101", "订单ids", orderIds);
      try {
        const walletResult = await db.collection("wallet").where({
          user_id: this.paymentData.userId
        }).get();
        if (walletResult.result.data.length === 0) {
          throw new Error("钱包不存在");
        }
        const wallet = walletResult.result.data[0];
        common_vendor.index.__f__("log", "at pages/wallet/pay.vue:116", "余额", wallet.balance);
        common_vendor.index.__f__("log", "at pages/wallet/pay.vue:117", "本次支付的总金额", this.paymentData.amount);
        const newBalance = wallet.balance - this.paymentData.amount;
        common_vendor.index.__f__("log", "at pages/wallet/pay.vue:119", "支付后的余额", newBalance);
        if (newBalance < 0) {
          common_vendor.index.showToast({
            title: "余额不足",
            icon: "none"
          });
          return;
        }
        await db.collection("wallet").doc(wallet._id).update({
          balance: newBalance,
          updated_at: Date.now()
        });
        for (const orderId of orderIds) {
          await db.collection("order").doc(orderId).update({
            paymentStatus: 1,
            // 已支付
            shareStatus: 0
            // 待分享
          });
        }
        if (Array.isArray(this.paymentData.productId) && this.paymentData.productId.length > 1) {
          const orderResults = await Promise.all(orderIds.map(
            (id) => db.collection("order").doc(id).get()
          ));
          common_vendor.index.__f__("log", "at pages/wallet/pay.vue:149", "最后", orderResults);
          for (const orderResult of orderResults) {
            if (orderResult.result && orderResult.result.data) {
              const order = orderResult.result.data;
              common_vendor.index.__f__("log", "at pages/wallet/pay.vue:155", "单个商品的价格信息", order[0].amount);
              await db.collection("wallet_transactions").add({
                user_id: this.paymentData.userId,
                amount: order[0].amount,
                type: "debit",
                balance: newBalance,
                productImage: order[0].productImage
                // 使用订单中的商品图片
              });
            }
          }
        } else {
          await db.collection("wallet_transactions").add({
            user_id: this.paymentData.userId,
            amount: this.paymentData.amount,
            type: "debit",
            balance: newBalance,
            productImage: this.paymentData.productImage
            // 使用paymentData中的商品图片
          });
        }
        common_vendor.index.setStorageSync("paymentSuccess", true);
        common_vendor.index.showToast({
          title: "支付成功",
          icon: "success"
        });
        common_vendor.index.removeStorageSync("paymentData");
        common_vendor.index.removeStorageSync("currentOrderIds");
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/wallet/pay.vue:194", "支付失败:", error);
        common_vendor.index.showToast({
          title: error.message || "支付失败，请重试",
          icon: "none"
        });
      }
    },
    async handleCancel() {
      const db = common_vendor.nr.database();
      const orderIds = common_vendor.index.getStorageSync("currentOrderIds") || [];
      try {
        for (const orderId of orderIds) {
          await db.collection("order").doc(orderId).update({
            paymentStatus: 0
            // 保持待支付状态
          });
        }
        common_vendor.index.removeStorageSync("paymentData");
        common_vendor.index.removeStorageSync("currentOrderIds");
        common_vendor.index.showToast({
          title: "取消支付",
          icon: "error"
        });
        common_vendor.index.navigateBack();
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/wallet/pay.vue:225", "取消支付失败:", error);
        common_vendor.index.showToast({
          title: "操作失败，请重试",
          icon: "none"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleCancel && $options.handleCancel(...args)),
    b: $data.paymentData.avatar,
    c: common_vendor.t($options.maskPhone($data.paymentData.mobile)),
    d: common_vendor.t($data.paymentData.amount.toFixed(2)),
    e: common_vendor.f($data.paymentMethods, (method, index, i0) => {
      return common_vendor.e({
        a: method.icon,
        b: common_vendor.t(method.name),
        c: $data.selectedMethod === index
      }, $data.selectedMethod === index ? {} : {}, {
        d: index,
        e: common_vendor.o(($event) => $options.selectPaymentMethod(index), index),
        f: $data.selectedMethod === index ? 1 : ""
      });
    }),
    f: common_vendor.o((...args) => $options.handleConfirmPayment && $options.handleConfirmPayment(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/wallet/pay.js.map
