const db = uniCloud.database();
const auth = uniCloud.auth();
const uniID = require('uni-id');

exports.main = async (event, context) => {
  try {
    // 获取用户身份
    const { uid, token } = event;
    let user;

    // 如果有 token，验证 token
    if (token) {
      user = await uniID.verifyToken(token);
      if (!user || !user.uid) {
        throw new Error('无效的 token');
      }
    }

    // 查询用户信息表指定字段的数据
    const res = await db.collection('user_info')
      .field('username, nickname, mobile, email, address') // 查询特定字段
      .get();

    if (res.data.length === 0) {
      return {
        code: 200,
        message: '没有需要迁移的数据'
      };
    }

    // 将数据插入到目标表
    const insertRes = await db.collection('user_filtered').insert(res.data);

    // 更新用户的 token
    if (token) {
      await uniID.setToken({ uid: user.uid, token });
    }

    return {
      code: 200,
      message: '数据迁移成功',
      data: {
        user_info: res.data,
        insertRes
      }
    };
  } catch (error) {
    console.error('数据迁移失败', error);
    return {
      code: 500,
      message: '数据迁移失败',
      error: error.message || '未知错误'
    };
  }
};