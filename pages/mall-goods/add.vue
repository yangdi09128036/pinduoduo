<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="category_id" label="商品类别 ID" required>
        <uni-easyinput placeholder="商品所属的分类 ID，参考 `opendb-mall-categories` 表。" v-model="formData.category_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="goods_sn" label="货号" required>
        <uni-easyinput placeholder="商品的唯一货号，用于区分不同商品。" v-model="formData.goods_sn" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="name" label="商品名称" required>
        <uni-easyinput placeholder="商品的名称，用于展示和搜索。" v-model="formData.name" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="price" label="商品价格" required>
        <uni-easyinput placeholder="商品的售价，单位为元。" type="number" v-model="formData.price"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="keywords" label="关键字">
        <uni-easyinput placeholder="商品的关键字，用于搜索引擎收录。" v-model="formData.keywords" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="goods_desc" label="详细描述">
        <uni-easyinput placeholder="商品的详细描述，支持多行文本。" v-model="formData.goods_desc" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="goods_thumb" label="缩略图">
        <uni-file-picker return-type="object" v-model="formData.goods_thumb"></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item name="goods_banner_imgs" label="Banner 图">
        <uni-data-checkbox :multiple="true" v-model="formData.goods_banner_imgs"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="reviews" label="商品评价">
        <uni-data-checkbox :multiple="true" v-model="formData.reviews"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="remain_count" label="库存数量">
        <uni-easyinput placeholder="商品的剩余库存数量。" type="number" v-model="formData.remain_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="month_sell_count" label="月销量">
        <uni-easyinput placeholder="商品在本月的销售数量。" type="number" v-model="formData.month_sell_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="total_sell_count" label="总销量">
        <uni-easyinput placeholder="商品的累计销售数量。" type="number" v-model="formData.total_sell_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="is_real" label="是否为实物">
        <switch @change="binddata('is_real', $event.detail.value)" :checked="formData.is_real"></switch>
      </uni-forms-item>
      <uni-forms-item name="is_on_sale" label="是否上架">
        <switch @change="binddata('is_on_sale', $event.detail.value)" :checked="formData.is_on_sale"></switch>
      </uni-forms-item>
      <uni-forms-item name="is_best" label="是否精品">
        <switch @change="binddata('is_best', $event.detail.value)" :checked="formData.is_best"></switch>
      </uni-forms-item>
      <uni-forms-item name="is_new" label="是否新品">
        <switch @change="binddata('is_new', $event.detail.value)" :checked="formData.is_new"></switch>
      </uni-forms-item>
      <uni-forms-item name="is_hot" label="是否热销">
        <switch @change="binddata('is_hot', $event.detail.value)" :checked="formData.is_hot"></switch>
      </uni-forms-item>
      <uni-forms-item name="seller_note" label="商家备注">
        <uni-easyinput placeholder="商家对商品的备注信息，仅商家可见。" v-model="formData.seller_note" trim="both"></uni-easyinput>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/mall-goods.js';

  const db = uniCloud.database();
  const dbCollectionName = 'mall-goods';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "category_id": "",
        "goods_sn": "",
        "name": "",
        "price": null,
        "keywords": "",
        "goods_desc": "",
        "goods_thumb": null,
        "goods_banner_imgs": [],
        "reviews": [],
        "remain_count": null,
        "month_sell_count": null,
        "total_sell_count": null,
        "is_real": null,
        "is_on_sale": null,
        "is_best": null,
        "is_new": null,
        "is_hot": null,
        "seller_note": ""
      }
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
  }

  .uni-button {
    width: 184px;
  }
</style>
