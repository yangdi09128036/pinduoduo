"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      walletInfo: {
        _id: "",
        balance: 0,
        user_id: ""
      },
      transactions: [],
      rechargeAmount: "",
      quickAmounts: [50, 100, 200, 500, 1e3, 2e3]
    };
  },
  computed: {
    userInfo() {
      return uni_modules_uniIdPages_common_store.store.userInfo;
    }
  },
  onLoad() {
    this.loadWalletInfo();
  },
  // 添加页面显示时的钩子，确保每次显示页面都刷新钱包信息
  onShow() {
    this.loadWalletInfo();
  },
  methods: {
    // 根据交易类型和是否有productImage决定显示哪个图片
    getTransactionImage(transaction) {
      common_vendor.index.__f__("log", "at pages/wallet/wallet.vue:125", "交易记录", transaction);
      if (transaction.type === "credit") {
        return "/static/recharge.png";
      } else if (transaction.type === "debit") {
        return transaction.productImage || "/static/wallet/payment.png";
      }
      return "/static/wallet/payment.png";
    },
    async loadWalletInfo() {
      try {
        common_vendor.index.__f__("log", "at pages/wallet/wallet.vue:138", "加载钱包信息", uni_modules_uniIdPages_common_store.store.userInfo);
        if (!this.userInfo || !this.userInfo._id) {
          common_vendor.index.__f__("error", "at pages/wallet/wallet.vue:140", "User info not available");
          common_vendor.index.showToast({
            title: "用户信息不可用，请先登录",
            icon: "none"
          });
          return;
        }
        const db = common_vendor.nr.database();
        const result = await db.collection("wallet").where({
          user_id: this.userInfo._id
        }).get();
        common_vendor.index.__f__("log", "at pages/wallet/wallet.vue:157", "钱包查询结果", result);
        if (result && result.result && result.result.data && result.result.data.length > 0) {
          this.walletInfo = result.result.data[0];
          common_vendor.index.__f__("log", "at pages/wallet/wallet.vue:162", "获取到钱包信息", this.walletInfo);
        } else {
          common_vendor.index.__f__("log", "at pages/wallet/wallet.vue:164", "未找到钱包，创建新钱包");
          await this.createWallet();
        }
        await this.loadTransactions();
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/wallet/wallet.vue:172", "加载钱包信息失败:", error);
        common_vendor.index.showToast({
          title: "加载钱包信息失败",
          icon: "none"
        });
      }
    },
    async createWallet() {
      try {
        const db = common_vendor.nr.database();
        const checkResult = await db.collection("wallet").where({
          user_id: this.userInfo._id
        }).get();
        if (checkResult && checkResult.result && checkResult.result.data && checkResult.result.data.length > 0) {
          this.walletInfo = checkResult.result.data[0];
          common_vendor.index.__f__("log", "at pages/wallet/wallet.vue:193", "找到已存在的钱包", this.walletInfo);
          return;
        }
        const result = await db.collection("wallet").add({
          user_id: this.userInfo._id,
          balance: 0
        });
        common_vendor.index.__f__("log", "at pages/wallet/wallet.vue:203", "创建钱包结果", result);
        if (result && result.result && result.result.id) {
          this.walletInfo = {
            _id: result.result.id,
            user_id: this.userInfo._id,
            balance: 0
          };
          common_vendor.index.__f__("log", "at pages/wallet/wallet.vue:212", "新钱包信息", this.walletInfo);
        } else {
          throw new Error("创建钱包失败，未返回有效ID");
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/wallet/wallet.vue:217", "创建钱包失败:", error);
        common_vendor.index.showToast({
          title: "创建钱包失败",
          icon: "none"
        });
      }
    },
    async loadTransactions() {
      try {
        const db = common_vendor.nr.database();
        const result = await db.collection("wallet_transactions").where({
          user_id: this.userInfo._id
        }).orderBy("created_at", "desc").limit(10).get();
        if (result && result.result && result.result.data) {
          this.transactions = result.result.data;
          common_vendor.index.__f__("log", "at pages/wallet/wallet.vue:238", "交易记录加载成功:", this.transactions);
        } else {
          common_vendor.index.__f__("log", "at pages/wallet/wallet.vue:240", "没有交易记录或结构不正确", result);
          this.transactions = [];
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/wallet/wallet.vue:244", "加载交易记录失败:", error);
        common_vendor.index.showToast({
          title: "加载交易记录失败",
          icon: "none"
        });
      }
    },
    async handleRecharge() {
      try {
        if (!this.walletInfo._id) {
          common_vendor.index.__f__("log", "at pages/wallet/wallet.vue:255", "钱包信息不完整，重新加载");
          await this.loadWalletInfo();
          if (!this.walletInfo._id) {
            common_vendor.index.showToast({
              title: "钱包信息加载失败，请重试",
              icon: "none"
            });
            return;
          }
        }
        const amount = parseFloat(this.rechargeAmount);
        if (isNaN(amount) || amount <= 0) {
          common_vendor.index.showToast({
            title: "请输入有效金额",
            icon: "none"
          });
          return;
        }
        const currentBalance = typeof this.walletInfo.balance === "number" ? this.walletInfo.balance : 0;
        if (typeof currentBalance !== "number") {
          common_vendor.index.__f__("error", "at pages/wallet/wallet.vue:281", "钱包余额数据类型不正确");
          common_vendor.index.showToast({
            title: "充值失败，请重试",
            icon: "none"
          });
          return;
        }
        const db = common_vendor.nr.database();
        common_vendor.index.__f__("log", "at pages/wallet/wallet.vue:290", "充值前的余额", currentBalance);
        const newBalance = currentBalance + amount;
        common_vendor.index.__f__("log", "at pages/wallet/wallet.vue:292", "充值后的余额", newBalance);
        const updateResult = await db.collection("wallet").doc(this.walletInfo._id).update({
          balance: newBalance,
          updated_at: Date.now()
        });
        common_vendor.index.__f__("log", "at pages/wallet/wallet.vue:300", "更新结果", updateResult);
        if (!updateResult || !updateResult.result || !updateResult.result.updated) {
          common_vendor.index.__f__("error", "at pages/wallet/wallet.vue:304", "更新钱包余额失败", updateResult);
          common_vendor.index.showToast({
            title: "充值失败，请重试",
            icon: "none"
          });
          return;
        }
        const transactionResult = await db.collection("wallet_transactions").add({
          user_id: this.userInfo._id,
          amount,
          type: "credit",
          balance: newBalance
        });
        common_vendor.index.__f__("log", "at pages/wallet/wallet.vue:320", "交易记录创建结果", transactionResult);
        this.walletInfo.balance = newBalance;
        await this.loadTransactions();
        common_vendor.index.showToast({
          title: "充值成功",
          icon: "success"
        });
        this.hideRechargePopup();
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/wallet/wallet.vue:335", "充值失败:", error);
        common_vendor.index.showToast({
          title: "充值失败，请重试",
          icon: "none"
        });
      }
    },
    formatBalance(balance) {
      const numBalance = typeof balance === "number" ? balance : 0;
      return numBalance.toFixed(2);
    },
    formatDate(timestamp) {
      if (!timestamp)
        return "";
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    },
    handleWithdraw() {
      common_vendor.index.showToast({
        title: "提现功能正在开发",
        icon: "none"
      });
    },
    showRechargePopup() {
      this.$refs.rechargePopup.open();
    },
    hideRechargePopup() {
      this.$refs.rechargePopup.close();
      this.rechargeAmount = "";
    },
    selectQuickAmount(amount) {
      this.rechargeAmount = amount.toString();
    },
    viewAllTransactions() {
      common_vendor.index.showToast({
        title: "正在开发中",
        icon: "none"
      });
    },
    navBack() {
      common_vendor.index.navigateBack();
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
    b: common_vendor.o((...args) => $options.navBack && $options.navBack(...args)),
    c: common_vendor.t($options.formatBalance($data.walletInfo.balance)),
    d: common_vendor.o((...args) => $options.handleWithdraw && $options.handleWithdraw(...args)),
    e: common_vendor.o((...args) => $options.showRechargePopup && $options.showRechargePopup(...args)),
    f: common_vendor.t($options.formatBalance($data.walletInfo.balance)),
    g: common_vendor.o((...args) => $options.viewAllTransactions && $options.viewAllTransactions(...args)),
    h: common_vendor.f($data.transactions, (transaction, index, i0) => {
      return {
        a: $options.getTransactionImage(transaction),
        b: common_vendor.t(transaction.type === "debit" ? "拼多多订单支付" : "多多钱包余额充值"),
        c: common_vendor.t($options.formatDate(transaction.created_at)),
        d: common_vendor.t(transaction.type === "debit" ? "-" : "+"),
        e: common_vendor.t(transaction.amount.toFixed(2)),
        f: common_vendor.n(transaction.type === "debit" ? "debit" : "credit"),
        g: common_vendor.t(transaction.balance.toFixed(2)),
        h: index
      };
    }),
    i: common_vendor.o((...args) => $options.hideRechargePopup && $options.hideRechargePopup(...args)),
    j: $data.rechargeAmount,
    k: common_vendor.o(($event) => $data.rechargeAmount = $event.detail.value),
    l: common_vendor.f($data.quickAmounts, (amount, k0, i0) => {
      return {
        a: common_vendor.t(amount),
        b: amount,
        c: common_vendor.o(($event) => $options.selectQuickAmount(amount), amount),
        d: $data.rechargeAmount === amount.toString() ? 1 : ""
      };
    }),
    m: common_vendor.o((...args) => $options.handleRecharge && $options.handleRecharge(...args)),
    n: !$data.rechargeAmount || parseFloat($data.rechargeAmount) <= 0,
    o: common_vendor.sr("rechargePopup", "4d16f277-0"),
    p: common_vendor.p({
      type: "bottom"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/wallet/wallet.js.map
