<template>
	<view class="container">
		<!-- Fixed head section remains unchanged -->
		<view class="fixed-head">
			<view class="search-container">
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

		<!-- Scrollable content remains unchanged -->
		<scroll-view scroll-y class="scroll-container" :style="{ height: scrollHeight }" @refresherrefresh="onRefresh"
			refresher-enabled="true" :refresher-threshold="100" refresher-default-style="none"
			refresher-background="#eee" lower-threshold="0" :refresher-triggered="isRefreshing">
			<template v-if="currentTab === 0">
				<view class="section-new">
					<view v-for="(item, index) in specialItems" :key="index" class="common-item"
						@click="navigateToPage(item.url)">
						<image class="section-image" :src="item.image" mode="aspectFit" :lazy-load="true" />
						<text class="section-text">{{ item.text }}</text>
					</view>
				</view>
				<view v-for="(sectionData, sectionIndex) in sections" :key="sectionIndex" class="section"
					@click="navigateToSection(sectionIndex)">
					<view class="common-item">
						<image class="section-image" :src="sectionData.image" mode="aspectFit" :lazy-load="true" />
						<text class="section-text-new">{{ sectionData.title }}</text>
					</view>
					<view
						v-for="(product, productIndex) in placeholderProducts.slice(sectionIndex * 4, (sectionIndex + 1) * 4)"
						:key="productIndex" class="common-item">
						<image class="section-image" :src="product.goods_thumb?.fileID" mode="aspectFit"
							:lazy-load="true" />
						<text class="price" style="color: red;">¥{{ product.price }}</text>
					</view>
				</view>
			</template>

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
	import {
		store
	} from '@/uni_modules/uni-id-pages/common/store.js';

	export default {
		data() {
			return {
				currentTab: 0,
				searchPlaceholder: '请输入商品信息',
				categories: [],
				allGoods: [],
				currentTabData: [],
				placeholderProducts: [],
				specialItems: [
				  {
				    image: '/static/clock.png',
				    text: '限时秒杀',
				    url: 'https://www.jd.com/'
				  },
				  {
				    image: '/static/recharge.png',
				    text: '话费充值',
				    url: 'https://pro.jd.com/mall/active/4NgfTXqfdYhvRcmET8SMGCrRztHU/index.html?babelChannel=ttt12&innerAnchor=100119111653'
				  },
				  {
				    image: '/static/turntable.png',
				    text: '数码国补',
				    url: 'https://pro.jd.com/mall/active/h7bbR7sFxP6thFYwDqxNWjAbh8K/index.html?babelChannel=ttt111'
				  },
				  {
				    image: '/static/sale.png',
				    text: '秒杀',
				    url: 'https://pro.jd.com/mall/active/2hZ8idqu6mj9ZGR1LbPsd3MrW2i2/index.html?babelChannel=ttt3&innerAnchor=10136238481040'
				  },
				  {
				    image: '/static/money.png',
				    text: '便宜包邮',
				    url: 'https://pro.jd.com/mall/active/3J13cRc4KPMNqXPVuVFY9aDKsBJy/index.html?babelChannel=ttt1'
				  }
				],
				sections: [{
						title: '百亿补贴',
						image: '/static/subsidy.png',
						url: '/pages/subsidy/subsidy'
					},
					{
						title: '多多买菜',
						image: '/static/vegetables.png',
						url: '/pages/buy-vegetables/buy-vegetables'
					}
				],
				pageNumber: 1,
				pageSize: 100,
				scrollHeight: 'calc(100vh - 240rpx)',
				isRefreshing: false,
				cacheKey: 'homePageData',
				cacheExpiration: 5 * 60 * 1000000, // 5分钟
				userInfoChecked: false,
				userInfoComplete: false, // 新增：标记用户信息是否完整
				isDataLoaded: false, // 新增：标记数据是否已加载
			};
		},
		async onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.scrollHeight = `calc(100vh - ${res.statusBarHeight}px - 240rpx)`;
				}
			});
			
			// 首先检查用户信息，确保同步执行
			await this.checkUserInfoSync();
			
			// 只有在用户信息检查完成后，才加载其他数据
			await this.getInitialData();
		},
		onShow() {
			// 页面每次显示时，如果之前检查过用户信息且不完整，则重新检查
			if (this.userInfoChecked && !this.userInfoComplete) {
				this.checkUserInfo(true); // 传入silent参数为true，表示静默检查
			}
		},
		methods: {
			// 新增：同步检查用户信息的方法
			async checkUserInfoSync() {
			  console.log('开始同步检查用户信息');
			  
			  // 如果用户未登录，不进行检查
			  if (!store.hasLogin) {
			    console.log('用户未登录，跳过信息检查');
			    this.userInfoChecked = true;
			    return;
			  }
			  
			  // 等待用户信息加载完成
			  let attempts = 0;
			  const maxAttempts = 20; // 将最大尝试次数从10次增加到20次
			  const waitTime = 2000; // 将每次等待时间从300ms增加到500ms
			  
			  while (!store.userInfo && attempts < maxAttempts) {
			    console.log(`等待用户信息加载，尝试 ${attempts + 1}/${maxAttempts}`);
			    await new Promise(resolve => setTimeout(resolve, waitTime)); // 等待500ms
			    attempts++;
			  }
			  
			  // 检查用户信息
			  this.userInfoChecked = true;
			  
			  if (!store.userInfo) {
			    console.log('用户信息加载超时或不存在');
			    this.userInfoComplete = false;
			    return;
			  }
			  
			  console.log('检查用户信息:', store.userInfo);
			  
			  const hasMobile = !!store.userInfo.mobile && store.userInfo.mobile.trim() !== '';
			  const hasAddress = !!store.userInfo.address && store.userInfo.address.trim() !== '';
			  
			  console.log('用户信息检查结果:', {
			    hasMobile,
			    hasAddress
			  });
			  
			  this.userInfoComplete = hasMobile && hasAddress;
			  
			  if (!this.userInfoComplete) {
			    console.log('用户信息不完整，需要补充');
			    uni.showToast({
			      title: '请完善手机与收货地址',
			      icon: 'none',
			      duration: 2000
			    });
			    
			    // 2秒后自动跳转到用户信息设置页面
			    setTimeout(() => {
			      uni.navigateTo({
			        url: '/pages/user/set'
			      });
			    }, 2000);
			  } else {
			    console.log('用户信息已完整');
			  }
			},
			
			// 保留原有方法，但主要用于onShow时的检查
			checkUserInfo(silent = false) {
				// 如果用户未登录，不进行检查
				if (!store.hasLogin) {
					console.log('用户未登录，跳过信息检查');
					return;
				}
				
				const userInfo = store.userInfo;
				if (!userInfo) {
					console.log('用户信息不存在，跳过信息检查');
					return;
				}
				
				console.log('检查用户信息:', JSON.stringify(userInfo));
				
				const hasMobile = !!userInfo.mobile && userInfo.mobile.trim() !== '';
				const hasAddress = !!userInfo.address && userInfo.address.trim() !== '';
				
				console.log('用户信息检查结果:', {
					hasMobile,
					hasAddress
				});
				
				this.userInfoComplete = hasMobile && hasAddress;
				
				if (this.userInfoComplete) {
					console.log('用户信息已完整');
					return true;
				} else {
					console.log('用户信息不完整，需要补充');
					// 只有在非静默模式下才显示提示
					if (!silent) {
						uni.showToast({
							title: '请完善手机与收货地址',
							icon: 'none',
							duration: 2000
						});
						
						// 2秒后自动跳转到用户信息设置页面
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/user/set'
							});
						}, 2000);
					}
					return false;
				}
			},
			
			async getInitialData() {
				try {
					const cachedData = this.getCachedData();
					if (cachedData) {
						this.setPageData(cachedData);
					} else {
						await this.fetchAndCacheData();
					}
					this.switchTab(0);
					this.isDataLoaded = true;
				} catch (err) {
					console.error('初始化数据失败:', err);
					this.isDataLoaded = false;
					throw err;
				}
			},
			getCachedData() {
				const cachedData = uni.getStorageSync(this.cacheKey);
				if (cachedData && Date.now() - cachedData.timestamp < this.cacheExpiration) {
					return cachedData.data;
				}
				return null;
			},
			async fetchAndCacheData() {
				try {
					const {
						result
					} = await uniCloud.callFunction({
						name: 'getHomePageData',
						data: {
							pageNumber: this.pageNumber,
							pageSize: this.pageSize
						}
					});
					
					if (result.success) {
						this.setPageData(result.data);
						this.cacheData(result.data);
					} else {
						throw new Error(result.error);
					}
				} catch (err) {
					console.error('获取数据失败:', err);
					throw err;
				}
			},
			setPageData(data) {
				this.categories = data.categories || [];
				this.allGoods = data.goods || [];
				if (this.allGoods.length > 0) {
					this.searchPlaceholder = this.allGoods[Math.floor(Math.random() * this.allGoods.length)].keywords ||
						'请输入商品信息';
				}
			},
			cacheData(data) {
				uni.setStorageSync(this.cacheKey, {
					timestamp: Date.now(),
					data: data
				});
			},
			switchTab(index) {
				this.currentTab = index;
				const currentCategory = this.categories[index];
				if (!currentCategory) return;
				
				if (index === 0) {
					const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
					this.currentTabData = shuffledGoods.slice(0, this.pageSize);
					this.placeholderProducts = shuffledGoods.slice(this.pageSize - 80, this.pageSize + 5);
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
			navigateToPage(url) {
			  try {
			    if (process.env.VUE_APP_PLATFORM === 'h5') {
			      // 如果是 H5 平台，直接使用 window.location.href
			      window.location.href = url;
			    } else {
			      // 如果是原生平台，使用 uni.navigateTo 或其他方式
			      uni.navigateTo({
			        url: `/pages/webview/webview?url=${encodeURIComponent(url)}`
			      });
			    }
			  } catch (error) {
			    console.error('跳转失败:', error);
			  }
			},
			navigateToSection(index) {
				const section = this.sections[index];
				if (section) {
					uni.navigateTo({
						url: section.url
					});
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
			onRefresh() {
				console.log('正在刷新...');
				this.isRefreshing = true;
				this.fetchAndCacheData().then(() => {
					this.switchTab(this.currentTab);
					this.isRefreshing = false;
				}).catch((error) => {
					console.error('刷新失败:', error);
					this.isRefreshing = false;
				});
			}
		},
	};
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #f4f4f4;
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
		margin-top: 260rpx;
	}

	.search-container {
		padding: 0 20rpx;
		padding-top: 80rpx;
	}

	.search-box {
		background-color: #ededed;
		flex: 1;
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
		margin-top: 10rpx;
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

	.section-new {
		display: flex;
		justify-content: space-between;
		margin-top: 30rpx;
		padding: 20rpx;
		background-color: #fff;
	}

	.section {
		display: flex;
		justify-content: space-between;
		margin-top: 15rpx;
		padding: 20rpx;
		background-color: #fff;
	}

	.common-item {
		width: 16%;
		text-align: center;
	}

	.section-image {
		width: 100%;
		height: 140rpx;
		object-fit: cover;
		border-radius: 15rpx;
	}

	.section-text {
		font-size: 22rpx;
		color: #000;
		font-weight: 550;
		margin-top: 10rpx;
	}

	.section-text-new {
		font-size: 28rpx;
		color: #000;
		font-weight: 900;
		margin-top: 10rpx;
	}

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

