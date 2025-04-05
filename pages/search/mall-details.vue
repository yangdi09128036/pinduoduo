<template>
	<view class="container">
		<!-- Loading State -->
		<view v-if="isLoading" class="loading">
			<text>商品信息加载中...</text>
		</view>

		<!-- 商品详情内容 -->
		<view v-else-if="goodsInfo">
			<!-- 返回图标 -->
			<view class="back-icon-container">
				<image class="back-icon" src="/static/left.png" @click="navBack" />
			</view>

			<!-- 轮播图部分 -->
			<swiper class="banner" circular :indicator-dots="true" :autoplay="true" interval="3000" duration="1000">
				<swiper-item v-for="(item, index) in convertToBannerArray(goodsInfo.goods_banner_imgs)" :key="index">
					<image :src="item.url" mode="aspectFill" class="banner-image">
					</image>
				</swiper-item>
			</swiper>

			<!-- 价格营销信息 -->
			<view class="price-marketing">
				<view class="price-section">
					<text class="currency">¥</text>
					<text class="price">{{ goodsInfo.price }}</text>
					<text class="original-price"
						v-if="goodsInfo.is_on_sale">¥{{ (goodsInfo.price * 1.2).toFixed(2) }}</text>
				</view>
				<view class="promotion-tags">
					<text class="promotion-tag">30天低价</text>
					<text class="promotion-text">全网低价</text>
				</view>
			</view>

			<!-- 商品信息部分 -->
			<view class="goods-info">
				<view class="title-section">
					<text class="brand-tag">品牌</text>
					<text class="title">{{ goodsInfo.name }}</text>
				</view>

				<view class="sales-stats">
					<text class="stat-item">{{ goodsInfo.total_sell_count || '2068' }}人好评</text>
					<text class="stat-divider">|</text>
					<text class="stat-item">24小时内200+人拼单</text>
					<text class="stat-divider">|</text>
					<text class="stat-item">3466人收藏</text>
				</view>

				<view class="tags" v-if="goodsInfo.is_hot || goodsInfo.is_new || goodsInfo.is_best">
					<text class="tag" v-if="goodsInfo.is_hot">热销</text>
					<text class="tag" v-if="goodsInfo.is_new">新品</text>
					<text class="tag" v-if="goodsInfo.is_best">精品</text>
				</view>
				<!-- 新增图片显示区域 -->
				<view class="image-gallery">
					<view class="image-item" v-for="(item, index) in convertToBannerArray(goodsInfo.goods_banner_imgs)"
						:key="index">
						<image :src="item.url" mode="aspectFill" class="gallery-image">
						</image>
					</view>
				</view>
			</view>

			<!-- 底部操作栏 -->
			<view class="bottom-bar">
				<view class="action-buttons">
					<view class="action-item">
						<text class="action-icon">🏪</text>
						<text class="action-text">店铺</text>
					</view>
					<view class="action-item" @click="toggleFavorite">
						<text class="action-icon">{{ isFavorite ? '❤️' : '🤍' }}</text>
						<text class="action-text">收藏</text>
					</view>
					<view class="action-item">
						<text class="action-icon">☎️</text>
						<text class="action-text">客服</text>
					</view>
				</view>
				<view class="buy-button">
					<button class="group-buy" @click="showPopup">发起拼单</button>
				</view>
			</view>

			<!-- 底部弹出层 -->
			<view class="popup-mask" v-if="showBuyPopup" @click="hidePopup"></view>
			<view class="popup-content" :class="{ 'popup-show': showBuyPopup }">
				<!-- 关闭按钮 -->
				<view class="close-btn" @click="hidePopup">×</view>

				<!-- 配送信息 -->
				<view class="delivery-info">
					<view class="shipping-policy">
						<uni-icons type="checkbox-filled" color="#67c23a" size="16"></uni-icons>
						<text class="policy-text">全场包邮 · 七天退换 · 48小时发货</text>
					</view>

					<view class="address-info" v-if="userInfo" @click="goSet">
						<view class="address-detail">
							<image src="/static/address.png" class="address-icon"></image>
							<text class="user-name">{{ userInfo.username }}, </text>
							<text class="user-phone">{{ maskPhone(userInfo.mobile) }}, </text>
							<text class="user-address">{{ userInfo.address }}</text>
						</view>
						<uni-icons type="right" size="30" color="#999"></uni-icons>
					</view>
				</view>

				<!-- 商品信息 -->
				<view class="product-info">
					<image :src="goodsInfo.goods_thumb.fileID" class="product-image"></image>
					<view class="product-details">
						<view class="group-price">
							<text class="price-label">多人团价</text>
							<text class="price-symbol">¥</text>
							<text class="price-value">{{ goodsInfo.group_price || goodsInfo.price }}</text>
						</view>
						<view class="selected-info">
							<text>已选：{{ goodsInfo.name }}</text>
						</view>
					</view>
				</view>

				<!-- 数量选择 -->
				<view class="quantity-selector">
					<text>数量</text>
					<view class="quantity-controls">
						<button class="qty-btn" @click="decreaseQuantity">-</button>
						<text class="qty-value">{{ quantity }}</text>
						<button class="qty-btn" @click="increaseQuantity">+</button>
					</view>
				</view>

				<view class="payment-method-section">
					<text>使用</text>
					<image src="/static/wallet-red.png" class="wallet-icon"></image>
					<text>多多钱包支付</text>
				</view>

				<!-- 支付按钮 -->
				<view class="payment-section">
					<button class="payment-btn" @click="handlePayment">
						立即支付 ¥{{ (goodsInfo.group_price || goodsInfo.price) * quantity }}
					</button>
				</view>
			</view>
		</view>

		<!-- Error State -->
		<view v-else class="error">
			<text>加载商品信息失败，请重试</text>
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
				goodsInfo: null,
				isLoading: true,
				showBuyPopup: false,
				quantity: 1,
				isFavorite: false,
				successMessage: '',
				errorMessage: ''
			}
		},
		async onLoad(options) {
			await this.loadGoodsInfo(options);
			await this.checkFavoriteStatus();
			console.log('Initial userInfo:', store.userInfo);
			await this.addToHistory();
		},
		onShow() {
			// 检查是否有支付成功的标记
			const paymentSuccess = uni.getStorageSync('paymentSuccess');
			if (paymentSuccess) {
				// 清除标记
				uni.removeStorageSync('paymentSuccess');
				// 显示支付成功提示
				uni.showToast({
					title: '支付成功',
					icon: 'success'
				});
				// 隐藏弹窗
				this.hidePopup();
			}
		},
		computed: {
			userInfo() {
				return store.userInfo;
			}
		},
		methods: {
			async loadGoodsInfo(options) {
				this.isLoading = true;
				try {
					// 优先从路由参数获取商品ID
					if (options && options.id) {
						const db = uniCloud.database();
						const result = await db.collection('mall-goods').doc(options.id).get();
						if (result.result.data && result.result.data.length > 0) {
							this.goodsInfo = result.result.data[0];
						}
					} else {
						// 从缓存获取商品信息
						const goodsInfo = uni.getStorageSync('currentProduct');
						if (goodsInfo) {
							this.goodsInfo = goodsInfo;
						}
					}
					console.log("商品详情页数据", this.goodsInfo);
				} catch (e) {
					console.error('获取商品信息失败:', e);
				} finally {
					this.isLoading = false;
				}
			},
			async checkFavoriteStatus() {
				if (!store.userInfo || !this.goodsInfo) return;

				console.log('用户id', store.userInfo._id);
				console.log('商品id', this.goodsInfo._id);

				const db = uniCloud.database();
				const favorCollection = db.collection('favor');
				const result = await favorCollection.where({
					userId: store.userInfo._id,
					productId: this.goodsInfo._id
				}).get();

				this.isFavorite = result.result.data.length > 0;
			},
			async addToHistory() {
				if (!this.goodsInfo || !store.userInfo) {
					console.warn('商品信息或用户信息为空，无法记录到历史浏览');
					return;
				}

				const db = uniCloud.database();
				const historyCollection = db.collection('history');

				try {
					// 查询是否已存在该商品的历史记录
					const queryResult = await historyCollection
						.where({
							userId: store.userInfo._id,
							productId: this.goodsInfo._id
						}).get();

					if (queryResult.result.data.length === 0) {
						// 如果不存在，插入新记录
						await historyCollection.add({
							userId: store.userInfo._id,
							productId: this.goodsInfo._id
						});
						console.log('商品已记录到历史浏览');
					} else {
						console.log('商品已存在于历史浏览中');
					}
				} catch (error) {
					console.error('记录商品到历史浏览失败', error);
				}
			},
			async toggleFavorite() {
				if (!store.userInfo || !this.goodsInfo) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
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
				const db = uniCloud.database();
				const favorTable = db.collection('favor');

				try {
					await favorTable.add({
						userId: store.userInfo._id,
						productId: this.goodsInfo._id
					});

					this.successMessage = '收藏成功';
					this.errorMessage = '';
					uni.showToast({
						title: this.successMessage,
						icon: 'success'
					});
				} catch (error) {
					this.errorMessage = error.message || '收藏失败，请检查网络';
					this.successMessage = '';
					uni.showToast({
						title: this.errorMessage,
						icon: 'none'
					});
				}
			},
			async removeFromFavorites() {
				const db = uniCloud.database();
				const favorTable = db.collection('favor');

				try {
					await favorTable.where({
						userId: store.userInfo._id,
						productId: this.goodsInfo._id
					}).remove();

					this.successMessage = '取消收藏成功';
					this.errorMessage = '';
					uni.showToast({
						title: this.successMessage,
						icon: 'success'
					});
				} catch (error) {
					this.errorMessage = error.message || '取消收藏失败，请检查网络';
					this.successMessage = '';
					uni.showToast({
						title: this.errorMessage,
						icon: 'none'
					});
				}
			},
			maskPhone(phone) {
				if (!phone) return '';
				return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
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
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
					return;
				}

				// 准备支付数据
				const paymentData = {
					amount: (this.goodsInfo.group_price || this.goodsInfo.price) * this.quantity,
					username: this.userInfo.username,
					mobile: this.userInfo.mobile,
					avatar: this.userInfo.avatar_file.url ||
						'/static/avatar-default.png',
					productId: this.goodsInfo._id,
					productName: this.goodsInfo.name,
					productImage: this.goodsInfo.goods_thumb.fileID,
					quantity: this.quantity,
					userId: this.userInfo._id
				};
				console.log('支付数据', paymentData);
				
				// 存储支付数据
				uni.setStorageSync('paymentData', paymentData);

				// 创建初始订单
				const db = uniCloud.database();
				const orderCollection = db.collection('order');

				try {
					const orderResult = await orderCollection.add({
						userId: this.userInfo._id,
						productId: [this.goodsInfo._id], // 使用数组格式，与favor页面保持一致
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
					console.log('orderResult', orderResult);

					if (orderResult && orderResult.result && orderResult.result.id) {
						// 使用数组存储订单ID，与favor页面保持一致
						uni.setStorageSync('currentOrderIds', [orderResult.result.id]);
						console.log('orderResult.id', orderResult.result.id);
						uni.navigateTo({
							url: '/pages/wallet/pay'
						});
					} else {
						console.error('订单创建成功，但未返回有效的 orderResult');
						uni.showToast({
							title: '创建订单失败，请重试',
							icon: 'none'
						});
					}
				} catch (error) {
					console.error('创建订单失败:', error);
					uni.showToast({
						title: '创建订单失败，请重试',
						icon: 'none'
					});
				}
			},
			convertToBannerArray(bannerImg) {
				if (typeof bannerImg === 'object' && bannerImg !== null && !Array.isArray(bannerImg)) {
					return [bannerImg];
				} else {
					return bannerImg || [];
				}
			},
			navBack() {
				uni.navigateBack(); // 返回上一级页面
			},
			goSet(){
				uni.navigateTo({
					url:'/pages/user/set'
				})
			}
		}
	}
</script>

<style>
	.container {
		padding-bottom: 100rpx;
		background-color: #f7f7f7;
	}

	.loading,
	.error {
		text-align: center;
		padding: 60rpx 0;
		color: #ccc;
	}

	.back-icon-container {
		position: fixed;
		top: 70rpx;
		left: 20rpx;
		z-index: 10;
	}

	.back-icon {
		width: 60rpx;
		height: 60rpx;
	}

	.banner {
		width: 100%;
		height: 750rpx;
	}

	.banner-image {
		width: 100%;
		height: 100%;
	}

	/* 价格营销区域样式 */
	.price-marketing {
		background: linear-gradient(to right, #ff2020, #ff4040);
		padding: 20rpx 20rpx;
		color: #fff;
	}

	.price-section {
		display: flex;
		align-items: baseline;
	}

	.currency {
		font-size: 36rpx;
		font-weight: bold;
	}

	.price {
		font-size: 56rpx;
		font-weight: bold;
		margin-right: 20rpx;
		color: #fff
	}

	.original-price {
		font-size: 24rpx;
		text-decoration: line-through;
		color: rgba(255, 255, 255, 0.8);
	}

	.promotion-tags {
		margin-top: 10rpx;
	}

	.promotion-tag {
		background-color: #fff1f0;
		color: #ff2020;
		padding: 4rpx 16rpx;
		border-radius: 4rpx;
		font-size: 24rpx;
		margin-right: 20rpx;
	}

	.promotion-text {
		font-size: 24rpx;
		color: rgba(255, 255, 255, 0.9);
	}

	/* 优惠券区域样式 */
	.coupon-section {
		background-color: #fff;
		padding: 20rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 2rpx 0;
	}

	.coupon-tag {
		color: #ff2020;
		border: 1px solid #ff2020;
		padding: 4rpx 16rpx;
		border-radius: 4rpx;
		font-size: 24rpx;
	}

	.arrow {
		color: #999;
		font-size: 24rpx;
	}

	/* 商品信息区域样式 */
	.goods-info {
		background-color: #fff;
		padding: 20rpx 30rpx;
	}

	.title-section {
		margin-bottom: 20rpx;
	}

	.brand-tag {
		background-color: #000;
		color: #fff;
		padding: 4rpx 12rpx;
		font-size: 24rpx;
		border-radius: 4rpx;
		margin-right: 10rpx;
	}

	.title {
		font-size: 32rpx;
		font-weight: bold;
		line-height: 1.4;
	}

	.sales-stats {
		display: flex;
		align-items: center;
		margin: 20rpx 0;
	}

	.stat-item {
		color: #666;
		font-size: 24rpx;
	}

	.stat-divider {
		color: #000;
		margin: 0 20rpx;
		font-size: 24rpx;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 10rpx;
		margin: 20rpx 0;
	}

	.tag {
		padding: 4rpx 12rpx;
		background-color: #fff1f0;
		color: #ff4400;
		font-size: 24rpx;
		border-radius: 4rpx;
	}

	.image-gallery {
		margin: 20rpx 0;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.image-item {
		/* background-color: #ecedee; */
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
	}

	.gallery-image {
		width: 100%;
		height: 700rpx;
		/* 统一图片高度 */
		object-fit: cover;
	}

	/* 底部操作栏样式 */
	.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		border-top: 1rpx solid #eee;
	}

	.action-buttons {
		display: flex;
		flex: 1;
	}

	.action-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 40rpx;
	}

	.action-icon {
		font-size: 40rpx;
		color: #666;
		margin-bottom: 4rpx;
	}

	.action-text {
		font-size: 20rpx;
		font-weight: 500;
		color: #666;
	}

	.buy-button {
		flex: 2;
	}

	.group-buy {
		background-color: #ff2020;
		color: #fff;
		border: none;
		font-size: 32rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	/* 弹出层样式 */
	.popup-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}

	.popup-content {
		position: fixed;
		left: 0;
		right: 0;
		bottom: -100%;
		background-color: #fff;
		border-radius: 24rpx 24rpx 0 0;
		padding: 30rpx;
		z-index: 101;
		transition: all 0.3s ease-out;
	}

	.popup-show {
		bottom: 0;
	}

	.close-btn {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		font-size: 40rpx;
		color: #999;
	}

	.delivery-info {
		margin-bottom: 30rpx;
	}

	.shipping-policy {
		display: flex;
		align-items: center;
		gap: 10rpx;
		padding: 20rpx 0;
		border-bottom: 1px solid #f5f5f5;
	}

	.policy-text {
		color: #67c23a;
		font-size: 30rpx;
	}

	.address-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
	}

	.address-detail {
		flex: 1;
		font-size: 35rpx;
	}

	.product-info {
		display: flex;
		gap: 20rpx;
		padding: 20rpx 0;
		border-bottom: 1px solid #f5f5f5;
	}

	.address-icon {
		width: 60rpx;
		height: 60rpx;
	}

	.product-image {
		width: 250rpx;
		height: 250rpx;
		border-radius: 12rpx;
	}

	.product-details {
		flex: 1;
	}

	.group-price {
		display: flex;
		align-items: baseline;
		margin-bottom: 10rpx;
	}

	.price-label {
		font-size: 35rpx;
		color: #ff4040;
		font-weight: 600;
		margin-right: 10rpx;
	}

	.price-symbol {
		font-size: 28rpx;
		color: #ff4040;
	}

	.price-value {
		font-size: 50rpx;
		color: #ff4040;
		font-weight: bold;
	}

	.selected-info {
		font-size: 30rpx;
		color: #666;
	}

	.quantity-selector {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 1px solid #f5f5f5;
	}

	.quantity-controls {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}

	.qty-btn {
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border: 1px solid #a4a4a4;
		background: none;
		font-size: 30rpx;
		font-weight: 600;
		padding: 0;
	}

	.qty-value {
		min-width: 60rpx;
		text-align: center;
	}

	.payment-section {}

	.payment-method-section {
		margin-top: 40rpx;
		color: #a4a4a4;
		border-top: 1px solid #eee;
		font-size: 32rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
	}

	.wallet-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.payment-btn {
		background-color: #ff4040;
		color: #fff;
		border: none;
		font-size: 32rpx;
		height: 88rpx;
		line-height: 88rpx;

	}
</style>

