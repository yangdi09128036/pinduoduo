// 云函数 getCategories
exports.main = async (event, context) => {
  const db = uniCloud.database(); // 获取数据库实例
  const $ = db.command.aggregate;

  try {
    // 获取 mall-categories 集合中的数据
    const categories = await db.collection('mall-categories').get();
    return {
      data: categories.data // 返回分类数据
    };
  } catch (error) {
    // 捕获并处理错误
    return {
      errCode: -1,
      errMsg: '获取分类数据失败',
      error
    };
  }
};