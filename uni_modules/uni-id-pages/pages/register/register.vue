<template>
	<view class="register-container">
		<view class="register-bg"></view>
		<view class="register-content">
			<view class="register-logo">
				<image src="/static/avatar-default.png" mode="widthFix" class="logo-image"></image>
			</view>
			<view class="form-container">
				<view class="form-item">
					<input class="input-box username-input" placeholder="请输入用户名" placeholder-style="color: #fff"
						v-model="formData.username" @focus="focusUsername = true" @blur="focusUsername = false"
						:focus="focusUsername" />
				</view>
				<view class="form-item">
					<input class="input-box password-input" maxlength="20" placeholder="请输入6-20位密码"
						placeholder-style="color: #fff" type="password" v-model="formData.password"
						@focus="focusPassword = true" @blur="focusPassword = false" :focus="focusPassword" />
				</view>
				<view class="form-item">
					<input class="input-box password-input" maxlength="20" placeholder="再次输入密码"
						placeholder-style="color: #fff" type="password" v-model="formData.password2"
						@focus="focusPassword2 = true" @blur="focusPassword2 = false" :focus="focusPassword2" />
				</view>
				<button class="register-button" type="primary" @click="submit">注册</button>
				<button class="register-back" @click="navigateBack">返回</button>
			</view>
		</view>
	</view>
</template>

<script>
	import rules from './validator.js';
	import mixin from '@/uni_modules/uni-id-pages/common/login-page.mixin.js';
	import config from '@/uni_modules/uni-id-pages/config.js'
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js';

	const uniIdCo = uniCloud.importObject("uni-id-co");

	export default {
		mixins: [mixin],
		data() {
			return {
				formData: {
					username: "",
					password: "",
					password2: ""
				},
				rules,
				focusUsername: false,
				focusPassword: false,
				focusPassword2: false,
				logo: "/static/logo.png",
			}
		},
		onShow() {
			// #ifdef H5
			document.onkeydown = event => {
				var e = event || window.event;
				if (e && e.keyCode == 13) { //回车键的键值为13
					this.submit()
				}
			};
			// #endif
		},
		methods: {
			submit() {
				// 手动验证表单
				if (!this.formData.username) {
					this.focusUsername = true;
					return uni.showToast({
						title: '请输入用户名',
						icon: 'none'
					});
				}
				if (!this.formData.password) {
					this.focusPassword = true;
					return uni.showToast({
						title: '请输入密码',
						icon: 'none'
					});
				}
				if (this.formData.password.length < 6) {
					this.focusPassword = true;
					return uni.showToast({
						title: '密码长度不能少于6位',
						icon: 'none'
					});
				}
				if (!this.formData.password2) {
					this.focusPassword2 = true;
					return uni.showToast({
						title: '请再次输入密码',
						icon: 'none'
					});
				}
				if (this.formData.password !== this.formData.password2) {
					this.focusPassword2 = true;
					return uni.showToast({
						title: '两次输入的密码不一致',
						icon: 'none'
					});
				}

				this.submitForm();
			},
			submitForm() {
				uniIdCo.registerUser(this.formData).then(e => {
					this.loginSuccess(e);
					uni.showToast({
						title: '注册成功',
						icon: 'success',
						duration: 2000
					});

					// 存储用户名和密码
					uni.setStorageSync('temp_username', this.formData.username);
					uni.setStorageSync('temp_password', this.formData.password);

					setTimeout(() => {
						uni.redirectTo({
							url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
						});
					}, 2000);
				}).catch((e) => {
					console.error('注册失败：', e);

					let errorMessage = '注册失败，请重试';
					if (e.msg) {
						errorMessage = e.msg;
					}

					uni.showToast({
						title: errorMessage,
						icon: 'none',
						duration: 3000
					});
				});
			},
			navigateBack() {
				uni.navigateBack()
			},
			toLogin() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
				})
			},
			registerByEmail() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/register/register-by-email'
				})
			}
		}
	}
</script>
<style scoped>
	.register-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 40rpx;
		position: relative;
	}

	.register-bg {
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

	.register-content {
		width: 100%;
		max-width: 800rpx;
		background: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(20px);
		border-radius: 40rpx;
		padding: 80rpx 60rpx;
	}

	.register-logo {
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
		margin-bottom: 30rpx;
	}

	.form-item {
		margin-bottom: 50rpx;
	}

	.input-box {
		width: 100%;
		height: 50rpx;
		font-size: 28rpx;
		color: #fff;
		border: none;
		background-color: transparent;
		padding: 10rpx 0;
		border-bottom: 3rpx solid rgba(255, 255, 255);
	}



	.register-button {
		display: flex;
		/* 使用 Flexbox 布局 */
		justify-content: center;
		/* 水平居中 */
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

	.register-back {
		display: flex;
		/* 使用 Flexbox 布局 */
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		backdrop-filter: blur(20px);
		background: rgba(255, 255, 255, 0.3);
		width: 100%;
		height: 100rpx;
		margin-top: 30rpx;
		border-radius: 24rpx;
		color: #6a5acd;
		font-size: 30rpx;
		
	}
</style>