# 仿「拼多多」移动端购物平台 (UniApp + UniCloud)

![Vue2](https://img.shields.io/badge/Vue2%2B-blue)
![JavaScript](https://img.shields.io/badge/Javascript%2B-green)
![uniapp](https://img.shields.io/badge/uniapp%2B-red)

  一个基于 UniApp 和 UniCloud 开发的仿「拼多多」移动端购物平台，实现了完整的电商购物流程和创新的 AI 对话功能。

## 功能特性

- **用户系统**
  - 账户密码登录/注册
  - 个人信息管理
  - 个人钱包系统

- **商品系统**
  - 商品首页展示
  - 关键词搜索商品
  - 商品详情页
  - 商品收藏功能
  - 浏览历史记录

- **订单系统**
  - 提交支付功能
  - 多状态订单展示：
    - 全部订单
    - 待付款
    - 待分享
    - 待发货
    - 待收货
    - 待评价

- **AI对话功能** (集成Kimi API)
  - 智能对话交流
  - 语音输出回答
  - 多音色切换
  - 对话历史管理
  - 新建对话功能

## 快速体验

### 在线预览
👉 [点击这里直接体验(需要自行进行注册)](https://static-mp-0dcd11a4-5797-4c2e-9b6e-d28808479dcd.next.bspapp.com/)

### 下载APK
前往 [Releases](https://github.com/yangdi09128036/pinduoduo-uniapp/releases) 下载最新APK安装包（可能会稍慢，取决于你的网络，建议科学上网）

## 本地运行

### 方法1：直接下载代码压缩包
1. 点击仓库顶部的 "Code" 按钮
2. 选择 "Download ZIP"
3. 解压后使用HBuilderX打开项目

### 方法2：使用Git克隆仓库

#### 安装Git Bash (Windows)
1. 访问 [Git官网](https://git-scm.com/) 下载安装包
2. 运行下载的安装程序
3. 安装过程中保持默认选项（一直下一步）即可
4. 安装完成后，在任意文件夹右键可以看到 "Git Bash Here" 选项

#### 克隆仓库（需要在git bash环境中运行）
```bash
git clone https://github.com/yangdi09128036/pinduoduo-uniapp.git （加上你指定的安装地址，例如G:\pdd-uniapp）
```

### 运行项目
1. 下载安装 [HBuilderX](https://www.dcloud.io/hbuilderx.html)
2. 使用HBuilderX打开项目
3. 创建自己的unicloud云空间
4. 右键uniCloud，关联自己的云空间
5. 右键uniCloud下的cloudfunctions和database，全部上传到云空间
6. 选择运行到浏览器或手机模拟器

## 项目结构

```
pinduoduo-uniapp/
├── pages/            # 页面文件
├── static/           # 静态资源
├── uni_modules/      # 第三方模块
├── cloudfunctions/   # 云函数
├── App.vue           # 应用配置
└── main.js           # 入口文件
```

## 注意事项

1. 本项目使用UniCloud作为后端服务，如需完整功能需要配置自己的UniCloud服务空间
2. AI对话功能已经配置好Kimi API密钥，可以更为其他的AI的API key，如deepseek，豆包等
3. 支付功能为模拟实现，不涉及真实支付

## 开发计划

- [ ] 优化UI设计
- [ ] 增加商品评价系统
- [ ] 实现完整的支付流程
- [ ] 增加社交分享功能
- [ ] 优化AI对话体验

## 关于作者

👨‍💻 一名大二学生，目前因学业繁忙暂停更新，后续会找机会继续完善项目。

📧 联系邮箱/QQ: 3349476867

## 许可证

本项目采用 [MIT License](LICENSE)。
