<template>
	<view class="login-container">
		<view class="login-bg"></view>
		<view class="login-content">
			<view class="login-logo">
				<image src="/static/avatar-default.png" mode="widthFix" class="logo-image"></image>
			</view>
			<view class="form-container">
				<view class="form-item">
					<input 
						class="input-box username-input"
						placeholder="请输入用户名" 
						placeholder-style="color: #fff"
						v-model="username" 
						@focus="focusUsername = true"
						@blur="focusUsername = false"
						:focus="focusUsername"
					/>
				</view>
				<view class="form-item">
					<input 
						class="input-box password-input"
						type="password" 
						placeholder="请输入密码" 
						placeholder-style="color: #fff"
						v-model="password" 
						@focus="focusPassword = true"
						@blur="focusPassword = false"
						:focus="focusPassword"
					/>
				</view>
			</view>
			<button class="login-button" type="primary" @click="pwdLogin">登录</button>
			<view class="link-container">
				<view v-if="!config.isAdmin">
					<text class="link-text retrieve-pwd" @click="toRetrievePwd">忘记密码</text>
				</view>
				<text class="link-text register" @click="toRegister">{{ config.isAdmin  ? '注册管理员账号' : '注册账号' }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/uni_modules/uni-id-pages/common/login-page.mixin.js';
	const uniIdCo = uniCloud.importObject("uni-id-co", {
		errorOptions: {
			type: 'toast'
		}
	})

	export default {
		mixins: [mixin],
		data() {
			return {
				username: "",
				password: "",
				focusUsername: false,
				focusPassword: false,
				logo: "/static/logo.png",
				config: {
					isAdmin: false
				}
			};
		},
		onLoad() {
			// 检查是否有临时存储的用户名和密码
			const tempUsername = uni.getStorageSync('temp_username');
			const tempPassword = uni.getStorageSync('temp_password');
			if (tempUsername && tempPassword) {
				this.username = tempUsername;
				this.password = tempPassword;

				// 清除临时存储
				uni.removeStorageSync('temp_username');
				uni.removeStorageSync('temp_password');
			}
		},
		onShow() {
			// 检查是否已登录
			this.checkLoginStatus();

			// #ifdef H5
			document.onkeydown = event => {
				var e = event || window.event;
				if (e && e.keyCode == 13) { //回车键的键值为13
					this.pwdLogin()
				}
			};
			// #endif
		},
		methods: {
			// 检查登录状态
			// 替换原来的 checkLoginStatus 方法
			async checkLoginStatus() {
				const token = uni.getStorageSync('uni_id_token');
				if (!token) return;

				try {
					await new Promise(resolve => setTimeout(resolve, 1000));

					uni.showToast({
						title: '已登录',
						icon: 'success',
						duration: 2000
					});

					setTimeout(() => {
						uni.switchTab({
							url: '/pages/index/index'
						});
					}, 2000);
				} catch (e) {
					console.log('检查登录状态出错:', e);
				}
			},
			toRetrievePwd() {
				uni.showToast({
					icon: "error",
					title: "该功能暂未实现"
				})
			},

			async pwdLogin() {
				if (!this.username.length) {
					this.focusUsername = true;
					return uni.showToast({
						title: '请输入用户名',
						icon: 'none'
					});
				}
				if (!this.password.length) {
					this.focusPassword = true;
					return uni.showToast({
						title: '请输入密码',
						icon: 'none'
					});
				}

				try {
					uni.showToast({
						title: '登录中...',
						icon: 'none',
						duration: 1000
					});

					const data = {
						password: this.password,
						[(/^1\d{10}$/.test(this.username) ? 'mobile' :
							/@/.test(this.username) ? 'email' : 'username')]: this.username
					};

					const e = await uniIdCo.login(data);
					this.loginSuccess(e);

					uni.showToast({
						title: '登录成功',
						icon: 'success',
						duration: 1500
					});

					setTimeout(() => {
						uni.switchTab({
							url: '/pages/index/index'
						});
					}, 1500);
				} catch (e) {
					this.handleLoginError(e);
				}
			},

			toRegister() {
				uni.navigateTo({
					url: this.config.isAdmin ? '/uni_modules/uni-id-pages/pages/register/register-admin' :
						'/uni_modules/uni-id-pages/pages/register/register',
					fail(e) {
						console.error(e);
					}
				})
			},
			handleLoginError(error) {
				console.error('登录错误:', error);

				let message = '登录失败，请重试';
				if (error.errCode === 'uni-id-account-not-exists') {
					message = '账号不存在';
				} else if (error.errCode === 'uni-id-password-error') {
					message = '密码错误';
				} else if (error.message) {
					message = error.message;
				}

				uni.showToast({
					title: message,
					icon: 'none'
				});
			}
		}
	}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40rpx;
  position: relative;
}

.login-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/static/zjl.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  opacity: 0.9;
}

.login-content {
  position: relative;
  width: 100%;
  max-width: 800rpx;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  border-radius: 40rpx;
  padding: 80rpx 60rpx;
  box-shadow: 0 30rpx 60rpx rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.8s ease-in-out;
}

.login-logo {
  text-align: center;
  margin-bottom: 60rpx;
}

.logo-image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 20%;
  margin: 0 auto;
}

.form-container {
  margin-bottom: 50rpx;
}

.form-item {
  margin-bottom: 50rpx;
  position: relative;
}

.form-item:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3rpx;
  background: rgba(255, 255, 255);
}

.input-box {
  width: 100%;
  height: 50rpx;
  font-size: 28rpx;
  color: #fff;
  border: none;
  background-color: transparent;
  padding: 10rpx 0;
}


.login-button {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; 
  padding: 50rpx;
  width: 100%;
  height: 100rpx;
  margin-top: 50rpx;
  border-radius: 24rpx;
  background: #6a5acd;
  color: #fff;
  font-size: 32rpx;
  border: none;
}

.link-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30rpx;
  padding-top: 30rpx;
}

.link-text {
  color: rgba(255, 255, 255);
  font-size: 28rpx;
}

.retrieve-pwd {
  margin-right: 40rpx;
}
</style>