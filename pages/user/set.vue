<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="nav-back" @click="handleBack">
				<image src="/static/left.png" mode="" class="back-icon"></image>
			</view>
			<text class="page-title">个人信息</text>
		</view>

		<form @submit="saveUserInfo">
			<view class="form-card">
				<view class="form-item avatar_file-item">
				  <text class="label">头像</text>
				  <view class="avatar">
				    <uni-id-pages-avatar width="120rpx" height="120rpx"></uni-id-pages-avatar>
				  </view>
				</view>
				<view class="divider"></view>

				<view class="form-item">
					<text class="label">用户名</text>
					<input class="input" type="text" v-model="username" placeholder="请输入用户名" />
				</view>
				<view class="divider"></view>

				<view class="form-item">
					<text class="label">手机号码</text>
					<input class="input" type="number" v-model="mobile" placeholder="请输入手机号码" />
				</view>
				<view class="divider"></view>

				<view class="form-item address-item">
					<text class="label">收货地址</text>
					<textarea class="textarea" v-model="address" placeholder="请输入详细收货地址"></textarea>
				</view>
			</view>

			<!-- 地图显示区域 -->
			<view class="section-title" v-if="locationInfo">
				<view class="title-line"></view>
				<text>位置信息</text>
				<view class="title-line"></view>
			</view>

			<view class="map-card" v-if="locationInfo">
				<image v-if="mapUrl" :src="mapUrl" mode="widthFix" class="map-image"></image>
				<view v-else class="map-placeholder">
					<text class="placeholder-text">地图加载中...</text>
				</view>
			</view>

			<view class="location-info-card" v-if="locationInfo">
				<view class="location-header">
					<text class="location-title">您的大概位置</text>
				</view>
				<view class="location-detail">
					<view class="location-item">
						<text class="location-label">省份:</text>
						<text class="location-value">{{locationInfo.province || '未知'}}</text>
					</view>
					<view class="location-item">
						<text class="location-label">城市:</text>
						<text class="location-value">{{locationInfo.city || '未知'}}</text>
					</view>
				</view>
			</view>

			<!-- 定位失败提示 -->
			<view class="location-fail" v-if="!locationInfo">
				<text>检测到当前连接的网络为IPv6，因定位技术限制请连接IPv4的网络（公网IP地址）来显示当前所处位置的地图（不影响修改和保存您的用户信息）</text>
			</view>

			<!-- 按钮区域 -->
			<button form-type="submit" class="save-btn">
				<text class="btn-text">保存修改</text>
			</button>

			<view class="logout-btn" @click="handleLogout">
				<text>退出登录</text>
			</view>
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
				avatar_file: '',
				username: '',
				mobile: '',
				address: '',
				locationInfo: null,
				mapUrl: '',
				key: '21bbea8854ce73ebd9163d7cf6cc9c76' // 高德地图API key
			};
		},
		onLoad() {
			this.loadUserInfo();
			this.getLocationByIP();
		},
		methods: {
			async loadUserInfo() {
				try {
					// 使用callFunction调用uni-id-cf
					const res = await uniCloud.callFunction({
						name: 'uni-id-cf',
						data: {
							action: 'getCurrentUserInfo',
							params: {
								uid: store.userInfo._id,
								field: ['username', 'mobile', 'address', 'avatar_file'] // 只获取需要的字段
							}
						}
					});

					if (res.result.code === 0) {
						const userInfo = res.result.userInfo;
						console.log('用户信息', userInfo);
						this.username = userInfo.username || '';
						this.mobile = userInfo.mobile || '';
						this.address = userInfo.address || '';
						this.avatar_file = userInfo.avatar_file || '';

						// 更新store
						store.userInfo = {
							...store.userInfo,
							...userInfo
						};
					} else {
						throw new Error(res.result.message || '获取用户信息失败');
					}
				} catch (e) {
					console.error('获取用户信息失败:', e);
					// 降级处理：使用store中的缓存
					const localInfo = store.userInfo || {};
					this.username = localInfo.username || '';
					this.mobile = localInfo.mobile || '';
					this.address = localInfo.address || '';
					this.avatar_file = localInfo.avatar_file || '';

					uni.showToast({
						title: '获取信息失败，使用缓存数据',
						icon: 'none'
					});
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
						address: this.address,
						avatar_file: this.avatar_file
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
					success: async (res) => {
						if (res.confirm) {
							try {
								// 清空本地存储的token和用户信息
								uni.removeStorageSync('uni_id_token');
								uni.removeStorageSync('uni_id_userinfo');

								// 清空全局store中的用户信息
								store.userInfo = {};

								// 跳转到登录页
								uni.redirectTo({
									url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
								});
							} catch (error) {
								console.error('退出登录失败:', error);
								uni.showToast({
									title: '退出登录失败，请重试',
									icon: 'none'
								});
							}
						}
					}
				});
			},
			// 地图相关方法
			async getLocationByIP() {
				uni.showToast({
					title: '定位中...',
					icon: 'none',
					duration: 1000
				});

				try {
					const ipRes = await this.getIPLocation();
					console.log('定位信息:', ipRes);

					if (!ipRes.data || typeof ipRes.data.rectangle !== 'string') {
						console.log('当前网络为IPv6，无法获取精确位置');
						this.locationInfo = null;
						return;
					}

					this.locationInfo = ipRes.data;
					let originalLng = 0,
						originalLat = 0;

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
				} catch (error) {
					console.log('定位失败，当前网络可能为IPv6:', error);
					this.locationInfo = null;
				} finally {
					uni.hideToast();
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
	};
</script>

<style scoped>
	.container {
		padding: 0 0 60rpx;
		background-color: #f5f7fa;
		min-height: 100vh;
		box-sizing: border-box;
	}

	/* 导航栏样式 */
	.nav-bar {
		position: relative;
		display: flex;
		align-items: center;
		padding-top: 90rpx;
		background: #CC3333;
		color: #fff;
		box-shadow: 0 4rpx 12rpx rgba(74, 137, 220, 0.3);
	}

	.nav-back {
		position: absolute;
		left: 30rpx;
		bottom: 30rpx;
		z-index: 10;
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;


	}

	.back-icon {
		width: 50rpx;
		height: 50rpx;
	}

	.page-title {
		width: 100%;
		text-align: center;
		font-size: 36rpx;
		font-weight: 500;
		margin-bottom: 30rpx;
	}

	/* 表单卡片样式 */
	.form-card {
		margin: 30rpx;
		background: #fff;
		border-radius: 20rpx;
		padding: 0 30rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
	}

	.form-item {
	  display: flex;
	  align-items: center;
	  justify-content: space-between; /* 让头像靠右显示 */
	  padding: 30rpx 0;
	  position: relative;
	}

.avatar {
  width: 120rpx;  /* 保持固定宽度 */
  height: 120rpx; /* 保持固定高度 */
  margin-left: auto; /* 这将使头像靠右 */
}

	.address-item {
		align-items: flex-start;
		padding: 40rpx 0;
	}

	.divider {
		height: 1rpx;
		background-color: #f0f2f5;
		margin: 0;
	}

	.label {
		 width: 160rpx;  /* 固定宽度 */
		font-size: 30rpx;
		color: #333;
		width: 160rpx;
		flex-shrink: 0;
		font-weight: 500;
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
		text-align: right;
		width: 100%;
		height: 50rpx;
		font-size: 30rpx;
		color: #333;
		padding: 0 20rpx;
		background-color: #f9fafc;
		border-radius: 12rpx;
		line-height: 1.5;
	}

	/* 地图相关样式 */
	.section-title {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 50rpx 30rpx 30rpx;
	}

	.section-title text {
		font-size: 28rpx;
		color: #666;
		margin: 0 20rpx;
	}

	.title-line {
		height: 1rpx;
		flex: 1;
		background-color: #e0e0e0;
	}

	.map-card {
		margin: 0 30rpx;
		background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
	}

	.map-image {
		width: 100%;
		display: block;
	}

	.map-placeholder {
		height: 300rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f0f2f5;
	}

	.placeholder-text {
		color: #999;
		font-size: 28rpx;
	}

	.location-info-card {
		margin: 20rpx 30rpx;
		background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
	}

	.location-header {
		padding: 20rpx 30rpx;
		border-bottom: 1rpx solid #f0f2f5;
	}

	.location-title {
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
	}

	.location-detail {
		padding: 20rpx 30rpx;
	}

	.location-item {
		display: flex;
		margin-bottom: 16rpx;
	}

	.location-item:last-child {
		margin-bottom: 0;
	}

	.location-label {
		font-size: 28rpx;
		color: #666;
		width: 100rpx;
	}

	.location-value {
		font-size: 28rpx;
		color: #333;
		flex: 1;
	}

	/* 定位失败提示样式 */
	.location-fail {
		margin: 30rpx;
		padding: 20rpx;
		background: #fff;
		border-radius: 10rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
		text-align: center;
		font-size: 28rpx;
		color: #ff5a5f;
	}

	/* 按钮样式 */
	.save-btn {
		margin: 60rpx 30rpx 30rpx;
		background-color: #CC3333;
		color: #fff;
		font-size: 32rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 10rpx;
		box-shadow: 0 6rpx 20rpx rgba(74, 137, 220, 0.3);
		transition: all 0.2s;
		position: relative;
		overflow: hidden;
	}

	.save-btn:active {
		transform: scale(0.98);
		box-shadow: 0 2rpx 10rpx rgba(74, 137, 220, 0.3);
	}

	.btn-text {
		position: relative;
		z-index: 1;
		font-weight: 500;
	}

	.logout-btn {
		margin: 20rpx 30rpx;
		text-align: center;
		color: #ff5a5f;
		font-size: 32rpx;
		padding: 30rpx;
		border-radius: 10rpx;
		background: #fff;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
		transition: all 0.2s;
	}

	.logout-btn:active {
		background-color: rgba(255, 90, 95, 0.05);
		transform: scale(0.98);
	}

	/* 输入框placeholder样式 */
	input::-webkit-input-placeholder,
	textarea::-webkit-input-placeholder {
		color: #bbb;
	}
</style>