"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      userInput: "",
      messages: [],
      scrollTop: 0,
      apiKey: "sk-22CtNLy8oqB9Kg0scqkWmpSCfd3LnT2NsxxocO2rQC5s8Qc6",
      // 替换为你的Kimi API Key
      apiUrl: "https://api.moonshot.cn/v1/chat/completions",
      showHistory: false,
      userInfo: {},
      lastQuestion: "",
      chatHistory: [
        {
          title: "今天",
          items: []
        },
        {
          title: "昨天",
          items: []
        },
        {
          title: "7天内",
          items: []
        },
        {
          title: "30天内",
          items: []
        }
      ],
      headerTitle: "新对话",
      likedMessages: {},
      dislikedMessages: {},
      feedbackMessage: "",
      showFeedback: false,
      isVoiceEnabled: true,
      // 是否开启语音播放
      voiceUrl: "",
      // 语音播放路径
      isMaleVoice: true,
      // 默认为男声
      voiceRoleId: 1,
      // 默认为男声ID
      isSpeaking: false,
      // 是否正在播放语音
      currentSpeakingIndex: -1,
      // 当前正在播放的消息索引
      audioContext: null,
      // 音频上下文
      pausedMessages: {},
      // 记录哪些消息处于暂停状态
      audioCache: {}
      // 缓存已合成的语音，避免重复请求
    };
  },
  computed: {
    currentVoiceRole() {
      return this.isMaleVoice ? "/static/role-boy.png" : "/static/role-girl.png";
    }
  },
  mounted() {
    this.getUserInfo();
    this.loadChatHistoryFromStorage();
  },
  methods: {
    getUserInfo() {
      if (uni_modules_uniIdPages_common_store.store.hasLogin) {
        this.userInfo = uni_modules_uniIdPages_common_store.store.userInfo;
        common_vendor.index.__f__("log", "at pages/chat/chat.vue:149", this.userInfo);
      }
    },
    toggleHistory() {
      this.showHistory = !this.showHistory;
    },
    copyMessage(content) {
      common_vendor.index.setClipboardData({
        data: content,
        success: () => {
          common_vendor.index.showToast({
            title: "复制成功",
            icon: "success"
          });
        }
      });
    },
    loadChatHistoryFromStorage() {
      const history = common_vendor.index.getStorageSync("chatHistory");
      if (history) {
        this.chatHistory = JSON.parse(history);
      }
    },
    saveChatHistoryToStorage() {
      common_vendor.index.setStorageSync("chatHistory", JSON.stringify(this.chatHistory));
    },
    addToHistory(question, answer) {
      const today = /* @__PURE__ */ new Date();
      const item = {
        question,
        answer,
        timestamp: today.getTime(),
        messages: [...this.messages]
      };
      this.chatHistory[0].items.unshift(item);
      this.saveChatHistoryToStorage();
    },
    loadChatHistory(item) {
      this.messages = [...item.messages];
      this.showHistory = false;
      this.scrollToBottom();
    },
    async sendMessage() {
      if (!this.userInput.trim())
        return;
      this.lastQuestion = this.userInput;
      this.headerTitle = this.userInput;
      const userMessage = {
        role: "user",
        content: this.userInput
      };
      this.messages.push(userMessage);
      common_vendor.index.__f__("log", "at pages/chat/chat.vue:204", "Messages after adding user message:", this.messages);
      const userQuestion = this.userInput;
      this.userInput = "";
      const aiMessage = {
        role: "assistant",
        content: "思考中..."
      };
      this.messages.push(aiMessage);
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      try {
        const response = await common_vendor.index.request({
          url: this.apiUrl,
          method: "POST",
          header: {
            Authorization: this.apiKey,
            "Content-Type": "application/json"
          },
          data: {
            model: "moonshot-v1-8k",
            messages: [
              { role: "user", content: userQuestion }
            ]
          }
        });
        if (response.statusCode === 200) {
          const answer = response.data.choices[0].message.content;
          common_vendor.index.__f__("log", "at pages/chat/chat.vue:237", "回答的内容:", response.data);
          this.messages[this.messages.length - 1].content = answer;
          this.addToHistory(userQuestion, answer);
          if (this.isVoiceEnabled) {
            this.playVoice(answer);
          }
        } else {
          this.messages[this.messages.length - 1].content = `请求失败，状态码: ${response.statusCode}`;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/chat/chat.vue:249", "请求失败:", error);
        this.messages[this.messages.length - 1].content = "请求失败，请稍后重试";
      }
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    scrollToBottom() {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".chat-content").boundingClientRect((data) => {
        if (data) {
          this.scrollTop = data.height * 1e6;
        }
      }).exec();
    },
    startNewChat() {
      this.messages = [];
      this.lastQuestion = "";
      this.scrollTop = 0;
      this.headerTitle = "新对话";
    },
    retryLastQuestion() {
      if (this.lastQuestion.trim()) {
        this.userInput = this.lastQuestion;
        this.sendMessage();
      } else {
        common_vendor.index.__f__("warn", "at pages/chat/chat.vue:277", "没有可重试的问题");
      }
    },
    formatMarkdown(content) {
      const md = new MarkdownIt();
      return md.render(content);
    },
    likeMessage(index) {
      if (this.likedMessages[index]) {
        this.$set(this.likedMessages, index, false);
        return;
      }
      if (this.dislikedMessages[index]) {
        this.$set(this.dislikedMessages, index, false);
      }
      this.$set(this.likedMessages, index, true);
      this.feedbackMessage = "感谢您的反馈，我会努力做得更好！";
      this.showFeedback = true;
      setTimeout(() => {
        this.showFeedback = false;
      }, 3e3);
    },
    dislikeMessage(index) {
      if (this.dislikedMessages[index]) {
        this.$set(this.dislikedMessages, index, false);
        return;
      }
      if (this.likedMessages[index]) {
        this.$set(this.likedMessages, index, false);
      }
      this.$set(this.dislikedMessages, index, true);
      this.feedbackMessage = "感谢您的反馈，我会努力改正！";
      this.showFeedback = true;
      setTimeout(() => {
        this.showFeedback = false;
      }, 3e3);
    },
    toggleVoice() {
      this.isVoiceEnabled = !this.isVoiceEnabled;
    },
    toggleVoiceRole() {
      this.isMaleVoice = !this.isMaleVoice;
      this.voiceRoleId = this.isMaleVoice ? 1 : 3;
      this.feedbackMessage = this.isMaleVoice ? "已切换为男声" : "已切换为女声";
      this.showFeedback = true;
      setTimeout(() => {
        this.showFeedback = false;
      }, 1500);
    },
    // 暂停当前正在播放的音频
    pauseCurrentAudio() {
      if (this.isSpeaking && this.audioContext && this.currentSpeakingIndex !== -1) {
        const previousIndex = this.currentSpeakingIndex;
        this.audioContext.pause();
        this.$set(this.pausedMessages, previousIndex, true);
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
      this.pauseCurrentAudio();
      const voiceApiUrl = `https://xiaoapi.cn/API/zs_tts.php?type=baidu&msg=${encodeURIComponent(answer)}&id=${this.voiceRoleId}`;
      common_vendor.index.__f__("log", "at pages/chat/chat.vue:373", "语音合成接口URL:", voiceApiUrl);
      try {
        const response = await common_vendor.index.request({
          url: voiceApiUrl,
          method: "GET"
        });
        common_vendor.index.__f__("log", "at pages/chat/chat.vue:379", response.data);
        if (response.statusCode === 200 && response.data.code === 200) {
          this.voiceUrl = response.data.tts;
          const messageIndex = this.messages.length - 1;
          this.audioCache[messageIndex] = this.voiceUrl;
          if (this.audioContext) {
            this.audioContext.destroy();
          }
          this.audioContext = common_vendor.index.createInnerAudioContext();
          this.audioContext.src = this.voiceUrl;
          this.audioContext.play();
          this.currentSpeakingIndex = messageIndex;
          this.isSpeaking = true;
          this.$set(this.pausedMessages, messageIndex, false);
          this.audioContext.onEnded(() => {
            this.isSpeaking = false;
            this.$set(this.pausedMessages, this.currentSpeakingIndex, true);
            this.currentSpeakingIndex = -1;
          });
        } else {
          common_vendor.index.__f__("error", "at pages/chat/chat.vue:410", "语音合成失败:", response);
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/chat/chat.vue:413", "语音合成请求失败:", error);
      }
    },
    // 修改：控制语音播放/暂停的方法
    toggleSpeech(content, index) {
      if (!this.isSpeaking || this.currentSpeakingIndex !== index) {
        this.pauseCurrentAudio();
        this.synthesizeAndPlaySpeech(content, index);
      } else {
        if (this.audioContext) {
          if (!this.pausedMessages[index]) {
            this.audioContext.pause();
            this.$set(this.pausedMessages, index, true);
            this.feedbackMessage = "已暂停播放";
          } else {
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
      if (this.audioCache[index]) {
        this.playFromCache(index);
        return;
      }
      const voiceApiUrl = `https://xiaoapi.cn/API/zs_tts.php?type=baidu&msg=${encodeURIComponent(content)}&id=${this.voiceRoleId}`;
      try {
        const response = await common_vendor.index.request({
          url: voiceApiUrl,
          method: "GET"
        });
        if (response.statusCode === 200 && response.data.code === 200) {
          this.voiceUrl = response.data.tts;
          this.audioCache[index] = this.voiceUrl;
          if (this.audioContext) {
            this.audioContext.destroy();
          }
          this.audioContext = common_vendor.index.createInnerAudioContext();
          this.audioContext.src = this.voiceUrl;
          this.audioContext.play();
          this.isSpeaking = true;
          this.currentSpeakingIndex = index;
          this.$set(this.pausedMessages, index, false);
          this.audioContext.onEnded(() => {
            this.isSpeaking = false;
            this.$set(this.pausedMessages, index, true);
            this.currentSpeakingIndex = -1;
            this.feedbackMessage = "播放完成";
            this.showFeedback = true;
            setTimeout(() => {
              this.showFeedback = false;
            }, 1500);
          });
          this.feedbackMessage = "正在播放语音";
          this.showFeedback = true;
          setTimeout(() => {
            this.showFeedback = false;
          }, 1500);
        } else {
          common_vendor.index.__f__("error", "at pages/chat/chat.vue:506", "语音合成失败:", response);
          this.feedbackMessage = "语音合成失败";
          this.showFeedback = true;
          setTimeout(() => {
            this.showFeedback = false;
          }, 1500);
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/chat/chat.vue:514", "语音合成请求失败:", error);
        this.feedbackMessage = "语音合成请求失败";
        this.showFeedback = true;
        setTimeout(() => {
          this.showFeedback = false;
        }, 1500);
      }
    },
    // 新增：从缓存播放语音
    playFromCache(index) {
      if (this.audioContext) {
        this.audioContext.destroy();
      }
      this.audioContext = common_vendor.index.createInnerAudioContext();
      this.audioContext.src = this.audioCache[index];
      this.audioContext.play();
      this.isSpeaking = true;
      this.currentSpeakingIndex = index;
      this.$set(this.pausedMessages, index, false);
      this.audioContext.onEnded(() => {
        this.isSpeaking = false;
        this.$set(this.pausedMessages, index, true);
        this.currentSpeakingIndex = -1;
        this.feedbackMessage = "播放完成";
        this.showFeedback = true;
        setTimeout(() => {
          this.showFeedback = false;
        }, 1500);
      });
      this.feedbackMessage = "正在播放语音";
      this.showFeedback = true;
      setTimeout(() => {
        this.showFeedback = false;
      }, 1500);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.chatHistory, (section, sectionIndex, i0) => {
      return {
        a: common_vendor.t(section.title),
        b: common_vendor.f(section.items, (item, itemIndex, i1) => {
          return {
            a: common_vendor.t(item.question),
            b: itemIndex,
            c: common_vendor.o(($event) => $options.loadChatHistory(item), itemIndex)
          };
        }),
        c: sectionIndex
      };
    }),
    b: $data.userInfo.avatar_file && $data.userInfo.avatar_file.url ? $data.userInfo.avatar_file.url : "/static/default-avatar.png",
    c: common_vendor.t($data.userInfo.mobile || "173****7441"),
    d: $data.showHistory ? 1 : "",
    e: common_assets._imports_0$2,
    f: common_vendor.o((...args) => $options.toggleHistory && $options.toggleHistory(...args)),
    g: common_assets._imports_1$1,
    h: common_vendor.o((...args) => $options.startNewChat && $options.startNewChat(...args)),
    i: common_vendor.t($data.headerTitle),
    j: $options.currentVoiceRole,
    k: common_vendor.o((...args) => $options.toggleVoiceRole && $options.toggleVoiceRole(...args)),
    l: $data.isVoiceEnabled ? "/static/voice.png" : "/static/voice-ed.png",
    m: common_vendor.o((...args) => $options.toggleVoice && $options.toggleVoice(...args)),
    n: $data.messages.length === 0
  }, $data.messages.length === 0 ? {
    o: common_assets._imports_2$1
  } : {
    p: common_vendor.f($data.messages, (message, index, i0) => {
      return common_vendor.e({
        a: message.role === "user" ? $data.userInfo.avatar_file && $data.userInfo.avatar_file.url ? $data.userInfo.avatar_file.url : "/static/default-avatar.png" : "/static/kimi.jpg",
        b: common_vendor.t(message.content),
        c: message.role === "assistant"
      }, message.role === "assistant" ? {
        d: common_assets._imports_3,
        e: common_vendor.o(($event) => $options.copyMessage(message.content), index),
        f: common_assets._imports_4,
        g: common_vendor.o((...args) => $options.retryLastQuestion && $options.retryLastQuestion(...args), index),
        h: $data.likedMessages[index] ? "/static/thumbs-up-ed.png" : "/static/thumbs-up.png",
        i: common_vendor.o(($event) => $options.likeMessage(index), index),
        j: $data.dislikedMessages[index] ? "/static/thumbs-down-ed.png" : "/static/thumbs-down.png",
        k: common_vendor.o(($event) => $options.dislikeMessage(index), index),
        l: $data.pausedMessages[index] ? "/static/time-out.png" : "/static/play.png",
        m: common_vendor.o(($event) => $options.toggleSpeech(message.content, index), index)
      } : {}, {
        n: index,
        o: common_vendor.n(message.role === "user" ? "user-message" : "ai-message")
      });
    })
  }, {
    q: $data.showFeedback
  }, $data.showFeedback ? {
    r: common_vendor.t($data.feedbackMessage)
  } : {}, {
    s: $data.scrollTop,
    t: common_vendor.o((...args) => $options.sendMessage && $options.sendMessage(...args)),
    v: $data.userInput,
    w: common_vendor.o(($event) => $data.userInput = $event.detail.value),
    x: $data.userInput.trim() ? 1 : "",
    y: common_vendor.o((...args) => $options.sendMessage && $options.sendMessage(...args)),
    z: $data.showHistory ? 1 : ""
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/chat/chat.js.map
