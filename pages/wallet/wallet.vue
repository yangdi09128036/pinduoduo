<template>
	<view class="wallet-container">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="nav-left" @click="navBack">
				<image src="/static/left.png" mode="" class="nav-icon"></image>
				<text class="nav-title">余额</text>
			</view>
		</view>

		<!-- 余额卡片 -->
		<view class="balance-card">
			<view class="security-tip">
				<text class="security-icon">🛡️</text>
				<text class="security-text">资金安全有保障</text>
				<text class="security-arrow">></text>
			</view>

			<view class="balance-section">
				<text>可用余额(元)</text>
				<text class="balance-amount">{{ formatBalance(walletInfo.balance) }}</text>
			</view>

			<view class="action-buttons">
				<button class="action-btn withdraw" @click="handleWithdraw">提现</button>
				<button class="action-btn recharge" @click="showRechargePopup">充值</button>
			</view>

			<view class="promo-banner">
				<view class="promo-icon">🔊</view>
				<text class="promo-text">余额{{ formatBalance(walletInfo.balance) }}元，每天支付享立减</text>
				<text class="promo-link">去看看</text>
			</view>
		</view>

		<!-- 交易记录 -->
		<view class="transactions">
			<view class="transactions-header">
				<text class="header-title">余额变动明细</text>
				<text class="header-link" @click="viewAllTransactions">全部 ></text>
			</view>
			<view class="transaction-list">
				<view class="transaction-item" v-for="(transaction, index) in transactions" :key="index">
					<view class="transaction-icon">
						<!-- 修改这里：根据交易类型和是否有productImage决定显示哪个图片 -->
						<image :src="getTransactionImage(transaction)" class="trans-icon"></image>
					</view>
					<view class="transaction-info">
						<text
							class="transaction-title">{{ transaction.type === 'debit' ? '拼多多订单支付' : '多多钱包余额充值' }}</text>
						<view>
							<text class="transaction-time">{{ formatDate(transaction.created_at) }}</text>
						</view>
					</view>
					<view class="transaction-amount">
						<text :class="['amount', transaction.type === 'debit' ? 'debit' : 'credit']">
							{{ transaction.type === 'debit' ? '-' : '+' }}{{ transaction.amount.toFixed(2) }}
						</text>
						<text class="balance">余额{{ transaction.balance.toFixed(2) }}元</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 充值弹窗 -->
		<uni-popup ref="rechargePopup" type="bottom">
			<view class="recharge-popup">
				<view class="popup-header">
					<text class="popup-title">充值金额</text>
					<text class="popup-close" @click="hideRechargePopup">×</text>
				</view>
				<view class="amount-input">
					<text class="currency-symbol">¥</text>
					<input type="digit" v-model="rechargeAmount" class="amount-field" placeholder="请输入充值金额" />
				</view>
				<view class="quick-amounts">
					<view class="amount-option" v-for="amount in quickAmounts" :key="amount"
						@click="selectQuickAmount(amount)"
						:class="{ 'selected': rechargeAmount === amount.toString() }">
						¥{{ amount }}
					</view>
				</view>
				<button class="confirm-recharge" @click="handleRecharge"
					:disabled="!rechargeAmount || parseFloat(rechargeAmount) <= 0">
					确认充值
				</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		store
	} from '@/uni_modules/uni-id-pages/common/store.js'

	export default {
		data() {
			return {
				walletInfo: {
					_id: '',
					balance: 0,
					user_id: ''
				},
				transactions: [],
				rechargeAmount: '',
				quickAmounts: [50, 100, 200, 500, 1000, 2000]
			}
		},
		computed: {
			userInfo() {
				return store.userInfo
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
				console.log("交易记录", transaction);
				if (transaction.type === 'credit') {
					// 充值交易，使用充值图标
					return '/static/recharge.png';
				} else if (transaction.type === 'debit') {
					// 消费交易，如果有商品图片则使用商品图片，否则使用默认支付图标
					return transaction.productImage || '/static/wallet/payment.png';
				}
				// 默认图标
				return '/static/wallet/payment.png';
			},
			async loadWalletInfo() {
				try {
					console.log('加载钱包信息', store.userInfo);
					if (!this.userInfo || !this.userInfo._id) {
						console.error('User info not available');
						uni.showToast({
							title: '用户信息不可用，请先登录',
							icon: 'none'
						});
						return;
					}

					const db = uniCloud.database();

					// 修改查询方式，确保能正确获取钱包信息
					const result = await db.collection('wallet')
						.where({
							user_id: this.userInfo._id
						})
						.get();

					console.log('钱包查询结果', result);

					// 检查数据结构，确保正确处理
					if (result && result.result && result.result.data && result.result.data.length > 0) {
						this.walletInfo = result.result.data[0];
						console.log("获取到钱包信息", this.walletInfo);
					} else {
						console.log("未找到钱包，创建新钱包");
						await this.createWallet();
					}

					// 加载交易记录
					await this.loadTransactions();

				} catch (error) {
					console.error('加载钱包信息失败:', error);
					uni.showToast({
						title: '加载钱包信息失败',
						icon: 'none'
					});
				}
			},
			async createWallet() {
			    try {
			        const db = uniCloud.database();
			        const checkResult = await db.collection('wallet')
			            .where({
			                user_id: this.userInfo._id
			            })
			            .get();
			
			        if (checkResult && checkResult.result && checkResult.result.data && checkResult.result.data.length > 0) {
			            this.walletInfo = checkResult.result.data[0];
			            console.log('找到已存在的钱包', this.walletInfo);
			            return;
			        }
			
			        const result = await db.collection('wallet').add({
			            user_id: this.userInfo._id,
			            balance: 0 // 确保余额初始化为0
			        });
			
			        if (result && result.result && result.result.id) {
			            this.walletInfo = {
			                _id: result.result.id,
			                user_id: this.userInfo._id,
			                balance: 0 // 确保余额初始化为0
			            };
			            console.log('新钱包信息', this.walletInfo);
			            // 立即加载钱包信息，确保数据同步
			            await this.loadWalletInfo();
			        } else {
			            throw new Error('创建钱包失败，未返回有效ID');
			        }
			    } catch (error) {
			        console.error('创建钱包失败:', error);
			        uni.showToast({
			            title: '创建钱包失败',
			            icon: 'none'
			        });
			    }
			},
			async loadTransactions() {
				try {
					const db = uniCloud.database();
					const result = await db.collection('wallet_transactions')
						.where({
							user_id: this.userInfo._id
						})
						.orderBy('created_at', 'desc')
						.limit(10)
						.get();

					// 确保我们使用正确的数据结构
					if (result && result.result && result.result.data) {
						this.transactions = result.result.data;
						console.log('交易记录加载成功:', this.transactions);
					} else {
						console.log('没有交易记录或结构不正确', result);
						this.transactions = [];
					}
				} catch (error) {
					console.error('加载交易记录失败:', error);
					uni.showToast({
						title: '加载交易记录失败',
						icon: 'none'
					});
				}
			},
			async handleRecharge() {
			    try {
			        if (!this.walletInfo._id) {
			            console.log('钱包信息不完整，重新加载');
			            await this.loadWalletInfo();
			
			            if (!this.walletInfo._id) {
			                uni.showToast({
			                    title: '钱包信息加载失败，请重试',
			                    icon: 'none'
			                });
			                return;
			            }
			        }
			
			        const amount = parseFloat(this.rechargeAmount);
			        if (isNaN(amount) || amount <= 0) {
			            uni.showToast({
			                title: '请输入有效金额',
			                icon: 'none'
			            });
			            return;
			        }
			
			        const currentBalance = typeof this.walletInfo.balance === 'number' ? this.walletInfo.balance : 0;
			
			        const newBalance = currentBalance + amount;
			
			        const db = uniCloud.database();
			        const updateResult = await db.collection('wallet').doc(this.walletInfo._id).update({
			            balance: newBalance,
			            updated_at: Date.now()
			        });
			
			        if (!updateResult || !updateResult.result || !updateResult.result.updated) {
			            console.error('更新钱包余额失败', updateResult);
			            uni.showToast({
			                title: '充值失败，请重试',
			                icon: 'none'
			            });
			            return;
			        }
			
			        const transactionResult = await db.collection('wallet_transactions').add({
			            user_id: this.userInfo._id,
			            amount: amount,
			            type: 'credit',
			            balance: newBalance
			        });
			
			        console.log("交易记录创建结果", transactionResult);
			
			        // 更新本地数据
			        this.walletInfo.balance = newBalance;
			
			        // 重新加载交易记录
			        await this.loadTransactions();
			
			        uni.showToast({
			            title: '充值成功',
			            icon: 'success'
			        });
			
			        this.hideRechargePopup();
			    } catch (error) {
			        console.error('充值失败:', error);
			        uni.showToast({
			            title: '充值失败，请重试',
			            icon: 'none'
			        });
			    }
			},
			formatBalance(balance) {
				// 确保 balance 是数字
				const numBalance = typeof balance === 'number' ? balance : 0;
				return numBalance.toFixed(2);
			},
			formatDate(timestamp) {
				if (!timestamp) return '';
				const date = new Date(timestamp);
				return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
			},
			handleWithdraw() {
				uni.showToast({
					title: '提现功能正在开发',
					icon: 'none'
				});
			},
			showRechargePopup() {
				this.$refs.rechargePopup.open();
			},
			hideRechargePopup() {
				this.$refs.rechargePopup.close();
				this.rechargeAmount = '';
			},
			selectQuickAmount(amount) {
				this.rechargeAmount = amount.toString();
			},
			viewAllTransactions() {
				// 查看全部交易记录
				uni.showToast({
					title: '正在开发中',
					icon: 'none'
				});
			},
			navBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped>
	.wallet-container {
		min-height: 100vh;
		background-color: #f5f5f5;
	}

	.nav-bar {
		background: #CC3333;
		padding: 40px 20px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
	}

	.nav-left {
		display: flex;
		align-items: center;
	}

	.nav-icon {
		width: 60rpx;
		height: 60rpx;
		margin-right: 10px;
	}

	.nav-title {
		font-size: 22px;
	}

	.nav-more {
		font-size: 24px;
	}

	.balance-card {
		background: #fff;
		margin: 20px;
		border-radius: 12px;
		padding: 20px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.security-tip {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
	}

	.security-text {
		color: #666;
		margin: 0 10px;
		font-size: 14px;
	}

	.balance-section {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 30px;
	}

	.balance-label {
		justify-content: center;
		display: flex;
		align-items: center;
		color: #666;
		margin-bottom: 10px;
	}


	.balance-amount {
		align-content: center;
		font-size: 40px;
		font-weight: bold;
		margin-left: 20rpx;
	}

	.action-buttons {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.action-btn {
		width: 45%;
		height: 40px;
		border-radius: 20px;
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.withdraw {
		background: #fff;
		border: 1px solid #ddd;
		color: #333;
	}

	.recharge {
		background: #CC3333;
		color: #fff;
		border: none;
	}

	.promo-banner {
		display: flex;
		align-items: center;
		background: #f8f8f8;
		padding: 10px;
		border-radius: 6px;
	}

	.promo-icon {
		margin-right: 10px;
	}

	.promo-text {
		flex: 1;
		font-size: 14px;
		color: #666;
	}

	.promo-link {
		color: #ff5762;
		font-size: 14px;
	}

	.quick-actions {
		background: #fff;
		margin: 20px;
		border-radius: 12px;
		padding: 20px;
		display: flex;
		justify-content: space-between;
	}

	.action-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.action-icon {
		width: 30px;
		height: 30px;
		margin-bottom: 5px;
	}

	.action-name {
		font-size: 12px;
		color: #666;
	}

	.action-badge {
		position: absolute;
		top: -5px;
		right: -5px;
		background: #ff5722;
		color: #fff;
		font-size: 10px;
		padding: 2px 5px;
		border-radius: 10px;
	}

	.card-management {
		background: #fff;
		margin: 20px;
		border-radius: 12px;
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.card-text {
		flex: 1;
	}

	.card-title {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.card-actions {
		font-size: 14px;
		color: #666;
	}

	.card-link {
		color: #ff5722;
		margin-left: 10px;
	}

	.card-image {
		width: 80px;
		height: 80px;
	}

	.transactions {
		background: #fff;
		margin: 20px;
		border-radius: 12px;
		padding: 20px;
	}

	.transactions-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.header-title {
		font-size: 16px;
		font-weight: bold;
	}

	.header-link {
		color: #666;
		font-size: 14px;
	}

	.transaction-item {
		display: flex;
		align-items: center;
		padding: 15px 0;
		border-bottom: 1px solid #f5f5f5;
	}

	.transaction-icon {
		width: 60px;
		height: 60px;
		margin-right: 15px;
	}

	.trans-icon {
		width: 100%;
		height: 100%;
		border-radius: 4px;
		object-fit: cover;
	}

	.transaction-info {
		flex: 1;
	}

	.transaction-title {
		font-size: 30rpx;
		margin-bottom: 5px;
	}

	.transaction-time {
		font-size: 24rpx;
		color: #999;
	}

	.transaction-amount {
		text-align: right;
	}

	.amount {
		font-size: 30rpx;
		font-weight: bold;
		margin-bottom: 5px;
		display: block;
	}

	.debit {
		color: #333;
	}

	.credit {
		color: #2196f3;
	}

	.balance {
		font-size: 24rpx;
		color: #999;
	}

	.recharge-popup {
		background: #fff;
		border-radius: 20px 20px 0 0;
		padding: 20px;
	}

	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}

	.popup-title {
		font-size: 18px;
		font-weight: bold;
	}

	.popup-close {
		font-size: 24px;
		color: #999;
	}

	.amount-input {
		display: flex;
		align-items: center;
		margin-bottom: 30px;
	}

	.currency-symbol {
		font-size: 24px;
		margin-right: 10px;
	}

	.amount-field {
		font-size: 24px;
		flex: 1;
		border: none;
		outline: none;
	}

	.quick-amounts {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 30px;
	}

	.amount-option {
		width: calc(33.33% - 10px);
		height: 40px;
		border: 1px solid #d7d9dd;
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
	}

	.amount-option.selected {
		background: #e3f2fd;
		border-color: #2196f3;
		color: #2196f3;
	}

	.confirm-recharge {
		width: 100%;
		height: 44px;
		background: #2196f3;
		color: #fff;
		border-radius: 22px;
		font-size: 30rpx;
	}

	.confirm-recharge[disabled] {
		background: #ccc;
	}
</style>