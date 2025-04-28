<template>
	<view class="container">
		<view class="nav-bar">
			<view class="nav-left" @click="navBack">
				<image src="/static/left.png" mode="" class="nav-icon"></image>
				<text class="nav-title">全部评价</text>
			</view>
		</view>
		<view v-if="reviews.length > 0" class="reviews-list">
			<view class="review-item" v-for="(review, index) in reviews" :key="index">
				<view class="review-avatar">
					<image src="/static/default-avatar.png" class="avatar-image"></image>
				</view>
				<view class="review-content">
					<view class="review-user">匿名用户</view>
					<view class="review-text">{{ review }}</view>
				</view>
			</view>
		</view>
		<view v-else class="no-reviews">
			<text>暂无评价</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reviews: []
			};
		},
		onLoad(options) {
			// 从本地缓存获取商品评价数据
			this.reviews = uni.getStorageSync('currentProductReviews') || [];
		},
		methods:{
			navBack() {
				uni.navigateBack();
			},
		}
	};
</script>

<style scoped>
	/* 样式可以根据需要调整 */
	.container {
		
	}
	.nav-bar {
		background: #ff5762;
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
	.reviews-header {
		margin-bottom: 20rpx;
	}
	.reviews-list {
		padding: 20rpx;
		margin-top: 20rpx;
	}
	.review-item {
		display: flex;
		margin-bottom: 30rpx;
		border-bottom: 1rpx solid #999;
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
		margin-bottom: 20rpx;
	}
	.no-reviews {
		text-align: center;
		color: #999;
	}
</style>