<template>
	<view class="login-container">
		<view class="login-content">
			<view class="login-logo">
				<image src="/static/logo.png" mode="widthFix" class="logo-image"></image>
			</view>
			<uni-forms class="form-container">
				<uni-forms-item name="username">
					<uni-easyinput :focus="focusUsername" @blur="focusUsername = false" class="input-box username-input"
						:inputBorder="false" v-model="username" placeholder="请输入用户名" trim="all" />
				</uni-forms-item>
				<uni-forms-item name="password">
					<uni-easyinput :focus="focusPassword" @blur="focusPassword = false" class="input-box password-input"
						clearable type="password" :inputBorder="false" v-model="password" placeholder="请输入密码"
						trim="all" />
				</uni-forms-item>
			</uni-forms>
			<!-- <button class="login-button" type="primary" @click="wechat">微信一键登录</button> -->
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
				password: "",
				username: "",
				focusUsername: false,
				focusPassword: false,
				logo: "/static/logo.png",
			}
		},
		onShow() {
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
			toRetrievePwd() {
				uni.showToast({
					icon: "error",
					title: "该功能暂未实现"
				})
			},
			pwdLogin() {
				if (!this.username.length) {
					this.focusUsername = true
					return uni.showToast({
						title: '请输入用户名',
						icon: 'none',
						duration: 3000
					});
				}
				if (!this.password.length) {
					this.focusPassword = true
					return uni.showToast({
						title: '请输入密码',
						icon: 'none',
						duration: 3000
					});
				}

				if (this.needAgreements && !this.agree) {
					return this.$refs.agreements.popup(this.pwdLogin)
				}

				let data = {
					password: this.password
				}

				if (/^1\d{10}$/.test(this.username)) {
					data.mobile = this.username
				} else if (/@/.test(this.username)) {
					data.email = this.username
				} else {
					data.username = this.username
				}

				uniIdCo.login(data)
					.then(e => {
						this.loginSuccess(e);
						uni.showToast({
							title: '登录成功',
							icon: 'success',
							duration: 1000
						});
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/index'
							});
						}, 1000); // 2秒后跳转
					})
					.catch(e => {
						console.error('登录失败：', e); // 输出错误到控制台

						let errorMessage = '登录失败，请重试';
						if (e.errCode === 'uni-id-captcha-required') {
							errorMessage = '需要验证码登录，请稍后重试';
							// 这里可以处理验证码相关逻辑
						} else if (e.message) {
							errorMessage = e.message; // 使用后端返回的错误信息
						}

						uni.showToast({
							title: errorMessage,
							icon: 'none',
							duration: 3000
						});
					});
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
			wechat(){
				uni.navigateTo({
					url:'/uni_modules/uni-id-pages/pages/login/login-withoutpwd'
				})
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: linear-gradient(50deg, #4b6cb7, #aaaaff);
		padding: 20px;
	}

	.login-content {
		position: relative;
		width: 100%;
		max-width: 400px;
		background: rgba(255, 255, 255, 0.95);
		border-radius: 20px;
		padding: 40px 30px;
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
		animation: fadeIn 0.8s ease-in-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.login-logo {
		text-align: center;
		margin-bottom: 30px;
	}

	.logo-image {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin: 0 auto;
	}

	.form-container {
		.input-box {
			margin-bottom: 25px;
			border-radius: 12px;
			transition: all 0.3s ease;

			&:focus {
				box-shadow: 0 0 10px rgba(63, 81, 181, 0.3);

			}

			::v-deep .uni-easyinput__content-input {
				font-size: 16px;

				&::placeholder {
					font-size: 16px; // 设置占位符字体大小
				}
			}
		}

		.username-input,
		.password-input {
			--input-text-color: #333;
			--input-placeholder-color: #999;
			--input-border-color: #eee;
			--input-hover-border-color: #666;
		}
	}

	.login-button {
		width: 100%;
		height: 50px;
		margin-top: 25px;
		border-radius: 12px;
		background: linear-gradient(50deg, #4b6cb7, #aaaaff);
		color: white;
		font-weight: bold;
		transition: all 0.3s ease;

		&:hover {
			opacity: 0.9;
			transform: translateY(-2px);
		}

		&:active {
			transform: translateY(2px);
			opacity: 0.8;
		}
	}

	.link-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 25px;
		padding-top: 25px;
		border-top: 1px solid #eee;

		.link-text {
			color: #666;
			font-size: 14px;
			cursor: pointer;
			transition: all 0.3s ease;

			&:hover {
				color: #4b6cb7;
				text-decoration: underline;
			}
		}

		.retrieve-pwd {
			margin-right: 20px;
		}
	}
</style>