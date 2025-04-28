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

			<!-- 修改后的轮播图部分 -->
			<view class="banner-container">
			    <swiper class="banner" circular :indicator-dots="false" :autoplay="true" 
			            interval="3000" duration="1000" @change="onSwiperChange">
			        <swiper-item v-for="(item, index) in convertToBannerArray(goodsInfo.goods_banner_imgs)" :key="index">
			            <image :src="item.url" mode="aspectFill" class="banner-image"></image>
			        </swiper-item>
			    </swiper>
			    <!-- 将指示器移到swiper外部 -->
			    <view class="custom-indicator">
			        {{ currentSwiperIndex + 1 }}/{{ convertToBannerArray(goodsInfo.goods_banner_imgs).length }}
			    </view>
			</view>


			<!-- 价格营销信息 -->
			<view class="price-marketing">
				<view class="price-section-container">
					<view class="price-section">
						<text class="currency">¥</text>
						<text class="price">{{ goodsInfo.price }}</text>
						<text class="original-price"
							v-if="goodsInfo.is_on_sale">¥{{ (goodsInfo.price * 1.2).toFixed(2) }}</text>
					</view>
					<view class="promotion-tags">
						<text class="promotion-tag">30天低价</text>
						<text class="promotion-text">全网低价</text>
						<text class="promotion-text">全网疯抢30万件</text>
					</view>
				</view>
				<!-- 新增倒计时区域 -->
				<view class="countdown-section">
					<text class="countdown-title">百亿补贴</text>
					<text class="countdown-time">{{ countdownTime }}</text>
					<text class="countdown-title">即将恢复原价</text>
				</view>
			</view>
			<!-- 商品信息部分 -->
			<view class="goods-info">
				<view class="title-section">
					<text class="brand-tag">品牌</text>
					<text class="title">{{ goodsInfo.name }}</text>
					<text class="tags" v-if="goodsInfo.is_hot || goodsInfo.is_new || goodsInfo.is_best">
						<text class="tag" v-if="goodsInfo.is_hot">热销</text>
						<text class="tag" v-if="goodsInfo.is_new">新品</text>
						<text class="tag" v-if="goodsInfo.is_best">精品</text>
					</text>
				</view>

				<view class="sales-stats">
					<text class="stat-item">{{ goodsInfo.total_sell_count || '2068' }}人好评</text>
					<text class="stat-item">24小时内200+人拼单</text>
					<text class="stat-item">3466人收藏</text>
				</view>
				<!-- 商品评价 -->
			<view class="reviews-section">
				<view class="reviews-header">
					<text class="reviews-title">商品评价（{{ goodsInfo && goodsInfo.reviews ? goodsInfo.reviews.length : 0 }}）</text>
					<text v-if="goodsInfo && goodsInfo.reviews && goodsInfo.reviews.length > 0" class="reviews-view-all" @click="goAllReviews">查看全部></text>
					<text v-else class="reviews-view-all" style="color: #999;">本商品为新品，期待您的购买评价</text>
				</view>
				<view v-if="goodsInfo && goodsInfo.reviews && goodsInfo.reviews.length > 0" class="reviews-list">
					<view class="review-item" v-for="(review, index) in goodsInfo.reviews.slice(0, 2)" :key="index">
						<view class="review-avatar">
							<image src="/static/default-avatar.png" class="avatar-image"></image>
						</view>
						<view class="review-content">
							<view class="review-user">匿名用户</view>
							<view class="review-text">{{ review }}</view>
						</view>
					</view>
				</view>
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

					<!-- 添加地图显示区域 -->
					<view class="map-card" v-if="mapUrl">
						<image :src="mapUrl" mode="widthFix" class="map-image"></image>
						<view class="location-info">
							<text class="location-header">
								<text class="location-title">当前位置:</text>
							</text>
							<text class="location-detail" v-if="locationInfo">
								<text class="location-text">{{ locationInfo.province || '未知' }}
									{{ locationInfo.city || '未知' }}</text>
							</text>
						</view>
					</view>
					<view class="map-placeholder" v-else-if="isLoadingMap">
						<text class="placeholder-text">地图加载中...</text>
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
				currentSwiperIndex: 0,
				goodsInfo: {
							reviews: [] // 初始化为空数组，避免未定义
						},
				countdownTime: '00:00:00',
				countdownSeconds: 0,
				countdownInterval: null,
				countdownEndTime: 0,
				isLoading: true,
				showBuyPopup: false,
				quantity: 1,
				isFavorite: false,
				successMessage: '',
				errorMessage: '',
				mapUrl: '',
				locationInfo: null,
				isLoadingMap: false,
				key: '21bbea8854ce73ebd9163d7cf6cc9c76' // 高德地图API key
			}
		},
		async onLoad(options) {
			this.isLoading = true;
			this.initCountdown(); // 初始化倒计时
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
			        let productId = options?.id;
			        
			        // 如果没有传入ID，尝试从缓存获取当前商品ID
			        if (!productId) {
			            const cachedProduct = uni.getStorageSync('currentProduct');
			            if (cachedProduct && cachedProduct._id) {
			                productId = cachedProduct._id;
			            }
			        }
			        
			        if (productId) {
			            const db = uniCloud.database();
			            const result = await db.collection('mall-goods').doc(productId).get();
			            if (result) {
			                // 确保goodsInfo是单个对象而不是数组
			                this.goodsInfo = Array.isArray(result.result.data) ? result.result.data[0] : result.result.data;
			                console.log('商品数据', this.goodsInfo);
			                
			                // 确保reviews字段存在
			                if (!this.goodsInfo.reviews) {
			                    this.goodsInfo.reviews = [];
			                }
			                
			                // 更新本地缓存
			                uni.setStorageSync('currentProduct', this.goodsInfo);
			            }
			        } else {
			            // 如果既没有传入ID，缓存中也没有商品信息，显示错误
			            console.error('无法获取商品ID');
			        }
			    } catch (e) {
			        console.error('获取商品信息失败:', e);
			    } finally {
			        this.isLoading = false;
			    }
			},
			onSwiperChange(e) {
			      this.currentSwiperIndex = e.detail.current;
			  },
			// 初始化倒计时
			initCountdown() {
				const savedEndTime = uni.getStorageSync('countdownEndTime');
				const now = Math.floor(Date.now() / 1000);

				if (savedEndTime && savedEndTime > now) {
					this.countdownEndTime = savedEndTime;
					this.startCountdown();
				} else {
					this.createNewCountdown();
				}
			},
			// 创建新的倒计时
			createNewCountdown() {
				const minutes = [5, 10, 15][Math.floor(Math.random() * 3)];
				this.countdownSeconds = minutes * 60;
				this.countdownEndTime = Math.floor(Date.now() / 1000) + this.countdownSeconds;

				uni.setStorageSync('countdownEndTime', this.countdownEndTime);

				this.startCountdown();
			},
			// 开始倒计时
			startCountdown() {
				if (this.countdownInterval) {
					clearInterval(this.countdownInterval);
				}

				this.updateCountdownDisplay();

				this.countdownInterval = setInterval(() => {
					this.updateCountdownDisplay();
				}, 1000);
			},
			// 更新倒计时显示
			updateCountdownDisplay() {
				const now = Math.floor(Date.now() / 1000);
				const remainingTime = this.countdownEndTime - now;

				if (remainingTime <= 0) {
					this.countdownTime = '00:00:00';
					clearInterval(this.countdownInterval);
					this.countdownInterval = null;
				} else {
					const hours = Math.floor(remainingTime / 3600);
					const minutes = Math.floor((remainingTime % 3600) / 60);
					const seconds = remainingTime % 60;

					this.countdownTime =
						`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
				}
			},
			goAllReviews() {
				if (this.goodsInfo.reviews.length > 0) {
					// 将商品信息存储到本地缓存
					uni.setStorageSync('currentProductReviews', this.goodsInfo.reviews);
					uni.navigateTo({
						url: `/pages/search/AllReviews?id=${this.goodsInfo._id}`
					});
				} else {
					uni.showToast({
						title: '本商品暂无评价',
						icon: 'none'
					});
				}
			},
			async checkFavoriteStatus() {
				if (!store.userInfo || !this.goodsInfo) return;

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
					const queryResult = await historyCollection
						.where({
							userId: store.userInfo._id,
							productId: this.goodsInfo._id
						}).get();

					if (queryResult.result.data.length === 0) {
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
				// 显示弹窗时加载地图
				this.getLocationByIP();
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

				const paymentData = {
					amount: (this.goodsInfo.group_price || this.goodsInfo.price) * this.quantity,
					username: this.userInfo.username,
					mobile: this.userInfo.mobile,
					avatar: this.userInfo.avatar_file.url || '/static/avatar-default.png',
					productId: this.goodsInfo._id,
					productName: this.goodsInfo.name,
					productImage: this.goodsInfo.goods_thumb.fileID,
					quantity: this.quantity,
					userId: this.userInfo._id
				};
				console.log('支付数据', paymentData);

				uni.setStorageSync('paymentData', paymentData);

				const db = uniCloud.database();
				const orderCollection = db.collection('order');

				try {
					const orderResult = await orderCollection.add({
						userId: this.userInfo._id,
						productId: [this.goodsInfo._id],
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

					if (orderResult && orderResult.result && orderResult.result.id) {
						uni.setStorageSync('currentOrderIds', [orderResult.result.id]);
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
				uni.navigateBack();
			},
			goSet() {
				uni.navigateTo({
					url: '/pages/user/set'
				});
			},
			async getLocationByIP() {
				this.isLoadingMap = true;
				try {
					const ipRes = await this.getIPLocation();
					console.log('定位信息:', ipRes);
					this.locationInfo = ipRes.data;
					let originalLng = 0,
						originalLat = 0;
					if (ipRes.data.rectangle) {
						const rectangles = ipRes.data.rectangle.split(';');
						if (rectangles.length > 0) {
							const center = rectangles[0].split(',');
							originalLng = parseFloat(center[0]).toFixed(5);
							originalLat = parseFloat(center[1]).toFixed(5);
							let correctedLng = parseFloat(originalLng) + 0.43914;
							let correctedLat = parseFloat(originalLat) + 0.15293;
							this.mapUrl =
								`https://restapi.amap.com/v3/staticmap?location=${correctedLng},${correctedLat}&zoom=14&size=600*300&markers=mid,,A:${correctedLng},${correctedLat}&key=${this.key}`;
						}
					}
				} catch (error) {
					console.error('定位失败:', error);
				} finally {
					this.isLoadingMap = false;
				}
			},
			getIPLocation() {
				return new Promise((resolve, reject) => {
					uni.request({
						url: `https://restapi.amap.com/v3/ip?key=${this.key}`,
						success: (res) => {
							if (res.data.status === '1') {
								resolve(res);
							} else {
								reject(new Error(res.data.info || '定位失败'));
							}
						},
						fail: (err) => {
							reject(err);
						}
					});
				});
			}
		}
	}
</script>

<style scoped>
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

	/* 新增轮播图容器样式 */
	.banner-container {
	    position: relative;
	    width: 100%;
	    height: 750rpx;
	}
	
	/* 调整轮播图样式 */
	.banner {
	    width: 100%;
	    height: 100%;
	}
	
	/* 更新自定义指示器样式 */
	.custom-indicator {
	    position: absolute;
	    right: 30rpx;
	    bottom: 30rpx;
	    background-color: rgba(0, 0, 0, 0.5);
	    color: white;
	    font-size: 24rpx;
	    padding: 8rpx 16rpx;
	    border-radius: 20rpx;
	    z-index: 9;
	}

	.banner-image {
		width: 100%;
		height: 100%;
	}
	

	/* 价格营销区域样式 */
	.price-marketing {
		background: linear-gradient(to right, #ff2020, #ff4040);
		padding: 20rpx;
		color: #fff;
		display: flex;
		align-items: center;
		/* 垂直居中 */
		height: 120rpx;
		/* 设置固定高度 */
		position: relative;
	}

	/* 左侧70%区域 */
	.price-section-container {
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* 垂直居中 */
		height: 100%;
		/* 继承父容器高度 */
	}

	.price-section {
		display: flex;
		align-items: baseline;
	}

	/* 倒计时区域样式 */
	.countdown-section {
		width: 30%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* 垂直居中 */
		align-items: center;
		/* 水平居中 */
		height: 120%;
		/* 继承父容器高度 */
		background-color: rgba(0, 0, 0, 0.15);
		border-radius: 12rpx;
	}

	.countdown-title {
		font-size: 28rpx;
		font-weight: bold;
		margin-bottom: 8rpx;
	}

	.countdown-time {
		font-size: 32rpx;
		font-weight: bold;
		color: #fff;
		letter-spacing: 1rpx;
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
		padding: 4rpx 10rpx;
		border-radius: 4rpx;
		font-size: 24rpx;
		margin-right: 20rpx;
	}

	.promotion-text {
		background-color: #ffac1d;
		color: #ff2020;
		padding: 4rpx 10rpx;
		border-radius: 4rpx;
		font-size: 24rpx;
		margin-right: 20rpx;
	}

	/* 商品评论区域 */
	.reviews-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15rpx 0;
		border-bottom: 1rpx solid #a4a4a4;
	}

	.reviews-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
	}

	.reviews-view-all {
		font-size: 28rpx;
		color: #666;
		cursor: pointer;
	}

	.reviews-view-all[style*="color: #999;"] {
		color: #999;
		cursor: default;
	}

	.reviews-list {
		margin-top: 30rpx;
	}

	.review-item {
		display: flex;
		margin-bottom: 30rpx;
	}

	.review-avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 40rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}

	.avatar-image {
		width: 100%;
		height: 100%;
	}

	.review-content {
		flex: 1;
	}

	.review-user {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 10rpx;
	}

	.review-text {
		font-size: 28rpx;
		color: #333;
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
	}

	.stat-item {
		color: #666;
		font-size: 24rpx;
		padding: 8rpx;
		margin-right: 20rpx;
		border: 2rpx solid #000;
		border-radius: 8rpx;
	}

	.stat-divider {
		color: #000;
		margin: 0 20rpx;
		font-size: 24rpx;
	}

	.tags {
		flex-wrap: wrap;
		gap: 10rpx;
		margin: 20rpx 10rpx;
	}

	.tag {
		padding: 4rpx 12rpx;
		background-color: #fff1f0;
		color: #ff4400;
		font-size: 24rpx;
		border-radius: 4rpx;
		margin-left: 10rpx;
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

	/* 地图相关样式 */
	.map-card {
		margin: 20rpx 0;
		border-radius: 12rpx;
		overflow: hidden;
		background: #fff;
	}

	.map-image {
		width: 100%;
		display: block;
	}

	.map-placeholder {
		height: 200rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f0f2f5;
		margin: 20rpx 0;
		border-radius: 12rpx;
	}

	.placeholder-text {
		color: #999;
		font-size: 28rpx;
	}

	.location-info {
		padding: 10rpx 20rpx;
		background: rgba(255, 255, 255, 0.9);
		border-top: 1px solid #f0f2f5;
	}

	.location-header {
		padding: 10rpx 0;
	}

	.location-title {
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
	}

	.location-detail {
		padding: 6rpx 0;
	}

	.location-text {
		font-size: 26rpx;
		color: #666;
	}
</style>