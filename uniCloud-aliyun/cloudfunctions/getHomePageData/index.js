// uniCloud/cloudfunctions/getHomePageData/index.js

'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {
    try {
        const { pageNumber = 1, pageSize = 100 } = event

        // 获取分类数据
        const categoriesRes = await db.collection('mall-categories').get()
        const categories = categoriesRes.data

        // 获取商品数据
        const goodsRes = await db.collection('mall-goods')
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .get()
        const goods = goodsRes.data

        return {
            success: true,
            data: {
                categories,
                goods
            }
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            error: error.message
        }
    }
}