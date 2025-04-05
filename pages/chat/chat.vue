<template>
	<view class="container">
		<!-- 历史记录侧边栏 -->
		<view class="history-sidebar" :class="{ 'show-sidebar': showHistory }">
			<view class="history-content">
				<view class="history-section" v-for="(section, sectionIndex) in chatHistory" :key="sectionIndex">
					<view class="history-date">{{ section.title }}</view>
					<view class="history-item" v-for="(item, itemIndex) in section.items" :key="itemIndex"
						@tap="loadChatHistory(item)">
						{{ item.question }}
					</view>
				</view>
			</view>
			<view class="user-info">
				<image class="user-avatar"
					:src="userInfo.avatar_file && userInfo.avatar_file.url ? userInfo.avatar_file.url : '/static/default-avatar.png'"
					mode="aspectFill">
				</image>
				<text class="user-phone">{{ userInfo.mobile || '173****7441' }}</text>
			</view>
		</view>

		<!-- 主内容区域 -->
		<view class="main-content" :class="{ 'shift-content': showHistory }">
			<!-- 顶部栏 -->
			<view class="header">
				<image src="/static/more.png" mode="aspectFit" class="menu-button" @tap="toggleHistory"></image>
				<image src="/static/launch.png" mode="aspectFit" class="new-chat-button" @tap="startNewChat"></image>
				<text class="header-title">{{ headerTitle }}</text>
				<image :src="currentVoiceRole" mode="aspectFit" class="voice-role-button" @tap="toggleVoiceRole"></image>
				<image :src="isVoiceEnabled ? '/static/voice.png' : '/static/voice-ed.png'" mode="aspectFit" class="voice-button" @tap="toggleVoice"></image>
			</view>

			<!-- 聊天内容区域 -->
			<scroll-view class="chat-content" scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true">
				<view v-if="messages.length === 0" class="welcome-screen">
					<image class="welcome-logo" src="/static/kimi.jpg" mode="aspectFit"></image>
					<view class="welcome-title">嗨！我是 Kimi</view>
					<view class="welcome-subtitle">
						我可以帮你搜索、答疑、写作，请把你的任务交给我吧~
					</view>
				</view>
				<view v-else class="messages-container">
					<view v-for="(message, index) in messages" :key="index" class="message-wrapper"
						:class="message.role === 'user' ? 'user-message' : 'ai-message'">
						<image class="avatar"
							:src="message.role === 'user' ? (userInfo.avatar_file && userInfo.avatar_file.url ? userInfo.avatar_file.url : '/static/default-avatar.png') : '/static/kimi.jpg'"
							mode="aspectFill"></image>
						<view class="message-content">
							<text>{{message.content}}</text>
							<view v-if="message.role === 'assistant'" class="message-actions">
								<image src="/static/copy.png" mode="aspectFit" class="action-button"
									@tap="copyMessage(message.content)"></image>
								<image src="/static/refresh.png" mode="aspectFit" @tap="retryLastQuestion"
									class="action-button"></image>
								<image :src="likedMessages[index] ? '/static/thumbs-up-ed.png' : '/static/thumbs-up.png'" 
                                    mode="aspectFit" class="action-button" @tap="likeMessage(index)"></image>
                                <image :src="dislikedMessages[index] ? '/static/thumbs-down-ed.png' : '/static/thumbs-down.png'" 
                                    mode="aspectFit" class="action-button" @tap="dislikeMessage(index)"></image>
                                <!-- 修改：语音播放控制按钮 -->
                                <image :src="pausedMessages[index] ? '/static/time-out.png' : '/static/play.png'" 
                                    mode="aspectFit" class="action-button" @tap="toggleSpeech(message.content, index)"></image>
							</view>
						</view>
					</view>
				</view>
				<view v-if="showFeedback" class="feedback-toast">
                    {{ feedbackMessage }}
                </view>
			</scroll-view>

			<!-- 底部输入区域 -->
			<view class="input-section">
				<view class="input-wrapper">
					<input type="text" v-model="userInput" placeholder="给 Kimi 发送消息" confirm-type="send"
						class="input-field" @confirm="sendMessage" />
					<button class="send-button" :class="{ 'send-button-active': userInput.trim() }" @tap="sendMessage">
						发送
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		store
	} from '@/uni_modules/uni-id-pages/common/store.js';
	

	export default {
		data() {
			return {
				userInput: '',
				messages: [],
				scrollTop: 0,
				apiKey: 'sk-22CtNLy8oqB9Kg0scqkWmpSCfd3LnT2NsxxocO2rQC5s8Qc6', // 替换为你的Kimi API Key
				apiUrl: 'https://api.moonshot.cn/v1/chat/completions',
				showHistory: false,
				userInfo: {},
				lastQuestion: '',
				chatHistory: [ {
						title: '今天',
						items: []
					},
					{
						title: '昨天',
						items: []
					},
					{
						title: '7天内',
						items: []
					},
					{
						title: '30天内',
						items: []
					}
				],
				headerTitle: '新对话',
				likedMessages: {},
				dislikedMessages: {},
				feedbackMessage: '',
				showFeedback: false,
				isVoiceEnabled: true, // 是否开启语音播放
				voiceUrl: '', // 语音播放路径
				isMaleVoice: true, // 默认为男声
				voiceRoleId: 1, // 默认为男声ID
				isSpeaking: false, // 是否正在播放语音
				currentSpeakingIndex: -1, // 当前正在播放的消息索引
				audioContext: null, // 音频上下文
				pausedMessages: {}, // 记录哪些消息处于暂停状态
				audioCache: {} // 缓存已合成的语音，避免重复请求
			};
		},
		computed: {
			currentVoiceRole() {
				return this.isMaleVoice ? '/static/role-boy.png' : '/static/role-girl.png';
			}
		},
		mounted() {
			this.getUserInfo();
			this.loadChatHistoryFromStorage();
		},
		methods: {
			getUserInfo() {
				if (store.hasLogin) {
					this.userInfo = store.userInfo;
					console.log(this.userInfo);
				}
			},
			toggleHistory() {
				this.showHistory = !this.showHistory;
			},
			copyMessage(content) {
				uni.setClipboardData({
					data: content,
					success: () => {
						uni.showToast({
							title: '复制成功',
							icon: 'success'
						});
					}
				});
			},
			loadChatHistoryFromStorage() {
				const history = uni.getStorageSync('chatHistory');
				if (history) {
					this.chatHistory = JSON.parse(history);
				}
			},
			saveChatHistoryToStorage() {
				uni.setStorageSync('chatHistory', JSON.stringify(this.chatHistory));
			},
			addToHistory(question, answer) {
				const today = new Date();
				const item = {
					question,
					answer,
					timestamp: today.getTime(),
					messages: [...this.messages]
				};

				// Add to today's history
				this.chatHistory[0].items.unshift(item);
				this.saveChatHistoryToStorage();
			},
			loadChatHistory(item) {
				this.messages = [...item.messages];
				this.showHistory = false;
				this.scrollToBottom();
			},
			async sendMessage() {
				if (!this.userInput.trim()) return;

				this.lastQuestion = this.userInput;
				this.headerTitle = this.userInput;

				const userMessage = {
					role: 'user',
					content: this.userInput
				};
				this.messages.push(userMessage);
				console.log('Messages after adding user message:', this.messages);

				const userQuestion = this.userInput;
				this.userInput = '';

				const aiMessage = {
					role: 'assistant',
					content: '思考中...'
				};
				this.messages.push(aiMessage);

				this.$nextTick(() => {
					this.scrollToBottom();
				});

				try {
					const response = await uni.request({
						url: this.apiUrl,
						method: 'POST',
						header: {
							Authorization: this.apiKey,
							'Content-Type': 'application/json'
						},
						data: {
							model: 'moonshot-v1-8k',
							messages: [
								{ role: 'user', content: userQuestion }
							]
						}
					});

					if (response.statusCode === 200) {
						const answer = response.data.choices[0].message.content;
						console.log("回答的内容:",response.data);
						this.messages[this.messages.length - 1].content = answer;
						this.addToHistory(userQuestion, answer);

						// 语音播放
						if (this.isVoiceEnabled) {
							this.playVoice(answer);
						}
					} else {
						this.messages[this.messages.length - 1].content = `请求失败，状态码: ${response.statusCode}`;
					}
				} catch (error) {
					console.error('请求失败:', error);
					this.messages[this.messages.length - 1].content = '请求失败，请稍后重试';
				}

				this.$nextTick(() => {
					this.scrollToBottom();
				});
			},
			scrollToBottom() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.chat-content').boundingClientRect(data => {
					if (data) {
						this.scrollTop = data.height * 1000000;
					}
				}).exec();
			},
			startNewChat() {
				this.messages = [];
				this.lastQuestion = '';
				this.scrollTop = 0;
				this.headerTitle = '新对话';
			},
			retryLastQuestion() {
				// 重新发送最后一个问题
				if (this.lastQuestion.trim()) {
					this.userInput = this.lastQuestion;
					this.sendMessage();
				} else {
					console.warn('没有可重试的问题');
				}
			},
			formatMarkdown(content) {
				const md = new MarkdownIt();
				return md.render(content);
			},
			likeMessage(index) {
                // 如果已经点赞，则取消点赞
                if (this.likedMessages[index]) {
                    this.$set(this.likedMessages, index, false);
                    return;
                }
                
                // 如果已经差评，则取消差评
                if (this.dislikedMessages[index]) {
                    this.$set(this.dislikedMessages, index, false);
                }
                
                // 设置点赞
                this.$set(this.likedMessages, index, true);
                this.feedbackMessage = "感谢您的反馈，我会努力做得更好！";
                this.showFeedback = true;
                
                // 3秒后隐藏反馈提示
                setTimeout(() => {
                    this.showFeedback = false;
                }, 3000);
            },

            dislikeMessage(index) {
                // 如果已经差评，则取消差评
                if (this.dislikedMessages[index]) {
                    this.$set(this.dislikedMessages, index, false);
                    return;
                }
                
                // 如果已经点赞，则取消点赞
                if (this.likedMessages[index]) {
                    this.$set(this.likedMessages, index, false);
                }
                
                // 设置差评
                this.$set(this.dislikedMessages, index, true);
                this.feedbackMessage = "感谢您的反馈，我会努力改正！";
                this.showFeedback = true;
                
                // 3秒后隐藏反馈提示
                setTimeout(() => {
                    this.showFeedback = false;
                }, 3000);
            },
			toggleVoice() {
				this.isVoiceEnabled = !this.isVoiceEnabled;
			},
			toggleVoiceRole() {
				this.isMaleVoice = !this.isMaleVoice;
				this.voiceRoleId = this.isMaleVoice ? 1 : 3;
				
				// 显示切换提示
				this.feedbackMessage = this.isMaleVoice ? "已切换为男声" : "已切换为女声";
				this.showFeedback = true;
				
				// 3秒后隐藏提示
				setTimeout(() => {
					this.showFeedback = false;
				}, 1500);
			},
			// 暂停当前正在播放的音频
			pauseCurrentAudio() {
				if (this.isSpeaking && this.audioContext && this.currentSpeakingIndex !== -1) {
					// 保存当前正在播放的索引
					const previousIndex = this.currentSpeakingIndex;
					
					// 暂停音频
					this.audioContext.pause();
					
					// 更新UI状态
					this.$set(this.pausedMessages, previousIndex, true);
					
					// 显示提示
					this.feedbackMessage = "已暂停之前的音频";
					this.showFeedback = true;
					setTimeout(() => {
						this.showFeedback = false;
					}, 1500);
					
					return true;
				}
				return false;
			},
			async playVoice(answer) {
				// 先暂停当前正在播放的音频
				this.pauseCurrentAudio();
				
				const voiceApiUrl = `https://xiaoapi.cn/API/zs_tts.php?type=baidu&msg=${encodeURIComponent(answer)}&id=${this.voiceRoleId}`;
				console.log('语音合成接口URL:', voiceApiUrl); // 添加日志输出
				try {
					const response = await uni.request({
						url: voiceApiUrl,
						method: 'GET'
					});
					console.log(response.data);
					if (response.statusCode === 200 && response.data.code === 200) {
						this.voiceUrl = response.data.tts;
						
						// 缓存语音URL
						const messageIndex = this.messages.length - 1;
						this.audioCache[messageIndex] = this.voiceUrl;
						
						// 创建新的音频上下文
						if (this.audioContext) {
							this.audioContext.destroy();
						}
						
						this.audioContext = uni.createInnerAudioContext();
						this.audioContext.src = this.voiceUrl;
						this.audioContext.play();
						
						// 设置当前正在播放的消息索引为最后一条消息
						this.currentSpeakingIndex = messageIndex;
						this.isSpeaking = true;
						// 初始化为播放状态（显示播放图标）
						this.$set(this.pausedMessages, messageIndex, false);
						
						// 监听播放结束事件
						this.audioContext.onEnded(() => {
							this.isSpeaking = false;
							// 播放结束后，设置为暂停状态（显示暂停图标）
							this.$set(this.pausedMessages, this.currentSpeakingIndex, true);
							this.currentSpeakingIndex = -1;
						});
					} else {
						console.error('语音合成失败:', response);
					}
				} catch (error) {
					console.error('语音合成请求失败:', error);
				}
			},
			// 修改：控制语音播放/暂停的方法
			toggleSpeech(content, index) {
				// 如果当前没有正在播放的音频，或者播放的不是这条消息
				if (!this.isSpeaking || this.currentSpeakingIndex !== index) {
					// 如果有其他消息正在播放，先暂停
					this.pauseCurrentAudio();
					
					// 开始播放当前消息
					this.synthesizeAndPlaySpeech(content, index);
				} else {
					// 如果当前正在播放这条消息
					if (this.audioContext) {
						// 检查是否已暂停
						if (!this.pausedMessages[index]) {
							// 当前是播放状态，需要暂停
							this.audioContext.pause();
							this.$set(this.pausedMessages, index, true);
							this.feedbackMessage = "已暂停播放";
						} else {
							// 当前是暂停状态，需要继续播放
							this.audioContext.play();
							this.$set(this.pausedMessages, index, false);
							this.feedbackMessage = "继续播放";
						}
						
						this.showFeedback = true;
						setTimeout(() => {
							this.showFeedback = false;
						}, 1500);
					}
				}
			},
			// 修改：合成并播放语音
			async synthesizeAndPlaySpeech(content, index) {
				// 检查是否已经缓存了该消息的语音
				if (this.audioCache[index]) {
					// 如果已缓存，直接使用缓存的URL
					this.playFromCache(index);
					return;
				}
				
				const voiceApiUrl = `https://xiaoapi.cn/API/zs_tts.php?type=baidu&msg=${encodeURIComponent(content)}&id=${this.voiceRoleId}`;
				try {
					const response = await uni.request({
						url: voiceApiUrl,
						method: 'GET'
					});
					
					if (response.statusCode === 200 && response.data.code === 200) {
						this.voiceUrl = response.data.tts;
						
						// 缓存语音URL
						this.audioCache[index] = this.voiceUrl;
						
						// 创建新的音频上下文
						if (this.audioContext) {
							this.audioContext.destroy();
						}
						
						this.audioContext = uni.createInnerAudioContext();
						this.audioContext.src = this.voiceUrl;
						this.audioContext.play();
						
						// 设置状态
						this.isSpeaking = true;
						this.currentSpeakingIndex = index;
						this.$set(this.pausedMessages, index, false); // 初始为播放状态（显示播放图标）
						
						// 监听播放结束事件
						this.audioContext.onEnded(() => {
							this.isSpeaking = false;
							// 播放结束后，设置为暂停状态（显示暂停图标）
							this.$set(this.pausedMessages, index, true);
							this.currentSpeakingIndex = -1;
							
							// 显示提示
							this.feedbackMessage = "播放完成";
							this.showFeedback = true;
							setTimeout(() => {
								this.showFeedback = false;
							}, 1500);
						});
						
						// 显示提示
						this.feedbackMessage = "正在播放语音";
						this.showFeedback = true;
						setTimeout(() => {
							this.showFeedback = false;
						}, 1500);
					} else {
						console.error('语音合成失败:', response);
						this.feedbackMessage = "语音合成失败";
						this.showFeedback = true;
						setTimeout(() => {
							this.showFeedback = false;
						}, 1500);
					}
				} catch (error) {
					console.error('语音合成请求失败:', error);
					this.feedbackMessage = "语音合成请求失败";
					this.showFeedback = true;
					setTimeout(() => {
						this.showFeedback = false;
					}, 1500);
				}
			},
			// 新增：从缓存播放语音
			playFromCache(index) {
				// 创建新的音频上下文
				if (this.audioContext) {
					this.audioContext.destroy();
				}
				
				this.audioContext = uni.createInnerAudioContext();
				this.audioContext.src = this.audioCache[index];
				this.audioContext.play();
				
				// 设置状态
				this.isSpeaking = true;
				this.currentSpeakingIndex = index;
				this.$set(this.pausedMessages, index, false); // 初始为播放状态（显示播放图标）
				
				// 监听播放结束事件
				this.audioContext.onEnded(() => {
					this.isSpeaking = false;
					// 播放结束后，设置为暂停状态（显示暂停图标）
					this.$set(this.pausedMessages, index, true);
					this.currentSpeakingIndex = -1;
					
					// 显示提示
					this.feedbackMessage = "播放完成";
					this.showFeedback = true;
					setTimeout(() => {
						this.showFeedback = false;
					}, 1500);
				});
				
				// 显示提示
				this.feedbackMessage = "正在播放语音";
				this.showFeedback = true;
				setTimeout(() => {
					this.showFeedback = false;
				}, 1500);
			}
		}
	};
</script>

<style>
	.container {
		width: 100%;
		height: 100vh;
		background: #fff;
		display: flex;
		flex-direction: column;
	}

	/* 历史记录侧边栏 */
	.history-sidebar {
		position: fixed;
		top: 0;
		left: -100vw; /* 修改为vw单位 */
		width: 80vw; /* 修改为vw单位 */
		height: 100vh;
		background: #fff;
		z-index: 1000;
		transition: left 0.3s ease;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.show-sidebar {
		left: 0;
	}

	.history-content {
		height: calc(100% - 135rpx);
		overflow-y: auto;
		padding: 20rpx;
	}

	.history-date {
		font-size: 24rpx;
		color: #999;
		padding: 20rpx 0;
	}

	.history-item {
		font-size: 28rpx;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #eee;
	}

	.user-info {
		height: 100rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		border-top: 1rpx solid #eee;
	}

	.user-avatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.user-phone {
		font-size: 28rpx;
		color: #333;
	}

	/* 主内容区域 */
	.main-content {
		height: 100vh;
		display: flex;
		flex-direction: column;
		transition: transform 0.3s ease;
		width: 100%;
		position: relative;
	}

	.shift-content {
		transform: translateX(85vw); /* 修改为vw单位，与侧边栏宽度保持一致 */
	}

	/* 顶部栏 */
	.header {
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		border-bottom: 1rpx solid #eee;
		position: sticky; /* 修改为sticky */
		top: 50rpx;
		left: 0;
		right: 0;
		background: #fff;
		z-index: 10;
	}

	.menu-button,
	.new-chat-button,
	.voice-button,
	.voice-role-button {
		width: 50rpx;
		height: 50rpx;
		padding: 0;
		margin: 0;
		background: none;
	}

	.menu-button image,
	.new-chat-button image,
	.voice-button image,
	.voice-role-button image {
		width: 50rpx;
		height: 50rpx;
	}

	.header-title {
		font-size: 32rpx;
		font-weight: 500;
		max-width: 60%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* 欢迎页面 */
	.welcome-screen {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 60rpx;
	}

	.welcome-logo {
		width: 160rpx;
		height: 160rpx;
		margin-bottom: 40rpx;
		border-radius: 20px;
	}

	.welcome-title {
		font-size: 40rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.welcome-subtitle {
		font-size: 28rpx;
		color: #666;
		text-align: center;
		line-height: 1.5;
	}

	/* 聊天内容区域 */
	.chat-content {
		flex: 1;
		overflow-y: auto;
		padding-top: 50rpx;
		padding-bottom: 30rpx; /* 调整为与input-section高度匹配 */
		height: calc(100vh - 88rpx - 120rpx); /* 计算高度: 视口高度 - 头部高度 - 底部输入区高度 */
	}

	.messages-container {
		padding: 20rpx;
	}

	.message-wrapper {
		margin-bottom: 30rpx;
		display: flex;
		align-items: flex-start;
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.message-content {
		max-width: calc(90% - 100rpx);
		padding: 20rpx;
		border-radius: 12rpx;
		font-size: 28rpx;
		line-height: 1.5;
	}

	.user-message {
		flex-direction: row-reverse;
	}

	.user-message .avatar {
		margin-right: 0;
		margin-left: 20rpx;
	}

	.user-message .message-content {
		background: #e6f7ff;
		color: #333;
	}

	.ai-message .message-content {
		background: #f5f5f5;
		color: #333;
	}

	.message-actions {
		display: flex;
		gap: 20rpx;
		margin-top: 16rpx;
	}

	.action-button {
		padding: 0;
		margin: 0;
		background: none;
		width: 40rpx;
		height: 40rpx;
	}

	.action-button image {
		width: 32rpx;
		height: 32rpx;
		opacity: 0.6;
	}

	/* 底部输入区域 */
	.input-section {
		padding: 20rpx;
		border-top: 1rpx solid #eee;
		position: sticky; /* 修改为sticky */
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		z-index: 10;
	}

	.input-wrapper {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}

	.input-field {
		flex: 1;
		height: 80rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
		background: #f5f5f5;
		border-radius: 40rpx;
	}

	.send-button {
		width: 120rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #4e7cff;
		color: #fff;
		border-radius: 40rpx;
		font-size: 28rpx;
		padding: 0;
	}

	.send-button-active {
		background: #4e7cff;
		color: #fff;
	}
	
	.feedback-toast {
		position: fixed;
		bottom: 500rpx; /* 调整位置，避免与输入区重叠 */
		left: 50%;
		transform: translateX(-50%);
		background: rgba(0, 0, 0, 0.7);
		color: #fff;
		padding: 20rpx 30rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		z-index: 1001;
	}
</style>