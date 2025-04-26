// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "category_id": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "title": "商品类别 ID",
    "label": "商品类别 ID"
  },
  "goods_sn": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "title": "货号",
    "label": "货号"
  },
  "name": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "title": "商品名称",
    "label": "商品名称"
  },
  "price": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "double"
      }
    ],
    "title": "商品价格",
    "label": "商品价格"
  },
  "keywords": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "关键字",
    "label": "关键字"
  },
  "goods_desc": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "详细描述",
    "label": "详细描述"
  },
  "goods_thumb": {
    "rules": [
      {
        "format": "file"
      }
    ],
    "title": "缩略图",
    "label": "缩略图"
  },
  "goods_banner_imgs": {
    "rules": [
      {
        "format": "array"
      }
    ],
    "title": "Banner 图",
    "label": "Banner 图"
  },
  "reviews": {
    "rules": [
      {
        "format": "array"
      }
    ],
    "title": "商品评价",
    "label": "商品评价"
  },
  "remain_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "库存数量",
    "label": "库存数量"
  },
  "month_sell_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "月销量",
    "label": "月销量"
  },
  "total_sell_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "总销量",
    "label": "总销量"
  },
  "is_real": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "title": "是否为实物",
    "label": "是否为实物"
  },
  "is_on_sale": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "title": "是否上架",
    "label": "是否上架"
  },
  "is_best": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "title": "是否精品",
    "label": "是否精品"
  },
  "is_new": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "title": "是否新品",
    "label": "是否新品"
  },
  "is_hot": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "title": "是否热销",
    "label": "是否热销"
  },
  "seller_note": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "商家备注",
    "label": "商家备注"
  }
}

const enumConverter = {}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
