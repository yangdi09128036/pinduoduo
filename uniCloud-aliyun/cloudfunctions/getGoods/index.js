// 云函数 getGoods
exports.main = async (event, context) => {
  const db = uniCloud.database(); // 获取数据库实例
  const { page = 1, pageSize = 100 } = event; // 获取分页参数

  let goodsQuery = db.collection('mall-goods');

  if (page && pageSize) {
    // 如果存在分页参数，计算起始位置
    const skip = (page - 1) * pageSize;
    goodsQuery = goodsQuery.skip(skip).limit(pageSize);
  }

  try {
    // 获取商品数据
    const goods = await goodsQuery.get();
    return {
      data: goods.data // 返回商品数据
    };
  } catch (error) {
    // 捕获并处理错误
    return {
      errCode: -1,
      errMsg: '获取商品数据失败',
      error
    };
  }
};