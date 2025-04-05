<template>
	<view class="container">
		<!-- 返回按钮 -->
		<view class="nav-back" @click="handleBack">
			<image src="/static/left.png" mode="" class="back-icon"></image>
		</view>

		<form @submit="saveUserInfo">
			<view class="form-content">
				<view class="form-item">
					<text class="label">头像</text>
					<uni-id-pages-avatar width="120rpx" height="120rpx"></uni-id-pages-avatar>
				</view>
				<view class="form-item">
					<text class="label">用户名</text>
					<input class="input" type="text" v-model="username" placeholder="请输入用户名" />
				</view>
				<view class="form-item">
					<text class="label">手机号码</text>
					<input class="input" type="number" v-model="mobile" placeholder="请输入手机号码" />
				</view>
				<view class="form-item">
					<text class="label">收货地址</text>
					<textarea class="textarea" v-model="address" placeholder="请输入详细收货地址"></textarea>
				</view>
			</view>

			<button form-type="submit" class="save-btn">保存修改</button>
			<view class="logout-btn" @click="handleLogout">退出登录</view>
		</form>
	</view>
</template>

<script>
	import {
		store
	} from '@/uni_modules/uni-id-pages/common/store.js';

	export default {
		data() {
			return {
				username: '',
				mobile: '',
				address: ''
			};
		},
		onLoad() {
			this.loadUserInfo();
		},
		methods: {
			loadUserInfo() {
				const userInfo = store.userInfo;
				console.log("之前用户信息", userInfo);
				if (userInfo) {
					this.username = userInfo.username || '';
					this.mobile = userInfo.mobile || '';
					this.address = userInfo.address || '';
				}
			},
			async saveUserInfo() {
				if (!this.username || !this.mobile || !this.address) {
					uni.showToast({
						title: '请填写完整信息',
						icon: 'none'
					});
					return;
				}

				try {
					const db = uniCloud.database();
					await db.collection('uni-id-users').doc(store.userInfo._id).update({
						username: this.username,
						mobile: this.mobile,
						address: this.address
					});

					store.userInfo = {
						...store.userInfo,
						username: this.username,
						mobile: this.mobile,
						address: this.address
					};
					console.log("之后用户信息", store.userInfo);
					uni.showToast({
						title: '保存成功',
						icon: 'success'
					});

					setTimeout(() => {
						uni.navigateBack();
					}, 1500);
				} catch (error) {
					console.error('保存用户信息失败:', error);
					uni.showToast({
						title: '保存失败，请重试',
						icon: 'none'
					});
				}
			},
			handleBack() {
				uni.navigateBack();
			},
			handleLogout() {
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗？',
					success: res => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
							})
						}
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	.container {
		padding: 100rpx 40rpx 60rpx;
		background: #f8f8f8;
		min-height: 100vh;
		box-sizing: border-box;
	}

	.nav-back {
		position: fixed;
		left: 30rpx;
		top: 60rpx;
		padding: 10rpx;
		z-index: 10;
	}

	.back-icon {
		width: 60rpx;
		height: 60rpx;
	}

	.form-content {
		margin-top: 50rpx;
		background: #fff;
		border-radius: 16rpx;
		padding: 0 30rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);
	}

	.form-item {
		display: flex;
		align-items: center;
		padding: 36rpx 0;
		border-bottom: 1rpx solid #eee;

		&:last-child {
			border-bottom: none;
		}

		.label {
			font-size: 30rpx;
			color: #333;
			width: 160rpx;
			flex-shrink: 0;
		}

		.input {
			flex: 1;
			font-size: 30rpx;
			color: #333;
			text-align: right;
			padding: 0 20rpx;
		}

		.textarea {
			flex: 1;
			height: 150rpx;
			font-size: 30rpx;
			color: #333;
			padding: 20rpx;
			line-height: 1.5;
		}
	}

	.save-btn {
		margin-top: 60rpx;
		background: #007AFF;
		color: #fff;
		font-size: 34rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 45rpx;
		box-shadow: 0 6rpx 20rpx rgba(0, 122, 255, 0.2);
		transition: all 0.2s;

		&:active {
			opacity: 0.9;
			transform: scale(0.98);
		}
	}

	.logout-btn {
		margin-top: 40rpx;
		text-align: center;
		color: #ff3b30;
		font-size: 32rpx;
		padding: 30rpx;
		border-radius: 12rpx;
		background: #fff;
		transition: background-color 0.2s;

		&:active {
			background-color: rgba(255, 59, 48, 0.1);
		}
	}

	/* 输入框placeholder样式 */
	input::-webkit-input-placeholder,
	textarea::-webkit-input-placeholder {
		color: #999;
		opacity: 0.8;
	}
</style>