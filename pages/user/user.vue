<template>
	<view class="container">
		<!-- 状态栏占位 -->
		<view class="status-bar"></view>

		<!-- 用户信息头部 -->
		<view class="user-header">
			<view class="user-info">
				<view class="avatar-wrapper">
					<uni-id-pages-avatar width="100rpx" height="100rpx"></uni-id-pages-avatar>
				</view>
				<view class="user-meta">
					<view class="nickname-row">
						<image src="/static/user-icon.png" mode="aspectFit" class="wechat-icon"></image>
						<text class="nickname">{{ userInfo.username || '您的昵称' }}</text>
					</view>
					<view class="address" @click="goSet">
						<image src="/static/address.png" mode="aspectFit" class="wechat-icon"></image>
						<text class="address-text">{{ userInfo.address && userInfo.address.length > 6 ? userInfo.address.substr(0, 6) + '...' : userInfo.address || '收货地址' }}</text>
					</view>
				</view>
			</view>
			<view class="header-buttons">
				<view class="pindan-btn">
					<image src="/static/coupon.png" mode="aspectFit" class="settings-icon"></image>
					<text>拼单返券</text>
				</view>
				<view class="pindan-btn">
					<image src="/static/set.png" mode="aspectFit" class="settings-icon" @click="goSet"></image>
					<text>设置</text>
				</view>
			</view>
		</view>

		<!-- 月卡提示 -->
		<view class="monthly-card">
			<text class="card-title">省钱月卡</text>
			<text class="card-desc">到账提醒: 124元补贴待领 ></text>
		</view>

		<!-- 订单区域 -->
		<view class="orders-section">
			<view class="orders-header">
				<text class="title">我的订单</text>
				<view class="view-all" @click="viewAllOrders">
					<text>查看全部</text>
					<text class="arrow">></text>
				</view>
			</view>

			<view class="order-status">
				<view class="status-item" @click="navigateToOrder('pending')">
					<view class="icon-wrapper">
						<image src="/static/wallet.png" mode="aspectFit" class="status-icon"></image>
						<view class="badge" v-if="orderCounts[1] > 0">{{ orderCounts[1] }}</view>
					</view>
					<text>待付款</text>
				</view>
				<view class="status-item" @click="navigateToOrder('share')">
					<view class="icon-wrapper">
						<image src="/static/share.png" mode="aspectFit" class="status-icon"></image>
						<view class="badge" v-if="orderCounts[2] > 0">{{ orderCounts[2] }}</view>
					</view>
					<text>待分享</text>
				</view>
				<view class="status-item" @click="navigateToOrder('shipping')">
					<view class="icon-wrapper">
						<image src="/static/shipping.png" mode="aspectFit" class="status-icon"></image>
						<view class="badge" v-if="orderCounts[3] > 0">{{ orderCounts[3] }}</view>
					</view>
					<text>待发货</text>
				</view>
				<view class="status-item" @click="navigateToOrder('receiving')">
					<view class="icon-wrapper">
						<image src="/static/delivery.png" mode="aspectFit" class="status-icon"></image>
						<view class="badge" v-if="orderCounts[4] > 0">{{ orderCounts[4] }}</view>
					</view>
					<text>待收货</text>
				</view>
				<view class="status-item" @click="navigateToOrder('review')">
					<view class="icon-wrapper">
						<image src="/static/star.png" mode="aspectFit" class="status-icon"></image>
						<view class="badge" v-if="orderCounts[5] > 0">{{ orderCounts[5] }}</view>
					</view>
					<text>评价</text>
				</view>
			</view>
		</view>

		<!-- 功能按钮区 -->
		<view class="features-section">
			<view class="feature-item" @click="navigateToFeature('favor')">
				<image src="/static/heart.png" mode="aspectFit" class="feature-icon"></image>
				<text>商品收藏</text>
			</view>
			<view class="feature-item" @click="navigateToFeature('wallet')">
				<image src="/static/wallet-red.png" mode="aspectFit" class="feature-icon"></image>
				<text>多多钱包</text>
			</view>
			<view class="feature-item" @click="navigateToFeature('coupon')">
				<image src="/static/coupon.png" mode="aspectFit" class="feature-icon"></image>
				<text>优惠券</text>
			</view>
			<view class="feature-item" @click="navigateToFeature('history')">
				<image src="/static/history.png" mode="aspectFit" class="feature-icon"></image>
				<text>历史浏览</text>
			</view>
			<view class="feature-item" @click="navigateToFeature('refund')">
				<image src="/static/refund.png" mode="aspectFit" class="feature-icon"></image>
				<text>退款售后</text>
			</view>
		</view>

		<!-- 商品列表 -->
		<view class="content">
			<view class="tab-content">
				<view v-for="(item, index) in randomGoods" :key="index" class="content-item">
					<view class="product-card" @click="navigateToProduct(item)">
						<image class="item-image" :src="item.goods_thumb?.fileID" mode="aspectFill" />
						<view class="product-info">
							<text class="item-title">{{ item.name }}</text>
							<view class="service-tags">
								<text class="tag pay-later">先用后付</text>
								<text class="tag quick-refund">极速退款</text>
							</view>
							<view class="price-row">
								<text class="price">¥{{ item.price }}</text>
								<text class="sales">全店已拼{{ item.total_sell_count }}+件</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		store
	} from '@/uni_modules/uni-id-pages/common/store.js'

	export default {
		computed: {
			userInfo() {
				return store.userInfo
			}
		},
		data() {
			return {
				allGoods: [],
				randomGoods: [],
				orderCounts: {
					1: 0, // 待付款
					2: 0, // 待分享
					3: 0, // 待发货
					4: 0, // 待收货
					5: 0  // 评价
				}
			};
		},
		onLoad() {
			this.getGoods();
		},
		onShow() {
		  // 强制从服务器获取最新订单数量，忽略本地缓存
		  this.fetchOrderCounts();
		},
		methods: {
			async getGoods() {
				try {
					const {
						result: {
							data
						}
					} = await uniCloud.database().collection('mall-goods').get();
					this.allGoods = data || [];
					this.randomGoods = this.getRandomGoods(16);
				} catch (err) {
					console.error('获取商品数据失败:', err);
				}
			},
			getRandomGoods(count) {
				const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
				return shuffledGoods.slice(0, count);
			},
			async fetchOrderCounts() {
			  if (!store.userInfo || !store.userInfo._id) return;
			  
			  try {
			    const db = uniCloud.database();
			    
			    // 使用 Promise.all 并行获取所有订单状态数量，提高效率
			    const [
			      pendingPaymentResult,
			      pendingShareResult,
			      pendingShippingResult,
			      pendingReceivingResult,
			      pendingReviewResult
			    ] = await Promise.all([
			      db.collection('order').where({ userId: store.userInfo._id, paymentStatus: 0 }).count(),
			      db.collection('order').where({ userId: store.userInfo._id, paymentStatus: 1, shareStatus: 0 }).count(),
			      db.collection('order').where({ userId: store.userInfo._id, paymentStatus: 1, shippingStatus: 0 }).count(),
			      db.collection('order').where({ userId: store.userInfo._id, shippingStatus: 1, deliveryStatus: 0 }).count(),
			      db.collection('order').where({ 
			        userId: store.userInfo._id, 
			        deliveryStatus: 1, 
			        review: db.command.exists(false) 
			      }).count()
			    ]);
			    
			    // 直接更新数据，不经过本地缓存
			    this.orderCounts = {
			      1: pendingPaymentResult.result.total,
			      2: pendingShareResult.result.total,
			      3: pendingShippingResult.result.total,
			      4: pendingReceivingResult.result.total,
			      5: pendingReviewResult.result.total
			    };
			    
			  } catch (error) {
			    console.error('获取订单数量失败:', error);
			  }
			},
			navigateToProduct(item) {
				if (!item) return;
				uni.setStorage({
					key: 'currentProduct',
					data: item,
					success: () => {
						console.log('商品信息存储成功', item);
					}
				});
				uni.navigateTo({
					url: '../search/mall-details'
				});
			},
			navigateToAddress() {
				uni.navigateTo({
					url: '/pages/address/address'
				});
			},
			viewAllOrders() {
				uni.navigateTo({
					url: '/pages/user/order'
				});
			},
			navigateToOrder(type) {
				uni.navigateTo({
					url: `/pages/user/order?type=${type}`
				});
			},
			goSet() {
				uni.navigateTo({
					url: '/pages/user/set'
				})
			},
			navigateToFeature(feature) {
				const routes = {
					favor: '/pages/malls-manage/favor',
					wallet: '/pages/wallet/wallet',
					coupon: '/pages/coupon/coupon-list',
					history: '/pages/malls-manage/history',
					refund: '/pages/orders/refund-list'
				};
				uni.navigateTo({
					url: routes[feature]
				});
			},
			goSet(){
				uni.navigateTo({
					url:'/pages/user/set'
				})
			}
		}
	};
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		background-color: #f4f4f4;
	}

	.status-bar {
		height: 60rpx;
		background-color: #ffffff;
	}

	.user-header {
		padding: 20rpx 30rpx;
		background-color: #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}

	.avatar-wrapper {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.user-meta {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
	}

	.nickname-row {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.nickname {
		font-size: 36rpx;
		font-weight: bold;
	}

	.wechat-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.address {
		display: flex;
		align-items: center;
	}

	.address-text {
		font-size: 30rpx;
		color: #666666;
	}

	.header-buttons {
		display: flex;
		gap: 20rpx;
		align-items: center;
	}

	.pindan-btn {
		border: #e5e5e5 solid;
		color: #000000;
		padding: 8rpx 12rpx;
		border-radius: 30rpx;
		font-size: 24rpx;
		display: flex;
		align-items: center;
	}

	.settings-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.monthly-card {
		background-color: #fff1f0;
		padding: 20rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.card-title {
		color: #e02e24;
		font-size: 30rpx;
		font-weight: 600;
	}

	.card-desc {
		color: #ffffff;
		font-size: 27rpx;
		background-color: #e02e24;
		border-radius: 40rpx;
		padding: 20rpx;
	}

	.orders-section {
		background-color: #ffffff;
		margin-top: 10rpx;
		padding: 20rpx;
	}

	.orders-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.orders-header .title {
		font-size: 35rpx;

	}

	.view-all {
		color: #999999;
		font-size: 30rpx;
		display: flex;
		align-items: center;
	}

	.order-status {
		display: flex;
		justify-content: space-around;
		padding: 30rpx 0;
	}

	.status-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 28rpx;
		color: #333333;
	}

	.icon-wrapper {
		position: relative;
		margin-bottom: 10rpx;
	}

	.status-icon {
		width: 60rpx;
		height: 60rpx;
	}

	.badge {
		position: absolute;
		top: -10rpx;
		right: -10rpx;
		background-color: #e02e24;
		color: #ffffff;
		font-size: 20rpx;
		padding: 2rpx 8rpx;
		border-radius: 20rpx;
		min-width: 30rpx;
		text-align: center;
	}

	.features-section {
		display: flex;
		justify-content: space-around;
		background-color: #ffffff;
		padding: 30rpx 0;
		margin-top: 10rpx;
	}

	.feature-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 28rpx;
		color: #333333;
	}

	.feature-icon {
		width: 60rpx;
		height: 60rpx;
		margin-bottom: 10rpx;
	}

	.other-features {
		background-color: #fff999;
		margin-top: 25rpx;
		padding: 25rpx;
		display: flex;
		justify-content: space-between;
	}

	.feature-row {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #333333;
	}

	.content {
		padding: 20rpx;
	}

	.tab-content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.content-item {
		width: 48%;
		margin-bottom: 20rpx;
	}

	.product-card {
		background: #ffffff;
		border-radius: 12rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.product-info {
		padding: 10rpx;
	}

	.item-image {
		width: 100%;
		height: 340rpx;
		object-fit: cover;
	}

	.item-title {
		font-size: 28rpx;
		color: #000000;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.service-tags {
		margin: 10rpx 0;
	}

	.tag {
		font-size: 24rpx;
		padding: 4rpx 12rpx;
		border-radius: 4rpx;
		margin-right: 10rpx;
		display: inline-block;
	}

	.pay-later {
		color: #00aa00;
		background: rgba(76, 175, 80, 0.2);
		border-radius: 10rpx;
	}

	.quick-refund {
		color: #666666;
		background: #f5f5f5;
		border-radius: 10rpx;
	}

	.price-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 10rpx;
	}

	.price {
		font-size: 30rpx;
		color: #e02e24;
		font-weight: bold;
	}

	.sales {
		font-size: 24rpx;
		color: #999999;
	}
</style>

