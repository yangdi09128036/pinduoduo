<script>
	export default {
		onLaunch: function() {
			console.log('pdd应用启动'),
				this.checkLogin();
		},
		onShow: function() {
			console.log('pdd应用进入首页')
		},
		onHide: function() {
			console.log('pdd应用进入后台')
		},
		methods: {
			async checkLogin() {
			      try {
			        // 使用 uni-id-pages 提供的 checkToken 方法
			        const token = uni.getStorageSync('uni_id_token');
			        if (!token) {
			          throw new Error('无token');
			        }
			        
			        // 直接跳转首页，由页面自行检查权限
			        uni.switchTab({
			          url: '/pages/index/index'
			        });
			      } catch (e) {
			        console.log('未登录或登录已过期:', e);
			        uni.reLaunch({
			          url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
			        });
			      }
			    }
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>