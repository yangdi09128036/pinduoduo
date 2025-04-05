<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="nav-left" @click="navBack">
				<image src="/static/left.png" class="back-icon"></image>
			</view>
			<view class="nav-title">
				<text>我的历史</text>
			</view>
			<view class="nav-right" @click="toggleSelectAll">
				<text>{{ isAllSelected ? '取消全选' : '全选' }}</text>
			</view>
		</view>

		<!-- 历史商品列表 -->
		<scroll-view scroll-y="true" class="history-list" @scrolltolower="loadMoreItems">
			<view v-if="historyItems.length === 0" class="empty-state">
				<image src="/static/empty-box.png" class="empty-icon"></image>
				<text>暂无历史商品</text>
				<button class="go-shopping-btn" @click="goShopping">去逛逛</button>
			</view>
			<view v-else class="history-item" v-for="item in historyItems" :key="item._id">
				<view class="checkbox" @click="toggleSelect(item)">
					<view class="checkbox-inner" :class="{ 'selected': selectedItems.includes(item._id) }">
						<text v-if="selectedItems.includes(item._id)" class="checkbox-icon">✓</text>
					</view>
				</view>
				<image :src="item.goods_thumb.fileID" class="product-image" mode="aspectFill"
					@click="goToProductDetail(item._id)"></image>
				<view class="product-info" @click="goToProductDetail(item._id)">
					<view class="product-name">{{ item.name }}</view>
					<view class="product-price">
						<text class="price-symbol">¥</text>
						<text class="price-value">{{ item.price.toFixed(2) }}</text>
						<text class="original-price"
							v-if="item.original_price">¥{{ item.original_price.toFixed(2) }}</text>
					</view>
					<view class="product-tags">
						<text class="tag" v-if="item.is_hot">热销</text>
						<text class="tag" v-if="item.is_new">新品</text>
						<text class="tag" v-if="item.is_best">精品</text>
					</view>
				</view>
				<view class="remove-btn" @click="removehistoryItem(item._id)">
					<uni-icons type="trash" size="20" color="#999"></uni-icons>
				</view>
			</view>
			<view v-if="isLoading" class="loading">
				<uni-load-more status="loading"></uni-load-more>
			</view>
		</scroll-view>

		<!-- 底部结算栏 -->
		<view class="bottom-bar" v-if="historyItems.length > 0">
			<view class="total-section">
				<text class="total-label">合计：</text>
				<text class="total-price">
					<text class="price-symbol">¥</text>
					<text>{{ totalPrice }}</text>
				</text>
			</view>
			<button class="checkout-btn" @click="handleCheckout" :disabled="selectedItems.length === 0">
				去结算 ({{ selectedItems.length }})
			</button>
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
				historyItems: [],
				selectedItems: [],
				isAllSelected: false,
				isLoading: false,
				page: 1,
				pageSize: 10
			}
		},
		computed: {
			totalPrice() {
				return this.historyItems
					.filter(item => this.selectedItems.includes(item._id))
					.reduce((total, item) => total + item.price, 0)
					.toFixed(2)
			},
			userInfo() {
				return store.userInfo
			}
		},
		onLoad() {
			this.loadhistoryItems()
		},
		methods: {
			async loadhistoryItems() {
				try {
					if (!this.userInfo || !this.userInfo._id) {
						uni.showToast({
							title: '请先登录',
							icon: 'none'
						})
						return
					}

					this.isLoading = true
					const db = uniCloud.database()
					const historyResult = await db.collection('history')
						.where({
							userId: this.userInfo._id
						})
						.skip((this.page - 1) * this.pageSize)
						.limit(this.pageSize)
						.get()

					if (historyResult.result.data.length === 0) {
						this.isLoading = false
						if (this.page === 1) {
							this.historyItems = []
						}
						return
					}

					const productIds = historyResult.result.data.map(history => history.productId)
					const productsResult = await db.collection('mall-goods')
						.where({
							_id: db.command.in(productIds)
						})
						.get()

					const newItems = productsResult.result.data
					this.historyItems = this.page === 1 ? newItems : [...this.historyItems, ...newItems]
					this.page++
				} catch (error) {
					console.error('加载历史商品失败:', error)
					uni.showToast({
						title: '加载历史商品失败',
						icon: 'none'
					})
				} finally {
					this.isLoading = false
				}
			},
			loadMoreItems() {
				if (!this.isLoading) {
					this.loadhistoryItems()
				}
			},
			toggleSelect(item) {
				const index = this.selectedItems.indexOf(item._id)
				if (index === -1) {
					this.selectedItems.push(item._id)
				} else {
					this.selectedItems.splice(index, 1)
				}
				this.isAllSelected = this.selectedItems.length === this.historyItems.length
			},
			toggleSelectAll() {
				if (this.isAllSelected) {
					this.selectedItems = []
				} else {
					this.selectedItems = this.historyItems.map(item => item._id)
				}
				this.isAllSelected = !this.isAllSelected
			},
			async handleCheckout() {
				if (this.selectedItems.length === 0) {
					uni.showToast({
						title: '请选择商品',
						icon: 'none'
					})
					return
				}

				const selectedProducts = this.historyItems.filter(item => this.selectedItems.includes(item._id))
				const totalAmount = parseFloat(this.totalPrice)

				const paymentData = {
					amount: totalAmount,
					username: this.userInfo.username,
					mobile: this.userInfo.mobile,
					avatar: this.userInfo.avatar_file?.path || '/static/avatar-default.png',
					userId: this.userInfo._id,
					productId: this.selectedItems,
					productName: selectedProducts.map(p => p.name).join(', '),
					productImage: selectedProducts[0].goods_thumb.fileID,
					quantity: this.selectedItems.length
				}

				uni.setStorageSync('paymentData', paymentData)

				try {
					const db = uniCloud.database()
					const orderIds = []
					
					// 为每个选中的商品创建单独的订单
					for (const itemId of this.selectedItems) {
						const product = this.historyItems.find(item => item._id === itemId)
						if (product) {
							const orderResult = await db.collection('order').add({
								userId: this.userInfo._id,
								productId: [itemId], // 单个商品ID
								productName: product.name,
								productImage: product.goods_thumb.fileID,
								amount: product.price,
								quantity: 1, // 每个订单只包含一个商品
								paymentStatus: 0,
								shareStatus: 0,
								shippingStatus: 0,
								deliveryStatus: 0,
								reviewStatus: 0
							})
							orderIds.push(orderResult.result.id)
						}
					}
					
					// 存储所有订单ID
					paymentData.orderIds = orderIds
					uni.setStorageSync('paymentData', paymentData)
					uni.setStorageSync('currentOrderIds', orderIds)

					uni.navigateTo({
						url: '/pages/wallet/pay'
					})
				} catch (error) {
					console.error('创建订单失败:', error)
					uni.showToast({
						title: '创建订单失败，请重试',
						icon: 'none'
					})
				}
			},
			navBack() {
				uni.switchTab({
					url: '/pages/user/user'
				})
			},
			goToProductDetail(productId) {
				uni.navigateTo({
					url: `/pages/search/mall-details?id=${productId}`
				})
			},
			async removehistoryItem(itemId) {
				try {
					const db = uniCloud.database()
					await db.collection('history').where({
						userId: this.userInfo._id,
						productId: itemId
					}).remove()

					this.historyItems = this.historyItems.filter(item => item._id !== itemId)
					this.selectedItems = this.selectedItems.filter(id => id !== itemId)

					uni.showToast({
						title: '已移除历史',
						icon: 'success'
					})
				} catch (error) {
					console.error('移除历史失败:', error)
					uni.showToast({
						title: '移除历史失败，请重试',
						icon: 'none'
					})
				}
			},
			goShopping() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style>
	.container {
		min-height: 100vh;
		background-color: #f7f7f7;
		padding-bottom: 120rpx;
	}

	.nav-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 88rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		z-index: 100;
		margin-top: var(--status-bar-height);
	}

	.nav-left,
	.nav-right {
		font-size: 28rpx;
		color: #333;
	}

	.nav-title {
		font-size: 32rpx;
		font-weight: bold;
	}

	.back-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.history-list {
		margin-top: calc(88rpx + var(--status-bar-height));
		padding: 20rpx;
		height: calc(100vh - 88rpx - var(--status-bar-height) - 100rpx);
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.empty-icon {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 20rpx;
	}

	.go-shopping-btn {
		margin-top: 30rpx;
		background-color: #ff4040;
		color: #fff;
		border: none;
		padding: 20rpx 40rpx;
		border-radius: 40rpx;
	}

	.history-item {
		display: flex;
		align-items: center;
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 12rpx;
	}

	.checkbox {
		margin-right: 20rpx;
		width: 40rpx;
		height: 40rpx;
	}

	.checkbox-inner {
		width: 100%;
		height: 100%;
		border: 2rpx solid #ddd;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.checkbox-inner.selected {
		background-color: #ff4040;
		border-color: #ff4040;
	}

	.checkbox-icon {
		color: #fff;
		font-size: 24rpx;
	}

	.product-image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 8rpx;
		margin-right: 20rpx;
	}

	.product-info {
		flex: 1;
	}

	.product-name {
		font-size: 28rpx;
		color: #333;
		margin-bottom: 10rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.product-price {
		display: flex;
		align-items: baseline;
		margin-bottom: 10rpx;
	}

	.price-symbol {
		font-size: 24rpx;
		color: #ff4040;
	}

	.price-value {
		font-size: 32rpx;
		color: #ff4040;
		font-weight: bold;
		margin-right: 10rpx;
	}

	.original-price {
		font-size: 24rpx;
		color: #999;
		text-decoration: line-through;
	}

	.product-tags {
		display: flex;
		gap: 10rpx;
	}

	.tag {
		font-size: 20rpx;
		color: #ff4040;
		background-color: #fff1f0;
		padding: 2rpx 8rpx;
		border-radius: 4rpx;
	}

	.remove-btn {
		padding: 10rpx;
	}

	.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.total-section {
		display: flex;
		align-items: baseline;
	}

	.total-label {
		font-size: 28rpx;
		color: #333;
	}

	.total-price {
		font-size: 36rpx;
		color: #ff4040;
		font-weight: bold;
	}

	.checkout-btn {
		background-color: #ff4040;
		color: #fff;
		font-size: 28rpx;
		padding: 0 60rpx;
		height: 72rpx;
		line-height: 72rpx;
		border-radius: 36rpx;
		margin: 0;
	}

	.checkout-btn[disabled] {
		background-color: #ccc;
		color: #fff;
	}

	.loading {
		text-align: center;
		padding: 20rpx 0;
	}
</style>

