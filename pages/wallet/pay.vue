<template>
	<view class="pay-container">
		<!-- 支付弹出层 -->
		<view class="pay-popup">
			<!-- 关闭按钮 -->
			<view class="close-btn" @click="handleCancel">
				<text class="close-icon">×</text>
			</view>

			<!-- 用户信息 -->
			<view class="user-info">
				<image :src="paymentData.avatar" class="user-avatar"></image>
				<text class="user-phone">{{ maskPhone(paymentData.mobile) }}</text>
			</view>

			<!-- 商户信息 -->
			<view class="merchant-info">
				<text class="merchant-name">拼多多平台商户</text>
				<text class="payment-amount">¥{{ paymentData.amount.toFixed(2) }}</text>
			</view>


			<!-- 支付方式选择 -->
			<view class="payment-methods">
				<view class="method-item" v-for="(method, index) in paymentMethods" :key="index"
					@click="selectPaymentMethod(index)" :class="{ 'selected': selectedMethod === index }">
					<image :src="method.icon" class="method-icon"></image>
					<text class="method-name">{{ method.name }}</text>
					<text class="method-check" v-if="selectedMethod === index">✓</text>
				</view>
			</view>

			<!-- 确认支付按钮 -->
			<button class="confirm-btn" @click="handleConfirmPayment">确认付款</button>

			<!-- 服务提供商信息 -->
			<view class="service-provider">
				<text class="provider-text">本服务由支付宝(杭州)信息技术有限公司提供</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		store
	} from '@/uni_modules/uni-id-pages/common/store.js'
	export default {
		data() {
			return {
				paymentData: {
					amount: 0,
					username: '',
					avatar: '',
					productId: '',
					productName: '',
					productImage: '',
					quantity: 1
				},
				selectedMethod: 0,
				paymentMethods: [{
						name: '农业银行储蓄卡(0270)',
						icon: '/static/bank-icons/abc.png'
					},
					{
						name: '四川农信储蓄卡(2128)',
						icon: '/static/bank-icons/sc.png'
					},
					{
						name: '农业银行储蓄卡(0073)',
						icon: '/static/bank-icons/abc.png'
					}
				]
			}
		},
		onLoad() {
			// 获取支付数据
			console.log('用户信息:', store.userInfo);
			const paymentData = uni.getStorageSync('paymentData');
			if (paymentData) {
				this.paymentData = paymentData;
				console.log('支付数据', this.paymentData);
			}
			const avatar=store.userInfo.avatar_file.url;
			this.paymentData.avatar = avatar; 
		},
		methods: {
			maskPhone(phone) {
				if (!phone) return '';
				if (phone.length === 11) {
					return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
				}
				return phone;
			},
			selectPaymentMethod(index) {
				this.selectedMethod = index;
			},
			async handleConfirmPayment() {
				const db = uniCloud.database();
				const orderIds = uni.getStorageSync('currentOrderIds') || [];
				console.log('订单ids', orderIds);

				try {
					// 获取钱包信息
					const walletResult = await db.collection('wallet')
						.where({
							user_id: this.paymentData.userId
						})
						.get();

					if (walletResult.result.data.length === 0) {
						throw new Error('钱包不存在');
					}

					const wallet = walletResult.result.data[0];
					console.log('余额', wallet.balance);
					console.log('本次支付的总金额', this.paymentData.amount);
					const newBalance = wallet.balance - this.paymentData.amount;
					console.log('支付后的余额', newBalance);

					if (newBalance < 0) {
						uni.showToast({
							title: '余额不足',
							icon: 'none'
						});
						setTimeout(function() {
						    uni.navigateTo({
						        url: '/pages/wallet/wallet'
						    });
						}, 1500);
						return;
					}

					// 更新钱包余额
					await db.collection('wallet').doc(wallet._id).update({
						balance: newBalance,
						updated_at: Date.now()
					});

					// 更新所有订单状态
					for (const orderId of orderIds) {
						await db.collection('order').doc(orderId).update({
							paymentStatus: 1, // 已支付
							shareStatus: 0 // 待分享
						});
					}
					// 检查是否是多个商品的支付（来自favor页面的多选支付）
					if (Array.isArray(this.paymentData.productId) && this.paymentData.productId.length > 1) {
						// 多个商品支付，需要为每个商品创建独立的交易记录
						// 获取所有订单的商品信息
						const orderResults = await Promise.all(orderIds.map(id =>
							db.collection('order').doc(id).get()
						));
						console.log('最后', orderResults);
						// 为每个商品创建交易记录
						for (const orderResult of orderResults) {
							if (orderResult.result && orderResult.result.data) {
								const order = orderResult.result.data;
								
								console.log('单个商品的价格信息', order[0].amount);
								await db.collection('wallet_transactions').add({
									user_id: this.paymentData.userId,
									amount: order[0].amount,
									type: 'debit',
									balance: newBalance,
									productImage: order[0].productImage // 使用订单中的商品图片
								});
							}
						}
					} else {
						// 单个商品支付，创建一条交易记录
						await db.collection('wallet_transactions').add({
							user_id: this.paymentData.userId,
							amount: this.paymentData.amount,
							type: 'debit',
							balance: newBalance,
							productImage: this.paymentData.productImage // 使用paymentData中的商品图片
						});
					}

					// 设置支付成功标记，用于返回商品详情页时显示提示
					uni.setStorageSync('paymentSuccess', true);

					uni.showToast({
						title: '支付成功',
						icon: 'success'
					});

					// 清除支付相关的缓存
					uni.removeStorageSync('paymentData');
					uni.removeStorageSync('currentOrderIds');

					setTimeout(function() {
					    uni.navigateTo({
					        url: '/pages/user/order'
					    });
					}, 1500);

				} catch (error) {
					console.error('支付失败:', error);
					uni.showToast({
						title: error.message || '支付失败，请重试',
						icon: 'none'
					});
					setTimeout(function() {
					    uni.navigateTo({
					        url: '/pages/wallet/wallet'
					    });
					}, 1500);
				}
			},
			async handleCancel() {
				const db = uniCloud.database();
				const orderIds = uni.getStorageSync('currentOrderIds') || [];

				try {
					// 更新所有订单状态为取消
					for (const orderId of orderIds) {
						await db.collection('order').doc(orderId).update({
							paymentStatus: 0, // 保持待支付状态
						});
					}

					// 清除支付相关的缓存
					uni.removeStorageSync('paymentData');
					uni.removeStorageSync('currentOrderIds');
					uni.showToast({
						title: '取消支付',
						icon: 'error'
					});

					// 返回上一页
					uni.navigateBack();

				} catch (error) {
					console.error('取消支付失败:', error);
					uni.showToast({
						title: '操作失败，请重试',
						icon: 'none'
					});
				}
			}
		}
	}
</script>

<style>
	.pay-container {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.pay-popup {
		background-color: #fff;
		border-radius: 24rpx 24rpx 0 0;
		padding: 40rpx;
		position: relative;
		animation: slideUp 0.3s ease-out;
	}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
		}

		to {
			transform: translateY(0);
		}
	}

	.close-btn {
		position: absolute;
		top: 20rpx;
		left: 20rpx;
		padding: 20rpx;
	}

	.close-icon {
		font-size: 60rpx;
		color: #999;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.user-avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		margin-bottom: 20rpx;
	}

	.user-phone {
		font-size: 32rpx;
		color: #333;
	}

	.merchant-info {
		text-align: center;
		margin-bottom: 60rpx;
	}

	.merchant-name {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 20rpx;
		display: block;
	}

	.payment-amount {
		font-size: 72rpx;
		font-weight: bold;
		color: #333;
	}

	.account-section {
		padding: 20rpx 0;
		border-bottom: 1px solid #eee;
		margin-bottom: 20rpx;
	}

	.section-title {
		font-size: 28rpx;
		color: #999;
		margin-bottom: 10rpx;

	}

	.account-number {
		font-size: 32rpx;
		color: #333;
	}

	.payment-methods {
		margin-bottom: 40rpx;
	}

	.method-item {
		display: flex;
		align-items: center;
		padding: 30rpx 0;
		border-radius: 15rpx;
		border-bottom: 1px solid #eee;
	}

	.method-icon {
		width: 48rpx;
		height: 48rpx;
		margin-right: 20rpx;
	}

	.method-name {
		flex: 1;
		font-size: 28rpx;
		color: #333;
	}

	.method-check {
		color: #1890ff;
		font-size: 32rpx;
	}

	.confirm-btn {
		background-color: #1890ff;
		color: #fff;
		font-size: 32rpx;
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 44rpx;
		margin: 40rpx 0;
	}

	.service-provider {
		text-align: center;
		padding: 20rpx 0;
	}

	.provider-text {
		font-size: 24rpx;
		color: #999;
	}

	.selected {
		background-color: #f8f8f8;
	}
</style>