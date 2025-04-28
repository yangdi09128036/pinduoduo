<template>
  <view class="container">
    <!-- 固定头部搜索框 -->
    <view class="fixed-head">
      <view class="search-container">
        <image class="search-icon" src="/static/left.png" mode="aspectFit" @click="navBack" />
        <view class="search-box" @click="focusSearch">
          <input
            class="search-input"
            type="text"
            :placeholder="searchPlaceholder"
            v-model="searchKeyword"
            @keyup.enter="handleSearch"
          />
          <image class="search-icon" src="/static/camera.png" mode="aspectFit" />
        </view>
        <image class="search-icon" src="/static/search.png" mode="aspectFit" @click="handleSearch" />
      </view>
    </view>

    <!-- 滚动内容区域 -->
    <scroll-view scroll-y class="scroll-container">
      <!-- 最近搜索区域 -->
      <view class="recent-search" v-if="recentSearches.length > 0">
        <text class="section-title">最近搜索</text>
        <view class="tag-container">
          <view
            class="tag-item"
            v-for="(tag, index) in recentSearches"
            :key="index"
            @click="navigateToSearchWithTag(tag)"
          >
            {{ tag }}
          </view>
        </view>
      </view>

      <!-- 搜索发现区域 -->
      <view class="search-discovery">
        <text class="section-title">搜索发现</text>
        <view class="tag-container">
          <view
            class="tag-item"
            v-for="(tag, index) in searchSuggestions"
            :key="index"
            @click="navigateToSearchWithTag(tag)"
          >
            {{ tag }}
          </view>
        </view>
      </view>

      <!-- 内容区域 -->
      <view class="content">
        <view class="tab-content">
          <view v-for="(item, index) in randomGoods" :key="index" class="content-item">
            <view class="product-card" @click="navigateToProduct(item)">
              <image class="item-image" :src="item.goods_thumb?.fileID" mode="aspectFit" />
              <view class="product-info">
                <text class="item-title">{{ item.name }}</text>
                <view class="service-tags">
                  <text class="tag pay-later">先用后付</text>
                  <text class="tag quick-refund">极速退款</text>
                </view>
                <view class="price-row">
                  <text class="price">¥{{ item.price }}</text>
                  <text class="sales">全店已拼{{ item.total_sell_count }}+件</text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view v-if="randomGoods.length === 0" class="loading">加载中...</view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchPlaceholder: '请输入商品信息',
      allGoods: [],
      randomGoods: [],
      searchKeyword: '', // 用于绑定搜索框输入内容
      recentSearches: [], // 最近搜索记录
      searchSuggestions: [], // 搜索发现的关键词
    };
  },
  onLoad() {
    this.getGoods();
    this.loadRecentSearches(); // 加载本地存储的最近搜索记录
  },
  methods: {
    async getGoods() {
      try {
        const { result: { data } } = await uniCloud.database().collection('mall-goods').get();
        this.allGoods = data || [];
        this.randomGoods = this.getRandomGoods(16); // 随机获取16条数据
        if (this.allGoods.length > 0) {
          this.searchPlaceholder = this.allGoods[Math.floor(Math.random() * this.allGoods.length)]
            .keywords || '请输入商品信息';
        }
        this.generateSearchSuggestions(); // 生成搜索发现的关键词
      } catch (err) {
        console.error('获取商品数据失败:', err);
      }
    },
    getRandomGoods(count) {
      const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
      return shuffledGoods.slice(0, count);
    },
    generateSearchSuggestions() {
      const allKeywords = this.allGoods.flatMap(item => item.keywords.split(','));
      const uniqueKeywords = [...new Set(allKeywords)];
      this.searchSuggestions = uniqueKeywords.slice(0, 16); // 取前16个关键词
    },
    navBack() {
      uni.switchTab({
        url: '/pages/index/index'
      });
    },
    focusSearch() {
      this.searchKeyword = '';
    },
    handleSearch() {
      const keyword = this.searchKeyword.trim();
      if (!keyword) {
        uni.showToast({
          title: '请输入搜索关键词',
          icon: 'none'
        });
        return;
      }
      this.addRecentSearch(keyword); // 添加到最近搜索记录
      this.navigateToSearch(keyword);
    },
    navigateToSearchWithTag(keyword) {
      this.addRecentSearch(keyword); // 添加到最近搜索记录
      this.navigateToSearch(keyword);
    },
    addRecentSearch(keyword) {
      if (!this.recentSearches.includes(keyword)) {
        this.recentSearches.unshift(keyword); // 添加到最近搜索记录的开头
        if (this.recentSearches.length > 10) {
          this.recentSearches.pop(); // 限制最多保存10条记录
        }
        uni.setStorageSync('recentSearches', this.recentSearches); // 保存到本地存储
      }
    },
    navigateToSearch(keyword) {
      uni.navigateTo({
        url: `/pages/search/mall-list?keyword=${encodeURIComponent(keyword)}`
      });
    },
    loadRecentSearches() {
      const savedSearches = uni.getStorageSync('recentSearches') || [];
      this.recentSearches = [...savedSearches];
    },
    navigateToProduct(item) {
      if (!item) return;

      // 存储商品信息到本地存储
      uni.setStorage({
        key: 'currentProduct',
        data: item,
        success: () => {
          console.log('商品信息存储成功', item);
        }
      });

      // 跳转到商品详情页面
      uni.navigateTo({
        url: '../search/mall-details'
      });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
}

.fixed-head {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  padding-top: 80rpx;
  padding-bottom: 20rpx;
}

.search-box {
  background-color: #ededed;
  flex: 1;
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-radius: 20px;
}

.search-icon {
  width: 50rpx;
  height: 50rpx;
}

.search-input {
  color: #8d94a1;
  font-size: 35rpx;
  flex: 1;
  text-align: center;
}

.scroll-container {
  flex: 1;
  margin-top: 180rpx; /* Adjusted to account for the fixed header */
}

.recent-search,
.search-discovery {
  padding: 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
}

.tag-item {
  background-color: #f5f5f5;
  padding: 12rpx 24rpx;
  margin: 10rpx;
  font-size: 28rpx;
  color: #666;
  border-radius: 30rpx;
}

.content {
  padding: 20rpx;
}

.tab-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.content-item {
  width: 48%;
  margin-bottom: 20rpx;
}

.product-card {
  background: #f9f9f9;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.product-info {
  padding: 10rpx;
}

.item-image {
  width: 100%;
  height: 340rpx;
  object-fit: cover;
}

.item-title {
  font-size: 28rpx;
  color: #000;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.service-tags {
  margin: 10rpx 0;
}

.tag {
  font-size: 24rpx;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
  margin-right: 10rpx;
  display: inline-block;
}

.pay-later {
  color: #00aa00;
  background: rgba(76, 175, 80, 0.2);
  border-radius: 10rpx;
}

.quick-refund {
  color: #666;
  background: #f5f5f5;
  border-radius: 10rpx;
}

.price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10rpx;
}

.price {
  font-size: 30rpx;
  color: #ff0000;
  font-weight: bold;
}

.sales {
  font-size: 24rpx;
  color: #999;
}

.loading {
  text-align: center;
  color: #999;
  margin-top: 40rpx;
}
</style>

