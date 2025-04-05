<template>
    <view class="login-container">
        <view class="login-content">
            <view class="login-logo">
                <image src="/static/logo.png"  mode="widthFix" class="logo-image"></image>
            </view>
            <uni-forms class="form-container" ref="form" :value="formData" :rules="rules" validate-trigger="submit"
                err-show-type="toast">
                <uni-forms-item name="username" required>
                    <uni-easyinput 
                        :focus="focusUsername" 
                        @blur="focusUsername = false" 
                        class="input-box username-input"
                        :inputBorder="false" 
                        placeholder="请输入用户名" 
                        v-model="formData.username"  
                        trim="both" 
                    />
                </uni-forms-item>
                <uni-forms-item name="password" required>
                    <uni-easyinput 
                        :focus="focusPassword" 
                        @blur="focusPassword = false" 
                        class="input-box password-input"
                        maxlength="20"
                        :placeholder="'请输入' + (config.passwordStrength  == 'weak'?'6':'8') + '-16位密码'" 
                        type="password" 
                        v-model="formData.password"  
                        trim="both" 
                    />
                </uni-forms-item>
                <uni-forms-item name="password2" required>
                    <uni-easyinput 
                        :focus="focusPassword2" 
                        @blur="focusPassword2 = false" 
                        class="input-box password-input"
                        maxlength="20" 
                        placeholder="再次输入密码" 
                        type="password" 
                        v-model="formData.password2"  
                        trim="both" 
                    />
                </uni-forms-item>
                <button class="login-button" type="primary" @click="submit">注册</button>
                <button class="register-back" @click="navigateBack">返回</button>
            </uni-forms>
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
		onReady() {
			this.$refs.form.setRules(this.rules)
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
				this.$refs.form.validate().then((res) => {
					if (this.needAgreements && !this.agree) {
						return this.$refs.agreements.popup(() => {
							this.submitForm(res)
						})
					}
					this.submitForm(res)
				}).catch((errors) => {
					let key = errors[0].key
					key = key.replace(key[0], key[0].toUpperCase())
					this['focus' + key] = true
				})
			},
			submitForm(params) {
			    uniIdCo.registerUser(this.formData).then(e => {
			        this.loginSuccess(e);
			        uni.showToast({
			            title: '注册成功',
			            icon: 'success',
			            duration: 2000
			        });
			        setTimeout(() => {
			            uni.redirectTo({
			                url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
			            });
			        }, 2000);
			    }).catch((e) => {
			        console.error('注册失败：', e); // 输出错误到控制台
			
			        let errorMessage = '注册失败，请重试';
			        if (e.msg) {
			            errorMessage = e.msg; // 使用后端返回的错误信息
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
    width: 80px;
    height: 80px;
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
    }
 
    .username-input, .password-input {
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
 
.register-back {
    width: 100%;
    height: 50px;
    margin-top: 15px;
    border-radius: 12px;
    background: #f5f5f5;
    color: #666;
    font-weight: bold;
    transition: all 0.3s ease;
 
    &:hover {
        background: #e8e8e8;
    }
 
    &:active {
        background: #dcdcdc;
    }
}
</style>