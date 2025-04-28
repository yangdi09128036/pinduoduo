<template>
	<view class="container">
		<!-- Fixed header -->
		<view class="fixed-head">
			<view class="search-container">
				<image class="back-icon" src="/static/left.png" mode="aspectFit" @click="navBack" />
				<view class="search-box" @click="navigateToSearch">
					<image class="search-icon" src="/static/search.png" mode="aspectFit" />
					<input class="search-input" type="text" :placeholder="searchPlaceholder" />
					<image class="search-icon" src="/static/camera.png" mode="aspectFit" />
				</view>
			</view>
			<view class="tab-container">
				<view v-for="(tab, index) in categories" :key="index" class="tab-item"
					:class="{ active: currentTab === index }" @click="switchTab(index)">
					{{ tab.name }}
				</view>
			</view>
		</view>

		<!-- Scrollable content -->
		<scroll-view scroll-y class="scroll-container">
			<!-- 修改后的轮播图部分 -->
			<view class="banner-container">
				<swiper class="banner-swiper" :indicator-dots="false" autoplay="true" interval="5000" circular="true"
					@change="onSwiperChange">
					<swiper-item v-for="(banner, index) in banners" :key="index">
						<image class="banner-image" :src="banner" mode="aspectFill" />
					</swiper-item>
				</swiper>
				<!-- 添加自定义指示器 -->
				<view class="custom-indicator">
					{{ currentSwiperIndex + 1 }}/{{ banners.length }}
				</view>
			</view>

			<!-- 修改后的content区域，与第一个页面完全一致 -->
			<view class="content">
				<view v-if="currentTab !== null" class="tab-content">
					<view v-for="(item, index) in currentTabData" :key="index" class="content-item"
						@click="navigateToProduct(item)">
						<view class="product-card">
							<image class="item-image" :src="item.goods_thumb?.fileID" mode="aspectFit"
								:lazy-load="true" />
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
				<view v-else class="loading">加载中...</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 0,
				searchPlaceholder: '请输入商品信息',
				categories: [],
				currentTabData: [],
				allGoods: [],
				banners: [],
				currentSwiperIndex: 0 // 新增当前轮播图索引
			};
		},
		onLoad() {
			this.getInitialData();
		},
		methods: {
			async getInitialData() {
				try {
					await Promise.all([this.getCategories(), this.getGoods(), this.getBanners()]);
					this.switchTab(0);
					if (this.allGoods.length > 0) {
						this.searchPlaceholder = this.allGoods[Math.floor(Math.random() * this.allGoods.length)]
							.keywords || '请输入商品信息';
					}
				} catch (err) {
					console.error('获取数据失败:', err);
				}
			},
			onSwiperChange(e) {
				this.currentSwiperIndex = e.detail.current;
			},
			async getCategories() {
				try {
					const {
						result: {
							data
						}
					} = await uniCloud.database().collection('mall-categories').get();
					this.categories = data || [];
				} catch (err) {
					console.error('获取分类数据失败:', err);
				}
			},
			async getGoods() {
				try {
					const {
						result: {
							data
						}
					} = await uniCloud.database().collection('mall-goods').get();
					this.allGoods = data || [];
				} catch (err) {
					console.error('获取商品数据失败:', err);
				}
			},
			async getBanners() {
				try {
					const {
						result: {
							data
						}
					} = await uniCloud.database().collection('banner').get();
					const bannerData = data[0] || {};
					this.banners = bannerData.banner_imgs.slice(0, 6).map(item => item.fileID || item.url);
				} catch (err) {
					console.error('获取轮播图数据失败:', err);
				}
			},
			switchTab(index) {
				this.currentTab = index;
				const currentCategory = this.categories[index];
				if (!currentCategory) return;

				if (index === 0) {
					const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
					this.currentTabData = shuffledGoods.slice(0, 30);
				} else {
					this.currentTabData = this.allGoods.filter(item => parseInt(item.category_id) === parseInt(
						currentCategory.sort));
				}
			},
			navigateToSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				});
			},
			navBack() {
				uni.switchTab({
					url: '/pages/index/index'
				});
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
			}
		}
	};
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #eee;
	}

	.fixed-head {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background-color: #fff;
	}

	.scroll-container {
		flex: 1;
		margin-top: 240rpx;
		/* Adjust this value based on the height of your fixed header */
	}

	.search-container {
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		padding-top: 60rpx;
	}

	.back-icon {
		width: 50rpx;
		height: 50rpx;
		margin-right: 10rpx;
	}

	.search-box {
		background-color: #eaeef2;
		width: 80%;
		display: flex;
		align-items: center;
		padding: 20rpx;
		border-radius: 20px;
	}

	.search-icon {
		width: 50rpx;
		height: 50rpx;
	}

	.search-input {
		color: #8d94a1;
		font-size: 35rpx;
		flex: 1;
		text-align: center;
	}

	.tab-container {
		padding: 20rpx;
		display: flex;
		margin-top: 30rpx;
		overflow-x: auto;
		white-space: nowrap;
		padding-bottom: 30rpx;
	}

	.tab-container::-webkit-scrollbar {
		display: none;
	}

	.tab-item {
		flex: 0 0 auto;
		margin-right: 40rpx;
		text-align: center;
		color: #333;
		font-size: 32rpx;
		font-weight: 400;
		position: relative;
	}

	.tab-item.active {
		color: #ff4d4f;
		font-weight: bold;
	}

	.tab-item.active::after {
		content: '';
		position: absolute;
		bottom: -30rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		height: 5rpx;
		background-color: #ff4d4f;
	}

	.banner-container {
		width: 100%;
		height: 400rpx;
		background-color: #fff;
	}

	.banner-swiper {
		width: 100%;
		height: 100%;
	}

	.banner-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* 新增轮播图容器样式 */
	.banner-container {
		position: relative;
		width: 100%;
		height: 400rpx;
		background-color: #fff;
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

	/* 修改后的content样式，与第一个页面完全一致 */
	.content {
		padding: 10rpx 20rpx;
		margin-top: 5rpx;
	}

	.tab-content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.content-item {
		width: 50%;
		margin-bottom: 15rpx;
	}

	.product-card {
		background: #f9f9f9;
		border-radius: 12rpx;
		overflow: hidden;
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
		color: #000;
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
		color: #666;
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
		color: #ff0000;
		font-weight: bold;
	}

	.sales {
		font-size: 24rpx;
		color: #999;
	}

	.loading {
		text-align: center;
		color: #999;
		margin-top: 40rpx;
	}
</style>