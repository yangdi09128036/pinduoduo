<template>
  <view class="container">
    <!-- 固定头部搜索框 -->
    <view class="fixed-head">
      <view class="search-container">
        <image class="search-icon" src="/static/left.png" mode="aspectFit" @click="navBack" />
        <view class="search-box" @click="navigateToSearch">
          <input
            class="search-input"
            type="text"
            v-model="searchKeyword"
            :placeholder="searchPlaceholder"
          />
          <image class="search-icon" src="/static/camera.png" mode="aspectFit" />
        </view>
        <image class="search-icon" src="/static/search.png" mode="aspectFit" @click="searchGoods" />
      </view>
    </view>

    <!-- 内容区域 -->
    <scroll-view
      scroll-y
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onPullDownRefresh"
      class="scroll-container"
    >
      <view class="content">
        <view v-if="matchedGoods.length > 0" class="tab-content">
          <view v-for="(item, index) in matchedGoods" :key="index" class="content-item">
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
        <view v-else class="no-results">
          <text class="no-results-text">暂时没有相关商品，请尝试搜索其他关键字或联系管理员更新，管理员：杨迪qq：3349476867</text>
          <text class="other-recommendations">其他优质商品推荐:</text>
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
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      refreshing: false,
      searchPlaceholder: '请输入商品信息',
      searchKeyword: '',
      allGoods: [],
      matchedGoods: [],
      randomGoods: []
    };
  },
  onLoad(options) {
    if (options.keyword) {
      this.searchKeyword = decodeURIComponent(options.keyword);
      this.searchGoods();
    } else {
      this.getRandomGoods();
    }
  },
  methods: {
    async onPullDownRefresh() {
      this.refreshing = true;
      await this.searchGoods();
      this.refreshing = false;
    },
    async getGoods() {
      try {
        const { result: { data } } = await uniCloud.database().collection('mall-goods').get();
        this.allGoods = data || [];
        if (this.allGoods.length > 0) {
          this.searchPlaceholder = this.allGoods[Math.floor(Math.random() * this.allGoods.length)]
            .keywords || '请输入商品信息';
        }
      } catch (err) {
        console.error('获取商品数据失败:', err);
      }
    },
    async searchGoods() {
      await this.getGoods();
      this.matchedGoods = this.allGoods.filter(item => 
        item.keywords && item.keywords.split('').some(char => this.searchKeyword.includes(char))
      );
      if (this.matchedGoods.length === 0) {
        this.getRandomGoods(10);
      }
    },
    getRandomGoods(count = 10) {
      const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
      this.randomGoods = shuffledGoods.slice(0, count);
    },
    navBack() {
      uni.navigateTo({
        url: '/pages/search/search'
      });
    },
    navigateToSearch() {
      uni.navigateTo({
        url: '/pages/search/search'
      });
    },
    navigateToProduct(item) {
      if (!item) return;

      uni.setStorage({
        key: 'currentProduct',
        data: item,
        success: () => {
          console.log('商品信息存储成功', item);
        }
      });

      uni.navigateTo({
        url: '../search/mall-details'
      });
    }
  }
};
</script>

<style>
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

.no-results {
  text-align: center;
  color: #999;
  margin-top: 40rpx;
}

.no-results-text {
  display: block;
  margin-bottom: 20rpx;
}

.other-recommendations {
  display: block;
  font-size: 32rpx;
  color: #333;
  margin-bottom: 20rpx;
  font-weight: bold;
}
</style>

